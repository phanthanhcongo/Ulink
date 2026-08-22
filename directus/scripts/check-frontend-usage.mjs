import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcDir = path.resolve(__dirname, '../../frontend/src');

// List of all expected custom collections
const COLLECTIONS = [
  'partners', 'industries', 'product_categories', 'products',
  'product_skus', 'product_attributes', 'product_attribute_options',
  'documents', 'vn_provinces', 'regional_hubs',
  'hub_industrial_zones', 'hub_team_members',
  'blog_posts', 'case_studies', 'iso_certifications',
  'hero_banners', 'pages', 'site_settings', 'homepage',
  'media_retention', 'media_audit_events',
  // Commerce
  'customers', 'orders', 'order_items', 'invoices', 'deliveries',
  'rfq_requests', 'rfq_assignment_rules',
  // Other
  'standards', 'newsletter_subscribers', 'contact_requests',
  'sample_requests', 'integration_events'
];

// We also check their translations (*_translations)
const ALL_COLLECTIONS = [...COLLECTIONS];
COLLECTIONS.forEach(col => {
  if (col !== 'vn_provinces' && col !== 'newsletter_subscribers' && col !== 'contact_requests' && col !== 'integration_events') {
    ALL_COLLECTIONS.push(`${col}_translations`);
  }
});

// Recursively get all files in frontend/src
function getFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFiles(filePath));
    } else {
      // Only check code files (ts, tsx, js, jsx, json)
      if (/\.(tsx|ts|js|jsx|json)$/.test(file)) {
        results.push(filePath);
      }
    }
  });
  return results;
}

const files = getFiles(srcDir);
console.log(`Scanning ${files.length} files in frontend/src...\n`);

const usage = {};
ALL_COLLECTIONS.forEach(col => {
  usage[col] = {
    count: 0,
    files: []
  };
});

files.forEach(filePath => {
  const content = fs.readFileSync(filePath, 'utf8');
  const relativePath = path.relative(srcDir, filePath);
  
  ALL_COLLECTIONS.forEach(col => {
    // Search for patterns: 'collection_name', "collection_name", `collection_name`
    // to avoid matching substring words.
    const regex = new RegExp(`['"\`]${col}['"\`]`, 'g');
    const matches = content.match(regex);
    if (matches) {
      usage[col].count += matches.length;
      usage[col].files.push({
        path: relativePath,
        matches: matches.length
      });
    }
  });
});

console.log('=== COLLECTION USAGE IN FRONTEND ===\n');

// Sort by count descending
const sorted = Object.entries(usage).sort((a, b) => b[1].count - a[1].count);

console.log(String('Collection').padEnd(45) | String('Matches').padStart(10) | 'Files Using It');
console.log('-'.repeat(80));

sorted.forEach(([col, info]) => {
  const fileCount = info.files.length;
  const status = info.count > 0 ? '✅ ACTIVE' : '❌ UNUSED';
  console.log(
    `${col.padEnd(40)} ${status.padEnd(10)} ${String(info.count).padStart(6)} matches in ${fileCount} files`
  );
  if (info.count > 0 && fileCount <= 3) {
    // Show filenames if used in few files
    const fileList = info.files.map(f => `${f.path} (${f.matches})`).join(', ');
    console.log(`    ↳ Used in: ${fileList}`);
  } else if (info.count > 0) {
    // Show top 3 files
    const topFiles = info.files.slice(0, 3).map(f => f.path).join(', ');
    console.log(`    ↳ Used in: ${topFiles} ... and ${fileCount - 3} more files`);
  }
});
