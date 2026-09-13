import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const EXAMPLES = path.join(ROOT, 'examples');
const PREVIEWS = path.join(ROOT, 'assets', 'previews');

const stems = (dir, extension) => fs.readdirSync(dir)
  .filter((name) => name.endsWith(extension))
  .map((name) => path.basename(name, extension))
  .sort();

test('every example has exactly one preview', () => {
  assert.deepEqual(stems(EXAMPLES, '.html'), stems(PREVIEWS, '.webp'));
});

test('resume examples remain printable, editable, and machine-readable', () => {
  const resumes = fs.readdirSync(EXAMPLES)
    .filter((name) => name.endsWith('-resume.html'));
  assert.equal(resumes.length, 7, 'unexpected resume fixture count');

  for (const name of resumes) {
    const source = fs.readFileSync(path.join(EXAMPLES, name), 'utf8');
    assert.match(source, /<meta\s+charset=/i, `${name} is missing a charset`);
    assert.match(source, /<title>[^<]+<\/title>/i, `${name} is missing a title`);
    assert.equal((source.match(/<h1\b/gi) || []).length, 1, `${name} must expose one primary heading`);
    assert.match(source, /@page\s*\{[^}]*size\s*:\s*A4/i, `${name} lost its A4 print contract`);
    assert.match(source, /@media\s+print/i, `${name} lacks print styles`);
    assert.match(source, /data-he-field/, `${name} lacks the editable layer`);
    assert.match(source, /@media print\{\.he-toolbar\{display:none!important\}/, `${name} prints the editor toolbar`);
    assert.doesNotMatch(source, /<(?:canvas|img)\b/i, `${name} embeds key content as graphics`);

    for (const [, code] of source.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)) {
      assert.doesNotThrow(() => new Function(code), `${name} contains invalid inline JavaScript`);
    }
  }
});

test('embedded editable layer stays in sync with the reference copy', () => {
  // comment-tolerant comparison: drop full-line comments and trailing inline
  // comments (two or more spaces before '//'), then compare line by line.
  const normalize = (code) => code
    .split('\n')
    .filter((line) => !line.trimStart().startsWith('//'))
    .map((line) => line.replace(/\s{2,}\/\/.*$/, '').trimEnd())
    .filter((line) => line !== '')
    .join('\n');

  const reference = fs.readFileSync(path.join(ROOT, 'references', 'editable-layer.md'), 'utf8');
  const refMatch = reference.match(/^<script>\n([\s\S]*?)^<\/script>$/m);
  assert.ok(refMatch, 'reference editable layer block not found');
  const expected = normalize(refMatch[1]);

  const resumes = fs.readdirSync(EXAMPLES).filter((name) => name.endsWith('-resume.html'));
  assert.equal(resumes.length, 7, 'unexpected resume fixture count');
  for (const name of resumes) {
    const source = fs.readFileSync(path.join(EXAMPLES, name), 'utf8');
    const marker = source.indexOf('HeiGe 可编辑层');
    assert.ok(marker >= 0, `${name} lacks the editable layer marker`);
    const embed = source.slice(marker).match(/<script>\n([\s\S]*?)<\/script>/);
    assert.ok(embed, `${name} editable layer script not found`);
    assert.equal(normalize(embed[1]), expected, `${name} editable layer drifted from references/editable-layer.md`);
  }
});
