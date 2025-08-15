import fs from 'fs'
import path from 'path'

// Simple smoke test: check critical files exist and contain basic markers
const requiredFiles = [
  'index.html',
  'src/main.tsx',
  'src/App.tsx',
  'src/components/AdvancedChart.tsx',
  'src/components/CategoryPage.tsx'
]

let ok = true
for (const f of requiredFiles) {
  if (!fs.existsSync(path.resolve(process.cwd(), f))) {
    console.error('[MISSING]', f)
    ok = false
  }
}

// Basic content check
const indexHtml = fs.readFileSync('index.html', 'utf-8')
if (!indexHtml.includes('Dashboard Interativo')) {
  console.warn('[WARN] index.html title marker not found')
}

if (ok) {
  console.log('Smoke test passed.')
  process.exit(0)
} else {
  console.error('Smoke test failed.')
  process.exit(1)
}
