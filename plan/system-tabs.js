(function(){
  let activeTabKey = "principiantes";
  let poomsaeLibraryState = {
    poomsae: "Taeguk 1",
    linea: "1",
    searched: false
  };

  const SPECIAL_POOMSAE = "Ejercicios especiales";
  const POOMSAE_LINE_COUNTS = [
    { nombre:"Taeguk 1", lineas:6 },
    { nombre:"Taeguk 2", lineas:6 },
    { nombre:"Taeguk 3", lineas:6 },
    { nombre:"Taeguk 4", lineas:6 },
    { nombre:"Taeguk 5", lineas:6 },
    { nombre:"Taeguk 6", lineas:6 },
    { nombre:"Taeguk 7", lineas:6 },
    { nombre:"Taeguk 8", lineas:6 },
    { nombre:"Koryo", lineas:4 },
    { nombre:"Keumgang", lineas:9 },
    { nombre:"Taebaek", lineas:5 },
    { nombre:"Pyonwong", lineas:4 },
    { nombre:"Sipjin", lineas:4 },
    { nombre:SPECIAL_POOMSAE, lineas:1, especial:true }
  ];

  function media(titulo, url, tipo){
    return {
      titulo,
      url,
      tipo: tipo || "video",
      dia: "Según indicación de Bryan",
      enfoque: "Recurso existente del banco ChanonaTKD para trabajar esta parte de la poomsae.",
      reps: "Según indicación del profesor"
    };
  }

  function pendingItem(poomsae, linea){
    return {
      titulo: `${poomsae} - Línea ${linea}: pendiente`,
      tipo: "info",
      dia: "Según indicación de Bryan",
      enfoque: "Todavía no hay recurso específico confirmado en el banco visible de la plataforma para esta línea.",
      reps: "pendiente"
    };
  }

  function key(poomsae, linea){ return `${poomsae}|${linea}`; }
  function isSpecialPoomsae(name){ return name === SPECIAL_POOMSAE; }

  const FULL_POOMSAE = {
    "Taeguk 1": [
      media("Taeguk 1 completo", "https://drive.google.com/open?id=1Osjpm45GDBwaZL2ZNTrh6rM9obakMTG3&usp=drive_copy"),
      media("Taeguk 1 - Espejo paso a paso", "https://drive.google.com/open?id=1AP1did1HVwyMQy8byxTCLx9fy32IHhWM&usp=drive_copy"),
      media("Taeguk 1 - Paso a paso EN CASA", "https://drive.google.com/open?id=1Rfbt75rRnzo1g-C4NRTjAO3nMRLzbewQ&usp=drive_copy")
    ],
    "Taeguk 2": [media("Taeguk 2 completo", "https://drive.google.com/open?id=153in4ZZtofBlf44rwqhrtyyIwBUrU9_8&usp=drive_copy")],
    "Taeguk 3": [media("Taeguk 3 completo", "https://drive.google.com/open?id=1bquwnq6Y9_hq12xGclMuhlcyEqwbqCrl&usp=drive_copy")],
    "Taeguk 4": [media("Taeguk 4 - Completo", "https://drive.google.com/open?id=1tzLShWE2ftfxZSAvvzyn7oGTstvXrM13&usp=drive_copy")],
    "Pyonwong": [media("Pyonwong completo", "https://drive.google.com/open?id=1dxU_-ztAr7vYc8v6HHZBEhv1PMmhphT7&usp=drive_copy")]
  };

  const LINE_RESOURCES = {
    [key("Taeguk 4","1")]: [
      media("Inicio con twit kubi (solo posición)", "https://drive.google.com/open?id=1A70nM_-pgKRvJenFyse3ZnpLPVlxNZEz&usp=drive_copy"),
      media("Transicion manos y pies L1 T4", "https://drive.google.com/open?id=1NglZlc_b57Vsi9geRsDXEeSg97bJGQJB&usp=drive_copy"),
      media("Transicion con manos L1 a 2 T4", "https://drive.google.com/open?id=1bP3KfXTMvpF2Lv7cGMw1HZdd5WweKS1_&usp=drive_copy"),
      media("Transicion pies L1 a la 2 t4", "https://drive.google.com/open?id=1suck_5kr_r1wYcW9w2aHpnQJv2huaFcQ&usp=drive_copy")
    ],
    [key("Taeguk 4","2")]: [
      media("Ap chagui, prep y aterrizaje correcto", "https://drive.google.com/open?id=1avHtkOVL1SY9c4sy4ugT5t260DCeu3Fz&usp=drive_copy"),
      media("Linea 2 yop chagui aterrizaje Taeguk 4", "https://drive.google.com/open?id=1Jxe0Bu3ibIaOBY_ykKTxE3afLtpfWuOs&usp=drive_copy"),
      media("Aterrizaje Yop a Twit kubi - L2 T4", "https://drive.google.com/open?id=1mAiAOeD6IW8-i2SvuMbncLdXdzmplpZM&usp=drive_copy"),
      media("L2 T4 mas lento yop chaguis", "https://drive.google.com/open?id=1iKsyFRARPRVJj0RUlStqXjYOgeLwUgJU&usp=drive_copy"),
      media("L2 yop chaguis T4", "https://drive.google.com/open?id=1itbAdFy1D_RFN0WTpbKzHaK1oQsD-c29&usp=drive_copy")
    ],
    [key("Taeguk 4","3")]: [
      media("Transicion L2 a 3 T4 - pies", "https://drive.google.com/open?id=1-Jlts5WH0nNHnSfaUom-9EOsJltoVjD2&usp=drive_copy"),
      media("Transicion L3 a L4 de T4 - taeguk 4", "https://drive.google.com/open?id=1jywGe4cJnLzTFwwpX_JlXR7GPUxlBSMk&usp=drive_copy")
    ],
    [key("Taeguk 4","4")]: [media("Ap + Backfist de T4 L4 - Taeguk 4", "https://drive.google.com/open?id=1BtdMNbAEA77j4-GIMxgreKYNDnbnYeiO&usp=drive_copy")],
    [key("Taeguk 5","1")]: [media("Transición doble montong makki - L1 a L2 T5", "https://drive.google.com/open?id=1nS4odRmRR7Da-q3oGTI1UOYhuqKpzCah&usp=drive_copy")],
    [key("Taeguk 5","2")]: [
      media("Correcto aterrizaje y prep golpe revés- L2 T5", "https://drive.google.com/open?id=1sYO2lMMZOuZF7-doTLcXFO7itTmlKVe1&usp=drive_copy"),
      media("Talones transicion - L2 T5", "https://drive.google.com/open?id=1Tg7zQiS4SxKsOMdAdaY17vNdnegdc1WA&usp=drive_copy"),
      media("Circuito aterrizaje + prep - T5 L2", "https://drive.google.com/open?id=1PVxwOGM_EDJm0SIrRumga-CUDv466-rj&usp=drive_copy")
    ],
    [key("Taeguk 5","3")]: [media("Sonnal y codazo + timing - T5 L3", "https://drive.google.com/open?id=1yFJM2dRU3-OJCETZq5i9iYkz72W2aOnT&usp=drive_copy")],
    [key("Taeguk 5","4")]: [media("Are + montong + Ap - T5 L4", "https://drive.google.com/open?id=1FwqSElEVd8CZ6QQNKTFSjow2yYjUgwxG&usp=drive_copy")],
    [key("Taeguk 5","5")]: [
      media("Olgul + Yop +Codazo - T5 L5", "https://drive.google.com/open?id=1k8rtRGCKO6yzMMRfFNw1709X3XHHmPHf&usp=drive_copy"),
      media("Yop Chagui - Taeguk 5 T5 - L5", "https://drive.google.com/file/d/1ML3DfsZnfUfFqbMbONSu70lKJNb8repM/view?usp=drive_link")
    ],
    [key("Taeguk 5","6")]: [
      media("Are + Ap + Golpe - T5 L6", "https://drive.google.com/open?id=1838t3kpNzYH2Bxq39v_3WWh03o5tepR2&usp=drive_copy"),
      media("Taeguk 5 - Ajuste rápido camara y puño costado", "https://drive.google.com/open?id=1nfTLw36IyVCyjyWJPwSy9tXpW1UkDSUZ&usp=drive_copy")
    ],
    [key("Taeguk 6","2")]: [
      media("Posicion de puños en Dollyo Chagui", "https://drive.google.com/file/d/13QnJgsbNRwVjdlohYwdONDby2xnos9mb/view?usp=drive_link"),
      media("Postura y alineacion en aterrizaje dollyo chagui", "https://drive.google.com/open?id=1gZZJC7ztdsIG5fmsO9WuJo3tscwCqFvL&usp=drive_copy")
    ],
    [key("Taeguk 6","3")]: [media("L2 a L3 de Taeguk 6 - T6", "https://drive.google.com/open?id=1qM7-pg_CPQ480Oqb3fKD-nb4noUaKEEy&usp=drive_copy")],
    [key("Taeguk 6","4")]: [
      media("5 seconds Taeguk 6 - T6 L4", "https://drive.google.com/open?id=1h2DAwawrW8Ed-91RtFZ9vrlUW38YEVQd&usp=drive_copy"),
      media("Posicion de puños en Dollyo Chagui", "https://drive.google.com/file/d/13QnJgsbNRwVjdlohYwdONDby2xnos9mb/view?usp=drive_link"),
      media("Postura y alineacion en aterrizaje dollyo chagui", "https://drive.google.com/open?id=1gZZJC7ztdsIG5fmsO9WuJo3tscwCqFvL&usp=drive_copy")
    ],
    [key("Taeguk 6","6")]: [
      media("Sonnal + golpe + ap y twit kubis - T6 L6", "https://drive.google.com/open?id=1IHopOX0RybZ4XY9mNx2qk8XkhK3N5gxk&usp=drive_copy"),
      media("Defensa a la cara Taeguk 6", "https://drive.google.com/open?id=1t7jfM7QOba7tFmJ6kfcXNYonl-pyJJrv&usp=drive_copy"),
      media("Twit Kubi hacia atras - Transiciones", "https://drive.google.com/open?id=1AP-k7qaZI9ibVi-Qo7wNijf1xWZuuwME&usp=drive_copy")
    ],
    [key("Taeguk 7","1")]: [
      media("Línea 1 Taeguk 7", "https://drive.google.com/open?id=1T-Z7RUtNLaBebIKtihzZbgumhMoUlNCG&usp=drive_copy"),
      media("Línea 1 Taeguk 7 - T7 L1", "https://drive.google.com/open?id=1H4mcONZfDmg2fP7UA-nSSgXdPsg42lJC&usp=drive_copy"),
      media("Segundo Mov Taeguk 7", "https://drive.google.com/open?id=1ngbhLhE2W8dw_yRsgcv79nSrVtLxPgzj&usp=drive_copy")
    ],
    [key("Taeguk 7","2")]: [
      media("Línea 2 Taeguk 7", "https://drive.google.com/open?id=1GRS7al4XuNufi7Xj_ZgsLqWQFyisjxDP&usp=drive_copy"),
      media("L2 Taeguk 7 - T7 L2", "https://drive.google.com/open?id=12F-yyH4XJl3A4FRt_3biwxE0th5Mtsq1&usp=drive_copy"),
      media("Transicion Twit Kubi a Twit Kubi fluido", "https://drive.google.com/open?id=15RLcPyVzY69tJM9SIrfyUI_KPlxR3XGD&usp=drive_copy")
    ],
    [key("Taeguk 7","3")]: [
      media("Linea 3 taeguk 7", "https://drive.google.com/open?id=1QbN5as1x7Lx0-sDSPJMtWyCg3Ac-4Pdk&usp=drive_copy"),
      media("L3 Taeguk 7 - T7 L3", "https://drive.google.com/open?id=1J8Nph6ySfCBldhOCVqTembIz0THwfxfk&usp=drive_copy"),
      media("Transicion L3 a 4 Taeguk 7", "https://drive.google.com/open?id=1tGc0eDrUrA4wkyZap38r-Zt8V-PK-E-H&usp=drive_copy")
    ],
    [key("Taeguk 7","4")]: [
      media("5 seconds Taeguk 7 - T7 L4", "https://drive.google.com/open?id=1PVZklLzHmjHo0gaU__deTEeF-VFjXdZ2&usp=drive_copy"),
      media("Kawi makki", "https://drive.google.com/open?id=1I4Re5fJg2XESqdKWWlZnHZSiwUc11AcE&usp=drive_copy"),
      media("Taeguk 7 transición línea 4 a la 5 en 2 pasos", "https://drive.google.com/open?id=1PU4ezpwqMCK8VIjn5FBelEKnNAw6jaX4&usp=drive_copy")
    ],
    [key("Taeguk 7","5")]: [
      media("Taeguk 7 línea 5 rodilla, inclinación y aterrizaje", "https://drive.google.com/open?id=13T-QruLrWivCxecAgtFUgCdjlVbhhOyb&usp=drive_copy"),
      media("Taeguk 7 línea 5 transición a ap kubi", "https://drive.google.com/open?id=142pnZhwh1Gdj7XIqaRAMCfpLqZBvHr0q&usp=drive_copy"),
      media("Doble puño costado linea 5 taeguk 7", "https://drive.google.com/open?id=1zZLxqAg99j9GVDhRTprssnQdvgaiHszT&usp=drive_copy"),
      media("Linea 5 taeguk 7", "https://drive.google.com/open?id=13WNzHHj7NHueKdgebU79zpNh8rNS56DA&usp=drive_copy"),
      media("Codazo mano taeguk 7", "https://drive.google.com/open?id=1v5Be8DBZ_nbdPyRaeywtNGO0_9098m3M&usp=drive_copy"),
      media("Ap chagui mano taeguk 7", "https://drive.google.com/open?id=1xuJ7A-iRPcnT_xPOU1YeTHHNR_iDYp9l&usp=drive_copy")
    ],
    [key("Taeguk 8","1")]: [
      media("Taeguk 8 - Primer movimiento", "https://drive.google.com/open?id=1DWX9g7vzlLsRQGNNi4RxxlA4Cz3_pHiJ&usp=drive_copy"),
      media("Doble golpe correcto", "https://drive.google.com/open?id=1axDKIpPxmqPNU04EnOXQapUo-XG0weld&usp=drive_copy"),
      media("Aterrizaje ap kubi + golpe medio", "https://drive.google.com/open?id=1FzfcOO8NcL63cVBvahDS2rthF14nDiQT&usp=drive_copy"),
      media("Transición Taeguk 8 - L1 a L2 T8", "https://drive.google.com/open?id=1PC4Rgs-4I6Bml1FTC-kl_bljImEfCow8&usp=drive_copy")
    ],
    [key("Taeguk 8","2")]: [
      media("Transicion hacia ap kubi L2 T8 - Taeguk 8", "https://drive.google.com/open?id=1jLw2HUDloOvSquTlVsgMwYOwJniQsLvW&usp=drive_copy"),
      media("Linea 2 Taeguk 8 - golpe lento", "https://drive.google.com/open?id=1C2DhJwh3G6jOEITK4_chQV5J4rdYxtde&usp=drive_copy"),
      media("Transicion a Ap Kubi + Golpe medio - T8", "https://drive.google.com/open?id=1eu5s_UIeGcIiWOGUHjUsm7q-dfxMbcwN&usp=drive_copy")
    ],
    [key("Taeguk 8","3")]: [media("L3 Taeguk 8 - T8 L3", "https://drive.google.com/open?id=1yNXOjP9b6Zgf7UC48anqyO0E5BcFQyXH&usp=drive_copy")],
    [key("Taeguk 8","4")]: [media("L4 Taeguk 8 - T8 L4", "https://drive.google.com/open?id=1GCH6JTNZhtumNmek2I0UWW9auQgA9w6w&usp=drive_copy")],
    [key("Taeguk 8","5")]: [
      media("L5 Taeguk 8 - T8 L5", "https://drive.google.com/open?id=1PHIh6QX46sIzk5XbVo1wWB10hm1CUS4p&usp=drive_copy"),
      media("Doble Ap Chagui + Aterrizaje - Taeguk 8", "https://drive.google.com/open?id=1mAlHFT6A4qise0_70UKO8UNcf_oJhjge&usp=drive_copy")
    ],
    [key("Taeguk 8","6")]: [
      media("L6 Taeguk 8 - T8 L6", "https://drive.google.com/open?id=1J48mZWmxnb3MW45inX4rKlem-Q2-Kn5y&usp=drive_copy"),
      media("Doble Ap Chagui + Aterrizaje - Taeguk 8", "https://drive.google.com/open?id=1mAlHFT6A4qise0_70UKO8UNcf_oJhjge&usp=drive_copy")
    ],
    [key("Koryo","1")]: [
      media("Linea 1 Koryo - Precisión + Timing", "https://drive.google.com/open?id=1F8o4BF5j1dkZdPwxREY4JodRuFLwwRMK&usp=drive_copy"),
      media("Inicio con twit kubi (solo posición)", "https://drive.google.com/open?id=1A70nM_-pgKRvJenFyse3ZnpLPVlxNZEz&usp=drive_copy"),
      media("Koryo L1 hold yop + Pyonwong", "https://drive.google.com/open?id=1EvUXdSs21NOAQR8OkD5ip6MeEApvUDDy&usp=drive_copy")
    ],
    [key("Koryo","2")]: [
      media("Linea 2 Koryo - 2.1 ap chagui + golpes", "https://drive.google.com/open?id=1D2ScTJYlw1cCZw5SfoXn5QlF0LiSjOpv&usp=drive_copy"),
      media("Linea 2.2 Koryo", "https://drive.google.com/open?id=1p90iF0JXyFoMq7AW28VYw4g4bQekSYgQ&usp=drive_copy"),
      media("Circuito Hold con banda L2 Koryo", "https://drive.google.com/open?id=1YiNFRyFkZFZH4Pk3eHe8cOZZorTd6rzK&usp=drive_copy")
    ],
    [key("Koryo","3")]: [
      media("Koryo L3 - Lado derecho", "https://drive.google.com/open?id=116eSAk3WUKVvXneFxAAyuyrG0mu7pwIi&usp=drive_copy"),
      media("Koryo L3 - Lado izquierdo", "https://drive.google.com/open?id=1d39Oz_ASS6Yb-BIUclGe9QrT-WP9BgwS&usp=drive_copy"),
      media("Koryo L3 - Concentración 8 seg", "https://drive.google.com/open?id=12W8m2JmF9ICQiA6T1q8DB2TNpoSa_wNJ&usp=drive_copy"),
      media("Linea 3 Koryo - Sentadilla y camara", "https://drive.google.com/open?id=1dlhr114oOT6oiKKaD_02J-MUBPEma9Gn&usp=drive_copy")
    ],
    [key("Koryo","4")]: [media("Koryo L4 - Golpes y defensas", "https://drive.google.com/open?id=1UHV_mYsNFt3pZIiQKAWXIYWjGcpoguwP&usp=drive_copy")],
    [key("Taebaek","3")]: [media("L3 Taebaek - Correcta ejecución por movimiento", "https://drive.google.com/open?id=1ZO57uNvwp0oYS6BpWSIonc54PDorpFiK&usp=drive_copy")],
    [key("Pyonwong","1")]: [
      media("Inicio con twit kubi (solo posición)", "https://drive.google.com/open?id=1A70nM_-pgKRvJenFyse3ZnpLPVlxNZEz&usp=drive_copy"),
      media("Pyonwong + Sonnal Montong Bakkat Makki", "https://drive.google.com/open?id=164BkY5_QP6CC7z0MVa1eejIT0BbkAX4K&usp=drive_copy")
    ],
    [key("Pyonwong","2")]: [media("Pyonwong - Codazo a Codazo - Derecha a izquierda", "https://drive.google.com/open?id=1mYj95xtS6eb5yNzInIV_UyfseDhfygg7&usp=drive_copy")],
    [key("Pyonwong","3")]: [media("Keumgang position + Yop Chagui - Pyonwong", "https://drive.google.com/open?id=1ePjQf4z7o0MsxC0D3yYTRhBevbpwOtFe&usp=drive_copy")],
    [key("Pyonwong","4")]: [media("Pyonwong - Santul hasta final", "https://drive.google.com/open?id=1DZ9aNf69oaoCha-hDp-SOSmCSepG7e_R&usp=drive_copy")],
    [key("Sipjin","1")]: [
      media("Primer Mov Sipjin", "https://drive.google.com/open?id=1V6_zfIyng5pZ23wStNHzs1jJ_6O5Rg6Q&usp=drive_copy"),
      media("Segundo Mov Sipjin", "https://drive.google.com/open?id=13BOvQITRDMKgB_mPFoW7rFI9Vo7NwFiB&usp=drive_copy"),
      media("Segundo Mov lento de sipjin", "https://drive.google.com/open?id=1kp6-1-ee1SwDf4_sbdfnz-E-PKETqiZ1&usp=drive_copy"),
      media("Segundo Mov lento", "https://drive.google.com/open?id=1ALAncmqeNflWwbKj6gyHwnJrpZCZyggE&usp=drive_copy"),
      media("Inicio con twit kubi (solo posición)", "https://drive.google.com/open?id=1A70nM_-pgKRvJenFyse3ZnpLPVlxNZEz&usp=drive_copy")
    ],
    [key("Sipjin","2")]: [
      media("Santul Makki Sipjin", "https://drive.google.com/open?id=1Zgh89nC3aB6ax9yRXxgT_A0bc-syGWcW&usp=drive_copy"),
      media("Golpe lateral sipjin", "https://drive.google.com/open?id=1Gud8KNuejyuRFyckdV_bmVOEBwtOQR18&usp=drive_copy"),
      media("Codazo y giro transicion sipjin", "https://drive.google.com/open?id=1l1FslN_EqKiSAWoftVnr3lU3RWYDCTVD&usp=drive_copy"),
      media("L2 Sipjin - L2.2", "https://drive.google.com/open?id=1OYvukbpGdk6lz-MP725Wjz2mOEx9wWUN&usp=drive_copy"),
      media("L2 Sipjin - L2.3", "https://drive.google.com/open?id=1sTDmHK2wLsyC3tngIl05Wd8iZibkHQVN&usp=drive_copy")
    ]
  };

  const SPECIAL_EXERCISES = [
    media("Chuchum + Giro + Jakdari + Yop - Ejercicio", "https://drive.google.com/open?id=1z0tEpdciDc-QqCm2AqdcJ8Q-wZrUhZ3Z&usp=drive_copy"),
    media("Sonnal Montong Bakkat Makki direccion", "https://drive.google.com/open?id=1Tzv_rE4C3qdhgv76VPXDgONH8q5OXOfd&usp=drive_copy"),
    media("Transicion twit kubi a ap kubi", "https://drive.google.com/open?id=1xxdEMXYZWYiNLG15IzzqNNaYQR65YXsa&usp=drive_copy"),
    media("Transicion ap kubi a ap kubi - versión 1", "https://drive.google.com/open?id=1GFswX5pFCIA84NIvmi0t1ZfZcEiAc1yv&usp=drive_copy"),
    media("Transicion Ap Kubi a Ap Kubi - versión 2", "https://drive.google.com/open?id=1aXojkxi9SDk10XS_OUDvYgIIkAvd5Thk&usp=drive_copy"),
    media("Preparacion correcta del golpe", "https://drive.google.com/open?id=1YqTL-tIYcgR5kYa2ShQInBnmbeQAU1Jy&usp=drive_copy"),
    media("Puños al pecho ap chagui", "https://drive.google.com/open?id=1rWWin6hmMrzLvvlhQGDFmU6_dWHfoKKk&usp=drive_copy"),
    media("Transicion lateral a frontal Ap Kubi a Ap Kubi", "https://drive.google.com/open?id=1Abda3tbJXb54BNLiJUEIGTipRlrV9u4L&usp=drive_copy"),
    media("Transicion Twit Kubi a Twit Kubi", "https://drive.google.com/open?id=1TQjuHQflDQu65fh_zJE1QSTxD2qVaoEX&usp=drive_copy"),
    media("Transicion Twit Kubi", "https://drive.google.com/open?id=1txVlgMDOZNVvDeaetEvSO23_N7uRiH3m&usp=drive_copy"),
    media("Transicion Twit Kubi al frente", "https://drive.google.com/open?id=1nM9qmOoBEkkZxkS9opOM7N9pfg-b0JRb&usp=drive_copy"),
    media("Transicion ap kubi + peso y talon", "https://drive.google.com/open?id=1px4BD-h8EFtI9AUEgR4XrXR4B9anXeOK&usp=drive_copy"),
    media("Transicion ap seogui", "https://drive.google.com/open?id=173-ABbGz9ZYn095O4pc769w-WgN3eyxO&usp=drive_copy"),
    media("Transicion + Elevacion de talon", "https://drive.google.com/open?id=1nFE7bld4aHyjMswJuqN-AsHtiA0M0D9e&usp=drive_copy")
  ];

  function uniqueItems(items){
    const seen = new Set();
    return items.filter(item=>{
      const marker = `${item.titulo}|${item.url || ""}`;
      if(seen.has(marker)) return false;
      seen.add(marker);
      return true;
    });
  }

  function isSystemPlan(plan){
    return Array.isArray(plan?.sistemaTabs) && plan.sistemaTabs.length > 0;
  }

  function getSystemTabs(plan){
    const tabs = Array.isArray(plan?.sistemaTabs) ? plan.sistemaTabs : [];
    return [
      ...tabs,
      {
        id: "herramientas",
        titulo: "Herramientas",
        subtitulo: "Cronómetro + BOT",
        descripcion: "Aquí están las herramientas generales del sistema: racha, temporizador, ChanonaTKD BOT y el botón grande para marcar entrenamiento.",
        recomendacion: "Usa esta pestaña para medir tiempos, hacer preguntas rápidas y marcar tu avance."
      }
    ];
  }

  function tabButton(tab, isActive){
    return `
      <button class="systemTabButton ${isActive ? "active" : ""}" type="button" data-system-tab="${safeHtml(tab.id)}" aria-selected="${isActive}">
        <span>${safeHtml(tab.titulo)}</span>
        <small>${safeHtml(tab.subtitulo || "")}</small>
      </button>`;
  }

  function renderSystemIntro(plan){
    return section("system-intro", "ChanonaTKD System por niveles", "Nueva estructura", `
      <p>${safeHtml(plan.enfoque || "Elige la pestaña que Bryan te indique.")}</p>
      <div class="systemNotice">
        <strong>Importante:</strong> Esta página muestra varias opciones, pero el alumno debe trabajar solamente el nivel indicado por Bryan.
      </div>`);
  }

  function renderSystemTabsNav(plan){
    const tabs = getSystemTabs(plan);
    if(!tabs.some(t => t.id === activeTabKey)) activeTabKey = tabs[0]?.id || "principiantes";
    return `
      <nav class="systemTabsShell" aria-label="Niveles de ChanonaTKD System">
        ${tabs.map(tab => tabButton(tab, tab.id === activeTabKey)).join("")}
      </nav>`;
  }

  function tabResumen(tab){
    const freqItems = Array.isArray(tab.frecuencias) && tab.frecuencias.length
      ? tab.frecuencias
      : [
          tab.chanonaflexDias ? `ChanonaFlex: ${tab.chanonaflexDias}` : "",
          tab.isometricoDias ? `Isométricos: ${tab.isometricoDias}` : "",
          tab.pateoDias ? `Pateo técnico: ${tab.pateoDias}` : "",
          tab.poomsaeDias ? `Poomsae: ${tab.poomsaeDias}` : ""
        ].filter(Boolean);

    const freq = freqItems.length
      ? `<ul>${freqItems.map(x=>`<li>${safeHtml(x)}</li>`).join("")}</ul>`
      : `<div class="empty">Sin frecuencia definida.</div>`;

    const note = tab.recomendacion ? `<div class="systemNotice"><strong>Indicación:</strong> ${safeHtml(tab.recomendacion)}</div>` : "";
    return section(`tab-${tab.id}-resumen`, `Pestaña: ${tab.titulo}`, tab.subtitulo || "Ruta de entrenamiento", `
      <p>${safeHtml(tab.descripcion || "")}</p>
      ${note}
      ${freq}`);
  }

  function renderTextInstructions(items){
    const arr = Array.isArray(items) ? items.filter(Boolean) : [];
    if(!arr.length) return `<div class="empty">Sin indicaciones extras.</div>`;
    return `
      <div class="textInstructions">
        <ol>
          ${arr.map(x=>`<li>${safeHtml(typeof x === "string" ? x : (x.texto || x.text || x.titulo || ""))}</li>`).join("")}
        </ol>
      </div>`;
  }

  function getLineCount(poomsaeName){
    return (POOMSAE_LINE_COUNTS.find(x => x.nombre === poomsaeName) || POOMSAE_LINE_COUNTS[0]).lineas;
  }

  function renderLineOptions(poomsaeName){
    if(isSpecialPoomsae(poomsaeName)){
      return `<option value="especiales" selected>Ejercicios</option>`;
    }
    const count = getLineCount(poomsaeName);
    return Array.from({length:count}, (_,i)=>String(i+1))
      .map(n=>`<option value="${n}" ${n === String(poomsaeLibraryState.linea) ? "selected" : ""}>Línea ${n}</option>`)
      .join("");
  }

  function poomsaeOptions(){
    return POOMSAE_LINE_COUNTS.map(x=>`<option value="${safeHtml(x.nombre)}" ${x.nombre === poomsaeLibraryState.poomsae ? "selected" : ""}>${safeHtml(x.nombre)}</option>`).join("");
  }

  function buildPoomsaeLineItems(poomsaeName, lineNumber){
    if(isSpecialPoomsae(poomsaeName)) return SPECIAL_EXERCISES;
    const exact = LINE_RESOURCES[key(poomsaeName, lineNumber)] || [];
    const full = FULL_POOMSAE[poomsaeName] || [];
    if(exact.length) return uniqueItems([...exact, ...full]);
    if(full.length) return uniqueItems([...full, pendingItem(poomsaeName, lineNumber)]);
    return [pendingItem(poomsaeName, lineNumber)];
  }

  function renderPoomsaeSearchResults(){
    if(!poomsaeLibraryState.searched){
      return `
        <div class="poomsaeEmptyState">
          <strong>Cómo usarlo:</strong>
          <p>Elige una poomsae, elige una línea y presiona <b>Buscar</b>. Ahí aparecerán los recursos existentes o la tarjeta <b>pendiente</b> cuando todavía no haya material confirmado.</p>
          <p>Ejemplo: Bryan puede decirte “esta semana trabaja Taeguk 4 línea 1 y enfócate en el movimiento que vimos”.</p>
        </div>`;
    }
    const p = poomsaeLibraryState.poomsae;
    const line = poomsaeLibraryState.linea;
    const label = isSpecialPoomsae(p) ? "Ejercicios especiales" : `${safeHtml(p)} • Línea ${safeHtml(line)}`;
    return `
      <div class="poomsaeResultTitle">
        <strong>Resultado:</strong> ${label}
      </div>
      ${renderList(buildPoomsaeLineItems(p, line), isSpecialPoomsae(p) ? "Ejercicio" : "Poomsae", "Según indicación de Bryan")}`;
  }

  function renderPoomsaeLibrary(tab){
    return section(`tab-${tab.id}-buscador`, "Buscador de Poomsae", "Selecciona poomsae y línea", `
      <div class="poomsaeFinder">
        <div class="poomsaeFinderGrid">
          <label>
            <span>Poomsae</span>
            <select id="poomsaeNameSelect">${poomsaeOptions()}</select>
          </label>
          <label>
            <span>Línea</span>
            <select id="poomsaeLineSelect">${renderLineOptions(poomsaeLibraryState.poomsae)}</select>
          </label>
          <button id="poomsaeSearchBtn" class="action primary" type="button">🔎 Buscar</button>
        </div>
        <div class="systemNotice">
          <strong>Uso:</strong> Busca exactamente la poomsae y línea que Bryan te indique. También puedes explorar otras líneas para repasar.
        </div>
      </div>
      <div id="poomsaeSearchResults" class="poomsaeSearchResults">${renderPoomsaeSearchResults()}</div>`);
  }

  function setupPoomsaeLibrary(){
    const poomsaeSelect = document.getElementById("poomsaeNameSelect");
    const lineSelect = document.getElementById("poomsaeLineSelect");
    const searchBtn = document.getElementById("poomsaeSearchBtn");
    const results = document.getElementById("poomsaeSearchResults");
    if(!poomsaeSelect || !lineSelect || !searchBtn || !results) return;

    function syncLineOptions(){
      if(isSpecialPoomsae(poomsaeSelect.value)){
        poomsaeLibraryState.linea = "especiales";
        lineSelect.innerHTML = renderLineOptions(poomsaeSelect.value);
        return;
      }
      const count = getLineCount(poomsaeSelect.value);
      const current = Math.min(Number(poomsaeLibraryState.linea || 1), count);
      poomsaeLibraryState.linea = String(current || 1);
      lineSelect.innerHTML = Array.from({length:count}, (_,i)=>String(i+1))
        .map(n=>`<option value="${n}" ${n === poomsaeLibraryState.linea ? "selected" : ""}>Línea ${n}</option>`)
        .join("");
    }

    poomsaeSelect.addEventListener("change", ()=>{
      poomsaeLibraryState.poomsae = poomsaeSelect.value;
      poomsaeLibraryState.linea = isSpecialPoomsae(poomsaeSelect.value) ? "especiales" : "1";
      poomsaeLibraryState.searched = false;
      syncLineOptions();
      results.innerHTML = renderPoomsaeSearchResults();
    });

    lineSelect.addEventListener("change", ()=>{
      poomsaeLibraryState.linea = lineSelect.value;
      poomsaeLibraryState.searched = false;
      results.innerHTML = renderPoomsaeSearchResults();
    });

    searchBtn.addEventListener("click", ()=>{
      poomsaeLibraryState.poomsae = poomsaeSelect.value;
      poomsaeLibraryState.linea = lineSelect.value;
      poomsaeLibraryState.searched = true;
      results.innerHTML = renderPoomsaeSearchResults();
    });
  }

  function renderTrainingTab(tab){
    const split = splitPoomsae(tab);
    const notas = Array.isArray(tab.notasFinales) ? tab.notasFinales : [];
    const calentamientoTitulo = tab.calentamientoTitulo || (tab.id === "principiantes" ? "Calentamiento" : "Calentamiento y activación");
    const parts = [tabResumen(tab)];

    if(tab.id === "principiantes"){
      parts.push(section(`tab-${tab.id}-calentamiento`, calentamientoTitulo, "Preparación inicial", renderList(tab.calentamiento, "Calentamiento", "Antes de entrenar")));
      parts.push(section(`tab-${tab.id}-chanonaflex`, "ChanonaFlex", "Flexibilidad", renderList(tab.chanonaflex, "ChanonaFlex", tab.chanonaflexDias)));
      parts.push(section(`tab-${tab.id}-isometricos`, "Isométrico activo", "Fuerza y control", renderList(tab.isometrico, "Isométrico", tab.isometricoDias)));
      parts.push(section(`tab-${tab.id}-pateo`, "Pateo técnico", "Exclusivo para principiantes", renderList(tab.pateoTecnico, "Pateo", tab.pateoDias)));
    }else if(tab.id === "intermedios" || tab.id === "avanzados"){
      parts.push(section(`tab-${tab.id}-calentamiento`, calentamientoTitulo, "Preparación inicial", renderList(tab.calentamiento, "Calentamiento", "Antes de entrenar")));
      parts.push(section(`tab-${tab.id}-chanonaflex`, "ChanonaFlex", "Flexibilidad", renderList(tab.chanonaflex, "ChanonaFlex", tab.chanonaflexDias)));
      parts.push(section(`tab-${tab.id}-isometricos`, "Isométrico activo", "Fuerza y control", renderList(tab.isometrico, "Isométrico", tab.isometricoDias)));
    }else if(tab.id === "pateo"){
      parts.push(section(`tab-${tab.id}-pateo`, "Pateo técnico", "Común para intermedios y avanzados", renderList(tab.pateoTecnico, "Pateo", tab.pateoDias)));
    }else if(tab.id === "poomsae"){
      parts.push(renderPoomsaeLibrary(tab));
      if(split.poomsae.length) parts.push(section(`tab-${tab.id}-poomsae-destacado`, "Poomsae destacado", "Recursos seleccionados", renderList(split.poomsae, "Poomsae", tab.poomsaeDias)));
      if(split.clasesGrabadas.length) parts.push(section(`tab-${tab.id}-clases`, "Clases grabadas", "Sesiones completas", renderList(split.clasesGrabadas, "Clase", "Cuando corresponda")));
    }else{
      if(Array.isArray(tab.calentamiento) && tab.calentamiento.length) parts.push(section(`tab-${tab.id}-calentamiento`, calentamientoTitulo, "Preparación inicial", renderList(tab.calentamiento, "Calentamiento", "Antes de entrenar")));
      if(Array.isArray(tab.chanonaflex) && tab.chanonaflex.length) parts.push(section(`tab-${tab.id}-chanonaflex`, "ChanonaFlex", "Flexibilidad", renderList(tab.chanonaflex, "ChanonaFlex", tab.chanonaflexDias)));
      if(Array.isArray(tab.isometrico) && tab.isometrico.length) parts.push(section(`tab-${tab.id}-isometricos`, "Isométrico activo", "Fuerza y control", renderList(tab.isometrico, "Isométrico", tab.isometricoDias)));
      if(Array.isArray(tab.pateoTecnico) && tab.pateoTecnico.length) parts.push(section(`tab-${tab.id}-pateo`, "Pateo técnico", "Ap Chagui / Yop Chagui", renderList(tab.pateoTecnico, "Pateo", tab.pateoDias)));
      if(split.poomsae.length) parts.push(section(`tab-${tab.id}-poomsae`, "Poomsae", "Técnica específica", renderList(split.poomsae, "Poomsae", tab.poomsaeDias)));
      if(split.clasesGrabadas.length) parts.push(section(`tab-${tab.id}-clases`, "Clases grabadas", "Sesiones completas", renderList(split.clasesGrabadas, "Clase", "Cuando corresponda")));
    }

    parts.push(section(`tab-${tab.id}-extras`, "Indicaciones extras", "Lectura importante", renderTextInstructions(tab.indicacionesExtras)));
    parts.push(section(`tab-${tab.id}-notas`, "Notas finales", "Mensaje del profesor", notas.length ? `<ul>${notas.map(x=>`<li>${safeHtml(x)}</li>`).join("")}</ul>` : `<div class="empty">Sin notas finales.</div>`));
    return parts.join("");
  }

  function renderToolsTab(){
    return [
      section("herramientas-resumen", "Herramientas generales", "Cronómetro + BOT", `
        <p>Esta pestaña concentra las herramientas que sirven para cualquier nivel: medir tiempos, preguntar al BOT y marcar la racha de entrenamiento.</p>
        <div class="systemNotice"><strong>Recuerda:</strong> El BOT orienta, pero no reemplaza la indicación de Bryan.</div>`),
      renderStreakSection(),
      renderTimerSection(),
      renderBotSection(),
      renderTodayCheck()
    ].join("");
  }

  function renderFloatingTopButton(){
    return `<button id="systemBackTop" class="systemBackTop" type="button" aria-label="Subir al inicio">↑</button>`;
  }

  function setupFloatingTopButton(){
    const btn = document.getElementById("systemBackTop");
    if(!btn) return;
    btn.addEventListener("click", ()=>{
      window.scrollTo({ top:0, behavior:"smooth" });
    });
  }

  function renderSystemPage(plan, alumno){
    const root = document.getElementById("content");
    if(!root) return;
    const tabs = getSystemTabs(plan);
    const active = tabs.find(t => t.id === activeTabKey) || tabs[0];
    const activeContent = active.id === "herramientas" ? renderToolsTab() : renderTrainingTab(active);

    root.innerHTML = [
      renderSystemIntro(plan),
      renderSystemTabsNav(plan),
      `<div class="systemTabPanel" data-active-tab="${safeHtml(active.id)}">${activeContent}</div>`,
      renderFloatingTopButton()
    ].join("");

    root.querySelectorAll("[data-system-tab]").forEach(btn=>{
      btn.addEventListener("click", ()=>{
        activeTabKey = btn.dataset.systemTab;
        renderSystemPage(plan, alumno);
      });
    });

    setupFloatingTopButton();

    if(active.id === "herramientas"){
      setupStreak();
      setupTimer();
      setupBot();
      setupTodayCheck();
    }

    if(active.id === "poomsae"){
      setupPoomsaeLibrary();
    }

    const scrollBtn = document.getElementById("scrollTodayBtn");
    if(scrollBtn){
      scrollBtn.onclick = ()=>{
        activeTabKey = "herramientas";
        renderSystemPage(plan, alumno);
        setTimeout(()=>document.getElementById("todayCheckPanel")?.scrollIntoView({ behavior:"smooth" }), 50);
      };
    }
  }

  const legacyRenderPage = window.renderPage;
  renderPage = function(plan, alumno){
    if(isSystemPlan(plan) && (window.alumnoId === "chanonatkd_system" || new URL(location.href).searchParams.get("alumno") === "chanonatkd_system")){
      renderSystemPage(plan, alumno);
      return;
    }
    legacyRenderPage(plan, alumno);
  };

  const legacyAllPlanItems = window.allPlanItems;
  allPlanItems = function(){
    const p = window.planActual || planActual || {};
    if(isSystemPlan(p)){
      const items = [];
      p.sistemaTabs.forEach(tab=>{
        const split = splitPoomsae(tab);
        items.push(
          ...(tab.calentamiento || []),
          ...(tab.chanonaflex || []),
          ...(tab.isometrico || []),
          ...(tab.pateoTecnico || []),
          ...split.poomsae,
          ...split.clasesGrabadas
        );
      });
      Object.keys(LINE_RESOURCES).forEach(resourceKey=>items.push(...LINE_RESOURCES[resourceKey]));
      Object.keys(FULL_POOMSAE).forEach(resourceKey=>items.push(...FULL_POOMSAE[resourceKey]));
      items.push(...SPECIAL_EXERCISES);
      return uniqueItems(items);
    }
    return legacyAllPlanItems();
  };
})();