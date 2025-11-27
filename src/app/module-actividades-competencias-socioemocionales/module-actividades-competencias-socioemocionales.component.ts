import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EvidenceUseCase } from '@domain/usecases/evidence.usecase';
import { Phase } from '@domain/models/evidence.model';

@Component({
  selector: 'app-module-actividades-competencias-socioemocionales',
  templateUrl:
    './module-actividades-competencias-socioemocionales.component.html',
  styleUrls: [
    './module-actividades-competencias-socioemocionales.component.scss',
  ],
})
export class ModuleActividadesCompetenciasSocioemocionalesComponent
  implements OnInit
{
  phases: Phase[] = ['PRE_ACTIVE', 'INTERACTIVE', 'POST_ACTIVE'];
  phase: Phase;
  isValidFile: boolean = false;
  isEvidenceSubmitted: boolean = false;
  uploadForm: FormGroup;

  grade: any;
  page: any;

  modules: any = {
    10: [
      {
        content: `
 		<h1>FASE PREACTIVA O DE EXPLORACIÓN DE SABERES PREVIOS</h1>

 		<p>En esta primera serie de actividades encontrarán un grupo de ejercicios reflexivos que tienen como propósito vincular la experiencia vital de tal modo que nos demos cuenta de que, las competencias socio emocionales son asunto de la vida cotidiana y de la manera en que hacemos conciencia de quiénes somos, a dónde nos dirigimos y en qué mundo queremos vivir. </p>

 		<img class="divicion_image" src="assets/images/fondos/Fondo_division_mod.png">
 		<h2 class="ct-socio">→ Actividad 1:</h2>
<img src="https://i.postimg.cc/tgbw01Qx/diana-mate.png" title="Recuerda, en esta actividad debes hacer un entregable.">
<ul class="menu_momento_introductivo">

 			<li class="btn_maloka" title="Competencias Socioemocionales"><span><a alt="Competencias Socioemocionales" href=""></a></span></li>

 		</ul>
 		<br>
 		<p><strong>Reflexiono</strong> sobre los siguientes aspectos, teniendo en cuenta el ejemplo a continuación (Autoconciencia)</p>
 		<p>¿Quién soy yo? ¿Lo que quiero y me gusta en mi vida concuerda con lo que estoy haciendo para alcanzar la meta que busco?</p>
 		<p>Ejemplo: Mi mayor sueño es lograr armonía material, emocional y espiritual que me permita poder viajar, vivir bien y ayudar a mi familia.</p>
 		<p>Completa las siguientes oraciones:</p>
 		<p><span class="icon_objetivos"></span>Mi mayor sueño es:</p>
 		<p><span class="icon_objetivos"></span>Lo que mejor hago es:</p>
 		<p><span class="icon_objetivos"></span>Lo que quisiera mejorar académicamente es:</p>
 		<p><span class="icon_objetivos"></span>Lo que quisiera mejorar como persona es:</p>
 		<p><span class="icon_objetivos"></span>Lo que veo a mi favor de mi entorno es:</p>
 		<p><span class="icon_objetivos"></span>Lo que más me apasiona en la vida es:</p>
 		<p><span class="icon_objetivos"></span>Lo que más valoro de lo que hago es:</p>
 		<p><span class="icon_objetivos"></span>Para llegar a hacer lo que quiero en el futuro debo:</p>
 		<p><span class="icon_objetivos"></span>Lo que más me llena de entusiasmo es:</p>
 		<p><span class="icon_objetivos"></span>Mis habilidades más fuertes se evidencian cuando:</p>
 		<p><span class="icon_objetivos"></span>además reflejan lo que me gusta que es:</p>

 	`,
        upload: false,
        id: 1,
      },
      {
        content: `
 		<h2 class="ct-socio">→ Actividad 2:</h2><br><br>
 		<b>Emociones y consecuencias (Autorregulación)</b>
 		<br><br>
 		<p>Pienso en dos situaciones en las que he sentido emociones fuertes y difíciles de manejar para mí. Luego, describo la situación, qué emoción estaba sintiendo, qué hice en ese momento (cómo reaccioné) y qué pasó después (qué consecuencias tuvieron mis acciones o reacciones). Como el ejemplo cotidiano lo muestra.</p>
 		<p>Completa la siguiente tabla y súbela en la plataforma en un archivo *.XLS, *.DOC O PDF</p>

 		<img src="https://i.postimg.cc/50rMDzy9/Socio-Emocionales-10-2.png" width="100%">

 	`,
        upload: false,
        id: 1,
      },

      {
        content: `
 		<h2 class="ct-socio">→ Actividad 3:</h2><br><br>
 		<b>Dibujo cómo me veo en el futuro (Toma responsable de decisiones)</b>
 		<br><br>
 		<p>De acuerdo con mis sueños y a través de un escudo, dibujo donde me gustaría verme en unos 10 años. </p>
 		<p>Como sugerencia: Puedo dividir el escudo en cuatro partes, en una parte simbolizo en donde me gustaría vivir, en la otra las personas con quien quisiera estar compartiendo, en un tercero el lugar de trabajo donde me imagino estar y el cuarto, el impacto social que quisiera ejercer.  Utilice una hoja en papel en blanco para realizar su dibujo, tómele una foto y adjuntelo al archivo PDF donde va a presentar las actividades.</p>
 		<p>Suba las actividades 1, 2 y 3, compiladas en un solo archivo PDF en la plataforma.</p>
 		<br><br>
 		<b>Ejemplo de escudo</b>
 		<br><br>
 		<img src="" width="100%">

 	`,
        upload: true,
        phase: 0,
        id: 1,
      },

      {
        content: `
 		<h1>FASE INTERACTIVA</h1>

 		<p>Este segundo grupo de actividades presentan una serie de conceptos, definiciones y categorías que te van a permitir comprender mejor el significado de las competencias socio emocionales y vincularlo significativamente con los hallazgos de la fase anterior.</p>

 		<img class="divicion_image" src="assets/images/fondos/Fondo_division_mod.png">
 		<h2 class="ct-socio">→ Actividad 4:</h2>

<img src="https://i.postimg.cc/tgbw01Qx/diana-mate.png" title="Recuerda, en esta actividad debes hacer un entregable.">
<ul class="menu_momento_introductivo">

 			<li class="btn_maloka" title="Competencias Socioemocionales"><span><a alt="Competencias Socioemocionales" href=""></a></span></li>

 		</ul>
 		<br>
 		<p>Lea con detenimiento el siguiente texto y subraye la idea principal de cada párrafo. Luego resuelva los ejercicios propuestos (Autoconciencia) y suba los archivos en formato *.DOC o PDF a la plataforma.</p>
 		<section class="extract_content">
 			<p><span class="icon_objetivos"></span>Autoconciencia:</p><br>
 			<p>Separación que hace el hombre de sí mismo respecto al mundo objetivo, toma de conciencia de su relación con el mundo, de su propio ser como persona, de su conducta, de sus actos, pensamientos y sentimientos, de sus deseos e intereses.</p>
 			<p>Las habilidades que fortalecen esta competencia son: Motivación al logro, perseverancia y manejo de emociones. Estas implican a su vez, autopercepción, es como nos percibimos a nosotros mismos, la autoimagen que cada persona tiene de sí, esta nos permite evaluar nuestro valor interno. También, es la que permite el conocimiento que los individuos tienen acerca de sus capacidades y confianza para alcanzar una meta o enfrentar una situación. Y, por último, habilidad para el manejo de emociones, es la que nos aporta datos necesarios para la toma de decisiones, para realizar nuestra actividad diaria y saber relacionarlas con las situaciones que las provocan. (Ministerio de Educación Nacional y Banco Mundial, 2017)</p>
 			<p>Para desarrollar tu autoconciencia es importante que logres identificar cuáles son las creencias que has ido construyendo a lo largo de tu vida, cómo se han construido y también reconocer tus deseos, con estos, puedes hacerte una idea de tu mundo interior. Ahora veamos que significan creencias y deseos:</p>
 			<p><span class="icon_objetivos"></span>Creencias:</p><br>
 			<p>Afirmaciones que se hacen sobre el mundo. Son imaginarios producidos por el análisis de la experiencia propia y ajena (padres, profesores, medios de comunicación, entre otros).</p>
 			<p><span class="icon_objetivos"></span>Deseos:</p><br>
 			<p>Son los ideales arraigados en la subjetividad del individuo, que en ocasiones son inconscientes e irracionales. Abarcan todo tipo de gustos, expectativas, aspiraciones. Ambiciones sobre lo que se quiere ser y hace.</p>
 		</section>

 	`,
        upload: false,
        id: 1,
      },
      {
        content: `

 		<h2 class="ct-socio">→ Actividad 5:</h2><br>
 		<p><span class="icon_objetivos"></span>Escriba una historia de su vida personal que dio origen a algunas creencias y deseos que hay en su vida en este momento.</p>
 		<br><br>
 		<b>Recuerde..</b>
 		<br><br>
 		<p>- Viva libre de pensamientos del pasado que te atormentan.</p>
 		<p>- Está bien ocuparse de planear su futuro, pero no preocuparse por el futuro.</p>
 		<p>- Haga uso de aquello que puede hacer con libertad y responsabilidad.</p>
 		<p>- Evite en la medida de lo posible estar buscando la aprobación.</p>
 		<p>- Tome decisiones responsables.</p>
 		<p>- Afronte las cosas con buen humor.</p>
 		<p>- Aceptese a si mismo.</p>
 		<p>- Establezca buenas relaciones con los demás.</p>
 		<p>- Tenga autodisciplina.</p>
 		<p>- No tenga miedo a los fracasos.</p>
 		<br><br>
 		<b>Evalúo mi experiencia</b>
 		<p><span class="icon_objetivos"></span>En mis palabras defino qué es autoconciencia</p>
 		<p><span class="icon_objetivos"></span>¿Qué fue lo que más me llamó la atención de lo que leí y por qué?</p>
 		<p><span class="icon_objetivos"></span>Por último, respondo a la pregunta ¿De qué soy consciente ahora?</p>

 	`,
        upload: false,
        id: 1,
      },
      {
        content: `

 		<h2 class="ct-socio">→ Actividad 6:</h2><br><br>
 		<b>Lea con detenimiento el siguiente texto y conecte gráficamente las ideas que se relacionan entre los párrafos, luego resuelva las preguntas planteadas. (Autorregulación).</b>
 		<section class="extract_content">
 			<p><span class="icon_objetivos"></span>Autorregulación:</p><br>
 			<p>Es la que hace que podamos dirigir nuestros pensamientos, emociones y conducta hacia la correcta adaptación en el medio y el cumplimiento de nuestros deseos y expectativas en base a las circunstancias contextuales. </p>

 			<p>Las habilidades que fortalecen esta competencia son Manejo de Emociones, postergación de la Gratificación y la Tolerancia a la Frustración. En cuanto a la primera habilidad, manejo de emociones, es la que nos permitirá comprender lo que sentimos y no perder el control ante una situación que nos quite la tranquilidad. La segunda habilidad, postergación de la gratificación, es la capacidad para dejar de lado actividades de satisfacción inmediata, para poder lograr las metas que más adelante nos darán mayor satisfacción. Y por última habilidad, la tolerancia a la frustración es saber diferenciar entre situaciones frustrantes que puedo cambiar y las que están fuera de mi control e identificar qué hacer. (Ministerio de Educación Nacional y Banco Mundial, 2017)</p>
 			<p>Es así como esta competencia, sí la fortaleces, te permitirá saber que puedes rediseñar tus emociones para abordar las situaciones que te alteran, siendo capaz de aceptar de manera flexible cuando las cosas no salen como las esperabas; es por esto que es la autorregulación la que nos permite fortalecer actitudes de nuestra razón y emoción inteligente, también nos ayuda a incrementar la confianza en nosotros mismos, aumentando la esperanza y el optimismo frente a nuestra realidad, pero sobre todo, tener la capacidad potencial para afrontar diferentes adversidades y salir fortalecidos de ellas, a esto también se le llama Resiliencia.</p>
 			<p><span class="icon_objetivos"></span>Resiliencia:</p><br>
 			<p>Es la capacidad potencial que tiene un individuo para afrontar la adversidad y salir fortalecido de ella. Las características suficientes para que a una persona se le pueda llamar resiliente serían: autoestima, autonomía, afrontamiento, conciencia, esperanza, responsabilidad, sociabilidad y tolerancia a la frustración. (Flores, 2013)
 			Retomo las definiciones sobre las habilidades de la persona resiliente, y respondo de acuerdo con mi experiencia, las frases que a continuación encontraré. </p>
 			</section>
 			<br><br>
 			<b>En cuanto al poder del afrontamiento.</b>
 			<br><br>
 			<p><i>Ejemplo: </i>Me considero una persona orientada más a… <i>no querer enfrentar lo que me molesta, desde ahora intentare… buscar otras alternativas para expresar lo que no me gusta.</i></p>
 			<p>Complete las frases según su experiencia:</p>
 			<p><span class="icon_objetivos"></span>Me considero una persona orientada más a … desde ahora intentaré …</p><br>
 			<p><span class="icon_objetivos"></span>Mejoraría más mi mentalidad si …</p><br>
 			<p><span class="icon_objetivos"></span>Afronto mis adversidades con actitud …</p><br>

 			<b>En cuanto a la fuerza de la autonomía.</b>
 			<br><br>
 			<p><i>Ejemplo: </i>Yo construyo mi futuro si… <i>logro ser más responsable y disciplinado con mis tareas y compromisos académicos.</i></p>
 			<p><span class="icon_objetivos"></span>Yo construyo mi futuro si … </p><br>
 			<p><span class="icon_objetivos"></span>Sería más auto disciplinado si … </p><br>
 			<p><span class="icon_objetivos"></span>Podría ser autodidacta si … </p><br>

 			<b>En cuanto a la magia de la autoestima. </b>
 			<br><br>
 			<p><i>Ejemplo: </i>: Me aceptaría a mí mismo si … <i>dejara de pensar en lo que los demás piensan de mí.</i></p>
 			<p><span class="icon_objetivos"></span>Me aceptaría a mí mismo si … </p><br>
 			<p><span class="icon_objetivos"></span>Tendría Autoafirmación si …</p><br>
 			<p><span class="icon_objetivos"></span>Mi gran Propósito es …</p><br>

 			<b>En cuanto a la iluminación de la conciencia. </b>
 			<br><br>
 			<p><span class="icon_objetivos"></span>¿Por qué es tan importante la Conciencia?</p><br>
 			<p><span class="icon_objetivos"></span>¿Qué significa vivir de manera CONSCIENTE?</p><br>
 			<p><span class="icon_objetivos"></span>Una persona es consciente cuando …</p><br>

 			<b>En cuanto al valor de la responsabilidad. </b>
 			<br><br>
 			<p><span class="icon_objetivos"></span>¿De quién dependen las acciones y decisiones, cuando soy responsable?</p><br>
 			<p><span class="icon_objetivos"></span>¿Asumir el logro de mis objetivos o propósitos implica?</p><br>
 			<p><span class="icon_objetivos"></span>Estoy teniendo Responsabilidad cuando…</p><br><br>

 			<b>En cuanto a la formación de la esperanza y del optimismo.</b>
 			<p><i>Ejemplo: </i>¿Cómo puedo intervenir en mis creencias para cambiar, de ser pesimista a ser optimista? T<i>rataré de ver si las cosas negativas que pienso de mí son reales, por ejemplo, pienso que soy mal estudiante, pero sé, que, si me dedicara más, le pediría ayuda a profesores y compañeros, yo podría mejorar… esto me haría más optimista.</i></p>
 			<p><span class="icon_objetivos"></span>¿Cómo puedo intervenir en mis creencias para cambiar, de ser pesimista a ser optimista?</p><br><br>
 			<p><span class="icon_objetivos"></span>¿Cómo puedo fortalecer y mantener mi optimismo?</p><br><br>
 			<p><span class="icon_objetivos"></span>¿Cómo puedo evitar construir pesimismo en ellos?</p><br><br>

 			<b>En cuanto al tesoro de la sociabilidad inteligente. </b>
 			<br><br>
 			<p><span class="icon_objetivos"></span>¿Qué es Sociabilidad?</p><br>
 			<p><span class="icon_objetivos"></span>¿Cómo es tu SOCIABILIDAD?</p><br>
 			<p><span class="icon_objetivos"></span>Tener Sociabilidad me permite mejorar mi…</p><br><br>

 			<b>En cuanto a la Tolerancia a la frustración.</b>
 			<br><br>
 			<p><span class="icon_objetivos"></span>La BAJA Tolerancia a la Frustración es …</p><br>
 			<p><span class="icon_objetivos"></span>Por lo general mi reacción ante los obstáculos es …</p><br>
 			<p><span class="icon_objetivos"></span>Lo que voy a intentar de ahora en adelante para la superación de mis obstáculos es…</p><br><br>

 	`,
        upload: false,
        id: 1,
      },
      {
        content: `
 		<h2 class="ct-socio">→ Actividad 7:</h2><br>
 		<p><b>Lea el siguiente texto y escriba un resumen en una frase, luego desarrolle los ejercicios propuestos <i>(Toma Responsable de Decisiones)</i></b> en un archivo *DOC o PDF y súbalo a la plataforma.</p>
 		<p><b>La toma responsable de decisiones </b>es el proceso de resolución de una situación o problema a partir de la selección de una opción, entre diferentes cursos posibles de acción, comprendiendo y previendo las consecuencias o efectos de la opción elegida.</p>
 		<p>Las habilidades que fortalecen esta competencia son: Pensamiento Creativo, Pensamiento Crítico y Responsabilidad. En cuanto a la primera habilidad, pensamiento creativo, es la que permite interpretar una tarea o situación y cambiar de estrategia en el momento de abordarla. Implica la producción de respuestas inusitadas e ingeniosas a partir de premisas aparentemente desconectadas. La segunda habilidad, pensamiento crítico, es la que permite participar en una actividad con escepticismo reflexivo; implica establecer juicios decididos y autorregulados. Y por última la habilidad responsabilidad, es la que permite comprometerse y actuar en post de la consecución del cumplimiento de una tarea asignada por sí mismo o por otros.</p>

 		<p>A continuación, se presenta el proceso de toma responsable de decisiones en once pasos, conforme a este proceso, leo, reflexiono y pienso en una decisión importante en la que no quedé satisfecho/a con la forma como la asumí. Luego, lo confronto con cada uno de los pasos, describiendo qué hice adecuadamente y qué no. </p>
 		<br><br>
 		<b>Proceso de toma responsable de desiciones</b>
 		<style type="text/css">
 			._enum1{display: inline-block;vertical-align: top;border: 1px solid #333;padding: 5px;}
 			._num1{display: inline-block;vertical-align: top;border: 1px solid #333;padding: 5px;}
 			._displayers{display: table;text-align: left;}
 		</style>
 		<section class="_displayers">
 		<p class="_num1">1 Reconocer el problema</p><br>
 		<p class="_num1">2 Analizar el problema</p><br>
 		<p class="_num1">3 Considerar lo que es importante para mi</p><br>
 		<p class="_num1">4 Buscar alternativas</p><br>
 		<p class="_num1">5 Analizar los recursos de cada alternativa</p><br>
 		<p class="_num1">6 Seleccionar la mejor alternativa</p><br>
 		<p class="_num1">7 Poner la decisión en acción</p><br>
 		<p class="_num1">8 Tomar decisiones adicionales</p><br>
 		<p class="_num1">9 Aceptar la responsabilidad</p><br>
 		<p class="_num1">10 Evaluar los resultados</p><br>
 		<p class="_num1">11 Tener en cuenta estos pasos para una próxima toma responsable de decisiones y reducir tiempos</p><br>
 		</section>
 		<p><span class="icon_objetivos"></span>Confronte con cada uno de los pasos, describiendo qué hizo adecuadamente y qué no.</p><br><br>

 		<section class="_displayers">
 		<p class="_num1">1</p><p class="_enum1"></p><br>
 		<p class="_num1">2</p><p class="_enum1"></p><br>
 		<p class="_num1">3</p><p class="_enum1"></p><br>
 		<p class="_num1">4</p><p class="_enum1"></p><br>
 		<p class="_num1">5</p><p class="_enum1"></p><br>
 		<p class="_num1">6</p><p class="_enum1"></p><br>
 		<p class="_num1">7</p><p class="_enum1"></p><br>
 		<p class="_num1">8</p><p class="_enum1"></p><br>
 		<p class="_num1">9</p><p class="_enum1"></p><br>
 		<p class="_num1">10</p><p class="_enum1"></p><br>
 		<p class="_num1">11</p><p class="_enum1"></p><br>
 		</section>

		 <strong>Suba las actividades 4 a la 7,
		 compiladas en un solo archivo en la plataforma </strong>

 	`,
        upload: true,
        phase: 1,
        id: 1,
      },
      {
        content: `
 		<h1>FASE POSTACTIVA</h1>
 		<img class="divicion_image" src="assets/images/fondos/Fondo_division_mod.png">
 		<h2 class="ct-socio">→ Actividad 8:</h2>

<img src="https://i.postimg.cc/tgbw01Qx/diana-mate.png" title="Recuerda, en esta actividad debes hacer un entregable.">
<ul class="menu_momento_introductivo">

 			<li class="btn_maloka" title="Competencias Socioemocionales"><span><a alt="Competencias Socioemocionales" href=""></a></span></li>

 		</ul>
 		<br>
 		<br>
 		<p><b>LA METÁFORA DEL FUTURO</b></p>
 		<p>Leo con atención algunas metáforas planteadas sobre lo que significa el futuro y luego propongo una personal. <b>(Autoconciencia, Autorregulación, Toma responsable de decisiones)</b></p>
 		<p>La realidad es en parte de cómo la vemos, y en parte lo que hacemos que sea, por lo tanto, requiere tanto hacer como soñar. Sabemos en lo que creemos…</p>
 		<p>Respecto a las metáforas planteadas sobre el futuro, decido cuál es la que más se aproxima a dicha visión. Supongo que es una decisión de opciones múltiples, de opciones forzadas; debo escoger una.</p>

 		<style type="text/css">
 			.centered{text-align: center;}
 		</style>
 		<section class="extract_content">
 			<div class="centered">
 			<b>Opción A</b><br><br>
 			<b>La montaña rusa</b><br><br>
 			<p>El futuro es como una gran montaña rusa, que da vueltas frente a nosotros en la oscuridad, aunque solo podemos ver cada parte al acercarnos a ella. A veces podemos ver a lo lejos al llegar a una cima o una curva; pero el futuro es fijo y determinado. Estamos atrapados en nuestros asientos y nada de lo que sepamos o hagamos cambiará el curso dispuesto para nosotros.</p>
 			<b>Opción B</b><br><br>
 			<b>El gran río</b><br><br>
 			<p>El futuro es como un gran río. La gran fuerza de la historia va fluyendo, arrastrándonos con ella. El curso del río pueden cambiarlo solamente los desastres naturales, como los terremotos y deslizamiento de tierra, o un trabajo humano de proporciones similares. Sin embargo, como personas estamos libres para adaptarnos o transformar el curso de la historia. Mirando hacia el futuro sortearemos los obstáculos y los remolinos, escogiendo el mejor paso entre los rápidos y también construimos herramientas que nos permitan navegar, fluir y salir del río cuando queramos.</p>
 			<b>Opción C</b><br><br>
 			<b>El gran océano</b><br><br>
 			<p>El futuro es un gran océano. Hay muchos destinos posibles y muchas vías diferentes hacia cada destino. Aprovechando las principales corrientes de cambio, manteniendo siempre un ojo avizor y navegando con cuidado en las aguas inexploradas, el buen navegante puede llegar sano y salvo al lugar de su destino; esquivando un huracán u otro desastre impredecible e inevitable.</p>
 			<b>Opción D</b><br><br>
 			<b>Un juego de dados Colosal</b><br><br>
 			<p>El futuro es totalmente al azar, como un juego de dados de colosales proporciones. En cada segundo ocurren cosas que pudieran haber sucedido de otro modo y producir otro futuro. Cómo todo es fortuito o casual, no podemos hacer más que seguir el juego, rogara  a los dioses de la fortuna y disfrutar de la buena suerte que nos pueda tocar.</p>
 			</div>
 		</section>

 		<p><span class="icon_objetivos"></span><b>Indique ¿cuál de las cuatro metáforas descritas se parece más a la idea que tengo del futuro?</b></p>
 		<p>- La montaña rusa.</p>
 		<p>- El gran río.</p>
 		<p>- El gran Océano.</p>
 		<p>- Un juego de dados colosal.</p>

 		<p><span class="icon_objetivos"></span>¿Por qué?</p>
 		<p><span class="icon_objetivos"></span>¿Qué no me convenció de las otras?</p>
 		<p><span class="icon_objetivos"></span>¿Pienso que puede controlar mi futuro?</p>
 		<br><br>
 		<p>Quizás mis respuestas no estén bien desarrolladas porque no he pensado mucho en ellas; pero mi respuesta tiene gran importancia en mi toma de decisiones a menudo determina lo que yo hago. Sigo trabajando sobre mis respuestas; las metáforas pueden serte útiles.</p>
 		<p><b>La metáfora personal</b></p>
 		<p>Ahora creo mi propia metáfora del futuro, o de mi vida, si lo prefiero. ¿Qué describe mejor mi idea? Trato de usar algo que me sea familiar: un entretenimiento, algo favorito, una actividad, un animal preferido. No me preocuparé por usar gran fantasía, luego modelo esa metáfora de manera tridimensional.</p>
 		<p><span class="icon_objetivos"></span>¿Para mí el futuro es como? ____________________________________</p>
 		<p>Conservo <i>esta metáfora y trabajo con ella: la agrando, modifico, cambio u obtengo una nueva. Veo si me puede brindar percepciones de mi visión del futuro, o me ayuda a expandir o modificar dicha visión.</i><br> (Gelatt, 1996)</p>
 		<p>Responda todas las preguntas planteadas en las actividades de esta fase y realice las diferentes actividades.  Compile toda la información en un archivo *.DOC O PDF</p>

 	`,
        upload: true,
        phase: 2,
        id: 1,
      },
    ],
    11: [
      {
        content: `
 		<h1>FASE PREACTIVA O DE EXPLORACIÓN DE SABERES PREVIOS</h1>

 		<p>En esta primera serie de actividades encontrarán un grupo de ejercicios reflexivos que tienen como propósito vincular la experiencia vital de tal modo que nos demos cuenta de que, las competencias socio emocionales son asunto de la vida cotidiana y de la manera en que hacemos conciencia de quiénes somos, a dónde nos dirigimos y en qué mundo queremos vivir.</p>

 		<img class="divicion_image" src="assets/images/fondos/Fondo_division_mod.png">
 		<h2 class="ct-socio">→ Actividad 1:</h2>

<img src="https://i.postimg.cc/tgbw01Qx/diana-mate.png" title="Recuerda, en esta actividad debes hacer un entregable.">
<ul class="menu_momento_introductivo">

 			<li class="btn_maloka" title="Competencias Socioemocionales"><span><a alt="Competencias Socioemocionales" href=""></a></span></li>

 		</ul>
 		<br><br>
 		<p>Reflexiono sobre las preguntas planteadas a partir del poema <b><i>Itaca del poeta Constantino Cavafis</i> (Autoconciencia)</b></p>

 		<section class="extract_content">
 			<p><b><i>Itaca</i></b></p>
 			<p><i>Si vas a emprender el viaje hacia Ítaca,<br>
 				pide que tu camino sea largo,<br>
 				rico en experiencias, en conocimiento. <br>
 				</i></p>
 			<p><i>A Lestrigones y a Cíclopes, <br>
 				o al airado Poseidón nunca temas, <br>
 				no hallarás tales seres en tu ruta <br>
 				Si alto es tu pensamiento y limpia <br>
 				la emoción de tu espíritu y tu cuerpo. <br>
 				</i></p>
 			<p><i>A Lestrigones y a Cíclopes, <br>
 				ni al fiero Poseidón hallarás nunca, <br>
 				si no los llevas dentro de tu alma, <br>
 				si no es tu alma quien ante ti los pone. <br>
 			</i></p>
 			<p><i>Pide que tu camino sea largo. <br>
 			Que numerosas sean las mañanas de verano <br>
 			en que, con placer, felizmente <br>
 			arribes a bahías nunca vistas; <br>
 			detente en los emporios de Fenicia <br>
 			y adquiere hermosas mercancías, <br>
 			madreperla y coral, y ámbar y ébano, <br>
 			perfumes deliciosos y diversos, <br>
 			cuanto puedas invierte en voluptuosos y delicados perfumes; <br>
 			visita muchas ciudades de Egipto <br>
 			y con avidez aprende de sus sabios. <br>
 			</i></p>
 			<p><i>
 				Ten siempre a Ítaca en la memoria. <br>
 				Llegar allí es tu meta. <br>
 				Más no apresures el viaje. <br>
 				Mejor que se extienda largos años; <br>
 				y en tu vejez arribes a la isla <br>
 				con cuanto hayas ganado en el camino, <br>
 				sin esperar que Ítaca te enriquezca. <br>
 			</i></p>
 			<p><i>
 				Ítaca te regaló un hermoso viaje. <br>
 				Sin ella el camino no hubieras emprendido. <br>
 				Más ninguna otra cosa puede darte. <br>
 				Aunque pobre la encuentres, no te engañará Ítaca. <br>
 				Rico en saber y en vida, como has vuelto, <br>
 				comprendes ya qué significan las Ítacas. <br>
 			</i></p>
 		</section>

 		<p><span class="icon_objetivos"></span>Identifica las palabras desconocidas y búscalas en el diccionario.</p>
 		<p><span class="icon_objetivos"></span>¿Cuáles son los Lestigrones y Cíclopes en tu vida?</p>
 		<p><span class="icon_objetivos"></span>¿Cuáles son las bahías nunca vistas que esperas encontrar en tu vida?</p>
 		<p><span class="icon_objetivos"></span>¿Cuáles son tus Ítacas? </p>


 	`,
        upload: false,
        id: 1,
      },
      {
        content: `
 		<h2 class="ct-socio">→ Actividad 2:</h2><br><br>
 		<p><b>Emociones (Autorregulación- Identificación de emociones) </b></p>
 		<p>Lee el siguiente texto sobre la Rueda de las emociones (adaptado de <a target="_blank" href="https://quierocuidarme.dkvsalud.es/ocio-y-bienestar/la-rueda-de-las-emociones">https://quierocuidarme.dkvsalud.es/ocio-y-bienestar/la-rueda-de-las-emociones</a>)</p>
 		<section class="extract_content">
 			<p>El psicólogo americano Robert Plutchik clasificó en 1980 las emociones humanas y las organizó en un recurso visual similar a una flor de ocho pétalos, a la que denominó ‘rueda de las emociones’. Este recurso tiene tres vías distintas, a partir de las cuáles se crean todos los sentimientos posibles: la tipología, el antagonismo y la </p>
 			<img src="https://i.postimg.cc/mkyggC3Y/Flor-SE.png" width="100%">
 			<br><br>
 			<img class="imgfigura" src="../imagenes_2/s11_2_1.jpg" alt=""><br>
 			<i>Nota. Elaboración propia.</i>
 		<br><br>
 		<p>En primer lugar, Plutchik clasifica las emociones en dos niveles. Las básicas son las que considera que tienen una función concreta y adaptativa. No tienen por qué activarse de manera consciente, pero actúan como precedente de ciertos comportamientos que aseguran nuestra supervivencia. Para él son la alegría, la confianza, el miedo, la sorpresa, la tristeza, la aversión y la ira. Las demás emociones las denomina secundarias.</p>
 		<p>¿Cómo definimos las ocho emociones básicas?</p>
 		<p><span class="icon_objetivos"></span><b>Alegría:</b> estado de satisfacción y de bienestar que se activa con acontecimientos positivos tanto de uno mismo como de las circunstancias que lo envuelven.</p>

 		<p><span class="icon_objetivos"></span><b>Confianza:</b> postura subjetiva en la cual se tiene la convicción de que no habrá perjuicios o daños en una determinada situación o luego de una acción propia.</p>7

 		<p><span class="icon_objetivos"></span><b>Miedo:</b> emoción de supervivencia e incertidumbre displacentera, que nace de expectativas asociadas con daños o peligros. Nos hace actuar con cautela con el objetivo de protegernos ante estímulos que suponen una amenaza para nosotros.</p>

 		<p><span class="icon_objetivos"></span><b>Sorpresa:</b> reacción que se activa ante cualquier hecho imprevisto o inesperado.</p>
 		<p><span class="icon_objetivos"></span><b>Aversión o repugnancia: </b> emoción en la que se expresa la voluntad de rechazo o de evitar algo o a alguien.</p>

 		<p><span class="icon_objetivos"></span><b>Tristeza:</b> estado de angustia que se activa ante una pérdida y que abate nuestro estado de ánimo. Suele conducir a una necesidad de apoyo social. </p>

 		<p><span class="icon_objetivos"></span><b> Ira o enojo: </b> respuesta a una ofensa, una frustración, un engaño o cuando nuestro deseo se ve bloqueado por alguna causa. Lo sentimos especialmente cuando percibimos que ha sido una acción deliberada.</p>

 		<p><span class="icon_objetivos"></span><b>Anticipación:</b> expectativa objetiva, basada en la experiencia y la información previa que se tiene de hechos o situaciones.</p>

 		<p>En segundo lugar, Plutchik habla de antagonismos. En este sentido, crea cuatro ejes de oposición, formados por las rivalidades entre alegría y tristeza, anticipación y sorpresa, asco y confianza, y miedo e ira. Por último, juega con la intensidad de los ocho colores que usa: cuanto más intensa es la emoción, más se parece a la emoción básica y, por tanto, más cerca aparecerá del centro de la rueda de las emociones.</p>

 		<p>Combinación de emociones compuestas para crear la rueda de las emociones a su vez, la combinación de las emociones básicas da lugar a un total de veinticuatro emociones compuestas. Son las que el psicólogo clasificó en tres diadas diferentes, que describen las emociones menos frecuentes:</p>

 		<p><b>Primera diada: combinación de emociones básicas que se encuentran al lado en la rueda de las emociones</b></p>
 		<p>
 			 	• Alegría + Confianza = Amor <br>
 				• Alegría + Anticipación = Optimismo<br>
 				• Confianza + Miedo = Sumisión<br>
 				• Miedo + Sorpresa = Alarma<br>
 				• Sorpresa + Tristeza = Decepción<br>
 				• Tristeza + Asco = Remordimiento<br>
 				• Asco + Ira = Desprecio<br>
 				• Ira + Anticipación = Agresión<br>
 		</p>

 		<p><b>Segunda diada: combinación de las emociones básicas con un grado de separación</b></p>
 		<p>
 			 	• Alegría + Miedo = Culpa<br>
 				• Alegría + Ira = Orgullo<br>
 				• Confianza + Sorpresa = Curiosidad<br>
 				• Confianza + Anticipación = Fatalismo<br>
 				• Miedo + Tristeza = Desesperación<br>
 				• Sorpresa + Asco = Incredulidad<br>
 				• Tristeza + Ira= Envidia<br>
 				• Asco + Anticipación = Cinismo<br>
 				• Ira + Tristeza = Envidia
 		</p>

 		<p><b>Tercera diada: mezcla de las emociones básicas con dos grados de separación</b></p>
 		<p>
 			 	• Alegría + Sorpresa = Deleite<br>
 				• Alegría + Asco= Morbosidad<br>
 				• Confianza + Tristeza = Sentimentalismo<br>
 				• Confianza + Ira = Dominación<br>
 				• Miedo + Asco = Vergüenza<br>
 				• Miedo + Anticipación = Ansiedad<br>
 				• Sorpresa + Ira = Indignación<br>
 				• Tristeza + Anticipación = Pesimismo<br>
 		</p>
 		</section>

 		<p><span class="icon_objetivos"></span><b>selecciona aquellas emociones que has sentido y escribe al frente en una palabra la situación que las causó. </b></p>

 		<form>
 			<p><input class="_SetAllowedNumbersAtList_" type="checkbox" name=""><label> Éxtasis</label></p>
 			<p><input class="_SetAllowedNumbersAtList_" type="checkbox" name=""><label> Vigilancia</label></p>
 			<p><input class="_SetAllowedNumbersAtList_" type="checkbox" name=""><label> Rabia</label></p>
 			<p><input class="_SetAllowedNumbersAtList_" type="checkbox" name=""><label> Aversión</label></p>
 			<p><input class="_SetAllowedNumbersAtList_" type="checkbox" name=""><label> Dolor</label></p>
 			<p><input class="_SetAllowedNumbersAtList_" type="checkbox" name=""><label> Asombro</label></p>
 			<p><input class="_SetAllowedNumbersAtList_" type="checkbox" name=""><label> Terror</label></p>
 			<p><input class="_SetAllowedNumbersAtList_" type="checkbox" name=""><label> Admiración</label></p>
 			<p><input class="_SetAllowedNumbersAtList_" type="checkbox" name=""><label> Alegria</label></p>
 			<p><input class="_SetAllowedNumbersAtList_" type="checkbox" name=""><label> Confianza</label></p>
 			<p><input class="_SetAllowedNumbersAtList_" type="checkbox" name=""><label> Miedo</label></p>
 			<p><input class="_SetAllowedNumbersAtList_" type="checkbox" name=""><label> Sorpresa</label></p>
 			<p><input class="_SetAllowedNumbersAtList_" type="checkbox" name=""><label> Tristeza</label></p>
 			<p><input class="_SetAllowedNumbersAtList_" type="checkbox" name=""><label> Repugnancia</label></p>
 			<p><input class="_SetAllowedNumbersAtList_" type="checkbox" name=""><label> Enojo</label></p>
 			<p><input class="_SetAllowedNumbersAtList_" type="checkbox" name=""><label> Anticipación</label></p>
 			<p><input class="_SetAllowedNumbersAtList_" type="checkbox" name=""><label> Optimismo</label></p>
 			<p><input class="_SetAllowedNumbersAtList_" type="checkbox" name=""><label> Serenidad</label></p>
 			<p><input class="_SetAllowedNumbersAtList_" type="checkbox" name=""><label> Amor</label></p>
 			<p><input class="_SetAllowedNumbersAtList_" type="checkbox" name=""><label> Aceptación</label></p>
 			<p><input class="_SetAllowedNumbersAtList_" type="checkbox" name=""><label> Sumisión</label></p>
 			<p><input class="_SetAllowedNumbersAtList_" type="checkbox" name=""><label> Preocupación</label></p>
 			<p><input class="_SetAllowedNumbersAtList_" type="checkbox" name=""><label> Temor</label></p>
 			<p><input class="_SetAllowedNumbersAtList_" type="checkbox" name=""><label> Distracción</label></p>
 			<p><input class="_SetAllowedNumbersAtList_" type="checkbox" name=""><label> Desaprobación</label></p>
 			<p><input class="_SetAllowedNumbersAtList_" type="checkbox" name=""><label> Pensativo</label></p>
 			<p><input class="_SetAllowedNumbersAtList_" type="checkbox" name=""><label> Remordimiento</label></p>
 			<p><input class="_SetAllowedNumbersAtList_" type="checkbox" name=""><label> Aburrimiento</label></p>
 			<p><input class="_SetAllowedNumbersAtList_" type="checkbox" name=""><label> Desprecio</label></p>
 			<p><input class="_SetAllowedNumbersAtList_" type="checkbox" name=""><label> Molestia</label></p>
 			<p><input class="_SetAllowedNumbersAtList_" type="checkbox" name=""><label> Agresividad</label></p>
 			<p><input class="_SetAllowedNumbersAtList_" type="checkbox" name=""><label> Interés</label></p>
 			<p><input class="_SetAllowedNumbersAtList_" type="checkbox" name=""><label> Optimismo</label></p>
 		</form>


 	`,
        upload: false,
        id: 1,
      },
      {
        content: `
 		<h2 class="ct-socio">→ Actividad 3:</h2><br><br>
 		<br><br>
 		<b>(Toma responsable de decisiones)</b>
 		<p>A continuación encuentra una ficha que debe desarrollarse a través de un trabajo en grupo organizado por el profesor.</p>
 		<p><span class="icon_objetivos"></span>Imagina la situación, distribúyanse los personajes, piensen en cómo se podría representar…, los comentarios entre ustedes, la situación… (Escribe el diálogo para ayudar en la tarea). </p>
 		<br><br>
 		<b>SITUACIÓN</b>
 		<p>Han terminado las clases del día y con tu grupo de amigos van al parque a hablar de sus cosas y a pasar la tarde. Sentados en un banco, uno de ustedes arma un porro y lo ofrece al resto. Va pasando de boca en boca, hasta que llega a uno que ha decidido no fumar. No lo pueden creer y lo animan a que esté abierto a nuevas sensaciones y pegue una probada. ¿Qué podría hacer, decir o pensar para no acabar fumando? Describe la situación, de tal manera que se parezca a la vida real. Escribe los comentarios que se pueden llegar a hacer para que un compañero pruebe el porro y también lo que tiene que pensar-hacer-decir la persona que no quiere fumar, para manejar la presión del grupo. Piensa qué puede llegar a sentir esta persona al hacer la contraria al grupo, y qué tiene que pensar en caso de sentirse mal. Escribe una reflexión a la situación y a las maneras de no sentirse presionado por los demás.</p>

 		<p><span class="icon_objetivos"></span>Escribe una reflexión a la situación y a las maneras de no sentirse presionado por los demás.</p> <br><br>


 	`,
        upload: true,
        phase: 0,
        id: 1,
      },
      {
        content: `
 		<h1>FASE INTERACTIVA</h1>
 		<p>Este segundo grupo de actividades presentan una serie de conceptos, definiciones y categorías que te van a permitir comprender mejor el significado de las competencias socio emocionales y vincularlo significativamente con los hallazgos de la fase anterior.</p>
 		<img class="divicion_image" src="assets/images/fondos/Fondo_division_mod.png">
 		<h2 class="ct-socio">→ Actividad 4:</h2>

<img src="https://i.postimg.cc/tgbw01Qx/diana-mate.png" title="Recuerda, en esta actividad debes hacer un entregable.">
<ul class="menu_momento_introductivo">

 			<li class="btn_maloka" title="Competencias Socioemocionales"><span><a alt="Competencias Socioemocionales" href=""></a></span></li>

 		</ul>
 		<br><br>
 		<p>Realizo los siguientes ejercicios de autoreflexión (Autoconciencia).</p>
 		<br><br>
 		<p><b>SOBRE EL ESTRÉS</b></p>
 		<p>El estrés es cómo vemos o percibimos la falta de recursos para resolver un desafío importante en nuestra vida. Mientras nos veamos CON MENOS RECURSOS O INCAPAZ DE AFRONTAR LAS ADVERSIDADES O DESAFÍOS más estresado me pondré. Los estresores son los que detonan al estrés. Los estresores pueden ser: eventos, personas, cosas y más. Generalmente no podemos quitarnos a los estresores, pero nosotros podemos disminuir el estrés que nos causa por medio de cambiar la forma de verlos, la forma de vernos y la forma de ver nuestros recursos.</p>
 		<p>Clasifico mis estresores en tres grupos y los escribo en cada espacio:</p>
 		<p><span class="icon_objetivos"></span>Estresores personales: (Familia, Hogar, Relaciones, Salud...)</p>
 		<p><span class="icon_objetivos"></span>Estresores relacionados con tus tareas:</p>
 		<p><span class="icon_objetivos"></span>Estresores relacionados con otros aspectos:</p>
 		<p>Ya que me di cuenta de que los estresores estarán presentes a lo largo de mi vida, así como las adversidades, ahora en el siguiente cuadro debo identificar las fuentes de estrés en mi entono, al frente de cada una que recursos tengo para disminuirlo:</p><br>
 		<img class="tabla" src="https://i.postimg.cc/FKHWW4nN/imagen.png" >
 		<br>
 		<p><b>Recuerda</b></p>
 		<p>Si quiero tener determinación y avanzar en la consecución de mis sueños tengo en cuenta:</p>
 		<p><span class="icon_objetivos"></span>Yo soy el/la responsable de las decisiones que tomo sobre mi vida.</p>
 		<p><span class="icon_objetivos"></span>Establezco metas y horizontes de vida.</p>
 		<p><span class="icon_objetivos"></span>Confio en mis capacidades o me animo  a desarrollar  nuevas habilidades.</p>
 		<p><span class="icon_objetivos"></span>Me apoyaré en personas con la que pueda construir mi proyecto de vida.</p>
 		<p><span class="icon_objetivos"></span>"No lo deseo... lo hago".</p>


 	`,
        upload: false,
        id: 1,
      },
      {
        content: `
 		<h2 class="ct-socio">Actividad 5:</h2><br><br>
 		<p>Vea el video, lea el texto y a continuación y responda las siguientes preguntas</p>
 		<iframe width="560" height="315" src="https://www.youtube.com/embed/X-S-a0cQB2s" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe><br>
 		<a href="https://www.youtube.com/watch?v=X-S-a0cQB2s">https://www.youtube.com/watch?v=X-S-a0cQB2s</a>
 		<br>
 		<p><b>El Cerebro Inconsciente - Posponer la Recompensa</b></p><br><br>
 		<p>El término postergación de la gratificación hace referencia a la capacidad del ser humano de inhibir su conducta y deseos actuales en pos de obtener una ventaja o beneficio mayor o más apetecible en un futuro. La capacidad de postergar la gratificación nos permite controlar nuestros impulsos básicos y ajustar nuestra conducta a nuestras metas y expectativas. La postergación de la gratificación depende del autocontrol del individuo, de la capacidad de gestionar sus recursos cognitivos y emocionales. Postergar la gratificación no se da solo ante estímulos físicos, sino que también aparece dicha demora en elementos cognitivos, emocionales y conductuales. Por ejemplo, no explotar con alguien que nos ha enfurecido con tal de no perjudicar la relación o gestionar la situación correctamente.
 		</p><br>
 		<p><span class="icon_objetivos"></span>Escribe tres aprendizajes que encuentras en el video y la lectura.</p>
 		<p><span class="icon_objetivos"></span>¿Cómo puedes aplicar los aprendizajes en la vida cotidiana?</p>
 		<p><span class="icon_objetivos"></span>¿Qué estarías dispuesto (a) a sacrificar ahora con tal de obtener una recompensa mayor?</p>


 	`,
        upload: false,
        id: 1,
      },
      {
        content: `
 		<h2 class="ct-socio">→ Actividad 6:</h2><br><br>
 		<p>Leo el siguiente texto y subrayo las ideas clave <b>(Toma Responsable de Decisiones)</b></p> <br><br>
 		<p>El pensamiento crítico es ese modo de pensar – sobre cualquier tema, contenido o problema – en el cual el pensante mejora la calidad de su pensamiento al apoderarse de las estructuras inherentes del acto de pensar y al someterlas a estándares intelectuales.</p>
 		<p>En resumen, el pensamiento crítico es autodirigido, autodisciplinado, autorregulado y auto-corregido. Supone someterse a rigurosos estándares de excelencia y dominio consciente de su uso. Implica comunicación efectiva y habilidades de solución de problemas y un compromiso de superar el egocentrismo y socio centrismo natural del ser humano.</p><br><br>
 		<b>Una lista de chequeo para razonar críticamente</b> <br><br>

 		<p><span class="icon_objetivos"></span>
 		<b>Todo razonamiento tiene un PROPÓSITO.</b> <br>
 		<span>
 			- Tómese el tiempo necesario para expresar su propósito con claridad. <br>
 			- Distinga su propósito de otros propósitos relacionados. <br>
 			- Verifique periódicamente que continúa enfocado. <br>
 			- Escoja propósitos realistas y significativos. <br>
 		</span>
 		</p>

 		<p><span class="icon_objetivos"></span>
 		<b>Todo razonamiento es un intento de SOLUCIONAR un PROBLEMA, RESOLVER una PREGUNTA o EXPLICAR algo.</b> <br>
 		<span>
 			- Tómese el tiempo necesario para expresar la pregunta en cuestión. <br>
 			- Formule la pregunta de varias formas para clarificar su alcance. <br>
 			- Seccione la pregunta en subpreguntas.  <br>
 			- Identifique si la pregunta tiene solo una respuesta correcta, si se trata de una opinión o si requiere que se razone desde diversos puntos de vista. <br>
 		</span>
 		</p>

 		<p><span class="icon_objetivos"></span>
 		<b>Todo razonamiento se fundamenta en SUPUESTOS. </b> <br>
 		<span>
 			- Identifique claramente los supuestos y determine si son justificables.<br>
 			- Considere cómo sus supuestos dan forma o determinan su punto de vista. <br>
 		</span>
 		</p>

 		<p><span class="icon_objetivos"></span>
 		<b>Todo razonamiento se hace desde una PERSPECTIVA.</b> <br>
 		<span>
 			- Identifique su punto de vista o perspectiva.<br>
 			- Busque otros puntos de vista e identifique sus fortalezas y sus debilidades.<br>
 			- Esfuércese en ser imparcial al evaluar todos los puntos de vista. <br>
 		</span>
 		</p>

 		<p><span class="icon_objetivos"></span>
 		<b>Todo razonamiento se fundamenta en DATOS, INFORMACIÓN y EVIDENCIA. </b> <br>
 		<span>
 			- Limite sus afirmaciones a aquellas apoyadas por los datos que tenga. <br>
 			- Recopile información contraria a su posición tanto como información que la apoye. <br>
 			- Asegúrese que toda la información usada es clara, precisa y relevante a la pregunta en cuestión. <br>
 			- Asegúrese que ha recopilado suficiente información. <br>
 		</span>
 		</p>

 		<p><span class="icon_objetivos"></span>
 		<b>Todo razonamiento se expresa mediante CONCEPTOS e IDEAS que, simultáneamente, le dan forma. </b> <br>
 		<span>
 			- Identifique los conceptos claves y explíquelos con claridad. <br>
 			- Considere conceptos o definiciones alternos de los conceptos. <br>
 			- Asegúrese que usa los conceptos con cuidado y precisión. <br>
 		</span>
 		</p>

 		<p><span class="icon_objetivos"></span>
 		<b>Todo razonamiento contiene INFERENCIAS o INTERPRETACIONES por las cuales se llega a CONCLUSIONES y que dan significado a los datos. </b> <br>
 		<span>
 			- Infiera sólo aquello que se desprenda de la evidencia. <br>
 			- Verifique que las inferencias sean consistentes entre sí. <br>
 			- Identifique las suposiciones que lo llevan a formular sus inferencias. <br>
 		</span>
 		</p>

 		<p><span class="icon_objetivos"></span>
 		<b>Todo razonamiento tiene o fin o tiene IMPLICACIONES y CONSECUENCIAS. </b> <br>
 		<span>
 			- Esboce las implicaciones y consecuencias de su razonamiento. <br>
 			- Identifique las implicaciones positivas y negativas. <br>
 			- Considere todas las consecuencias posibles. <br>
 		</span>
 		</p>

 		<p><em>Tomado de: Paul, R y Elder L. (2003) L. Una mini-guía para el pensamiento crítico, conceptos y herramientas. Fundación para el Pensamiento Crítico</em></p>

 		<p>Con base en la lista de chequeo encuentra una situación que genere debate: embarazo adolescente, legalización del consumo de droga, proceso de paz, otra que sea de su interés, aplica cada uno de los pasos y prepara una exposición de no más de dos minutos para ser presentada ante los compañeros. Tu profesor te acompañará durante este proceso.</p>


 	`,
        upload: true,
        phase: 1,
        id: 1,
      },
      {
        content: `
 		<h1>Fase postactiva o de aplicación</h1>
 		<p>Este tercer momento busca que puedas aplicar y demostrar el desarrollo de tus competencias socioemocionales a través de una actividad que recoge las tres categorías que hemos venido trabajando y que tiene como eje articulador el emprendimiento como actitud de vida que produce beneficios para la sociedad y requiere de una persona con desarrolladas competencias socioemocionales.</p>

 		<h2 class="ct-socio">→ Actividad 7.</h2>

<img src="https://i.postimg.cc/tgbw01Qx/diana-mate.png" title="Recuerda, en esta actividad debes hacer un entregable.">
<ul class="menu_momento_introductivo">

 			<li class="btn_maloka" title="Competencias Socioemocionales"><span><a alt="Competencias Socioemocionales" href=""></a></span></li>

 		</ul>
 		<br><br>
 		<p>Leo la siguiente información y resuelvo las actividades propuestas.</p>
 		<p>El Ministerio de Educación Nacional, presenta el emprendimiento como una forma de pensar, razonar y actuar centrada en las oportunidades, planteada con visión global y llevada a cabo mediante un liderazgo equilibrado y la gestión de un riesgo calculado, su resultado es la creación de valor que beneficia a la empresa, la economía y la sociedad. (Ley 1014 de 2006, art. 1º); así mismo, destaca que la actitud emprendedora es la disposición personal para actuar de forma proactiva frente a cualquier situación de la vida. Esta actitud genera ideas innovadoras que pueden materializarse en proyectos o alternativas para la satisfacción de necesidades y solución de problemáticas. (Ministerio de Educación Nacional Guía 39, 2012).</p>
 		<p><span class="icon_objetivos"></span> <strong>¿Qué es la actitud emprendedora?</strong></p>

 		<img src="../imagenes_2/s11_7_1.png" alt="" style="width: 100%; height: auto;">
 		<p>A continuación, se presentan las actitudes emprendedoras</p>
 		<img class="imgtabla" src="../imagenes_2/s11_7_2.jpg" alt="">

 		<p><span class="icon_objetivos"></span> Enumera de 1 a 9, siendo 1 la mayor y 9 la menor, las actitudes emprendedoras que tiene en este momento y explique su respuesta</p>

 		<p><input type="checkbox" style="height: 1.6rem; width: 1.6rem;"><label> Pensamiento flexible</label></p>
 		<p><input type="checkbox" style="height: 1.6rem; width: 1.6rem;"><label> Creatividad</label></p>
 		<p><input type="checkbox" style="height: 1.6rem; width: 1.6rem;"><label> Auto aprendizaje y gestión del conocimiento</label></p>
 		<p><input type="checkbox" style="height: 1.6rem; width: 1.6rem;"><label> Identificación de oportunidades y recursos en el entorno</label></p>
 		<p><input type="checkbox" style="height: 1.6rem; width: 1.6rem;"><label> Innovación</label></p>
 		<p><input type="checkbox" style="height: 1.6rem; width: 1.6rem;"><label> Materialización de ideas en proyectos</label></p>
 		<p><input type="checkbox" style="height: 1.6rem; width: 1.6rem;"><label> Capacidad para asumir riesgos</label></p>
 		<p><input type="checkbox" style="height: 1.6rem; width: 1.6rem;"><label> Comportamiento autorregulado</label></p>
 		<p><input type="checkbox" style="height: 1.6rem; width: 1.6rem;"><label> Visión del futuro</label></p>
 		<br>
 		<p><span class="icon_objetivos"></span> <strong>Explique su respuesta</strong></p>


 	`,
        upload: false,
        id: 1,
      },
      {
        content: `

 		<h2 class="ct-socio">→ Actividad 8.</h2> <br><br>
 		<p>Lee los siguientes casos de éxito de jóvenes emprendedores y después reflexiona a las preguntas que aparecen a continuación</p>
 		<h3>CASOS DE ÉXITO</h3>

 		<section class="extract_content">
 			<h4 style="text-align: left; font-weight: 800; color: #8C613C;"><em>PRIMER CASO DE ÉXITO</em></h4>
 			<p>UN PROYECTO PRODUCTIVO MÁS ALLÁ DEL DEBER</p>
 			<p>El Ingeniero Agrónomo regresó a su municipio para poner en práctica todo lo aprendido en Utopía. Él es del departamento de Norte de Santander. Esto hace parte del Catatumbo, zona que históricamente ha sido fuertemente afectada por el conflicto armado del país, lugar donde como estudiante lasallista desarrolló su proyecto productivo en cultivo de sandía.</p>
 			<p>Durante la ejecución ha tenido contratiempos como lo son factores climáticos adversos, robo de la producción y bajos precios en el mercado. El desarrollo del primer ciclo de sandía se ejecutó de acuerdo a lo proyectado, se realizó la adecuación de terreno con maquinaria agrícola, luego se instaló el sistema de riego el cual fue novedad en la zona ya que normalmente no se maneja. En esta primera etapa se tuvo que realizar resiembra, debido a una mala práctica agrícola de un lote vecino, pero con un buen manejo de plagas y enfermedades se logró el potencial esperado de las plantas. En este momento está próximo a empezar a sembrar el segundo ciclo del cultivo.</p>
 			<p>El ingeniero es un apasionado por la tierra y no se ha dejado vencer por estos altibajos, puesto que su objetivo es contribuir al desarrollo de su zona de origen. Con esto en mente, ha desarrollado actividades de extensión de la mano de asociaciones en su municipio y ha capacitado a más de 140 agricultores. Dentro de sus proyectos están las escuelas de campo donde forma a los agricultores con demostraciones de método, acompañamiento técnico-productivo y jornadas para compartir experiencias. También empezó a realizar talleres con los estudiantes de un colegio, donde él estudió su bachillerato, enfocándose en cuatro líneas de trabajo.</p>
 			<p>1. Conformación de nuevas líneas productivas:</p>
 			<p>El método que adquirió en el campus de Utopía donde se busca diversificar la producción. Para este ejercicio se conformaron cuatro líneas productivas la cuales se dividieron en: trabajo con galpón de pollos de engorde; realización de compostaje y abonos orgánicos; cultivo de huertas orgánicas y ejecución de un banco de leguminosas. Durante todo el proceso se realiza acompañamiento técnico y cuenta con el apoyo de un granjero que dispone el Hogar Juvenil Campesino.</p>
 			<p>2. Capacitación teórico-práctica:</p>
 			<p>Una vez conformadas las líneas productivas capacita en el manejo de los residuos orgánicos. Durante este proceso, explica la importancia de la materia orgánica, sus propiedades y los usos adecuados para aprovecharla al máximo. Por otro lado, se realiza una pequeña capacitación en la utilización del motocultor para que luego sea empleado en las huertas orgánicas.</p>
 			<p>3. Bibliotecas rurales:</p>
 			<p>El programa de bibliotecas rurales es un proyecto de la Universidad de La Salle que busca recopilar el patrimonio cultural de la región, con la gestión del ingeniero, se vinculó este programa al Hogar Juvenil donde cada mes se lleva a cabo una jornada de lectura con los estudiantes. Además, se elaboró un plan de trabajo con los jóvenes para que trabajen en la recopilación del patrimonio cultural junto con sus familias, aprovechando que los estudiantes son de diferentes veredas del corregimiento.</p>
 			<p>El Ingeniero Agrónomo es un verdadero ejemplo para toda la comunidad donde demuestra que, con esfuerzo, dedicación y compartiendo su conocimiento se puede cambiar el futuro de una población golpeada por el conflicto armado colombiano y que ahora quiere ser reconocida por su compromiso en la construcción de la paz, la cual pasa, por la mano de sus campesinos. </p>
 		</section>
 		<p style="text-align: right;"><em>Tomado de: (Universidad de la Salle, 2018)</em></p>



 	`,
        upload: false,
        id: 1,
      },
      {
        content: `

 		<section class="extract_content">
 			<h4 style="text-align: left; font-weight: 800; color: #8C613C;"><em>SEGUNDO CASO DE ÉXITO</em></h4>
 			<p>“COMPROAGRO”, LA PÁGINA WEB COLOMBIANA QUE FUNCIONA COMO UNA PLAZA DE MERCADO</p>
 			<p>Una página web es el mercado digital donde los pequeños agricultores se conectan directamente con los compradores, sin intermediarios. Una iniciativa que une el potencial de la tecnología con el potencial.</p>
 			<p>Ginna Alejandra Jiménez y Brayan Fernando Jiménez apenas llegan a los 20 años, pero desde ya pueden llamarse a sí mismos como impulsores de la tecnología en el agro colombiano. Desde su natal Toca (Boyacá) dirigen ‘Comproagro’, una plataforma que elimina las especulaciones en los precios y buscan aumentar los ingresos de los campesinos colombianos.</p>
 			<p>La familia de Ginna y Fernando se ha dedicado por años al tema de la agricultura y en especial al cultivo de la cebolla. Muchas veces se vieron en aprietos económicos porque no lograban vender sus cosechas a buen precio; en ocasiones no se recuperaba la inversión o la ganancia era tan poca que no dejaba para los gastos diarios de la familia de nuestros campesinos. </p>
 			<p>Con esta problemática en mente y apenas 15 años, Ginna y su hermano decidieron participar en una convocatoria de Apps.CO que les permitió contar con el apoyo de un tutor y así perfeccionar la idea de ‘Comproagro’. En un principio buscaban a apoyar tan solo a diez familias campesinas de su zona pero que hoy ya cuentan por miles.</p>
 			<p>“Hacemos esto para ayudar a nuestra comunidad, y también porque queremos ayudarnos como productores. Queremos continuar porque somos jóvenes emprendedores y queremos seguir adelante, aprovechando las oportunidades que nos van llegando gracias al programa”, explica Brayan Jiménez.</p>
 			<p>¿Cómo funciona ‘Comproagro’?</p>
 			<p>La plataforma funciona como una red social, cada agricultor crea su perfil, sube las fotos de sus productos, cuenta cada cuánto los produce y su ubicación.</p>
 			<p>A través de www.comproagro.com las personas pueden comprar directamente los productos del campo como la papa, la cebolla o el queso. Si alguien está interesado puede buscar el producto que necesita y la página les arroja los que se están ofreciendo en esos momentos.</p>
 			<p>‘Comproagro’, sin intermediarios</p>
 			<p>Los intermediarios acostumbran a ofrecer un precio a los agricultores para luego vender el producto por dos o tres veces su valor inicial. Sin esta parte de la cadena del negocio, los campesinos reciben esta ganancia ya aumentan sus ingresos.</p>
 			<p>Actualmente, ‘Comproagro’ maneja alrededor de 12 mil usuarios ubicados en 29 departamentos de Colombia. Para 2018, Ginna planea ampliar la plataforma a través de una aplicación y agregar el método de pago en línea.</p>
 		</section>
 		<p style="text-align: right;"><em>Tomado de: (Canal 13, 2019)</em></p>
 		<br>
 		<section class="extract_content">
 			<h4 style="text-align: left; font-weight: 800; color: #8C613C;"><em>TERCER CASO DE ÉXITO</em></h4>
 			<p>EL EMPRENDEDOR COLOMBIANO QUE ESCALA CON PRODUCTOS A BASE DE PANELA</p>
 			<p>El caleño Tomás Cruz, que ha venido posicionando las bebidas Gur Vital, sueña con poner en el mercado "muchos productos más" derivados de la panela, que compone una agroindustria de 350.000 empleos a nivel nacional.</p>
 			<p>Heredar un arraigo de sus abuelos y de una región entera dedicada a la caña de azúcar determinó a Tomás Cruz cuando estudiaba ingeniería industrial en la Universidad estatal de Luisiana en Estados Unidos.</p>
 			<p>En esa época tuvo una conexión emocional al encontrarse con un producto a base de caña de azúcar.</p>
 			<p>Pertenece a la cuarta generación de una familia que ha vivido siempre de la panela. Tienen dos trapiches en el Valle del Cauca, actividad en la que han estado durante cerca de 100 años.</p>
 			<p>El producto que vio no le gustó, pero le quedó flotando en su mente la idea de hacer algo con valor agregado.</p>
 			<p>Luego de graduarse de la universidad y trabajar por un tiempo en Miami, decidió volver a Colombia. Junto con un ingeniero de alimentos desarrolló unas bebidas y con su hermana, Liliana Cruz, estructuró la nueva compañía.</p>
 			<p>Gur Vital hoy tiene dos líneas de bebidas, unas funcionales y otras hidratantes, que ganan terreno a nivel nacional. La panela se llama Gur en India.</p>
 			<p>Tomás recuerda que hace tres años, cuando comenzaron, el futuro parecía diferente. Pero hoy reconoce que han crecido “bastante”, tras re direccionar la estrategia de la compañía, luego de que la seleccionaron en la convocatoria de capital semilla del programa Aldea de Impulsa Colombia.</p>
 			<p>El nuevo direccionamiento de la empresa les ha permitido entrar a cadenas nacionales, colegios y tiendas saludables. Pronto quisieran arrancar un proyecto de exportación para llegar a Canadá, Estados Unidos y Europa.</p>
 			<p>Con esa idea están empoderando a campesinos en trapiches de varios municipios del Valle del Cauca para crear más productos a base de panela.</p>
 			<p>Con una materia prima certificada orgánicamente, Cruz expresa que a futuro harán compotas, geles, caramelos dulces, blandos y gomas que están desarrollando para sacar al mercado gradualmente.</p>
 			<p>“La panela es la forma más pura del azúcar; es más saludable porque no pasa el proceso de refinación, lo que se ajusta con la tendencia mundial de tener alternativas saludables", cuenta.</p>
 			<p>Cruz sueña con una invasión masiva de productos derivados de la panela, que compone una agroindustria de 350.000 empleos a nivel nacional.</p>
 			<p>Con su empresa se siente un abanderado de la alimentación saludable.</p>
 			<p>Las bebidas funcionales con jugo de caña orgánica refrescan con sabores limón y piña. La línea de bebidas hidratantes busca atrapar el mercado de las personas que hacen actividad física para reemplazar la pérdida de fluidos, sales minerales o electrolitos durante el ejercicio.</p>
 		</section>
 		<p style="text-align: right;"><em>Tomado de: (Revista Dinero, 2019)</em></p>



 	`,
        upload: false,
        id: 1,
      },
      {
        content: `
 		<h4 style="text-align: left; font-weight: 800; color: #8C613C;">PREGUNTAS DE REFLEXIÓN</h4>
 		<p><span class="icon_objetivos"></span> <strong>¿Cuál de los 3 casos me gusto más? ¿Por qué? </strong></p>
 		<p><span class="icon_objetivos"></span> <strong>¿Qué competencias socioemocionales tenían los protagonistas de las historias? ¿Yo podría vivir una historia como las descritas anteriormente? </strong></p>
 		<p><span class="icon_objetivos"></span> <strong>De lo que he analizado y leído, ¿Cuáles son las dificultades que tuvieron que sortear los protagonistas de las historias, qué papel jugaron las competencias socioemocionales? ¿Cómo las habría sorteado yo? </strong></p>
 		<p><span class="icon_objetivos"></span> <strong>Escribo 3 diferencias y 3 similitudes de los emprendedores presentados y mi situación </strong></p>
 		<p><span class="icon_objetivos"></span> <strong>Si pudiera elegir sin pensar en los obstáculos, ¿Qué proyecto de emprendimiento desarrollaría en mi territorio? </strong></p>
 		<p><span class="icon_objetivos"></span> <strong>Si pudiera elegir sin pensar en los obstáculos, ¿Qué proyecto emprendería con mi familia o con mi comunidad? </strong></p>
 		<p><span class="icon_objetivos"></span> <strong>¿Qué me falta para empezar un proyecto deseado? </strong></p>
 		<p><span class="icon_objetivos"></span> <strong>¿Qué estrategias me servirían para ejecutar el proyecto deseado? </strong></p>

 	`,
        upload: true,
        phase: 2,
        id: 1,
      },
    ],
  };

  firstPage: any = false;
  indexPage: any;
  lastPage: any = false;

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private route: ActivatedRoute,
    private modal: NgbModal,
    private evidence: EvidenceUseCase
  ) {
    this.uploadForm = this.fb.group({
      file: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(async (params: Params) => {
      this.grade = params.grade;
      this.page = parseInt(params.page);


      if (this.page == 1) {
        this.firstPage = true;
      } else {
        this.firstPage = false;
      }

      if (this.page == this.modules[this.grade].length) {
        this.lastPage = true;
      } else {
        this.lastPage = false;
      }

      this.indexPage = `${this.page}/${this.modules[this.grade].length}`;

      const currentModule = this.modules[this.grade][this.page - 1];
      if (currentModule.upload) {
        this.phase = this.phases[currentModule.phase];
        this.isEvidenceSubmitted = await this.checkIfAlreadySubmitted(this.phase, 1);
      }
    });
  }

  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const fileSize = file.size / 1024 / 1024;
      if (fileSize <= 5) {
        this.uploadForm.value.file = file;
        this.isValidFile = true;
      } else {
        this.isValidFile = false;
        alert('Archivo muy grande, máximo 5MB');
        this.uploadForm.value.file = '';
      }
    }
  }

  async uploadEvidence() {
    try {
      this.isValidFile = false;
      const formData = new FormData();
      formData.append('file', this.uploadForm.value.file);
      await this.evidence.upload(this.phase, 1, formData);
      this.uploadForm.value.file = '';
      alert('Enviado con exito');
    } catch {
      this.isValidFile = true;
      alert('Lo sentimos ha ocurrido un error, inténtelo mas tarde');
    }
  }

  back(): void {
    this.location.back();
  }

  openModal(contenido: any) {
    this.modal.open(contenido, {
      size: 'lg',
      centered: true,
      scrollable: true,
    });
  }

  async checkIfAlreadySubmitted(phase: Phase, tribeId: number){
    return await this.evidence.checkIfAlreadySubmitted(phase, tribeId);
  }
}
