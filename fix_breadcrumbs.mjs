import fs from 'fs';
import path from 'path';

const files = [
  'resources/js/pages/admin/tenant-subscriptions/edit.tsx',
  'resources/js/pages/admin/tenants/activity.tsx',
  'resources/js/pages/admin/tenants/edit.tsx',
  'resources/js/pages/admin/tenants/payments.tsx',
  'resources/js/pages/admin/tenants/subscriptions.tsx',
];

const base = 'd:/PROJECT_GROUP/ctechbooth_management';

for (const file of files) {
  const filePath = path.join(base, file);
  if (!fs.existsSync(filePath)) {
    console.log(`Not found: ${file}`);
    continue;
  }
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Replace dynamic title assignments with static ones inside breadcrumbs
  content = content.replace(/\{\s*title:\s*tenant\.business_name.*?\}/g, "{ title: 'Tenant', href: '/admin/tenants' }");
  content = content.replace(/\{\s*title:\s*'Buat Langganan'.*?\}/g, "{ title: 'Buat Langganan', href: '#' }");
  content = content.replace(/\{\s*title:\s*'Edit Langganan'.*?\}/g, "{ title: 'Edit Langganan', href: '#' }");
  content = content.replace(/\{\s*title:\s*'Aktivitas'.*?\}/g, "{ title: 'Aktivitas', href: '#' }");
  content = content.replace(/\{\s*title:\s*'Edit'.*?\}/g, "{ title: 'Edit Tenant', href: '#' }");
  content = content.replace(/\{\s*title:\s*'Pembayaran'.*?\}/g, "{ title: 'Pembayaran', href: '#' }");
  content = content.replace(/\{\s*title:\s*'Langganan'.*?\}/g, "{ title: 'Langganan', href: '#' }");
  
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`Processed: ${file}`);
}
console.log('Done!');
