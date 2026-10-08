(function(){
  const SYSTEM_ID = "chanonatkd_system";
  const VERSION = "system-classes-v26-nolag-20260930";
  const LATEST_SESSION = 26;

  const SESSIONS = [
    { numero:1, titulo:"Primera sesión - Sábado 1 de abril 2026", enfoque:"Flexibilidad + Isométrico activo", reps:"1 serie", tipo:"video", url:"https://drive.google.com/open?id=1vOfIaIZoli63oh8HoVaKsqYjBVy0449A&usp=drive_copy" },
    { numero:2, titulo:"Segunda sesión - Sábado 11 de abril 2026", enfoque:"Flexibilidad + Isométrico activo", reps:"1 serie", tipo:"video", url:"https://drive.google.com/open?id=18hVQbuObLo0aaXcScuJX2jwHBmm4-QC3&usp=drive_copy" },
    { numero:3, titulo:"Tercera sesión - Sábado 18 de abril 2026", enfoque:"Flexibilidad", reps:"1 serie", tipo:"video", url:"https://drive.google.com/open?id=1C1BmLCXFONjyPI_zECb83ARagwu4fuWx&usp=drive_copy" },
    { numero:4, titulo:"Cuarta sesión - Sábado 25 de abril 2026", enfoque:"Flexibilidad + isométrico + pateo frontal", reps:"1 serie", tipo:"video", url:"https://drive.google.com/open?id=1-YJlW2I-Xo1oIsCl8pcXMRsCbD6_cULC&usp=drive_copy" },
    { numero:5, titulo:"Quinta sesión - Sábado 2 de mayo 2026", enfoque:"Flexibilidad + isométrico + pateo frontal", reps:"1 serie", tipo:"video", url:"https://drive.google.com/open?id=1y9Ci-8FLMFacLKNzvMqbVXKhVlW-6xhL&usp=drive_copy" },
    { numero:6, titulo:"Sexta sesión - Sábado 9 de mayo 2026", enfoque:"Flexibilidad + movilidad + pateo circular", reps:"1 serie", tipo:"video", url:"https://drive.google.com/open?id=10Qz4PJQXgbViLA9XiGOAMAM0P3Wim8KK&usp=drive_copy" },
    { numero:7, titulo:"Séptima sesión - Sábado 16 de mayo 2026", enfoque:"Flexibilidad + movilidad + pateo de lado", reps:"1 serie", tipo:"video", url:"https://drive.google.com/file/d/1GArZcBDcHjb1BbVfZMjLoFx3r5V6Mgei/view?usp=drivesdk" },
    { numero:8, titulo:"Octava sesión - Sábado 23 de mayo 2026", enfoque:"Introducción y control técnico de Ap y Yop Chagui", reps:"1 serie", tipo:"video", url:"https://drive.google.com/file/d/1WWjfSYqqFpyrRf7sfy1-vGlhu4kY1tbv/view?usp=sharing" },
    { numero:9, titulo:"Novena sesión - Sábado 30 de mayo 2026", enfoque:"Flexibilidad intermedia + técnica de pateo + alineación de espalda", reps:"1 serie", tipo:"video", url:"https://drive.google.com/file/d/1ZbNrqfhmHSCEh1C0GXAWtYd9WA2qcOOb/view?usp=sharing" },
    { numero:10, titulo:"Décima sesión - Glúteo, flex y técnico", enfoque:"Trabajo de glúteo, flexibilidad y técnica aplicada a diferentes pateos", reps:"1 clase completa", tipo:"video", url:"https://drive.google.com/open?id=1V0euQEZEl8cnfIbbUCGXUb_dzHgEQVqG&usp=drive_copy" },
    { numero:11, titulo:"Onceava sesión - Trinidad pateo", enfoque:"Clase de pateo técnico, control y aplicación progresiva de los esfuerzos", reps:"1 clase completa", tipo:"video", url:"https://drive.google.com/open?id=1GSiQhqfXKssSHQx77dN9Svs7vFhTNroa&usp=drive_copy" },
    { numero:12, titulo:"12va sesión - ChanonaTKD System", enfoque:"Clase acumulada del sistema. Continuar trabajando con base en la técnica vista durante la sesión.", reps:"1 clase completa", tipo:"video", url:"https://drive.google.com/file/d/1Fv9nYS4_4ik-d5Q2Ze6AO8u1qKfST-OC/view?usp=drive_link" },
    { numero:13, titulo:"13va sesión - ChanonaTKD System", enfoque:"Clase acumulada del sistema. Continuar trabajando con base en la técnica vista durante la sesión.", reps:"1 clase completa", tipo:"video", url:"https://drive.google.com/file/d/1OtTSPo2XfByvrgmcYjzHskkE0vGbkKC2/view?usp=drive_link" },
    { numero:14, titulo:"14va sesión - ChanonaTKD System", enfoque:"Clase acumulada del sistema. Continuar trabajando con base en la técnica vista durante la sesión.", reps:"1 clase completa", tipo:"video", url:"https://drive.google.com/file/d/1uLUeC9BU7gtkL2WC8fnSSVh2Ihb5HB8f/view?usp=drive_link" },
    { numero:15, titulo:"15va sesión - ChanonaTKD System", enfoque:"Clase acumulada del sistema. Continuar trabajando con base en la técnica vista durante la sesión.", reps:"1 clase completa", tipo:"video", url:"https://drive.google.com/file/d/1kK8Fh9K0S-0AWCC-SK5nFuBrcRuVIfP6/view?usp=drive_link" },
    { numero:16, titulo:"16va sesión - ChanonaTKD System", enfoque:"Clase acumulada del sistema. Continuar trabajando con base en la técnica vista durante la sesión.", reps:"1 clase completa", tipo:"video", url:"https://drive.google.com/file/d/1LauZUh_s79qjoMzFxfJQczSpPArrwD9Q/view?usp=drive_link" },
    { numero:17, titulo:"Sesión 17 - Koryo transición - ChanonaTKD System", enfoque:"Koryo transición.", reps:"1 clase completa", tipo:"video", url:"https://drive.google.com/file/d/1inUGzsmycAMX7hcoszw3sOWJ0ZatLWq9/view?usp=drive_link" },
    { numero:18, titulo:"Sesión 18 - Sonnal de Koryo y su trayectoria", enfoque:"Sonnal de Koryo y su trayectoria.", reps:"1 clase completa", tipo:"video", url:"https://drive.google.com/file/d/1IMVKsqFdebdkJnAOh71Ht5MAUcW_5KkQ/view?usp=drive_link" },
    { numero:19, titulo:"Sesión 19 - Fuerza y movilidad isométrica", enfoque:"Fuerza y movilidad isométrica.", reps:"1 clase completa", tipo:"video", url:"https://drive.google.com/open?id=1NSCuFYlIfeF170u_DYJutjSsb4S7J14_&usp=drive_copy" },
    { numero:20, titulo:"Sesión 20 - L2 Koryo Piernas", enfoque:"Trabajo técnico de piernas en Koryo línea 2.", reps:"1 clase completa", tipo:"video", url:"https://drive.google.com/open?id=16Og476GDRlL64r1z7phbCT7WOq6SEcup&usp=drive_copy" },
    { numero:21, titulo:"Sesión 21 - pateo alto, técnica y flexibilidad", enfoque:"Pateo alto, técnica y flexibilidad.", reps:"1 clase completa", tipo:"video", url:"https://drive.google.com/open?id=1MJkUItAAQWQ1W9lrZWEVxSz1MPOIE69Z&usp=drive_copy" },
    { numero:22, titulo:"Sesión 22 - Preguntas clave y pateo alto de Ap Chagui", enfoque:"Preguntas clave y trabajo de pateo alto de Ap Chagui.", reps:"1 clase completa", tipo:"video", url:"https://drive.google.com/open?id=1N_Vq03hQhRTPHfZeAwcUPrEfvhMrpZ4f&usp=drive_copy" },
    { numero:23, titulo:"Sesión 23 - Secuencia de pateo intermedio", enfoque:"Secuencia de pateo intermedio.", reps:"1 clase completa", tipo:"video", url:"https://drive.google.com/file/d/1HuqIaEQm1UHAyINRUOkE3R82S8EFOD2Z/view?usp=drive_link" },
    { numero:24, titulo:"Sesión 24 - Combinación flex y pateo técnico", enfoque:"Combinación de flexibilidad y pateo técnico.", reps:"1 clase completa", tipo:"video", url:"https://drive.google.com/file/d/1ud1D30OWGg9TQjohoq_3oc4zmdjimg3z/view?usp=drive_link" },
    { numero:25, titulo:"Sesión 25 - Flex activa exigente y Koryo L2", enfoque:"Flexibilidad activa exigente y trabajo de Koryo línea 2.", reps:"1 clase completa", tipo:"video", url:"https://drive.google.com/open?id=1o4RWXmwEbVX9Fy9jAerZyS5b9x6iN4g8&usp=drive_copy" },
    { numero:26, titulo:"Sesión 26 - Fuerza, golpes y defensas", enfoque:"Fuerza, golpes y defensas.", reps:"1 clase completa", tipo:"video", url:"https://drive.google.com/open?id=1iCeSlnW2BYzTMPNMjC5b9EtPk4OD4CUK&usp=drive_copy" }
  ].map(session => ({ ...session, dia:"Clase grabada" }));

  // Append new recordings to the matching library; never remove historical sessions.
  window.systemClassLibraries = {
    poomsae: [],
    pateo: [],
    flexibilidad: [],
    sesiones: SESSIONS
  };
})();
