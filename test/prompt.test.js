import { describe, it, expect, vi, afterEach } from 'vitest';
import { readFileSync, existsSync, readdirSync, statSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import yaml from 'js-yaml';
import { build } from 'vite';
import { loadConfig, applyTheme } from '../src/config.js';
import { mockContent, mockCodeContent } from '../src/content.js';

const read = (p) => readFileSync(new URL(`../${p}`, import.meta.url), 'utf8');

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('public/config.yaml', () => {
  it('parses and has the fields the app reads', () => {
    const cfg = yaml.load(read('public/config.yaml'));
    expect(cfg.app.name).toBe('PROMPT');
    expect(cfg.theme.colors.primary).toMatch(/^#[0-9a-f]{6}$/i);
    expect(cfg.theme.colors.background_dark).toMatch(/^#[0-9a-f]{6}$/i);
  });
});

describe('loadConfig', () => {
  it('fetches config.yaml under BASE_URL and returns the parsed object', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ text: async () => read('public/config.yaml') });
    vi.stubGlobal('fetch', fetchMock);
    const cfg = await loadConfig();
    expect(fetchMock).toHaveBeenCalledWith(`${import.meta.env.BASE_URL}config.yaml`);
    expect(cfg.app.name).toBe('PROMPT');
  });

  it('returns null when the fetch fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')));
    vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(await loadConfig()).toBeNull();
  });
});

describe('applyTheme', () => {
  function fakeDocument() {
    const props = {};
    vi.stubGlobal('document', {
      documentElement: { style: { setProperty: (k, v) => { props[k] = v; } } },
    });
    return props;
  }

  it('maps config colors to CSS variables', () => {
    const props = fakeDocument();
    applyTheme({ theme: { colors: { primary: '#111111', background_dark: '#222222' } } });
    expect(props).toEqual({ '--primary': '#111111', '--bg-dark': '#222222' });
  });

  it('does nothing for a missing or empty config', () => {
    const props = fakeDocument();
    applyTheme(null);
    applyTheme({});
    applyTheme({ theme: {} });
    expect(props).toEqual({});
  });
});

describe('mock content', () => {
  for (const [name, list] of [['mockContent', mockContent], ['mockCodeContent', mockCodeContent]]) {
    it(`${name} is a non-empty list of well-formed messages`, () => {
      expect(list.length).toBeGreaterThan(0);
      for (const m of list) {
        expect(['user', 'ai']).toContain(m.type);
        expect(typeof m.content).toBe('string');
        expect(m.content.trim()).not.toBe('');
      }
    });
  }
});

describe('index.html wiring', () => {
  // fill-btn is looked up in main.js but not present in index.html today (fillBtn is never used).
  const knownMissing = new Set(['fill-btn']);

  it('contains every element id that src/main.js looks up', () => {
    const html = read('index.html');
    const ids = [...read('src/main.js').matchAll(/getElementById\('([^']+)'\)/g)].map((m) => m[1]);
    expect(ids.length).toBeGreaterThan(5);
    const missing = ids.filter((id) => !knownMissing.has(id) && !html.includes(`id="${id}"`));
    expect(missing).toEqual([]);
  });
});

describe('production build', () => {
  it('emits index.html, a JS bundle, a CSS bundle and config.yaml, all non-empty', async () => {
    const outDir = mkdtempSync(join(tmpdir(), 'prompt-build-'));
    await build({ logLevel: 'silent', build: { outDir, emptyOutDir: true } });
    const files = readdirSync(outDir, { recursive: true });
    const sized = (re) => files.filter((f) => re.test(f) && statSync(join(outDir, f)).size > 0);
    expect(sized(/^index\.html$/)).toHaveLength(1);
    expect(sized(/^assets\/.*\.js$/).length).toBeGreaterThan(0);
    expect(sized(/^assets\/.*\.css$/).length).toBeGreaterThan(0);
    expect(existsSync(join(outDir, 'config.yaml'))).toBe(true);
    expect(read('vite.config.js')).toContain("base: '/prompt/'");
    expect(readFileSync(join(outDir, 'index.html'), 'utf8')).toContain('/prompt/assets/');
  }, 60000);
});
