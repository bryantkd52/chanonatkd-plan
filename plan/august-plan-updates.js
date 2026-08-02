(function(){
  const CICLO = "Lunes 3 al sábado 15 de agosto de 2026";
  const UPDATED = "Actualizado dom 2 de agosto de 2026";
  const alumnoId = () => new URL(location.href).searchParams.get("alumno") || "";
  const html = value => { const d=document.createElement("div"); d.textContent=String(value ?? ""); return d.innerHTML; };
  const norm = value => String(value || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g," ").trim();

  const G1 = new Set(["sr_jeremias","luis_holanda","alma_patricia","mario_lopez","evan_mael","martin_morales","daniele_biasetti","mtro_mariano_agustina","rodrigo_jalisco"]);
  const G2 = new Set(["karen_sanchez","rodrigo_gonzalez","leonardo_gonzalez","omar_azi","rafa_hernandez","scarlet_arianna","anna_georgia","patricio_leigh","ruben_guerrero"]);
  const G3 = new Set(["maria_ponce","zayre_zuleyka","diana_rodriguez","benyoced_calzadilla","emilio_cdmx","leticia_erguera"]);
  const TARGETS = new Set([...G1,...G2,...G3]);
  const NO_PATEO_UPDATE = new Set(["zayre_zuleyka","benyoced_calzadilla","emilio_cdmx"]);

  function item(titulo, dia, enfoque, reps, url){
    return { titulo, dia, enfoque, reps, tipo:"video", url };
  }
  function info(titulo, enfoque){ return { titulo, enfoque, tipo:"info", dia:"Según indicación del Profesor Chanona" }; }

  const LINKS = {
    ap3:"https://drive.google.com/open?id=1iUBOiNH65FT8PGaRTv8kT4gxDV2M6_Az&usp=drive_copy",
    ap2bloques:"https://drive.google.com/open?id=1cdbZKTfQ1kzIFEfiUBQb7wusgY2fhXXa&usp=drive_copy",
    yop1:"https://drive.google.com/open?id=1IEhzAjlydHdjRSleXxWLABQfMTMsOMG1&usp=drive_copy",
    yop2:"https://drive.google.com/open?id=1QQtR5ObV1iiSqYx-GxFfOM1Lr1jnln70&usp=drive_copy",
    bandaCadera:"https://drive.google.com/open?id=1-mLzWj3XiEzCeul7LaIWuPzP39qQ6VtQ&usp=drive_copy",
    bandaTobillo:"https://drive.google.com/file/d/1Sux7kXiJImkagl3ye2nN2bMjqmJOa18O/view?usp=drive_link",
    pre:"https://drive.google.com/file/d/1mV7dkockaExAief_qW7RsMUuouwfMKM7/view?usp=sharing",
    basico:"https://drive.google.com/file/d/1jnSjVKx7mPFKco3HttgzmQUQgAsMm9Kt/view?usp=sharing",
    gluteo:"https://drive.google.com/file/d/1S4PWmc52Ot9k-IrXt38L-Spx0tjqj8Lr/view?usp=sharing",
    yopIso1:"https://drive.google.com/file/d/1ptuIEmfskjKeBhYfvW4JZVvW5hIIdCbx/view?usp=sharing",
    apIso1:"https://drive.google.com/file/d/1kbkZqudxFm3GqgXyrEiKM_ODwrMk3ppx/view?usp=sharing",
    benyFlex2:"https://drive.google.com/file/d/1PQZMTjewQ8-gdkR1cME_t55gC4bIkG4D/view?usp=drive_link",
    t1:"https://drive.google.com/open?id=1AP1did1HVwyMQy8byxTCLx9fy32IHhWM&usp=drive_copy",
    t2:"https://drive.google.com/open?id=153in4ZZtofBlf44rwqhrtyyIwBUrU9_8&usp=drive_copy",
    t3:"https://drive.google.com/open?id=1bquwnq6Y9_hq12xGclMuhlcyEqwbqCrl&usp=drive_copy",
    t5l1:"https://drive.google.com/open?id=1nS4odRmRR7Da-q3oGTI1UOYhuqKpzCah&usp=drive_copy",
    t5l2:"https://drive.google.com/open?id=1PVxwOGM_EDJm0SIrRumga-CUDv466-rj&usp=drive_copy",
    t5l3:"https://drive.google.com/open?id=1yFJM2dRU3-OJCETZq5i9iYkz72W2aOnT&usp=drive_copy",
    t7l1:"https://drive.google.com/open?id=1H4mcONZfDmg2fP7UA-nSSgXdPsg42lJC&usp=drive_copy",
    t7l2:"https://drive.google.com/open?id=12F-yyH4XJl3A4FRt_3biwxE0th5Mtsq1&usp=drive_copy",
    t7l3:"https://drive.google.com/open?id=1J8Nph6ySfCBldhOCVqTembIz0THwfxfk&usp=drive_copy",
    t7l4:"https://drive.google.com/open?id=1I4Re5fJg2XESqdKWWlZnHZSiwUc11AcE&usp=drive_copy",
    k1:"https://drive.google.com/open?id=1F8o4BF5j1dkZdPwxREY4JodRuFLwwRMK&usp=drive_copy",
    k2:"https://drive.google.com/open?id=1D2ScTJYlw1cCZw5SfoXn5QlF0LiSjOpv&usp=drive_copy",
    k22:"https://drive.google.com/open?id=1p90iF0JXyFoMq7AW28VYw4g4bQekSYgQ&usp=drive_copy",
    k3r:"https://drive.google.com/open?id=116eSAk3WUKVvXneFxAAyuyrG0mu7pwIi&usp=drive_copy",
    k3l:"https://drive.google.com/open?id=1d39Oz_ASS6Yb-BIUclGe9QrT-WP9BgwS&usp=drive_copy",
    k3c:"https://drive.google.com/open?id=12W8m2JmF9ICQiA6T1q8DB2TNpoSa_wNJ&usp=drive_copy",
    k4:"https://drive.google.com/open?id=1UHV_mYsNFt3pZIiQKAWXIYWjGcpoguwP&usp=drive_copy"
  };

  function makePateo(plan){
    const old = Array.isArray(plan.pateoTecnico) ? plan.pateoTecnico : [];
    const day = (i,fb) => old[i]?.dia || old[i]?.dias || fb;
    const reps = (i,fb) => old[i]?.reps || fb;
    return [
      item("Ap Chagui 3 niveles", day(0,"MARTES - JUEVES - SÁBADO"), "Trabajar cámara, extensión y regreso de Ap Chagui con control.", reps(0,"8 a 10 reps por pierna / 2 series"), LINKS.ap3),
      item("Ap chaguis dos bloques", day(1,"MARTES - JUEVES - SÁBADO"), "Mejorar precisión, cámara y estabilidad de Ap Chagui.", reps(1,"8 a 10 reps por pierna / 2 series"), LINKS.ap2bloques),
      item("Ejercicio 1 - Yop Chagui", day(2,"MARTES - JUEVES - SÁBADO"), "Preparar cámara, cadera y alineación antes de extender.", reps(2,"8 a 10 reps por pierna / 2 series"), LINKS.yop1),
      item("Ejercicio 2 - Yop Chagui", day(3,"MARTES - JUEVES - SÁBADO"), "Controlar extensión, regreso y postura del torso.", reps(3,"8 a 10 reps por pierna / 2 series"), LINKS.yop2),
      item("Torción de cadera con banda", day(4,"MARTES - JUEVES - SÁBADO"), "Trabajar control de cadera, dirección y resistencia con banda elástica.", reps(4,"8 a 10 reps por lado / 2 series"), LINKS.bandaCadera),
      item("Fortalecimiento de tobillo con banda", day(5,"MARTES - JUEVES - SÁBADO"), "Fortalecer tobillo, base y estabilidad para pateo técnico.", reps(5,"8 a 10 reps por pierna / 2 series"), LINKS.bandaTobillo)
    ];
  }

  function commonFinalNotes(lang){
    if(lang === "en") return [
      "If an exercise feels too heavy, listen to your body and do only what you can tolerate while keeping technique and continuity as the priority. Some discomfort is part of the process, but stretching should never burn or feel like tearing; it should be demanding but controlled.",
      "Focus on the fine details of preparation and execution. Stay conscious of every movement instead of doing it automatically; we are building new habits so they later become automatic in the correct way.",
      "Use the tools in this plan; they will help you a lot.",
      "Have an excellent training week and keep working properly."
    ];
    return [
      "Toma en cuenta que si algún ejercicio sientes que no aguantas, escucha a tu cuerpo y solo haz lo que puedas soportar, pero siempre dándole prioridad a exigirnos sin perder la técnica o la continuidad. Algunos dolores son necesarios, pero jamás debe arder cuando estiramos o sentirse como desgarre; el trabajo debe ser cómodo, pero a su vez exigente.",
      "Enfócate en los detalles finos de preparación y ejecución. No olvides estar consciente de los movimientos y no hacerlos de forma automática en este momento, ya que estamos en etapa de desarrollo de nuevos hábitos para que después se conviertan en movimientos automáticos, pero de forma correcta.",
      "Usa las herramientas que te dejo en este plan; te ayudarán mucho.",
      "Feliz entrenamiento y a seguirle dando como se debe."
    ];
  }

  function setBase(plan, id){
    plan.updated_at = UPDATED;
    plan.ciclo = CICLO;
    if(id === "anna_georgia"){
      plan.enfoque_corto = "August cycle: flexibility, technical kicking and poomsae details";
      plan.enfoque = "From Monday, August 3 to Saturday, August 15, we will keep working with the assigned training days, focusing on technical quality, preparation, execution and continuity.";
    } else if(G3.has(id)){
      plan.enfoque_corto = "Ciclo 3 al 15 de agosto: técnica, pateo y poomsae según asignación";
      plan.enfoque = "Del lunes 3 al sábado 15 de agosto continuamos trabajando con los días marcados en tu plan, cuidando técnica, preparación, ejecución y continuidad.";
    } else {
      plan.enfoque_corto = "Ciclo 3 al 15 de agosto: flexibilidad, isométricos y pateo técnico";
      plan.enfoque = "Del lunes 3 al sábado 15 de agosto continuamos trabajando en base a los días marcados para ChanonaFlex, isométricos y pateo técnico, siempre cuidando técnica, continuidad y control.";
    }
    plan.notasFinales = commonFinalNotes(id === "anna_georgia" ? "en" : "es");
  }

  function upsert(list, data){
    const arr = Array.isArray(list) ? [...list] : [];
    if(!arr.some(x => norm(x.titulo) === norm(data.titulo))) arr.push(data);
    return arr;
  }

  function assignPoomsae(plan, id){
    if(id === "maria_ponce"){
      plan.poomsaeDias = "Taeguk 7 líneas 1, 2, 3 y 4 / según indicación del Profesor Chanona";
      plan.poomsae = [
        item("Taeguk 7 - Línea 1", "Según indicación del Profesor Chanona", "Línea 1 de Taeguk 7 con precisión y ritmo.", "8 a 10 reps / 2 series", LINKS.t7l1),
        item("Taeguk 7 - Línea 2", "Según indicación del Profesor Chanona", "Línea 2 de Taeguk 7 con control de transiciones.", "8 a 10 reps / 2 series", LINKS.t7l2),
        item("Taeguk 7 - Línea 3", "Según indicación del Profesor Chanona", "Línea 3 de Taeguk 7 con postura, brazos y dirección.", "8 a 10 reps / 2 series", LINKS.t7l3),
        item("Taeguk 7 - Línea 4 / Kawi Makki", "Según indicación del Profesor Chanona", "Kawi Makki con precisión, fuerza y velocidad.", "8 a 10 reps / 2 series", LINKS.t7l4)
      ];
    }
    if(id === "diana_rodriguez"){
      plan.poomsaeDias = "Taeguk 1, Taeguk 2, Taeguk 3 y Koryo completo / según indicación del Profesor Chanona";
      plan.poomsae = [
        item("Taeguk 1 - Espejo paso a paso", "Según indicación del Profesor Chanona", "Referencia completa de Taeguk 1.", "1 repaso completo", LINKS.t1),
        item("Taeguk 2 completo", "Según indicación del Profesor Chanona", "Referencia completa de Taeguk 2.", "1 repaso completo", LINKS.t2),
        item("Taeguk 3 completo", "Según indicación del Profesor Chanona", "Referencia completa de Taeguk 3.", "1 repaso completo", LINKS.t3),
        item("Koryo línea 1 - Precisión + Timing", "Según indicación del Profesor Chanona", "Koryo línea 1 con timing y precisión.", "8 a 10 reps / 2 series", LINKS.k1),
        item("Koryo línea 2 - Ap Chagui + golpes", "Según indicación del Profesor Chanona", "Koryo línea 2 con Ap Chagui y golpes.", "8 a 10 reps / 2 series", LINKS.k2),
        item("Koryo línea 2.2", "Según indicación del Profesor Chanona", "Bloque complementario de Koryo línea 2.", "8 a 10 reps / 2 series", LINKS.k22),
        item("Koryo línea 3 - Lado derecho", "Según indicación del Profesor Chanona", "Yop Chagui, torso, cadera y control.", "15 reps / 1 serie", LINKS.k3r),
        item("Koryo línea 3 - Lado izquierdo", "Según indicación del Profesor Chanona", "Yop Chagui, torso, cadera y control.", "15 reps / 1 serie", LINKS.k3l),
        item("Koryo línea 3 - Concentración 8 seg", "Según indicación del Profesor Chanona", "Timing, respiración y postura.", "10 reps / 1 serie", LINKS.k3c),
        item("Koryo línea 4 - Golpes y defensas", "Según indicación del Profesor Chanona", "Golpes y defensas de Koryo línea 4.", "8 a 10 reps / 2 series", LINKS.k4)
      ];
    }
    if(id === "leticia_erguera"){
      plan.poomsaeDias = "Taeguk 5 líneas 1, 2 y 3 / según indicación del Profesor Chanona";
      plan.poomsae = [
        item("Taeguk 5 - Línea 1 a 2", "Según indicación del Profesor Chanona", "Transición doble Montong Makki de línea 1 a línea 2.", "8 a 10 reps / 2 series", LINKS.t5l1),
        item("Taeguk 5 - Línea 2", "Según indicación del Profesor Chanona", "Aterrizaje y preparación de línea 2.", "8 a 10 reps / 2 series", LINKS.t5l2),
        item("Taeguk 5 - Línea 3", "Según indicación del Profesor Chanona", "Sonnal, codazo y timing.", "8 a 10 reps / 2 series", LINKS.t5l3)
      ];
    }
  }

  function specialCases(plan, id){
    if(id === "benyoced_calzadilla"){
      plan.chanonaflex = upsert(plan.chanonaflex, item("Flexibilidad nivel 2 - Benyoced", "Según indicación del Profesor Chanona", "Trabajo adicional de flexibilidad nivel 2 para continuar progresando con control.", "1 clase completa", LINKS.benyFlex2));
    }
    if(id === "emilio_cdmx"){
      plan.chanonaflexDias = "PRE-CHANONAFLEX + CHANONAFLEX NIVEL 1";
      plan.chanonaflex = [
        item("Pre-Chanonaflex - Estiramiento inicial", "Según indicación del Profesor Chanona", "Preparar el cuerpo antes de exigir flexibilidad.", "1 vez / según video", LINKS.pre),
        item("Circuito Chanonaflex - Básico", "Según indicación del Profesor Chanona", "Trabajo de flexibilidad nivel 1 con control.", "1 vez / según video", LINKS.basico)
      ];
      plan.isometricoDias = "NIVEL 1 / AP CHAGUI + YOP CHAGUI + GLÚTEO";
      plan.isometrico = [
        item("Glúteo y gancho - Isométrico activo - Intermedio", "Según indicación del Profesor Chanona", "Fortalecer glúteo, cadera y control de pierna.", "8 a 10 reps / 2 series", LINKS.gluteo),
        item("Isométrico Activo - Yop Chagui - Nivel 1", "Según indicación del Profesor Chanona", "Control de Yop Chagui nivel 1.", "8 a 10 reps / 2 series", LINKS.yopIso1),
        item("Isométrico Activo - Ap Chagui - Nivel 1", "Según indicación del Profesor Chanona", "Control de Ap Chagui nivel 1.", "8 a 10 reps / 2 series", LINKS.apIso1)
      ];
      plan.pateoTecnico = [];
      plan.poomsae = [];
      plan.poomsaeDias = "NO ASIGNADO EN ESTE CICLO";
    }
  }

  function applyPlanUpdate(plan, id){
    if(!TARGETS.has(id) || !plan) return;
    setBase(plan, id);
    if(!NO_PATEO_UPDATE.has(id)) plan.pateoTecnico = makePateo(plan);
    if(G3.has(id)) assignPoomsae(plan, id);
    specialCases(plan, id);
  }

  const COMMON_GROUP2 = [
    "Postura general y torso: evita llevar el torso hacia el frente en general y hacia atrás al ejecutar Yop Chagui.",
    "Estabilidad en el apoyo: al sostener una postura, evita recargarte; concentra la fuerza en glúteo e isquiotibial de la pierna de apoyo.",
    "Control de hombros: no lleves los hombros hacia el frente al recoger las patadas de Yop Chagui.",
    "Cabeza y cuello: mantén la cabeza y el cuello firmes en Ap Chagui; la base debe estabilizar para que la cervical no compense.",
    "Cadera y glúteos: evita sacar los glúteos durante Yop Chagui y mantén la cadera lineal al patear.",
    "En ejercicios de silla, proyecta la cadera hacia el frente en lugar de llevar el torso hacia atrás.",
    "Mantén la pierna de apoyo completamente extendida al momento de patear.",
    "En Yop Chagui, conserva la buena postura en la preparación y después aplica fuerza explosiva desde abdomen y pierna de apoyo.",
    "Marca correctamente la cámara al regresar del Ap Chagui.",
    "En Dwit Kubi, evita juntar las rodillas; la transición debe hacerse jalando el pie con control.",
    "Corrige los Ap Seogi demasiado grandes; busca posiciones más cortas y precisas.",
    "En aterrizajes después de Yop Chagui, cuida la distancia porque el Ap Kubi puede quedar demasiado pequeño.",
    "Codazos: evita suavidad excesiva; la preparación y ejecución deben ser firmes, con puños pegados al cuerpo.",
    "La trayectoria de codazos debe ir de pectoral a pectoral.",
    "Defensa An Makki: ejecútala con mayor potencia activando la base.",
    "Preparación de Keumgang: cierra más la preparación y evita que quede demasiado abierta.",
    "Golpes al cuello: busca máxima explosividad sin abrir la mano desde la cintura antes de tiempo.",
    "En Ap Chagui, los brazos van al pecho, pero sincronizados con el tiempo correcto, no antes de tiempo.",
    "Ritmo: sostén firmemente las posiciones durante los segundos reglamentarios."
  ];

  const EXTRA = {
    karen_sanchez:[
      "T4: La mano asistente del golpe con mano abierta debe quedar detrás del codo, no en la axila.",
      "T4: Las defensas se están preparando suaves; ejecuta con máxima explosividad y velocidad.",
      "T4: Sonnal Montong Bakkat Makki necesita preparación completa; la mano de defensa debe iniciar a la altura del pecho.",
      "T4: En aterrizajes a Twit Kubi, baja con el peso de la cadera y no solo con el pie.",
      "T4: Las transiciones deben hacerse con bola del pie, no con talón.",
      "T5: Are Makki y golpe martillo han mejorado; mantén esa calidad.",
      "T5: En línea 5, coordina brazos y piernas en Yop Chagui; el puño lateral no debe torcerse.",
      "T5: En línea 3, Sonnal todavía está ligeramente bajo; súbelo a la altura correcta.",
      "T5: En codazos, los dedos deben salir y no quedarse escondidos.",
      "T6: El puño izquierdo debe completar la torsión al llegar a la cintura.",
      "T6: Los golpes medios deben llegar al centro del eje corporal, no al lateral.",
      "T6: Evita elevar el talón trasero en el último golpe del lado izquierdo de línea 3.",
      "T6: Bakkat Makki a la cara debe llegar a la cara, no al hombro."
    ],
    rodrigo_gonzalez:[
      "T8: En Ap Chagui saltando, aterriza en la misma línea donde iniciaste el salto.",
      "T8: Los dobles golpes necesitan mayor explosividad y velocidad.",
      "T8: Las Ap Kubis deben ser un poco más largas; se están cerrando demasiado.",
      "T8: En línea 3, extiende más el brazo trasero y dale más torsión al torso en el golpe de meditación.",
      "T8: Mantén más velocidad general; es una exigencia de la competencia actual.",
      "Koryo: Mejoró la marcación de Yop Chagui, pero falta más flexión de rodilla al pecho al recoger.",
      "Koryo: En línea 3, evita inclinar el torso hacia atrás en el golpe a la mano.",
      "Koryo: La última línea debe verse más explosiva y agresiva porque es el cierre de la poomsae.",
      "Koryo: Conforme aparezca el cansancio, no bajes la rodilla al pecho ni la velocidad de Yop Chagui.",
      "Taebaek: En Bom Sogui, conserva más peso en la pierna trasera.",
      "Taebaek: En la última línea, cuida los giros con bola del pie y fuerza del torso.",
      "Taebaek: En línea 4, el giro de Ap Kubi de revés a Twit Kubi debe hacerse en encapsulación, no circular.",
      "Keumgang: En línea 1, el primer paso debe ir alineado con la cadera, no hacia afuera.",
      "Keumgang: Extiende completamente la pierna trasera en Ap Kubi.",
      "Keumgang: En Santul Makki, el brazo trasero debe mantenerse alineado con el cuerpo.",
      "Keumgang: En golpes laterales, aguanta los puños en la cintura hasta que el talón llegue al piso.",
      "Keumgang: En Hakdari Sogui, cierra la rodilla para evitar perder equilibrio."
    ],
    leonardo_gonzalez:[
      "T8: En Bom Sogui, lleva el 90% del peso hacia atrás y flexiona hasta sentir el trabajo en la pierna trasera.",
      "T8: En la primera Twit Kubi, evita llevar el cuerpo hacia el frente; mantén el peso atrás toda la posición.",
      "T8: Batanson se ve suave; espera ligeramente y después ejecuta con máxima explosividad.",
      "T8: En línea 2, el brazo de atrás se flexiona hacia adentro; mantenlo vertical.",
      "T8: Los golpes de aterrizaje necesitan preparación desde la cintura y torsión visible del torso.",
      "T8: Montong Makki y Batanson están entrando demasiado al centro; cuida el límite correcto.",
      "T8: La velocidad se ve bien marcada, pero aún falta más fuerza y aceleración.",
      "T8: En Batanson, la mano debe buscar verticalidad, no ir hacia el frente.",
      "T8: En el regreso de Bom Sogui línea 3, evita mover la pierna delantera hacia afuera y hacia adentro."
    ],
    omar_azi:[
      "Sipjin: El primer movimiento está saliendo con dimensiones irregulares; busca tamaño constante.",
      "Sipjin: En los codazos, dirige la vista hacia el lado al que te desplazas, no al frente.",
      "Sipjin: En el último movimiento de la línea de Ap Chagui, el brazo asistente debe quedar alineado con la boca del estómago.",
      "Sipjin: En elevación de L, prepara con forma perfecta: recoge un brazo y después el otro.",
      "Sipjin: En línea 2, no adelantes la preparación desde antes de tiempo.",
      "Sipjin: En Santul Makki, cuida que Chuchum Sogui no se abra demasiado.",
      "Sipjin: En Ap Chagui, los puños deben guardarse directo a la cintura y salir explosivos al golpe de aterrizaje.",
      "Sipjin: En el movimiento de empujar la roca, los brazos deben dirigirse hacia abajo con torsión correcta."
    ],
    rafa_hernandez:[
      "Pyonwong: El torso en los regresos debe moverse con la inercia, no de forma forzada.",
      "Pyonwong: En el recover de Yop Chagui, no cierres el torso antes de tiempo; mantenlo abierto hasta el codazo del aterrizaje.",
      "Pyonwong: Abre más la ejecución de los codazos, porque se ven pequeños.",
      "Pyonwong: La defensa baja circular después de Yop Chagui está correcta, pero necesita más velocidad para no verse forzada.",
      "Pyonwong: Fortalece zona abdominal para evitar que el abdomen se vaya al frente en Ap Kubi.",
      "Pyonwong: La preparación de posición Keumgang debe ser directa al punto de ejecución, no circular.",
      "Keumgang: En las meditaciones laterales, evita finalizar con extensión tipo clic.",
      "Keumgang: Agrega un poco más de torsión de torso en los golpes laterales al aterrizar desde posición Keumgang.",
      "Keumgang: En giros, evita que la cervical se vaya hacia adelante.",
      "Keumgang: En el último movimiento de línea 1 y 2 aún se nota torsión de cuello; cuida esa parte.",
      "Keumgang: Los Olgul Makki se están torciendo ligeramente hacia arriba.",
      "Keumgang: En los giros, mantén fijo el pie delantero hasta que gire todo el cuerpo.",
      "Keumgang: Aumenta velocidad y explosividad en el primer movimiento y en Santul Makki."
    ],
    patricio_leigh:[
      "Keumgang: En línea 2, los brazos asistentes no deben extenderse por completo; mantén flexión y baja ligeramente al pecho durante la preparación.",
      "Keumgang: Chuchum Sogui de líneas laterales y después del giro debe ejecutarse con posición de Kiko.",
      "Keumgang: En Chuchum Sogui después del giro, el pie frontal debe esperar a que cadera y pie trasero giren primero.",
      "Keumgang: En golpes laterales después del giro, espera a que la bola del pie pise antes de ejecutar en conjunto.",
      "Keumgang: Falta culminar mejor los giros desde la torsión.",
      "Taebaek: En Ap Chagui, evita que el pie de pateo se luzca hacia atrás.",
      "Taebaek: En línea 4, el brazo que cruza hacia atrás va bien, pero el torso debe terminar de girar por completo.",
      "Taebaek: El golpe siguiente a la cara necesita preparación, no ir directo.",
      "Taebaek: En Bom Sogui, lleva el peso 90/10 y no 70/30.",
      "Taebaek: En línea 3, los golpes deben preparar correctamente y no pasar de largo."
    ],
    anna_georgia:[
      "T4 lines 4 and 5: Ap Sogui is too wide; keep it around one foot distance.",
      "T4: The backfist should be more direct; avoid making it circular.",
      "T4: Assistant fists that return to the waist must settle farther back, exactly on the waist line.",
      "T4 line 4: Use hip power, front-leg weight and confidence when transitioning from Ap Sogui to Ap Sogui.",
      "T4 line 5: Punches need much more speed and explosiveness.",
      "T4 line 5: Punches must land in the center of the body, around the solar plexus.",
      "T4 line 5: Montong An Makki needs more speed and explosiveness supported by the legs.",
      "Taeguk 5 line 1: Pull the foot slightly more in the hammer-fist position.",
      "Taeguk 5 line 1: Keep the torso almost frontal during preparation; twist slightly, not completely.",
      "Taeguk 5 line 1: Fists reaching the side are twisting; close the fists 100% and increase speed."
    ]
  };

  const GROUP3_COMMON = [
    "Algunos errores comunes son los siguientes: cuida que el torso no se vaya hacia el frente en general ni hacia atrás al ejecutar Yop Chagui.",
    "Mantén cabeza y cuello firmes; la base debe sostener el equilibrio para que la cervical no compense.",
    "Marca correctamente la cámara al regresar de Ap Chagui y Yop Chagui.",
    "No dejes que los hombros se vayan hacia el frente al recoger las patadas.",
    "En Ap Kubi y Bom Sogui, cuida la distribución del peso y evita recargarte en la pierna incorrecta.",
    "Las defensas y codazos deben prepararse completos, con trayectoria clara y ejecución firme.",
    "Mantén un ritmo constante y sostén las posiciones durante los segundos reglamentarios."
  ];

  function notesFor(id){
    if(id === "anna_georgia") return [...(EXTRA.anna_georgia || [])];
    if(G2.has(id)) return [...COMMON_GROUP2, ...(EXTRA[id] || [])];
    if(["maria_ponce","diana_rodriguez","leticia_erguera"].includes(id)) return GROUP3_COMMON;
    return [];
  }

  let lastPlanExtras = [];
  const oldRenderPage = typeof renderPage === "function" ? renderPage : null;
  if(oldRenderPage){
    renderPage = function(plan, alumno){
      const id = alumnoId();
      applyPlanUpdate(plan, id);
      lastPlanExtras = Array.isArray(plan?.indicacionesExtras) ? [...plan.indicacionesExtras] : [];
      oldRenderPage(plan, alumno);
      setTimeout(renderAugustNotes, 250);
      setTimeout(renderAugustNotes, 700);
    };
  }

  function collectExisting(body){
    const li = Array.from(body.querySelectorAll("li")).map(x => x.textContent.trim()).filter(Boolean);
    if(li.length) return li;
    return lastPlanExtras.map(x => typeof x === "string" ? x : (x.titulo || x.texto || x.enfoque || "")).filter(Boolean);
  }

  function unique(list){
    const seen = new Set();
    const out = [];
    for(const x of list){
      const k = norm(x);
      if(!k || seen.has(k)) continue;
      seen.add(k); out.push(x);
    }
    return out;
  }

  function renderAugustNotes(){
    const id = alumnoId();
    if(!TARGETS.has(id)) return;
    const section = document.getElementById("extras");
    if(!section) return;
    const title = section.querySelector("h3");
    const eyebrow = section.querySelector(".eyebrow");
    const body = section.querySelector(".sectionBody");
    if(!body) return;
    if(title) title.textContent = "Indicaciones del profesor";
    if(eyebrow) eyebrow.textContent = "Mensaje técnico";
    const extra = notesFor(id);
    if(!extra.length) return;
    const merged = unique([...collectExisting(body), ...extra]);
    const key = `${id}-${merged.length}-${merged.join("|").length}`;
    if(body.dataset.augustNotesKey === key) return;
    body.dataset.augustNotesKey = key;
    body.innerHTML = `<div class="systemNotice teacherNotesNotice"><strong>Indicaciones del profesor:</strong> Lee estos puntos antes de entrenar y úsalos como guía técnica durante tu sesión.</div><ol class="teacherNotesList">${merged.map(n=>`<li>${html(n)}</li>`).join("")}</ol>`;
  }

  const content = document.getElementById("content");
  if(content){
    let queued = false;
    new MutationObserver(() => {
      if(queued) return;
      queued = true;
      setTimeout(() => { queued = false; renderAugustNotes(); }, 220);
    }).observe(content, { childList:true, subtree:true });
  }
})();
