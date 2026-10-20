// Regenera septenios-app.html (versión de un solo archivo) a partir de
// index.html + styles.css + app.js.
//
// Uso:  node build.js
//
// Es un "empaquetador": incrusta el CSS y el JS dentro del HTML para que la
// copia resultante se pueda abrir con doble clic, mandar por mail o guardar
// sin conexión. No minifica ni modifica el contenido.
//
// Nota: el reemplazo se hace con una FUNCIÓN (no con un string) porque si el
// JS contiene "$$", String.replace lo interpretaría como secuencia de escape.

const fs = require('fs');
const path = require('path');

const dir = __dirname;
const read = (f) => fs.readFileSync(path.join(dir, f), 'utf8');

let h = read('index.html');
const css = read('styles.css');
const js = read('app.js');

h = h.replace('<link rel="stylesheet" href="styles.css">', () => '<style>\n' + css + '\n</style>');
h = h.replace('<script src="app.js"></script>', () => '<script>\n' + js + '\n</script>');

const out = path.join(dir, 'septenios-app.html');
fs.writeFileSync(out, h);
console.log('generado septenios-app.html:', (fs.statSync(out).size / 1024).toFixed(1), 'KB');
