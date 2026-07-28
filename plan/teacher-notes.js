(function(){
  const SYSTEM_ID = "chanonatkd_system";

  const NOTES = {
    rafa_hernandez: [
      "T5: En Montong An Makki, evita torcer la cabeza; mantén la cervical alineada con la dirección del movimiento.",
      "T5: Las Twit Kubis se están viendo pequeñas y con más peso de lo normal hacia Ap Kubi; lleva más peso hacia la pierna trasera.",
      "T5: En el regreso de las Yop Chaguis todavía se nota una ligera flexión extra de la cintura; controla mejor el recobro.",
      "T6: Las Dollyo Chaguis están saliendo muy lineales; ejecútalas ligeramente en diagonal.",
      "T6: En los aterrizajes después de Ap Chagui, refuerza la ejecución del golpe medio con más claridad.",
      "T6: Las Bakkat Makki deben salir con un poco más de velocidad y decisión.",
      "T6: De la penúltima a la última línea estás bajando la velocidad; mantén la intensidad hasta el final.",
      "T7: En el último golpe estás sacando el codo antes de tiempo; primero debe salir el puño y el codo empuja hasta el final del paso.",
      "T7: A partir de la segunda línea baja la intensidad; conserva la explosividad de la primera línea en toda la poomsae.",
      "T7: Dale ligeramente más torsión del torso a los movimientos de la línea 3.",
      "T8: El brazo que va hacia atrás en la línea 3 debe salir explosivo desde el hombro, no desde la cintura.",
      "T8: El Bom Sogui del lado izquierdo en línea 4 está más pequeño; cuida distancia y peso.",
      "T8: En las dobles Ap Chaguis, evita el doble movimiento de brazos arriba y abajo; mantén los brazos controlados.",
      "T8: Los triples golpes necesitan más velocidad y continuidad para mostrar explosividad natural.",
      "T8: En línea 4, el golpe de aterrizaje del lado derecho se ve forzado; trabaja que salga más natural.",
      "Koryo: Refuerza control y fuerza para sostener la postura en línea 3, especialmente en las Yop Chaguis.",
      "Koryo: El regreso de las Yop Chaguis se ve más seguro, pero aún necesita más afinación y control.",
      "Koryo: En línea 2 y última línea, evita torcer el cuello en las ejecuciones de filo al cuello.",
      "Koryo: La trayectoria del codazo debe ir más hacia atrás; recuerda que va de pectoral a pectoral.",
      "Koryo: En Yop derecho, cuida que el torso no se vaya hacia el frente.",
      "Taebaek: Los Bom Sogui están más cerca de 70/30 que de 90/10; lleva más peso hacia atrás.",
      "Taebaek: En línea 2 mejoraron los brazos circulares; solo alínealos un poco más con el cuerpo, ligeramente hacia afuera.",
      "Taebaek: En línea 3, usa la misma seguridad y potencia que ya logras en Koryo línea 3.",
      "Taebaek: En el último golpe de la penúltima línea vuelves a torcer el cuello; cuida la cervical.",
      "Taebaek: No bajes la velocidad desde la línea 2; mantén explosividad constante para no cambiarle el ritmo al juez."
    ],

    evan_palomino: [
      "T4: Sonnal Montong Bakkat Makki se prepara muy pequeño; extiende más y coloca la mano asistente al centro.",
      "T4: Montong An Makki también necesita una preparación más amplia y clara.",
      "T4: En Ap Chagui, los brazos deben mantenerse en el pecho y no moverse de su lugar.",
      "T4: En Yop Chagui, las manos deben mantenerse en el costado.",
      "T4: En Twit Kubi, alinea la rodilla trasera con el torso y la cadera; no la metas hacia adentro.",
      "T5: La preparación de Are Makki debe ir más pegada al cuerpo.",
      "T5: El golpe martillo debe pasar por encima de la cabeza, hacer el círculo completo y terminar completamente extendido.",
      "T5: Todos los puños que llegan al costado deben mantenerse firmes y sin torsión.",
      "T5: En Yop Chagui falta hacer el recobro de la rodilla hacia el pecho.",
      "T5: Las Ap Kubis lucen algo pequeñas; trabaja mayor apertura.",
      "T5: Trabaja movilidad del torso en defensas como Montong An Makki.",
      "T6: A los golpes de la línea 3 les falta torsión del torso.",
      "T6: La preparación de Bakkat Makki necesita más amplitud.",
      "T6: Las defensas de línea 2 y línea 4 deben ir a la cara; actualmente se quedan en el pecho.",
      "T6: Las Ap Chaguis de líneas 1 y 3 deben ejecutarse con más seguridad y explosividad.",
      "T6: Batanson en la última línea está muy corto; amplía el recorrido de preparación.",
      "T6: Trabaja en dar máxima velocidad a los movimientos.",
      "T7: En línea 2, las defensas están muy cortas; extiéndelas más hacia atrás.",
      "T7: En línea 5, marca los movimientos con mayor explosividad para que se vean claros.",
      "T7: En Kawi Makki línea 4, coordina torso, hombros y brazos; no dejes el torso de frente durante la preparación.",
      "T7: Mantén siempre la vista hacia donde ejecutas el movimiento; en los codazos de la última línea estás mirando hacia un lado.",
      "T7: Los golpes de línea 3 deben ir hacia la nariz; actualmente están debajo del hombro.",
      "T8: La preparación con dos brazos se está ejecutando muy corta; amplía la preparación.",
      "T8: Evita mover y separar los brazos del cuerpo al ejecutar Ap Chagui.",
      "T8: En línea 2, el brazo de atrás debe ejecutarse con más fuerza.",
      "T8: Los golpes medios llegan, pero después se suben; conserva la altura correcta.",
      "T8: La velocidad debe coordinarse con la torsión del torso; en varios movimientos falta mover el torso.",
      "T8: Los giros de transición están muy lentos; trabaja seguridad y rapidez.",
      "T8: Las Ap Chaguis necesitan mucha más explosividad.",
      "Koryo: En Chumbi, cierra los pulgares al abrir las manos.",
      "Koryo: En Yop Chagui, busca más tronquito uno y evita torcer el torso.",
      "Koryo: Marca mucho más los codazos de línea 3, de pecho a pecho, no desde el centro.",
      "Koryo: En el recobro de manos durante Yop Chagui, las manos deben llegar a la cintura hasta que se extienda la pierna.",
      "Koryo: Los aterrizajes de Yop Chagui deben ser controlados; recoge la pierna y aterriza sin que parezca caída.",
      "Koryo: En golpes de cuchillo al centro, no abras antes; abre justo en la finalización.",
      "Koryo: La doble defensa exterior debe verse como defensa, no como golpe; baja los codos y piensa en bloquear."
    ],

    camila_berolatti: [
      "Koryo: En Yop línea 3, el recobro de manos debe jalar con máxima explosividad al punto final.",
      "Koryo: En Twit Kubi, la rodilla trasera se está torciendo hacia adentro; alinea ambas rodillas.",
      "Koryo: En dobles Yop Chaguis, marca siempre la flexión de transición entre la Yop de rodilla y la Yop a la cara.",
      "Koryo: Mantén el torso firme y alineado durante la ejecución.",
      "Koryo: En la última línea, los golpes de cuchillo al cuello necesitan extenderse más.",
      "Keumgang: En Jakdari Sogui, cierra un poco la rodilla elevada hacia adentro para mejorar equilibrio y línea visual.",
      "Keumgang: En Chuchum Sogui, evita que el pie del lado de dirección se mueva primero antes del giro; todo debe girar coordinado.",
      "Keumgang: En Olgul Makki, evita torcer la muñeca hacia atrás.",
      "Keumgang: En el golpe lateral antes del giro, usa ligera torsión contraria para sacar más potencia.",
      "Taebaek: En la transición de Ap Kubi a Bom Sogui línea 1, empuja primero la pierna frontal y deja que la pierna trasera reciba el peso.",
      "Taebaek: En Ap Chagui, la pierna de apoyo debe mantenerse extendida.",
      "Taebaek: Desde la segunda línea baja la velocidad; mantén un ritmo coherente para presentación.",
      "Taebaek: Los dobles golpes deben ejecutarse con mayor velocidad y afinación.",
      "Pyonwong: En la segunda Twit Kubi, evita quedarte 50/50; lleva el peso atrás.",
      "Pyonwong: En Ap Kubi, termina de torcer la pierna trasera para evitar una posición forzada.",
      "Pyonwong: En Yop Chagui te caes porque el torso se va al frente; busca alineación completa.",
      "Pyonwong: En la Yop Chagui de pierna izquierda, evita que los dedos se vayan hacia arriba; busca tronquito uno.",
      "Pyonwong: Alinea el torso desde el bloqueo después de Ap Chagui para mejorar equilibrio en la Yop de giro.",
      "Pyonwong: Coordina preparación de defensa, recobro de Yop Chagui y torso.",
      "Pyonwong: Al sacar el brazo en la última Yop Chagui, mantenlo recto; evita hacerlo circular.",
      "Pyonwong: La transición entre Ap y Yop Chagui debe quedar en Ap Sogui corto, no cruzado."
    ],

    johncell_genesis: [
      "Koryo: Las Yop Chaguis han mejorado mucho en torso, pero aún se nota algo de torsión; sigue corrigiendo.",
      "Koryo: En el primer paso de línea 4, primero gira el cuerpo y después coloca el pie en la dirección correcta.",
      "Koryo: La transición de Ap Kubi a Twit Kubi de línea 1 debe ser encapsulada, no circular.",
      "Koryo: En línea 2, antes de patear, evita mover el pie frontal hacia afuera; gira hasta elevar la rodilla al máximo.",
      "Koryo: Las Twit Kubis ya se acercan más al 70/30; sigue trabajando el peso en la pierna trasera para que se vea natural.",
      "Keumgang: En línea 1, la pierna delantera se mueve antes de ejecutar el siguiente movimiento; eso cuenta como movimiento extra.",
      "Keumgang: En Santul Makki y Chuchum Sogui, el pie que transita se está levantando circular; debe ir lineal.",
      "Keumgang: No muevas el pie delantero antes de que gire el cuerpo; debe moverse con el cuerpo.",
      "Keumgang: En los giros, no levantes los dedos antes de girar; primero mueve la cadera con el pie trasero.",
      "Keumgang: En línea 1.2, las transiciones de Twit Kubi deben ser rectas, no circulares.",
      "Keumgang: En los giros, cierra los brazos al cuerpo y cruza bien las piernas.",
      "Taebaek: En línea 1, trabaja Ap Chagui con la pierna de apoyo extendida.",
      "Taebaek: Mantén ritmo técnico aunque aparezca cansancio; cuida postura y torso en Yop Chagui.",
      "Taebaek: Los Bom Sogui se ven mucho mejor; sigue cuidando peso y postura.",
      "Taebaek: En línea 2, los pies frontales vuelven a torcerse; corrige dirección.",
      "Taebaek: En línea 3, las Twit Kubis tienen peso en medio; busca más peso en la pierna trasera.",
      "Taebaek: En transiciones laterales de línea 1, no anticipes el pie; gira con encapsulación.",
      "Taebaek: La transición encapsulada hacia línea 3 se ve mucho más limpia; sigue trabajando ahí.",
      "Taebaek: Tensa las piernas en Hakdari Sogui para evitar desequilibrios.",
      "Taebaek: Los golpes de línea 3 deben marcarse más para que se noten sus preparaciones.",
      "Taebaek: Aumenta explosividad al avanzar con la pierna trasera, manteniendo postura y alineación.",
      "Taebaek: En Ap Kubi, evita que la pierna trasera se flexione, especialmente en las últimas ejecuciones."
    ],

    patricio_leigh: [
      "Koryo: El golpe al cuello con mano abierta debe ejecutarse con el filo interno, no con la palma.",
      "Koryo: En el movimiento de meditación de línea 3, la finalización está muy al frente; controla mejor el punto final.",
      "Koryo: En aterrizajes a Ap Kubi, evita que la posición quede abierta lateralmente; alinea con la cadera.",
      "Koryo: En el aterrizaje de Yop Chagui línea 3, controla la caída para proteger también la cervical.",
      "Koryo: En línea 2 falta un poco más de torsión del torso; relaja y ejecuta con más claridad.",
      "Koryo: Las Twit Kubis están ligeramente hacia el frente; lleva más peso hacia atrás.",
      "Koryo: En el recobro de la Yop línea 3, el codo debe ir hacia un lado, no hacia la espalda.",
      "Keumgang: En línea 2, los brazos asistentes no deben extenderse por completo; mantén flexión y baja ligeramente al nivel del pecho durante la preparación.",
      "Keumgang: Las Chuchum Sogui laterales y las que salen después del giro deben ejecutarse con posición de Kiko.",
      "Keumgang: En la Chuchum Sogui después del giro, no muevas primero el pie frontal; deja que el pie trasero y la cadera giren en su dirección.",
      "Keumgang: En los golpes laterales después del giro, espera a que la bola del pie pise primero y después ejecuta todo junto.",
      "Keumgang: Falta culminar los giros desde la torsión completa."
    ],

    leonardo_gonzalez: [
      "T5: Falta más velocidad en los movimientos.",
      "T5: Trabaja la torsión del torso para que se note claramente ante el juez.",
      "T5: En línea 5, la preparación de brazos en Yop Chagui mejoró mucho; conserva ese cambio de hábito.",
      "T5: En Yop Chagui línea 5, mete más tronquito uno y lleva más la rodilla al pecho.",
      "T5: Las defensas Montong Makki están por encima de los hombros; los nudillos deben quedar a la línea exacta de los hombros.",
      "T5: En línea 5, coordina brazos y pierna: primero empieza el movimiento del pie y luego lleva los puños a la cintura.",
      "T6: En las patadas, estás llevando los brazos antes que la rodilla al pecho; coordina mejor.",
      "T6: Aumenta velocidad y ejecuta con más libertad y precisión, sin pensar tanto los movimientos.",
      "T6: La defensa a la cara de líneas 2 y 4 debe ir diagonal y justo frente a la cara, sin torcer el cuello.",
      "T6: La preparación de golpes en aterrizajes necesita más torsión contraria.",
      "T6: En Ap Chagui, los puños deben quedarse fijos en el pecho; no los bajes.",
      "T6: Al ejecutar golpes, evita bajar la barbilla; deja la cervical fija.",
      "T6: En la última línea, retrocede con autoridad empujando la pierna delantera hacia atrás.",
      "T7: En Bom Sogui, el peso está 50/50; debe sentirse 90/10 hacia la pierna trasera.",
      "T7: El Bom Sogui está pequeño; mantén distancia de Ap Sogui.",
      "T7: En Kawi Makki, corrige la posición de brazos: los de arriba no deben quedar demasiado adentro ni los de abajo demasiado afuera.",
      "T7: En el Sonnal de la penúltima parte, no gires el torso; deja que el trabajo lo hagan los brazos.",
      "T7: Cuando aparezca cansancio, aumenta la intensidad; no permitas que los brazos se suavicen."
    ],

    rodrigo_gonzalez: [
      "T5: El pateo de Ap Chagui se nota con más estabilidad y elasticidad; conserva ese avance.",
      "T5: Montong An Makki necesita alinearse mejor al centro del cuerpo; no lo metas demasiado.",
      "T5: En los golpes de revés falta un poco más de torsión.",
      "T5: En la transición de línea 2 a línea 3 falta encapsular más.",
      "T5: Después de la tercera repetición se nota cansancio; aumenta el trabajo de cardio para mejor rendimiento competitivo.",
      "T5: En línea 5, mete la Yop Chagui con más confianza al pecho para mejorar equilibrio.",
      "T5: Las defensas de Sonnal aún se tuercen hacia abajo; corrige dirección.",
      "T5: Los puños al costado llegan con más fuerza, pero aún falta jalar el codo con mayor velocidad.",
      "T6: La defensa a la cara con mano abierta está debajo de la cara; corrige altura para evitar deducción.",
      "T6: Los regresos a Twit Kubi en líneas 1 y 5 se ven forzados; aguanta más la flexión de rodilla antes de aterrizar.",
      "T6: La defensa a la cara con puño cerrado en línea 3 necesita más marcación.",
      "T6: En Ap Chagui, los puños llegan al pecho pero no se mantienen; cuida que no se muevan.",
      "T6: Las Bakkat Makki se están torciendo hacia abajo; corrige dirección.",
      "T6: La inclinación del torso en Dollyo Chagui debe hacerse con más confianza.",
      "T6: Aunque haya cansancio, ejecuta siempre con precisión.",
      "T6: En todos los movimientos, el codo del puño al costado debe jalar con máxima velocidad.",
      "T7: Mete más atrás los puños del costado, justo a la cintura.",
      "T7: El último golpe debe salir con más explosividad desde el empuje de las piernas, no solo desde el puño.",
      "T7: En líneas 2 y 3, evita carrusel en las Twit Kubis; mantén más flexión de rodillas.",
      "T7: Las Ap Kubis necesitan más apertura frontal y más flexión.",
      "T7: En Bom Sogui, evita llevar el peso al frente; busca 90/10 hacia atrás.",
      "T7: Batanson debe ir con máxima explosividad; se ve algo lento.",
      "T7: En Ap Chagui, sostén más la rodilla arriba para mejorar control.",
      "T7: En la última línea, extiende la pierna de apoyo cuando pateas.",
      "T8: En Ap Chagui saltando, aterriza en la misma línea de donde saltaste.",
      "T8: Los dobles golpes deben ejecutarse con más explosividad y velocidad.",
      "T8: Las Ap Kubis deben ser un poco más largas.",
      "T8: En línea 3, el brazo trasero necesita extenderse más y no cerrarse cerca de la oreja.",
      "T8: En línea 3, tuerce más el torso en el golpe de meditación.",
      "T8: Aumenta velocidad general, cuidando técnica.",
      "T8: Las preparaciones de Batanson y Sonnal Montong Bakkat Makki necesitan más apertura.",
      "T8: Aumenta velocidad en los tres golpes finales, sin pensarlos demasiado.",
      "T8: En el primer Twit Kubi y en la última línea, deja el peso atrás y evita quedar con peso al frente.",
      "Koryo: Las Yop Chaguis mejoraron en línea 1 y 3; falta más flexión de rodilla al pecho al recoger.",
      "Koryo: En línea 3, en el golpe a la mano, mantén el torso completamente lineal.",
      "Koryo: Eleva un poco más el codo de la mano que recibe el golpe con mano abierta.",
      "Koryo: La última línea debe ser más explosiva y agresiva.",
      "Koryo: Cuando aparece cansancio, llevas menos la rodilla al pecho; cuida eso siempre.",
      "Koryo: Flexiona más las rodillas en Chuchum Sogui.",
      "Koryo: Los puños que llegan al costado deben ir exactamente a la cintura.",
      "Koryo: Aumenta velocidad y confianza en Yop Chagui línea 3 desde el paso con cruce.",
      "Koryo: Sigue trabajando el pie trasero en Ap Kubi, porque aún queda con la punta hacia afuera.",
      "Taebaek: Los Bom Sogui se ven mejor, pero lleva más peso a la pierna trasera.",
      "Taebaek: En la última línea, las transiciones se ven forzadas; gira con la bola del pie y usa el torso.",
      "Taebaek: Dale más velocidad y confianza a la Yop Chagui desde Jakdari Sogui.",
      "Taebaek: En línea 2, los movimientos de Are Makki con mano abierta deben extenderse más.",
      "Taebaek: Flexiona más el recobro de las Ap Chaguis.",
      "Taebaek: En línea 4, la transición de Ap Kubi de revés hacia Twit Kubi debe ser encapsulada, no circular.",
      "Taebaek: En Kawi Makki de la última línea, flexiona el brazo superior a unos 45 grados."
    ],

    omar_azi: [
      "Taebaek: En dobles golpes, enfócate en la flexión de rodilla para tener tiempo de extender el brazo correcto.",
      "Taebaek: En Bom Sogui, el peso está 50/50; debe ir 90/10 hacia atrás.",
      "Taebaek: En el primer movimiento de línea 2, el torso se tuerce de más; mantén alineación.",
      "Taebaek: Evita mover los puños durante Ap Chagui.",
      "Taebaek: En giros largos, encapsula completo y gira con la bola del pie con más seguridad.",
      "Taebaek: En línea 2, las defensas bajas deben extenderse por completo.",
      "Taebaek: En línea 3, las Twit Kubis deben mostrar peso atrás y mayor flexión.",
      "Taebaek: Las defensas bajas dobles con mano abierta de línea 1 deben ir en línea con los cuádriceps, no con la espalda.",
      "Pyonwong: Las Chuchum Sogui se ven mucho mejor y más lineales.",
      "Pyonwong: En Ap Chagui, evita llevar la cadera hacia el frente; mantén alineación.",
      "Pyonwong: En Yop Chagui vas mejorando; cuida llevar más la rodilla al pecho.",
      "Pyonwong: En Twit Kubi de aterrizaje, coloca más peso en la pierna trasera.",
      "Pyonwong: En la transición de Ap más Yop, no cruces las piernas; déjalas en Ap Sogui con ligero cruce."
    ],

    karen_sanchez: [
      "T4: En línea 1, la mano asistente del golpe con mano abierta llega a la axila; debe quedar solo detrás del codo.",
      "T4: Las defensas se preparan muy suave; deben salir con máxima explosividad y velocidad.",
      "T4: En Sonnal Montong Bakkat Makki, la preparación está incompleta; la mano de defensa debe subir al pecho, no quedarse en abdomen.",
      "T4: Los golpes deben ser más rápidos, con máxima velocidad sin perder marcación.",
      "T4: En aterrizajes a Twit Kubi línea 3, baja con el peso de la cadera, no solo bajando el pie.",
      "T4: Cierra bien los puños y colócalos a la altura correcta, no abajo de la boca del estómago.",
      "T4: Las transiciones deben hacerse con bola del pie, no con talón.",
      "T4: En Ap Chagui, evita subir un brazo.",
      "T5: Are Makki y golpe martillo han mejorado mucho; conserva esa línea.",
      "T5: En línea 5, los brazos en Yop Chagui deben ir en paralelo con las piernas y el puño lateral no debe torcerse.",
      "T5: En línea 3, Sonnal está ligeramente más abajo de lo debido.",
      "T5: En el codazo de línea 5, evita adelantar el codo durante la trayectoria y cuida que los dedos salgan.",
      "T5: En línea 1, cuida que el pie trasero de Ap Kubi tuerza completo y lleve el talón hacia atrás.",
      "T5: Ejecuta con máxima explosividad para detectar errores de fuerza.",
      "T5: En codazos, los dedos deben salir y no quedar por dentro.",
      "T6: El puño izquierdo no completa la torsión al llegar a la cintura.",
      "T6: Los golpes medios deben llegar al centro del eje completo, no a la lateral del cuerpo.",
      "T6: En el último golpe izquierdo de línea 3, evita elevar el talón trasero.",
      "T6: Sigue cuidando aterrizajes hacia Twit Kubi.",
      "T6: Batanson en la última línea de reversa está más diagonal de lo normal.",
      "T6: En el movimiento de meditación, llega usando bola del pie, no talones.",
      "T6: Las Bakkat Makki a la cara deben llegar a la cara, no al hombro.",
      "T6: En el Sonnal de la última línea, debe existir torsión de muñeca; no inicies con la palma hacia abajo."
    ],

    ximena_palacios: [
      "T6: En línea 3, el último golpe se mueve ligeramente después de la ejecución; fija mejor el final.",
      "T6: Lleva el puño del costado más atrás, jalando fuerte el codo.",
      "T6: En Ap Chagui, evita encorvar cervical y espalda superior.",
      "T6: En Dollyo Chagui, el torso se va al frente; manténlo lineal aunque la patada vaya en diagonal.",
      "T6: En defensa a la cara con mano abierta, haz torsión manteniendo el torso recto.",
      "T6: Dale más velocidad a defensas y golpes.",
      "T6: Sigue trabajando Twit Kubi con más flexión de pierna trasera.",
      "T6: Las Are Makki se preparan correctamente, pero demasiado separadas del cuerpo; mantén el brazo pegado.",
      "T6: En Bakkat Makki, evita torcer la muñeca hacia afuera.",
      "T6: En transiciones, evita levantar primero el pie trasero; primero lleva el peso atrás y después gira con bola del pie.",
      "T7: En línea 2, el brazo que llega abajo se prepara bien, pero después se eleva para ejecutar; mantenlo estable.",
      "T7: En línea 3, evita elevar hombros en los movimientos de brazos.",
      "T7: En la última línea, el primer codazo necesita que los dedos queden suficientemente afuera.",
      "T7: En línea 5, la apertura de brazos debe ir más diagonal al frente, como si tomaras a alguien de los hombros.",
      "T7: Kawi Makki debe ejecutarse con más velocidad, uno a uno.",
      "T7: En línea 3, la preparación del brazo asistente no es 100% extendida, pero necesita más amplitud que la actual.",
      "T7: En la última línea, extiende bien la pierna de apoyo al ejecutar Ap Chagui hacia la mano."
    ]
  };

  function currentAlumno(){
    return new URL(location.href).searchParams.get("alumno") || "";
  }

  function escapeHtml(value){
    const div = document.createElement("div");
    div.textContent = String(value ?? "");
    return div.innerHTML;
  }

  function getExistingNotes(){
    try{
      const direct = Array.isArray(planActual?.indicacionesExtras) ? planActual.indicacionesExtras : [];
      const legacy = Array.isArray(planActual?.extras) ? planActual.extras : [];
      return [...direct, ...legacy].map(note => {
        if(typeof note === "string") return note;
        return note.texto || note.text || note.enfoque || note.descripcion || note.titulo || note.title || "";
      }).filter(Boolean);
    }catch{
      return [];
    }
  }

  function renderTeacherNotes(){
    const alumno = currentAlumno();
    if(!alumno || alumno === SYSTEM_ID) return;

    const section = document.getElementById("extras");
    if(!section) return;

    const title = section.querySelector("h3");
    const eyebrow = section.querySelector(".eyebrow");
    const body = section.querySelector(".sectionBody");
    if(!body) return;

    if(title) title.textContent = "Indicaciones del profesor";
    if(eyebrow) eyebrow.textContent = "Mensaje técnico";

    const notes = NOTES[alumno] || getExistingNotes();
    const renderKey = `${alumno}-${notes.length}-${notes.join("|").length}`;
    if(body.dataset.teacherNotesKey === renderKey) return;
    body.dataset.teacherNotesKey = renderKey;

    if(!notes.length){
      body.innerHTML = `<div class="empty">Aún no hay indicaciones del profesor para este plan.</div>`;
      return;
    }

    body.innerHTML = `
      <div class="systemNotice teacherNotesNotice">
        <strong>Indicaciones del profesor:</strong> Lee estos puntos antes de entrenar y úsalos como guía técnica durante tu sesión.
      </div>
      <ol class="teacherNotesList">
        ${notes.map(note => `<li>${escapeHtml(note)}</li>`).join("")}
      </ol>`;
  }

  function injectStyle(){
    if(document.getElementById("teacherNotesStyle")) return;
    const style = document.createElement("style");
    style.id = "teacherNotesStyle";
    style.textContent = `
      .teacherNotesList{
        margin:14px 0 0;
        padding-left:22px;
        display:grid;
        gap:10px;
        color:var(--text);
      }
      .teacherNotesList li{
        line-height:1.55;
        background:rgba(255,255,255,.035);
        border:1px solid rgba(255,255,255,.08);
        border-radius:14px;
        padding:10px 12px;
      }
      body.light .teacherNotesList li{
        background:rgba(10,10,10,.035);
        border-color:rgba(10,10,10,.08);
      }
      .teacherNotesNotice{margin-bottom:12px;}
    `;
    document.head.appendChild(style);
  }

  function run(){
    injectStyle();
    renderTeacherNotes();
  }

  const content = document.getElementById("content");
  if(content){
    let queued = false;
    new MutationObserver(() => {
      if(queued) return;
      queued = true;
      setTimeout(() => {
        queued = false;
        run();
      }, 120);
    }).observe(content, { childList:true, subtree:true });
  }

  setTimeout(run, 250);
  setTimeout(run, 900);
})();
