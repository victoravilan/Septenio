# Septenios · Ciclos de 7 años y de 52 días

Aplicación web progresiva (PWA) que calcula y explica:

- los **12 septenios** de 7 años (0–7 … 77–84) más el *bonus track* de los 84+,
- los **7 ciclos anuales de 52 días** que arrancan en tu cumpleaños,
- la evidencia sobre **creatividad y fertilidad mental después de los 60**, con 42 figuras históricas,
- un diario de ciclos, glosario y cuenta opcional con clave secreta.

Todo corre en el navegador: no hay servidor, ni base de datos, ni analítica. Los datos quedan en el dispositivo.

---

## 1. Probar en local

```bash
# dentro de la carpeta del proyecto
python3 -m http.server 8080
# abrí http://localhost:8080
```

También se puede abrir `septenios-app.html` directamente con doble clic: es una versión de
archivo único (HTML + CSS + JS incrustados) pensada para compartir o usar sin conexión.

> El service worker solo se registra sobre `https://` o `localhost`, como exigen los navegadores.

## 2. Instalar como app en el teléfono

- **Android / Chrome**: entrá al sitio y tocá *Instalar aplicación*, o usá el botón ⇩ de la barra superior.
- **iPhone / Safari**: botón *Compartir* → *Añadir a la pantalla de inicio*.
- Una vez instalada abre a pantalla completa y **funciona sin conexión**.

## 3. Publicar en GitHub

```bash
git init
git add .
git commit -m "Septenios: app PWA de ciclos de 7 años y 52 días"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/septenios.git
git push -u origin main
```

Si preferís la herramienta oficial: `gh repo create septenios --public --source=. --push`.

## 4. Publicar en Netlify (recomendado)

**Opción A — arrastrar y soltar (la más rápida)**
1. Entrá a <https://app.netlify.com/drop>.
2. Arrastrá la carpeta del proyecto (o el archivo `septenios-app.html` si querés una sola pieza).
3. Netlify te da una URL pública con HTTPS al instante.

**Opción B — conectada a GitHub (la recomendada)**
1. *Add new site* → *Import an existing project* → elegí GitHub y autorizá.
2. Seleccioná el repo `septenios`.
3. Dejá el comando de build vacío y *Publish directory* en `.` (ya lo define `netlify.toml`).
4. *Deploy*. Cada `git push` a `main` vuelve a publicar solo.

**Opción C — por línea de comandos**

```bash
npm i -g netlify-cli
netlify login
netlify deploy --prod      # o: netlify deploy   para una vista previa
```

Después podés sumar un dominio propio en *Domain settings* (Netlify emite el certificado solo).

## 5. Actualizar la app después de publicada

El service worker guarda los archivos en caché. Cuando cambies algo:

1. Subí el número de `VERSION` en `sw.js` (por ejemplo `septenios-v2`).
2. Hacé commit y push.

En la próxima visita el navegador descarga la nueva versión y borra la caché vieja.
`netlify.toml` ya evita que `sw.js` quede cacheado, así que el cambio llega siempre.

## 6. Estructura

```
index.html              estructura + registro del service worker
styles.css              tema cósmico, claro y oscuro
app.js                  datos (septenios, ciclos, figuras, evidencia) + lógica + vistas
manifest.webmanifest    nombre, iconos, atajos y modo de pantalla
sw.js                   service worker: modo sin conexión
icons/                  iconos 192, 512, maskable, Apple touch y favicon
septenios-app.html      versión de archivo único (se genera desde los anteriores)
netlify.toml            cabeceras y publicación
```

## 7. Aviso

Contenido de desarrollo personal y astrología cultural, de carácter **informativo y reflexivo**:
no es diagnóstico psicológico ni consejo médico.

Creado y diseñado por: **Victor. M.F. Avilan.**
Valor Agregado - Todos los derechos reservados
