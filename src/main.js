import './style.css'

// ─────────────────────────────────────────────
//  ToolKit Pro — Main Entry
// ─────────────────────────────────────────────

const UNIT_CATEGORIES = {
  Length: {
    units: ['Meter','Kilometer','Centimeter','Millimeter','Mile','Yard','Foot','Inch','Nautical Mile'],
    base: 'Meter',
    toBase: { Meter:1, Kilometer:1000, Centimeter:0.01, Millimeter:0.001, Mile:1609.344, Yard:0.9144, Foot:0.3048, Inch:0.0254, 'Nautical Mile':1852 },
  },
  Weight: {
    units: ['Kilogram','Gram','Milligram','Pound','Ounce','Ton','Stone'],
    base: 'Kilogram',
    toBase: { Kilogram:1, Gram:0.001, Milligram:0.000001, Pound:0.453592, Ounce:0.0283495, Ton:1000, Stone:6.35029 },
  },
  Temperature: {
    units: ['Celsius','Fahrenheit','Kelvin'],
    base: 'Celsius',
    toBase: null,
  },
  Area: {
    units: ['Square Meter','Square Kilometer','Square Mile','Hectare','Acre','Square Foot','Square Inch'],
    base: 'Square Meter',
    toBase: { 'Square Meter':1,'Square Kilometer':1e6,'Square Mile':2.59e6,'Hectare':10000,'Acre':4046.86,'Square Foot':0.0929,'Square Inch':0.000645 },
  },
  Volume: {
    units: ['Liter','Milliliter','Cubic Meter','Gallon (US)','Quart','Pint','Cup','Fluid Ounce'],
    base: 'Liter',
    toBase: { 'Liter':1,'Milliliter':0.001,'Cubic Meter':1000,'Gallon (US)':3.78541,'Quart':0.946353,'Pint':0.473176,'Cup':0.236588,'Fluid Ounce':0.0295735 },
  },
  Speed: {
    units: ['Meter/sec','Kilometer/hr','Mile/hr','Knot','Foot/sec'],
    base: 'Meter/sec',
    toBase: { 'Meter/sec':1,'Kilometer/hr':0.277778,'Mile/hr':0.44704,'Knot':0.514444,'Foot/sec':0.3048 },
  },
}

const TOOLS = [
  { id: 'password',  icon: '🔑', label: 'Password' },
  { id: 'color',     icon: '🎨', label: 'Color' },
  { id: 'words',     icon: '📝', label: 'Word Count' },
  { id: 'json',      icon: '🔄', label: 'JSON' },
  { id: 'unit',      icon: '🔢', label: 'Converter' },
  { id: 'qr',        icon: '📱', label: 'QR Code' },
]

// ─── App Shell ───────────────────────────────
document.querySelector('#app').innerHTML = `
  <div class="app-container">
    <header class="app-header">
      <div class="header-badge"><span class="dot"></span>6 Powerful Tools</div>
      <h1 class="app-title">ToolKit Pro</h1>
      <p class="app-subtitle">Beautiful, fast, all-in-one utilities for developers & designers</p>
    </header>

    <nav class="tab-nav" id="tab-nav">
      ${TOOLS.map(t => `
        <button class="tab-btn${t.id === 'password' ? ' active' : ''}" data-tool="${t.id}" id="tab-${t.id}">
          <span class="tab-icon">${t.icon}</span>
          <span class="tab-label">${t.label}</span>
        </button>
      `).join('')}
    </nav>

    <main id="tool-container">
      ${renderPasswordTool()}
      ${renderColorTool()}
      ${renderWordsTool()}
      ${renderJsonTool()}
      ${renderUnitTool()}
      ${renderQrTool()}
    </main>

    <footer class="app-footer">
      Built with <span>♥</span> · ToolKit Pro · 2026
    </footer>
  </div>

  <div class="toast" id="toast">✅ Copied to clipboard!</div>
`

// ─── Tab Switching ────────────────────────────
document.getElementById('tab-nav').addEventListener('click', e => {
  const btn = e.target.closest('.tab-btn')
  if (!btn) return
  const tool = btn.dataset.tool

  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'))
  btn.classList.add('active')

  document.querySelectorAll('.tool-panel').forEach(p => p.classList.remove('active'))
  document.getElementById(`panel-${tool}`).classList.add('active')
})

