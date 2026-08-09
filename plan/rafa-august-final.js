(function(){
  const TARGET = "rafa_hernandez";
  const current = () => new URL(location.href).searchParams.get("alumno") || "";
  const html = value => {
    const div = document.createElement("div");
    div.textContent = String(value ?? "");
    return div.innerHTML;
  };

  const GROUP_NOTES = [
    ["Postura General y Torso", [
      "Alineación del torso: evita llevar el torso hacia el frente en general, y hacia atrás al ejecutar Yop Chagi.",
      "Estabilidad en el apoyo: al sostener una postura, evita recargarte; la fuerza debe concentrarse en el glúteo y el isquiotibial de la pierna de apoyo.",
      "Control de hombros: no lleves los hombros hacia el frente al recoger las patadas, especialmente en Yop Chagi."
    ]],
    ["Cabeza y Cuello", [
      "Control cervical en el pateo: mantén la cabeza y el cuello firmes, evitando que se vayan hacia el frente al ejecutar Ap Chagi.",
      "Estabilización desde la base: mantén la fuerza y el equilibrio en la parte inferior del cuerpo para evitar que el cuello compense moviéndose."
    ]],
    ["Cadera y Glúteos", [
      "Control de glúteos: evita sacar los glúteos durante la ejecución de Yop Chagi, especialmente del lado izquierdo después de un Ap Chagi.",
      "Estabilidad de la cadera: mantén la cadera inmóvil y lineal, evitando que se vaya hacia el frente o hacia atrás al patear.",
      "Proyección en transiciones: en ejercicios con silla, proyecta la cadera hacia el frente en lugar de llevar el torso hacia atrás para centrar la fuerza."
    ]],
    ["Extremidades Inferiores: Pateo y Posiciones", [
      "Extensión de apoyo: mantén la pierna de apoyo completamente estirada al momento de patear.",
      "Transición en Yop Chagi: conserva buena postura en la fase preparatoria, pero aplica fuerza explosiva desde el abdomen y la pierna de apoyo inmediatamente después de preparar.",
      "Recobro de patada: marca correctamente la flexión de rodilla, o cámara, al regresar del Ap Chagi.",
      "Dirección de los pies: evita que el pie derecho se desvíe hacia afuera en la línea 2 al ir a Chumbi.",
      "Transición en Dwit Kubi: al avanzar a la línea 2, evita que las rodillas se junten; la transición debe ser únicamente jalando el pie.",
      "Longitud en Ap Seogi: corrige los pasos que se están haciendo muy grandes; las posiciones deben ser más cortas y pequeñas.",
      "Aterrizajes en Ap Kubi: corrige la distancia en los aterrizajes posteriores a Yop Chagi, ya que el Ap Kubi está quedando muy corto o pequeño."
    ]],
    ["Extremidades Superiores y Defensas", [
      "Preparación y ejecución de codazos: evita la suavidad excesiva; la preparación y la ejecución deben ser firmes. Mantén los puños pegados al cuerpo durante la preparación, evitando que queden separados.",
      "Trayectoria de codazos: la preparación de las manos debe ir estrictamente de pectoral a pectoral, corrigiendo el lado derecho donde el puño no está llegando al pectoral contrario.",
      "Posición del codo: evita que el codo contrario se vaya hacia atrás al aterrizar el golpe o codazo, especialmente hacia el lado derecho.",
      "Defensa An Makki: ejecútala con mayor potencia activando la base.",
      "Preparación de Keumgang: cierra más la preparación, evitando que quede muy abierta.",
      "Preparación de Pyongwon: evita abrir demasiado la trayectoria hacia afuera.",
      "Golpes al cuello: busca máxima explosividad. En la preparación, no abras la mano desde la cintura; mantén el trayecto cerrado hasta el momento del impacto.",
      "Golpe de revés final: acerca más el puño a la axila en la trayectoria final.",
      "Acción de brazos en Ap Chagi: lleva los brazos al pecho durante la patada, pero sincronizando el tiempo exacto y no antes de tiempo."
    ]],
    ["Ritmo", [
      "Tiempos de retención: sostén firmemente las posiciones durante los segundos reglamentarios."
    ]]
  ];

  const SPECIFIC_NOTES = [
    ["Pyonwong", [
      "En los regresos, el torso está regresando de forma forzada y no en conjunto con la inercia.",
      "El torso se está torciendo hacia adentro antes de tiempo cuando regresas del recobro de la pierna en Yop Chagi; debe mantenerse abierto hasta ejecutar el codazo del aterrizaje.",
      "En los codazos, procura abrir más la ejecución, ya que se ve algo pequeña.",
      "La defensa baja con movimiento circular después del aterrizaje de Yop Chagi está correcta, pero se ve un poco forzada en ambos lados; dale más velocidad.",
      "Fortalece más la zona abdominal para evitar que el abdomen se vaya al frente en las Ap Kubis.",
      "La preparación de la posición de Keumgang debe ser directa cuando los puños llegan a su punto de ejecución; actualmente se está viendo circular."
    ]],
    ["Keumgang", [
      "En la finalización de las meditaciones laterales, estás terminando ligeramente con extensión de clic.",
      "Dale un poco más de movimiento a la torsión del torso en los golpes laterales al aterrizar desde la posición de Keumgang; este pequeño impulso está siendo bien valorado en el análisis técnico.",
      "En los giros aún se nota movimiento del cuello, especialmente en la cervical, como si llevaras la cabeza hacia adelante.",
      "La torsión del cuello en líneas 1 y 2 se está controlando muy bien, pero en el último movimiento de la línea todavía se nota.",
      "Los Olgul Makkis están torciendo ligeramente hacia arriba; no es mucho, pero aún se nota.",
      "Las Chuchum Soguis se ven mucho mejor; solo cuida que al iniciar los giros no adelantes el pie delantero. Mantén ese pie fijo hasta girar con todo el cuerpo.",
      "Aumenta la velocidad y explosividad del primer movimiento.",
      "Aumenta la velocidad y explosividad en las ejecuciones de Santul Makki para marcar mejor los movimientos."
    ]]
  ];

  const FINAL_NOTES = [
    "Toma en cuenta que si algún ejercicio sientes que no aguantas, escucha a tu cuerpo y solo haz lo que puedas soportar, pero siempre dándole toda la prioridad a exigirnos sin perder la técnica o la continuidad. Algunos dolores son necesarios, pero jamás debe arder cuando estiramos o sentirse como desgarre; esto siempre debe ser cómodo, pero a su vez exigente.",
    "Enfócate en los detalles finos de preparación y ejecución. No olvides que debes estar consciente de los movimientos y no hacerlos de forma automática en este momento, ya que estamos en etapa de desarrollo de nuevos hábitos para que después se conviertan en movimientos automáticos, pero de forma correcta.",
    "Usa las herramientas que te dejo en este plan; te ayudarán mucho.",
    "Feliz entrenamiento y a seguirle dando como se debe."
  ];

  const POOMSAE = [
    {
      titulo: "Pyonwong - lado derecho / trabajo relacionado",
      dia: "LUNES",
      enfoque: "Trabajar regresos, torso abierto, codazo de aterrizaje y defensa baja circular con más velocidad.",
      reps: "20 min / 1 serie",
      tipo: "video",
      url: "https://drive.google.com/file/d/11yG6jV6089txqoVUlNdAvo3xjQ-L5xvG/view?usp=drive_link"
    },
    {
      titulo: "Pyonwong - lado izquierdo / trabajo relacionado",
      dia: "MIÉRCOLES",
      enfoque: "Trabajar control del torso, abdomen, recobro de Yop Chagi y preparación directa de posición de Keumgang.",
      reps: "20 min / 1 serie",
      tipo: "video",
      url: "https://drive.google.com/file/d/11yG6jV6089txqoVUlNdAvo3xjQ-L5xvG/view?usp=drive_link"
    },
    {
      titulo: "Keumgang - Santul Makki / trabajo relacionado",
      dia: "MARTES",
      enfoque: "Trabajar Santul Makki con más velocidad, explosividad, giro completo del cuerpo y cuello estable.",
      reps: "20 min / 1 serie",
      tipo: "info"
    },
    {
      titulo: "Keumgang - Santul Makki / trabajo relacionado",
      dia: "JUEVES",
      enfoque: "Reforzar Chuchum Sogui, no adelantar el pie delantero en los giros y marcar con más potencia.",
      reps: "20 min / 1 serie",
      tipo: "info"
    },
    {
      titulo: "Koryo L3 - Lado derecho",
      dia: "VIERNES",
      enfoque: "Trabajar Yop Chagui, alineación del torso, regreso controlado y estabilidad al aterrizar.",
      reps: "20 min / 1 serie",
      tipo: "video",
      url: "https://drive.google.com/open?id=116eSAk3WUKVvXneFxAAyuyrG0mu7pwIi&usp=drive_copy"
    },
    {
      titulo: "Koryo L3 - Lado izquierdo",
      dia: "SÁBADO",
      enfoque: "Trabajar Yop Chagui, control de eje, cadera, torso y dirección de la patada.",
      reps: "20 min / 1 serie",
      tipo: "video",
      url: "https://drive.google.com/open?id=1d39Oz_ASS6Yb-BIUclGe9QrT-WP9BgwS&usp=drive_copy"
    }
  ];

  function renderGrouped(groups){
    return groups.map(([title, items]) => `
      <div class="teacherNoteGroup">
        <h4>${html(title)}</h4>
        <ul>${items.map(x => `<li>${html(x)}</li>`).join("")}</ul>
      </div>`).join("");
  }

  function badge(item){
    if(item.tipo === "video") return `<span class="badge ok">VIDEO</span>`;
    return `<span class="badge">INFO</span>`;
  }

  function renderPoomsae(){
    return `<div class="cardsGrid">${POOMSAE.map((item, index) => `
      <article class="itemRow">
        <div class="itemTop">
          <div>
            <p class="itemTitle">${html(item.titulo)}</p>
            <div class="meta daysMeta"><b>Días:</b> ${html(item.dia)}</div>
            <div class="meta"><b>Enfoque:</b> ${html(item.enfoque)}</div>
            <div class="meta"><b>Reps:</b> ${html(item.reps)}</div>
          </div>
          <div class="badgeRow"><span class="badge">${index + 1}</span>${badge(item)}<span class="badge red">Poomsae</span></div>
        </div>
        ${item.url ? `<div class="actions"><a class="action primary" href="${html(item.url)}" target="_blank" rel="noreferrer">▶ Reproducir</a></div>` : ""}
      </article>`).join("")}</div>`;
  }

  function apply(){
    if(current() !== TARGET) return;

    const extras = document.getElementById("extras");
    if(extras){
      const title = extras.querySelector("h3");
      const eyebrow = extras.querySelector(".eyebrow");
      const body = extras.querySelector(".sectionBody");
      if(title) title.textContent = "Indicaciones del profesor";
      if(eyebrow) eyebrow.textContent = "Mensaje técnico";
      if(body && body.dataset.rafaFinal !== "1"){
        body.dataset.rafaFinal = "1";
        body.innerHTML = `<div class="systemNotice teacherNotesNotice"><strong>Indicaciones del profesor:</strong> Lee estos puntos antes de entrenar y úsalos como guía técnica durante tu sesión.</div>${renderGrouped(GROUP_NOTES)}${renderGrouped(SPECIFIC_NOTES)}`;
      }
    }

    const poomsae = document.getElementById("poomsae");
    if(poomsae){
      const title = poomsae.querySelector("h3");
      const eyebrow = poomsae.querySelector(".eyebrow");
      const body = poomsae.querySelector(".sectionBody");
      if(title) title.textContent = "Poomsae";
      if(eyebrow) eyebrow.textContent = "Pyonwong / Keumgang / Koryo";
      if(body && body.dataset.rafaFinal !== "1"){
        body.dataset.rafaFinal = "1";
        body.innerHTML = renderPoomsae();
      }
    }

    const notas = document.getElementById("notas");
    if(notas){
      const title = notas.querySelector("h3");
      const eyebrow = notas.querySelector(".eyebrow");
      const body = notas.querySelector(".sectionBody");
      if(title) title.textContent = "Notas finales";
      if(eyebrow) eyebrow.textContent = "Mensaje del Profesor Chanona";
      if(body && body.dataset.rafaFinal !== "1"){
        body.dataset.rafaFinal = "1";
        body.innerHTML = `<ul>${FINAL_NOTES.map(x => `<li>${html(x)}</li>`).join("")}</ul>`;
      }
    }
  }

  function injectStyle(){
    if(document.getElementById("rafaFinalStyle")) return;
    const style = document.createElement("style");
    style.id = "rafaFinalStyle";
    style.textContent = `
      .teacherNoteGroup{margin:14px 0 0;padding:14px;border:1px solid rgba(255,255,255,.08);border-radius:16px;background:rgba(255,255,255,.035);}
      .teacherNoteGroup h4{margin:0 0 10px;font-size:1rem;color:var(--text);}
      .teacherNoteGroup ul{margin:0;padding-left:20px;display:grid;gap:8px;color:var(--text);line-height:1.55;}
      body.light .teacherNoteGroup{background:rgba(10,10,10,.035);border-color:rgba(10,10,10,.08);}
    `;
    document.head.appendChild(style);
  }

  function run(){ injectStyle(); apply(); }
  const content = document.getElementById("content");
  if(content){
    let queued = false;
    new MutationObserver(() => {
      if(queued) return;
      queued = true;
      setTimeout(() => { queued = false; run(); }, 120);
    }).observe(content, { childList:true, subtree:true });
  }
  setTimeout(run, 300);
  setTimeout(run, 900);
  setTimeout(run, 1600);
})();