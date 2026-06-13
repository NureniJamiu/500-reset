const width = 393;
const height = 852;
const SCANNER_SIZE = 280;
const x = (width - SCANNER_SIZE) / 2;
const y = (height - SCANNER_SIZE) / 2 - 40;
const r = 32;
const w = SCANNER_SIZE;
const h = SCANNER_SIZE;

const path = `
  M0,0 H${width} V${height} H0 Z
  M${x + r},${y}
  H${x + w - r}
  A${r},${r} 0 0,1 ${x + w},${y + r}
  V${y + h - r}
  A${r},${r} 0 0,1 ${x + w - r},${y + h}
  H${x + r}
  A${r},${r} 0 0,1 ${x},${y + h - r}
  V${y + r}
  A${r},${r} 0 0,1 ${x + r},${y}
  Z
`;
console.log(path);
