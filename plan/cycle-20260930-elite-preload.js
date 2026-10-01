(function(){
const TARGET_IDS=new Set(["karen_sanchez","rodrigo_gonzalez","leonardo_gonzalez","omar_azi","rafa_hernandez","scarlet_arianna","anna_georgia","patricio_leigh","maria_ponce","leticia_erguera","nancy_vermilus","ximena_palacios"]);
const TARGET_PLAN_FILES=new Map([
["plan_karen_sanchez.json","karen_sanchez"],["plan_rodrigo_gonzalez.json","rodrigo_gonzalez"],["plan_leonardo_gonzalez.json","leonardo_gonzalez"],["plan_omar_azi.json","omar_azi"],["plan_rafa.json","rafa_hernandez"],["plan_scarlet_arianna.json","scarlet_arianna"],["plan_anna_georgia.json","anna_georgia"],["plan_patricio_leigh.json","patricio_leigh"],["plan_maria_ponce.json","maria_ponce"],["plan_leticia_erguera.json","leticia_erguera"],["plan_nancy_vermilus.json","nancy_vermilus"],["plan_ximena_palacios.json","ximena_palacios"]]);
const LINKS={
pre:"https://drive.google.com/file/d/1mV7dkockaExAief_qW7RsMUuouwfMKM7/view?usp=sharing",
nivel3:"https://drive.google.com/file/d/16UN5_qf8r8Vr5SVuWnuU5KaNibrzFcDQ/view?usp=sharing",
gluteo:"https://drive.google.com/file/d/1S4PWmc52Ot9k-IrXt38L-Spx0tjqj8Lr/view?usp=sharing",
yopIso1:"https://drive.google.com/file/d/1ptuIEmfskjKeBhYfvW4JZVvW5hIIdCbx/view?usp=sharing",
apIso1:"https://drive.google.com/file/d/1kbkZqudxFm3GqgXyrEiKM_ODwrMk3ppx/view?usp=sharing",
cadera:"https://drive.google.com/open?id=1-mLzWj3XiEzCeul7LaIWuPzP39qQ6VtQ&usp=drive_copy",
tobillo:"https://drive.google.com/file/d/1Sux7kXiJImkagl3ye2nN2bMjqmJOa18O/view?usp=drive_link",
propuestaAp:"https://drive.google.com/file/d/1dmkR7vXtDA1P19Ymc8cgoIUFqoUVsdO4/view?usp=sharing",
sillaAp:"https://drive.google.com/file/d/1AS4bfSKwxw9duMZ6Rif4EaldzgSabrGS/view?usp=sharing",
splitYop:"https://drive.google.com/file/d/1y5VPwL9XoGo8javxUs5KPpsFRhmVpoyA/view?usp=sharing",
yopPiso:"https://drive.google.com/file/d/1ZQ3ud3bkEQJcvSnUelWDVR4ECdwv1_Vn/view?usp=sharing",
koryoL3:"https://drive.google.com/file/d/1dlhr114oOT6oiKKaD_02J-MUBPEma9Gn/view?usp=sharing"
};
function current(){return new URL(location.href).searchParams.get("alumno")||""}
function lang(id){return id==="anna_georgia"?"en":id==="nancy_vermilus"?"fr":"es"}
function item(titulo,dia,enfoque,reps,url){return {titulo,dia,enfoque,reps,tipo:url?"video":"info",...(url?{url}:{})}}
function flex(l){
if(l==="en")return[item("Pre-Chanonaflex - Initial stretch","MONDAY TO SATURDAY","Prepare the body before the main workload.","Follow the video",LINKS.pre),item("Chanonaflex From Proposal - Level 3","MONDAY TO SATURDAY","Work range, control and alignment.","Follow the video",LINKS.nivel3)];
if(l==="fr")return[item("Pré-Chanonaflex - Étirement initial","LUNDI À SAMEDI","Préparer le corps avant le travail principal.","Suivre la vidéo",LINKS.pre),item("Chanonaflex depuis la proposition - Niveau 3","LUNDI À SAMEDI","Travailler l’amplitude, le contrôle et l’alignement.","Suivre la vidéo",LINKS.nivel3)];
return[item("Pre-Chanonaflex - Estiramiento inicial","LUNES A SÁBADO","Preparar el cuerpo antes del trabajo principal.","Según indicación del video",LINKS.pre),item("Chanonaflex Desde Propuesta - Nivel 3","LUNES A SÁBADO","Trabajar rango, control y alineación.","Según indicación del video",LINKS.nivel3)]}
function iso(l){
if(l==="en")return[item("Glute and hook - Active isometric - Intermediate","MONDAY - FRIDAY","Glute strength and hip control.","Follow the video",LINKS.gluteo),item("Active Isometric - Yop Chagui - Level 1","TUESDAY - THURSDAY","Chamber, support leg and alignment.","Follow the video",LINKS.yopIso1),item("Active isometric - Ap Chagui - Level 1","WEDNESDAY - SATURDAY","Front-kick strength and clean recovery.","Follow the video",LINKS.apIso1)];
if(l==="fr")return[item("Fessier et crochet - Isométrique actif - Intermédiaire","LUNDI - VENDREDI","Force du fessier et contrôle de la hanche.","Suivre la vidéo",LINKS.gluteo),item("Isométrique actif - Yop Chagui - Niveau 1","MARDI - JEUDI","Chambre, jambe d’appui et alignement.","Suivre la vidéo",LINKS.yopIso1),item("Isométrique actif - Ap Chagui - Niveau 1","MERCREDI - SAMEDI","Force de l’Ap Chagui et retour propre.","Suivre la vidéo",LINKS.apIso1)];
return[item("Glúteo y gancho - Isométrico activo - Intermedio","LUNES - VIERNES","Trabajar fuerza de glúteo y control de cadera.","Según indicación del video",LINKS.gluteo),item("Isométrico Activo - Yop Chagui - Nivel 1","MARTES - JUEVES","Trabajar cámara, pierna de apoyo y alineación.","Según indicación del video",LINKS.yopIso1),item("Isométrico activo - Ap Chagui - Nivel 1","MIÉRCOLES - SÁBADO","Trabajar fuerza de Ap Chagui y recobro limpio.","Según indicación del video",LINKS.apIso1)]}
function kick(l){
if(l==="en")return[
item("Hip rotation with elastic band","MONDAY - WEDNESDAY","Maximum speed with technical control.","20 reps at maximum speed / 4 series / 15 sec rest between series",LINKS.cadera),
item("Ankle strengthening exercise with band","MONDAY - WEDNESDAY","Perform each repetition extremely slowly.","5 reps each side, extremely slow / 1 series",LINKS.tobillo),
item("Proposal + Ap Chagui reps","MONDAY - WEDNESDAY","One fast series and one normal series.","10 reps per leg / 2 series (1 fast and 1 normal)",LINKS.propuestaAp),
item("Chair + Ap Chagui 3 levels","MONDAY - WEDNESDAY","One ultra-fast series and one normal series.","10 reps per leg / 2 series (1 ultra-fast and 1 normal)",LINKS.sillaAp),
item("Yop Chagui Split","TUESDAY - THURSDAY","The knee should not hurt.","10 reps / 2 series / knee must not hurt",LINKS.splitYop),
item("Yop Chagui + floor touch + balance","TUESDAY - THURSDAY","Do not move the support foot even if the kicking leg drops.","5 reps each side / 2 series",LINKS.yopPiso),
item("Koryo Line 3 - Squat and chamber","TUESDAY - THURSDAY","Do not move the support foot even if the kicking leg drops.","5 reps each side / 2 series",LINKS.koryoL3)];
if(l==="fr")return[
item("Rotation de hanche avec bande élastique","LUNDI - MERCREDI","À vitesse maximale tout en gardant le contrôle technique.","20 répétitions à vitesse maximale / 4 séries / 15 s de repos entre les séries",LINKS.cadera),
item("Renforcement de la cheville avec bande","LUNDI - MERCREDI","Effectuer chaque répétition extrêmement lentement.","5 répétitions de chaque côté, extrêmement lentes / 1 série",LINKS.tobillo),
item("Proposition + répétitions d’Ap Chagui","LUNDI - MERCREDI","Une série rapide et une série normale.","10 répétitions par jambe / 2 séries (1 rapide et 1 normale)",LINKS.propuestaAp),
item("Chaise + Ap Chagui sur 3 niveaux","LUNDI - MERCREDI","Une série ultra rapide et une série normale.","10 répétitions par jambe / 2 séries (1 ultra rapide et 1 normale)",LINKS.sillaAp),
item("Split de Yop Chagui","MARDI - JEUDI","Le genou ne doit pas faire mal.","10 répétitions / 2 séries / le genou ne doit pas faire mal",LINKS.splitYop),
item("Yop Chagui + toucher le sol + équilibre","MARDI - JEUDI","Ne bouge pas le pied d’appui même si la jambe qui frappe descend.","5 répétitions de chaque côté / 2 séries",LINKS.yopPiso),
item("Koryo ligne 3 - Squat et chambre","MARDI - JEUDI","Ne bouge pas le pied d’appui même si la jambe qui frappe descend.","5 répétitions de chaque côté / 2 séries",LINKS.koryoL3)];
return[
item("Torción de cadera con banda elástica","LUNES - MIÉRCOLES","Trabajar a máxima velocidad sin perder control técnico.","20 reps a máxima velocidad / 4 series / 15 seg descanso entre series",LINKS.cadera),
item("Ejercicio de fortalecimiento de tobillo con banda","LUNES - MIÉRCOLES","Realizar cada repetición extremadamente lento.","5 reps por lado extremadamente lento / 1 serie",LINKS.tobillo),
item("Propuesta + ap chagui reps","LUNES - MIÉRCOLES","Una serie rápida y una serie normal.","10 reps x pierna / 2 series (1 rápida y 1 normal)",LINKS.propuestaAp),
item("Silla + Ap Chaguis 3 niveles","LUNES - MIÉRCOLES","Una serie ultra rápida y una serie normal.","10 reps x pierna / 2 series (1 ultra rápida y 1 normal)",LINKS.sillaAp),
item("Split de Yop Chagui","MARTES - JUEVES","No debe doler la rodilla.","10 reps / 2 series / no debe doler rodilla",LINKS.splitYop),
item("Yop Chagui + toque piso + equilibrio","MARTES - JUEVES","Importante no mover el pie de apoyo aunque caiga la pierna que patea.","5 reps x lado / 2 series",LINKS.yopPiso),
item("Linea 3 Koryo - Sentadilla y camara","MARTES - JUEVES","Importante no mover el pie de apoyo aunque caiga la pierna que patea.","5 reps x lado / 2 series",LINKS.koryoL3)]}
const EXTRA_ES=[
"Trabajar en base al plan quizá no nos garantiza ganar, pero sí nos permite medir cuánto podemos mejorar, así que ¡a darle con todo!",
"Evita levantar el talón después del empuje de tu pierna frontal; esto hará que tus movimientos se vean limpios y fluidos.",
"Tus defensas tienen un ángulo correcto de extremo a extremo, con ligeros grados hacia adentro. Procura respetarlo durante los giros.",
"Los aterrizajes en patadas deben ser fluidos y coordinados con los movimientos de brazo. En cuanto hagamos cámara de regreso, esa debe convertirse en la preparación y ejecución exactamente en el aterrizaje, sin que se vea un corte."
];
const FINAL_ES=["En las próximas dos semanas estaremos trabajando en líneas específicas para enfocarnos en los puntos de corrección que vemos en clase. No es necesario hacer cosas extras a esto, ya que está exactamente como lo necesitas. Procura seguirlo al pie de la letra y, si necesitas reconfigurar algo, coméntame y te digo cómo lo vas a hacer.","¡Feliz entrenamiento y seguimos dándole con todo como se debe!"];
const EXTRA_EN=["Working from the plan may not guarantee a win, but it lets us measure how much we can improve, so give it everything!","Avoid lifting your heel after the push from your front leg; this will make your movements look cleaner and more fluid.","Your blocks have the correct angle from end to end, with a slight inward angle. Keep that structure during turns.","Kick landings must be fluid and coordinated with the arm movements. As soon as you bring the chamber back, it becomes the preparation so the execution finishes exactly on the landing, without a visible break."];
const FINAL_EN=["During the next two weeks we will work on specific lines so we can focus on the correction points we see in class. You do not need to add extra work; this is set up exactly for what you need. Follow it closely, and if you need to reconfigure something, tell me and I will explain how to do it.","Happy training, and let’s keep working hard the way we should!"];
const EXTRA_FR=["Travailler selon le plan ne garantit peut-être pas de gagner, mais cela nous permet de mesurer à quel point nous pouvons progresser. Alors, donne tout!","Évite de lever le talon après la poussée de ta jambe avant; tes mouvements seront ainsi plus propres et plus fluides.","Tes blocages ont un angle correct d’un extrême à l’autre, avec une légère inclinaison vers l’intérieur. Conserve cette structure pendant les rotations.","Les atterrissages après les coups de pied doivent être fluides et coordonnés avec les mouvements des bras. Dès que tu ramènes la chambre, elle devient la préparation afin que l’exécution se termine exactement à l’atterrissage, sans coupure visible."];
const FINAL_FR=["Au cours des deux prochaines semaines, nous travaillerons des lignes précises afin de nous concentrer sur les points de correction vus en cours. Il n’est pas nécessaire d’ajouter du travail supplémentaire; le plan est configuré exactement selon tes besoins. Suis-le attentivement et, si tu dois ajuster quelque chose, dis-le-moi et je t’expliquerai comment le faire.","Bon entraînement, et continuons à travailler fort comme il se doit!"];
const EN_FOCUS={
"Enfoque: Líneas iniciales de Taeguks y Poomsae Completa":"Focus: Initial Taeguk lines and Complete Poomsae",
"Enfoque: Bloque intermedio de Taeguks y Koryo":"Focus: Intermediate Taeguk block and Koryo",
"Enfoque: Cierre de Taeguks y Keumgang con Poomsae Completa":"Focus: Taeguk and Keumgang closing block with Complete Poomsae",
"Enfoque: Líneas restantes de Taeguk 8 y Keumgang":"Focus: Remaining Taeguk 8 and Keumgang lines",
"Enfoque: Repaso técnico de base":"Focus: Technical base review",
"Enfoque: Taeguks avanzados y Keumgang":"Focus: Advanced Taeguks and Keumgang",
"Enfoque: Estabilidad y Poomsaes Completas":"Focus: Stability and Complete Poomsae",
"Enfoque: Bloque final de Taeguk 8 y Koryo":"Focus: Final Taeguk 8 and Koryo block",
"Enfoque: Refuerzo y Poomsae Completa de cierre":"Focus: Reinforcement and closing Complete Poomsae",
"Enfoque: Consolidación de líneas técnicas":"Focus: Consolidation of technical lines",
"Enfoque: Bloque de control intermedio":"Focus: Intermediate control block",
"Enfoque: Ajustes previos al cierre":"Focus: Final adjustments before closing",
"Enfoque: Cierre de ciclo y Poomsaes Completas finales":"Focus: Cycle close and final Complete Poomsae"
};
function enDate(s){return s.replace("Miércoles","Wednesday").replace("Jueves","Thursday").replace("Viernes","Friday").replace("Sábado","Saturday").replace("Lunes","Monday").replace("Martes","Tuesday").replace(" de Septiembre de "," September ").replace(" de Octubre de "," October ")}
function enText(s){let x=EN_FOCUS[s]||s;x=x.replace(/Poomsae completa del día/g,"Complete Poomsae of the day").replace(/Todas las poomsaes del bloque/g,"All Poomsae in the block").replace(/Líneas/g,"Lines").replace(/Línea/g,"Line").replace(/3 repeticiones de cada una/g,"3 repetitions each").replace(/para el cierre definitivo/g,"for the final cycle close").replace(/ y /g," and ");return x}
function frDate(s){return s.replace("Miércoles","Mercredi").replace("Jueves","Jeudi").replace("Viernes","Vendredi").replace("Sábado","Samedi").replace("Lunes","Lundi").replace("Martes","Mardi").replace(" de Septiembre de "," septembre ").replace(" de Octubre de "," octobre ")}
function frText(s){return s.replace(/Poomsae completa del día/g,"Poomsae complet du jour").replace(/Línea 1/g,"Ligne 1").replace(/Doble yop chagui paso a paso/g,"Double yop chagui étape par étape").replace(/Aterrizaje yop chaguis, golpe al cuello mano abierta y golpe medio/g,"Atterrissage des yop chaguis, frappe au cou avec la main ouverte et frappe au niveau moyen").replace(/Transición al otro lado dwit kubi a dwit kubi con sonnal montong bakkat makki/g,"Transition vers l’autre côté, de dwit kubi à dwit kubi avec sonnal montong bakkat makki").replace(/3 repeticiones/g,"3 répétitions").replace(/ y /g," et ")}
function rawSchedule(id){if(["karen_sanchez","scarlet_arianna","anna_georgia","maria_ponce"].includes(id))return window.__CTKD_20260930_G1||[];if(["leonardo_gonzalez","omar_azi","patricio_leigh","ximena_palacios"].includes(id))return window.__CTKD_20260930_G2||[];if(["rodrigo_gonzalez","rafa_hernandez"].includes(id))return window.__CTKD_20260930_G3||[];if(id==="leticia_erguera")return window.__CTKD_20260930_G4||[];if(id==="nancy_vermilus")return window.__CTKD_20260930_G5||[];return[]}
function schedule(id,l){const note=l==="en"?"Follow the exact time and repetitions for each task.":l==="fr"?"Respecte exactement le temps et les répétitions indiqués pour chaque tâche.":"Respeta exactamente el tiempo y las repeticiones indicados en cada tarea.";return rawSchedule(id).map(([d,t])=>({titulo:l==="en"?enDate(d):l==="fr"?frDate(d):d,dia:l==="en"?enDate(d).toUpperCase():l==="fr"?frDate(d).toUpperCase():d.toUpperCase(),enfoque:(l==="en"?t.split(" | ").map(enText):l==="fr"?t.split(" | ").map(frText):t.split(" | ")).join(" | "),reps:note,tipo:"info"}))}
function patch(plan,id){if(!plan)return plan;const l=lang(id);plan.ciclo=l==="en"?"Wednesday, September 30 to Wednesday, October 14, 2026":l==="fr"?"Du mercredi 30 septembre au mercredi 14 octobre 2026":"Miércoles 30 de septiembre al miércoles 14 de octubre del 2026";plan.updated_at=l==="en"?"Updated Wednesday, September 30, 2026":l==="fr"?"Mis à jour le mercredi 30 septembre 2026":"Actualizado miércoles 30 de septiembre de 2026";plan.enfoque_corto=l==="en"?"September 30 to October 14 cycle":l==="fr"?"Cycle du 30 septembre au 14 octobre":"Ciclo 30 de septiembre al 14 de octubre";plan.enfoque=l==="en"?"ChanonaFlex: Monday to Saturday. Active isometric: Monday and Friday / Tuesday and Thursday / Wednesday and Saturday. Technical kicking: Monday and Wednesday / Tuesday and Thursday. Poomsae: Monday to Saturday.":l==="fr"?"ChanonaFlex : du lundi au samedi. Isométrique actif : lundi et vendredi / mardi et jeudi / mercredi et samedi. Travail technique de coups de pied : lundi et mercredi / mardi et jeudi. Poomsae : du lundi au samedi.":"ChanonaFlex: lunes a sábado. Isométrico activo: lunes y viernes / martes y jueves / miércoles y sábado. Pateo técnico: lunes y miércoles / martes y jueves. Poomsae: lunes a sábado.";plan.chanonaflexDias=l==="en"?"Monday to Saturday":l==="fr"?"Du lundi au samedi":"Lunes a sábado";plan.isometricoDias=l==="en"?"Monday-Friday / Tuesday-Thursday / Wednesday-Saturday":l==="fr"?"Lundi-vendredi / mardi-jeudi / mercredi-samedi":"Lunes-viernes / martes-jueves / miércoles-sábado";plan.pateoDias=l==="en"?"Monday-Wednesday / Tuesday-Thursday":l==="fr"?"Lundi-mercredi / mardi-jeudi":"Lunes-miércoles / martes-jueves";plan.poomsaeDias=l==="en"?"Monday to Saturday":l==="fr"?"Du lundi au samedi":"Lunes a sábado";plan.chanonaflex=flex(l);plan.isometrico=iso(l);plan.pateoTecnico=kick(l);plan.poomsae=schedule(id,l);plan.indicacionesExtras=l==="en"?EXTRA_EN:l==="fr"?EXTRA_FR:EXTRA_ES;plan.notasFinales=l==="en"?FINAL_EN:l==="fr"?FINAL_FR:FINAL_ES;return plan}
window.__CHANONA_CYCLE_20260930_TARGETS=TARGET_IDS;
window.__isCycle20260930Target=function(){return TARGET_IDS.has(current())};
const originalFetch=window.fetch.bind(window);
window.fetch=async function(input,init){const response=await originalFetch(input,init);try{const url=typeof input==="string"?input:(input&&input.url)||"";const m=String(url).match(/data\/planes\/([^?#/]+\.json)/);const id=m?TARGET_PLAN_FILES.get(m[1]):null;if(id){const data=await response.clone().json();const headers=new Headers(response.headers);headers.set("content-type","application/json; charset=utf-8");return new Response(JSON.stringify(patch(data,id)),{status:response.status,statusText:response.statusText,headers})}}catch(e){return response}return response};
})();