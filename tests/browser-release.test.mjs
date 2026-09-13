import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import test from 'node:test';
import { chromium } from 'playwright-core';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const EXAMPLES = path.join(ROOT, 'examples');
const RESUMES = fs.readdirSync(EXAMPLES)
  .filter((name) => name.endsWith('-resume.html'))
  .sort();

function findChromium() {
  const candidates = [
    process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH,
    chromium.executablePath(),
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
    '/usr/bin/google-chrome',
    '/usr/bin/google-chrome-stable',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
    path.join(os.homedir(), 'AppData/Local/Google/Chrome/Application/chrome.exe'),
  ].filter(Boolean);
  return candidates.find((candidate) => fs.existsSync(candidate));
}

function pdfPageCount(pdf) {
  return (pdf.toString('latin1').match(/\/Type\s*\/Page\b/g) || []).length;
}

async function openOfflinePage(context, name) {
  const page = await context.newPage();
  await page.goto(pathToFileURL(path.join(EXAMPLES, name)).href, {
    waitUntil: 'domcontentloaded',
  });
  await page.evaluate(async () => {
    await document.fonts?.ready;
    await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
  });
  return page;
}

test('tracked resumes pass the Chromium mobile and PDF release gate', async (t) => {
  assert.equal(RESUMES.length, 7, 'unexpected resume fixture count');
  const executablePath = findChromium();
  assert.ok(executablePath, 'Chromium is required for the release gate');
  const browser = await chromium.launch({ executablePath, headless: true });

  try {
    await t.test('all seven resumes have no horizontal overflow at 390px', async () => {
      const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
      let blockedRequests = 0;
      await context.route(/^https?:\/\//, (route) => {
        blockedRequests += 1;
        return route.abort('blockedbyclient');
      });
      try {
        for (const name of RESUMES) {
          const page = await openOfflinePage(context, name);
          const metrics = await page.evaluate(() => ({
            viewportWidth: window.innerWidth,
            documentWidth: document.documentElement.scrollWidth,
            bodyWidth: document.body.scrollWidth,
            pages: [...document.querySelectorAll('.page')].map((element) => {
              const rect = element.getBoundingClientRect();
              return { left: rect.left, right: rect.right };
            }),
          }));
          assert.equal(metrics.viewportWidth, 390, `${name} used the wrong viewport`);
          assert.ok(metrics.documentWidth <= 390, `${name} document width is ${metrics.documentWidth}px`);
          assert.ok(metrics.bodyWidth <= 390, `${name} body width is ${metrics.bodyWidth}px`);
          for (const bounds of metrics.pages) {
            assert.ok(bounds.left >= -0.5, `${name} page starts at ${bounds.left}px`);
            assert.ok(bounds.right <= 390.5, `${name} page ends at ${bounds.right}px`);
          }
          await page.close();
        }
        assert.ok(blockedRequests > 0, 'fixtures did not exercise the offline font boundary');
      } finally {
        await context.close();
      }
    });

    await t.test('six resumes print to one page and executive prints to two pages', async () => {
      const context = await browser.newContext();
      await context.route(/^https?:\/\//, (route) => route.abort('blockedbyclient'));
      try {
        for (const name of RESUMES) {
          const page = await openOfflinePage(context, name);
          await page.emulateMedia({ media: 'print' });
          const pdf = await page.pdf({
            format: 'A4',
            printBackground: true,
            preferCSSPageSize: true,
          });
          const expected = name === 'executive-resume.html' ? 2 : 1;
          assert.ok(pdf.length > 10_000, `${name} generated an empty PDF`);
          assert.equal(pdfPageCount(pdf), expected, `${name} PDF page count changed`);
          await page.close();
        }
      } finally {
        await context.close();
      }
    });
  } finally {
    await browser.close();
  }
});

test('editable layer reloads read-only and restores only sane markup', async () => {
  const executablePath = findChromium();
  assert.ok(executablePath, 'Chromium is required for the release gate');
  const browser = await chromium.launch({ executablePath, headless: true });
  try {
    const context = await browser.newContext();
    await context.route(/^https?:\/\//, (route) => route.abort('blockedbyclient'));
    try {
      const page = await openOfflinePage(context, 'heige-resume.html');
      await page.click('[data-act=edit]');
      await page.click('[data-he-field]');
      await page.keyboard.type('X');
      await page.waitForTimeout(700); // past the 400ms autosave debounce
      await page.reload({ waitUntil: 'domcontentloaded' });
      const state = await page.evaluate(() => {
        const field = document.querySelector('[data-he-field]');
        return {
          isEditable: field.isContentEditable,
          attr: field.getAttribute('contenteditable'),
          label: document.querySelector('[data-act=edit]').textContent,
          kept: field.textContent.includes('X'),
        };
      });
      assert.equal(state.kept, true, 'edit was not autosaved');
      assert.equal(state.isEditable, false, 'field stayed editable after reload');
      assert.equal(state.attr, null, 'contenteditable attribute persisted into storage');
      assert.equal(state.label, '编辑', 'toolbar shows the wrong mode after reload');

      const key = await page.evaluate(() => 'heige-edit::' + location.pathname);
      const good = JSON.parse(await page.evaluate((k) => localStorage.getItem(k), key));

      await page.evaluate((k) => {
        localStorage.setItem(k, JSON.stringify({ v: 'stale-fingerprint', d: ['<p>hijacked</p>'] }));
      }, key);
      await page.reload({ waitUntil: 'domcontentloaded' });
      const stale = await page.evaluate((k) => ({
        stored: localStorage.getItem(k),
        hijacked: document.body.textContent.includes('hijacked'),
      }), key);
      assert.equal(stale.stored, null, 'stale archive was not discarded');
      assert.equal(stale.hijacked, false, 'stale archive content was restored');

      await page.evaluate(({ k, v, len }) => {
        const d = new Array(len).fill('<p>pad</p>');
        d[0] = '<p onclick="window.__pwned=1">safe</p><img src="x" onerror="window.__pwned=1"><scr' + 'ipt>window.__pwned=1</scr' + 'ipt>';
        localStorage.setItem(k, JSON.stringify({ v, d }));
      }, { k: key, v: good.v, len: good.d.length });
      await page.reload({ waitUntil: 'domcontentloaded' });
      const clean = await page.evaluate(() => ({
        pwned: Boolean(window.__pwned),
        scripts: document.querySelectorAll('.page script').length,
        handlers: [...document.querySelectorAll('.page *')].filter((n) => [...n.attributes].some((a) => /^on/i.test(a.name))).length,
        kept: document.body.textContent.includes('safe'),
      }));
      assert.equal(clean.pwned, false, 'stored markup executed script');
      assert.equal(clean.scripts, 0, 'script tag survived restore');
      assert.equal(clean.handlers, 0, 'inline event handler survived restore');
      assert.equal(clean.kept, true, 'sanitized content was not restored');
      await page.close();
    } finally {
      await context.close();
    }
  } finally {
    await browser.close();
  }
});

