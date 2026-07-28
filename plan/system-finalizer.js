(function(){
  const SYSTEM_ID = "chanonatkd_system";
  const isSystem = () => new URL(location.href).searchParams.get("alumno") === SYSTEM_ID;

  const U = {
    lubricacion: "https://drive.google.com/file/d/1RuhdS9If2L6QBhR6xplM5CEhFmLxR-Wq/view?usp=drive_link",
    bloque: "https://drive.google.com/file/d/13FYNM5nMd65YYPXZC9iuQTQ_dJUvnH1m/view?usp=sharing",
    pre: "https://drive.google.com/file/d/1mV7dkockaExAief_qW7RsMUuouwfMKM7/view?usp=sharing",
    basico: "https://drive.google.com/file/d/1jnSjVKx7mPFKco3HttgzmQUQgAsMm9Kt/view?usp=sharing",
    propuesta3: "https://drive.google.com/file/d/16UN5_qf8r8Vr5SVuWnuU5KaNibrzFcDQ/view?usp=sharing"
  };

  function h(value){
    const div = document.createElement("div");
    div.textContent = String(value ?? "");
    return div.innerHTML;
  }

  function item(titulo, dia, url, enfoque, reps, tipo){
    const data = {
      titulo,
      dia: dia || "Según indicación del Profesor Chanona",
      tipo: tipo || (url ? "video" : "info")
    };
    if(url) data.url = url;
    if(enfoque) data.enfoque = enfoque;
    if(reps) data.reps = reps;
    return data;
  }

  function lubricacion(){
    return item(
      "Lubricacion - ChanonaTKD",
      "Antes de cada entrenamiento",
      U.lubricacion,
      "Preparar articulaciones, movilidad general y cuerpo completo antes de iniciar el trabajo fuerte.",
      "antes de cada entrenamiento"
    );
  }

  function applyBaseText(plan){
    plan.updated_at = "Vista previa rumbo a versión final - lun 20 de julio de 2026";
    plan.enfoque_corto = "Mejorar flexibilidad desde cero, técnica de pateo y poomsae";
    plan.enfoque = "Trabaja en base a la pestaña que el Profesor Chanona te haya asignado. Esta plataforma organiza flexibilidad desde cero, técnica de pateo y poomsae para que entrenes de forma clara, progresiva y sin brincar niveles.";
    plan.chanonaflexDias = "Depende de la pestaña asignada por el Profesor Chanona";
    plan.isometricoDias = "Depende de la pestaña asignada por el Profesor Chanona";
    plan.pateoDias = "Pateo principiante dentro de Principiantes / pateo común en la pestaña Pateo";
    plan.poomsaeDias = "Solo si el Profesor Chanona te asignó trabajo de Poomsae";
    plan.apuntes = [
      "Trabaja solamente la pestaña que el Profesor Chanona te haya asignado.",
      "Si el Profesor Chanona te indica combinar dos pestañas, respeta ese orden.",
      "No cambies de nivel por tu cuenta.",
      "Cuida técnica, control y continuidad antes de buscar mayor dificultad."
    ];
  }

  function applySystemAdjustments(plan){
    if(!plan || !Array.isArray(plan.sistemaTabs)) return;
    applyBaseText(plan);
    const tabs = Object.fromEntries(plan.sistemaTabs.map(tab => [tab.id, tab]));

    if(tabs.principiantes){
      Object.assign(tabs.principiantes, {
        descripcion: "Para comenzar desde cero o trabajar de forma más suave. Aquí la prioridad es preparar el cuerpo, mejorar flexibilidad con control y patear sin forzar.",
        recomendacion: "Usa esta pestaña si el Profesor Chanona te asignó nivel principiante.",
        frecuencias: [
          "Calentamiento: antes de cada entrenamiento.",
          "ChanonaFlex: Estiramiento inicial con bloque lunes, miércoles y viernes; Chanonaflex con silla martes, jueves y sábado.",
          "Isométrico activo: lunes, miércoles y viernes.",
          "Pateo técnico principiante: martes, jueves y sábado."
        ],
        calentamiento: [lubricacion()],
        chanonaflexDias: "ESTIRAMIENTO INICIAL CON BLOQUE: LUNES - MIÉRCOLES - VIERNES / CHANONAFLEX CON SILLA: MARTES - JUEVES - SÁBADO",
        chanonaflex: [
          item("Estiramiento inicial con bloque", "LUNES - MIÉRCOLES - VIERNES", U.bloque, "Abrir movilidad y flexibilidad de forma progresiva usando bloque.", "1 vez / según video"),
          item("Chanonaflex - Con silla", "MARTES - JUEVES - SÁBADO", U.bloque, "Trabajar flexibilidad con apoyo de silla para cuidar postura y control.", "1 vez / según video")
        ]
      });
    }

    if(tabs.intermedios){
      Object.assign(tabs.intermedios, {
        descripcion: "Para trabajar con más control y resistencia. El pateo común está separado en la pestaña Pateo.",
        recomendacion: "Usa esta pestaña si el Profesor Chanona te asignó nivel intermedio. Para pateo, usa también la pestaña Pateo si el Profesor Chanona te lo indicó.",
        frecuencias: [
          "Calentamiento y activación: antes de cada entrenamiento.",
          "ChanonaFlex: Pre-Chanonaflex lunes, miércoles y viernes; Chanonaflex básico martes, jueves y sábado.",
          "Isométrico activo: lunes, miércoles y viernes.",
          "Pateo: está separado en la pestaña Pateo."
        ],
        calentamiento: [lubricacion()],
        chanonaflexDias: "PRE-CHANONAFLEX: LUNES - MIÉRCOLES - VIERNES / CHANONAFLEX BÁSICO: MARTES - JUEVES - SÁBADO",
        pateoDias: "VER PESTAÑA PATEO SI EL PROFESOR CHANONA LA ASIGNÓ",
        chanonaflex: [
          item("Pre-Chanonaflex - Estiramiento inicial", "LUNES - MIÉRCOLES - VIERNES", U.pre, "Preparar el cuerpo para flexibilidad sin perder alineación.", "1 vez / según video"),
          item("Circuito Chanonaflex - Básico", "MARTES - JUEVES - SÁBADO", U.basico, "Trabajo base de flexibilidad con control y continuidad.", "1 vez / según video")
        ]
      });
    }

    if(tabs.avanzados){
      Object.assign(tabs.avanzados, {
        descripcion: "Para trabajar con mayor exigencia técnica, fuerza y control. El pateo avanzado común está separado en la pestaña Pateo.",
        recomendacion: "Usa esta pestaña solo si el Profesor Chanona te asignó nivel avanzado. Para pateo, usa también la pestaña Pateo si el Profesor Chanona te lo indicó.",
        frecuencias: [
          "Calentamiento y activación: antes de cada entrenamiento.",
          "ChanonaFlex: Pre-Chanonaflex lunes, miércoles y viernes; básico martes, jueves y sábado; desde propuesta nivel 3 martes y jueves.",
          "Isométrico activo: lunes, miércoles y viernes.",
          "Pateo: está separado en la pestaña Pateo."
        ],
        calentamiento: [lubricacion()],
        chanonaflexDias: "PRE-CHANONAFLEX: LUNES - MIÉRCOLES - VIERNES / BÁSICO: MARTES - JUEVES - SÁBADO / DESDE PROPUESTA NIVEL 3: MARTES - JUEVES",
        pateoDias: "VER PESTAÑA PATEO SI EL PROFESOR CHANONA LA ASIGNÓ",
        chanonaflex: [
          item("Pre-Chanonaflex - Estiramiento inicial", "LUNES - MIÉRCOLES - VIERNES", U.pre, "Preparar el cuerpo antes de exigir rango y control.", "1 vez / según video"),
          item("Circuito Chanonaflex - Básico", "MARTES - JUEVES - SÁBADO", U.basico, "Mantener base y continuidad de flexibilidad.", "1 vez / según video"),
          item("Chanonaflex Desde Propuesta - Nivel 3", "MARTES - JUEVES", U.propuesta3, "Trabajo más exigente para rango, control y tolerancia progresiva.", "1 vez / según video")
        ]
      });
    }

    if(tabs.pateo){
      Object.assign(tabs.pateo, {
        descripcion: "Esta pestaña concentra el pateo técnico común para intermedios y avanzados. Hazla solo si el Profesor Chanona te la asignó.",
        recomendacion: "Trabaja estos ejercicios en los días indicados. No hagas los seis ejercicios el mismo día.",
        frecuencias: ["Ejercicios 1 y 2: lunes y viernes.", "Ejercicios 3 y 4: martes y jueves.", "Ejercicios 5 y 6: miércoles y sábado."],
        pateoDias: "1-2 LUNES Y VIERNES / 3-4 MARTES Y JUEVES / 5-6 MIÉRCOLES Y SÁBADO",
        pateoTecnico: [
          item("Silla + Ap Chaguis 3 niveles", "LUNES - VIERNES", "https://drive.google.com/open?id=1AS4bfSKwxw9duMZ6Rif4EaldzgSabrGS&usp=drive_copy", "Cámara, extensión y regreso de Ap Chagui con apoyo.", "8 a 10 reps por pierna / 2 series"),
          item("Ap chaguis dos bloques", "LUNES - VIERNES", "https://drive.google.com/open?id=1cdbZKTfQ1kzIFEfiUBQb7wusgY2fhXXa&usp=drive_copy", "Precisión de cámara y control de pierna frontal.", "8 a 10 reps por pierna / 2 series"),
          item("Ejercicio 1 - Yop Chagui", "MARTES - JUEVES", "https://drive.google.com/open?id=1IEhzAjlydHdjRSleXxWLABQfMTMsOMG1&usp=drive_copy", "Cámara, cadera, torso y alineación de Yop Chagui.", "8 a 10 reps por pierna / 2 series"),
          item("Ejercicio 2 - Yop Chagui", "MARTES - JUEVES", "https://drive.google.com/open?id=1QQtR5ObV1iiSqYx-GxFfOM1Lr1jnln70&usp=drive_copy", "Extensión, regreso y postura sin romper eje.", "8 a 10 reps por pierna / 2 series"),
          item("Torcion cadera con banda", "MIÉRCOLES - SÁBADO", "https://drive.google.com/open?id=1-mLzWj3XiEzCeul7LaIWuPzP39qQ6VtQ&usp=drive_copy", "Control de cadera y resistencia para dirección de pateo.", "8 a 10 reps por pierna / 2 series"),
          item("Ejercicio de fortalecimiento de tobillo con banda", "MIÉRCOLES - SÁBADO", "https://drive.google.com/file/d/1Sux7kXiJImkagl3ye2nN2bMjqmJOa18O/view?usp=drive_link", "Fortalecer tobillo, base y estabilidad.", "8 a 10 reps por pierna / 2 series")
        ]
      });
    }

    if(tabs.poomsae){
      Object.assign(tabs.poomsae, {
        descripcion: "Busca la poomsae y la línea que el Profesor Chanona te haya asignado. También puedes explorar otras líneas para repasar.",
        recomendacion: "Usa esta pestaña cuando el Profesor Chanona te indique trabajo de poomsae.",
        frecuencias: ["Trabajo asignado esta semana: Koryo - Línea 3.", "Busca la poomsae y la línea en el buscador de esta misma pestaña.", "Repite con atención los videos y tarjetas que aparezcan."],
        poomsaeDias: "SEGÚN INDICACIÓN DEL PROFESOR CHANONA / BUSCADOR POR LÍNEA",
        indicacionesExtras: [
          "Nuestro entrenamiento de esta semana será Koryo - Línea 3.",
          "Cuida que el torso no se vaya hacia el frente al ejecutar Yop Chagui; busca alineación y control.",
          "Marca el recobro de la Yop Chagui con rodilla al pecho y aterrizaje controlado, sin caer.",
          "En codazos y golpes, trabaja trayectoria clara de pectoral a pectoral con mayor explosividad."
        ],
        notasFinales: [
          "Para encontrar el trabajo de esta semana, entra a la pestaña Poomsae.",
          "En el primer botón selecciona Koryo.",
          "En el segundo botón selecciona Línea 3.",
          "Presiona Buscar y realiza las tarjetas que aparezcan.",
          "Lee primero las Indicaciones del profesor para saber en qué detalles debes concentrarte.",
          "Excelente semana de entrenamiento."
        ]
      });
    }
  }

  const POOMSAES = [
    ["Taeguk 1",6], ["Taeguk 2",6], ["Taeguk 3",6], ["Taeguk 4",6], ["Taeguk 5",6], ["Taeguk 6",6], ["Taeguk 7",6], ["Taeguk 8",6], ["Koryo",4], ["Keumgang",9], ["Taebaek",5], ["Pyonwong",4], ["Sipjin",4], ["Ejercicios especiales",1]
  ];
  const LIB = {};
  function add(poomsae, line, ...items){
    if(!LIB[poomsae]) LIB[poomsae] = {};
    if(!LIB[poomsae][String(line)]) LIB[poomsae][String(line)] = [];
    LIB[poomsae][String(line)].push(...items);
  }
  function pending(poomsae, line){
    const title = poomsae === "Ejercicios especiales" ? "Ejercicios especiales" : `${poomsae} - Línea ${line}`;
    return [item(title, "Según indicación del Profesor Chanona", "", "pendiente", "pendiente", "info")];
  }

  function seedLibrary(){
    for(let line=1; line<=6; line++){
      add("Taeguk 1", line, item("Taeguk 1 - Espejo paso a paso", "Referencia", "https://drive.google.com/open?id=1AP1did1HVwyMQy8byxTCLx9fy32IHhWM&usp=drive_copy", "Referencia completa para ubicar línea, dirección y ritmo.", "1 repaso completo"));
      add("Taeguk 2", line, item("Taeguk 2 completo", "Referencia", "https://drive.google.com/open?id=153in4ZZtofBlf44rwqhrtyyIwBUrU9_8&usp=drive_copy", "Referencia completa para ubicar línea y movimientos.", "1 repaso completo"));
      add("Taeguk 3", line, item("Taeguk 3 completo", "Referencia", "https://drive.google.com/open?id=1bquwnq6Y9_hq12xGclMuhlcyEqwbqCrl&usp=drive_copy", "Referencia completa para ubicar línea y movimientos.", "1 repaso completo"));
      add("Taeguk 4", line, item("Taeguk 4 - Completo", "Referencia", "https://drive.google.com/open?id=1tzLShWE2ftfxZSAvvzyn7oGTstvXrM13&usp=drive_copy", "Referencia completa de Taeguk 4.", "1 repaso completo"));
    }

    add("Taeguk 4",1,item("Inicio con twit kubi (solo posicion)","Según indicación","https://drive.google.com/open?id=1A70nM_-pgKRvJenFyse3ZnpLPVlxNZEz&usp=drive_copy","Peso y postura inicial en Twit Kubi.","8 a 10 reps / 2 series"),item("Transicion manos y pies L1 T4","Según indicación","https://drive.google.com/open?id=1NglZlc_b57Vsi9geRsDXEeSg97bJGQJB&usp=drive_copy","Manos y pies coordinados en línea 1.","8 a 10 reps / 2 series"));
    add("Taeguk 4",2,item("Linea 2 yop chagui aterrizaje Taeguk 4","Según indicación","https://drive.google.com/open?id=1Jxe0Bu3ibIaOBY_ykKTxE3afLtpfWuOs&usp=drive_copy","Yop Chagui y aterrizaje.","8 a 10 reps / 2 series"),item("Ap chagui, prep y aterrizaje correcto","Según indicación","https://drive.google.com/open?id=1avHtkOVL1SY9c4sy4ugT5t260DCeu3Fz&usp=drive_copy","Ap Chagui, preparación y aterrizaje técnico.","8 a 10 reps / 2 series"));
    add("Taeguk 4",3,item("Transicion L2 a 3 T4 - pies","Según indicación","https://drive.google.com/open?id=1-Jlts5WH0nNHnSfaUom-9EOsJltoVjD2&usp=drive_copy","Transición de pies.","8 a 10 reps / 2 series"));
    add("Taeguk 4",4,item("Ap + Backfist de T4 L4 - Taeguk 4","Según indicación","https://drive.google.com/open?id=1BtdMNbAEA77j4-GIMxgreKYNDnbnYeiO&usp=drive_copy","Ap Chagui y golpe de revés.","8 a 10 reps / 2 series"));

    add("Taeguk 5",1,item("Transición doble montong makki - L1 a L2 T5","Según indicación","https://drive.google.com/open?id=1nS4odRmRR7Da-q3oGTI1UOYhuqKpzCah&usp=drive_copy","Transición de línea 1 a línea 2.","8 a 10 reps / 2 series"));
    add("Taeguk 5",2,item("Circuito aterrizaje + prep - T5 L2","Según indicación","https://drive.google.com/open?id=1PVxwOGM_EDJm0SIrRumga-CUDv466-rj&usp=drive_copy","Aterrizaje y preparación de línea 2.","8 a 10 reps / 2 series"));
    add("Taeguk 5",3,item("Sonnal y codazo + timing - T5 L3","Según indicación","https://drive.google.com/open?id=1yFJM2dRU3-OJCETZq5i9iYkz72W2aOnT&usp=drive_copy","Sonnal, codazo y timing.","8 a 10 reps / 2 series"));
    add("Taeguk 5",4,item("Are + montong + Ap - T5 L4","Según indicación","https://drive.google.com/open?id=1FwqSElEVd8CZ6QQNKTFSjow2yYjUgwxG&usp=drive_copy","Are, Montong y Ap Chagui.","8 a 10 reps / 2 series"));
    add("Taeguk 5",5,item("Olgul + Yop +Codazo - T5 L5","Según indicación","https://drive.google.com/open?id=1k8rtRGCKO6yzMMRfFNw1709X3XHHmPHf&usp=drive_copy","Yop Chagui, codazo y brazos.","8 a 10 reps / 2 series"));
    add("Taeguk 5",6,item("Are + Ap + Golpe - T5 L6","Según indicación","https://drive.google.com/open?id=1838t3kpNzYH2Bxq39v_3WWh03o5tepR2&usp=drive_copy","Are, Ap y golpe.","8 a 10 reps / 2 series"));

    add("Taeguk 6",2,item("Posicion de puños en Dollyo Chagui","Según indicación","https://drive.google.com/file/d/13QnJgsbNRwVjdlohYwdONDby2xnos9mb/view?usp=drive_link","Puños quietos durante Dollyo Chagui.","8 a 10 reps / 2 series"),item("Postura y alineacion en aterrizaje dollyo chagui","Según indicación","https://drive.google.com/open?id=1gZZJC7ztdsIG5fmsO9WuJo3tscwCqFvL&usp=drive_copy","Aterrizaje de Dollyo con alineación.","8 a 10 reps / 2 series"));
    add("Taeguk 6",4,item("5 seconds Taeguk 6 - T6 L4","Según indicación","https://drive.google.com/open?id=1h2DAwawrW8Ed-91RtFZ9vrlUW38YEVQd&usp=drive_copy","Retención y control.","3 a 5 reps con pausa"),item("Posicion de puños en Dollyo Chagui","Según indicación","https://drive.google.com/file/d/13QnJgsbNRwVjdlohYwdONDby2xnos9mb/view?usp=drive_link","Puños quietos durante Dollyo Chagui.","8 a 10 reps / 2 series"));
    add("Taeguk 6",6,item("Sonnal + golpe + ap y twit kubis - T6 L6","Según indicación","https://drive.google.com/open?id=1IHopOX0RybZ4XY9mNx2qk8XkhK3N5gxk&usp=drive_copy","Sonnal, golpe, Ap y Twit Kubi.","8 a 10 reps / 2 series"),item("Twit Kubi hacia atras - Transiciones","Según indicación","https://drive.google.com/open?id=1AP-k7qaZI9ibVi-Qo7wNijf1xWZuuwME&usp=drive_copy","Transiciones hacia atrás.","8 a 10 reps / 2 series"));

    add("Taeguk 7",1,item("Línea 1 Taeguk 7 - T7 L1","Según indicación","https://drive.google.com/open?id=1H4mcONZfDmg2fP7UA-nSSgXdPsg42lJC&usp=drive_copy","Línea 1.","8 a 10 reps / 2 series"));
    add("Taeguk 7",2,item("L2 Taeguk 7 - T7 L2","Según indicación","https://drive.google.com/open?id=12F-yyH4XJl3A4FRt_3biwxE0th5Mtsq1&usp=drive_copy","Línea 2.","8 a 10 reps / 2 series"),item("Transicion Twit Kubi a Twit Kubi fluido","Según indicación","https://drive.google.com/open?id=15RLcPyVzY69tJM9SIrfyUI_KPlxR3XGD&usp=drive_copy","Transición fluida en Twit Kubi.","8 a 10 reps / 2 series"));
    add("Taeguk 7",3,item("L3 Taeguk 7 - T7 L3","Según indicación","https://drive.google.com/open?id=1J8Nph6ySfCBldhOCVqTembIz0THwfxfk&usp=drive_copy","Línea 3.","8 a 10 reps / 2 series"));
    add("Taeguk 7",4,item("Kawi makki","Según indicación","https://drive.google.com/open?id=1I4Re5fJg2XESqdKWWlZnHZSiwUc11AcE&usp=drive_copy","Kawi Makki con precisión y velocidad.","8 a 10 reps / 2 series"));
    add("Taeguk 7",5,item("Linea 5 taeguk 7","Según indicación","https://drive.google.com/open?id=13WNzHHj7NHueKdgebU79zpNh8rNS56DA&usp=drive_copy","Línea 5.","8 a 10 reps / 2 series"));

    add("Taeguk 8",1,item("Taeguk 8 - Primer movimiento","Según indicación","https://drive.google.com/open?id=1DWX9g7vzlLsRQGNNi4RxxlA4Cz3_pHiJ&usp=drive_copy","Primer movimiento.","8 a 10 reps / 2 series"),item("Doble golpe correcto","Según indicación","https://drive.google.com/open?id=1axDKIpPxmqPNU04EnOXQapUo-XG0weld&usp=drive_copy","Doble golpe con velocidad.","8 a 10 reps / 2 series"),item("Aterrizaje ap kubi + golpe medio","Según indicación","https://drive.google.com/open?id=1FzfcOO8NcL63cVBvahDS2rthF14nDiQT&usp=drive_copy","Aterrizaje Ap Kubi y golpe medio.","8 a 10 reps / 2 series"));
    add("Taeguk 8",2,item("Linea 2 Taeguk 8 - golpe lento","Según indicación","https://drive.google.com/open?id=1C2DhJwh3G6jOEITK4_chQV5J4rdYxtde&usp=drive_copy","Golpe lento y controlado.","8 a 10 reps / 2 series"));
    add("Taeguk 8",3,item("L3 Taeguk 8 - T8 L3","Según indicación","https://drive.google.com/open?id=1yNXOjP9b6Zgf7UC48anqyO0E5BcFQyXH&usp=drive_copy","Línea 3.","8 a 10 reps / 2 series"));
    add("Taeguk 8",4,item("L4 Taeguk 8 - T8 L4","Según indicación","https://drive.google.com/open?id=1GCH6JTNZhtumNmek2I0UWW9auQgA9w6w&usp=drive_copy","Línea 4.","8 a 10 reps / 2 series"));
    add("Taeguk 8",5,item("L5 Taeguk 8 - T8 L5","Según indicación","https://drive.google.com/open?id=1PHIh6QX46sIzk5XbVo1wWB10hm1CUS4p&usp=drive_copy","Línea 5.","8 a 10 reps / 2 series"));
    add("Taeguk 8",6,item("L6 Taeguk 8 - T8 L6","Según indicación","https://drive.google.com/open?id=1J48mZWmxnb3MW45inX4rKlem-Q2-Kn5y&usp=drive_copy","Línea 6.","8 a 10 reps / 2 series"));

    add("Koryo",1,item("Linea 1 Koryo - Precisión + Timing","Según indicación","https://drive.google.com/open?id=1F8o4BF5j1dkZdPwxREY4JodRuFLwwRMK&usp=drive_copy","Precisión y timing.","8 a 10 reps / 2 series"),item("Inicio con twit kubi (solo posicion)","Según indicación","https://drive.google.com/open?id=1A70nM_-pgKRvJenFyse3ZnpLPVlxNZEz&usp=drive_copy","Peso correcto en Twit Kubi.","8 a 10 reps / 2 series"));
    add("Koryo",2,item("Linea 2 Koryo - 2.1 ap chagui + golpes","Según indicación","https://drive.google.com/open?id=1D2ScTJYlw1cCZw5SfoXn5QlF0LiSjOpv&usp=drive_copy","Ap Chagui y golpes.","8 a 10 reps / 2 series"));
    add("Koryo",3,item("Koryo L3 - Lado derecho","Según indicación","https://drive.google.com/open?id=116eSAk3WUKVvXneFxAAyuyrG0mu7pwIi&usp=drive_copy","Yop Chagui, torso, cadera y control del lado derecho.","15 reps / 1 serie"),item("Koryo L3 - Lado izquierdo","Según indicación","https://drive.google.com/open?id=1d39Oz_ASS6Yb-BIUclGe9QrT-WP9BgwS&usp=drive_copy","Yop Chagui, torso, cadera y control del lado izquierdo.","15 reps / 1 serie"),item("Koryo L3 - Concentración 8 seg","Según indicación","https://drive.google.com/open?id=12W8m2JmF9ICQiA6T1q8DB2TNpoSa_wNJ&usp=drive_copy","Timing, respiración y concentración.","10 reps / 1 serie"),item("Linea 3 Koryo - Sentadilla y camara","Según indicación","https://drive.google.com/open?id=1dlhr114oOT6oiKKaD_02J-MUBPEma9Gn&usp=drive_copy","Sentadilla, cámara y preparación.","8 a 10 reps / 2 series"));
    add("Koryo",4,item("Koryo L4 - Golpes y defensas","Según indicación","https://drive.google.com/open?id=1UHV_mYsNFt3pZIiQKAWXIYWjGcpoguwP&usp=drive_copy","Golpes y defensas.","8 a 10 reps / 2 series"));

    add("Keumgang",1,item("Giro correcto keumgang - pies","Según indicación","https://drive.google.com/open?id=1PDZu3MA51xQAzl-fSd4A9zXxIn7mxtH7&usp=drive_copy","Giro correcto desde los pies.","8 a 10 reps / 2 series"));
    add("Keumgang",2,item("Keumgang - Teisho Chigui - Mano derecha","Según indicación","https://drive.google.com/open?id=12u0zfSzDAV2-vJA6wFD0n9fP7HYCoLmn&usp=drive_copy","Teisho Chigui.","8 a 10 reps / 2 series"));
    add("Keumgang",3,item("Keumgang - An Palmok Momtong Hecho Makki","Según indicación","https://drive.google.com/open?id=1qxsvhqlQDfLzTEeHxlbDHwAnijHjAWA1&usp=drive_copy","An Palmok Momtong Hecho Makki.","8 a 10 reps / 2 series"));
    add("Taebaek",3,item("L3 Taebaek - Correcta ejecución por movimiento","Según indicación","https://drive.google.com/open?id=1ZO57uNvwp0oYS6BpWSIonc54PDorpFiK&usp=drive_copy","Línea 3 por movimiento.","8 a 10 reps / 2 series"));
    add("Pyonwong",1,item("Inicio con twit kubi (solo posicion)","Según indicación","https://drive.google.com/open?id=1A70nM_-pgKRvJenFyse3ZnpLPVlxNZEz&usp=drive_copy","Peso correcto en Twit Kubi.","8 a 10 reps / 2 series"),item("Pyonwong + Sonnal Montong Bakkat Makki","Según indicación","https://drive.google.com/open?id=164BkY5_QP6CC7z0MVa1eejIT0BbkAX4K&usp=drive_copy","Sonnal Montong Bakkat Makki.","8 a 10 reps / 2 series"));
    add("Pyonwong",2,item("Pyonwong - Codazo a Codazo - Derecha a izquierda","Según indicación","https://drive.google.com/open?id=1mYj95xtS6eb5yNzInIV_UyfseDhfygg7&usp=drive_copy","Codazo a codazo.","8 a 10 reps / 2 series"));
    add("Pyonwong",4,item("Pyonwong - Santul hasta final","Según indicación","https://drive.google.com/open?id=1DZ9aNf69oaoCha-hDp-SOSmCSepG7e_R&usp=drive_copy","Santul hasta el final.","8 a 10 reps / 2 series"));
    add("Sipjin",1,item("Primer Mov Sipjin","Según indicación","https://drive.google.com/open?id=1V6_zfIyng5pZ23wStNHzs1jJ_6O5Rg6Q&usp=drive_copy","Primer movimiento.","8 a 10 reps / 2 series"),item("Segundo Mov lento de sipjin","Según indicación","https://drive.google.com/open?id=1kp6-1-ee1SwDf4_sbdfnz-E-PKETqiZ1&usp=drive_copy","Segundo movimiento lento.","8 a 10 reps / 2 series"),item("Inicio con twit kubi (solo posicion)","Según indicación","https://drive.google.com/open?id=1A70nM_-pgKRvJenFyse3ZnpLPVlxNZEz&usp=drive_copy","Peso correcto en Twit Kubi.","8 a 10 reps / 2 series"));
    add("Sipjin",2,item("Santul Makki Sipjin","Según indicación","https://drive.google.com/open?id=1Zgh89nC3aB6ax9yRXxgT_A0bc-syGWcW&usp=drive_copy","Santul Makki.","8 a 10 reps / 2 series"));
    add("Sipjin",3,item("Codazo y giro transicion sipjin","Según indicación","https://drive.google.com/open?id=1l1FslN_EqKiSAWoftVnr3lU3RWYDCTVD&usp=drive_copy","Codazo y giro.","8 a 10 reps / 2 series"));

    add("Ejercicios especiales", "especiales",
      item("Chuchum + Giro + Jakdari + Yop - Ejercicio","Según indicación","https://drive.google.com/open?id=1z0tEpdciDc-QqCm2AqdcJ8Q-wZrUhZ3Z&usp=drive_copy","Ejercicio especial.","8 a 10 reps / 2 series"),
      item("Sonnal Montong Bakkat Makki direccion","Según indicación","https://drive.google.com/open?id=1Tzv_rE4C3qdhgv76VPXDgONH8q5OXOfd&usp=drive_copy","Dirección de Sonnal.","8 a 10 reps / 2 series"),
      item("Transicion ap kubi a ap kubi","Según indicación","https://drive.google.com/open?id=1GFswX5pFCIA84NIvmi0t1ZfZcEiAc1yv&usp=drive_copy","Transición Ap Kubi.","8 a 10 reps / 2 series"),
      item("Preparacion correcta del golpe","Según indicación","https://drive.google.com/open?id=1YqTL-tIYcgR5kYa2ShQInBnmbeQAU1Jy&usp=drive_copy","Preparación del golpe.","8 a 10 reps / 2 series"),
      item("Puños al pecho ap chagui","Según indicación","https://drive.google.com/open?id=1rWWin6hmMrzLvvlhQGDFmU6_dWHfoKKk&usp=drive_copy","Puños al pecho.","8 a 10 reps / 2 series"),
      item("Transicion lateral a frontal Ap Kubi a Ap Kubi","Según indicación","https://drive.google.com/open?id=1Abda3tbJXb54BNLiJUEIGTipRlrV9u4L&usp=drive_copy","Transición lateral-frontal.","8 a 10 reps / 2 series"),
      item("Transicion Twit Kubi a Twit Kubi","Según indicación","https://drive.google.com/open?id=1TQjuHQflDQu65fh_zJE1QSTxD2qVaoEX&usp=drive_copy","Transición Twit Kubi.","8 a 10 reps / 2 series"),
      item("Transicion Ap Kubi a Ap Kubi","Según indicación","https://drive.google.com/open?id=1aXojkxi9SDk10XS_OUDvYgIIkAvd5Thk&usp=drive_copy","Transición Ap Kubi.","8 a 10 reps / 2 series"),
      item("Transicion Twit Kubi","Según indicación","https://drive.google.com/open?id=1txVlgMDOZNVvDeaetEvSO23_N7uRiH3m&usp=drive_copy","Transición Twit Kubi.","8 a 10 reps / 2 series"),
      item("Transicion Twit Kubi al frente","Según indicación","https://drive.google.com/open?id=1nM9qmOoBEkkZxkS9opOM7N9pfg-b0JRb&usp=drive_copy","Twit Kubi al frente.","8 a 10 reps / 2 series"),
      item("Transicion ap kubi + peso y talon","Según indicación","https://drive.google.com/open?id=1px4BD-h8EFtI9AUEgR4XrXR4B9anXeOK&usp=drive_copy","Peso y talón.","8 a 10 reps / 2 series"),
      item("Transicion ap seogui","Según indicación","https://drive.google.com/open?id=173-ABbGz9ZYn095O4pc769w-WgN3eyxO&usp=drive_copy","Transición Ap Seogui.","8 a 10 reps / 2 series"),
      item("Transicion + Elevacion de talon","Según indicación","https://drive.google.com/open?id=1nFE7bld4aHyjMswJuqN-AsHtiA0M0D9e&usp=drive_copy","Elevación de talón.","8 a 10 reps / 2 series"),
      item("Transicion twit kubi a ap kubi","Según indicación","https://drive.google.com/open?id=1xxdEMXYZWYiNLG15IzzqNNaYQR65YXsa&usp=drive_copy","Twit Kubi a Ap Kubi.","8 a 10 reps / 2 series")
    );
  }
  seedLibrary();

  let poomState = { poomsae: "Koryo", line: "3" };
  function lineCount(poomsae){
    const found = POOMSAES.find(x => x[0] === poomsae);
    return found ? found[1] : 1;
  }
  function poomOptions(){
    return POOMSAES.map(([name]) => `<option value="${h(name)}" ${name === poomState.poomsae ? "selected" : ""}>${h(name)}</option>`).join("");
  }
  function lineOptions(poomsae){
    if(poomsae === "Ejercicios especiales") return `<option value="especiales">Ejercicios</option>`;
    const total = lineCount(poomsae);
    return Array.from({length: total}, (_, i) => String(i + 1)).map(n => `<option value="${n}" ${n === String(poomState.line) ? "selected" : ""}>Línea ${n}</option>`).join("");
  }
  function finalFinder(){
    const lineLabel = poomState.poomsae === "Ejercicios especiales" ? "Tipo" : "Línea";
    const disabled = poomState.poomsae === "Ejercicios especiales" ? "disabled" : "";
    return `
      <div class="poomsaeFinder" id="poomsaeFinalFinder">
        <div class="poomsaeFinderGrid">
          <label><span>Poomsae</span><select id="pfPoom">${poomOptions()}</select></label>
          <label><span>${lineLabel}</span><select id="pfLine" ${disabled}>${lineOptions(poomState.poomsae)}</select></label>
          <button id="pfSearch" class="action primary" type="button">🔎 Buscar</button>
        </div>
        <div class="systemNotice"><strong>Uso:</strong> Busca exactamente la poomsae y línea que el Profesor Chanona te indique.</div>
      </div>
      <div id="pfResults" class="poomsaeSearchResults">
        <div class="poomsaeEmptyState"><strong>Cómo usarlo:</strong><p>Elige una poomsae, elige una línea y presiona <b>Buscar</b>.</p><p>Esta semana: <b>Koryo - Línea 3</b>.</p></div>
      </div>`;
  }
  function showResults(){
    const results = document.getElementById("pfResults");
    if(!results) return;
    const key = poomState.poomsae === "Ejercicios especiales" ? "especiales" : String(poomState.line);
    const cards = (LIB[poomState.poomsae] && LIB[poomState.poomsae][key]) || pending(poomState.poomsae, key);
    const title = poomState.poomsae === "Ejercicios especiales" ? h(poomState.poomsae) : `${h(poomState.poomsae)} • Línea ${h(poomState.line)}`;
    results.innerHTML = `<div class="poomsaeResultTitle"><strong>Resultado:</strong> ${title}</div>${renderList(cards, "Poomsae", "Según indicación del Profesor Chanona")}`;
  }
  function setupFinder(){
    const poom = document.getElementById("pfPoom");
    const line = document.getElementById("pfLine");
    const btn = document.getElementById("pfSearch");
    if(!poom || !line || !btn) return;
    poom.onchange = () => {
      poomState.poomsae = poom.value;
      poomState.line = poomState.poomsae === "Ejercicios especiales" ? "especiales" : "1";
      const body = document.querySelector("#tab-poomsae-buscador .sectionBody");
      if(body){
        body.innerHTML = finalFinder();
        setupFinder();
      }
    };
    line.onchange = () => { poomState.line = line.value; };
    btn.onclick = () => {
      poomState.poomsae = poom.value;
      poomState.line = poomState.poomsae === "Ejercicios especiales" ? "especiales" : line.value;
      showResults();
    };
  }

  function postprocess(){
    if(!isSystem()) return;
    document.querySelectorAll(".section h3").forEach(header => {
      if(header.textContent.trim() === "Indicaciones extras") header.textContent = "Indicaciones del profesor";
    });
    document.querySelectorAll(".systemNotice").forEach(notice => {
      const current = notice.innerHTML;
      const next = current.replaceAll("Bryan", "Profesor Chanona").replaceAll("alumno debe trabajar", "debes trabajar");
      if(next !== current) notice.innerHTML = next;
    });
    const body = document.querySelector("#tab-poomsae-buscador .sectionBody");
    if(body && !document.getElementById("poomsaeFinalFinder")){
      body.innerHTML = finalFinder();
      setupFinder();
    }
  }

  const oldRenderPage = typeof renderPage === "function" ? renderPage : null;
  if(oldRenderPage){
    renderPage = function(plan, alumno){
      if(isSystem()) applySystemAdjustments(plan);
      oldRenderPage(plan, alumno);
      setTimeout(postprocess, 40);
      setTimeout(postprocess, 160);
    };
  }

  const oldBot = typeof getBotAnswer === "function" ? getBotAnswer : null;
  const tips = {
    koryo: ["En línea 3, las Yop Chagui necesitan cámara, rodilla al pecho y regreso controlado.", "Evita que el torso se vaya hacia adelante o hacia atrás en Yop Chagui.", "En codazos, piensa trayectoria de pectoral a pectoral y termina fuerte.", "En golpes de cuchillo al cuello, no abras la mano antes de tiempo.", "En Twit Kubi, lleva más peso a la pierna trasera."],
    t4: ["Cuida Twit Kubi y la mano asistente.", "En línea 2, Ap Chagui y Yop Chagui necesitan aterrizaje controlado.", "En Yop Chagui, no muevas las manos del costado.", "Encapsula transiciones; no gires forzado con talón."],
    t5: ["La Yop Chagui necesita más rodilla al pecho y puños coordinados.", "Los puños al costado deben jalar con velocidad hacia la cintura.", "Montong An Makki debe ir al centro.", "Evita que los codazos escondan los dedos."],
    t6: ["Dollyo Chagui debe salir ligeramente diagonal.", "En Ap Chagui, los puños se quedan en el pecho.", "La defensa a la cara debe estar frente a la cara y sin torcer cuello.", "Evita flexionar la pierna de apoyo cuando pateas."],
    t7: ["Bom Sogui necesita peso 90/10 atrás.", "Kawi Makki requiere precisión, torso y velocidad.", "En la última línea, los dedos deben salir claramente.", "Evita carrusel en transiciones a Twit Kubi."],
    t8: ["En línea 2, el brazo trasero debe abrir más y salir con fuerza.", "El golpe de meditación gira el puño hasta el punto final, no antes.", "Los dobles y triples golpes necesitan velocidad y continuidad.", "Las Ap Chagui necesitan caer en la misma línea."],
    general: ["Mantén un mismo patrón de ritmo.", "No mires al piso ni al cielo; mueve la vista, no toda la cabeza.", "Prepara completo antes de ejecutar.", "Usa torsión del torso sin torcer cuello.", "Marca final claro en defensas, golpes y aterrizajes."]
  };
  function tipList(arr){ return `<ul>${arr.map(x => `<li>${h(x)}</li>`).join("")}</ul>`; }
  function normalize(text){ return String(text || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""); }
  getBotAnswer = function(question){
    if(!isSystem()) return oldBot ? oldBot(question) : "Consulta al Profesor Chanona antes de modificar tu entrenamiento.";
    const q = normalize(question);
    if(q.includes("koryo") || q.includes("linea 3") || q.includes("l3")) return `Para Koryo, especialmente línea 3, trabaja torso alineado, cámara de Yop Chagui, recobro controlado y aterrizaje sin caída.${tipList(tips.koryo)}`;
    if(q.includes("taeguk 4") || q.includes("t4")) return `En Taeguk 4, cuida transiciones a Twit Kubi, aterrizajes después de patear y manos firmes.${tipList(tips.t4)}`;
    if(q.includes("taeguk 5") || q.includes("t5")) return `En Taeguk 5, revisa puños al costado, Montong An Makki, preparación de brazos y Yop Chagui.${tipList(tips.t5)}`;
    if(q.includes("taeguk 6") || q.includes("t6")) return `En Taeguk 6, cuida Dollyo Chagui diagonal, defensa a la cara, puños quietos y Twit Kubi hacia atrás.${tipList(tips.t6)}`;
    if(q.includes("taeguk 7") || q.includes("t7") || q.includes("kawi")) return `En Taeguk 7, trabaja Bom Sogui 90/10, Kawi Makki preciso y velocidad constante.${tipList(tips.t7)}`;
    if(q.includes("taeguk 8") || q.includes("t8")) return `En Taeguk 8, revisa línea 2, brazo trasero, golpe de meditación, dobles/triples golpes y aterrizajes.${tipList(tips.t8)}`;
    if(q.includes("yop")) return `Para Yop Chagui: rodilla al pecho, torso alineado y regreso controlado. No busques altura si pierdes postura.${tipList(tips.koryo.slice(0,3))}`;
    if(q.includes("ap chagui") || q.includes("frontal")) return `Para Ap Chagui: puños al pecho, pierna de apoyo firme y recobro claro. Evita mover cuello o barbilla para generar fuerza.${tipList(tips.t6.slice(1,4))}`;
    if(q.includes("esta semana") || q.includes("poomsae asignada") || q.includes("que trabajo") || q.includes("que toca")) return "Esta semana el trabajo indicado en Poomsae es <b>Koryo - Línea 3</b>. Entra a la pestaña Poomsae, selecciona Koryo, luego Línea 3 y presiona Buscar.";
    return `Revisa la pestaña que el Profesor Chanona te asignó. Trabaja con técnica limpia, base fuerte, preparación completa y ritmo constante.${tipList(tips.general)}`;
  };

  const contentEl = document.getElementById("content");
  if(contentEl){
    let pendingPostprocess = false;
    new MutationObserver(() => {
      if(pendingPostprocess) return;
      pendingPostprocess = true;
      setTimeout(() => {
        pendingPostprocess = false;
        postprocess();
      }, 80);
    }).observe(contentEl, { childList: true, subtree: true });
  }
})();