// ─── Toast ────────────────────────────────────
function showToast(msg = '✅ Copied!') {
  const t = document.getElementById('toast')
  t.textContent = msg
  t.classList.add('show')
  setTimeout(() => t.classList.remove('show'), 2500)
}

function copyText(text) {
  navigator.clipboard.writeText(text).then(() => showToast('✅ Copied to clipboard!'))
}

// ─────────────────────────────────────────────
//  TOOL 1: PASSWORD GENERATOR
// ─────────────────────────────────────────────
function renderPasswordTool() {
  return `
  <section class="tool-panel active" id="panel-password">
    <div class="glass-card">
      <div class="tool-header">
        <h2 class="tool-title"><span class="icon">🔑</span> Password Generator</h2>
        <p class="tool-desc">Generate strong, secure passwords with custom rules</p>
      </div>

      <div class="form-group">
        <label class="form-label">Length</label>
        <div class="slider-container">
          <input type="range" class="form-range" id="pwd-length" min="6" max="64" value="20">
          <span class="slider-value" id="pwd-length-val">20</span>
        </div>
      </div>

      <div class="toggle-grid">
        <label class="toggle-item checked" id="lbl-upper">
          <input type="checkbox" class="toggle-checkbox" id="pwd-upper" checked>
          <span class="toggle-label">Uppercase (A-Z)</span>
        </label>
        <label class="toggle-item checked" id="lbl-lower">
          <input type="checkbox" class="toggle-checkbox" id="pwd-lower" checked>
          <span class="toggle-label">Lowercase (a-z)</span>
        </label>
        <label class="toggle-item checked" id="lbl-nums">
          <input type="checkbox" class="toggle-checkbox" id="pwd-nums" checked>
          <span class="toggle-label">Numbers (0-9)</span>
        </label>
        <label class="toggle-item" id="lbl-sym">
          <input type="checkbox" class="toggle-checkbox" id="pwd-sym">
          <span class="toggle-label">Symbols (!@#$…)</span>
        </label>
      </div>

      <div class="form-group">
        <label class="form-label">Generated Password</label>
        <div class="output-box" id="pwd-output">Click Generate…
          <button class="copy-btn" id="pwd-copy-btn">Copy</button>
        </div>
        <div class="strength-meter">
          <div class="strength-bars">
            <div class="strength-bar" id="sb1"></div>
            <div class="strength-bar" id="sb2"></div>
            <div class="strength-bar" id="sb3"></div>
            <div class="strength-bar" id="sb4"></div>
          </div>
          <span class="strength-label" id="strength-label">—</span>
        </div>
      </div>

      <div class="btn-row">
        <button class="btn btn-primary" id="pwd-gen-btn">⚡ Generate</button>
        <button class="btn btn-secondary" id="pwd-copy-btn2">📋 Copy</button>
      </div>
    </div>
  </section>`
}

