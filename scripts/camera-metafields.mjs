// Uses Shopify CLI's stored authentication; no tokens are read or written here.
// Dry run: node scripts/camera-metafields.mjs AUDIT.json
// Local review: node scripts/camera-metafields.mjs AUDIT.json --plan
// Apply:   node scripts/camera-metafields.mjs AUDIT.json --apply
// Verify:  node scripts/camera-metafields.mjs AUDIT.json --verify
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, mkdtempSync, mkdirSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const store = 'd61956-2.myshopify.com';
const file = process.argv[2];
const apply = process.argv.includes('--apply');
const verify = process.argv.includes('--verify');
const plan = process.argv.includes('--plan');
if (!file || [apply, verify, plan].filter(Boolean).length > 1) throw new Error('Supply an audit JSON file and at most one of --apply, --verify or --plan.');
const definition = JSON.parse(readFileSync(new URL('../docs/camera-categories-metafield.json', import.meta.url)));
const allowed = JSON.parse(definition.validations[0].value);
const audit = JSON.parse(readFileSync(file));
const products = Array.isArray(audit) ? audit : audit.products;
if (!Array.isArray(products)) throw new Error('The audit must contain a products array.');
if (audit.store && audit.store !== store) throw new Error('The audit belongs to a different Shopify store.');
const validated = products.map(p => {
  const id = String(p.product_id || p.id || '');
  const gid = id.startsWith('gid://') ? id : `gid://shopify/Product/${id}`;
  if (!/^gid:\/\/shopify\/Product\/\d+$/.test(gid) || !p.handle || !p.title || typeof p.is_camera !== 'boolean' || !Array.isArray(p.categories) || p.categories.some(c => !allowed.includes(c)) || new Set(p.categories).size !== p.categories.length || (!p.is_camera && p.categories.length)) {
    throw new Error(`Invalid classification: ${p.handle || id}`);
  }
  if (p.admin_graphql_api_id && p.admin_graphql_api_id !== gid) throw new Error(`Conflicting product IDs: ${p.handle}`);
  return { ...p, gid };
});
if (!validated.length || new Set(validated.map(p => p.gid)).size !== validated.length) throw new Error('Empty or duplicate product plan.');
const planned = validated.filter(p => p.is_camera && p.categories.length);
if (!planned.length) throw new Error('No classified cameras in this audit.');
if (plan) {
  console.log(JSON.stringify({ store, definition, cameras: validated.filter(p => p.is_camera).length,
    classified: planned.length, outsideTaxonomy: validated.filter(p => p.is_camera && !p.categories.length).map(p => ({id:p.gid,title:p.title})),
    excluded: validated.filter(p => !p.is_camera).length,
    products: planned.map(p => ({id:p.gid,handle:p.handle,title:p.title,categories:p.categories})) }, null, 2));
  process.exit(0);
}
const dir = mkdtempSync(join(tmpdir(), 'coastal-camera-metafields-'));
function graphql(query, variables = {}, mutate = false) {
  const queryFile = join(dir, 'operation.graphql');
  const variableFile = join(dir, 'variables.json');
  writeFileSync(queryFile, query);
  writeFileSync(variableFile, JSON.stringify(variables));
  const args = ['store', 'execute', '--store', store, '--version', '2026-10', '--query-file', queryFile, '--variable-file', variableFile, '--json', '--no-input'];
  if (mutate) args.push('--allow-mutations');
  const output = execFileSync('shopify', args, { encoding: 'utf8', maxBuffer: 16 * 1024 * 1024 });
  let result;
  try { result = JSON.parse(output); }
  catch {
    const lines = output.trim().split('\n').map(line => { try { return JSON.parse(line); } catch { return null; } });
    result = lines.findLast(line => line && !line.type);
  }
  if (!result || result.error || result.errors) throw new Error(JSON.stringify(result || {message:'No JSON response from Shopify CLI'}));
  return result.data || result;
}
function readProducts() {
  const current = [];
  for (let i = 0; i < planned.length; i += 25) {
    const data = graphql(`query ($ids: [ID!]!) { nodes(ids: $ids) { ... on Product { id handle title taxonomy: metafield(namespace: "custom", key: "camera_categories") { value type compareDigest } } } }`, { ids: planned.slice(i, i + 25).map(p => p.gid) });
    current.push(...data.nodes);
  }
  return new Map(current.map(p => {
    if (!p) throw new Error('An audited product no longer exists.');
    return [p.id, p];
  }));
}
try {
  const current = readProducts();
  const changes = [];
  for (const p of planned) {
    const actual = current.get(p.gid);
    if (actual.handle !== p.handle || actual.title !== p.title) throw new Error(`Product identity changed since audit: ${p.handle}`);
    if (actual.taxonomy && actual.taxonomy.type !== definition.type) throw new Error(`Incompatible existing metafield: ${p.handle}`);
    const desired = JSON.stringify(p.categories);
    const existing = actual.taxonomy?.value;
    if (existing !== desired) changes.push({ ownerId: p.gid, namespace: definition.namespace, key: definition.key, type: definition.type, value: desired, compareDigest: actual.taxonomy?.compareDigest || null });
  }
  console.log(JSON.stringify({ store, planned: planned.length, changes: changes.length, mode: apply ? 'apply' : verify ? 'verify' : 'dry-run' }));
  if (verify) {
    if (changes.length) throw new Error(`${changes.length} products do not match the audit.`);
  } else if (apply) {
    const data = graphql(`query { metafieldDefinitions(first: 250, ownerType: PRODUCT, namespace: "custom") { nodes { id key type { name } validations { name value } } pageInfo { hasNextPage } } }`);
    if (data.metafieldDefinitions.pageInfo.hasNextPage) throw new Error('Definition pagination required before applying.');
    const existing = data.metafieldDefinitions.nodes.find(d => d.key === definition.key);
    if (existing) {
      if (existing.type.name !== definition.type) throw new Error('Existing definition has a different type.');
      const choices = existing.validations.find(v => v.name === 'choices');
      if (!choices || JSON.stringify([...JSON.parse(choices.value)].sort()) !== JSON.stringify([...allowed].sort())) throw new Error('Existing definition has different choices.');
    } else {
      const created = graphql(`mutation ($definition: MetafieldDefinitionInput!) { metafieldDefinitionCreate(definition: $definition) { createdDefinition { id } userErrors { field message code } } }`, { definition }, true).metafieldDefinitionCreate;
      if (created.userErrors.length || !created.createdDefinition) throw new Error(JSON.stringify(created.userErrors));
    }
    // Back up the original public product metadata before writing any values.
    const backupDir = fileURLToPath(new URL('../.shopify/camera-catalog-backups/', import.meta.url));
    mkdirSync(backupDir, { recursive: true });
    const backup = join(backupDir, `${basename(file)}.before-${Date.now()}.json`);
    writeFileSync(backup, JSON.stringify({ store, capturedAt: new Date().toISOString(), products: [...current.values()] }, null, 2) + '\n', { flag: 'wx' });
    for (let i = 0; i < changes.length; i += 25) {
      const result = graphql(`mutation ($metafields: [MetafieldsSetInput!]!) { metafieldsSet(metafields: $metafields) { metafields { id key value } userErrors { field message code } } }`, { metafields: changes.slice(i, i + 25) }, true).metafieldsSet;
      if (result.userErrors.length) throw new Error(JSON.stringify(result.userErrors));
      console.log(`Saved ${Math.min(i + 25, changes.length)} of ${changes.length} classifications.`);
    }
    const saved = readProducts();
    for (const p of planned) if (saved.get(p.gid)?.taxonomy?.value !== JSON.stringify(p.categories)) throw new Error(`Verification failed: ${p.handle}`);
    console.log('All written classifications verified.');
  } else {
    console.log(JSON.stringify(changes.map(c => ({ id: c.ownerId, categories: JSON.parse(c.value) })), null, 2));
  }
} finally {
  rmSync(dir, { recursive: true, force: true });
}
