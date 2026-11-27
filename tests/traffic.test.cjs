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

test('panel distinguishes clicks from scroll depth and handles numeric-string counts', async () => {
  const html = read('pages/can.html');
  const start = html.indexOf('T.yukle=function()');
  const end = html.indexOf('el("tAralik").onchange=T.yukle;', start);
  assert.ok(start >= 0 && end > start, 'Traffic section must exist');
  const rows = [
    { tur: 'sayfa', adet: '12', kaynak: 'direkt', yol: '/' },
    { tur: 'tik', adet: '3', etiket: 'example' },
    { tur: 'tik', adet: 8, etiket: 'kaydirma: 25' },
    { tur: 'tik', adet: 2, etiket: 'kaydirma: 100' }
  ];
  const nodes = new Map();
  function el(id) {
    if (!nodes.has(id)) nodes.set(id, {
      value: '7', innerHTML: '', children: [],
      appendChild(node) { this.children.push(node); }
    });
    return nodes.get(id);
  }
  const document = {
    createElement() {
      return { style: {}, label: {}, querySelector() { return this.label; } };
    }
  };
  const T = {};
  vm.runInNewContext(html.slice(start, end), {
    T, el, document, tarih: () => '2026-11-27',
    api: { trafik: () => Promise.resolve(rows) }
  });
  T.yukle();
  await Promise.resolve();
  await Promise.resolve();
  assert.match(el('tKartlar').innerHTML, /Görüntüleme<\/span><b>12<\/b>/);
  assert.match(el('tKartlar').innerHTML, /Tıklama<\/span><b>3<\/b>/);
  assert.deepEqual(el('tTik').children.map(n => n.label.textContent), ['example']);
  assert.deepEqual(el('tKaydirma').children.map(n => [
    n.label.textContent, Number(n.innerHTML.match(/<b>(\d+)<\/b>/)[1])
  ]), [['25%', 8], ['50%', 0], ['75%', 0], ['100%', 2]]);
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
