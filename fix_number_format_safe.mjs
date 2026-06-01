import fs from 'fs';
import path from 'path';

const files = [
  'resources/js/pages/admin/subscription-plans/index.tsx',
  'resources/js/pages/admin/subscription-plans/show.tsx',
  'resources/js/pages/admin/subscriptions/index.tsx',
  'resources/js/pages/admin/subscriptions/show.tsx',
  'resources/js/pages/admin/tenant-subscriptions/create.tsx',
  'resources/js/pages/admin/tenant-subscriptions/edit.tsx',
  'resources/js/pages/admin/tenants/payments.tsx',
  'resources/js/pages/admin/tenants/show.tsx',
  'resources/js/pages/admin/tenants/subscriptions.tsx',
  'resources/js/pages/dashboard.tsx'
];

const base = 'd:/PROJECT_GROUP/ctechbooth_management';

for (const file of files) {
  const filePath = path.join(base, file);
  if (!fs.existsSync(filePath)) {
    continue;
  }
  let content = fs.readFileSync(filePath, 'utf-8');
  
  const regex = /(new Intl\.NumberFormat\(\s*['"]id-ID['"]\s*,\s*\{)([^}]+)(\})/g;
  
  const newContent = content.replace(regex, (match, start, inner, end) => {
    if (inner.includes("style: 'currency'") || inner.includes('style: "currency"')) {
      if (!inner.includes('maximumFractionDigits')) {
        // Find the indentation of the last line of inner
        const lines = inner.split('\n');
        const lastLine = lines[lines.length - 1] || '';
        // If last line has spaces before content, we use it, otherwise just a default
        return `${start}${inner}    maximumFractionDigits: 0,\n${end}`;
      }
    }
    return match;
  });
  
  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent, 'utf-8');
    console.log(`Updated safely: ${file}`);
  }
}
console.log('Safe fix done!');
