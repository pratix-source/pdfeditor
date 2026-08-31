const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const pagePath = path.join(root, 'dist', 'en', 'pdf-editor', 'index.html');
const html = fs.readFileSync(pagePath, 'utf8');
const required = [
  '<title>Pratix PDF Toolkit – Free Browser-Based PDF Editor</title>',
  '<meta name="description" content="Edit, merge, split, rotate, reorder, and redact PDF files privately in your browser. No uploads, no server, 100% client-side." />',
  '<link rel="canonical" href="https://pratix.io/en/pdf-editor" />',
  'hreflang="en"',
  'hreflang="x-default"',
  'id="prerendered-seo-content"',
  'FileReader',
  'PDFDocument',
];
const missing = required.filter(marker => !html.includes(marker));
if (missing.length) throw new Error(`Missing markers: ${missing.join(', ')}`);
if ((html.match(/data-prerender-hreflang="true"/g) || []).length !== 2) {
  throw new Error('Expected exactly 2 pilot hreflang links');
}
console.log('Static head and client-side PDF editor markers: passed');
