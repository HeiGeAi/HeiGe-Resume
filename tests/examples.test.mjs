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
