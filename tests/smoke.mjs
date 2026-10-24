import assert from 'node:assert/strict';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const read = (path) => readFileSync(`${root}${path}`, 'utf8');

const html = read('index.html');
const main = read('js/main.js');
const boot = read('js/modules/boot.js');
const contactForm = read('js/modules/contactForm.js');
const i18n = read('js/modules/i18n.js');
const contentCss = read('css/content.css');
const desktopCss = read('css/desktop.css');
const windowCss = read('css/window.css');
const pagination = read('js/modules/pagination.js');

assert.doesNotMatch(main, /Notepad\.open\(/, 'Notepad must not cover the first visit');
assert.match(boot, /}, 1500\)\);/, 'Boot must finish in 1.5 seconds');
assert.match(contactForm, /fetch\(form\.action,/, 'JavaScript submission must use the form fallback URL');
assert.match(html, /class="lang-switch taskbar-lang-switch"/, 'Language switch must be in the taskbar');
assert.match(desktopCss, /\.taskbar-item\[hidden\]\s*{\s*display:\s*none;/, 'Closed taskbar items must stay hidden');

for (const id of ['contact-form-pt', 'contact-form-en']) {
  const form = html.match(new RegExp(`<form id="${id}"[^>]+>`))?.[0] ?? '';
  assert.match(form, /action="https:\/\/formspree\.io\/f\/xpppagng"/);
  assert.match(form, /method="POST"/);
  assert.doesNotMatch(form, /novalidate/);
}

assert.equal((i18n.match(/Contexto:/g) ?? []).length, 4);
assert.equal((i18n.match(/Context:/g) ?? []).length, 4);
assert.match(i18n, /When AI helps with research or speeds up a draft/);
assert.doesNotMatch(i18n, /I use artificial-intelligence tools throughout my projects/);
assert.match(i18n, /\{ \.\.\.projects\[0\], description: '' \}/);
assert.match(pagination, /if \(item\.description\)/);
assert.equal((i18n.match(/'ecosystem\.cicero'/g) ?? []).length, 3);
assert.equal((i18n.match(/'ecosystem\.cicero\.desc'/g) ?? []).length, 3);
assert.match(i18n, /https:\/\/luddevergard3n\.github\.io\/Cicero\//);
assert.match(i18n, /https:\/\/github\.com\/LuddEvergard3n\/Cicero/);
assert.match(contentCss, /white-space:\s*pre-line/);
assert.match(contentCss, /font-size:\s*16px/);
assert.match(windowCss, /width:\s*44px;[\s\S]*height:\s*44px/);

const optimizedIcons = [
  'my-computer.webp',
  'folder-closed.webp',
  'folder-open.webp',
  'network-places.webp',
  'system-properties.webp',
  'camera.webp',
  'game-controller.webp',
  'phone.webp',
  'user-support.webp'
];

for (const icon of optimizedIcons) {
  const path = `${root}img/${icon}`;
  assert.ok(existsSync(path), `${icon} must exist`);
  assert.ok(statSync(path).size < 20_000, `${icon} must remain optimized`);
  assert.ok(html.includes(`img/${icon}`), `${icon} must be used by the page`);
}

console.log('portfolio smoke checks: OK');
