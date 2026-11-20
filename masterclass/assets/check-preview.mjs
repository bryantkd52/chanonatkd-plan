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
ok(read("personal/index.html").includes("Forjando Bases 1")&&read("personal/index.html").includes("Forjando Bases 2")&&read("personal/index.html").includes("Avanzado de Campeones"),"Tres entrenamientos personalizados vigentes");
const system=read("system/index.html");
for(const [name,mxn,usd,eur] of [
 ["System Esencial","$950 MXN","$69 USD","€65 EUR"],
 ["System Full","$1,350 MXN","$99 USD","€89 EUR"]
])ok([name,mxn,usd,eur].every(x=>system.includes(x)),"Oferta vigente "+name);
ok(!/\$104\.69|€92\.41|entrenamiento grupal online semanal|sábados a las 6/.test(system),"Sin precios ni clases grupales anteriores");
ok(system.includes("tres clases nuevas cada semana")&&system.includes("Poomsae")&&system.includes("pateo")&&system.includes("flexibilidad"),"Tres clases semanales en System");
ok(system.includes("Esencial no incluye toda la Academia Digital"),"Esencial sin Academia completa");
ok(system.includes("solo mientras tu membresía Full esté activa"),"Academia de Full condicionada a membresía");
const personal=read("personal/index.html");
for(const [name,mxn,usd,eur] of [
 ["Forjando Bases 1","$1,400 MXN","$99 USD","€89 EUR"],
 ["Forjando Bases 2","$1,800 MXN","$129 USD","€119 EUR"],
 ["Avanzado de Campeones","$2,600 MXN","$164.24 USD","€145.02 EUR"]
])ok([name,mxn,usd,eur].every(x=>personal.includes(x)),"Oferta vigente "+name);
ok(personal.includes("los maestros Bryan Herrera Chanona y José"),"Profesores correctos");
ok(personal.includes('data-teacher="jose" hidden'),"Espacio reservado para la presentación de José");
ok(personal.includes("La asignación se acuerda")&&!personal.includes("ChanonaTKD Personal"),"Asignación del profesor y nombre anterior retirado");
ok(personal.includes("dos sesiones semanales")&&personal.includes("una sesión semanal"),"Periodicidad personalizada");
const academia=read("academia/index.html");
ok(academia.includes("$1,950 MXN")&&academia.includes("$149 USD")&&academia.includes("€139 EUR"),"Academia con precio único aprobado");
ok(!/\$2,800|\$184\.72|€163\.04|pago en dos partes|Super Curso Ilimitado|futuras actualizaciones/.test(academia),"Sin precios anteriores ni promesas sin confirmar");
ok(academia.includes("Acceso de por vida")||academia.includes("acceso de por vida"),"Academia vitalicia");
ok(academia.includes("corresponden exclusivamente a la membresía System"),"Sin promesa de tres clases semanales en Academia");
const confirmedVideoIds=[
  ["TuMB_hCQ7iQ","KgiyepVqdlw","ecPeVfg-bN0"],
  ["7mYwor8DNaE","TiGZvPVFXIM","lRna-IZ27_o"],
  ["nzVEWspvXWs","8BMOdQuJrc8","OOrz4Ow0vBk"]
];
for(const trio of confirmedVideoIds)for(const id of trio)ok(content.includes("https://youtu.be/"+id),"Miniclase oficial "+id);
ok((content.match(/"provisional": false/g)||[]).length===9,"Nueve miniclases definitivas");
ok(!content.includes("2jg7b-W2QRU"),"Sin videos genéricos");
ok((testimonials.match(/"isExample": true/g)||[]).length===10,"Diez testimonios ficticios separados");
ok(js.includes('location.protocol!=="file:"'),"Ejemplos ficticios excluidos de la web pública");
ok(demo.tab.id==="principiantes","Fuente Principiantes");
ok(demoScript.includes("window.CTKD_BEGINNERS_DEMO=")&&demoScript.includes('"id": "principiantes"'),"Muestra precargada, sin fetch obligatorio");
ok(js.includes('$$("[data-wa]").forEach'),"Inicialización de WhatsApp no detiene el resto del script");
ok(demo.tab.calentamiento.length===1&&demo.tab.chanonaflex.length===2&&demo.tab.isometrico.length===3&&demo.tab.pateoTecnico.length===4,"Diez ejercicios reales");
ok(!JSON.stringify(demo).includes("drive.google.com"),"Sin enlaces privados en la muestra");
ok(css.includes("prefers-reduced-motion")&&css.includes(":focus-visible"),"Accesibilidad básica");
ok(js.includes('dialog.addEventListener("close"'),"Cierre del modal");
ok(js.includes('class="demoClassPlaceholder"')&&js.includes('aria-expanded="false"'),"Clases demostrativas desplegables");
ok(js.includes('$$("[data-video-demo]",app).forEach(btn=>'),"Botones de clase conectados con querySelectorAll");
ok(js.includes('$$("[data-video-demo]",app).forEach(x=>'),"Cierre de botones de clase con querySelectorAll");
ok(js.includes('$$(".demoClassPlaceholder",app).forEach(x=>'),"Cascada de paneles con querySelectorAll");
ok(!/(?<!\\$)\\$\\("\\[data-video-demo\\]",app\\)\\.forEach/.test(js),"Evita usar querySelector individual con forEach");
ok(!/(?<!\\$)\\$\\("\\.demoClassPlaceholder",app\\)\\.forEach/.test(js),"Evita usar querySelector individual con forEach");
ok(!js.includes('Reproducir video provisional'),"Sin videos privados ni videos provisionales en el plan");
ok(css.includes("demoClassPlaceholder"),"Estilo de tarjetas desplegables");
const home=read("index.html");
ok(home.includes("Desde $1,400 MXN / mes")&&home.includes("Esencial: $950 MXN / mes")&&home.includes("Pago único: $1,950 MXN"),"Tarjetas de Inicio actualizadas");
for(const p of pages){
 const html=read(p);
 ok(!html.includes("Personal Training")&&!html.includes("Academia Digital CTKD"),"Sin etiquetas antiguas en "+p);
 ok(html.includes(">Personalizados</a>"),"Pie de página y navegación de personalizados en "+p);
 const whatsapp=[...html.matchAll(/<a\b[^>]*data-wa="([^"]+)"[^>]*href="https:\/\/wa\.me\/(\d+)\?text=([^"]+)"[^>]*>/g)];
 if(p!=="curriculum/index.html"&&p!=="index.html")ok(whatsapp.length>=2,"Botones WhatsApp en "+p);
 for(const m of whatsapp)ok(m[2]==="529987406579"&&m[1]===m[3],"WhatsApp consistente en "+p);
}
ok(css.includes(".purchase.offerStack")&&css.includes("@media(max-width:380px)"),"Tarjetas adaptables a celular");
ok(!js.includes("consulta_pago_dividido"),"Evento de pagos divididos retirado");

console.log("\n"+checks+" verificaciones estáticas completas. Faltan pruebas visuales reales.");
