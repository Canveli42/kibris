const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.join(__dirname, '..');
const read = (name) => fs.readFileSync(path.join(root, name), 'utf8');

test('visitor measurement omits query strings and records each scroll threshold once', () => {
  const events = [];
  let now = 1000;
  const listeners = {};
  const location = { pathname: '/example', search: '?private=example' };
  const window = {
    innerHeight: 500, scrollY: 500,
    addEventListener(name, cb) { listeners[name] = cb; }
  };
  const document = {
    documentElement: { scrollHeight: 1000 },
    addEventListener(name, cb) { listeners[name] = cb; }
  };
  vm.runInNewContext(read('takip.js'), {
    window, document, location, navigator: {},
    Date: { now: () => now },
    fetch: (_url, options) => { events.push(JSON.parse(options.body)); return Promise.resolve(); }
  });
  listeners.click({ target: { closest: () => ({
    textContent: 'Example', getAttribute: (name) => name === 'href' ? '/blog/example?private=example#fragment' : null
  }) } });
  now += 500;
  listeners.scroll();
  now += 500;
  listeners.scroll();
  assert.equal(events.length, 5);
  assert.equal(events[0].etiket, 'iç link: /blog/example');
  assert.ok(events.every(event => event.yol === '/example'));
  assert.deepEqual(events.slice(1).map(event => event.etiket),
    [25, 50, 75, 100].map(n => 'kaydirma: ' + n));
});

function trafficContext(rows, request) {
  const html = read('pages/can.html');
  const start = html.indexOf('/* TRAFİK */');
  const end = html.indexOf('T.temizle=function(){', start);
  assert.ok(start >= 0 && end > start);
  const nodes = new Map();
  function el(id) {
    if (!nodes.has(id)) nodes.set(id, {
      value: id === 'tAralik' ? '7' : '', innerHTML: '', children: [],
      appendChild(node) { this.children.push(node); }
    });
    return nodes.get(id);
  }
  const document = { createElement() {
    return { style: {}, label: {}, querySelector() { return this.label; } };
  } };
  const parsed = Date.parse('2026-11-27T08:00:00Z');
  class FixedDate extends Date { static now() { return parsed; } }
  const ctx = vm.createContext({
    el, document, Date: FixedDate,
    api: { trafik: request || (() => Promise.resolve(rows)) }
  });
  vm.runInContext(html.slice(start, end), ctx);
  return { ctx, el };
}

test('panel separates clicks, scrolls, Google and other search views', async () => {
  const rows = [
    { gun:'2026-11-27', tur:'sayfa', adet:'12', kaynak:'direkt', yol:'/' },
    { gun:'2026-11-27', tur:'sayfa', adet:7, kaynak:'arama:google.com', yol:'/' },
    { gun:'2026-11-26', tur:'sayfa', adet:2, kaynak:'arama:bing.com', yol:'/example' },
    { gun:'2026-11-27', tur:'tik', adet:'3', etiket:'example' },
    { gun:'2026-11-27', tur:'tik', adet:8, etiket:'kaydirma: 25' },
    { gun:'2026-11-27', tur:'tik', adet:2, etiket:'kaydirma: 100' }
  ];
  const { ctx, el } = trafficContext(rows);
  await ctx.T.yukle();
  assert.match(el('tKartlar').innerHTML, /Görüntüleme<\/span><b>21<\/b>/);
  assert.match(el('tKartlar').innerHTML, /Arama kaynaklı<\/span><b>9<\/b>/);
  assert.match(el('tKartlar').innerHTML, /Google kaynaklı<\/span><b>7<\/b>/);
  assert.match(el('tKartlar').innerHTML, /Tıklama<\/span><b>3<\/b>/);
  assert.match(el('tGunler').innerHTML, /2026-11-26/);
  assert.deepEqual(el('tTik').children.map(n => n.label.textContent), ['example']);
  assert.deepEqual(el('tKaydirma').children.map(n => [
    n.label.textContent, Number(n.innerHTML.match(/<b>(\d+)<\/b>/)[1])
  ]), [['25%',8],['50%',0],['75%',0],['100%',2]]);
});

test('day filters select exact UTC dates including previous days', async () => {
  const calls = [];
  const { ctx, el } = trafficContext([], (start, end) => {
    calls.push([start,end]); return Promise.resolve([]);
  });
  for (const choice of ['today','yesterday','day2','7','30','custom']) {
    el('tAralik').value = choice;
    if(choice === 'custom')el('tGun').value = '2026-11-20';
    await ctx.T.yukle();
  }
  assert.deepEqual(calls, [
    ['2026-11-27','2026-11-27'],['2026-11-26','2026-11-26'],
    ['2026-11-25','2026-11-25'],['2026-11-21','2026-11-27'],
    ['2026-10-29','2026-11-27'],['2026-11-20','2026-11-20']
  ]);
});

test('traffic reads every paginated row without silent truncation', async () => {
  const { ctx } = trafficContext([]);
  const requests=[];
  const result=await ctx.trafikSayfalari(async url=>{
    requests.push(url);
    const count=requests.length===1?500:3;
    return {ok:true,json:async()=>Array.from({length:count},(_,i)=>({adet:1,id:i}))};
  },'2026-11-25','2026-11-27');
  assert.equal(result.length,503);
  assert.equal(requests.length,2);
  assert.ok(requests.every(u=>u.includes('gun=gte.2026-11-25')&&u.includes('gun=lte.2026-11-27')));
  assert.match(requests[1],/offset=500$/);
});

test('cleanup uses database scheduling; the retired HTTP route cannot trigger cleanup', () => {
  const config = JSON.parse(read('vercel.json'));
  assert.ok(!(config.crons || []).some(job => job.path === '/api/temizle'));
  const module = { exports: {} };
  vm.runInNewContext(read('api/temizle.js'), { module });
  const result = {};
  const res = {
    setHeader(name, value) { result[name] = value; },
    status(code) { result.status = code; return this; },
    json(body) { result.body = body; }
  };
  module.exports({}, res);
  assert.equal(result.status, 410);
  assert.equal(result['Cache-Control'], 'no-store');
  assert.equal(result.body.ok, false);
});
