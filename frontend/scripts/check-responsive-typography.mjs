import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const scanRoots = [join(process.cwd(), 'src', 'app'), join(process.cwd(), 'src', 'components', 'home')];
const ignoredSegments = [`${join('src', 'app', 'api')}`, `${join('src', 'app')}\\api`];
const textScale = /\btext-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl)\b/g;
const badContainer = /\blg:px-16\b/g;
const badSectionPadding = /\b(py-14|py-16|md:py-16|lg:py-16)\b/g;
const badHover = /hover:(shadow-md|-translate-y-1|scale-\[1\.02\])/g;

function walk(dir) {
  const result = [];
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    const stats = statSync(path);
    if (stats.isDirectory()) {
      result.push(...walk(path));
    } else if (/\.(tsx|css)$/.test(entry)) {
      result.push(path);
    }
  }
  return result;
}

const checks = [
  ['native text scale', textScale],
  ['lg:px-16 container padding', badContainer],
  ['oversized section padding', badSectionPadding],
  ['non-standard card hover', badHover],
];

const violations = [];

for (const file of scanRoots.flatMap((root) => walk(root))) {
  if (ignoredSegments.some((segment) => file.includes(segment))) continue;
  const source = readFileSync(file, 'utf8');
  if (!/className=|@apply|<h[1-6]|<p|<span|<button|<Link/.test(source)) continue;

  for (const [label, pattern] of checks) {
    pattern.lastIndex = 0;
    const matches = [...source.matchAll(pattern)];
    for (const match of matches) {
      const line = source.slice(0, match.index).split('\n').length;
      violations.push(`${file}:${line} ${label}: ${match[0]}`);
    }
  }
}

if (violations.length > 0) {
  console.error(`Responsive typography violations: ${violations.length}`);
  console.error(violations.slice(0, 120).join('\n'));
  if (violations.length > 120) {
    console.error(`...and ${violations.length - 120} more`);
  }
  process.exit(1);
}

console.log('Responsive typography check passed.');