function initPasswordTool() {
  const lenSlider = document.getElementById('pwd-length')
  const lenVal    = document.getElementById('pwd-length-val')
  const output    = document.getElementById('pwd-output')
  const genBtn    = document.getElementById('pwd-gen-btn')
  const copyBtn   = document.getElementById('pwd-copy-btn')
  const copyBtn2  = document.getElementById('pwd-copy-btn2')

  lenSlider.addEventListener('input', () => { lenVal.textContent = lenSlider.value })

  // Toggle labels
  const toggles = [
    { check: 'pwd-upper', lbl: 'lbl-upper' },
    { check: 'pwd-lower', lbl: 'lbl-lower' },
    { check: 'pwd-nums',  lbl: 'lbl-nums'  },
    { check: 'pwd-sym',   lbl: 'lbl-sym'   },
  ]
  toggles.forEach(({ check, lbl }) => {
    const cb = document.getElementById(check)
    const label = document.getElementById(lbl)
    cb.addEventListener('change', () => label.classList.toggle('checked', cb.checked))
  })

  function generate() {
    const len   = +lenSlider.value
    const upper = document.getElementById('pwd-upper').checked
    const lower = document.getElementById('pwd-lower').checked
    const nums  = document.getElementById('pwd-nums').checked
    const sym   = document.getElementById('pwd-sym').checked

    let chars = ''
    if (upper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    if (lower) chars += 'abcdefghijklmnopqrstuvwxyz'
    if (nums)  chars += '0123456789'
    if (sym)   chars += '!@#$%^&*()-_=+[]{}|;:,.<>?'

    if (!chars) { output.textContent = '⚠ Select at least one character type'; return }

    let pwd = ''
    const arr = new Uint32Array(len)
    crypto.getRandomValues(arr)
    arr.forEach(v => { pwd += chars[v % chars.length] })

    output.textContent = pwd
    updateStrength(len, upper, lower, nums, sym)
  }

  function updateStrength(len, upper, lower, nums, sym) {
    const types = [upper, lower, nums, sym].filter(Boolean).length
    let score = 0
    if (len >= 8)  score++
    if (len >= 14) score++
    if (types >= 2) score++
    if (types >= 4 || len >= 20) score++

    const bars  = [1,2,3,4].map(i => document.getElementById(`sb${i}`))
    const label = document.getElementById('strength-label')
    const cls   = ['weak','fair','good','strong'][score - 1] || 'weak'
    const lbl   = ['Weak','Fair','Good','Strong'][score - 1] || 'Weak'
    const colors = { weak:'#ff4d4d', fair:getComputedStyle(document.documentElement).getPropertyValue('--neon-orange'), good:'#00e5ff', strong:'#39ff8f' }

    bars.forEach((b, i) => {
      b.className = `strength-bar${i < score ? ` active ${cls}` : ''}`
    })
    label.textContent = `Strength: ${lbl}`
    label.style.color = colors[cls] || '#9090b8'
  }

  genBtn.addEventListener('click', generate)
  copyBtn.addEventListener('click', () => {
    const txt = output.textContent.trim()
    if (txt && txt !== 'Click Generate…') { copyText(txt); copyBtn.textContent = 'Copied!'; copyBtn.classList.add('copied'); setTimeout(() => { copyBtn.textContent = 'Copy'; copyBtn.classList.remove('copied') }, 2000) }
  })
  copyBtn2.addEventListener('click', () => {
    const txt = output.textContent.trim()
    if (txt && txt !== 'Click Generate…') copyText(txt)
  })

  generate() // auto-generate on load
}

// ─────────────────────────────────────────────
//  TOOL 2: COLOR PICKER & PALETTE GENERATOR
// ─────────────────────────────────────────────
function renderColorTool() {
  return `
  <section class="tool-panel" id="panel-color">
    <div class="glass-card">
      <div class="tool-header">
        <h2 class="tool-title"><span class="icon">🎨</span> Color Picker & Palette</h2>
        <p class="tool-desc">Pick any color and instantly get HEX, RGB, HSL values + generated palette</p>
      </div>

      <div class="two-col">
        <div>
          <div class="form-group">
            <label class="form-label">Pick a Color</label>
            <input type="color" id="color-picker" value="#b84dff"
              style="width:100%;height:80px;border-radius:16px;border:1px solid rgba(255,255,255,0.1);cursor:pointer;background:none;padding:4px;">
          </div>
          <div class="form-group">
            <label class="form-label">Or enter HEX</label>
            <input type="text" class="form-input" id="color-hex-input" value="#b84dff" placeholder="#RRGGBB">
          </div>
          <div class="btn-row">
            <button class="btn btn-primary" id="color-random-btn">🎲 Random Color</button>
          </div>
        </div>
        <div>
          <div class="color-preview-bar" id="color-preview"></div>
          <div class="color-info-grid">
            <div class="color-info-item">
              <div class="color-info-label">HEX</div>
              <div class="color-info-value" id="col-hex">#b84dff</div>
            </div>
            <div class="color-info-item">
              <div class="color-info-label">RGB</div>
              <div class="color-info-value" id="col-rgb">184, 77, 255</div>
            </div>
            <div class="color-info-item">
              <div class="color-info-label">HSL</div>
              <div class="color-info-value" id="col-hsl">277°, 100%, 65%</div>
            </div>
          </div>
          <div class="btn-row" style="margin-top:12px">
            <button class="btn btn-secondary btn-sm" id="col-copy-hex">Copy HEX</button>
            <button class="btn btn-secondary btn-sm" id="col-copy-rgb">Copy RGB</button>
            <button class="btn btn-secondary btn-sm" id="col-copy-hsl">Copy HSL</button>
          </div>
        </div>
      </div>
    </div>

    <div class="glass-card">
      <div class="tool-header">
        <h2 class="tool-title" style="font-size:1.2rem">🌈 Generated Palette</h2>
        <p class="tool-desc">Complementary, analogous, triadic, and shades</p>
      </div>
      <div class="color-grid" id="palette-grid"></div>
    </div>
  </section>`
}

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16)
  return { r, g, b }
}

