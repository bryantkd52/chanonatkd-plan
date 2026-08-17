(function(){
  const TARGETS = new Set([
    "karen_sanchez",
    "rodrigo_gonzalez",
    "leonardo_gonzalez",
    "omar_azi",
    "rafa_hernandez",
    "scarlet_arianna",
    "scarlett_arianna",
    "anna_georgia",
    "patricio_leigh"
  ]);

  const CYCLE = "Lunes 17 al sábado 29 de agosto del 2026";
  const UPDATED = "Actualizado lunes 17 de agosto de 2026";
  const PATEO_DAYS = "Yop Chagui: LUNES - MIÉRCOLES - VIERNES / Ap Chagui: MARTES - JUEVES - SÁBADO / Banda elástica: MARTES - JUEVES";
  const SUMMARY_ES = "ChanonaFlex: según los días marcados en tu plan. Isométrico activo: según los días marcados en tu plan. Yop Chagui: lunes, miércoles y viernes. Ap Chagui: martes, jueves y sábado. Banda elástica: martes y jueves. Poomsae: según los días marcados en tu sección de Poomsae.";
  const SUMMARY_EN = "ChanonaFlex: follow the days marked in your plan. Active isometrics: follow the days marked in your plan. Yop Chagui: Monday, Wednesday and Friday. Ap Chagui: Tuesday, Thursday and Saturday. Elastic band work: Tuesday and Thursday. Poomsae: follow the days marked in your Poomsae section.";

  const PATEO_ES = [
    {
      titulo: "Ejercicio 17 - Yop Chagui",
      dia: "LUNES - MIÉRCOLES - VIERNES",
      enfoque: "Trabajar cámara, control de cadera, alineación y salida técnica de Yop Chagui.",
      reps: "12 reps / 2 series",
      tipo: "video",
      url: "https://drive.google.com/open?id=1pQf3ikpRZ_PsmVgj-ePf1twsz_htDIqq&usp=drive_copy"
    },
    {
      titulo: "Ejercicio 18 - Yop Chagui",
      dia: "LUNES - MIÉRCOLES - VIERNES",
      enfoque: "Reforzar extensión, regreso y estabilidad de Yop Chagui sin perder postura.",
      reps: "12 reps / 2 series",
      tipo: "video",
      url: "https://drive.google.com/open?id=1scoy1p0QcxGDWuPXCcBkZjUguA8X7jNL&usp=drive_copy"
    },
    {
      titulo: "Propuesta + Ap Chagui reps",
      dia: "MARTES - JUEVES - SÁBADO",
      enfoque: "Mejorar preparación, empuje, cámara y repetición técnica de Ap Chagui.",
      reps: "12 reps / 2 series",
      tipo: "video",
      url: "https://drive.google.com/open?id=1dmkR7vXtDA1P19Ymc8cgoIUFqoUVsdO4&usp=drive_copy"
    },
    {
      titulo: "Ap Chagui + Propuesta stand",
      dia: "MARTES - JUEVES - SÁBADO",
      enfoque: "Trabajar Ap Chagui con control de apoyo, regreso de pierna y postura firme.",
      reps: "12 reps / 2 series",
      tipo: "video",
      url: "https://drive.google.com/open?id=1xDDf3xWV9jLSS2buYRk0ocGBw8eRKigi&usp=drive_copy"
    },
    {
      titulo: "Circuito Hold con banda L2 Koryo",
      dia: "MARTES - JUEVES",
      enfoque: "Usar la banda para mejorar control, fuerza y estabilidad durante el trabajo de pateo.",
      reps: "12 reps / 2 series",
      tipo: "video",
      url: "https://drive.google.com/open?id=1YiNFRyFkZFZH4Pk3eHe8cOZZorTd6rzK&usp=drive_copy"
    },
    {
      titulo: "Torción de cadera con banda elástica",
      dia: "MARTES - JUEVES",
      enfoque: "Fortalecer cadera, dirección y control usando resistencia con banda elástica.",
      reps: "12 reps / 2 series",
      tipo: "video",
      url: "https://drive.google.com/open?id=1-mLzWj3XiEzCeul7LaIWuPzP39qQ6VtQ&usp=drive_copy"
    }
  ];

  const PATEO_EN = PATEO_ES.map(item => ({
    ...item,
    dia: item.dia
      .replace("LUNES", "MONDAY")
      .replace("MIÉRCOLES", "WEDNESDAY")
      .replace("VIERNES", "FRIDAY")
      .replace("MARTES", "TUESDAY")
      .replace("JUEVES", "THURSDAY")
      .replace("SÁBADO", "SATURDAY"),
    enfoque: item.titulo.includes("Yop")
      ? "Work on chamber, hip control, alignment and technical Yop Chagui execution."
      : item.titulo.toLowerCase().includes("ap")
        ? "Work on preparation, chamber, support leg control and clean Ap Chagui repetitions."
        : "Use the elastic band to improve control, strength and stability for kicking work."
  }));

  const LINKS = {
    t7l1: "https://drive.google.com/open?id=1NHT15JC3I8cVizjUnPwy0lz2zqmjiV5L&usp=drive_copy",
    t7l3: "https://drive.google.com/open?id=1LTLrOg0_YWWBZGeJMaH_x5PZUeQCPgMk&usp=drive_copy",
    keumgangL3: "https://drive.google.com/open?id=1qIR-Y7aZQolSGThfIknVjy1WNYZy7JQq&usp=drive_copy",
    jakdari: "https://drive.google.com/open?id=1z0tEpdciDc-QqCm2AqdcJ8Q-wZrUhZ3Z&usp=drive_copy",
    taebaekL3: "https://drive.google.com/open?id=12_cJJxiyocWcsDvaBqYgdiIJsTIXdfmD&usp=drive_copy"
  };

  const KEUMGANG_GROUP = new Set([
    "karen_sanchez",
    "leonardo_gonzalez",
    "omar_azi",
    "scarlet_arianna",
    "scarlett_arianna"
  ]);
  const TAEBAEK_GROUP = new Set([
    "rafa_hernandez",
    "anna_georgia",
    "patricio_leigh"
  ]);

  function current(){ return new URL(location.href).searchParams.get("alumno") || ""; }
  function isTarget(){ return TARGETS.has(current()); }
  function isEnglish(){ return current() === "anna_georgia"; }
  function h(value){
    const div = document.createElement("div");
    div.textContent = String(value ?? "");
    return div.innerHTML;
  }

  function poomsaeFor(id){
    const en = id === "anna_georgia";
    const t7l1 = en ? "Taeguk 7 - Line 1" : "Taeguk 7 - Línea 1";
    const t7l3 = en ? "Taeguk 7 - Line 3" : "Taeguk 7 - Línea 3";
    const k3 = en ? "Keumgang - Line 3" : "Keumgang - Línea 3";
    const tb3 = en ? "Taebaek - Line 3" : "Taebaek - Línea 3";
    const jak = "Keumgang Jakdari Sogui";
    const base = [
      {
        titulo: t7l1,
        dia: en ? "MONDAY - WEDNESDAY" : "LUNES - MIÉRCOLES",
        enfoque: en ? "Work line 1 with socks, clean timing and stable transitions." : "Trabajar línea 1 con calcetas, timing limpio y transiciones estables.",
        reps: en ? "20 min per line / with socks" : "20 min por línea / con calcetas",
        tipo: "audio",
        url: LINKS.t7l1
      },
      {
        titulo: t7l3,
        dia: en ? "MONDAY - WEDNESDAY" : "LUNES - MIÉRCOLES",
        enfoque: en ? "Work line 3 with socks, direction, balance and exact preparation." : "Trabajar línea 3 con calcetas, dirección, equilibrio y preparación exacta.",
        reps: en ? "20 min per line / with socks" : "20 min por línea / con calcetas",
        tipo: "audio",
        url: LINKS.t7l3
      }
    ];

    if(KEUMGANG_GROUP.has(id)){
      base.push(
        {
          titulo: k3,
          dia: en ? "TUESDAY - THURSDAY" : "MARTES - JUEVES",
          enfoque: en ? "Work line 3 with socks, clear rhythm and stronger lower-body control." : "Trabajar línea 3 con calcetas, ritmo claro y mayor control desde la base.",
          reps: en ? "20 min per line / with socks" : "20 min por línea / con calcetas",
          tipo: "audio",
          url: LINKS.keumgangL3
        },
        {
          titulo: jak,
          dia: en ? "WEDNESDAY - SATURDAY" : "MIÉRCOLES - SÁBADO",
          enfoque: en ? "Work Jakdari Sogui with socks, hip control and body alignment." : "Trabajar Jakdari Sogui con calcetas, control de cadera y alineación del cuerpo.",
          reps: en ? "15 min per line / 2 series / with socks" : "15 min por línea / 2 series / con calcetas",
          tipo: "video",
          url: LINKS.jakdari
        }
      );
    }

    if(TAEBAEK_GROUP.has(id)){
      base.push({
        titulo: tb3,
        dia: en ? "TUESDAY - THURSDAY" : "MARTES - JUEVES",
        enfoque: en ? "Work line 3 with clean rhythm, strong stances and precise preparation." : "Trabajar línea 3 con ritmo limpio, posiciones fuertes y preparación precisa.",
        reps: en ? "15 min per line / 2 series" : "15 min por línea / 2 series",
        tipo: "audio",
        url: LINKS.taebaekL3
      });
    }

    return base;
  }

  function card(item, index, badge){
    const typeBadge = item.tipo === "audio" ? "AUDIO" : "VIDEO";
    const action = item.tipo === "audio" ? "🎧 Abrir audio" : "▶ Reproducir";
    return `
      <article class="itemRow">
        <div class="itemTop">
          <div>
            <p class="itemTitle">${h(item.titulo)}</p>
            <div class="meta daysMeta"><b>Días:</b> ${h(item.dia)}</div>
            <div class="meta"><b>Enfoque:</b> ${h(item.enfoque)}</div>
            <div class="meta"><b>Reps:</b> ${h(item.reps)}</div>
          </div>
          <div class="badgeRow"><span class="badge">${index}</span><span class="badge ok">${typeBadge}</span><span class="badge red">${h(badge)}</span></div>
        </div>
        <div class="actions"><a class="action primary" href="${h(item.url)}" target="_blank" rel="noreferrer">${action}</a></div>
      </article>`;
  }

  function updateHero(){
    const sub = document.getElementById("planSub");
    if(sub){
      const text = sub.textContent || "";
      sub.textContent = text.includes("• Para:")
        ? text.replace(/Ciclo:\s*.*?\s*•\s*Para:/, `Ciclo: ${CYCLE} • Para:`)
        : `Ciclo: ${CYCLE}`;
    }
    const updated = document.getElementById("chipUpdated");
    if(updated) updated.textContent = `🕒 ${UPDATED}`;
  }

  function updateResumen(){
    const section = document.getElementById("resumen");
    if(!section) return;
    const body = section.querySelector(".sectionBody");
    if(!body) return;
    const en = isEnglish();
    const p = body.querySelector("p");
    if(p) p.textContent = en ? SUMMARY_EN : SUMMARY_ES;
    const rows = [...body.querySelectorAll("li")];
    rows.forEach(li => {
      const text = (li.textContent || "").toLowerCase();
      if(text.includes("pateo técnico") || text.includes("kick") || text.includes("pateo")){
        li.innerHTML = `<b>${en ? "Kicking work" : "Pateo técnico"}:</b> ${h(en ? "Yop Chagui: Monday - Wednesday - Friday / Ap Chagui: Tuesday - Thursday - Saturday / Elastic band: Tuesday - Thursday" : PATEO_DAYS)}`;
      }
      if(text.includes("poomsae")){
        li.innerHTML = `<b>Poomsae:</b> ${h(en ? "Follow the days marked in the Poomsae section" : "Según los días marcados en la sección de Poomsae")}`;
      }
    });
  }

  function updatePateo(){
    const section = document.getElementById("pateo");
    if(!section) return;
    const en = isEnglish();
    const eyebrow = section.querySelector(".eyebrow");
    const title = section.querySelector("h3");
    const body = section.querySelector(".sectionBody");
    if(title) title.textContent = en ? "Kicking work" : "Pateo técnico";
    if(eyebrow) eyebrow.textContent = en ? "Yop Chagui / Ap Chagui / Elastic band" : "Yop Chagui / Ap Chagui / Banda elástica";
    if(!body) return;
    const items = en ? PATEO_EN : PATEO_ES;
    body.innerHTML = `<div class="cardsGrid">${items.map((item, i) => card(item, i + 1, en ? "Kicking" : "Pateo")).join("")}</div>`;
  }

  function updatePoomsae(){
    const id = current();
    const items = poomsaeFor(id);
    if(!items.length) return;
    const section = document.getElementById("poomsae");
    if(!section) return;
    const en = isEnglish();
    const title = section.querySelector("h3");
    const eyebrow = section.querySelector(".eyebrow");
    const body = section.querySelector(".sectionBody");
    if(title) title.textContent = "Poomsae";
    if(eyebrow){
      if(KEUMGANG_GROUP.has(id)) eyebrow.textContent = en ? "Taeguk 7 / Keumgang" : "Taeguk 7 / Keumgang";
      else eyebrow.textContent = en ? "Taeguk 7 / Taebaek" : "Taeguk 7 / Taebaek";
    }
    if(!body) return;
    body.innerHTML = `<div class="cardsGrid">${items.map((item, i) => card(item, i + 1, "Poomsae")).join("")}</div>`;
  }

  function apply(){
    if(!isTarget()) return;
    updateHero();
    updateResumen();
    updatePateo();
    updatePoomsae();
  }

  const previousRenderPage = typeof renderPage === "function" ? renderPage : null;
  if(previousRenderPage){
    renderPage = function(plan, alumno){
      if(isTarget() && plan){
        plan.ciclo = CYCLE;
        plan.updated_at = UPDATED;
        plan.enfoque = isEnglish() ? SUMMARY_EN : SUMMARY_ES;
        plan.pateoDias = isEnglish()
          ? "Yop Chagui: MONDAY - WEDNESDAY - FRIDAY / Ap Chagui: TUESDAY - THURSDAY - SATURDAY / Elastic band: TUESDAY - THURSDAY"
          : PATEO_DAYS;
        plan.poomsaeDias = isEnglish()
          ? "Follow the days marked in the Poomsae section"
          : "Según los días marcados en la sección de Poomsae";
      }
      previousRenderPage(plan, alumno);
      setTimeout(apply, 0);
      setTimeout(apply, 400);
      setTimeout(apply, 1200);
      setTimeout(apply, 2200);
    };
  }

  setTimeout(apply, 500);
  setTimeout(apply, 1500);
  setTimeout(apply, 2600);
  setTimeout(apply, 4000);
})();
