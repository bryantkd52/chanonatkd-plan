(function(){
const IDS=new Set(["sr_jeremias","alma_patricia","evan_mael","daniele_biasetti","mtro_mariano_agustina","rodrigo_jalisco","diana_rodriguez","luis_holanda","emilio_cdmx","benyoced_calzadilla"]);
const FILES=new Map([
["plan_sr_jeremias.json","sr_jeremias"],
["plan_alma_patricia.json","alma_patricia"],
["plan_evan_mael.json","evan_mael"],
["plan_daniele_biasetti.json","daniele_biasetti"],
["plan_mtro_mariano_agustina.json","mtro_mariano_agustina"],
["plan_rodrigo_jalisco.json","rodrigo_jalisco"],
["plan_diana_rodriguez.json","diana_rodriguez"],
["plan_luis_holanda.json","luis_holanda"],
["plan_emilio_cdmx.json","emilio_cdmx"],
["plan_benyoced_calzadilla.json","benyoced_calzadilla"]
]);
const PRESERVE_FLEX=new Set(["emilio_cdmx","benyoced_calzadilla"]);
const LINKS={
pre:"https://drive.google.com/file/d/1mV7dkockaExAief_qW7RsMUuouwfMKM7/view?usp=sharing",
nivel3:"https://drive.google.com/file/d/16UN5_qf8r8Vr5SVuWnuU5KaNibrzFcDQ/view?usp=sharing",
gluteo:"https://drive.google.com/file/d/1S4PWmc52Ot9k-IrXt38L-Spx0tjqj8Lr/view?usp=sharing",
yop:"https://drive.google.com/file/d/1ptuIEmfskjKeBhYfvW4JZVvW5hIIdCbx/view?usp=sharing",
ap:"https://drive.google.com/file/d/1kbkZqudxFm3GqgXyrEiKM_ODwrMk3ppx/view?usp=sharing",
tobillo:"https://drive.google.com/file/d/1Sux7kXiJImkagl3ye2nN2bMjqmJOa18O/view?usp=drive_link",
propuesta:"https://drive.google.com/file/d/1dmkR7vXtDA1P19Ymc8cgoIUFqoUVsdO4/view?usp=sharing",
silla:"https://drive.google.com/file/d/1AS4bfSKwxw9duMZ6Rif4EaldzgSabrGS/view?usp=sharing",
split:"https://drive.google.com/file/d/1y5VPwL9XoGo8javxUs5KPpsFRhmVpoyA/view?usp=sharing"
};
function current(){return new URL(location.href).searchParams.get("alumno")||""}
function item(titulo,dia,enfoque,reps,url){return{titulo,dia,enfoque,reps,tipo:url?"video":"info",...(url?{url}:{})}}
function iso(){return[
item("Glúteo y gancho - Isométrico activo - Intermedio","LUNES - VIERNES","Trabajar fuerza de glúteo y control de cadera.","Según indicación del video",LINKS.gluteo),
item("Isométrico Activo - Yop Chagui - Nivel 1","MARTES - JUEVES","Trabajar cámara, pierna de apoyo y alineación.","Según indicación del video",LINKS.yop),
item("Isométrico activo - Ap Chagui - Nivel 1","MIÉRCOLES - SÁBADO","Trabajar fuerza de Ap Chagui y recobro limpio.","Según indicación del video",LINKS.ap)
]}
function flex(){return[
item("Pre-Chanonaflex - Estiramiento inicial","LUNES A SÁBADO","Preparar el cuerpo antes del trabajo principal.","Según indicación del video",LINKS.pre),
item("Chanonaflex Desde Propuesta - Nivel 3","LUNES A SÁBADO","Trabajar rango, control y alineación.","Según indicación del video",LINKS.nivel3)
]}
function kick(full){
const arr=[
item("Ejercicio de fortalecimiento de tobillo con banda","LUNES - MIÉRCOLES","Realizar cada repetición extremadamente lento.","5 reps por lado extremadamente lento / 1 serie",LINKS.tobillo),
item("Propuesta + ap chagui reps","LUNES - MIÉRCOLES","Trabajar cámara, extensión y regreso con control.",""+(full?"10 reps x pierna / 2 series (1 rápida y 1 normal)":"5 reps x pierna / 2 series"),LINKS.propuesta),
item("Silla + Ap Chaguis 3 niveles","LUNES - MIÉRCOLES","Trabajar control técnico con apoyo de silla.",""+(full?"10 reps x pierna / 2 series (1 ultra rápida y 1 normal)":"5 reps x pierna / 2 series"),LINKS.silla)
];
if(full)arr.push(item("Split de Yop Chagui","MARTES - JUEVES","No debe doler la rodilla.","10 reps / 2 series / no debe doler rodilla",LINKS.split));
return arr}
const FINAL=[
"En las próximas dos semanas estaremos trabajando en ejercicios específicos para enfocarnos en los puntos de corrección que vemos en clase. No es necesario hacer cosas extras a esto, ya que está exactamente como lo necesitas. Procura seguirlo al pie de la letra y, si necesitas reconfigurar algo, coméntame y te digo cómo lo vas a hacer.",
"¡Feliz entrenamiento y seguimos dándole con todo como se debe!"
];
function patch(plan,id){
if(!plan)return plan;
plan.ciclo="Miércoles 30 de septiembre al miércoles 14 de octubre del 2026";
plan.updated_at="Actualizado miércoles 30 de septiembre de 2026";
if(!PRESERVE_FLEX.has(id)){plan.chanonaflexDias="LUNES A SÁBADO";plan.chanonaflex=flex()}
plan.isometricoDias="GLÚTEO: LUNES - VIERNES / YOP CHAGUI: MARTES - JUEVES / AP CHAGUI: MIÉRCOLES - SÁBADO";
plan.isometrico=iso();
const full=!PRESERVE_FLEX.has(id);
plan.pateoDias=full?"LUNES - MIÉRCOLES / MARTES - JUEVES":"LUNES - MIÉRCOLES";
plan.pateoTecnico=kick(full);
plan.poomsaeDias="NO ASIGNADO A ESTE ALUMNO";
plan.poomsae=[];
plan.indicacionesExtras=[];
plan.apuntes=[];
plan.notasFinales=[...FINAL];
plan.enfoque_corto="Ciclo 30 de septiembre al 14 de octubre";
plan.enfoque=full
?"ChanonaFlex: lunes a sábado. Isométricos: lunes-viernes / martes-jueves / miércoles-sábado. Pateo técnico: lunes-miércoles / martes-jueves. Poomsae: no asignado."
:"ChanonaFlex: según estructura actual. Isométricos: lunes-viernes / martes-jueves / miércoles-sábado. Pateo técnico: lunes-miércoles. Poomsae: no asignado.";
return plan}
window.__FOUNDATIONS_20260930_TARGETS=IDS;
window.__isFoundations20260930Target=function(){return IDS.has(current())};
const oldFetch=window.fetch.bind(window);
window.fetch=async function(input,init){
const response=await oldFetch(input,init);
try{
const url=typeof input==="string"?input:(input&&input.url)||"";
const m=String(url).match(/data\/planes\/([^?#/]+\.json)/);
const id=m?FILES.get(m[1]):null;
if(id){
const data=await response.clone().json();
const headers=new Headers(response.headers);headers.set("content-type","application/json; charset=utf-8");
return new Response(JSON.stringify(patch(data,id)),{status:response.status,statusText:response.statusText,headers})
}
}catch(e){return response}
return response
};
})();