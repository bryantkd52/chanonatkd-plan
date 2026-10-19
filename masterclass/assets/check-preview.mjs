// Validaciones estáticas sin dependencias: node masterclass/assets/check-preview.mjs
import {readFileSync,existsSync} from "node:fs";
import {dirname,join,resolve} from "node:path";
import {fileURLToPath} from "node:url";
const dir=dirname(fileURLToPath(import.meta.url));
const root=resolve(dir,"..");
const read=p=>readFileSync(join(root,p),"utf8");
const pages=["index.html","system/index.html","personal/index.html","academia/index.html","curriculum/index.html"];
const content=read("assets/content.js");
const demo=JSON.parse(read("assets/system-beginners-demo.json"));
const testimonials=read("assets/testimonios-ejemplo.js");
const css=read("assets/site.css");
const demoScript=read("assets/system-beginners-demo-data.js");
const js=read("assets/site.js");
let checks=0;
function ok(cond,msg){checks++;if(!cond)throw new Error("FALLÓ: "+msg);console.log("OK:",msg)}
for(const p of pages)ok(existsSync(join(root,p)),"Existe "+p);
for(const p of pages){
 const s=read(p);
 ok(s.includes('class="siteHeader glass"')&&s.includes('class="siteNav"'),"Navegación en "+p);
 ok(s.includes('class="themeToggle"')&&s.includes("site.js"),"Modo claro/oscuro en "+p);
 const prefix=p==="index.html"?"./":"../";
 for(const sub of ["system","personal","academia","curriculum"])ok(s.includes('href="'+prefix+sub+'/index.html"'),"Ruta "+sub+" desde "+p);
}
ok(!pages.some(p=>read(p).includes("System FULL")),"Sin nombre System FULL");
ok(!pages.some(p=>read(p).includes("Forjando Bases")),"Sin planes antiguos");
ok(read("system/index.html").includes("$1,350 MXN")&&read("system/index.html").includes("$104.69")&&read("system/index.html").includes("€92.41"),"Precio System en 3 monedas");
ok(read("personal/index.html").includes("$2,600 MXN")&&read("personal/index.html").includes("$164.24")&&read("personal/index.html").includes("€145.02"),"Precio Personal en 3 monedas");
ok(read("academia/index.html").includes("$2,800 MXN")&&read("academia/index.html").includes("$184.72")&&read("academia/index.html").includes("€163.04"),"Precio Academia en 3 monedas");
ok((content.match(/"provisional": true/g)||[]).length===9,"Nueve miniclases provisionales configuradas");
ok((testimonials.match(/"isExample": true/g)||[]).length===10,"Diez testimonios ficticios separados");
ok(js.includes('get("revision")!=="1"'),"Ocultos fuera de revisión");
ok(demo.tab.id==="principiantes","Fuente Principiantes");
ok(demoScript.includes("window.CTKD_BEGINNERS_DEMO=")&&demoScript.includes('"id": "principiantes"'),"Muestra precargada, sin fetch obligatorio");
ok(js.includes('$$("[data-wa]").forEach'),"Inicialización de WhatsApp no detiene el resto del script");
ok(demo.tab.calentamiento.length===1&&demo.tab.chanonaflex.length===2&&demo.tab.isometrico.length===3&&demo.tab.pateoTecnico.length===4,"Diez ejercicios reales");
ok(!JSON.stringify(demo).includes("drive.google.com"),"Sin enlaces privados en la muestra");
ok(css.includes("prefers-reduced-motion")&&css.includes(":focus-visible"),"Accesibilidad básica");
ok(js.includes('dialog.addEventListener("close"')&&js.includes("about:blank"),"Cierre y detención de video");
console.log("\n"+checks+" verificaciones estáticas completas. Faltan pruebas visuales reales.");