function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255
  const max = Math.max(r,g,b), min = Math.min(r,g,b)
  let h, s, l = (max+min)/2
  if (max === min) { h = s = 0 }
  else {
    const d = max-min; s = l > 0.5 ? d/(2-max-min) : d/(max+min)
    switch(max) {
      case r: h = ((g-b)/d+(g<b?6:0))/6; break
      case g: h = ((b-r)/d+2)/6; break
      case b: h = ((r-g)/d+4)/6; break
    }
  }
  return { h: Math.round(h*360), s: Math.round(s*100), l: Math.round(l*100) }
}

function hslToHex(h, s, l) {
  s /= 100; l /= 100
  const a = s * Math.min(l, 1-l)
  const f = n => { const k=(n+h/30)%12; const c=l-a*Math.max(Math.min(k-3,9-k,1),-1); return Math.round(255*c).toString(16).padStart(2,'0') }
  return `#${f(0)}${f(8)}${f(4)}`
}

function initColorTool() {
  const picker   = document.getElementById('color-picker')
  const hexInput = document.getElementById('color-hex-input')
  const preview  = document.getElementById('color-preview')
  const colHex   = document.getElementById('col-hex')
  const colRgb   = document.getElementById('col-rgb')
  const colHsl   = document.getElementById('col-hsl')
  const palette  = document.getElementById('palette-grid')
  const randomBtn= document.getElementById('color-random-btn')

  function updateColor(hex) {
    hex = hex.toLowerCase()
    if (!/^#[0-9a-f]{6}$/.test(hex)) return
    picker.value = hex
    hexInput.value = hex
    preview.style.backgroundColor = hex
    const { r, g, b } = hexToRgb(hex)
    const { h, s, l } = rgbToHsl(r, g, b)
    colHex.textContent = hex.toUpperCase()
    colRgb.textContent = `${r}, ${g}, ${b}`
    colHsl.textContent = `${h}°, ${s}%, ${l}%`
    generatePalette(h, s, l)
  }

  function generatePalette(h, s, l) {
    const swatches = [
      // Complementary
      { hex: hslToHex((h+180)%360, s, l), name: 'Complementary' },
      // Analogous
      { hex: hslToHex((h+30)%360, s, l), name: 'Analogous +30' },
      { hex: hslToHex((h-30+360)%360, s, l), name: 'Analogous -30' },
      // Triadic
      { hex: hslToHex((h+120)%360, s, l), name: 'Triadic +120' },
      { hex: hslToHex((h+240)%360, s, l), name: 'Triadic +240' },
      // Shades
      { hex: hslToHex(h, s, Math.min(l+20, 95)), name: 'Lighter' },
      { hex: hslToHex(h, s, Math.max(l-20, 5)), name: 'Darker' },
      // Split complementary
      { hex: hslToHex((h+150)%360, s, l), name: 'Split Comp.' },
    ]
    palette.innerHTML = swatches.map(sw => `
      <div class="color-swatch" style="background:${sw.hex}" title="${sw.name}" data-hex="${sw.hex}" tabindex="0">
        <span class="swatch-label">${sw.hex.toUpperCase()}</span>
      </div>
    `).join('')

    palette.querySelectorAll('.color-swatch').forEach(sw => {
      sw.addEventListener('click', () => updateColor(sw.dataset.hex))
    })
  }

  picker.addEventListener('input',  () => updateColor(picker.value))
  hexInput.addEventListener('input', () => updateColor(hexInput.value))
  randomBtn.addEventListener('click', () => {
    const rand = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6,'0')
    updateColor(rand)
  })

  document.getElementById('col-copy-hex').addEventListener('click', () => copyText(colHex.textContent))
  document.getElementById('col-copy-rgb').addEventListener('click', () => copyText(`rgb(${colRgb.textContent})`))
  document.getElementById('col-copy-hsl').addEventListener('click', () => copyText(`hsl(${colHsl.textContent})`))

  updateColor('#b84dff')
}

