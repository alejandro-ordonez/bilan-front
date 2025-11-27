import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EvidenceUseCase } from '@domain/usecases/evidence.usecase';
import { Phase } from '@domain/models/evidence.model';

@Component({
  selector: 'app-module-actividades-ciencias-naturales',
  templateUrl: './module-actividades-ciencias-naturales.component.html',
  styleUrls: ['./module-actividades-ciencias-naturales.component.scss'],
})
export class ModuleActividadesCienciasNaturalesComponent implements OnInit {
  page: any;
  grade: any;

  phases: Phase[] = ['PRE_ACTIVE', 'INTERACTIVE', 'POST_ACTIVE'];
  phase: Phase;
  isValidFile: boolean = false;
  isEvidenceSubmitted: boolean = false;
  uploadForm: FormGroup;

  modules: any = {
    10: [
      {
        content: `
 		<h1>FASE PREACTIVA O DE EXPLORACIÓN DE SABERES PREVIOS</h1>

 		<p>Buen día estimado estudiante, a continuación, usted encontrará una serie de actividades, que van desde la exploración de las ideas que tiene sobre Cambio Climático y Soberanía alimentaria, hasta el diseño y ejecución de un trabajo investigativo comunitario, fundamentado en el modelo metodológico del aprendizaje basado en proyectos.</p>

 		<img class="divicion_image" src="assets/images/fondos/Fondo_division_mod.png">
 		<h2 class="ct-naturales">→ Actividad 1:</h2><br>
		 <img src="https://i.postimg.cc/tgbw01Qx/diana-mate.png" title="Recuerda, en esta actividad debes hacer un entregable.">
<ul class="menu_momento_introductivo">
 			<li class="btn_foro" title="Competencias Básicas"><span><a alt="Competencias Básicas" href=""></a></span></li>
 			<li class="btn_maloka" title="Competencias Socioemocionales"><span><a alt="Competencias Socioemocionales" href=""></a></span></li>
 			<li class="btn_perfil" title="Competencias Ciudadanas"><span><a alt="Competencias Ciudadanas" href=""></a></span></li>
 		</ul>
 		<b>Activación cognitiva para el aprendizaje</b>
 		<p>A lo largo de la historieta de la Figura 2 debe identificar por lo menos 8 elementos que desde su conocimiento crea que son importantes para desarrollar un proyecto comunitario a partir de la Soberanía Alimentaria, conectado a la mitigación y adaptación al Cambio Climático.
 		<br><br>
 		<b><i>Figura 2.</i></b>
 		<i>Algunas reflexiones alrededor de la contaminación ambiental y el Cambio Climático.</i> <br>
 		<img class="imgfigura" src="https://i.postimg.cc/KY0RhdrZ/10-Cn-Recurso-11img-1.png">
 		</p><p><i>Nota. Elaboración propia.</i></p>
 		<p>Como complemento responda desde la argumentación reflexiva y crítica la siguiente pregunta: </p>
 		<ul class="span_"><span class="icon_alerta"></span><p class="p_parrafo">La comunidad científica plantea que, para el caso del Cambio Climático, lo único que queda es trabajar por mitigarlo y adaptarse. ¿Qué podemos aportar en colectivo? ¿Qué podemos aportar como individuos? Se sugiere realizar un debate en clase.</p></ul>

 	`,
        upload: false,
        id: 1,
      },
      {
        content: `
				<ul class="menu_momento_introductivo">
					<li class="btn_foro"><span><a alt="Competencias Básicas" href=""></a></span></li>
					<li class="btn_maloka"><span><a alt="Competencias Socioemocionales" href=""></a></span></li>
					<li class="btn_maloka"><span><a alt="Competencias Socioemocionales" href=""></a></span></li>
				</ul>
				<img class="divicion_image" src="assets/images/fondos/Fondo_division_mod.png">

				<h2 class="ct-naturales">→ Actividad 2:</h2><br>
				<b>Preconceptos</b>
				<p>Ahora, en grupos de estudiantes o con su familia, se invita a escribir, sin la ayuda de diccionarios, libros o internet, el motivo por el cual son importantes cada uno de los ocho o más elementos que anotaron en el numeral anterior. Luego, mediante un ejercicio del curso en general, se compartirán las narraciones de todos y con la ayuda de su profesor lograrán aclarar conceptos.
				<br><br>
				<b><i>Figura 2.</i></b>
				<i>Algunas reflexiones alrededor de la contaminación ambiental y el Cambio Climático.</i>

				</p><p><i>Nota. Elaboración propia.</i></p>
				<p>Como complemento responde desde la argumentación reflexiva y crítica la siguiente pregunta: </p>
				<ul class="span_"><span class="icon_alerta"></span><p class="p_parrafo">La comunidad científica plantea que, para el caso del Cambio Climático, lo único que queda es trabajar por mitigarlo y adaptarse. ¿Qué podemos aportar en colectivo? ¿Qué podemos aportar como individuos? Se sugiere realizar un debate en clase.</p></ul>

 	`,
        upload: true,
        phase: 0,
        id: 1,
      },
      {
        content: `
 		<h1>FASE INTERACTIVA</h1>

 		<img class="divicion_image" src="assets/images/fondos/Fondo_division_mod.png">
 		<h2 class="ct-naturales">→ Actividad 3:</h2><br>
 		<b>Desarrollo</b>

 		<p>En este apartado se sientan las bases para establecer las relaciones entre soberanía alimentaria y Cambio Climático.</p>
		 <img src="https://i.postimg.cc/tgbw01Qx/diana-mate.png" title="Recuerda, en esta actividad debes hacer un entregable.">
 		<ul class="menu_momento_introductivo">
 			<li class="btn_foro"><span><a alt="Competencias Básicas" href=""></a></span></li>
 			<li class="btn_maloka"><span><a alt="Competencias Socioemocionales" href=""></a></span></li>
 			<li class="btn_maloka"><span><a alt="Competencias Socioemocionales" href=""></a></span></li>
 		</ul>
 		<img class="divicion_image" src="assets/images/fondos/Fondo_division_mod.png">
 		<br><br>
 		<b>3.1.	El Cambio Climático y la soberanía alimentaria</b>
 		<section class="extract_content">
 			<p>La Convención Marco sobre el Cambio Climático (CMCC), define el Cambio Climático como una serie de transformaciones en las condiciones del tiempo atmosférico atribuidas directa o indirectamente a la actividad humana. </p>
 			<p>Los principales factores que afectan el clima de la Tierra son los cambios en el nivel del mar, los efectos de las nubes, la emisión de aerosoles, el aumento en las emisiones de dióxido de carbono, metano, hidratos de metano y óxidos de nitrógeno. </p>
 			<p>Otros elementos que pueden incidir en las variaciones climáticas terrestres son: los cambios en la reflexión terrestre y en el campo magnético exterior (Miller, 2007). Para el primer caso, la capa de hielo que existe de forma permanente en el planeta, aumenta la superficie de reflexión a la atmosfera de los rayos solares, contribuyendo a su enfriamiento. Por el contrario, la disminución de la masa de hielo disminuye la reflexión y con ello aumentaría la temperatura terrestre (Fernández, 2012). </p>
 			<p>Para el segundo caso, se tiene que el campo magnético puede que ayude a regular los fenómenos climáticos al actuar como escudo protector de partículas que proceden del universo exterior. Existen proyectos de investigación en desarrollo, para determinar si el debilitamiento del campo magnético a partir de la formación de nubes podría afectar el enfriamiento de la Tierra.</p>
 			<p>Otros factores que también pueden causar el Cambio Climático son las transformaciones en la cantidad de hielo polar, el mayor contenido de vapor de agua en la atmósfera y la cantidad de energía solar que alcanza y no abandona la Tierra. </p>
 			<p>Los cambios en el clima incluyen el aumento de las temperaturas, grandes variaciones en las precipitaciones, olas de calor, sequías, elevación del nivel del mar por el derretimiento del hielo y la creciente frecuencia e intensidad de fenómenos climáticos extremos como los huracanes y tifones (Díaz, 2012). </p>
 			<p>Dentro de las afectaciones a los ecosistemas están: la anticipación de las primaveras; el desplazamiento de hielo hacia latitudes cada vez más lejanas y hacia altitudes mayores; migraciones de especies; el adelanto de las fechas de caudal máximo en numerosos ríos alimentados por glaciares, nieve o grandes precipitaciones; el calentamiento de lagos, lagunas, manglares, humedales y ríos en numerosas regiones de todo el planeta, con efectos sobre la columna térmica y calidad del agua. </p>
 			<p>Para el caso de Colombia, hay cinco efectos visibles que demuestran el cambio climático, estos son: el derretimiento de los glaciares de alta montaña, el blanqueamiento de los arrecifes de corales, la pérdida de playas y la erosión costera, los eventos extremos de lluvias y sequías y los animales en peligro de extinción (Semana, 2017). </p>
 			<p>Es inaplazable reflexionar sobre el hecho que el “desarrollo” de la humanidad está llevando a la pérdida de humedales, ríos, lagos, lagunas, manglares y a un creciente deterioro de los ecosistemas en general (Díaz, 2012). </p>
 			<p>En el mismo sentido, Carrizosa (2014), en su libro Colombia compleja, plantea que la extrema complejidad del sistema planetario hasta ahora se empieza a descifrar y es ampliamente posible que su integridad se encuentre amenazada como causa del Cambio Climático.</p>
 			<p>Por su parte, Meira, Arto &amp; Montero (2009), llaman la atención sobre el hecho que uno de los retos principales de la educación es orientar hacia la mitigación del Cambio Climático y promover la adaptación a sus consecuencias inevitables. </p>
 			<p>En este último contexto, otros autores han planteado lo siguiente: </p>
 			<p>La adaptación al cambio climático, es el fortalecimiento de la resiliencia de un territorio, o sea de la capacidad de sus ecosistemas y de sus comunidades para absorber sin traumatismos los efectos del cambio climático y para recuperarse adecuada y oportunamente de los impactos negativos que esos efectos puedan causar. (Wilches-Chaux, 2017, p. 94)</p>
 			<p>De otro lado, las posibles soluciones sugeridas por la ciencia relacionadas con las alternativas de mitigación del Cambio Climático no son suficientes para dar cuenta de la resolución de este complejo desafío. Se precisa de una visión sustentable, donde sea fundamental el reconocimiento de otros campos del saber (Rozo, 2020). Dentro de tales conocimientos se encuentran los que se vinculan con la forma en la que los seres humanos se relacionan con la tierra, el agua y el aire.  Las comunidades ancestrales de indígenas y campesinos abordan estas conexiones desde la soberanía alimentaria, la cual se vincula con la mitigación del Cambio Climático desde los siguientes principios: priorizar el buen vivir de todos los seres, privilegiar el uso de elementos orgánicos, incentivar el policultivo y, distribuir equitativamente la tierra. </p>
 			<p>En este mismo sentido, una definición muy apropiada para soberanía alimentaria es la planteada por la Vía Campesina de Brasil, la cual manifiesta al respecto que dicho concepto tiene estrecha relación con el siguiente principio: “el alimento no es una mercancía, es un derecho humano”. Además, complementa afirmando que la producción y distribución de los alimentos es una cuestión de supervivencia de los seres humanos, por lo que es un tema de soberanía popular y nacional (Stedile &amp; Martins, 2010).</p>
 			<p>Agrega la Vía Campesina, que soberanía significa que cada país, tiene el derecho de producir sus alimentos para la subsistencia de sus poblaciones. Comida adecuada al territorio donde viven, a sus necesidades y hábitos nutricionales (Stedile &amp; Martins, 2010).</p>
 			<p>Por otra parte, Arias (2009) plantea que la soberanía alimentaria: impulsa redes de comercio justas entre lo rural y lo urbano; promueve una relación directa entre productores y consumidores; respeta los hábitos culturales alimenticios de los pueblos; privilegia una agricultura en la que priman los insumos naturales u orgánicos, una agricultura ecológica que prioriza la conservación del agua, del suelo, del aire, de las semillas; tiene como otro de sus principios fundamentales la distribución igualitaria de la tierra, autogestionada por los campesinos y las comunidades indígenas.</p>
 			<p>Iniciativas como la defensa de la soberanía alimentaria, que incluyen el territorio, la conservación del patrimonio colectivo de los pueblos, del agua y de la agrobiodiversidad, se pueden adelantar a partir de: la recuperación de semillas nativas; las huertas orgánicas que involucran policultivos; el reconocimiento y rescate de los conocimientos y saberes ancestrales; entre otros.</p>
 			<p>La relación dominante del ser humano sobre la naturaleza es, para muchas comunidades científicas y otros colectivos, una de las principales causas del Cambio Climático, el cual se distribuye entre los diversos actores sociales y territorios generando la degradación de los ecosistemas, las sequías, la escasez, la falta de acceso al agua, las epidemias, las pandemias, las pérdidas de las diversidades natural y cultural, la merma de las cosechas agrícolas para las comunidades indígenas y de campesinos, entre otros efectos (Rozo, 2020). </p>
 			<p>Es urgente saber que la ciencia únicamente no puede dar las soluciones a los impactos ya constituidos y por ocurrir como consecuencia del Cambio Climático. Se precisa del trabajo sistémico de distintos campos del conocimiento a través del diálogo de saberes.</p>
 			<p>El diálogo de saberes es el encuentro de personas diferenciadas por la diversidad cultural, disciplinar o de campos del conocimiento, de forma horizontal. El saber ambiental produce nuevas significaciones sociales, saberes que deben escapar de las cuestiones de poder (Leff, 2009).</p>
 			<p>Tal saber ambiental ha conducido a que solo unos pocos nieguen el Cambio Climático. La ciencia ha encontrado que es un fenómeno inédito en la historia humana, con consecuencias inimaginables y devastadoras (De Ambrosio, 2014) desde todas las perspectivas culturales, es un hecho que incumbe a todos y desde las instituciones educativas es un asunto que debe ser tratado para llevar a la reflexión crítica sobre nuestro papel como ciudadanos planetarios, si es que queremos mantener la supervivencia de millones de especies biológicas y la nuestra también. Es ante todo una respuesta como ciudadanos planetarios para transformar la realidad ambiental de nuestra Tierra (Figura 3), por la cual los principios de precaución, justicia, buen vivir e igualdad entre todos los seres nos lleven a tomar las decisiones responsables (Leff, 2009).</p>
 			<br><br>
 			<i><b>Figura 3.</b></i>
 			<br><br>
 			<i>Algunas causas y consecuencias del Cambio Climático.</i>
 			<br><br>
 			<img class="imgfigura" src="https://i.postimg.cc/3NfR06xK/CN-Climatico.png">
 			<br><br>
 			<i>Nota. Elaboración propia.</i>
 		<br><br>
 		<p><i>La soberanía alimentaria, a partir del desarrollo de huertas orgánicas, centros de compostaje, camas de lombricultivo, producción de alimentos también de origen orgánico, entre otras estrategias, son una importante contribución a la mitigación y adaptación al Cambio Climático, ya que no se vierten a los suelos, ni a los cuerpos de agua, agroquímicos que contaminan las aguas (Figura 2) y con ello no permitan la supervivencia de inmensas poblaciones de algas.</i></p>
 		<p><i>Las poblaciones de algas en el planeta absorben más dióxido de carbono a través de la fotosíntesis que las plantas. La contaminación de los cuerpos de agua provoca que la luz que entra a los ecosistemas acuáticos sea considerablemente menor, como consecuencia el hábitat de las algas se reduce drásticamente y su muerte es masiva.</i></p>
 		<p><i>Por otro lado, alimentarse con productos naturales como los provenientes de una huerta orgánica, permiten la disminución del consumo de comida industrializada. Esta última se caracteriza por: ser procesada o ultra procesada, es decir, usa colorantes, conservantes, edulcorantes, saborizantes, nutrientes sintéticos; utiliza para su empaquetamiento grandes cantidades de plástico, latas, cartón o icopor; agentes que contaminan y contribuyen al Cambio Climático. </i></p>
 		<p><i>Finalmente, los proyectos de soberanía alimentaria permiten reducir drásticamente los trayectos existentes entre los lugares donde se producen los alimentos y los espacios en los que se consumen (ver Figura 7). </i></p>

 		<br><br>
 		<img class="divicion_image" src="assets/images/fondos/Fondo_division_mod.png">
 		<br><br>
 		<p style="font-size: 1.5rem; font-weight: 700;">Controversia sociocientífica</p>
 		<br><br>
 		<p>Se invita a observar el video sobre el Cambio Climático que se encuentra en el siguiente enlace: </p><a href="https://www.youtube.com/watch?v=cgBvbB4krdE">https://www.youtube.com/watch?v=cgBvbB4krdE</a>
 		<br>
 		<img src="" width="100%">
 		<p>Luego de observar el video se sugiere: organizar cuatro grupos de estudiantes; después, realizar un debate o controversia en el aula de clase, para que cada conjunto de estudiantes argumente los puntos a favor de su postura; finalmente, se recomienda realizar una tabla con los elementos negativos y positivos de cada posición. </p>
 		<p>Las cuatro posturas o posiciones son:</p>
 		<p>1.	Alarmistas apocalípticos.</p>
 		<p>2.	Alarmistas optimistas.</p>
 		<p>3.	Escépticos.</p>
 		<p>4.	Negacionistas.</p>
 		<p>Suba esta tabla en formato *.XLS, *.DOC o PDF a la plataforma, como evidencia del trabajo.</p>

 	`,
        upload: true,
        phase: 1,
        id: 1,
      },
      {
        content: `
 		<ul class="menu_momento_introductivo">
 			<li class="btn_maloka"><span><a alt="Competencias Socioemocionales" href=""></a></span></li>
 			<li class="btn_maloka"><span><a alt="Competencias Socioemocionales" href=""></a></span></li>
 			<li class="btn_maloka"><span><a alt="Competencias Socioemocionales" href=""></a></span></li>
 		</ul>
 		<img class="divicion_image" src="assets/images/fondos/Fondo_division_mod.png">
 		<br><br>
 		<p style="font-weight: 600; font-size: 1.2rem;">3.2.	Formulación del proyecto </p>
 		<p>Ahora, se invita a realizar un proyecto por grupos de estudiantes, para lo cual se tendrá en cuenta el aprendizaje basado en proyectos (ABP), planteado por Moreno &amp; Caro (2018), en el libro Guía de Aprendizaje Basado en un Proyecto Ciudadano para Educación Media publicado por el Ministerio de Educación Nacional.</p>
 		<br><br>
 		<p style="font-weight: 600; font-size: 1.1rem;">3.2.1. Diseñar una idea </p>
 		<p>En esta primera fase se identificará el tema general del proyecto. Dicha idea deberá tener relación con el tema de este módulo, es decir, la soberanía alimentaria como estrategia que contribuye a la mitigación y adaptación frente al Cambio climático. </p>
 		<p>Para ello se pueden tener en cuenta las siguientes preguntas: </p>
 		<p>¿Qué se sabe sobre el tema? </p>
 		<p>¿Qué se necesita averiguar sobre el tema? </p>
 		<p>¿Qué se espera aprender y enseñar? </p>
 		<p>¿Por qué́ este tema es importante para el contexto?</p>
 		<br><br>
 		<p style="font-weight: 600; font-size: 1.1rem;">3.2.2. Definir el alcance </p>
 		<p>Para este punto se recomienda que el alcance sea extenso, por lo que puede ir entre un bimestre y un semestre. Se propone tener en cuenta, para la implementación del proyecto (Moreno, &amp; Caro, 2018), que: </p>
 		<ul class="span_"><span class="icon_alerta"></span><p class="p_parrafo">Los estudiantes decidan sobre el tema y grupo de trabajo.</p></ul>
 		<ul class="span_"><span class="icon_alerta"></span><p class="p_parrafo">Las actividades y la evaluación sean diseñadas previamente entre docente y estudiantes.</p></ul>
 		<ul class="span_"><span class="icon_alerta"></span><p class="p_parrafo">Los proyectos sean realizados por todo el curso o cursos de décimo.</p></ul>
 		<ul class="span_"><span class="icon_alerta"></span><p class="p_parrafo">Los proyectos sean presentados a todo o gran parte del colegio y/o panel de expertos.</p></ul>
 		<ul class="span_"><span class="icon_alerta"></span><p class="p_parrafo">Los proyectos sean trabajados de forma inter y/o transdisciplinar.</p></ul>
 		<ul class="span_"><span class="icon_alerta"></span><p class="p_parrafo">Los proyectos involucren a uno o varios de los proyectos pedagógicos transversales.</p></ul>
 		<ul class="span_"><span class="icon_alerta"></span><p class="p_parrafo">Se use la mayor cantidad de medios tecnológicos posible.</p></ul>
 		<ul class="span_"><span class="icon_alerta"></span><p class="p_parrafo">Los proyectos sean evaluados por más de un docente y otros miembros de la comunidad educativa.</p></ul>
 		<ul class="span_"><span class="icon_alerta"></span><p class="p_parrafo">Se elabore un cronograma de trabajo.</p></ul>

 	`,
        upload: false,
        id: 1,
      },
      {
        content: `

 		<ul class="menu_momento_introductivo">
 			<li class="btn_maloka"><span><a alt="Competencias Socioemocionales" href=""></a></span></li>
 			<li class="btn_maloka"><span><a alt="Competencias Socioemocionales" href=""></a></span></li>
 			<li class="btn_maloka"><span><a alt="Competencias Socioemocionales" href=""></a></span></li>
 		</ul>
 		<img class="divicion_image" src="assets/images/fondos/Fondo_division_mod.png">
 		<br><br>
 		<p style="font-weight: 600; font-size: 1.1rem;">3.2.3. Crear la pregunta orientadora </p>
 		<p>Teniendo en cuenta el contexto en él que se encuentra, escriba una pregunta relacionada con la soberanía alimentaria y el Cambio Climático, en acuerdo con una problemática de su establecimiento educativo, casa, finca, o del territorio que habita, con el propósito de desarrollar un proyecto ambiental.</p>
 		<p>Para trabajar este punto, debe observar su entorno, los recursos con los que cuenta y buscar una problemática ambiental que tenga relación con la soberanía alimentaria y que ayude en la mitigación y adaptación al Cambio Climático. Puede informarse más sobre la soberanía alimentaria, observando los videos presentes en los siguientes enlaces:</p>
 		<p>Alimentos soberanos para niños Latinoamericanos, el ají: <a href="https://youtu.be/yj6x8Yc_hOc">https://youtu.be/yj6x8Yc_hOc</a></p>
 		<p>Alimentos soberanos para niños Latinoamericanos, la papa: <a href="https://youtu.be/Ji77Z6FbtLQ">https://youtu.be/Ji77Z6FbtLQ</a></p>
 		<p>Alimentos soberanos para niños Latinoamericanos, el maíz: <a href="https://youtu.be/pQNdvj2LaNs">https://youtu.be/pQNdvj2LaNs</a></p>
 		<p>¿Qué agroecología necesitamos? <a href="https://youtu.be/24IiC2r4nk0">https://youtu.be/24IiC2r4nk0</a></p>
 		<p>Para empezar, se invita a escribir la pregunta problema, veamos dos ejemplos:</p>
 		<ul class="span_"><span class="icon_alerta"></span><p class="p_parrafo">¿De qué forma se puede garantizar el abastecimiento de agua permanente para la huerta de mi casa?</p></ul>
 		<ul class="span_"><span class="icon_alerta"></span><p class="p_parrafo">¿Cuáles beneficios, desde el punto de vista químico, se presentan para el ambiente ecológico y en la salud humana cuando se produce humus a partir de la implementación de un lombricultivo en el establecimiento educativo…?</p></ul>
 		<p>Los temas son variados y pueden tener relación con: implementación de huertas orgánicas; centros de compostaje; camas de lombricultivo; producción y venta o trueque de alimentos como mermeladas, encurtidos; elaboración de cremas medicinales; deshidratación de plantas aromáticas y/o medicinales para su comercialización; entre otros.</p>
 		<br><br>
 		<p style="font-weight: 600; font-size: 1.1rem;">3.2.4. Plantear productos y resultados</p>
 		<p>Los resultados a través de los productos, permiten visibilizar el trabajo desarrollado en el proyecto. Existen distintos tipos de éstos: escritos, verbales, tecnológicos, mediáticos, de planeación, de construcción y de formación (Moreno, &amp; Caro, 2018). A continuación se presentan algunos ejemplos: </p>
 		<ul class="span_"><span class="icon_alerta"></span><p class="p_parrafo"> 	Elaboración de borradores, propuestas, resúmenes, ensayos, esquemas, planos, notas y reportes de reuniones de los equipos de trabajo.</p></ul>
 		<ul class="span_"><span class="icon_alerta"></span><p class="p_parrafo"> 	Utilización permanente de un diario de campo.</p></ul>
 		<ul class="span_"><span class="icon_alerta"></span><p class="p_parrafo"> 	Desarrollo de técnicas e instrumentos de recolección de datos.</p></ul>
 		<ul class="span_"><span class="icon_alerta"></span><p class="p_parrafo">Diseño y creación de modelos, videos, guías de campo, presentaciones digitales.</p></ul>
 		<ul class="span_"><span class="icon_alerta"></span><p class="p_parrafo"> 	Ejecución de informes de investigación. </p></ul>
 		<ul class="span_"><span class="icon_alerta"></span><p class="p_parrafo"> 	Realización de obras de teatro, presentaciones musicales, debates públicos. </p></ul>
 		<ul class="span_"><span class="icon_alerta"></span><p class="p_parrafo"> 	Desarrollo de revisiones bibliográficas.</p></ul>
 		<ul class="span_"><span class="icon_alerta"></span><p class="p_parrafo"> 	Socialización pública de avances y del trabajo final.</p></ul>

 	`,
        upload: false,
        id: 1,
      },
      {
        content: `
 		<p style="font-weight: 600; font-size: 1.1rem;">3.2.5. Organizar el proyecto </p> <br><br>
 		<p>Para la organización del proyecto se recomienda seguir cada uno de los siguientes pasos.</p>

 		<img src="https://i.postimg.cc/tgbw01Qx/diana-mate.png"><ul class="menu_momento_introductivo">
 					<li class="btn_foro"><span><a alt="Competencias Básicas" href=""></a></span></li>
 					<li class="btn_maloka"><span><a alt="Competencias Socioemocionales" href=""></a></span></li>
 					<li class="btn_perfil"><span><a alt="Competencias Ciudadanas" href=""></a></span></li>
 				</ul>
 		<img class="divicion_image" src="assets/images/fondos/Fondo_division_mod.png">
 		<br><br>
 		<p style="font-size: 1rem; font-weight: 550;"><em>3.2.5.1.	Planteamiento del objetivo general y objetivos específicos.</em></p>
 		<p>Para este numeral, se recomienda plantear y escribir el objetivo general y los específicos, los cuales deben ir en acuerdo con las necesidades y el contexto. Además, tienen las siguientes características: ser medibles cualitativa o cuantitativamente, viables, verificables y precisos. Hay que recordar que los objetivos específicos determinan los pasos o acciones para alcanzar el objetivo general.</p>
 		<p>Como se observa en la Figura 4, el objetivo específico formulado como ejemplo, menciona los saberes y prácticas ancestrales y tradicionales. Es fundamental tener en cuenta que dichos conocimientos se encuentran vinculados con la familia, la organización social, los valores y el ambiente, promoviendo la conservación y consolidación de las diversidades ecológica y cultural, y con ello la sobrevivencia de las comunidades agrícolas (Bernstein, 2012). </p>
 		<p>No se puede desestimar la capacidad de los agricultores para modificar y adaptar a través de los saberes y prácticas ancestrales y tradicionales la producción hortícola a un modelo propio y ambientalmente favorable.</p>
 		<br><br>
 		<i><b>Figura 4. </b></i>
 		<p>Ejemplos de objetivos general y específicos.</p>
 		<img src="https://i.postimg.cc/3NVx8cBz/CN10-FIG4-2x.png" width="100%">
 		<br><br>
 			<i>Nota. Elaboración propia.</i>
 		<br><br>

 		<img src="https://i.postimg.cc/tgbw01Qx/diana-mate.png"><ul class="menu_momento_introductivo">
 					<li class="btn_foro"><span><a alt="Competencias Básicas" href=""></a></span></li>
 					<li class="btn_maloka"><span><a alt="Competencias Socioemocionales" href=""></a></span></li>
 					<li class="btn_perfil"><span><a alt="Competencias Ciudadanas" href=""></a></span></li>
 				</ul>
 		<img class="divicion_image" src="assets/images/fondos/Fondo_division_mod.png">
 		<br><br>
 		<p style="font-size: 1rem; font-weight: 550;"><em>3.2.5.2.	Título del proyecto.</em></p>
 		<p>Teniendo como base la problemática y los objetivos formulados, se define el título del proyecto.</p><br>
 		<br>
		 <img src="https://i.postimg.cc/tgbw01Qx/diana-mate.png">
 		<ul class="menu_momento_introductivo">
 					<li class="btn_foro"><span><a alt="Competencias Básicas" href=""></a></span></li>
 					<li class="btn_maloka"><span><a alt="Competencias Socioemocionales" href=""></a></span></li>
 					<li class="btn_perfil"><span><a alt="Competencias Ciudadanas" href=""></a></span></li>
 				</ul>
 		<img class="divicion_image" src="assets/images/fondos/Fondo_division_mod.png">
 		<br><br>
 		<p style="font-size: 1rem; font-weight: 550;"><em>3.2.5.3.	Fundamentación teórica del proyecto.</em></p>
 		<p>En este momento del proyecto y para el caso del ejemplo que se viene planteando, se recomienda desarrollar un cuerpo teórico que responda al primer objetivo específico:</p>
 		<p>Explorar conocimientos académicos, populares y ancestrales alrededor del diseño de una huerta orgánica.</p>
 		<p>Para ello hay que buscar en libros o internet elementos teóricos fundamentales que ayuden a aclarar este punto y luego proceder a escribirlos en el proyecto. </p>
 		<p>A continuación, se encuentran algunos enlaces que ayudarán a encontrar información.</p>
 		<br><br>
 		<b>Huertas orgánicas:</b>
 		<a href="https://twitter.com/fundebase/status/948359473978060800/photo/1">https://twitter.com/fundebase/status/948359473978060800/photo/1</a>
 		<br><br>
 		<b>Elaboración de abono orgánico:</b>
 		<a href="https://www.ica.gov.co/areas/agricola/servicios/agricultura-ecologica-1/documentos/cartilla-elaboracion-abono-organico-solido-28-11-2.aspx">https://www.ica.gov.co/areas/agricola/servicios/agricultura-ecologica-1/documentos/cartilla-elaboracion-abono-organico-solido-28-11-2.aspx</a>
 		<br><br>
 		<b>Huertas familiares y orgánicas. Cultivando Soberanía Alimentaria:</b>
 		<a href="https://www.opia.cl/static/website/601/articles-99232_archivo_01.pdf">https://www.opia.cl/static/website/601/articles-99232_archivo_01.pdf</a>
 		<br><br>
 		<b>Dulces y Conservas:</b>
 		<a href="http://cajondeherramientas.com.ar/wp-content/uploads/2015/06/253970413-Cartilla-11-Dulces-y-Conservas.pdf">http://cajondeherramientas.com.ar/wp-content/uploads/2015/06/253970413-Cartilla-11-Dulces-y-Conservas.pdf</a>

 		<p>Organice toda la información recopilada en esta fase y compílela en un archivo *.DOC o PDF y súbalo a la plataforma.</p>

 	`,
        upload: false,
        id: 1,
      },
      {
        content: `
 		<h1>FASE POSTACTIVA O DE APLICACIÓN</h1>
		 <img src="https://i.postimg.cc/tgbw01Qx/diana-mate.png" title="Recuerda, en esta actividad debes hacer un entregable.">
<ul class="menu_momento_introductivo">
 			<li class="btn_foro" title="Competencias Básicas"><span><a alt="Competencias Básicas" href=""></a></span></li>
 			<li class="btn_maloka" title="Competencias Socioemocionales"><span><a alt="Competencias Socioemocionales" href=""></a></span></li>
 			<li class="btn_perfil" title="Competencias Ciudadanas"><span><a alt="Competencias Ciudadanas" href=""></a></span></li>
 		</ul>
 		<img class="divicion_image" src="assets/images/fondos/Fondo_division_mod.png">
 		<br><br>
 		<p style="font-weight: 550; font-size: 1rem;"><em>3.2.5.4.	Planeación y ejecución de las fases del proyecto.</em></p>

 		<p>En este momento del proyecto se recomienda: primero, planear las fases a través de las cuales se podrá llevar a cabo el proyecto, cada una de ellas debe guardar estricta coherencia con su respectivo objetivo específico, como se puede evidenciar en el ejemplo de la Figura 5; segundo, implementar cada una de las fases.</p>
 		<p>Se sugiere realizar los esquemas de las Figuras 4 y 5 en su proyecto, le darán orden y coherencia.</p>

 		<p style="font-weight: 600; font-size: 1.1rem;">Figura 5.</p><br><br>
 		<p>Diseño de las fases.</p>
 		<img src="https://i.postimg.cc/qv7rV9NM/CN11-FIG12-2x.png" width="100%">
 		<br><br>
 			<i>Nota. Elaboración propia.</i>
 		<br><br>
 		<img src="https://i.postimg.cc/tgbw01Qx/diana-mate.png"><ul class="menu_momento_introductivo">
 					<li class="btn_foro"><span><a alt="Competencias Básicas" href=""></a></span></li>
 					<li class="btn_maloka"><span><a alt="Competencias Socioemocionales" href=""></a></span></li>
 					<li class="btn_perfil"><span><a alt="Competencias Ciudadanas" href=""></a></span></li>
 				</ul>
 		<img class="divicion_image" src="assets/images/fondos/Fondo_division_mod.png">
 		<br><br>
 		<p><em>3.2.5.5.	Análisis de resultados.</em></p>

 		<p>Para esta fase del proyecto se recomienda realizar una revisión exhaustiva de los datos recogidos durante su ejecución y posteriormente hacer una descripción detallada de los resultados obtenidos.</p>

 		<p><em>3.2.5.6.	Consideraciones finales.</em></p>
 		<br><br>
 		<p>Para este punto se propone escribir las conclusiones relevantes del proyecto, respecto a la soberanía alimentaria y a la mitigación y adaptación al Cambio Climático.</p>

 		<p style="font-weight: 600; font-size: 1.1rem;">3.2.6. Socialización pública de los resultados del proyecto.</p>

 		<p>Finalmente, se sugiere que los estudiantes preparen una presentación, para socializar públicamente su proyecto. Se sugiere hacer énfasis en: el problema, los objetivos, las fases, los resultados y las conclusiones. Para ello contarán con 20 minutos para la sustentación y de 5 a 10 minutos para las preguntas.</p>
 		<p>Subir la presentación final a la plataforma en formato PDF.</p>
 		<i>¡Para su territorio y usted, buen camino!</i>
 		<br><br>

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

 		<p>Buen día estimada(o) estudiante: a continuación, usted encontrará una serie de actividades, que van desde la exploración de las ideas que tiene sobre la alimentación saludable y la comida chatarra, hasta el diseño y ejecución de un trabajo investigativo comunitario, fundamentado en el modelo metodológico del aprendizaje basado en proyectos.</p>

 		<img class="divicion_image" src="assets/images/fondos/Fondo_division_mod.png">

		 <img src="https://i.postimg.cc/tgbw01Qx/diana-mate.png">

 		<ul class="menu_momento_introductivo">
 			<li class="btn_foro"><span><a alt="Competencias Básicas" href=""></a></span></li>
 			<li class="btn_maloka"><span><a alt="Competencias Socioemocionales" href=""></a></span></li>
 		</ul>

 		<img class="divicion_image" src="assets/images/fondos/Fondo_division_mod.png">
 		<h2 class="ct-naturales">→ Actividad 1:</h2><br>
 		<b>Activación cognitiva para el aprendizaje</b>
 		<p>En la Figura 2 se presenta una lluvia de ideas respecto a las ventajas y desventajas de una alimentación saludable y balanceada vs el consumo de comida chatarra. Complete con frases las gotas vacías en acuerdo con sus conocimientos y suba esta actividad a la plataforma.
 		<br><br>
 		<b><i>Figura 2.</i></b>
 		<i>Ideas generales sobre las ventajas y desventajas de una alimentación saludable y balanceada vs el consumo de comida chatarra.</i>
 		<img src="https://i.postimg.cc/wxwh2NYy/CN11-Lluvia-03.png" width="100%">
 		</p><p><i>Nota. Elaboración propia.</i></p>


 	`,
        upload: false,
        id: 1,
      },

      {
        content: `
			<img src="https://i.postimg.cc/tgbw01Qx/diana-mate.png">
 		<ul class="menu_momento_introductivo">
 			<li class="btn_foro"><span><a alt="Competencias Básicas" href=""></a></span></li>
 			<li class="btn_maloka"><span><a alt="Competencias Socioemocionales" href=""></a></span></li>
 		</ul>
 		<img class="divicion_image" src="assets/images/fondos/Fondo_division_mod.png">
 		<h2 class="ct-naturales">→ Actividad 2: </h2><br>
 		<b>Preconceptos</b>
 		<p>Ahora, en grupos de estudiantes o con la familia, se sugiere escribir en dos párrafos y sin ayuda de diccionarios, libros o internet, sobre las ventajas y desventajas del consumo de alimentos saludables y balanceados vs. la ingesta de comida chatarra.
 			Suba el escrito a la plataforma en formato PDF. <br> <br>
 		Luego, realizar la socialización al curso en pleno de los textos escritos, durante la cual, el docente efectuará la respectiva retroalimentación.</p>


 	`,
        upload: true,
        phase: 0,
        id: 1,
      },
      {
        content: `
 		<h1>FASE INTERACTIVA</h1>
 		<img class="divicion_image" src="assets/images/fondos/Fondo_division_mod.png">
		 <img src="https://i.postimg.cc/tgbw01Qx/diana-mate.png">
 		<ul class="menu_momento_introductivo">
 			<li class="btn_foro" title="Competencias Básicas"><span><a alt="Competencias Básicas" href=""></a></span></li>
 			<li class="btn_maloka" title="Competencias Socioemocionales"><span><a alt="Competencias Socioemocionales" href=""></a></span></li>
 			<li class="btn_perfil" title="Competencias Ciudadanas"><span><a alt="Competencias Ciudadanas" href=""></a></span></li>
 		</ul>

 		<img class="divicion_image" src="assets/images/fondos/Fondo_division_mod.png">
 		<h2 class="ct-naturales">→ Actividad 3:</h2><br>
 		<h3 style="text-align: left;">3. Desarrollo</h3>
 		<p>Lee y revisa con detenimiento los concéptos que se desarrollan a continuación.  Son indispensables para el desarrollo de las actividades propuestas.</p>
 		<p>En este momento del módulo se fundamentará de forma inicial la controversia sociocientífica presentada entre el consumo de alimentos saludables y balanceados vs la ingesta de comida chatarra y la forma como se articula con algunos de los Objetivos para el Desarrollo Sostenible propuestos por la ONU.</p>
 		<br><br>
 		<b>3.1. Las controversias sociocientíficas</b>
 		<br><br>
 		<section class="extract_content">
 			<p>Las controversias sociocientíficas comprenden debates sobre asuntos sociales, políticos, éticos, culturales, morales y ambientales (Rozo &amp; Martínez, 2018) que están relacionados con conocimientos que se vinculan con la ciencia actual, tales como la clonación, el uso de células madre, los organismos genéticamente modificados, la fumigación con glifosato, las energías alternativas, el Cambio Climático, los alimentos artificiales y otros asuntos polémicos para la sociedad que pueden ser abordados en la institución educativa para favorecer la participación activa de las comunidades educativas en la formación de sus estudiantes.</p>
 			<p>Las controversias sociocientíficas cuando son trabajadas en las prácticas escolares permiten asumir una posición crítica frente a qué, cómo, a quién, para qué y cuándo se enseña y evalúa, esto implica actuar ante la incertidumbre y para la toma decisiones desde la autonomía colectiva. De otro lado, como lo plantean Santos &amp; Mortimer (2009), las controversias sociocientíficas promueven la alfabetización científica, tecnológica y ambiental, además de contribuir a la formación de sociedades educadas, reflexivas, críticas y sistémicas. Ratcliffe &amp; Grace (2003) las caracterizan como se plantea en la Figura 3. </p>
 			<b><i>Figura 4</i></b>
 			<br><br>
 			<i>Características de las controversias sociocientíficas.</i>
 			<br><br>
 			<img class="imgfigura" src="https://i.postimg.cc/xdgCQKRL/CN11-FIG3-2x.png"><br>
 			<i>Nota. Elaboración propia con base en Ratcliffe &amp; Grace (2003).</i>
 			<br>
 			<p>Por lo general el conocimiento está fragmentado en disciplinas, por lo que la interacción entre distintos campos del saber fundamenta a mayor profundidad el desarrollo de las controversias sociocientíficas, a partir de temas tales como: la naturaleza de la ciencia y la tecnología, el razonamiento ético-moral, la reconstrucción sociocrítica, el análisis de las culturas, el arte, la filosofía, la acción responsable, la sustentabilidad y el buenvivir (Rozo, 2020).</p>
 			<p>Leff (2009) se refiere a la Sustentabilidad, fundamentándola desde valoraciones diversas de la naturaleza, estimando las dimensiones ética, cultural, ecológica y además las social, estética, religiosa y filosófica (Figura 4). De este modo, la construcción de un mundo sustentable debería lograrse a través de la interrelación horizontal de seres culturales, dando lugar a nuevos actores sociales, resignificados en las identidades colectivas. Un ser colectivo y a la vez un sujeto ecológico con valores ambientalmente comunes de un mundo diverso (Leff &amp; Elizalde, 2010). La ética posmoderna confronta la individualidad con la otredad, el paso de la individualidad a la colectividad. </p>
 			<p>En adición, la pérdida de cualidades esenciales del ambiente natural ha sido inducida por una crisis de valores estéticos, éticos y axiológicos, que afectan la biodiversidad y las cosmovisiones de las distintas culturas humanas. La armonía con el entorno y con el otro ser (agua, aire, roca) otorga un sentido profundo de vida, un buen vivir. En un imaginario estético, que replantea el papel que pudieran recuperar las religiones y la espiritualidad (Estevez, 2020).</p>
 			<p>Finalmente, son múltiples las miradas de las personas y de los colectivos alrededor del ambiente, ninguna de ellas puede ser subestimada, por lo que debe sostenerse un diálogo de saberes horizontal. En la Sustentabilidad la construcción de políticas para la educación y la gestión ambiental deben ser validadas por comunidades inter y transdisciplinares, donde ninguna de las visiones debe ser deslegitimada. </p>
 			<b><i>Figura 4</i></b>
 			<br><br>
 			<i>Dimensiones de la sustentabilidad.</i>
 			<br><br>
 			<img class="imgfigura" src="https://i.postimg.cc/j2YdQZd0/CN11-FIG4-2x.png">
 			<br>
 			<i class="g-text-right">Nota. Elaboración propia.</i>


 	`,
        upload: false,
        id: 1,
      },
      {
        content: `
 		<br><br>
 		<b>3.2. La comida chatarra</b>
 		<br><br>
 		<section class="extract_content">
 			<p>Se denomina comida chatarra a un grupo de “alimentos” con bajo valor nutricional, que ofrece poco en términos de proteínas, vitaminas o minerales, en lugar de ello, la mayoría de las personas incluyen en su dieta alimentos con alto contenido de sales, azúcares y grasas, con bajo contenido de nutrientes esenciales, por ejemplo, helados, snacks dulces y salados, golosinas, goma de mascar, postres dulces, papas fritas, salsas, perros calientes, chorizos, chicharrones, jugos artificiales, gaseosas, entre otros (Orjuela, 2017). </p>
 			<p>La Organización Panamericana de la salud (OPS) ha basado su definición de acuerdo a la naturaleza, la finalidad y el grado de procesamiento de los alimentos y a partir de ello ha organizado los cuatro grupos que se muestran en la Figura 5. </p>
 			<b><i>Figura 5</i></b>
 			<br><br>
 			<i>Clasificación de los alimentos según la Organización Panamericana de la Salud.</i>
 			<br><br>
 			<img class="imgfigura" src="https://i.postimg.cc/m2bTLcPw/CN11-FIG5-2x.png"><br>
 			<i>Nota. Elaboración propia.</i>
 			<br>
 			<p>Esta clasificación permite diferenciar productos industriales, con poco o nulo valor nutricional (con aditivos químicos, tales como conservantes, colorantes o saborizantes, de alto riesgo para la salud humana), de alimentos de origen natural y de preparaciones culinarias ancestrales de alto valor nutricional, en los casos de empanadas, arepas, butifarras o hamburguesas hechas con base de maíz con relleno de carnes o vegetales (Orjuela, 2017).</p>


 	`,
        upload: false,
        id: 1,
      },
      {
        content: `
 		<br><br>
 		<b>3.3.	Causas principales alto consumo de comida chatarra</b>
 		<br><br>
 		<section class="extract_content">
 			<p>En el contexto de las causas del consumo excesivo de comida chatarra, Kather (2006); El Comercio (2014); Orjuela (2017); Valero &amp; Alvarado (2017), plantean las descritas en la Figura 6.</p>
 			<b><i>Figura 6.</i></b>
 			<br><br>
 			<i>Principales causas del consumo de comida chatarra.</i>
 			<br><br>
 			<img class="imgfigura" src="https://i.postimg.cc/FKWQHGJg/Asset-36-2x-100.jpg"> <br>
 			<i>Nota. Elaboración propia, con base en Kather (2006); El Comercio (2014); Orjuela (2017); Valero &amp; Alvarado (2017).</i>
 			<br>


 	`,
        upload: false,
        id: 1,
      },
      {
        content: `
 		<br><br>
 		<b>3.4.	Consecuencias principales del consumo excesivo de comida chatarra</b>
 		<br><br>
 		<section class="extract_content">
 			<p>El alto consumo de comida chatarra de ninguna manera es recomendable, puede producir malestares estomacales, sobrepeso, obesidad, depresión, sedentarismo e incluso el desarrollo de diversas enfermedades (Figueroa &amp; Díaz, 2006), tal como se muestra en la Figura 7.</p>
 			<b><i>Figura 7.</i></b>
 			<br><br>
 			<i>Principales consecuencias del consumo excesivo de comida chatarra.</i>
 			<br><br>
 			<img class="imgfigura" src="https://i.postimg.cc/s2BT5JNJ/CN11-FIG7-2x.png"> <br>
 			<i>Nota. Elaboración propia, con base en Figueroa &amp; Díaz (2006).</i>
 			<br><br>
 			<p>Por otra parte, de acuerdo con el Ministerio de Salud (2017), comer en exceso implica:</p>
 			<br><br>
 			<p><b>1.<b>	Saltarse las comidas y los horarios para alimentarse.</b></b></p><b><b>
 			<p><b>2.<b>	Comer seis o más veces al día.</b></b></p><b><b>
 			<p><b>3.<b>	Aumentar el porcentaje de carbohidratos, grasas y proteínas, por fuera de los límites de una comida balanceada (Figura 8).</b></b></p><b><b>
 			<p><b>4.<b>	Consumir alimentos procesados, ultra procesados, salados, azucarados y/o grasosos.</b></b></p><b><b>
 				<br><br>
 			<b>Figura 8. </b>
 			<p>Composición de una comida balanceada.</p>
 			<img class="imgfigura" src="https://i.postimg.cc/YqhLryG8/CN11-FIG8-2x.png"> <br>
 			<br><br>
 			<i>Nota. Tomado y adaptado de Ministerio de Salud (2017).</i>

 		</b></b></b></b></b></b></b></b><b><b>

 	</b></b>
	 `,
        upload: false,
        id: 1,
      },
      {
        content: `
 		<br><br>
 		<b>3.5.	Beneficios de la alimentación saludable y balanceada. </b>
 		<br><br>
 		<section class="extract_content">
 			<p>Una alimentación saludable y equilibrada que ayude al mantenimiento de un cuerpo sano es aquella que propende por el consumo de alimentos más naturales y diversos. Dicha alimentación debe promover la adquisición de los nutrientes esenciales (proteínas, vitaminas, minerales, grasas y carbohidratos) para la construcción, reparación, defensa, mantenimiento de la energía, entre otras funciones del organismo.</p>
 			<p>En la Figura 9 se pueden evidenciar algunos de los beneficios de una alimentación basada en una dieta saludable y balanceada.</p>
 			<b><i>Figura 9.</i></b>
 			<br><br>
 			<i>Principales beneficios del consumo de una alimentación saludable y balanceada.</i>
 			<br><br>
 			<img class="imgfigura" src="https://i.postimg.cc/5yFJGvy5/CN11-FIG9-2x.png"> <br>
 			<i>Nota. Elaboración propia.</i>
 			<br><br>

 			<br><br>
 			<b>3.5.1. Sobre las etiquetas en los alimentos</b>
 			<br><br>
 			<section class="extract_content">
 			<p>Las etiquetas de los alimentos informan, entre otros aspectos, los datos nutricionales de los alimentos. Los cuales se usan para escoger alimentos más saludables. El Instituto Nacional de Salud, informa que la tabla nutricional es un reporte de la información nutricional que contienen los productos alimentarios empaquetados (Ministerio de Salud, 2020). </p>


 	`,
        upload: false,
        id: 1,
      },
      {
        content: `
 		<br><br>
 		<b>3.5.2. ¿Qué buscar?</b>
 		<br><br>
 		<section class="extract_content">
 			<p>Lo primero que siempre hay que hacer es verificar el tamaño de la porción. La nota nutricional presentada en el paquete viene dada en relación a dicho dato. Para los envases que tienen más de una ración, se debe multiplicar la información por el número total de porciones, para el caso de la Figura 10, el factor es 15.</p>
 			<b><i>Figura 10.</i></b>
 			<br><br>
 			<i>Información nutricional en las etiquetas de los alimentos.</i>
 			<br><br>
 			<img class="imgfigura" src="https://i.postimg.cc/jSvjyH7C/CN11-FIG10-2x.png"> <br>
 			<i>Nota. Elaboración propia con base en Ministerio de Salud (2020).</i>
 			<br><br>
 			<p>En cuanto a la información calórica, el dato registrado en el envase es también por porción, es decir, para la etiqueta presentada en la Figura 10, el total es de 1500 calorías. Este número ayudará a determinar cómo los alimentos afectan el peso.</p>
 			<p>El total de carbohidratos se mide como casi todos los demás valores, en gramos (g). La fibra vegetal aparece justo debajo de los carbohidratos totales. Es recomendable comprar alimentos que tengan baja cantidad de carbohidratos (menos del 10%) y al menos de 3 a 4 gramos de fibra vegetal por ración, esta ayuda a mejorar la digestión. Los panes integrales, las frutas, la avena y verduras, al igual que las legumbres como los frijoles y las lentejas son ricos en fibra.</p>
 			<p>Se invita a escoger alimentos que sean bajos en grasas saturadas y trans, ya que estas clases de lípidos en muchas ocasiones provocan daños en el sistema circulatorio, entre otros efectos, por elevar el colesterol “malo”. El pescado tiene cantidades mucho más bajas de esta clase de grasa que la carne de res o de cerdo. Las grasas trans se encuentran principalmente en postres y muchas otras comidas rápidas (Ministerio de Salud, 2020). </p>
 			<p>Otro ingrediente es el sodio, uno de los dos átomos de la sal. Una persona debe consumir máximo 2,300 mg de sodio al día, quizás menos, dependiendo de las indicaciones médicas. </p>
 			<p>De esta manera, los alimentos cuando son dados con la diversidad, equilibrio y cantidad adecuada proporcionan una nutrición saludable. Además, es importante incluir una dosis de actividad física (entre 30 y 60 minutos diarios, dependiendo de la edad) y estudio que promuevan el buen uso de los diferentes nutrientes que ingresan al organismo. </p>


 	`,
        upload: false,
        id: 1,
      },
      {
        content: `
 		<img class="divicion_image" src="assets/images/fondos/Fondo_division_mod.png">
 		<br>
 		<em><strong>Actividad de síntesis</strong></em>
 		<p>Se propone que los estudiantes en grupos a partir de la información anterior tomen las etiquetas con la información nutricional de cuatro alimentos (una gaseosa, un queso o un yogurt, unas papas fritas y de una bolsa de frijol o lenteja), las observen y comparen teniendo en cuenta todos los datos que contienen, para que desde la reflexión crítica expongan a sus compañeros con argumentos las desventajas y beneficios de unos y otros.</p>
 		<p>Realiza una tabla comparativa y súblela a la plataforma en formato .doc, .xls o PDF</p>


 	`,
        upload: true,
        phase: 1,
        id: 1,
      },
      {
        content: `
 		<h1>FASE POSTACTIVA O DE APLICACIÓN</h1>
 		<h2 class="ct-naturales">→ Actividad 4</h2>

 		<img class="divicion_image" src="assets/images/fondos/Fondo_division_mod.png">

		 <img src="https://i.postimg.cc/tgbw01Qx/diana-mate.png">
 		<ul class="menu_momento_introductivo">
 			<li class="btn_foro"><span><a alt="Competencias Básicas" href=""></a></span></li>
 			<li class="btn_maloka"><span><a alt="Competencias Socioemocionales" href=""></a></span></li>
 			<li class="btn_maloka"><span><a alt="Competencias Socioemocionales" href=""></a></span></li>
 		</ul>
 		<img class="divicion_image" src="assets/images/fondos/Fondo_division_mod.png">
 		<br>
 		<b>3.6	Relaciones de la comida chatarra con la publicidad.</b>
 		<p>Las actividades para este momento del módulo serán:</p>
 		<p>
 		<b>1.</b> Buscar en los diferentes medios de comunicación la información oral o escrita que aparece en relación con la publicidad que se realiza sobre los alimentos. Luego de ello, hacer un análisis sobre las estrategias positivas o negativas de persuasión que se utilizan, la intención es incentivar el pensamiento crítico.
 		</p>
 		<p>
 			<br>
 		<b>2.</b> Desarrollar una presentación en diapositivas o carteleras sobre la publicidad engañosa  de productos alimenticios, con las reflexiones pertinentes.
 		</p>
		 <img src="https://i.postimg.cc/tgbw01Qx/diana-mate.png">
 		<ul class="menu_momento_introductivo">
 			<li class="btn_maloka"><span><a alt="Competencias Socioemocionales" href=""></a></span></li>
 			<li class="btn_maloka"><span><a alt="Competencias Socioemocionales" href=""></a></span></li>
 		</ul>
 		<img class="divicion_image" src="assets/images/fondos/Fondo_division_mod.png">

 		<br>
 		<b>3.7	Pruebas cualitativas a los alimentos del refrigerio, tienda escolar y/o casa.</b>
 		<p>En esta etapa se desarrollarán pruebas cualitativas con alimentos provenientes de la tienda escolar, del refrigerio o de la casa. La intención es recolectar etiquetas de estos productos y describir componentes tales como: </p>
 		<p><b>1.</b>Preservantes o conservantes.</p>
 		<p><b>2.</b>Saborizantes.</p>
 		<p><b>3.</b>Colorantes.</p>
 		<p><b>4.</b>Otros químicos artificiales.</p>
 		<p><b>5.</b>Ingredientes naturales.</p>
 		<p>Se recomienda que los estudiantes realicen un collage con estas etiquetas y luego hagan una exposición de tal material ante los compañeros(as) de clase, para evidenciar la inundación que hace el mercado de los productos alimenticios que contienen sustancias dañinas para la salud.</p>
 		<br><br>
		 <img src="https://i.postimg.cc/tgbw01Qx/diana-mate.png">
 			<ul class="menu_momento_introductivo">
 				<li class="btn_maloka"><span><a alt="Competencias Socioemocionales" href=""></a></span></li>
 				<li class="btn_maloka"><span><a alt="Competencias Socioemocionales" href=""></a></span></li>
 			</ul>
 		<img class="divicion_image" src="assets/images/fondos/Fondo_division_mod.png">
 		<b>3.8 Análisis de noticias</b>
 		<p>La idea para esta fase es trabajar la controversia sociocientífica a través de la recolección y análisis de la información que se divulga sobre la comida chatarra y los alimentos saludables y balanceados mediante periódicos impresos o de la internet. Las actividades recomendadas para este punto son:</p>

 		<p><b>1.</b>Lectura y discusión de algunos artículos en clase. Varios ejemplos se pueden encontrar en los siguientes enlaces:</p>

 		<p><b>a.</b>Publicidad de comida chatarra, llena las pantallas de televisión:</p>
 		<a class="p-800" target="_blank" href="https://www.eldiario.com.co/noticias/pereira/publicidad-de-comida-chatarra-llena-las-pantallas-de-television/">https://www.eldiario.com.co/noticias/pereira/publicidad-de-comida-chatarra-llena-las-pantallas-de-television/</a>

 		<p><b>b.</b>Niños en Colombia sobreexpuestos en TV a la comida chatarra: </p>
 		<a class="p-800" target="_blank" href="https://www.eluniversal.com.co/colombia/ninos-en-colombia-sobreexpuestos-en-tv-a-la-comida-chatarra-NX4066197">https://www.eluniversal.com.co/colombia/ninos-en-colombia-sobreexpuestos-en-tv-a-la-comida-chatarra-NX4066197</a>

 		<p><b>c.</b>La comida chatarra pasa factura a EU, España y México. Mueren los adultos, sí, pero también menores</p>
 		<a class="p-800" target="_blank" href="https://www.sinembargo.mx/04-02-2021/3934102">https://www.sinembargo.mx/04-02-2021/3934102</a>

 		<p><b>2.</b>Se invita a realizar un análisis de la información sobre la Encuesta Nacional de la Situación Nutricional en Colombia (2015), que se encuentra en el enlace: </p>
 		<a class="p-800" target="_blank" href="https://www.ins.gov.co/Noticias/Paginas/INS-revela-qué-tan-bien-o-mal-nutridos-están-los-colombianos.aspx">https://www.ins.gov.co/Noticias/Paginas/INS-revela-qué-tan-bien-o-mal-nutridos-están-los-colombianos.aspx</a><p> con base en las siguientes preguntas:</p>

 		<p><b>a.</b>De acuerdo con los datos de nutrición de niños y mujeres embarazadas ¿Cuáles son las principales causas sociopolíticas, económicas y geográficas de la malnutrición registrada?</p>
 		<p><b>b.</b>¿Por qué una nutrición saludable y balanceada es crucial para la primera infancia?</p>
 		<p><b>c.</b>¿Cuáles son las principales consecuencias de la malnutrición? ¿Son observables en su escuela, región o territorio? ¿Qué se puede hacer?</p>


 	`,
        upload: false,
        id: 1,
      },
      {
        content: `
			<h2 class="ct-naturales">→ Actividad 5:</h2><br>
			<img src="https://i.postimg.cc/tgbw01Qx/diana-mate.png">
 		<ul class="menu_momento_introductivo">
 			<li class="btn_foro"><span><a alt="Competencias Básicas" href=""></a></span></li>
 			<li class="btn_maloka"><span><a alt="Competencias Socioemocionales" href=""></a></span></li>
 		</ul>
 		<img class="divicion_image" src="assets/images/fondos/Fondo_division_mod.png">
 		<br><br>
 		<b>3.9 Juego de roles</b>
 		<p>En esta etapa final del trabajo en la controversia se invita a los y las estudiantes a que:</p>
 		<br>
 		<p><b>1.</b> Conformen grupos, cada uno de los cuales mediante un “juego de roles” representarán diversos sectores sociales (periodistas, representantes de las industrias de alimentos, defensores sociales de los derechos alimentarios saludables para las personas, científicos, nutricionistas, productores orgánicos campesinos, tenderos, personajes famosos, entre otros), y sus distintas posturas a favor o en contra frente al consumo de comida chatarra y/o alimentos saludables y balanceados.</p>
 		<p><b>2.</b> Luego el o la docente, propiciará a través de una mesa redonda la participación y reflexión de todos alrededor del trabajo hecho sobre la controversia sociocientífica del consumo de alimentos saludables y balanceados vs la ingesta de comida chatarra.</p>
 		<p><b>3.</b>Finalmente cada uno de los grupos, ya configurados, en un pliego de papel Kraft, presentará y expondrá a la clase a través de una infografía, un mapa mental o conceptual, la forma cómo el consumo de comida chatarra vs la ingesta de alimentos saludables y balanceados se constituye en una controversia sociocientífica, al cumplir las características presentadas en la Figura 3.</p>
 		<br><br>
 		<b>3.10 Formulación del proyecto </b>
 		<p>Ahora, se invita a realizar un proyecto por grupos de estudiantes, para lo cual se tendrá en cuenta el aprendizaje basado en proyectos (ABP), planteado por Moreno &amp; Caro (2018). Una vez hayan realizado las actividades propuestas regístrenlas de manera ordenada y suban las evidencias propuestas a la plataforma en formado *.doc o PDF.</p>
 		<p><b>3.10.1</b> Diseñar una idea</p>
 		<p>En esta primera fase se deberá identificar el tema o idea general del proyecto. Para este caso: alfabetizar a los estudiantes de un grado de básica primaria o secundaria sobre el consumo de alimentos saludables y balanceados vs la comida chatarra.</p>
 		<p>Para ello se pueden tener en cuenta las siguientes preguntas: </p>

 		<p><span class="icon_objetivos"></span>¿Qué sabemos sobre el tema?</p>
 		<p><span class="icon_objetivos"></span>¿Qué necesitamos averiguar sobre el tema?</p>
 		<p><span class="icon_objetivos"></span>¿Qué esperamos aprender y enseñar?</p>
 		<p><span class="icon_objetivos"></span>¿Por qué́ este tema es importante para los estudiantes y el contexto?</p>

 		<p><b>3.10.2</b> Definir el alcance </p>
 		<p>Para este punto se recomienda que el alcance sea extenso, por lo que puede ir entre un bimestre y un semestre. Se propone tener en cuenta, para la implementación del proyecto (Moreno, &amp; Caro, 2018), que: </p>
 		<p><span class="icon_objetivos"></span>Los estudiantes decidan sobre el grupo de trabajo.</p>
 		<p><span class="icon_objetivos"></span>Los objetivos sean realizables.</p>
 		<p><span class="icon_objetivos"></span>Las actividades y la evaluación sean diseñadas previamente entre docente y estudiantes.</p>
 		<p><span class="icon_objetivos"></span>Los proyectos sean realizados por todo el curso o cursos de once.</p>
 		<p><span class="icon_objetivos"></span>Los proyectos sean presentados a todo o gran parte del establecimiento educativo y/o panel de expertos.</p>
 		<p><span class="icon_objetivos"></span>Los proyectos sean trabajados de forma inter y/o transdisciplinar.</p>
 		<p><span class="icon_objetivos"></span>Los proyectos involucren a uno o varios de los proyectos pedagógicos transversales.</p>
 		<p><span class="icon_objetivos"></span>Se use la mayor cantidad de medios tecnológicos posible.</p>
 		<p><span class="icon_objetivos"></span>Los proyectos sean evaluados por más de un docente y otros miembros de la comunidad educativa.</p>
 		<p><span class="icon_objetivos"></span>Se elabore un cronograma de trabajo.</p>

 		<p><b>3.10.3 </b>Crear la pregunta orientadora </p>
 		<p>Teniendo en cuenta el contexto en el que se encuentra, se le invita a escribir una pregunta relacionada con la controversia sociocientífica del consumo de alimentos saludables y balanceados vs la ingesta de comida chatarra.</p>
 		<p>Es recomendable empezar por escribir la pregunta problema, aquí, un ejemplo:</p>
 		<p>¿Qué estrategias escolares implementar para el mejoramiento de los hábitos alimenticios y la disminución del consumo de comida chatarra de las niñas y niños de grado tercero de la Institución Educativa… del municipio de…?</p>

 		<p><b>3.10.4 </b>Plantear productos y resultados</p>
 		<p>Los resultados, a través de los productos, permiten visibilizar el trabajo desarrollado en el proyecto. Existen distintos tipos de estos: escritos, verbales, tecnológicos, mediáticos, de planeación, de construcción y de formación (Moreno, &amp; Caro, 2018). A continuación, se presentan algunos ejemplos: </p>
 		<p><span class="icon_objetivos"></span>Elaboración de borradores, propuestas, resúmenes, ensayos, esquemas, planos, notas y reportes de reuniones de los equipos de trabajo.</p>
 		<p><span class="icon_objetivos"></span>Utilización permanente de un diario de campo.</p>
 		<p><span class="icon_objetivos"></span>Desarrollo de técnicas e instrumentos de recolección de datos.</p>
 		<p><span class="icon_objetivos"></span>Diseño y creación de modelos, videos, guías de campo, presentaciones digitales.</p>
 		<p><span class="icon_objetivos"></span>Ejecución de informes de investigación. </p>
 		<p><span class="icon_objetivos"></span>Realización de obras de teatro, presentaciones musicales, debates públicos.</p>
 		<p><span class="icon_objetivos"></span>Desarrollo de revisiones bibliográficas.</p>
 		<p><span class="icon_objetivos"></span>Socialización pública de avances y del trabajo final.</p>


 	`,
        upload: false,
        id: 1,
      },
      {
        content: `
			<h2 class="ct-naturales">→ Actividad 6:</h2><br>
			<img src="https://i.postimg.cc/tgbw01Qx/diana-mate.png">
 		<ul class="menu_momento_introductivo">
 			<li class="btn_maloka"><span><a alt="Competencias Socioemocionales" href=""></a></span></li>
 			<li class="btn_maloka"><span><a alt="Competencias Socioemocionales" href=""></a></span></li>
 			<li class="btn_maloka"><span><a alt="Competencias Socioemocionales" href=""></a></span></li>
 		</ul>
 		<img class="divicion_image" src="assets/images/fondos/Fondo_division_mod.png">

 		<p><b>3.10.5.</b>Organizar el proyecto</p>
 		<p>Para la organización del proyecto se recomienda seguir cada uno de los siguientes pasos.</p>

 		<p><b>3.10.5.1.</b>Para escribir los objetivos (Figura 11) se debe tener en cuenta principalmente tres aspectos: primero, siempre se debe empezar con un verbo en infinitivo (estudiar, analizar, explicar, diseñar, construir, implementar, observar, identificar, reflexionar, argumentar, sustentar, evaluar, entre otros); segundo, el objetivo general debe responder a la solución del problema; tercero, los objetivos específicos, hablan sobre los pasos a seguir para lograr el objetivo general.</p>
 		<br><br>
 		<i>Figura 11. <br><br>
 			Ejemplos de objetivos generales y específicos.
 		</i><br><br>
 		<img class="imgtabla" src="https://i.postimg.cc/bNyrrVZ4/CN11-FIG11-2x.png">
 		<br><br>
 			<i>Nota. Elaboración propia.</i>
 		<br><br>
 		<p><b>3.10.5.2.</b>Título del proyecto</p>
 		<p>Teniendo como base la problemática y los objetivos, es posible darse una idea aproximada del nombre del proyecto, escriba uno, tenga en cuenta que puede variar a través del desarrollo de todo el proyecto.</p>
 		<p><b>3.10.5.3.</b>Fundamentación teórica</p>
 		<p>En este momento del proyecto y para el caso del ejemplo que se viene planteando, se sugiere escribir un marco teórico que trate como mínimo los siguientes temas:</p>

 		<p><span class="icon_objetivos"></span>¿Cuáles son las características de las controversias sociocientíficas?</p>
 		<p><span class="icon_objetivos"></span>¿Cuáles son las ventajas y desventajas y/o riesgos del consumo de comida chatarra?</p>
 		<p><span class="icon_objetivos"></span>¿Cuáles son los beneficios de la ingesta de alimentos saludables y balanceados?</p>
 		<p><span class="icon_objetivos"></span>¿Qué importancia tiene para la salud pública alfabetizar sobre las ventajas y desventajas del consumo de alimentos saludables y balanceados vs la ingesta de comida chatarra?</p>
 		<p>Se puede encontrar información para este apartado en los siguientes enlaces:</p>

 		<p>Controversias sociocientíficas: </p>
 		<a class="p-800" target="_blank" href="https://dialnet.unirioja.es/servlet/articulo?codigo=7531014">https://dialnet.unirioja.es/servlet/articulo?codigo=7531014</a>

 		<p>Comida chatarra y salud pública: </p>
 		<a class="p-800" target="_blank" href="https://repository.unad.edu.co/bitstream/handle/10596/3744/27659840.pdf?sequence=1">https://repository.unad.edu.co/bitstream/handle/10596/3744/27659840.pdf?sequence=1</a>

 		<p>Educación en la ingesta de alimentos naturales para estudiantes: </p>
 		<a class="p-800" target="_blank" href="http://www.dspace.uce.edu.ec:8080/bitstream/25000/3428/1/T-UCE-0010-469.pdf">http://www.dspace.uce.edu.ec:8080/bitstream/25000/3428/1/T-UCE-0010-469.pdf</a>


 	`,
        upload: false,
        id: 1,
      },
      {
        content: `
			<h2 class="ct-naturales">→ Actividad 7:</h2><br>
			<img src="https://i.postimg.cc/tgbw01Qx/diana-mate.png">
			<ul class="menu_momento_introductivo">
 			<li class="btn_foro" title="Competencias Básicas"><span><a alt="Competencias Básicas" href=""></a></span></li>
 			<li class="btn_maloka" title="Competencias Socioemocionales"><span><a alt="Competencias Socioemocionales" href=""></a></span></li>
 			<li class="btn_perfil" title="Competencias Ciudadanas"><span><a alt="Competencias Ciudadanas" href=""></a></span></li>
 		</ul>
 		<img class="divicion_image" src="assets/images/fondos/Fondo_division_mod.png">

 		<p><b>3.10.5.4.</b>Planeación y ejecución de las fases de proyecto</p>
 		<p>En este momento del proyecto se recomienda: primero, planear las fases a través de las cuales se podrá llevar a cabo el proyecto, cada una de ellas debe guardar estricta coherencia con su respectivo objetivo específico (ver Figura 12); segundo, implementar cada una de las fases.</p>
 		<p>Se propone realizar los esquemas de las Figuras 9 y 10 en su proyecto, le darán orden y coherencia.</p>
 		<br><br>
 		<b>Figura 12.</b>
 		<br><br>
 		<p>Diseño de las fases.</p>
 		<img class="imgfigura" src="https://i.postimg.cc/qv7rV9NM/CN11-FIG12-2x.png">
 		<br><br>
 			<i>Nota. Elaboración propia.</i>
 		<br><br>
 		<p><b>3.10.5.5.</b>Análisis de resultados</p>
 		<p>Para esta fase del proyecto se recomienda realizar un contraste entre los datos recogidos en la entrevista inicial y en la entrevista final, para detectar cambios en los estudiantes en cuanto a conocimientos y actitudes frente al consumo de alimentos saludables y balanceados vs la ingesta de comida chatarra.</p>
 		<p><b>3.10.5.6.</b>Consideraciones finales</p>
 		<p>Para este punto se propone escribir unas conclusiones sobre las contribuciones de la alfabetización a niñas y niños sobre las ventajas y desventajas del consumo de alimentos saludables y balanceados vs la ingesta de comida chatarra.</p>
 		<p><b>3.10.6.</b>Finalmente, se sugiere que los y las estudiantes preparen una presentación para socializar públicamente su proyecto. Se sugiere hacer énfasis en: el problema, los objetivos, las fases, los resultados y las conclusiones. Para ello contarán con 20 minutos para la sustentación y de 5 a 10 minutos para responder las preguntas.</p>
 		<br><br>
 		<i>¡¡¡Buen camino para ustedes y el territorio en el que viven!!!</i>
 		<br><br>
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
      this.page = parseInt(params.page);
      this.grade = params.grade;

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
        this.isEvidenceSubmitted = await this.checkIfAlreadySubmitted(this.phase, 3);
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
      await this.evidence.upload(this.phase, 3, formData);
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

  async checkIfAlreadySubmitted(phase: Phase, tribeId: number){
	return await this.evidence.checkIfAlreadySubmitted(phase, tribeId);
  }
}
