import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync, spawnSync } from 'node:child_process';
import { readFileSync, mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const script = fileURLToPath(new URL('../../scripts/camera-metafields.mjs', import.meta.url));
const auditFile = fileURLToPath(new URL('../../docs/camera-catalog-classification.json', import.meta.url));
const audit = JSON.parse(readFileSync(auditFile));
test('local plan covers classified cameras, preserves overlap, and excludes accessories', () => {
  const plan = JSON.parse(execFileSync(process.execPath, [script, auditFile, '--plan'], { encoding: 'utf8' }));
  const cameras = audit.products.filter(p => p.is_camera);
  assert.equal(plan.cameras, cameras.length);
  assert.equal(plan.classified, cameras.filter(p => p.categories.length).length);
  assert.equal(plan.excluded, audit.products.filter(p => !p.is_camera).length);
  assert.equal(plan.outsideTaxonomy.length, cameras.filter(p => !p.categories.length).length);
  for (const p of plan.products) {
    const original = audit.products.find(v => v.admin_graphql_api_id === p.id);
    assert.deepEqual(p.categories, original.categories);
    assert.equal(original.is_camera, true);
  }
});
const invalidCases = [
  ['cross-store plan', a => { a.store = 'other-store.myshopify.com'; }],
  ['duplicate products', a => { a.products.push(a.products[0]); }],
  ['unrecognized category', a => { a.products[0].categories.push('Rangefinder Style'); }],
  ['conflicting IDs', a => { a.products[0].admin_graphql_api_id = 'gid://shopify/Product/1'; }],
  ['missing category array', a => { delete a.products[0].categories; }],
  ['categories on an excluded accessory', a => { a.products.find(p => !p.is_camera).categories = ['SLR']; }]
];
for (const [name, mutate] of invalidCases) {
  test(`importer rejects ${name} before any API request`, () => {
    const dir = mkdtempSync(join(tmpdir(), 'coastal-camera-plan-test-'));
    try {
      const fixture = structuredClone(audit);mutate(fixture);
      const path = join(dir, 'audit.json');writeFileSync(path, JSON.stringify(fixture));
      const result = spawnSync(process.execPath, [script, path, '--plan'], { encoding: 'utf8' });
      assert.notEqual(result.status, 0);
      assert.match(result.stderr, /Invalid classification|different Shopify store|duplicate product|Conflicting product IDs/);
    } finally { rmSync(dir, {recursive:true,force:true}); }
  });
}
