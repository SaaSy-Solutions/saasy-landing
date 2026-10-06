const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const { test } = require('node:test');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const ts = require('typescript');

const filename = path.resolve(__dirname, '../app/components/FounderNote.tsx');
const compiled = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    jsx: ts.JsxEmit.ReactJSX,
    esModuleInterop: true,
  },
});
const source = new Module(filename, module);
source.filename = filename;
source.paths = Module._nodeModulePaths(path.dirname(filename));
source._compile(compiled.outputText, filename);
const { FounderNote } = source.exports;

for (const showAboutLink of [true, false]) {
  test(`founder cards expose personal profiles (showAboutLink=${showAboutLink})`, () => {
    const html = renderToStaticMarkup(React.createElement(FounderNote, { showAboutLink }));
    for (const [name, url] of [
      ['Ray Clanan', 'https://www.linkedin.com/in/raymondclanan/'],
      ['Macon Wright', 'https://www.linkedin.com/in/macon-wright-125889104/'],
    ]) {
      const links = [...html.matchAll(/<a\b([^>]+)>/g)].map((match) => match[1]);
      const link = links.find((attributes) => attributes.includes(`aria-label="${name} on LinkedIn"`));
      assert.ok(link, `${name} has an accessible profile link`);
      assert.ok(link.includes(`href="${url}"`));
      assert.ok(link.includes('target="_blank"'));
      assert.ok(link.includes('rel="noopener noreferrer"'));
    }
    assert.equal(html.includes('href="/about"'), showAboutLink);
    assert.ok(html.includes('href="https://saasysolutionsllc.com"'));
  });
}
