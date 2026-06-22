// Foto van kleurpalleten in ai gezet en een kleurschema laten generen
// Contrast ratios verified against WCAG AA (4.5:1 for text, 3:1 for UI)

const palettes = [
  // Cherry & Lilac — dark cherry bg, lilac text
  // text 8.1:1 ✓  muted 5.1:1 ✓  dim 5.4:1 ✓  faint 3.2:1 (decorative only)
  ['#3e0202','#5a0404','#6b1010','#c0a8d8','#9a80ba','#a880c8','#7a60a0',
   '#c0a8d8','#5a1010','#6b1010','#c0a8d8','#3e0202','#c0a8d8'],

  // Cherry & Matcha — matcha bg, cherry text
  // text 8.1:1 ✓  muted 6.2:1 ✓  dim 7.3:1 ✓  faint 4.6:1 ✓
  ['#bad797','#a8c880','#90b465','#670626','#880a3a','#770030','#550020',
   '#670626','#a0c070','#90b465','#670626','#bad797','#670626'],

  // Citron & Tyrian Purple — citron bg, purple text
  // text 7.9:1 ✓  muted 5.9:1 ✓  dim 7.0:1 ✓  faint 4.9:1 ✓
  ['#cad183','#b8c070','#a0aa55','#66023c','#880550','#770042','#550030',
   '#66023c','#b0bc60','#a0aa55','#66023c','#cad183','#66023c'],

  // Tomato & Eggplant — dark eggplant bg, tomato text
  // text 5.0:1 ✓  muted 5.9:1 ✓  dim 6.6:1 ✓  faint 7.3:1 ✓
  ['#351431','#4a2048','#5e3060','#f55d3e','#ff7055','#ff8060','#ff9070',
   '#f55d3e','#4a1845','#5e3060','#f55d3e','#351431','#f55d3e'],

  // Deep Purple & Almond Oil — almond bg, purple text
  // text 14.3:1 ✓  muted 10.4:1 ✓  dim 7.2:1 ✓  faint 5.4:1 ✓
  ['#f0ecce','#e4e0be','#ccc8a0','#320b35','#50205a','#6a3890','#7848a0',
   '#320b35','#d8d4b0','#ccc8a0','#320b35','#f0ecce','#320b35'],

  // Claret & Pink — pink bg, claret text
  // text 8.2:1 ✓  muted 6.2:1 ✓  dim 4.5:1 ✓  faint 4.7:1 ✓
  ['#ffbdc5','#f0a8b2','#e09098','#670626','#880a38','#aa1850','#660028',
   '#670626','#f0a8b4','#e09098','#670626','#ffbdc5','#670626'],

  // Periwinkle & Hunter Green — periwinkle bg, green text
  // text 5.0:1 ✓  muted 7.2:1 ✓  dim 10.1:1 ✓  faint 13.0:1 ✓
  ['#cbd9ff','#b8c8f0','#a0b4e0','#3f6048','#2a4832','#183020','#0a1808',
   '#3f6048','#b0c4ec','#a0b4e0','#3f6048','#cbd9ff','#3f6048'],

  // Pistachio & Chocolate Brown — pistachio bg, brown text
  // text 10.2:1 ✓  muted 7.4:1 ✓  dim 5.0:1 ✓  faint 4.6:1 ✓
  ['#badd7f','#a8cc68','#90b850','#391d01','#5a3010','#7a4818','#502200',
   '#391d01','#a0c860','#90b850','#391d01','#badd7f','#391d01'],

  // Original — warm off-white + black
  ['#f5f4f0','#ece9e3','#ddd','#111','#444','#666','#999',
   '#111','#e0e0dc','#ddd','#111','#f5f4f0','#111'],
];

const paletteKeys = [
  '--color-bg','--color-bg-hover','--color-bg-grid',
  '--color-text','--color-text-muted','--color-text-dim','--color-text-faint',
  '--color-border','--color-border-ui','--color-border-nav',
  '--color-bar-bg','--color-bar-text','--color-shadow',
];

const palette = palettes[Math.floor(Math.random() * palettes.length)];
const root = document.documentElement;
paletteKeys.forEach((key, i) => root.style.setProperty(key, palette[i]));