// ─────────────────────────────────────────────
//  TOOL 3: WORD & CHARACTER COUNTER
// ─────────────────────────────────────────────
function renderWordsTool() {
  return `
  <section class="tool-panel" id="panel-words">
    <div class="glass-card">
      <div class="tool-header">
        <h2 class="tool-title"><span class="icon">📝</span> Word & Character Counter</h2>
        <p class="tool-desc">Count words, characters, sentences, paragraphs & estimated reading time</p>
      </div>
      <div class="stats-row" id="word-stats">
        <div class="stat-chip"><span class="stat-label">Words</span><span class="stat-value" id="stat-words">0</span></div>
        <div class="stat-chip"><span class="stat-label">Chars</span><span class="stat-value" id="stat-chars">0</span></div>
        <div class="stat-chip"><span class="stat-label">Chars (no spaces)</span><span class="stat-value" id="stat-chars-ns">0</span></div>
        <div class="stat-chip"><span class="stat-label">Sentences</span><span class="stat-value" id="stat-sent">0</span></div>
        <div class="stat-chip"><span class="stat-label">Paragraphs</span><span class="stat-value" id="stat-para">0</span></div>
        <div class="stat-chip"><span class="stat-label">Read time</span><span class="stat-value" id="stat-read">~0 min</span></div>
      </div>
      <div class="form-group">
        <label class="form-label">Type or paste your text</label>
        <textarea class="form-textarea" id="words-input" placeholder="Start typing here…" style="min-height:260px;font-family:var(--font-sans);font-size:15px;"></textarea>
      </div>
      <div class="btn-row">
        <button class="btn btn-secondary" id="words-clear-btn">🗑 Clear</button>
        <button class="btn btn-secondary" id="words-copy-btn">📋 Copy Text</button>
      </div>
    </div>
  </section>`
}

function initWordsTool() {
  const input = document.getElementById('words-input')
  const set = (id, val) => { document.getElementById(id).textContent = val }

  function update() {
    const txt = input.value
    const words = txt.trim() === '' ? 0 : txt.trim().split(/\s+/).length
    const chars = txt.length
    const charsNs = txt.replace(/\s/g,'').length
    const sentences = (txt.match(/[.!?]+/g) || []).length
    const paras = txt.trim() === '' ? 0 : txt.trim().split(/\n\s*\n/).length
    const readMin = Math.max(1, Math.round(words / 200))

    set('stat-words', words)
    set('stat-chars', chars)
    set('stat-chars-ns', charsNs)
    set('stat-sent', sentences)
    set('stat-para', paras)
    set('stat-read', `~${readMin} min`)
  }

  input.addEventListener('input', update)
  document.getElementById('words-clear-btn').addEventListener('click', () => { input.value = ''; update() })
  document.getElementById('words-copy-btn').addEventListener('click', () => { if (input.value) copyText(input.value) })
}

// ─────────────────────────────────────────────
//  TOOL 4: JSON FORMATTER & VALIDATOR
// ─────────────────────────────────────────────
function renderJsonTool() {
  return `
  <section class="tool-panel" id="panel-json">
    <div class="glass-card">
      <div class="tool-header">
        <h2 class="tool-title"><span class="icon">🔄</span> JSON Formatter & Validator</h2>
        <p class="tool-desc">Paste raw JSON to format, validate and highlight it</p>
      </div>
      <div class="form-group">
        <label class="form-label">Raw JSON Input</label>
        <textarea class="form-textarea" id="json-input" placeholder='{"name":"ToolKit","version":1,"awesome":true}'></textarea>
      </div>
      <div class="btn-row">
        <button class="btn btn-primary" id="json-format-btn">✨ Format & Validate</button>
        <button class="btn btn-secondary" id="json-minify-btn">⬆ Minify</button>
        <button class="btn btn-secondary" id="json-copy-btn">📋 Copy Output</button>
        <button class="btn btn-secondary" id="json-clear-btn">🗑 Clear</button>
      </div>
      <div id="json-status-wrap"></div>
      <pre class="json-output" id="json-output" style="display:none"></pre>
    </div>
  </section>`
}

function syntaxHighlight(json) {
  return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, match => {
    let cls = 'json-num'
    if (/^"/.test(match)) { cls = /:$/.test(match) ? 'json-key' : 'json-str' }
    else if (/true|false/.test(match)) cls = 'json-bool'
    else if (/null/.test(match)) cls = 'json-null'
    return `<span class="${cls}">${match}</span>`
  })
}

