// Adds a content-hash version (?v=xxxxxxxx) to the CSS and JS links in every page,
// so browsers fetch the new file whenever it changes instead of a stale cached copy.
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const ROOT = process.argv[2];
if (!ROOT) throw new Error('usage: node bust-cache.js <project-dir>');

const hash = (rel) => crypto.createHash('sha1').update(fs.readFileSync(path.join(ROOT, rel))).digest('hex').slice(0, 8);
const assets = ['assets/css/style.css', 'assets/js/main.js'].map((rel) => ({ rel, v: hash(rel) }));

for (const file of fs.readdirSync(ROOT).filter((f) => f.endsWith('.html'))) {
  const p = path.join(ROOT, file);
  let html = fs.readFileSync(p, 'utf8');
  for (const { rel, v } of assets) {
    const re = new RegExp(rel.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&') + '(\\?v=[0-9a-f]+)?', 'g');
    html = html.replace(re, `${rel}?v=${v}`);
  }
  fs.writeFileSync(p, html, 'utf8');
}
console.log(assets.map((a) => `${a.rel}?v=${a.v}`).join('\n'));
