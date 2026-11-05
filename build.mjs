import { readFile, writeFile, mkdir, copyFile } from 'node:fs/promises';
const parts=['engine','content','history','art','model-results','app'];
const js=(await Promise.all(parts.map(p=>readFile(`src/${p}.js`,'utf8')))).map(s=>s.replace(/^import .*;\n/gm,'').replace(/^export /gm,'')).join('\n');
const css=await readFile('src/style.css','utf8');
const fragment=`<style>${css}</style>\n<div id="renaissance-app"></div>\n<script>(()=>{\n${js}\n})();</script>\n`;
const page=`<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description" content="A playable historical survival game. Six decisions in Renaissance Italy; original artwork, uncertain fortunes, and the pursuit of discovery."><meta name="theme-color" content="#181b17"><title>Renaissance Scientist: Survival Against the Odds</title><style>html,body{margin:0;padding:0;background:#181b17}body{min-width:280px}</style></head><body>${fragment}<noscript>This game needs JavaScript to resolve choices and show outcomes. Please enable it to begin your career.</noscript></body></html>`;
await mkdir('dist',{recursive:true});
await writeFile('dist/index.html',page);
await mkdir('dist/assets',{recursive:true});
for (const name of ['observatory','lens-workshop','print-shop']) await copyFile(`assets/${name}.webp`,`dist/assets/${name}.webp`);
// This response-only fragment previews the same app, with no network dependencies.
let inlinePreview=fragment.replace('<style>', '<style>#renaissance-app{min-height:0!important}');
for (const name of ['observatory','lens-workshop','print-shop']) { const data=(await readFile(`assets/${name}.webp`)).toString('base64'); inlinePreview=inlinePreview.replaceAll(`assets/${name}.webp`,`data:image/webp;base64,${data}`); }
await writeFile('/workspace/renaissance-scientist-images-review.html',inlinePreview); 
console.log(`Built ${Buffer.byteLength(page)} bytes. No runtime dependencies or external visual assets.`);