function initJsonTool() {
  const input    = document.getElementById('json-input')
  const output   = document.getElementById('json-output')
  const statusW  = document.getElementById('json-status-wrap')

  function setStatus(valid, msg) {
    statusW.innerHTML = `<span class="json-status ${valid ? 'valid' : 'invalid'}">${valid ? '✅' : '❌'} ${msg}</span>`
  }

  document.getElementById('json-format-btn').addEventListener('click', () => {
    try {
      const parsed = JSON.parse(input.value)
      const pretty = JSON.stringify(parsed, null, 2)
      output.innerHTML = syntaxHighlight(pretty.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'))
      output.style.display = 'block'
      setStatus(true, 'Valid JSON')
    } catch(e) {
      setStatus(false, e.message)
      output.style.display = 'none'
    }
  })

  document.getElementById('json-minify-btn').addEventListener('click', () => {
    try {
      const parsed = JSON.parse(input.value)
      const min = JSON.stringify(parsed)
      output.textContent = min
      output.style.display = 'block'
      setStatus(true, `Valid JSON · ${min.length} chars minified`)
    } catch(e) {
      setStatus(false, e.message)
      output.style.display = 'none'
    }
  })

  document.getElementById('json-copy-btn').addEventListener('click', () => {
    if (output.style.display !== 'none') copyText(output.textContent)
  })
  document.getElementById('json-clear-btn').addEventListener('click', () => {
    input.value = ''; output.style.display = 'none'; statusW.innerHTML = ''
  })
}


// ─────────────────────────────────────────────
//  TOOL 5: UNIT CONVERTER
// ─────────────────────────────────────────────


function renderUnitTool() {
  const cats = Object.keys(UNIT_CATEGORIES)
  return `
  <section class="tool-panel" id="panel-unit">
    <div class="glass-card">
      <div class="tool-header">
        <h2 class="tool-title"><span class="icon">🔢</span> Unit Converter</h2>
        <p class="tool-desc">Convert between length, weight, temperature, area, volume, speed</p>
      </div>
      <div class="form-group">
        <label class="form-label">Category</label>
        <select class="form-select" id="unit-cat">
          ${cats.map(c => `<option value="${c}">${c}</option>`).join('')}
        </select>
      </div>
      <div class="unit-from-to">
        <div>
          <label class="form-label" for="unit-from-unit">From</label>
          <select class="form-select" id="unit-from-unit" style="margin-bottom:10px"></select>
          <input type="number" class="form-input" id="unit-from-val" value="1" placeholder="Value">
        </div>
        <button class="swap-btn" id="unit-swap" title="Swap">⇄</button>
        <div>
          <label class="form-label" for="unit-to-unit">To</label>
          <select class="form-select" id="unit-to-unit"></select>
        </div>
      </div>
      <div class="unit-result" id="unit-result">—</div>
      <div class="btn-row" style="margin-top:16px">
        <button class="btn btn-cyan" id="unit-convert-btn">⚡ Convert</button>
        <button class="btn btn-secondary" id="unit-copy-btn">📋 Copy Result</button>
      </div>
    </div>
  </section>`
}

function initUnitTool() {
  const catSel     = document.getElementById('unit-cat')
  const fromUnit   = document.getElementById('unit-from-unit')
  const toUnit     = document.getElementById('unit-to-unit')
  const fromVal    = document.getElementById('unit-from-val')
  const result     = document.getElementById('unit-result')
  const convertBtn = document.getElementById('unit-convert-btn')
  const swapBtn    = document.getElementById('unit-swap')
  const copyBtn    = document.getElementById('unit-copy-btn')

  function populateUnits() {
    const cat = UNIT_CATEGORIES[catSel.value]
    const opts = cat.units.map(u => `<option value="${u}">${u}</option>`).join('')
    fromUnit.innerHTML = opts
    toUnit.innerHTML   = opts
    if (cat.units.length > 1) toUnit.selectedIndex = 1
    convert()
  }

  function convert() {
    const cat  = UNIT_CATEGORIES[catSel.value]
    const from = fromUnit.value
    const to   = toUnit.value
    const val  = parseFloat(fromVal.value)
    if (isNaN(val)) { result.textContent = '—'; return }

    let res
    if (catSel.value === 'Temperature') {
      // to Celsius first
      let c
      if (from === 'Celsius')    c = val
      else if (from === 'Fahrenheit') c = (val - 32) * 5/9
      else c = val - 273.15
      // from Celsius to target
      if (to === 'Celsius')    res = c
      else if (to === 'Fahrenheit') res = c * 9/5 + 32
      else res = c + 273.15
    } else {
      const inBase = val * cat.toBase[from]
      res = inBase / cat.toBase[to]
    }

    const formatted = Math.abs(res) >= 0.001 && Math.abs(res) < 1e10
      ? +res.toPrecision(7)
      : res.toExponential(4)
    result.textContent = `${formatted} ${to}`
  }

  catSel.addEventListener('change', populateUnits)
  fromUnit.addEventListener('change', convert)
  toUnit.addEventListener('change', convert)
  fromVal.addEventListener('input', convert)
  convertBtn.addEventListener('click', convert)
  swapBtn.addEventListener('click', () => {
    const tmp = fromUnit.value; fromUnit.value = toUnit.value; toUnit.value = tmp
    convert()
  })
  copyBtn.addEventListener('click', () => { if (result.textContent !== '—') copyText(result.textContent) })

  populateUnits()
}

// ─────────────────────────────────────────────
//  TOOL 6: QR CODE GENERATOR
// ─────────────────────────────────────────────
function renderQrTool() {
  return `
  <section class="tool-panel" id="panel-qr">
    <div class="glass-card">
      <div class="tool-header">
        <h2 class="tool-title"><span class="icon">📱</span> QR Code Generator</h2>
        <p class="tool-desc">Turn any URL or text into a scannable QR code</p>
      </div>
      <div class="two-col">
        <div>
          <div class="form-group">
            <label class="form-label">Text or URL</label>
            <textarea class="form-textarea" id="qr-input" placeholder="https://example.com" style="min-height:100px;font-family:var(--font-sans);font-size:15px;"></textarea>
          </div>
          <div class="form-group">
            <label class="form-label">Size: <span id="qr-size-label">200px</span></label>
            <div class="slider-container">
              <input type="range" class="form-range" id="qr-size" min="100" max="400" value="200" step="10">
              <span class="slider-value" id="qr-size-val">200</span>
            </div>
          </div>
          <div class="btn-row">
            <button class="btn btn-primary" id="qr-gen-btn">📱 Generate QR</button>
            <button class="btn btn-secondary" id="qr-download-btn" style="display:none">⬇ Download</button>
          </div>
        </div>
        <div>
          <div class="qr-output" id="qr-output">
            <span style="color:#888;font-size:14px">QR code appears here</span>
          </div>
        </div>
      </div>
    </div>
  </section>`
}

function initQrTool() {
  const input    = document.getElementById('qr-input')
  const sizeSlider = document.getElementById('qr-size')
  const sizeVal  = document.getElementById('qr-size-val')
  const genBtn   = document.getElementById('qr-gen-btn')
  const output   = document.getElementById('qr-output')
  const dlBtn    = document.getElementById('qr-download-btn')
  let lastImgUrl = null

  sizeSlider.addEventListener('input', () => {
    sizeVal.textContent = sizeSlider.value
    document.getElementById('qr-size-label').textContent = sizeSlider.value + 'px'
  })

  function generateQR() {
    const text = input.value.trim()
    if (!text) { output.innerHTML = '<span style="color:#888;font-size:14px">Please enter some text or URL</span>'; return }

    const size = sizeSlider.value
    const encodedText = encodeURIComponent(text)
    // Use Google Charts QR API (free, no key needed)
    const url = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodedText}&bgcolor=ffffff&color=000000&margin=10`
    lastImgUrl = url

    output.innerHTML = `<img src="${url}" alt="QR Code" width="${size}" height="${size}" style="border-radius:12px;box-shadow:0 4px 20px rgba(0,0,0,0.3)">`
    dlBtn.style.display = 'inline-flex'
  }

  genBtn.addEventListener('click', generateQR)
  input.addEventListener('keydown', e => { if (e.key === 'Enter' && e.ctrlKey) generateQR() })

  dlBtn.addEventListener('click', () => {
    if (!lastImgUrl) return
    const a = document.createElement('a')
    a.href = lastImgUrl
    a.download = 'qrcode.png'
    a.target = '_blank'
    a.click()
  })
}

// ─── Init All Tools ───────────────────────────
function init() {
  initPasswordTool()
  initColorTool()
  initWordsTool()
  initJsonTool()
  initUnitTool()
  initQrTool()
}

init()
