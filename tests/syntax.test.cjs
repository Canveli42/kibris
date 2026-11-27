const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

const root = path.join(__dirname, '..');
function files(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const p = path.join(dir, entry.name);
    return entry.isDirectory() ? files(p) : [p];
  });
}

test('server and browser JavaScript parse before deployment', () => {
  const sources = ['api', 'data', 'js'].flatMap(dir => files(path.join(root, dir)))
    .filter(p => p.endsWith('.js'));
  sources.push(path.join(root, 'takip.js'), path.join(root, 'middleware.js'));
  for (const p of sources) {
    const args = p.endsWith('middleware.js')
      ? ['--input-type=module', '--check'] : ['--check'];
    const check = spawnSync(process.execPath, args, {
      input: fs.readFileSync(p, 'utf8'), encoding: 'utf8'
    });
    assert.equal(check.status, 0, path.relative(root, p) + '\n' + check.stderr);
  }
  for (const p of files(path.join(root, 'pages')).filter(p => p.endsWith('.html'))) {
    const html = fs.readFileSync(p, 'utf8');
    for (const m of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
      if (!m[2].trim() || /type\s*=\s*["']application\/ld\+json/i.test(m[1])) continue;
      assert.doesNotThrow(() => new Function(m[2]), path.relative(root, p));
    }
  }
});

test('shared asset URLs follow the deployment commit version', () => {
  const file = path.join(root, 'data', 'shell.js');
  const previous = process.env.VERCEL_GIT_COMMIT_SHA;
  process.env.VERCEL_GIT_COMMIT_SHA = '0123456789abcdef';
  try {
    delete require.cache[require.resolve(file)];
    const html = require(file).head();
    assert.ok(html.includes('/css/site.css?v=0123456789ab'));
    assert.ok(html.includes('/takip.js?v=0123456789ab'));
  } finally {
    delete require.cache[require.resolve(file)];
    if (previous === undefined) delete process.env.VERCEL_GIT_COMMIT_SHA;
    else process.env.VERCEL_GIT_COMMIT_SHA = previous;
  }
});
