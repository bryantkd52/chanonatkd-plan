function getAlumnoFromURL(){
  const params = new URLSearchParams(window.location.search);
  return params.get("alumno");
}

async function loadAlumno(){
  const alumnoId = getAlumnoFromURL();

  if(!alumnoId){
    document.body.innerHTML = "<h2 style='color:red;padding:20px;'>No se especificó alumno en la URL</h2>";
    return;
  }

  const alumnosRes = await fetch("../data/alumnos.json");
  const alumnos = await alumnosRes.json();

  const alumno = alumnos[alumnoId];

  if(!alumno){
    document.body.innerHTML = "<h2 style='color:red;padding:20px;'>Alumno no encontrado</h2>";
    return;
  }

  const planRes = await fetch("../data/planes/" + alumno.plan);
  const plan = await planRes.json();

  document.body.innerHTML = `
    <div style="padding:20px; background:black; color:white;">
      <h1 style="color:red;">ChanonaTKD • Plan</h1>
      <h2>Para: ${alumno.nombre}</h2>
      <p><strong>Nivel:</strong> ${plan.nivel}</p>
      <p><strong>Ciclo:</strong> ${plan.ciclo}</p>
      <p><strong>Enfoque:</strong> ${plan.enfoque_corto}</p>
      <p>${plan.mensaje}</p>
    </div>
  `;
}

loadAlumno();
