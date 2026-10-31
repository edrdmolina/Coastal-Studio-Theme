import { Liquid } from 'liquidjs';
import assert from 'node:assert/strict';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

// Exercise the actual Liquid snippets. Shopify-rendered preview checks cover
// the final product drops, cards, CSS cascade, and browser focus behavior.
const engine = new Liquid({ root: fileURLToPath(new URL('../../snippets/', import.meta.url)), extname: '.liquid' });
const base = {title:'Example Camera',type:'Camera',tags:[],collections:[],description:'',metafields:{custom:{}}};
const identity = [
  ['Throwback camera', {title:'Polaroid 600 Barbie Throwback Instant Film Camera',type:'',tags:['Camera','instant']}, 'true|instant|Instant camera'],
  ['Singlex SLR', {title:'Ricoh Singlex T.L.S 35mm SLR M42 Mount - Read Description',type:'',tags:['camera','SLR','35mm']}, 'true|35mm|35mm SLR'],
  ['Digital legacy tag', {title:'Panasonic Lumix DMC-LS75 Compact Digital Camera Digicam Starter Kit',type:'',tags:['digital','point and shoot']}, 'true|digital|Digital camera'],
  ['Instax legacy tag', {title:'Fujifilm Instax Mini 12 Instant Film Camera',type:'',tags:['Camera','instant','Instax']}, 'true|instant|Instant camera'],
  ['SLR tag without collection', {tags:['35mm slr film camera']}, 'true|35mm|35mm SLR'],
  ['Medium format without collection', {tags:['medium format','SLR']}, 'true|medium|Medium format'],
  ['Digital beats film membership', {tags:['digital'],collections:[{handle:'point-and-shoots'}]}, 'true|digital|Digital camera'],
  ['Unknown remains unknown', {}, 'true|other|Film camera'],
  ['Camera bag', {title:'Leitz Leicaflex 35mm SLR OEM Leather Half Case',type:'Camera Bag',tags:['camera','SLR']}, false],
  ['Blank-type half case', {title:'Konica Hexar RF Custom Leather Half Case',type:'',tags:['camera','point and shoot']}, false],
  ['Blank-type film back', {title:'Rollei Rolleiflex Magazin 6000 220 Film Back for Cameras',type:'',tags:['Camera','SLR','medium format']}, false],
  ['Blank-type standalone lens', {title:'Pentax Auto 110 50mm f/2.8 Telephoto Prime Lens',type:'',tags:['camera','slr','point and shoot']}, false],
  ['Blank-type screen', {title:'Nikon F4-F4s B Focusing Screen',type:'',tags:['camera','SLR']}, false],
  ['Blank-type hood', {title:'Mamiya C330/C220 Lens Hood',type:'',tags:['camera','medium format']}, false],
  ['Complete camera kit', {title:'Camera + Lens + Viewfinder',type:'',tags:['Camera']}, 'true|other|Film camera'],
  ['Disposable film type', {title:'Ilford HP5 Disposable 27exp Camera',type:'Film'}, 'true|other|Film camera'],
  ['Regular film', {title:'35mm Camera Film',type:'Film'}, false]
];
const conditions = [
  ['NBSP grade', {description:'<p>Condition:\u00a0GOOD</p>'}, 'Good|false'],
  ['HTML NBSP grade', {description:'Condition:&nbsp;GOOD'}, 'Good|false'],
  ['numeric NBSP grade', {description:'Condition:&#160;GOOD'}, 'Good|false'],
  ['Structured AS-IS', {metafields:{custom:{condition:{value:'AS-IS'}}}}, 'AS-IS|true'],
  ['Structured AS IS', {metafields:{custom:{condition:{value:' as is '}}}}, 'AS-IS|true'],
  ['Structured condition takes precedence', {description:'Condition: GOOD',metafields:{custom:{condition:{value:'AS-IS'}}}}, 'AS-IS|true'],
  ['Structured display', {metafields:{custom:{condition:{value:'Display only'}}}}, 'Display only|true'],
  ['Brownie display copy', {title:'Kodak Brownie Folding No 2 Camera Vintage!',description:'This camera is for display only.'}, '|true'],
  ['AS-IS body', {description:'Condition:\u00a0AS-IS'}, 'AS-IS|true'],
  ['Display title', {title:'Camera - For Display'}, '|true'],
  ['Known grade', {description:'Condition: Near Mint. Tested.'}, 'Near mint|false'],
  ['Unknown grade', {description:'A good camera, tested.'}, '|false'],
  ['Usable camera compared to shelf piece', {description:'A usable camera rather than just a shelf piece.'}, '|false'],
  ['Camera not limited to shelf pieces', {description:'These are not limited to being shelf pieces.'}, '|false'],
  ['Functional camera described as collectible', {description:'A functional camera for shooters or as a display piece.'}, '|false'],
  ['Camera display controls are not display-only', {description:'The display shows exposure settings.'}, '|false']
];

for (const [name, product, expected] of identity) {
  test(name, async () => {
    const actual = (await engine.renderFile('camera-store-classification', { product: { ...base, ...product } })).trim();
    if (expected === false) assert.equal(actual.split('|')[0], 'false');
    else assert.equal(actual, expected);
  });
}
for (const [name, product, expected] of conditions) {
  test(name, async () => {
    assert.equal((await engine.renderFile('camera-store-condition', { product: { ...base, ...product } })).trim(), expected);
  });
}
test('unknown grade preserves the shared card/filter field positions', async () => {
  const template = "{% capture raw %}{% render 'camera-store-condition', product: product %}{% endcapture %}{% assign data = raw | strip | split: '|' %}{{ data[0] }};{{ data[1] }}";
  assert.equal(await engine.parseAndRender(template, { product: { ...base, description: 'for display only' } }), ';true');
});
