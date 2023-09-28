import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EvidenceUseCase } from '@domain/usecases/evidence.usecase';
import { Phase } from '@domain/models/evidence.model';

@Component({
  selector: 'app-module-actividades-lenguaje',
  templateUrl: './module-actividades-lenguaje.component.html',
  styleUrls: ['./module-actividades-lenguaje.component.scss'],
})
export class ModuleActividadesLenguajeComponent implements OnInit {
  phases: Phase[] = ['PRE_ACTIVE', 'INTERACTIVE', 'POST_ACTIVE'];
  phase: Phase;
  isValidFile: boolean = false;
  uploadForm: FormGroup;

  grade: any;
  page: any;

  modules: any = {
    10: [
      {
        content: `
 		<h1>FASE PREACTIVA O DE EXPLORACIÓN DE SABERES PREVIOS</h1>
 		<p>El propósito de las actividades que conforman esta fase es que los estudiantes, a partir de sus experiencias previas y de una conceptualización inicial, se aproximen a la comprensión de las tradiciones culturales como elementos esenciales de la identidad cultural de las comunidades que las expresan.</p>
 		<p>Para favorecer la contextualización de los estudiantes en la ruta de aprendizaje, se propone desarrollar un flujo de trabajo académico integrado por tres momentos, articulados entre sí: momento introductorio, momento de fundamentación conceptual y el momento metacognitivo.</p>

 		<img src="assets/images/fondos/Fondo_division_mod.png">
 		<h2>→ Actividad 1.</h2>
 		<img src="https://i.postimg.cc/tgbw01Qx/diana-mate.png" title="Recuerda, en esta actividad debes hacer un entregable.">
<ul class="menu_momento_introductivo">
 			<li class="btn_foro" title="Competencias Básicas"><span><a alt="Competencias Básicas" href=""></a></span></li>
 			<li class="btn_maloka" title="Competencias Socioemocionales"><span><a alt="Competencias Socioemocionales" href=""></a></span></li>
 			<li class="btn_perfil" title="Competencias Ciudadanas"><span><a alt="Competencias Ciudadanas" href=""></a></span></li>
 		</ul>
 		<p>Durante esta actividad se llevará a cabo la observación de un video introductorio al tema, una experiencia de compartir oralmente entre los integrantes del equipo, la realización de una lectura y el análisis textual de algunos conceptos básicos del tema y, finalmente, la realización de la experiencia metacognitiva que permite elaborar nuevos aprendizajes a partir de la autoevaluación.</p>

 		<h3>Momento introductorio.</h3>
 		<ul class="menu_momento_introductivo">
 			<li class="btn_foro"><span><a alt="Competencias Básicas" href=""></a></span></li>
 			<li class="btn_maloka"><span><a alt="Competencias Socioemocionales" href=""></a></span></li>
 			<li class="btn_perfil"><span><a alt="Competencias Ciudadanas" href=""></a></span></li>
 		</ul>
 		<img src="assets/images/fondos/Fondo_division_mod.png">
 		<p>Las actividades de este espacio académico se orientan a motivar y ambientar el abordaje del tema y su importancia.</p>
 		<p>Se solicita a cada uno de los estudiantes observar el video que se encuentra en el siguiente enlace:
 			<a href="https://youtu.be/3hHbALdB2_g" target="_blank" rel="noopener noreferrer">https://youtu.be/3hHbALdB2_g</a>
 		</p>
 		<iframe width="560" height="315" src="https://www.youtube.com/embed/3hHbALdB2_g" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>


 		<p>Posteriormente, se les invita a reflexionar y compartir oralmente con el equipo de trabajo, su experiencia sobre algunas de las tradiciones culturales en las que cada uno ha vivido y participado, identificando algunas características principales de las mismas y su importancia. Como resultado de este compartir se elaborará un resumen de las experiencias compartidas.</p>

 	`,
        upload: true,
        phase: 0,
        id: 1,
      },
      {
        content: `
 		<img class="cuadroverde" src="https://i.postimg.cc/7LNcqxwQ/diana-lenguaje.png">
 		<h3>Momento de fundamentación conceptual.</h3>
 		<section class="extract_content">
 			<p>(Extracto) Identidad cultural.</p>
 			<p>El concepto de identidad cultural encierra un sentido de pertenencia a un grupo social con el cual se comparten rasgos culturales, como costumbres, valores y creencias. La identidad no es un concepto fijo, sino que se recrea individual y colectivamente y se alimenta de forma continua de la influencia exterior. </p>
 			<p>“La identidad cultural de un pueblo viene definida históricamente a través de múltiples aspectos en los que se plasma su cultura, como la lengua, instrumento de comunicación entre los miembros de una comunidad, las relaciones sociales, ritos y ceremonias propias, o los comportamientos colectivos, esto es, los sistemas de valores y creencias (...) Un rasgo propio de estos elementos de identidad cultural es su carácter inmaterial y anónimo, pues son producto de la colectividad” (González Varas, 2000: 43).</p>
 			<p>¿Qué es la identidad? Es el sentido de pertenencia a una colectividad, a un sector social, a un grupo específico de referencia. Esta colectividad puede estar por lo general localizada geográficamente, pero no de manera necesaria (por ejemplo, los casos de refugiados, desplazados, emigrantes, etc.). Hay manifestaciones culturales que expresan con mayor intensidad que otras su sentido de identidad, hecho que las diferencia de otras actividades que son parte común de la vida cotidiana. Por ejemplo, manifestaciones como la fiesta, el ritual de las procesiones, la música, la danza. A estas representaciones culturales de gran repercusión pública, la UNESCO las ha registrado bajo el concepto de “patrimonio cultural inmaterial” (Romero Cevallos, 2005: 62). </p>
 			<p>“La identidad sólo es posible y puede manifestarse a partir del patrimonio cultural, que existe de antemano y su existencia es independiente de su reconocimiento o valoración. Es la sociedad la que a manera de agente activo, configura su patrimonio cultural al establecer e identificar aquellos elementos que desea valorar y que asume como propios y los que, de manera natural, se van convirtiendo en el referente de identidad (...) Dicha identidad implica, por lo tanto, que las personas o grupos de personas se reconocen históricamente en su propio entorno físico y social y es ese constante reconocimiento el que le da carácter activo a la identidad cultural (...) El patrimonio y la identidad cultural no son elementos estáticos, sino entidades sujetas a permanentes cambios, están condicionadas por factores externos y por la continua retroalimentación entre ambos”(Bákula, 2000: 169). </p>
 			<p>La identidad está ligada a la historia y al patrimonio cultural. La identidad cultural no existe sin la memoria, sin la capacidad de reconocer el pasado, sin elementos simbólicos o referentes que le son propios y que ayudan a construir el futuro.  </p>
 			<p> Fuente: Molano L., Olga Lucía. (2007). </p>
 		</section>
 		<p class="boton_verder_content">Otro concepto que debemos comprender es el de las tradiciones culturales, para ello leeremos el siguiente texto.</p>
 		<section class="extract_content">
 			<p>Más allá de un concepto abstracto, las tradiciones culturales son una red de comportamientos, ideas, sentimientos, deseos, percepciones, relaciones, entre otros aspectos, que identifican a las personas de un lugar específico, construidas desde las subjetividades, los imaginarios colectivos, las relaciones con el espacio y la memoria ancestral, también son el reflejo de la resistencia social y cultural de cada comunidad; además, estas se caracterizan porque cada persona percibe su cultura individualmente y la exterioriza colectivamente, lo que le otorga un carácter dinámico, en palabras de Warnier (2002) “No creamos que la cultura de la tradición sea la reproducción idéntica de un conjunto de hábitos petrificados. Las lenguas y las culturas cambian, pues están inmersas en las turbulencias de la historia. A fin de asegurar su función de orientación, deben integrar el cambio” (p.13).</p>
 			<p>
 			Fuente: Fonseca, A.J. y Quesada, E.G. (2014).
 			</p>
 		</section>

 	`,
        upload: false,
        id: 1,
      },
      {
        content: `
 		<h1 class="proudcto_academico_tit">Producto Académico 1</h1>
 		<ul class="menu_momento_introductivo">
 			<li class="btn_foro"><span><a alt="Competencias Básicas" href=""></a></span></li>
 			<li class="btn_maloka"><span><a alt="Competencias Socioemocionales" href=""></a></span></li>
 		</ul>
 		<img src="assets/images/fondos/Fondo_division_mod.png">

 		<p>A partir de los dos textos anteriores, realizar de manera grupal el siguiente ejercicio de comprensión y análisis textual. Elabore la tabla en formato PDF o *.DOC y súbalo a la plataforma.</p>

 		<img src="https://i.postimg.cc/mZMr2hkD/10-L-tabla1.png" alt="" class="imgtabla">

 		<p>Las tradiciones culturales son expresiones vivas que conforman y expresan la identidad cultural de los grupos humanos y se expresan mediante las costumbres gastronómicas o culinarias, las prácticas agrícolas, agropecuarias y ambientales, prácticas artesanales, tradiciones orales, vestuario, festividades, ceremonias religiosas, entre muchas otras.</p>
 		<p>A continuación, se presenta, a manera de ejemplo, una breve descripción de una tradición cultural perteneciente a una de las regiones de Colombia.</p>

 		<div class="border">
 			<img class="imgfigura" src="https://i.postimg.cc/9fZ8JRK9/10L-img1.png">
 			<p class="p-peq">DECORANDO A San Francisco, COLOMBIA   © León Dario Peláez, 2008</p>
 			<br>
 			<p>Fiesta de San Francisco de Asís en Quibdó. Cada año, desde el 3 de septiembre hasta el 5 de octubre, los doce barrios franciscanos de la ciudad de Quibdó, Colombia, organizan la Fiesta de San Pancho. Esta celebración de la identidad de la comunidad de origen africano del Departamento del Chocó está muy arraigada en la religiosidad popular. El Festival de San Pancho es el evento simbólico más importante en la vida de la ciudad de Quibdó. Fortalece la identidad del Departamento del Chocó y fomenta la cohesión social de la comunidad, propiciando al mismo tiempo la creatividad y la innovación al revitalizar y recrear los conocimientos tradicionales y el respeto de la naturaleza. <br><br>Fuente: UNESCO, 2014.</p>
 		</div>


 	`,
        upload: false,
        id: 1,
      },
      {
        content: `
 		<h1 class="proudcto_academico_tit">Momento metacognitivo</h1>
 		<ul class="menu_momento_introductivo">
 			<li class="btn_foro"><span><a alt="Competencias Básicas" href=""></a></span></li>
 			<li class="btn_maloka"><span><a alt="Competencias Socioemocionales" href=""></a></span></li>
 		</ul>
 		<img src="assets/images/fondos/Fondo_division_mod.png">

 		<p>Este es un espacio de auto reflexión y autoevaluación grupal, donde se valorará y revisará las experiencias de aprendizajes vividas hasta ahora en el desarrollo del módulo.</p>
 		<p>El equipo de trabajo se reúne, reflexiona y responde las siguientes preguntas:</p>
 		<p><span class="icon_objetivos"></span>¿Qué nuevos aprendizajes han adquirido con las actividades realizadas hasta el momento?</p>
 		<p><span class="icon_objetivos"></span>¿De qué manera pueden mejorar la estrategia de trabajo en equipo grupo para afianzar los aprendizaje?</p>

 	`,
        upload: false,
        id: 1,
      },
      {
        content: `
 		<h1>FASE INTERACTIVA</h1>

 		<p>El propósito de las actividades que conforman esta fase es que los estudiantes identifiquen y caractericen algunas tradiciones culturales, para que, a partir de los aprendizajes, documenten en profundidad una tradición de la regional en que viven, y, elaboren algunos productos académicos que contribuyan a su conocimiento y divulgación.</p>
 		<p> Para favorecer la contextualización de los estudiantes en la ruta de aprendizaje, se propone desarrollar un flujo de trabajo académico integrado por cuatro momentos, articulados entre sí: momento analítico reflexivo, momento de fundamentación conceptual, momento analítico reflexivo y el momento metacognitivo.</p>

 		<img src="assets/images/fondos/Fondo_division_mod.png">
 		<h2>→ Actividad 2.</h2>
 		<img src="https://i.postimg.cc/tgbw01Qx/diana-mate.png" title="Recuerda, en esta actividad debes hacer un entregable.">
<ul class="menu_momento_introductivo">
 			<li class="btn_foro" title="Competencias Básicas"><span><a alt="Competencias Básicas" href=""></a></span></li>
 			<li class="btn_maloka" title="Competencias Socioemocionales"><span><a alt="Competencias Socioemocionales" href=""></a></span></li>
 		</ul>
 		<p>Durante esta actividad se llevará a cabo la identificación y la caracterización básica de algunas tradiciones culturales del contexto latinoamericano y colombiano; la fundamentación conceptual sobre el papel de la cultura en el desarrollo y la transformación de las comunidades; la indagación y documentación en profundidad de una tradición cultural que se expresa a nivel regional o local y la elaboración de los productos académicos derivados de este ejercicio; finalmente, la realización de la experiencia metacognitiva que permite elaborar nuevos aprendizajes a partir de la autoevaluación.</p>

 	`,
        upload: false,
        id: 1,
      },
      {
        content: `
 		<h1 class="proudcto_academico_tit">Momento Analítico refléxivo</h1>
 		<ul class="menu_momento_introductivo">
 			<li class="btn_foro"><span><a alt="Competencias Básicas" href=""></a></span></li>
 			<li class="btn_maloka"><span><a alt="Competencias Socioemocionales" href=""></a></span></li>
 		</ul>
 		<img src="assets/images/fondos/Fondo_division_mod.png">

 		<p>Las acciones que se llevarán a cabo están orientadas al uso de los aprendizajes adquiridos en la fase anterior, para realizar de manera adecuada la identificación y caracterización de algunas tradiciones culturales en el contexto latinoamericano, así como en el colombiano.</p>
 		<p>Cada equipo de trabajo realizará una búsqueda de información en fuentes impresas y/o digitales para identificar dos tradiciones culturales existentes en países de la región latinoamericana (1) y dos tradiciones culturales existentes en el contexto colombiano y se expresen a nivel regional o local (2), donde habitan. Con la información recolectada se realiza una caracterización básica de las tradiciones identificadas, de acuerdo con los aspectos de la tabla que se presenta a continuación.</p>
 		<p>Los productos académicos 2 al 5 deben consolidarse en un solo archivo en formato PDF y subirse a la plataforma.</p>
 		<p><span class="icon_objetivos"></span>Producto académico 2.</p>
 		<img class="imgtabla" src="https://i.postimg.cc/wvbmNF2Q/10-L-tabla2.png">
 		<p class="italic_">Una fuente virtual recomendada: <a target="_blank" class="p-800" href="http://www.lacult.unesco.org/docc/CyD_12_es.pdf">http://www.lacult.unesco.org/docc/CyD_12_es.pdf</a></p>
 		<p>Una fuente virtual recomendada: <a target="_blank" class="p-800" href="https://hablemosdeculturas.com/cultura-colombiana/">https://hablemosdeculturas.com/cultura-colombiana/</a></p>

 	`,
        upload: false,
        id: 1,
      },
      {
        content: `
 		<img class="cuadroverde" src="https://i.postimg.cc/7LNcqxwQ/diana-lenguaje.png">
 		<h3>Momento de fundamentación conceptual.</h3>
 			<p>Este espacio académico aborda la fundamentación de la cultura como factor relevante para el desarrollo y la transformación de las sociedades.</p>
 			<p>Se solicita la lectura comprensiva y analítica del siguiente contenido y luego realizar la actividad que sigue a continuación del texto.</p>
 		<section class="extract_content">
 			<p>La cultura en los Objetivos de Desarrollo del Milenio. Hoy, quince años después de la aprobación de los Objetivos de Desarrollo del Milenio, sabemos que no ha sido posible cumplir con todas esas metas porque, en buena medida, los programas, estrategias y políticas de desarrollo adoptados no eran suficientes, o no fueron definidos adecuadamente.</p>
 			<p>Asombrosamente, la cultura no fue incorporada a los Objetivos de Desarrollo del Milenio, ni tampoco a sus indicadores, al alegarse numerosas dificultades para poder medir su impacto en el desarrollo.</p>
 			<p>Sin embargo, una de las razones por las que no se alcanzaron los objetivos fijados en el año 2000 es probablemente no haber reconocido explícitamente el papel de la cultura en el crecimiento económico, en la gestión de recursos, en la resolución de conflictos, en abordar las inequidades sociales o en la reafirmación de identidades.</p>
 			<p>Tampoco se entendió entonces que la cultura es un vector extremadamente eficiente de conocimiento, y que, por tanto, es la base de la innovación y la creación, incluida la creación científica. Se ignoró, quizás, que no existen recetas únicas de desarrollo, ya que son las culturas las que deben de determinar sus modelos de desarrollo, y no al contrario.</p>
 			<p> Se olvidó, en fin, que reconocer, valorar y compartir la cultura, las culturas de cada uno de nosotros y de nuestros colectivos diversos, es el paso imprescindible para reducir la desigualdad social y permitir la integración plena en la sociedad.</p>
 			<p> Es necesario recordar que el valor de la cultura está en la producción y consumo de bienes, servicios y actividades culturales, y en el conocimiento que nos transmitimos unos a otros a través de símbolos que comprendemos e interiorizamos, para luego transformarlos e innovar. Esos símbolos compartidos dan un sentimiento de pertenencia colectiva y de identidad, una cohesión social necesaria para establecer relaciones, sean comerciales, profesionales o personales.</p>
 			<p> Además, la comprensión de los símbolos empleados por otros colectivos, a través del intercambio cultural, nos permiten establecer relaciones más allá de nuestro grupo y, por ende, adquirir nuevos conocimientos. Nos permite resolver conflictos, y entablar un diálogo para ampliar horizontes.</p>
 			<p> Por todo ello, la cultura debe ser reconocida como un pilar esencial de desarrollo que complemente los pilares económico, social y medioambiental. La cultura entendida como un sector económico, como un medio de transmisión de conocimiento y de identidades, y como base de la calidad de vida, de la cohesión social, la resolución de conflictos y la reducción de desigualdades.</p>
 			<p>La diversidad cultural es tan necesaria para el desarrollo sostenible como la biodiversidad. Si se reduce la diversidad cultural, o se limita la capacidad de intercambio cultural entre las sociedades, se destruirían recursos culturales. Esos recursos, a diferencia de los naturales, son ilimitados si se protegen y promocionan, ya que surgen de las personas mismas y del intercambio entre ellas.</p>
 			<p> Ésa es la teoría. Sin embargo, en la práctica, hay una infrautilización sistemática de los recursos culturales, sean patrimoniales o contemporáneos, terrestres o subacuáticos, muebles o inmuebles, materiales o inmateriales, debido a la falta, o peor aún, de la no aplicación de normas, medidas y políticas para su protección, gestión y promoción.</p>
 			<p>UNESCO, (2016).</p>

 		</section>

 	`,
        upload: false,
        id: 1,
      },
      {
        content: `
 		<h1 class="proudcto_academico_tit">Producto académico 3</h1>
 		<ul class="menu_momento_introductivo">
 			<li class="btn_maloka"><span><a alt="Competencias Socioemocionales" href=""></a></span></li>
 		</ul>
 		<img src="assets/images/fondos/Fondo_division_mod.png">

 		<p>A partir del texto anterior, el grupo realiza el siguiente ejercicio de comprensión y análisis textual.</p>
 		<img class="imgtabla" src="https://i.postimg.cc/CxVcPHT4/10-L-tabla3.png">

 	`,
        upload: false,
        id: 1,
      },
      {
        content: `
 		<h1 class="proudcto_academico_tit">Momento analítico reflexivo</h1>
 		<ul class="menu_momento_introductivo">
 			<li class="btn_foro"><span><a alt="Competencias Básicas" href=""></a></span></li>
 			<li class="btn_maloka"><span><a alt="Competencias Socioemocionales" href=""></a></span></li>
 		</ul>
 		<img src="assets/images/fondos/Fondo_division_mod.png">

 		<p>Las acciones que se llevarán a cabo en este momento están orientadas a la indagación, consulta, organización de la información para documentar y caracterizar en profundidad una tradición cultural que se exprese en el ámbito regional o local donde se encuentran los estudiantes, así como también elaborar los productos académicos finales.
 			</p><p> Selección de la tradición cultural. Cada equipo de trabajo elije una, entre las dos tradiciones culturales que fueron identificadas y caracterizadas a nivel regional o local, a partir de la cual se continuará el desarrollo de las actividades.</p>
 			<p>Con la tradición cultural seleccionada se realizará una búsqueda, indagación y documentación acudiendo a fuentes bibliográficas impresas, digitales, eventos, entrevistas con profesores, líderes, funcionarios y gestores culturales, u otras personas de la región, que conocen, vivencian e impulsan dicha tradición.</p>
 			<p>Esta indagación busca, además de documentar y caracterizar en profundidad, redescubrir la tradición, para fortalecer su conocimiento en la comunidad, aportar a su preservación como elemento de identidad cultural e identificar aspectos que la potencien como una expresión cultural que aporta al desarrollo de la comunidad, mediante la generación de oportunidades de negocio que mejoren la calidad de vida de las personas.</p>
 			<p>Con la información que se va recopilando, se lleva un registro mediante archivos de grabaciones, fotografías, fichas de resumen, descripciones y observaciones. Es importante tener en cuenta, que cuando obtengan registros de grabaciones, fotos, entrevistas u otros donde se incluyan a personas distintas al grupo de trabajo, les soliciten de manera explícita el permiso para levantar ese registro y eventualmente publicarlo.</p>
 			<p>En la tabla que sigue a continuación, se establecen los aspectos básicos que deben indagarse y documentarse en profundidad sobre la tradición cultural seleccionada.</p>
 			<img class="imgtabla" src="https://i.postimg.cc/3RpycpHg/10-L-tabla4.png">
 			<p>Después de recopilar toda la información de las diferentes fuentes, el equipo de trabajo la organiza, clasifica y analiza para elaborar a partir de ella los productos finales donde se integra la información más relevante que permita a otras personas conocer y divulgar la tradición cultural como expresión de la identidad regional y local.</p>

 	`,
        upload: false,
        id: 1,
      },
      {
        content: `
 		<p>Los productos académicos finales son:</p>
 		<h3>Producto Académico 4</h3>
 		<ul class="menu_momento_introductivo">
 			<li class="btn_foro"><span><a alt="Competencias Básicas" href=""></a></span></li>
 			<li class="btn_maloka"><span><a alt="Competencias Socioemocionales" href=""></a></span></li>
 		</ul>
 		<img src="assets/images/fondos/Fondo_division_mod.png">

 		<p>Elaborar un boletín (impreso o virtual) o un web blog (utilizando alguna de las herramientas gratuitas como, por ejemplo, Blogger) dirigido al público en general, los diferentes aspectos de la tradición cultural que fue documentada, buscando divulgarla y promoverla en el ámbito regional, nacional o internacional, utilizando para ello el rigor y creatividad en la presentación de la información analizada, apoyados en el uso de los elementos comunicativos que consideren más adecuados: descripciones en texto, fotos, videos y grabaciones.</p>
 		<p>Este producto será socializado en un espacio académico definido por la institución educativa</p>

 	`,
        upload: false,
        id: 1,
      },
      {
        content: `
 		<h3>Producto Académico 5</h3>
 		<ul class="menu_momento_introductivo">
 			<li class="btn_foro"><span><a alt="Competencias Básicas" href=""></a></span></li>
 			<li class="btn_maloka"><span><a alt="Competencias Socioemocionales" href=""></a></span></li>
 			<li class="btn_maloka"><span><a alt="Competencias Socioemocionales" href=""></a></span></li>
 		</ul>
 		<img src="assets/images/fondos/Fondo_division_mod.png">

 		<p>Elaborar una ponencia dirigida a la comunidad de la institución educativa, con el propósito central de divulgar, promover y despertar el interés por la tradición cultural, y, que será leída en un espacio académico definido por la institución educativa.</p>
 		<p>Les recordamos que una ponencia es un texto argumentativo que debe ser escrito con lenguaje claro y efectivo, además, durante su presentación puede incluir ayudas visuales, manteniendo el hilo conductor con el texto escrito. La estructura básica para su elaboración incluye los siguientes elementos:</p>
 		<img class="imgtabla" src="https://i.postimg.cc/j59pLwWk/10-L-tabla5.png">

 	`,
        upload: false,
        id: 1,
      },
      {
        content: `
 		<h3>Momento metacognitivo</h3>
 		<ul class="menu_momento_introductivo">
 			<li class="btn_foro"><span><a alt="Competencias Básicas" href=""></a></span></li>
 			<li class="btn_maloka"><span><a alt="Competencias Socioemocionales" href=""></a></span></li>
 			<li class="btn_maloka"><span><a alt="Competencias Socioemocionales" href=""></a></span></li>
 		</ul>
 		<img src="assets/images/fondos/Fondo_division_mod.png">

 		<p>Este es un espacio de auto reflexión y autoevaluación grupal, donde se revisarán y valorarán las experiencias de aprendizajes vividas durante el desarrollo del módulo.
 			</p><p>El equipo de trabajo se reúne, reflexiona y responde las siguientes preguntas:</p>

 		 <p><span class="icon_objetivos"></span>¿Qué nuevas capacidades personales y sociales desarrollaron mediante la realización de las actividades de aprendizaje?</p>
 		 <p><span class="icon_objetivos"></span>¿Cuáles fueron las mayores dificultades que experimentaron durante el desarrollo de las actividades de aprendizaje?</p>
 		 <p><span class="icon_objetivos"></span>¿Qué nuevas estrategias adquirieron para optimizar el trabajo personal y en equipo en experiencias posteriores?</p>

 	`,
        upload: true,
        phase: 1,
        id: 1,
      },
      {
        content: `
 		<h1>FASE POSTACTIVA</h1>
 		<p>El propósito de las actividades que conforman esta fase es que los estudiantes y docentes revisen, reflexionen, valoren y evalúen los resultados del proceso de aprendizaje mediante el desarrollo del módulo, lo que involucra la realización de las actividades y los productos académicos definidos, con el objeto de aprovechar este conocimiento en función de la consolidación de los mismos aprendizajes y de la cualificación de las estrategias para futuras experiencias.</p>

 		<img src="assets/images/fondos/Fondo_division_mod.png">
 		<h3>Actividad 3</h3>
 			<ul class="menu_momento_introductivo">
 				<li class="btn_foro"><span><a alt="Competencias Básicas" href=""></a></span></li>
 				<li class="btn_maloka"><span><a alt="Competencias Socioemocionales" href=""></a></span></li>
 			</ul>

 		<p>Durante esta actividad, se llevará a cabo el proceso de evaluación del módulo, mediante la revisión, reflexión y valoración del desarrollo de las actividades y los resultados de aprendizajes alcanzados por los estudiantes, a través de la autoevaluación, coevaluación, heteroevaluación y metaevaluación.

 		</p><p><span class="icon_objetivos"></span>Autoevaluación</p>
 		<p>Cada uno de los equipos de trabajo realiza la autoevaluación formativa del módulo, la cual está orientada a reconocer los aprendizajes, avances y resultados obtenidos de todo el proceso. Para esta actividad es importante recuperar las auto reflexiones y autoevaluaciones expresadas por los equipos en los momentos metacognitivos.</p>
 		<p>Para realizar este ejercicio se tienen como referencia los criterios que se presentan en la siguiente tabla.</p>
 		<img class="imgtabla" src="assets/images/Imagenes modulos/Lenguaje/Color/10L_tabla6.png">

 		<p><span class="icon_objetivos"></span>Coevaluación</p>
 		<p>Cada uno de los equipos realizará la coevaluación formativa de los resultados presentados por otro equipo, la cual está orientada a establecer valoraciones y sugerencias de mejoramiento, de acuerdo con los criterios presentados en la siguiente tabla.</p>

 		<img class="imgtabla" src="assets/images/Imagenes modulos/Lenguaje/Color/10L_tabla7.png">

 		<p><span class="icon_objetivos"></span>Heteroevaluación</p>
 		<p> El docente evalúa el desempeño de los estudiantes (heteroevaluación), a partir de los productos académicos que cada grupo elabora durante el desarrollo del módulo, y, apoyándose en las rúbricas que se proponen en la tabla que sigue a continuación, donde se agrupan la comprensión e interpretación textual, la producción de textos y la auto reflexión y autoevaluación.</p>

 		<img class="imgtabla" src="assets/images/Imagenes modulos/Lenguaje/Color/10L_tabla8.png">

 		<p><span class="icon_objetivos"></span>Metaevaluación</p>
 		<p>El docente y cada uno de los equipos de estudiantes participarán en la realización de la metaevaluación, la cual se orienta a valorar la efectividad de los mecanismos de evaluación que se implementaron en el desarrollo del módulo, con el fin de establecer estrategias de mejoramiento en estos procesos, que se implementarán más adelante, para determinar los aportes y el rol de la evaluación en el afianzamiento de los aprendizajes, así como establecer las observaciones de mejoramiento de la evaluación para próximos proyectos.</p>
 		<p>La metaevaluación se realizará, por parte de cada uno de los actores académicos, respondiendo las preguntas que se formulan en la matriz que se encuentra a continuación.</p>

 		<img class="imgtabla" src="assets/images/Imagenes modulos/Lenguaje/Color/10L_tabla9.png">
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

						<p>
							El propósito de las actividades que conforman esta fase es, que los
							estudiantes, a partir de sus experiencias previas y de una
							conceptualización inicial, se aproximen a la comprensión de las
							tradiciones culturales como elementos esenciales de la identidad
							cultural de las comunidades que las expresan y su importancia como
							ejes de transformación.
						</p>

						<img src="assets/images/fondos/Fondo_division_mod.png">
						<h2>→ Actividad 1.</h2>
						<img src="https://i.postimg.cc/tgbw01Qx/diana-mate.png" title="Recuerda, en esta actividad debes hacer un entregable.">
<ul class="menu_momento_introductivo">
 			<li class="btn_foro" title="Competencias Básicas"><span><a alt="Competencias Básicas" href=""></a></span></li>
 		</ul>
						<p>
							Texto 1. Para precisar la importancia y validez de las
							experiencias locales y regionales que viven las personas, se
							solicita a cada estudiante ver el video que se encuentra en el
							siguiente enlace:
							<a href="https://www.ted.com/talks/taiye_selasi_don_t_ask_where_i_m_from_ask_where_i_m_a_local?utm_campaign=tedspread&amp;utm_medium=referral&amp;utm_source=tedcomshare" target="_blank" rel="noopener noreferrer">https://www.ted.com/talks/taiye_selasi_don_t_ask_where_i_m_from_ask_where_i_m_a_local?utm_campaign=tedspread&amp;utm_medium=referral&amp;utm_source=tedcomshare</a>
						</p>

						<div style="max-width:854px"><div style="position:relative;height:0;padding-bottom:56.25%"><iframe src="https://embed.ted.com/talks/taiye_selasi_don_t_ask_where_i_m_from_ask_where_i_m_a_local" width="854" height="480" style="position:absolute;left:0;top:0;width:100%;height:100%" frameborder="0" scrolling="no" allowfullscreen=""></iframe></div></div>
						<br>

						<img src="https://i.postimg.cc/7LNcqxwQ/diana-lenguaje.png">

						<h3>Producto académico 1.</h3>
						<ul class="menu_momento_introductivo">
							<li class="btn_control">
								<span><a alt="Competencias Socioemocionales" href=""></a></span>
							</li>
						</ul>
						<img src="assets/images/fondos/Fondo_division_mod.png">
						<p>
							Elaborar un glosario en formato *.DOC o PDF, sobre los términos y conceptos relevantes que
							se presenten en el video, consultar su significado y subirlo a la plataforma.
						</p>
						<p>
							Teniendo en cuenta el contenido del video y las experiencias
							personales, le invitamos a reflexionar y compartir oralmente con
							el equipo de trabajo, la experiencia que ha tenido con las tradiciones
							culturales además que nos cuente cuales ha vivido y en cuales participado, identificando algunas
							características, formas de expresión y sus aportes a las
							comunidades.
						</p>


					`,
        upload: false,
        id: 1,
      },
      {
        content: `
						<img src="assets/images/fondos/Fondo_division_mod.png">
						<h2>→ Actividad 2.</h2>
						<img src="https://i.postimg.cc/tgbw01Qx/diana-mate.png" title="Recuerda, en esta actividad debes hacer un entregable.">
<ul class="menu_momento_introductivo">
 			<li class="btn_foro" title="Competencias Básicas"><span><a alt="Competencias Básicas" href=""></a></span></li>
 			<li class="btn_maloka" title="Competencias Socioemocionales"><span><a alt="Competencias Socioemocionales" href=""></a></span></li>
 		</ul>
						<p>
							Un concepto importante para el adecuado desarrollo del proyecto es
							el de identidad cultural, para lo cual, cada uno de los
							integrantes del grupo leerá comprensiva y analíticamente los
							textos 2 y 3 que siguen a continuación.
						</p>
						<p>
							Luego de la lectura se realizará de manera grupal el siguiente
							ejercicio de comprensión y análisis textual.
						</p>

						<br>
						<img src="https://i.postimg.cc/7LNcqxwQ/diana-lenguaje.png">
						<h3>Producto académico 2.</h3>
						<ul class="menu_momento_introductivo">
							<li class="btn_control">
								<span><a alt="Competencias Socioemocionales" href=""></a></span>
							</li>
							<li class="btn_control">
								<span><a alt="Competencias Socioemocionales" href=""></a></span>
							</li>
						</ul>
						<img src="assets/images/fondos/Fondo_division_mod.png">
						<img class="imgtabla" src="https://i.postimg.cc/rsCcG0RN/11-L-tabla1.png" alt="">

						<p><strong>Texto 2.</strong> Identidad cultural.</p>
						<section class="extract_content">
							<p>
								El concepto de identidad cultural encierra un sentido de
								pertenencia a un grupo social con el cual se comparten rasgos
								culturales, como costumbres, valores y creencias. La identidad
								no es un concepto fijo, sino que se recrea individual y
								colectivamente y se alimenta de forma continua de la influencia
								exterior.
							</p>
							<p>
								“La identidad cultural de un pueblo viene definida
								históricamente a través de múltiples aspectos en los que se
								plasma su cultura, como la lengua, instrumento de comunicación
								entre los miembros de una comunidad, las relaciones sociales,
								ritos y ceremonias propias, o los comportamientos colectivos,
								esto es, los sistemas de valores y creencias (...) Un rasgo
								propio de estos elementos de identidad cultural es su carácter
								inmaterial y anónimo, pues son producto de la colectividad”
								(González Varas, 2000: 43).
							</p>
							<p>
								¿Qué es la identidad? Es el sentido de pertenencia a una
								colectividad, a un sector social, a un grupo específico de
								referencia. Esta colectividad puede estar por lo general
								localizada geográficamente, pero no de manera necesaria (por
								ejemplo, los casos de refugiados, desplazados, emigrantes,
								etc.). Hay manifestaciones culturales que expresan con mayor
								intensidad que otras su sentido de identidad, hecho que las
								diferencia de otras actividades que son parte común de la vida
								cotidiana. Por ejemplo, manifestaciones como la fiesta, el
								ritual de las procesiones, la música, la danza. A estas
								representaciones culturales de gran repercusión pública, la
								UNESCO las ha registrado bajo el concepto de “patrimonio
								cultural inmaterial” (Romero Cevallos, 2005: 62).
							</p>
							<p>
								“La identidad sólo es posible y puede manifestarse a partir del
								patrimonio cultural, que existe de antemano y su existencia es
								independiente de su reconocimiento o valoración. Es la sociedad
								la que a manera de agente activo, configura su patrimonio
								cultural al establecer e identificar aquellos elementos que
								desea valorar y que asume como propios y los que, de manera
								natural, se van convirtiendo en el referente de identidad (...)
								Dicha identidad implica, por lo tanto, que las personas o grupos
								de personas se reconocen históricamente en su propio entorno
								físico y social y es ese constante reconocimiento el que le da
								carácter activo a la identidad cultural (...) El patrimonio y la
								identidad cultural no son elementos estáticos, sino entidades
								sujetas a permanentes cambios, están condicionadas por factores
								externos y por la continua retroalimentación entre
								ambos”(Bákula, 2000: 169).
							</p>
							<p>
								La identidad está ligada a la historia y al patrimonio cultural.
								La identidad cultural no existe sin la memoria, sin la capacidad
								de reconocer el pasado, sin elementos simbólicos o referentes
								que le son propios y que ayudan a construir el futuro.
							</p>
							<p>Fuente: Molano L., Olga Lucía. (2007).</p>
						</section>
						<p>
							<span class="icon_objetivos"></span>Otro concepto que debemos
							comprender es el de las tradiciones culturales, para ello leeremos
							el siguiente texto.
						</p>
						<p>
							<strong>Texto 3.</strong> Extracto tomado del artículo:
							Configuración de la tradición cultural campesina desde la
							educación popular.
						</p>
						<section class="extract_content">
							<p>
								Más allá de un concepto abstracto, las tradiciones culturales
								son una red de comportamientos, ideas, sentimientos, deseos,
								percepciones, relaciones, entre otros aspectos, que identifican
								a las personas de un lugar específico, construidas desde las
								subjetividades, los imaginarios colectivos, las relaciones con
								el espacio y la memoria ancestral, también son el reflejo de la
								resistencia social y cultural de cada comunidad; además, estas
								se caracterizan porque cada persona percibe su cultura
								individualmente y la exterioriza colectivamente, lo que le
								otorga un carácter dinámico, en palabras de Warnier (2002) “No
								creamos que la cultura de la tradición sea la reproducción
								idéntica de un conjunto de hábitos petrificados. Las lenguas y
								las culturas cambian, pues están inmersas en las turbulencias de
								la historia. A fin de asegurar su función de orientación, deben
								integrar el cambio” (p.13).
							</p>
							<p>Fuente: Fonseca, A.J. y Quesada, E.G. (2014).</p>
						</section>

						<p>
							Las tradiciones culturales son expresiones vivas que conforman y
							expresan la identidad cultural de los grupos humanos y se expresan
							mediante las costumbres gastronómicas o culinarias, las prácticas
							agrícolas, agropecuarias y ambientales, prácticas artesanales,
							tradiciones orales, vestuario, festividades, ceremonias
							religiosas, entre muchas otras.
						</p>

						<p>
							A continuación, se presenta, a manera de ejemplo, una breve
							descripción de una tradición cultural perteneciente a una de las
							regiones de Colombia.
						</p>

						<section class="extract_content">
							<img class="contenct_modulo_img" src="https://i.postimg.cc/wMV8yCnW/11L-img1.png">
							<p>
								La comunidad de los wayuus está asentada en la Península de La
								Guajira, situada entre Colombia y Venezuela. Su sistema
								normativo comprende un conjunto de principios, procedimientos y
								ritos que rigen la conducta social y espiritual de la comunidad.
								Inspirado en principios de reparación y compensación, este
								sistema es aplicado por las autoridades morales autóctonas, los
								pütchipü’üis o “palabreros”, personas experimentadas en la
								solución de conflictos y desavenencias entre los clanes
								matrilineales de los wayuus.
							</p>
							<p>Fuente: UNESCO, 2014.</p>
						</section>

						<p>
							Es importante precisar que, de acuerdo con la Convención sobre la
							Protección y la Promoción de la Diversidad de las Expresiones
							Culturales de la UNESCO, las actividades, bienes y servicios
							culturales, son los que, desde el punto de vista de su calidad,
							utilización o finalidad específicas, encarnan o transmiten
							expresiones culturales, independientemente del valor comercial que
							puedan tener. Las actividades culturales pueden constituir una
							finalidad de por sí, o contribuir a la producción de bienes y
							servicios culturales.
						</p>

						<p>(UNESCO, 2005).</p>


					`,
        upload: false,
        id: 1,
      },
      {
        content: `
						<h2>→ Actividad 3.</h2>
						<img src="https://i.postimg.cc/tgbw01Qx/diana-mate.png" title="Recuerda, en esta actividad debes hacer un entregable.">
<ul class="menu_momento_introductivo">
 			<li class="btn_foro" title="Competencias Básicas"><span><a alt="Competencias Básicas" href=""></a></span></li>
 		</ul>
						<p>
							Como una aproximación crítica a la importancia de la identidad cultural local, y con un eje de desarrollo de las comunidades, le solicitamos leer y analizar el texto 4, el cual, se encuentra a continuación.
						</p>
						<br>
						<img src="https://i.postimg.cc/7LNcqxwQ/diana-lenguaje.png">
						<h3>Producto académico 3.</h3>
						<ul class="menu_momento_introductivo">
							<li class="btn_control">
								<span><a alt="Competencias Socioemocionales" href=""></a></span>
							</li>
						</ul>
						<img src="assets/images/fondos/Fondo_division_mod.png">


						<p>
							Actividad de reflexión. A partir de la lectura del texto 4, realice en equipo, un comentario crítico, el cual, lo pueden elaborar teniendo en cuenta los aspectos relacionados en la tabla que sigue a continuación.
						</p>

						<img class="imgtabla" src="https://i.postimg.cc/m2jBt9sb/11-L-tabla2.png" alt="">
						<p>
							<strong>Texto 4.</strong>Extracto tomado del artículo: Identidad cultural un concepto que evoluciona.
						</p>
						<section class="extract_content">
							<p>
								La cultura juega un papel importante en el desarrollo de un territorio, a tal punto que muchos pueblos y lugares en Europa y en América Latina han apostado por una revalorización de lo cultural, de lo identitario (recreando incluso nuevas identidades culturales) y patrimonial como eje de su propio desarrollo.
							</p>
							<p>“El desarrollo local se ha convertido en el nuevo activador de las políticas de patrimonialización. Mientras la sociedad de los lugares se convierte en la sociedad de los flujos, parece como si los lugares se hayan involucrado en una obra de construcción identitaria, que privilegia la dimensión local o ciudadana por encima de las nacionales, estatales y globales. La identidad es el viejo territorio del patrimonio y no es de extrañar que entre los objetivos reconocidos por la mayor parte de actuaciones patrimoniales que se realizan en estos ámbitos, figure la (re) construcción de las identidades locales” (García, 2002: 66).</p>

							<p>Esta recreación o potenciación identitaria, no sólo puede revivir, volver a poblar áreas rurales, despertar interés en una población apática, lograr cohesión social, sino que además puede desencadenar actividades económicas y con ello mejorar los ingresos y la calidad de vida de la colectividad. Usualmente estos ingresos están relacionados con la oferta de productos, bienes y servicios, que se colocan oportunamente en el mercado, que van desde lo agropecuario hasta actividades orientadas al turismo</p>
							<p>En los servicios, el caso del turismo tiene una particular relación histórica con el patrimonio. De acuerdo con Hernández (2002: 356) se podría hablar de turismo cultural desde la época griega y romana, y es el siglo XVIII el que estrecha la relación viaje – patrimonio cultural, al aparecer los primeros museos públicos y lo que actualmente se conoce como recorridos turísticos culturales. Estos últimos aparecen con el Grand Tour (que duraba entre dos y tres años), que era la visita realizada por aristócratas ingleses a los lugares históricos, artísticos y naturales más destacados de Europa. En el siglo XIX aparecen las colecciones de guías de viaje y el concepto patrimonial abarca lo etnológico. En el siglo XX surge el turismo de masas y otras formas de turismo relacionado con lo patrimonial: ecológico, temático y activo y cultural.</p>
							<p>Para que una o varias identidades culturales generen desarrollo territorial es necesaria una voluntad colectiva (política, comunal, empresarial, asociativa, etc.) y un reconocimiento del pasado, de la historia. Como lo menciona Bernard Kayser (1994: 37), “las diferenciaciones culturales localizadas preparan a veces competiciones que justifican las fugaces rivalidades entre pueblos, aldeas y barrios: éstas pueden servir para encauzar las pasiones individuales y colectivas que no encuentran aplicación. Pero, al contrario, la búsqueda o reconstrucción de una identidad territorial constituye la razón evidente de individuos, de grupos, de localidades y de espacios motivados por un deseo de situarse, de enraizarse en una sociedad. De esta manera en particular, la connotación cultural regional es reconocida por todos, a través de las especificidades legadas por el pasado, y que se encuentran aún vivas: el idioma, los gustos, los comportamientos colectivos e individuales, la música, etc.”</p>
							<p>Fuente: Molano L., Olga Lucía. (2007).</p>
						</section>



					`,
        upload: false,
        id: 1,
      },
      {
        content: `
						<img src="https://i.postimg.cc/7LNcqxwQ/diana-lenguaje.png">
				<h1 class="proudcto_academico_tit">Momento metacognitivo</h1>
				<ul class="menu_momento_introductivo">
					<li class="btn_foro"><span><a alt="Competencias Básicas" href=""></a></span></li>
					<li class="btn_maloka"><span><a alt="Competencias Socioemocionales" href=""></a></span></li>
				</ul>
				<img src="assets/images/fondos/Fondo_division_mod.png">
				<h2> Actividad 4.</h2>
				<img src="https://i.postimg.cc/tgbw01Qx/diana-mate.png" title="Recuerda, en esta actividad debes hacer un entregable.">
<ul class="menu_momento_introductivo">
 			<li class="btn_foro" title="Competencias Básicas"><span><a alt="Competencias Básicas" href=""></a></span></li>
 			<li class="btn_maloka" title="Competencias Socioemocionales"><span><a alt="Competencias Socioemocionales" href=""></a></span></li>
 		</ul>
				<p>Este es un espacio de auto reflexión y autoevaluación grupal, donde se valorará y revisará las experiencias de aprendizajes vividas hasta ahora en el desarrollo del módulo.</p>
				<p>El equipo de trabajo se reúne, reflexiona y responde las siguientes preguntas:</p>
				<p><span class="icon_objetivos"></span>¿Qué nuevos aprendizajes han adquirido con las actividades realizadas hasta el momento?</p>
				<p><span class="icon_objetivos"></span>¿De qué manera pueden mejorar la estrategia de trabajo en equipo para afianzar los aprendizaje?</p>


			`,
        upload: true,
        phase: 0,
        id: 1,
      },
      {
        content: `
				<h1 class="proudcto_academico_tit">FASE INTERACTIVA</h1>
				<p class="parrafo_tiempo"><span class="icon_tiempo"></span>Tiempo aproximado de desarrollo: 2 semanas</p>
				<p>El propósito de las actividades que conforman esta fase, es que los estudiantes analicen algunas experiencias de desarrollo de la identidad cultural como eje de transformación de las comunidades, además, que caractericen algunas tradiciones culturales, para que, a partir de los aprendizajes, documenten en profundidad una tradición de la región en que viven, y, elaboren algunos productos académicos que contribuyan a fortalecer su conocimiento y divulgación, así como a la formulación de propuestas.</p>
				<img src="assets/images/fondos/Fondo_division_mod.png">
				<h2> Actividad 5.</h2>
<img src="https://i.postimg.cc/tgbw01Qx/diana-mate.png" title="Recuerda, en esta actividad debes hacer un entregable.">
<ul class="menu_momento_introductivo">
 			<li class="btn_foro" title="Competencias Básicas"><span><a alt="Competencias Básicas" href=""></a></span></li>
 			<li class="btn_maloka" title="Competencias Socioemocionales"><span><a alt="Competencias Socioemocionales" href=""></a></span></li>
 		</ul>
				<p>Actividad 5. Lectura y análisis intertextual: a partir de la lectura de los textos 5, 6 y 7, se solicita elaborar el siguiente paralelo gráfico comparativo, el cual permitirá analizar algunas experiencias, de cómo las tradiciones culturales pueden ser fuente de desarrollo de las regiones y localidades.</p>

				<br>
				<img src="https://i.postimg.cc/7LNcqxwQ/diana-lenguaje.png">
				<h3>Producto académico 5</h3>
				<ul class="menu_momento_introductivo">
							<li class="btn_control">
								<span><a alt="Competencias Socioemocionales" href=""></a></span>
							</li>
							<li class="btn_control">
								<span><a alt="Competencias Socioemocionales" href=""></a></span>
							</li>
						</ul>

				<img src="assets/images/fondos/Fondo_division_mod.png">
				<img class="imgtabla" src="https://i.postimg.cc/xTn9fRBx/11-L-tabla3.png" alt="">
				<br>

				<p><strong>Texto 5. </strong> Leer la conferencia TED denominada “cómo resucitar un barrio con imaginación, belleza y arte”, que se encuentra en el siguiente enlace:</p>
				<section class="extract_content">
	<p>
		<a href="https://www.ted.com/talks/theaster_gates_how_to_revive_a_neighborhood_with_imagination_beauty_and_art?utm_campaign=tedspread&amp;utm_medium=referral&amp;utm_source=tedcomshare" target="_blank" rel="noopener noreferrer">https://www.ted.com/talks/theaster_gates_how_to_revive_a_neighborhood_with_imagination_beauty_and_art?utm_campaign=tedspread&amp;utm_medium=referral&amp;utm_source=tedcomshare</a>
	</p>
				</section>

				<p><strong>Texto 6. </strong> Las sopas de las abuelas recobran protagonismo en la cocina.</p>
				<section class="extract_content">
					<p>
						Una simple cucharada de sopa se convierte para muchas personas en un viaje a través del tiempo, que los traslada a la infancia cuando la abuela, la mamá y las tías eran las que cocinaban y congregaban a la familia entera alrededor de la mesa.

					</p>
					<p>Preparaciones con plátano, guineo, arracacha, ahuyama y verduras son algunos sabores que conectan con esa etapa temprana de la vida, una experiencia que Óscar Gónima, chef del restaurante El Almacén, del Hotel Novotel Medellín, explica desde el hecho que “esos productos dejan huella en el subconsciente, es una corriente poderosa que conecta con los recuerdos”.</p>
					<p>Conocido como Kitchen for the Soul o Cocina para el Alma este movimiento comenzó hace varias décadas en Estados Unidos y en Colombia es abanderado la chef Leonor Espinoza. “Es usar ahora la cocina de antaño, sus preparaciones e ingredientes con técnicas de cocción más profesionales”, recalca Gónima, que desde su restaurante la está aplicando básicamente en las sopas y cremas y en algunos sólidos, básicamente en ensaladas y purés.</p>
					<p>Gónima cuenta que esta modalidad no solo busca rescatar las tradiciones, sino que tiene un componente social con el apoyo a los campesinos de la región, a quienes le están comprando directamente los productos. Resalta la necesidad de retomar en la cocina ingredientes como el plátano (que no solo sea frito), el guineo, las hierbas aromáticas, la zanahoria y la berenjena, entre otros. Entre algunas preparaciones destaca la sopa de oreja (tortilla de huevo), patacón, guineo, de verduras con albóndigas o las cremas de ahuyama.</p>

					<p>
						Carlos Sánchez, antropólogo y docente de cátedra de la Universidad de La Sabana y de la Escuela Taller de Bogotá, destaca que Colombia es un país de sopas campesinas, una tradición que lamentablemente se está olvidando, en la llamada alta cocina. “Se les echa lo que haya en el entorno”, comenta al hablar de las distintas preparaciones de sopas a lo largo del país. Dice que en Colombia lamentablemente siempre ha habido un desprecio por lo popular y lo autóctono, que ha llevado que muchas cocciones se hayan perdido en la mesa. Al contrario, señala que el hecho de ser popular es lo que las hace grandes.
					</p>

					<p>
						A lo que Gónima anota que, en las escuelas de gastronomía, habla de Medellín, a los chefs les falta vena investigativa y entender que antes de ellos las que cocinaban, las que hicieron grande la cocina criolla, fueron las abuelas, las tías, las mamás. Comenta, por ejemplo, que los vegetales en la mayoría de los restaurantes solo los sirven salteados cuando se prestan para muchas presentaciones.
					</p>

					<p>
						El periodista y crítico gastronómico Lorenzo Villegas confirmó que estas tradiciones se están perdiendo y por eso destaca el trabajo que se trata hacer desde Kitchen for the Soul o Cocina para el Alma. Villegas resalta que, si bien a los cundiboyacenses les adjudican el recetario de sopas colombianos, los antioqueños “tenemos un gran acervo en materia de caldos salados y adobados con legumbres, verduras, tubérculos y carnes”

					</p>

					<p>
						Destaca que, en el texto En La Buena Mesa, de doña Sofía Ospina de Navarro, se describen más de 30 sopas “como quien dice, sin repetir en un mes”. Entre ellas están la de arepa, arroz, campesina, albóndigas, apio avena, cebolla a la francesa, champiñones a la crema, espárragos, frijoles, frijoles blancos, higarete, hilos de huevo, lechuga, legumbres, lentejas, limón, mazorca con pollo, papa y mazorca.
					</p>

					<p>
						El chef y tecnólogo en gastronomía, Jhony Cañas, apunta que la idea no es solo llevar esta corriente a las preparaciones o recetas, sino que trasciendan en el apoyo a los productores, cocineras ancestrales y salvaguardas de semillas. Narra que desde el Occidente del departamento Caldas, en municipios como Riosucio, Supía y Quinchía, se está rescatando y fortaleciendo el tema del barro para la elaboración de vasijas, así como la panadería en hornos de barro.

					</p>

					<p>
						“También se está potencializando los envueltos, el chontaduro, las curubas y las gulupas (una fusión entre curuba y maracuyá)”, relata Cañas, desde el restaurante Devonómada, una propuesta itinerante que no es estática y que viaja por diferentes regiones. Viaje al pasado, con aromas y recuerdos de la abuela, la tía o la mamá, de la mano de un buen plato de sopa casera.
					</p>

					<p>
						Fuente: Arango, J. H (2021).
					</p>
				</section>

				<p><strong>Texto 7. </strong> Televisión cultural no tiene por qué ser sinónimo de aburrimiento Seis nuevos programas de 'Señal Colombia' lo demuestran. </p>
				<section class="extract_content">
					<p>
						La cantante Andrea Echeverri, quien años atrás aparecía en los escenarios de rock con pelo corto y de colores, aros en la nariz y chaleco de terciopelo, es la narradora de los dos primeros capítulos de El lado B de la historia, uno de los nuevos programas de Señal Colombia. Andrea dejó a un lado el atuendo rebelde que la caracterizó en los comienzos de su carrera y ahora, con el pelo liso y largo, se encuentra con el grupo de charanga Campo Sonoro, cuyos integrantes, al ritmo de guitarra y guacharaca, invitan al televidente a descubrir a los descendientes de los indígenas muiscas.
					</p>

					<p>
						Tras una breve introducción en la que Andrea presenta el capítulo que gira en torno al bastón de mando del cacique Turmequé, un grupo de niños boyacenses da su opinión sobre el mestizaje, el tejo y la tradición. Una joven rubia de ojos claros asegura que ella es tan muisca como cualquier habitante de la región, y dos niñas la respaldan al decir que ser indígena no tiene que ver con la apariencia sino con la actitud ante la Madre Tierra
.

					</p>
					<p>
						El lado B de la historia hace parte de la parrilla que estrenó Señal Colombia el 25 de agosto, justo después del final de la transmisión de los Juegos Olímpicos de Beijing. Junto con Latitud 4° 13' sur, 5 en 1, Memoria crónica, Clips de creación joven y Clips de interés social, el nuevo programa hace parte de una búsqueda de contenidos y formatos alternativos a la televisión comercial. Los seis fueron realizados por convocatorias de Radio Televisión Nacional de Colombia (RTVC), su investigación tomó un año, van dirigidos en especial a la población joven y pretenden satisfacer tres características que no siempre se conjugan con acierto: ser educativos, frescos y novedosos.
					</p>
					<p>
						Cero indiferencia.
					</p>
					<p>
						Latitud 4°13' sur es un reality en el que jóvenes de 13 a 16 años se reúnen para llevar a cabo una utopía que ayude a su comunidad. El espectador, acostumbrado a ver realities donde el mensaje es eliminar a los demás, aquí se topa con unos participantes que trabajan en equipo para lograr un beneficio colectivo como un café Internet gratuito o una cancha de fútbol para el barrio. Siguiendo una línea similar, 5 en 1 muestra experiencias escolares significativas para la comunidad académica a través de las voces de cinco protagonistas que son, por lo general, alumnos y docentes.
					</p>
					<p>
						En Memoria crónica, Juan Sebastián busca sus raíces al seguir los pasos de su abuelo. Precisamente, en uno de los comerciales de la nueva parrilla de Señal Colombia aparece el músico chocoano Alfonso Córdoba, 'el Brujo', cantando: "Me contaba mi abuelito / que su abuelo le contó / que su abuelo le contaba / que su abuelo le contó". Y finalmente, los Clips de creación joven y Clips de interés social proponen dar a jóvenes entre 16 y 18 años una cámara de video para que presenten por televisión sus miradas acerca de la vida.

					</p>
					<p>El estandarte.</p>
					<p>
						Sin embargo, el programa bandera de la nueva programación -o al menos el que ha tenido mayor publicidad- es El lado B de la historia, un proyecto surgido en 2003 tras la conformación de una sociedad entre RTVC, la Asociación de Amigos del Museo Nacional y la productora Cuatro Direcciones Audiovisual.
					</p>
					<p>
						El propósito fue rescatar, a través de los objetos de las exposiciones del Museo, relatos poco conocidos del pasado que tuvieran eco en el presente. En cada uno de los 12 capítulos, es presentado un objeto -el bastón del cacique Turmequé, los cilicios de la madre Josefa del Castillo, la máscara funeraria del poeta momposino Candelario Obeso-, luego un grupo de niños de distintas partes del país hacen comentarios sobre lo que piensan de este, y finalmente un narrador conecta su significado histórico con las problemáticas del presente.
					</p>
					<p>
						En el capítulo tres -que trata sobre las comunidades afrocolombianas-, 'Goyo' y 'Tostao', del grupo del Pacífico Chocquibtown, revisan el pasado de sus ancestros y muestran las tradiciones negras que se mantienen en la actualidad. El televidente se encuentra con datos insólitos. ¿Sabía usted que durante la esclavitud los negros usaban trenzas en sus cabezas como un mapa para señalar las rutas de escape hacia los palenques? Pues así era: los pedazos vacíos de pelo indicaban los ríos y quebradas, mientras que la forma de las trenzas señalaba los caminos. ¿O sabía que en los viajes por el río Magdalena los bogas interpretaban cantos al ritmo del movimiento de sus remos?
					</p>
					<p>
						Según Cristina Lleras, curadora del Museo Nacional, uno de los mayores retos fue traducir el lenguaje académico al televisivo. "Teníamos que hacer programas entretenidos sin comprometer los contenidos -dice Lleras-; es decir, no tener que inventar una amante de algún virrey para que la gente viera el programa".
					</p>

					<p>
						Más que ver el pasado de una manera estática, la propuesta de la nueva parrilla es que los jóvenes se acerquen y lo intervengan. Aunque los programas cuidan el rigor histórico, los protagonistas no son expertos, sino gente común y corriente que tiene algo que contar. "La realización de programas públicos mantiene una tensión constante entre lo audiovisual, la cultura y la academia, pero es esa tensión la que nos permite obtener los resultados", dice Diana Díaz, productora delegada de Señal Colombia, quien admite que, a pesar de todo, no descarta meterse en la pelea por el raiting.
					</p>
					<p>
						En ese aspecto, sin embargo, las cifras de audiencia no han sido alentadoras. Según IBOPE, antes de los Olímpicos, 45.000 televidentes eran fieles a la cadena; durante los Juegos vino una disparada a 138.000, y actualmente son 26.000 en promedio. "Esto indica que, de no ser por ofertas tan especiales como los Olímpicos, la televisión pública no ha tomado fuerza -expresa la analista de televisión Camila González-. Aunque algunas ofertas de Señal Colombia son evidentemente atractivas y de buena factura, las cifras evidencian que, para el imaginario del colombiano promedio, la televisión pública no se posiciona aún como una opción prioritaria. Sin embargo, la medición comercial no debe ser el único termómetro del impacto de este tipo de ofertas".
					</p>
					<p>
						El experto en ciencias de la comunicación Jesús Martín Barbero ya lo había advertido: mientras la finalidad de la televisión comercial es cubrir todos los gustos del televidente, la cultural debe mirar a sus espectadores y enseñar contenidos. Hacia allá apunta Señal Colombia: hacia una televisión con contenidos didácticos y culturales sin que eso signifique, como ocurría en el pasado, un largo bostezo.
					</p>
					<p>
						El Tiempo, (2008).
					</p>
				</section>
				<p>Suban la evidencia de este trabajo a la plataforma</p>

			`,
        upload: false,
        id: 1,
      },
      {
        content: `
				<h2>→ Actividad 6. </h2>
				<img src="https://i.postimg.cc/tgbw01Qx/diana-mate.png" title="Recuerda, en esta actividad debes hacer un entregable.">
<ul class="menu_momento_introductivo">
 			<li class="btn_foro" title="Competencias Básicas"><span><a alt="Competencias Básicas" href=""></a></span></li>
 			<li class="btn_maloka" title="Competencias Socioemocionales"><span><a alt="Competencias Socioemocionales" href=""></a></span></li>
 		</ul>
				<p>Actividad 6. Cada equipo de trabajobuscará información de fuentes impresas y/o digitales para identificar dos tradiciones culturales existentes en el contexto colombiano y se expresen a nivel regional o local, donde habitan los estudiantes.</p>
				<p>
					 Una fuente virtual recomendada: <a href="https://xd.adobe.com/view/50074b53-b817-4129-926e-f7228e96033c-0554/?fullscreen&amp;hints=off" target="_blank" rel="noopener noreferrer">https://xd.adobe.com/view/50074b53-b817-4129-926e-f7228e96033c-0554/?fullscreen&amp;hints=off</a>
				</p>
				<br>
				<img src="https://i.postimg.cc/7LNcqxwQ/diana-lenguaje.png">

				<h3>
					Producto académico 6.
				</h3>

				<ul class="menu_momento_introductivo">
							<li class="btn_control">
								<span><a alt="Competencias Socioemocionales" href=""></a></span>
							</li>
							<li class="btn_control">
								<span><a alt="Competencias Socioemocionales" href=""></a></span>
							</li>
				</ul>
				<img src="assets/images/fondos/Fondo_division_mod.png">
				<p>
					Con la información recolectada se realiza una caracterización básica de dichas tradiciones, de acuerdo con los aspectos de la tabla que se presenta a continuación:
				</p>
				<br>
				<img src="https://i.postimg.cc/WpM2cKYq/11-L-tabla4.png" alt="" class="imgtabla">
				<p>
					Después de realizar la caracterización anterior, cada grupo elige una de las dos tradiciones culturales, a partir de la cual se continuará el desarrollo de las actividades del módulo.
				</p>

				<p>
					Con la tradición cultural seleccionada se realizará una búsqueda, indagación y documentación, para esto deberán acudir a fuentes bibliográficas impresas, digitales, eventos, entrevistas con profesores, líderes, funcionarios y gestores culturales, u otras personas de la región, que conocen, vivencian e impulsan dicha tradición.
				</p>

				<p>
					Esta indagación busca, además de documentar y caracterizar en profundidad, redescubrir dicha tradición para fortalecer su conocimiento y divulgación, lo que impacta su preservación y fortalecimiento como elemento de identidad cultural; además, plantear una propuesta para el desarrollo de actividades y servicios culturales como opción que permita generar nuevos ingresos económicos a las comunidades que aporten al mejoramiento de su calidad de vida.
				</p>

				<p>
					Con la información que se va recopilando, se lleva un registro mediante archivos de grabaciones, fotografías, fichas de resumen, descripciones y observaciones.  Es importante tener en cuenta, que cuando obtengan registros de grabaciones, fotos, entrevistas u otros donde se incluyan a personas distintas al grupo de trabajo, les soliciten de manera explícita el permiso para levantar ese registro y eventualmente publicarlo.
				</p>

				<p>
					En la tabla que sigue a continuación, se establecen los aspectos básicos que deben indagarse y documentarse en profundidad sobre la tradición cultural seleccionada.
				</p>

				<img src="https://i.postimg.cc/6Q2Xj1G3/11-L-tabla5.png" alt="" class="imgtabla">

				<p>
					Después de recopilar toda la información de las diferentes fuentes, el equipo de trabajo la organiza, clasifica y analiza para elaborar a partir de ella los productos académicos finales que se encuentran a continuación:
				</p>


			`,
        upload: false,
        id: 1,
      },
      {
        content: `
				<p>
					Los productos académicos finales son:
				</p>
				<br>
				<img src="https://i.postimg.cc/7LNcqxwQ/diana-lenguaje.png">
				<h3>Producto académico 7</h3>
				<ul class="menu_momento_introductivo">
					<li class="btn_foro"><span><a alt="Competencias Básicas" href=""></a></span></li>
					<li class="btn_maloka"><span><a alt="Competencias Socioemocionales" href=""></a></span></li>
				</ul>
				<img src="assets/images/fondos/Fondo_division_mod.png">

				<p>
					Elaborar un boletín (impreso o virtual) o un web blog (utilizando alguna de las herramientas gratuitas como, por ejemplo, Blogger) dirigido al público en general, donde se presente la tradición cultural que fue documentada, buscando divulgarla, apoyándose para ello en la información analizada, elaborando los elementos comunicativos que consideren más adecuados: descripciones en texto, fotos, videos y grabaciones.
				</p>
				<p>
					 Este producto será socializado en un espacio académico definido por la institución educativa. La evidencia debe subirse a la plataforma en formato PDF.
				</p>

			`,
        upload: false,
        id: 1,
      },
      {
        content: `
				<h3>Producto académico 8</h3>
				<img src="assets/images/fondos/Fondo_division_mod.png">
					<p>
						Elaborar un informe argumentativo que presente y sustente una propuesta, que parta de la tradición cultural analizada, y que genere transformación y desarrollo de las comunidades que la expresan.
					</p>
					<p>
						  Este producto académico se socializará en un espacio académico definido por la institución educativa. El informe debe contener, al menos, los siguientes elementos:
					</p>
					<br>
					<img src="https://i.postimg.cc/CxKYDKhb/11-L-tabla6.png" alt="" class="imgtabla">
					<p>La evidencia deberá subirse a la plataforma.</p>


			`,
        upload: false,
        id: 1,
      },
      {
        content: `
				<img src="https://i.postimg.cc/7LNcqxwQ/diana-lenguaje.png">
				<h1>Momento metacognitivo</h1>
				<ul class="menu_momento_introductivo">
							<li class="btn_control">
								<span><a alt="Competencias Socioemocionales" href=""></a></span>
							</li>
							<li class="btn_control">
								<span><a alt="Competencias Socioemocionales" href=""></a></span>
							</li>
				</ul>
				<img class="divicion_image" src="assets/images/fondos/Fondo_division_mod.png">
				<p>Este es un espacio de auto reflexión y autoevaluación grupal, donde se revisarán y valorarán las experiencias de aprendizajes vividas durante el desarrollo del módulo. El equipo de trabajo se reúne, reflexiona y responde las siguientes preguntas:  </p>
				<p><span class="icon_objetivos"></span>
					<strong>
 					¿Qué nuevas capacidades personales y sociales desarrollaron mediante la realización de las actividades de aprendizaje?
					</strong>
				</p>
				<p><span class="icon_objetivos"></span>
					<strong>
						¿Cuáles fueron las mayores dificultades que experimentaron durante el desarrollo de las actividades de aprendizaje?
					</strong>
				</p>
				<p><span class="icon_objetivos"></span>
					<strong>
						¿Qué nuevas estrategias adquirieron para optimizar el trabajo personal y en equipo en experiencias posteriores?
					</strong>
				</p>


			`,
        upload: true,
        phase: 1,
        id: 1,
      },
      {
        content: `
				<h1 class="proudcto_academico_tit">FASE POSTACTIVA</h1>
		
				<p>
					El propósito de las actividades que conforman esta fase es que los estudiantes y docentes revisen, reflexionen y valoren los resultados del proceso de aprendizaje mediante el desarrollo del módulo, lo que involucra la realización de las actividades y los productos académicos definidos, con el objeto de aprovechar este conocimiento en función de la consolidación de los mismos aprendizajes y de la cualificación de las estrategias para futuras experiencias.
				</p>
				<img src="assets/images/fondos/Fondo_division_mod.png">
<br>
				<img src="https://i.postimg.cc/7LNcqxwQ/diana-lenguaje.png">

				<h3>
					Actividad 7
				</h3>
				<img src="https://i.postimg.cc/tgbw01Qx/diana-mate.png" title="Recuerda, en esta actividad debes hacer un entregable.">
<ul class="menu_momento_introductivo">
 			<li class="btn_foro" title="Competencias Básicas"><span><a alt="Competencias Básicas" href=""></a></span></li>
 		</ul>
				<ul class="menu_momento_introductivo">
					<li class="btn_foro"><span><a alt="Competencias Básicas" href=""></a></span></li>
					<li class="btn_maloka"><span><a alt="Competencias Socioemocionales" href=""></a></span></li>
				</ul>

				<p>
					Durante esta actividad, se llevará a cabo el proceso de evaluación del módulo, mediante la revisión, reflexión y valoración del desarrollo de las actividades y los resultados de aprendizajes alcanzados por los estudiantes, a través de la autoevaluación, coevaluación, heteroevaluación y metaevaluación.
				</p>

				<p><span class="icon_objetivos"></span>
					<strong>
						Autoevaluación
					</strong>
				</p>

				<p>
					Cada uno de los equipos de trabajo realiza la autoevaluación formativa del módulo, la cual está orientada a reconocer los aprendizajes, avances y resultados obtenidos de todo el proceso. Para esta actividad es importante recuperar las auto reflexiones y autoevaluaciones expresadas por los equipos en los momentos metacognitivos. Para realizar este ejercicio se tienen como referencia los criterios y elementos que se presentan en la siguiente tabla:
				</p>
				<img src="https://i.postimg.cc/pdwtgYDB/11-L-tabla7.png" alt="" class="imgtabla">

				<p><span class="icon_objetivos"></span>
					<strong>
						Coevaluación
					</strong>
				</p>


				<p>
					Cada uno de los equipos realizará la coevaluación formativa de los resultados presentados por otro equipo, la cual está orientada a establecer valoraciones y sugerencias de mejoramiento, de acuerdo con los criterios presentados en la siguiente tabla:
				</p>
				<img src="https://i.postimg.cc/y8rKTzxt/11-L-tabla8.png" alt="" class="imgtabla">


				<p><span class="icon_objetivos"></span>
					<strong>
						Heteroevaluación
					</strong>
				</p>

				<p>
					El docente evalúa el desempeño de los estudiantes (heteroevaluación), a partir de los productos académicos que cada grupo elabora durante el desarrollo del módulo, y, apoyándose en las rúbricas que se proponen en la tabla que sigue a continuación, donde se agrupan la comprensión e interpretación textual, la producción de textos y la auto reflexión y autoevaluación.
				</p>

				<img src="https://i.postimg.cc/MHxJG63M/11-L-tabla9.png" alt="" class="imgtabla">


				<p><span class="icon_objetivos"></span>
					<strong>
						Metaevaluación
					</strong>
				</p>

				<p>
					El docente y cada uno de los equipos de estudiantes participarán en la realización de la metaevaluación, la cual se orienta a valorar la efectividad de los mecanismos de evaluación que se implementaron en el desarrollo del módulo, con el fin de establecer estrategias de mejoramiento en estos procesos futuros.  Esta actividad busca determinar los aportes y el rol de la evaluación en el afianzamiento de las habilidades y los aprendizajes, así como establecer las observaciones de mejoramiento de la evaluación para próximos proyectos.
				</p>
				<p>
					La metaevaluación se realizará, por parte de cada uno de los actores académicos, respondiendo las preguntas que se formulan en la matriz que se encuentra a continuación.
				</p>

				<img src="https://i.postimg.cc/JnHzXzQp/11-L-tabla10.png" alt="" class="imgtabla">



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
    this.route.params.subscribe((params: Params) => {
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
      this.phase = this.phases[this.modules[this.grade][this.page - 1].phase];
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
      console.log(formData);
      await this.evidence.upload(this.phase, 2, formData);
      this.uploadForm.value.file = '';
      alert('Enviado con exito');
    } catch {
      this.isValidFile = true;
      alert('Lo sentimos hubo algun error, intentelo mas tarde');
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
}
