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
    console.log(`Not found: ${file}`);
    continue;
  }
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Find instances of currency: <something>, and add maximumFractionDigits: 0, right after it
  // We'll use a regex that matches `currency: [^,]+,` and replace it
  const newContent = content.replace(/(currency:\s*[^,]+,)/g, "$1\n                                                maximumFractionDigits: 0,");
  
  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent, 'utf-8');
    console.log(`Updated: ${file}`);
  }
}
console.log('Done!');
