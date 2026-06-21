const fs = require('fs');

function fixSubscriptionsShow() {
    const path = 'resources/js/pages/admin/subscriptions/show.tsx';
    if (!fs.existsSync(path)) return;
    let content = fs.readFileSync(path, 'utf8');
    content = content.replace(/subscription\.tenant\.id/g, 'subscription.tenant?.id');
    content = content.replace(/subscription\.tenant\.business_name/g, 'subscription.tenant?.business_name || \'-\'');
    content = content.replace(/subscription\.tenant\.owner_name/g, 'subscription.tenant?.owner_name || \'-\'');
    content = content.replace(/subscription\.tenant\.email/g, 'subscription.tenant?.email || \'-\'');
    
    ['handleRenew', 'handleCancel', 'handleSuspend', 'handleActivate'].forEach(h => {
        const search = new RegExp(`const ${h} = \\(\\) => \\{\\r?\\n\\s+if \\(confirm\\(`, 'g');
        content = content.replace(search, `const ${h} = () => {\n        if (subscription.tenant && confirm(`);
    });
    fs.writeFileSync(path, content);
}

function fixInvoicesIndex() {
    const path = 'resources/js/pages/admin/invoices/index.tsx';
    if (!fs.existsSync(path)) return;
    let content = fs.readFileSync(path, 'utf8');
    content = content.replace(/invoice\.tenant\.business_name/g, 'invoice.tenant?.business_name || \'-\'');
    fs.writeFileSync(path, content);
}

function fixSupportTicketsIndex() {
    const path = 'resources/js/pages/admin/support-tickets/index.tsx';
    if (!fs.existsSync(path)) return;
    let content = fs.readFileSync(path, 'utf8');
    content = content.replace(/ticket\.tenant\.business_name/g, 'ticket.tenant?.business_name || \'-\'');
    fs.writeFileSync(path, content);
}

function fixSupportTicketsShow() {
    const path = 'resources/js/pages/admin/support-tickets/show.tsx';
    if (!fs.existsSync(path)) return;
    let content = fs.readFileSync(path, 'utf8');
    content = content.replace(/ticket\.tenant\.business_name/g, 'ticket.tenant?.business_name || \'-\'');
    
    // Fix Link href
    content = content.replace(/<Link href={\`\/admin\/tenants\/\$\{ticket\.tenant\.id\}\`}>/g, '{ticket.tenant && <Link href={`/admin/tenants/${ticket.tenant.id}`}>');
    // We also need to close the curly brace after </Link>
    content = content.replace(/<\/Link>\r?\n\s+<\/div>/g, '</Link>}\n                    </div>');
    fs.writeFileSync(path, content);
}

fixSubscriptionsShow();
fixInvoicesIndex();
fixSupportTicketsIndex();
fixSupportTicketsShow();
