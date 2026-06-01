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
  
  // Remove the injected string
  content = content.replace(/\n\s*maximumFractionDigits: 0,/g, '');
  
  fs.writeFileSync(filePath, content, 'utf-8');
}
console.log('Undo done!');
