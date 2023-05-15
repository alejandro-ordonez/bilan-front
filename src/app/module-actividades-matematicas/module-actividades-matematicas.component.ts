import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EvidenceUseCase } from '@domain/usecases/evidence.usecase';
import { Phase } from '@domain/models/evidence.model';

@Component({
  selector: 'app-module-actividades-matematicas',
  templateUrl: './module-actividades-matematicas.component.html',
  styleUrls: ['./module-actividades-matematicas.component.scss'],
})
export class ModuleActividadesMatematicasComponent implements OnInit {
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
 		<img class="divicion_image" src="assets/images/fondos/Fondo_division_mod.png">
 		<h2 class="ct-matematicas">→ Actividad 1: </h2>
 		<h3>Activación cognitiva para el aprendizaje</h3>

 		<p>
 			Para iniciar, te presentamos esta actividad de crucigrama que permitirá identificar cómo diferentes grupos humanos, se han beneficiado de las matemáticas a través del tiempo, otorgándole usos sociales, culturales y laborales. Además, Podrán identificar conceptos propios de la matemática que trascienden lo teórico y se convierten en nociones y percepciones o formas de ver el mundo.
 		</p>

 		<img src="https://i.postimg.cc/tgbw01Qx/diana-mate.png" data-toggle="tooltip" data-placement="top" title="Recuerda, en esta actividad debes hacer un entrgable.">

 		<ul class="menu_momento_introductivo">
 			<li class="btn_foro" data-toggle="tooltip"
         data-placement="left"
         title="Competencias Básicas"><span><a alt="Competencias Básicas" href=""></a></span></li>
 			<li class="btn_maloka" data-toggle="tooltip"
         data-placement="top"
         title="Competencias Socioemocionales"><span><a alt="Competencias Socioemocionales" href=""></a></span></li>
 			<li class="btn_perfil" data-toggle="tooltip"
         data-placement="right"
         title="Competencias Ciudadanas"><span><a alt="Competencias Ciudadanas" href=""></a></span></li>
 		</ul>
 		<img class="divicion_image" src="assets/images/fondos/Fondo_division_mod.png">

 		<p>
 			<strong>
 				A matematizar nuestra historia y nuestra cultura
 			</strong>
 		</p>

 		<p>
 			Mediante la solución del siguiente crucigrama podrás indagar sobre el papel de las matemáticas en las diferentes etnias, culturas, regiones y poblaciones en Colombia.
 		</p>

 		<img class="tabla" src="https://i.postimg.cc/nL73Xgr8/10-Mat-Crucigrama.png" alt="crucigrama">

 		<p>
 			<strong>
 				HORIZONTALES
 			</strong>
 		</p>

 		<p>
 			<strong>
 				1.
 			</strong>
 			La matemática que se practica entre grupos culturales identificables.
 		</p>
 		<p>
 			<strong>
 				4.
 			</strong>
 			Gente de agua, grupo indígena que habita en la región de la Orinoquía.
 		</p>
 		<p>
 			<strong>
 				6.
 			</strong>
 			Montículo en forma de terraza plana que se emplea para dividir, contener o direccionar algo, por ejemplo el agua.
 		</p>
 		<p>
 			<strong>
 				6.
 			</strong>
 			Diseños decorativos presentes en la cestería de las comunidades indígenas del Vaupés que establecen relaciones.
 		</p>
 		<p>
 			<strong>
 				8.
 			</strong>
 			Noción que se usa  cuando un carpintero hace una mesa, una modista hace un vestido o un tornero hace una tuerca.
 		</p>
 		<p>
 			<strong>
 				11.
 			</strong>
 			Excavación de tierra en forma de caja rectangular  para que por ella fluya el agua.
 		</p>

 		<p>
 			<strong>
 				VERTICALES
 			</strong>
 		</p>

 		<p>
 			<strong>
 				2.
 			</strong>
 			La matemática que se practica entre grupos culturales identificables.
 		</p>
 		<p>
 			<strong>
 				3.
 			</strong>
 			Gente de agua, grupo indígena que habita en la región de la Orinoquía
 		</p>
 		<p>
 			<strong>
 				5.
 			</strong>
 			Montículo en forma de terraza plana que se emplea para dividir, contener o direccionar algo, por ejemplo el agua.

 		</p>
 		<p>
 			<strong>
 				9.
 			</strong>
 			Diseños decorativos presentes en la cestería de las comunidades indígenas del Vaupés que establecen relaciones.

 		</p>
 		<p>
 			<strong>
 				10.
 			</strong>

 			Noción que se usa  cuando un carpintero hace una mesa, una modista hace un vestido o un tornero hace una tuerca.
 		</p>

 	`,
        upload: false,
        id: 1,
      },
      {
        content: `
 		<img src="https://i.postimg.cc/tgbw01Qx/diana-mate.png" data-toggle="tooltip" data-placement="top" title="Recuerda, en esta actividad debes hacer un entrgable.">

 		<ul class="menu_momento_introductivo">
 			<li class="btn_foro" data-toggle="tooltip"
         data-placement="left"
         title="Competencias Básicas"><span><a alt="Competencias Básicas" href=""></a></span></li>
 			<li class="btn_maloka" data-toggle="tooltip"
         data-placement="top"
         title="Competencias Socioemocionales"><span><a alt="Competencias Socioemocionales" href=""></a></span></li>
 			<li class="btn_perfil" data-toggle="tooltip"
         data-placement="right"
         title="Competencias Ciudadanas"><span><a alt="Competencias Ciudadanas" href=""></a></span></li>
 		</ul>

 		<img class="divicion_image" src="assets/images/fondos/Fondo_division_mod.png">
 		<h2 class="ct-matematicas">→ Actividad 2: </h2>
 		<h3>Preconceptos</h3>

 		<p>Para esta actividad deben organizarse grupos de trabajo colaborativo de 4 personas; en estos grupos y con base en los conceptos identificados en el crucigrama cada grupo debe:</p>

 		<p>
 			<span class="bold_">a.</span>
 			Indagar sobre el contexto histórico que enmarca cada una de las palabras encontradas de acuerdo a la definición usada en el crucigrama:
 		</p>

 		<p>
 			Mojana, Makaguaje, Canal, Camellón, Etnomatemática, Mochilas, Espacio, Geometría, Yupana, Numeración y Función.
 		</p>
 		<p>
 			<span class="bold_">b.</span>
 			Definir cada una de las palabras anteriores, teniendo en cuenta que si alguna de ellas no es propia del contexto matemático deberá ser comparada con un concepto matemático similar y explicar las semejanzas entre las dos nociones.
 		</p>

 		<section class="extract_content">
 			<p>
 				<strong>
 					Por ejemplo:
 				</strong>
 			</p>

 			<p>
 				<strong>
 					Mojana:
 				</strong>
 				región colombiana en la cual en época prehispánica se realizó una construcción de una serie de plataformas de tierra en forma de
 				<strong> poliedros regulares</strong> o prismas rectangulares con canales similares entre cada uno de ellos para el manejo de suelos y aguas en zonas de tierras inundables.

 				</p><p>
 					Se han realizado experimentos tratando de reproducir estas condiciones, una forma de hacerlo consiste en diseñar camellones de 4 m de ancho, canales de 2m con una profundidad de 1,2 m, en una sección de terreno rectangular ubicado sobre un lugar relativamente plano. Adicionalmente, se debe garantizar un nivel de lluvias alto en el terreno durante la temporada de cultivo.
 				</p>

 			<p></p>
 		</section>

 		<p>
 			<strong>
 				Conceptos implicados
 			</strong>
 		</p>

 		<p>
 			<span class="icon_objetivos"></span>
 			<strong>
 				Poliedro regular:
 			</strong>
 			Un poliedro regular es un cuerpo geométrico en el que sus caras son todos polígonos regulares iguales, y todos sus diedros y ángulos poliedros son también iguales.
 		</p>
 		<p>
 			<span class="icon_objetivos"></span>
 			<strong>
 				Prisma rectangular:
 			</strong>
 			es un poliedro cuya superficie está formada por dos cuadriláteros iguales y paralelos llamados bases y por cuatro
 		</p>
 		<p>
 			<span class="icon_objetivos"></span>
 			<strong>
 				Plano:
 			</strong>
 			es un objeto ideal que solo posee dos dimensiones, y contiene infinitos puntos y rectas
 		</p>

 		<p>
 			<span class="bold_">c.</span>
 			Realizar un análisis de cada contexto desde la aplicación matemática identificada, por Camellos en forma de prisma rectangular.
 		</p>

 		<section class="extract_content">
 			<p>Ejemplo:</p>

 			<div class="image-border" style="width: 80%;">
 					<p>
 						Plano de la estructura
 					</p>
 					<figure>
 						<img src="https://i.postimg.cc/sDNmwsZd/10-Mat-Img1mohana.png" alt="plano estructura">
 					</figure>
 				</div>

 			<div style="display: flex;height: 300px;">
 				<div class="image-border" style="width: 50%;">
 					<p>
 						Plano de la estructura
 					</p>
 					<figure>
 						<img src="https://i.postimg.cc/L40jMv4j/MAT10-PG11-color-2x.png" alt="plano estructura">
 					</figure>
 				</div>
 				<div class="image-border" style="width: 50%;">
 					<p>
 						terreno rectangular
 					</p>
 					<figure>
 						<img src="https://i.postimg.cc/Gh77VvVf/PG11_color2_2x.png" alt="terreno rectangular">
 					</figure>
 				</div>
 			</div>
 		</section>

 		<p>
 			<span class="bold_">d.</span>
 			Indagar en su comunidad posibles usos y aplicaciones de las matemáticas, similares a las que se han presentado en el crucigrama:
 		</p>

 		<p>
 			<span class="icon_objetivos"></span>
 			Se sugiere consultar sobre los oficios y artes más representativos de su región, contactar algunas de las personas que los representen, diseñar una entrevista mediante la cual logren obtener información sobre el tema.
 		</p>

 	`,
        upload: true,
        phase: 0,
        id: 1,
      },
      {
        content: `

 		<h1>
 			FASE INTERACTIVA
 		</h1>

 		<img class="divicion_image" src="assets/images/fondos/Fondo_division_mod.png">
 		<h2 class="ct-matematicas">→ Actividad 3: </h2>
 		<h3>Desarrollo</h3>

 		<p>
 			En esta sección se dará fundamento teórico y contextual al proyecto de reutilización de aguas grises y aguas lluvias mediante el cual cada estudiante, y posteriormente cada equipo de trabajo colaborativo podrá demostrar su nivel de dominio de conocimientos matemáticos básicos, su interiorización de las posibles aplicaciones y usos de los mismos en contextos específicos, y por último, cómo esta propuesta puede impactar su situación individual, familiar y a su comunidad.
 		</p>

 			<img src="https://i.postimg.cc/tgbw01Qx/diana-mate.png" data-toggle="tooltip" data-placement="top" title="Recuerda, en esta actividad debes hacer un entrgable.">
 		<ul class="menu_momento_introductivo">
 			<li class="btn_foro" data-toggle="tooltip"
         data-placement="left"
         title="Competencias Básicas"><span><a alt="Competencias Básicas" href=""></a></span></li>
 			<li class="btn_maloka" data-toggle="tooltip"
         data-placement="top"
         title="Competencias Socioemocionales"><span><a alt="Competencias Socioemocionales" href=""></a></span></li>
 			<li class="btn_perfil" data-toggle="tooltip"
         data-placement="right"
         title="Competencias Ciudadanas"><span><a alt="Competencias Ciudadanas" href=""></a></span></li>
 		</ul>

 		<img class="divicion_image" src="assets/images/fondos/Fondo_division_mod.png">

 		<p>
 			<strong>
 				3.1. Propuesta para el diseño de Sistema para manejo de aguas grises y agua lluvia con fines de reutilización en viviendas familiares
 			</strong>
 		</p>

 		<section class="extract_content">
 			<p>
 				En 2010 se publicó en Colombia la Política Nacional para la Gestión Integral del Recurso Hídrico (PNGRIH), en la cual se establecieron los objetivos para el país en materia de uso eficiente, calidad, riesgo, fortalecimiento institucional y gobernabilidad para garantizar la sostenibilidad del agua en el país. Incidir nacional, regional y localmente en los aspectos mencionados se constituye en el desafío al que el Gobierno, sectores y ciudadanía en general debemos responder si queremos que el agua siga siendo un factor de bienestar y desarrollo.
 			</p>

 			<p>
 				En el marco de la implementación de la PNGRIH se viene desarrollando una estrategia orientada a fortalecer la ejecución de procesos y tecnologías de ahorro y uso eficiente y sostenible entre los principales consumidores de agua.
 			</p>

 			<p>
 				Con la expedición de la Resolución 1207 de 2014, se presentan alternativas viables que de realizarse correctamente podrían lograr un uso eficiente del agua; reducción de la contaminación; reducción de la demanda de agua en zonas con oferta limitada y hasta cierto punto la transformación de conflictos por el agua.
 			</p>

 			<p>
 				Los diferentes beneficios socio-ambientales y económicos que podrían resultar de la reutilización de las aguas residuales tratadas, son: por ejemplo, en el sector agrícola, suministro de agua residual tratada en sequía, nutrientes recuperados en el agua (potencial disminución de fertilizantes) y reducción de conflictos socio-ambientales con usuarios de fuentes naturales superficiales o subterráneas.
 			</p>

 			<p>
 				Gracias a la reutilización de las aguas residuales tratadas, los beneficios son: la reducción de la derivación de agua dulce y, por lo tanto, mayor caudal de fuentes superficiales para usuarios intermedios; la baja de vertimientos y mejora de la calidad del recurso hídrico; y el mejoramiento de las condiciones de calidad del agua lo que conduciría a un aumento de la calidad de los ecosistemas acuáticos y otros asociados.
 			</p>

 			<p>
 				(Uribe Jongbloed, Alberto. Diario La República. 2014)
 			</p>

 		</section>

 		<p>
 			Cada uno de los estudiantes, con base en la información aquí aportada y la consulta de información relacionada deberán diseñar un sistema de reutilización de aguas grises y lluvias en su lugar de residencia, haciendo uso de la siguiente estructura o modelo.
 		</p>
 		<p>
 			<strong>
 				GUIA DE ELABORACION DE LA PROPUESTA
 			</strong>
 		</p>
 		<br>

 	<img class="imgtabla" src="https://i.postimg.cc/YCL3PZ14/10-Mat-tabla1.png" alt="tabla">

 	`,
        upload: false,
        id: 1,
      },
      {
        content: `

 			<img src="https://i.postimg.cc/tgbw01Qx/diana-mate.png" data-toggle="tooltip" data-placement="top" title="Recuerda, en esta actividad debes hacer un entrgable.">
 		<ul class="menu_momento_introductivo">
 			<li class="btn_foro" data-toggle="tooltip"
         data-placement="left"
         title="Competencias Básicas"><span><a alt="Competencias Básicas" href=""></a></span></li>
 			<li class="btn_maloka" data-toggle="tooltip"
         data-placement="top"
         title="Competencias Socioemocionales"><span><a alt="Competencias Socioemocionales" href=""></a></span></li>
 			<li class="btn_perfil" data-toggle="tooltip"
         data-placement="right"
         title="Competencias Ciudadanas"><span><a alt="Competencias Ciudadanas" href=""></a></span></li>
 		</ul>

 		<img class="divicion_image" src="assets/images/fondos/Fondo_division_mod.png">

 		<p>
 			<strong>
 				3.2 Guía para la elaboración del diseño metodológico de la propuesta
 			</strong>
 		</p>

 		<p>
 			<strong>
 				3.2.1
 			</strong>
 			Conceptos básicos
 		</p>

 		<p>
 			A continuación, se listarán todos los conceptos o temáticas requeridos para comprender y dar contexto a la propuesta, cada equipo desarrollará esta etapa mediante trabajo colaborativo investigando qué es, sus características, etc.
 		</p>

 		<p>
 			En relación con la reutilización del agua:
 		</p>

 		<p>
 			<span class="icon_objetivos"></span>
 			Aguas grises y sus características.
 		</p>
 		<p>
 			<span class="icon_objetivos"></span>
 			Aguas lluvias, características y diferencia con las aguas grises
 		</p>
 		<p>
 			<span class="icon_objetivos"></span>
 			Usos de las aguas grises y las aguas lluvias.
 		</p>

 		<p>
 			Algunas páginas sugeridas para consulta:
 		</p>
 		<p>
 			<a href="http://https://rua.ua.es/dspace/bitstream/10045/29576/1/MEMORIA_TFM_sep_2012_David_Bermejo.pdf" target="_blank" rel="noopener noreferrer">- https://rua.ua.es/dspace/bitstream/10045/29576/1/MEMORIA_TFM_sep_2012_David_Bermejo.pdf</a>
 		</p>
 		<p><a href="http://www.fao.org/3/a-i1629s.pdf" target="_blank" rel="noopener noreferrer">- http://www.fao.org/3/a-i1629s.pdf</a>
 		</p>

 		<p>
 			En relación con los conceptos matemáticos, geométricos, de medición y estadísticos a utilizar:
 		</p>
 		<p>
 			<span class="icon_objetivos"></span>
 				Elementos básicos de la geometría plana y volumétrica: Conceptos de longitud, área y volumen. Elementos geométricos básicos, figuras geométricas en el plano y en el espacio.
 		</p>
 		<p>
 			<span class="icon_objetivos"></span>
 			Sistemas de unidades de medida
 		</p>
 		<p>
 			<span class="icon_objetivos"></span>
 			Porcentajes y tasas de cambio
 		</p>
 		<p>
 			<span class="icon_objetivos"></span>
 			Relaciones y funciones
 		</p>
 		<p>
 			<span class="icon_objetivos"></span>
 			Elementos de estadística descriptiva: población, muestra, variable, datos (clasificación), medidas de tendencia central.
 		</p>

 		<p>
 			Para facilitar tu búsqueda te sugerimos algunos sitios que podrás visitar y encontrar formas agradables, divertidas y de excelente calidad para repasar conceptos:
 		</p>

 		<p>
 			<a href="https://www.colombiaaprende.edu.co/contenidos-para-aprender?Nombre=&amp;field_nivel_value=3&amp;field_grado_target_id=3335&amp;field_asignatura_target_id=3322&amp;page=0" target="_blank" rel="noopener noreferrer">- https://www.colombiaaprende.edu.co/contenidos-para-aprender?Nombre=&amp;field_nivel_value=3&amp;field_grado_target_id=3335&amp;field_asignatura_target_id=3322&amp;page=0</a>
 		</p>

 		<p>
 			<a href="http://instaladores-curriculos.sucerman.com/1-curriculo-matematicas/matematicas/" target="_blank" rel="noopener noreferrer">- http://instaladores-curriculos.sucerman.com/1-curriculo-matematicas/matematicas/</a>
 		</p>

 		<p>
 			<strong>
 				3.2.2 Análisis de la vivienda
 			</strong>
 		</p>

 		<p>
 			La propuesta de reutilización de aguas grises y lluvias debe ser específica para la vivienda de cada uno de los estudiantes, pues de acuerdo a sus características se podrá planificar una estructura de recolección de aguas adecuada y suficiente.
 		</p>

 		<p>
 			A continuación, se propone una guía que permitirá el análisis a realizar:
 		</p>

 		<p>
 			<strong>
 			A.	Aguas grises:
 			</strong>
 		</p>

 		<p>
 			<strong>
 				a.
 			</strong>
 			Se deben identificar todas las fuentes de aguas grises en cada vivienda, para esta fase es necesario aclarar que las aguas grises provienen de las lavadoras, duchas o regaderas, tinas, lavamanos y lavaderos. Son aguas residuales que tuvieron un uso ligero, que pueden contener jabón, cabello, suciedad o bacterias, pero que están suficientemente limpias para ser reutilizadas.

 		</p>
 		<p>
 			<strong>
 				b.
 			</strong>
 			Se debe considerar la captación de aguas grises mediante modificaciones a la estructura de la vivienda lo cual tendría costos adicionales, pero existe otra alternativa, la recolección mediante el uso de recipientes, la cual favorece el proceso, pues reduce los costos e incluso los anula y permite la reutilización de agua también en viviendas rentadas.

 		</p>
 		<p>
 			<strong>
 				c.
 			</strong>
 			Debe calcularse la cantidad de agua que es posible recolectar diariamente en cada fuente de la vivienda, de acuerdo con el uso diario de la familia. Esta tarea se debe realizar un día en que todos los integrantes de la familia estén en sus actividades normales pues será el mayor nivel de consumo de la semana.
 		</p>

 		<p>
 			Para poder realizar esta tarea se sugiere la participación de todos los miembros de la familia, debe conseguirse un recipiente lo suficientemente grande para recolectar y posteriormente medir la cantidad de agua gris producida en cada fuente. Se sugiere el uso de canecas recicladas de pintura; recuerde que este recipiente puede contener 20 galones de líquido, pero es necesario hacer el cálculo en litros.
 		</p>

 		<p>
 			<strong>
 				Complete la siguiente tabla de acuerdo a las características de la vivienda que habita:
 			</strong>
 		</p>

 		<img class="imgtabla" src="https://i.postimg.cc/Kj9fXyqT/10-Mat-tabla2.png" alt="tabla2">

 		<p>
 			<strong>
 				B.	Aguas lluvias:
 			</strong>
 		</p>
 		<p>
 			Esta actividad tiene un importante trabajo de consulta, investigación y análisis, es necesario caracterizar la región en que los estudiantes viven, para mayor eficiencia se desarrollará mediante trabajo colaborativo con los equipos constituidos previamente.
 		</p>

 			<p>
 			<strong>
 				a.
 			</strong>
 			Identificar la región en que viven de acuerdo a la organización territorial, para facilitar la búsqueda de la información deben identificar la cantidad de agua que se produce por precipitaciones (lluvia) tanto mensual como anualmente en su ciudad, si viven en una región cuya información no es fácil de conseguir se debe buscar la ciudad más cercana y con base en estos datos hacer el análisis.
 		</p>

 		<p>
 			Página sugerida para esta consulta: <a href="http://atlas.ideam.gov.co/visorAtlasClimatologico.html" target="_blank" rel="noopener noreferrer">http://atlas.ideam.gov.co/visorAtlasClimatologico.html
 		</a></p>

 		<p>
 			<strong>
 				b.
 			</strong>
 			Elaborar tablas de datos en las cuales se organice la información histórica de precipitaciones en la región que se habita, mes a mes, y para la última década año a año.  Para facilitar su comprensión cada grupo de estudiantes deberá elaborar gráficas que representen las tablas de por lo menos dos tipos, se sugiere un diagrama de barras, un histograma, o un polígono de frecuencia.
 		</p>

 		<p>
 			Explicar si es favorable el diagrama circular, gráfico de sectores o torta, y por qué.
 		</p>

 		<p>
 			Con esta información es posible proyectar el tipo de recipiente, caneca, tanque o depósito que se deberá diseñar para recolectar el agua lluvia.
 		</p>

 		<p>
 			<strong>
 				c.
 			</strong>
 			Análisis de la vivienda: esta actividad debe ser individual, para facilitar y hacer más eficiente la recolección de aguas lluvias. En esta etapa es necesario observar características de la estructura de la vivienda y diligenciar la siguiente tabla.
 		</p>

 		<img src="https://i.postimg.cc/xjgtNKfd/10-Mat-tabla3.png" alt="tabla4" class="imgtabla">

 	`,
        upload: false,
        id: 1,
      },
      {
        content: `

 			<img src="https://i.postimg.cc/tgbw01Qx/diana-mate.png" data-toggle="tooltip" data-placement="top" title="Recuerda, en esta actividad debes hacer un entrgable.">
 		<ul class="menu_momento_introductivo">
 			<li class="btn_foro" data-toggle="tooltip"
         data-placement="left"
         title="Competencias Básicas"><span><a alt="Competencias Básicas" href=""></a></span></li>
 			<li class="btn_maloka" data-toggle="tooltip"
         data-placement="top"
         title="Competencias Socioemocionales"><span><a alt="Competencias Socioemocionales" href=""></a></span></li>
 			<li class="btn_perfil" data-toggle="tooltip"
         data-placement="right"
         title="Competencias Ciudadanas"><span><a alt="Competencias Ciudadanas" href=""></a></span></li>
 		</ul>

 		<img class="divicion_image" src="assets/images/fondos/Fondo_division_mod.png">

 		<p>
 			<strong>
 				3.2.3
 			</strong>
 			Diseño del sistema de recolección de aguas grises y aguas lluvias
 		</p>

 		<p>
 			En este apartado podrá encontrar una guía para la construcción de un sistema para la recolección de aguas grises y aguas lluvias, este deberá ser adaptado a las condiciones de su vivienda y los requerimientos de almacenamiento.
 		</p>

 		<p>
 			<strong>A.</strong>
 			Sistema para recolección de aguas grises
 		</p>

 		<p>
 			De acuerdo con los cálculos realizados en el numeral anterior, se deben buscar tanques de almacenamiento, por ejemplo, canecas de pintura en desuso, albercas o lavaderos internos o externos.
 		</p>

 		<p>
 			Para evitar la modificación de la estructura de la vivienda se darán soluciones aplicables de forma simple pero eficiente, cada una de las soluciones estará vinculada a un proceso matemático lo cual implicará la elaboración del análisis de la situación, el planteamiento y la solución de ecuaciones donde se involucren conceptos geométricos, unidades de medida, entre otras.
 		</p>

 		<p>
 			<strong>
 			a.	Método de depósito y manguera para la lavadora:
 			</strong>
 		</p>

 		<p>
 			Se debe colocar la manguera de drenaje de la lavadora en la parte superior del recipiente o depósito, si este tiene tapa será mucho mejor, adicionalmente, debe considerar la construcción de un filtro casero en el interior del depósito para eliminar impurezas del agua (más adelante se presentará una forma simple y práctica para su elaboración), en la base del depósito debe hacerse una perforación e instalar un tubo que permita conectar una manguera de jardín o una llave que posibilite sacar el agua para su reutilización.
 		</p>

 		<p>
 			Preguntas relacionadas:
 		</p>
 		<p>
 			<i>
 				<strong>
 					i.	¿Qué forma debe tener el depósito de agua para mejorar el proceso?
 				</strong>
 			</i>
 		</p>

 		<p>
 			Para dar respuesta se sugiere considerar un tanque de forma cilíndrica, un tanque en forma de prisma rectangular o uno en forma de pirámide truncada de base cuadrada.
 		</p>

 		<img class="imgtabla" src="https://i.postimg.cc/mDyVw978/10-Mat-Recurso-15img5.png" alt="">

 		<p>
 			Argumente su respuesta poniendo en consideración la posible construcción del tanque (calcular el área superficial de la figura), ¿cuánto material se requiere para elaborar cada estructura conservando la misma capacidad de contener o volumen?, ¿en qué material es más conveniente diseñar este depósito considerando los costos y la durabilidad?
 		</p>

 		<p>
 			El volumen requerido dependerá de la capacidad de la lavadora, por ejemplo 50 galones (189,271 litros).
 		</p>

 		<p>
 			<i>
 				<strong>
 					ii.	¿Cuál es la mejor ubicación para el agujero de vaciado del tanque y por qué? ¿qué resulta más práctico para el proceso de vaciado, un tubo, una manguera o una llave y por qué?
 				</strong>
 				Puede soportar su argumentación en la física.
 			</i>
 		</p>

 		<p>
 			<strong>
 				b.	Baldes o cubetas para duchas, lavaplatos y lavamanos:
 			</strong>
 		</p>

 		<p>
 			La recolección de aguas grises en cubetas o baldes les permitirá ejercitarse y les proporcionará una conciencia profunda de cuánta agua se usa en cada actividad. Se puede recolectar las aguas grises de la regadera poniéndole un tapón al sifón para recolectar el agua, o simplemente bañarse sobre una cubeta. No olvide recolectar el “agua clara” mientras espera a que el agua se caliente si es el caso.
 		</p>

 		<p>
 			El agua del lavaplatos y lavamanos de la cocina y el baño se puede almacenar en un contenedor (un balde) bajo el mismo lavaplatos o lavamanos, basta con desconectar el codo y poner el recipiente en su lugar.
 		</p>

 		<p>
 			Para facilitar la extracción y no mover continuamente el balde se puede hacer un sistema similar al del tanque de la lavadora tal que en su parte inferior se ubique un sistema de vaciado que pueda ser conectado a una manguera. La capacidad de estas cubetas o baldes es inferior, por ejemplo 10 a 12 litros.
 		</p>

 		<p>
 			En este caso también se debe realizar el análisis del ítem anterior en sus numerales
 			<strong>
 				i.
 			</strong>  y
 			<strong>
 				ii.
 			</strong>
 		</p>

 	`,
        upload: false,
        id: 1,
      },
      {
        content: `

 		<p>
 			<strong>
 				3.2.4
 			</strong>
 			Sistema de almacenamiento y tratamiento de aguas:
 		</p>

 		<p>
 			En esta fase se proponen dos sistemas de almacenamiento y tratamiento de aguas grises y aguas lluvia que cada estudiante deberá considerar de acuerdo a las características de su lugar de residencia.
 		</p>

 		<p>
 			<strong>A.</strong>
 			Viviendas urbanas o con poco espacio:
 		</p>

 		<p>
 			Si la vivienda es urbana y se cuenta con poco espacio para el almacenamiento y posterior tratamiento de las aguas recolectadas este sistema será muy favorable.
 		</p>

 		<p>
 			<strong>
 				Sistema en tanque plástico cilíndrico:
 			</strong>
 		</p>

 		<p>
 			<strong>
 				a.
 			</strong>
 			Ubicación:
 		</p>

 		<p>
 			La gravedad es la más fácil y segura forma para mover el agua. El sistema de agua debe estar situado sobre un piso estable y nivelado a una menor altura de la fuente de agua y una mayor altura que el lugar donde se utiliza el agua tratada. Para lograrlo se sugiere ubicar una base de forma rectangular sobre la cual se ponga el tanque, de acuerdo a su diámetro se debe construir esta base que puede ser de cemento o madera. Esto permite el funcionamiento pasivo del sistema de tratamiento y de control muy simple utilizando solo una válvula de flotador (el mismo dispositivo que vuelve a llenar los tanques de inodoros): cuando el agua se retira del tanque de almacenamiento el nivel de agua en el sistema cae, abriendo la válvula de flotador. Cuando el sistema está lleno, la válvula de flotador se cierra.
 		</p>

 		<p>
 			<strong>
 				b.
 			</strong>
 			Construcción del filtro:
 		</p>

 		<p>
 			<strong>
 				Se debe conseguir un tanque plástico:
 			</strong>
 		</p>
 		<br>
 		<img src="https://i.postimg.cc/wvp0L2R1/10-Mat-img4.png" alt="" class="tabla" style="width: 300px;">
 		<br>
 		<p>
 			Este tanque tiene dimensiones de 60cm de diámetro y 90 cm de alto.
 		</p>

 		<p>
 			<span class="icon_objetivos"></span>
 			Calcule el volumen del tanque presentado.
 		</p>
 		<p>
 			<span class="icon_objetivos"></span>
 			Diseñe la base que pueda soportar este tanque teniendo en cuenta, el diámetro de su base y el peso del contenedor lleno según el volumen calculado para evitar accidentes.
 		</p>

 		<p>
 			<strong>
 				En el tanque que usted logró conseguir realice las siguientes conexiones:
 			</strong>
 		</p>

 		<br>
 		<img src="https://i.postimg.cc/cHCSDhs5/Matema-ticas-10-6.png" alt="esta imagen no la tenemos" class="tabla" style="width: 300px;">
 		<br>

 		<p>
 			Debe perforarse el tanque en dos lugares como se muestra en la imagen, ubicar en cada uno de ellos un tubo de PVC con una llave que facilite la entrada o salida de agua según sea el caso.
 		</p>

 		<p>
 			<span class="icon_objetivos"></span>
 			Elabore una tabla de materiales requeridos para esta tarea, incluya en ella: lista de materiales de plomería, descripción, cantidad y precio. Para esta tarea puede consultar a un familiar o conocido que tenga experiencia en el oficio de la plomería.
 		</p>

 		<img class="imgtabla" src="https://i.postimg.cc/CL1JGz5s/10-Mat-tabla4.png" alt="tabla" width="100%">

 		<p>
 			<strong>
 				Materiales para filtración del agua:
 			</strong>
 		</p>

 		<p>
 			Dentro del tanque debe ubicar de la siguiente forma los materiales que se listan a continuación:
 		</p>
 		<br>
 		<img src="https://i.postimg.cc/C1SszK9D/10-Mat-img6.png" alt="" class="imgtabla">
 		<br>
 		<p>
 			Para mejorar el proceso de tratamiento del agua y ampliar sus posibles usos se puede construir un segundo filtro idéntico para procesar el agua dos veces y mejorar su calidad.
 		</p>

 		<p>
 			<span class="icon_objetivos"></span>
 			Elabore una tabla de costos similar a la de plomería para los materiales internos del filtro, calcule el valor total del filtro o los filtros según sean sus posibilidades y necesidades.
 		</p>

 		<img class="imgtabla" src="https://i.postimg.cc/pdNZMCZs/10-Mat-tabla5.png" alt="tabla" width="100%">

 		<p>
 			<strong>
 				B.
 			</strong>
 			Viviendas rurales o con espacio de casalote o patio trasero:
 			Si la vivienda cuenta con espacio adicional y solo si se tiene un espacio con un nivel de inclinación o pendiente de al menos 15º usted podrá hacer este tipo de filtro.
 		</p>

 		<p>
 			<strong>
 				a.
 			</strong>
 			Ubicación:
 		</p>

 		<p>
 			Aprovechando la ladera o pendiente del terreno se puede abrir un agujero, en él se puede hacer el mismo filtro con diferencias mínimas respecto al anterior.
 		</p>

 		<p>
 			<strong>
 				b.
 			</strong>
 			Construcción del filtro:
 		</p>

 		<p>
 			<strong>
 				Materiales requeridos:
 			</strong>
 			Para esta actividad busque asesoría de un familiar o conocido que tenga experiencia en el oficio de la plomería.
 		</p>

 		<br>
 		<img src="https://i.postimg.cc/kGhQ1vGF/10-Mat-tabla6.png" alt="" class="imgtabla">
 		<br>

 		<p>
 			<strong>
 				Material interno del filtro:
 			</strong>
 			Se utilizarán los mismos materiales que en el tanque plástico, pero con un grosor de 0.25 m cada capa. Se debe elaborar para esta propuesta un diseño similar al presentado en el tanque plástico explicando el proceso.
 		</p>

 		<p>
 			<strong>
 				c.
 			</strong>
 			Proceso:
 		</p>

 		<p>
 			<span class="icon_objetivos"></span>
 			Construir un agujero en el suelo con las siguientes medidas: 60 centímetros de profundidad, 60 centímetros de ancho y 60 de centímetros de largo o según la cantidad de agua que sale a diario en su vivienda.
 		</p>
 		<p>
 			<span class="icon_objetivos"></span>
 			Recubrir las paredes del agujero con el nylon plástico resistente. También se puede usar una caneca o recipiente de plástico dentro del agujero, esto para que no se filtre el agua y se pierda a través del suelo.
 		</p>
 		<p>
 			<span class="icon_objetivos"></span>
 			Colocar los materiales del filtro en el orden indicado.
 		</p>
 		<p>
 			<span class="icon_objetivos"></span>
 			Cubrir el agujero ya relleno con un trozo de cedazo para filtrar los residuos de alimento, basura, etc.
 		</p>
 		<p>
 			<span class="icon_objetivos"></span>
 			Colocar un tubo de PVC en el fondo del agujero para que sirva como salida del agua filtrada. Las conexiones de tubería serán subterráneas, se pueden cavar al mismo tiempo en que se hace el agujero.
 		</p>
 		<p>
 			<span class="icon_objetivos"></span>
 			Si es posible construir un segundo agujero en el suelo con las mismas medidas y materiales del agujero uno que reciba el agua que sale del primero se mejorará el proceso de tratamiento del agua.
 		</p>

 	`,
        upload: false,
        id: 1,
      },
      {
        content: `

 		<img class="divicion_image" src="assets/images/fondos/Fondo_division_mod.png">

 		<img src="https://i.postimg.cc/tgbw01Qx/diana-mate.png" data-toggle="tooltip" data-placement="top" title="Recuerda, en esta actividad debes hacer un entrgable.">

 		<p>
 			<strong>
 				3.2.3
 			</strong>
 			Diseño del sistema de recolección de aguas grises y aguas lluvias
 		</p>

 		<p>
 			En este apartado podrá encontrar una guía para la construcción de un sistema para la recolección de aguas grises y aguas lluvias, este deberá ser adaptado a las condiciones de su vivienda y los requerimientos de almacenamiento.
 		</p>

 		<p>
 			<strong>A.</strong>
 			Sistema para recolección de aguas grises
 		</p>

 		<p>
 			De acuerdo con los cálculos realizados en el numeral anterior, se deben buscar tanques de almacenamiento, por ejemplo, canecas de pintura en desuso, albercas o lavaderos internos o externos.
 		</p>

 		<p>
 			Para evitar la modificación de la estructura de la vivienda se darán soluciones aplicables de forma simple pero eficiente, cada una de las soluciones estará vinculada a un proceso matemático lo cual implicará la elaboración del análisis de la situación, el planteamiento y la solución de ecuaciones donde se involucren conceptos geométricos, unidades de medida, entre otras.
 		</p>

 		<p>
 			<strong>
 			a.	Método de depósito y manguera para la lavadora:
 			</strong>
 		</p>

 		<p>
 			Se debe colocar la manguera de drenaje de la lavadora en la parte superior del recipiente o depósito, si este tiene tapa será mucho mejor, adicionalmente, debe considerar la construcción de un filtro casero en el interior del depósito para eliminar impurezas del agua (más adelante se presentará una forma simple y práctica para su elaboración), en la base del depósito debe hacerse una perforación e instalar un tubo que permita conectar una manguera de jardín o una llave que posibilite sacar el agua para su reutilización.
 		</p>

 		<p>
 			Preguntas relacionadas:
 		</p>
 		<p>
 			<i>
 				<strong>
 					i.	¿Qué forma debe tener el depósito de agua para mejorar el proceso?
 				</strong>
 			</i>
 		</p>

 		<p>
 			Para dar respuesta se sugiere considerar un tanque de forma cilíndrica, un tanque en forma de prisma rectangular o uno en forma de pirámide truncada de base cuadrada.
 		</p>

 		<p>
 			Argumente su respuesta poniendo en consideración la posible construcción del tanque (calcular el área superficial de la figura), ¿cuánto material se requiere para elaborar cada estructura conservando la misma capacidad de contener o volumen?, ¿en qué material es más conveniente diseñar este depósito considerando los costos y la durabilidad?
 		</p>

 		<p>
 			El volumen requerido dependerá de la capacidad de la lavadora, por ejemplo 50 galones (189,271 litros).
 		</p>

 		<p>
 			<i>
 				<strong>
 					ii.	¿Cuál es la mejor ubicación para el agujero de vaciado del tanque y por qué? ¿qué resulta más práctico para el proceso de vaciado, un tubo, una manguera o una llave y por qué?
 				</strong>
 				Puede soportar su argumentación en la física.
 			</i>
 		</p>

 		<p>
 			<strong>
 				b.	Baldes o cubetas para duchas, lavaplatos y lavamanos:
 			</strong>
 		</p>

 		<p>
 			La recolección de aguas grises en cubetas o baldes les permitirá ejercitarse y les proporcionará una conciencia profunda de cuánta agua se usa en cada actividad. Se puede recolectar las aguas grises de la regadera poniéndole un tapón al sifón para recolectar el agua, o simplemente bañarse sobre una cubeta. No olvide recolectar el “agua clara” mientras espera a que el agua se caliente si es el caso.
 		</p>

 		<p>
 			El agua del lavaplatos y lavamanos de la cocina y el baño se puede almacenar en un contenedor (un balde) bajo el mismo lavaplatos o lavamanos, basta con desconectar el codo y poner el recipiente en su lugar.
 		</p>

 		<p>
 			Para facilitar la extracción y no mover continuamente el balde se puede hacer un sistema similar al del tanque de la lavadora tal que en su parte inferior se ubique un sistema de vaciado que pueda ser conectado a una manguera. La capacidad de estas cubetas o baldes es inferior, por ejemplo 10 a 12 litros.
 		</p>

 		<p>
 			En este caso también se debe realizar el análisis del ítem anterior en sus numerales
 			<strong>
 				i.
 			</strong>  y
 			<strong>
 				ii.
 			</strong>
 		</p>

 	`,
        upload: true,
        phase: 1,
        id: 1,
      },
      {
        content: `

 		<h1>
 			Fase postactiva o de aplicación
 		</h1>

 		<img class="divicion_image" src="assets/images/fondos/Fondo_division_mod.png">

 		<img src="https://i.postimg.cc/tgbw01Qx/diana-mate.png" data-toggle="tooltip" data-placement="top" title="Recuerda, en esta actividad debes hacer un entrgable.">

 		<p>
 			En los grupos de trabajo colaborativo deben realizar el siguiente análisis:
 		</p>

 		<p>
 			<strong>
 				A.
 			</strong>
 			De acuerdo a las condiciones de cada vivienda y a las tablas de cantidad de aguas grises y de aguas lluvias que se producen en cada una se deben proponer los posibles usos que tendrá el agua tratada; debe argumentarse esta propuesta desde tres (3) aspectos fundamentales:
 		</p>
 		<p>
 			<strong>
 				a.
 			</strong>
 			Cuidado del medio ambiente y planificación del uso del recurso hídrico: debe cuantificarse la cantidad a utilizar en cada actividad, elaborar tablas de asignación de uso, costo del uso si se utilizará agua potable y ahorro generado por el uso de reutilización de agua.
 		</p>

 		<p>
 			<strong>
 				b.
 			</strong>
 			Reducción de costos y gastos familiares: Elaborar un presupuesto familiar con el uso actual del agua potable y una proyección del presupuesto en consideración al ahorro obtenido.
 		</p>

 		<p>
 			<strong>
 				c.
 			</strong>
 			Beneficios adicionales para entorno familiar
 		</p>

 		<p>
 			<strong>
 				B.
 			</strong>
 			Se debe hacer un análisis de las condiciones de uso del recurso hídrico en la localidad, pueblo, vereda, etc., de tal forma que se logre identificar:
 		</p>

 		<p>
 			<strong>
 				a.
 			</strong>
 			Usos económicos, ambientales y sociales del recurso en su comunidad: Para esta actividad es necesario basar el análisis en datos proporcionados por las entidades gubernamentales, alcaldía, personería, etc.
 		</p>

 		<p>
 			<strong>
 				b.
 			</strong>
 			Responsables del cuidado y administración del recurso hídrico
 		</p>

 		<p>
 			<strong>
 				c.
 			</strong>
 			Qué ecosistemas se ven afectados positiva o negativamente por el uso del recurso hídrico, explicar y documentar en lo posible con datos e imágenes.
 		</p>

 		<p>
 			<strong>
 				d.
 			</strong>
 			Considerar la posibilidad de implementar una política de tratamiento y reutilización de aguas en la comunidad, presentar una idea que pueda posteriormente desarrollarse.
 		</p>

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
 				<img class="divicion_image" src="assets/images/fondos/Fondo_division_mod.png">
 				<h2 class="ct-matematicas">→ Actividad 1.</h2>

 				<p class="parrafo_tiempo"><span class="icon_tiempo"></span>A. Activación cognitiva para el aprendizaje</p>
 				<p>Este módulo es un reto, a ti estudiante de grado 11, que, si ya no lo eres, pronto serás un ciudadano activo cumpliendo un rol que puede ser de cambio y transformación para tu comunidad o de continuidad pasiva frente a todo aquello que puede ser mejor.</p>

 				<p class="_italic">Si desde el inicio nos contaran que en la infancia se define la salud mental de un adulto… <br> Entonces trataríamos con más amor el alma de los niños. <br> Anónimo.</p>

 				<img src="https://i.postimg.cc/tgbw01Qx/diana-mate.png">

 				<ul class="menu_momento_introductivo">
 					<li class="btn_foro"><span><a alt="Competencias Básicas" href=""></a></span></li>
 					<li class="btn_maloka"><span><a alt="Competencias Socioemocionales" href=""></a></span></li>
 					<li class="btn_perfil"><span><a alt="Competencias Ciudadanas" href=""></a></span></li>
 				</ul>
 				<img class="divicion_image" src="assets/images/fondos/Fondo_division_mod.png">

 				<p>¿Con cuánta frecuencia las personas se dan cuenta de lo que piensan? ¿Son capaces de regular sus pensamientos?</p>
 				<p>Para familiarizarse con la temática de este módulo debemos conocer un poco de la realidad sobre salud mental en el mundo, y de manera particular en Colombia; para lograrlo presentaremos algunos conceptos fundamentales y datos tomados de fuentes como el Ministerio de Salud y Protección Social, el DANE y organizaciones no gubernamentales dedicadas al cuidado y la divulgación de temas sobre salud, estos facilitarán la comprensión del contexto:</p>

 				<section class="extract_content">
 					<p class="boton_rojo_content">Según la OMS, la salud mental se define como un “estado de completo bienestar físico, mental y social, y no solamente la ausencia de afecciones o enfermedades”. (DANE, 2020)</p>
 					<p class="boton_rojo_content">Los problemas de salud mental afectan a una tercera parte de las personas a lo largo de su vida. La afectación de los problemas de salud mental en la vida y el bienestar de las personas puede llegar a ser muy seria: no solo la afectación directa del problema en sí, sino también el estigma, la falta de comprensión o tolerancia, los problemas de trabajo y la pérdida de derechos civiles que pueden acompañar el problema. (Xplore Health, 2021)</p>
 					<p class="boton_rojo_content">¡Vive plenamente, cuida tu salud mental! Este es un factor determinante para el desarrollo humano y social, puesto que es fundamental para la construcción de capital social y redes de apoyo, el fomento de la productividad y el fortalecimiento de sociedades más pacíficas (MEN, Nubia Bautista, subdirectora (e) de Enfermedades No Transmisibles, 2020)</p>
 				</section>

 				<p>Estos tres reportes validan y muestran la importancia de analizar la problemática de la salud mental en cada región de nuestro país, para garantizar una sociedad más justa, productiva, pacífica y feliz.</p>

 				<img class="divicion_image" src="assets/images/fondos/Fondo_division_mod.png">

 				<p>Ahora te invitamos a realizar el siguiente “Juego de Diálogo”: </p>
 				<p>(Basado en Discussion Continuum desarrollado por Ecsite, en colaboración con Barcelona Science Park y Centre of the Cell (Londres), en el contexto del proyecto Xplore Health. Gracias a At-Bristol por el desarrollo del formato del continuo del debate: www.at-bristol.org.uk)</p>
 				<p>Instrucciones:</p>
 				<p>Adaptado de:  Xplore Health, en su página <a class="p-800" target="_blank" href="https://www.xplorehealth.eu/es">https://www.xplorehealth.eu/es</a></p>
 				<p>Esta actividad está pensada para facilitar el diálogo sobre los aspectos éticos, legales y sociales de los estudios sobre salud mental. Los estudiantes debatirán las cuestiones suscitadas por cada afirmación y, para cada tarjeta, elegirán entre «de acuerdo» y «en desacuerdo».</p>
 				<p class="boton_rojo_content">En grupos de trabajo colaborativo integrados por 8 a máximo 12 estudiantes, se debatirán las cuestiones planteadas por cada una de las afirmaciones o situaciones y se escogerá qué posición debe ocupar cada carta entre “de acuerdo” y “en desacuerdo”. Al final los estudiantes acordarán un orden de las tarjetas: desde aquellas con las que están más de acuerdo hasta aquellas con las que están más en desacuerdo. Este orden establecido se puede comparar entre los grupos y así se abre el debate a todo el grupo. La actividad se puede realizar en cualquier espacio físico o virtual.</p>
 				<p class="boton_rojo_content">El “Juego de Diálogo”: se planea para jóvenes de grado once y tiene una duración de entre 60 y 90 minutos, debe estar moderado y asesorado por el docente.</p>

 				<h3>Elementos del juego:</h3>

 				<p class="boton_rojo_content">Una tarjeta DE ACUERDO y una tarjeta EN DESACUERDO.</p>
 				<p class="boton_rojo_content">Ocho tarjetas de debate, que incluyen afirmaciones sobre algún aspecto de la salud mental.</p>

 				<h3>Reglas del juego:</h3>

 				<p><span class="bold_">1.</span> Cada grupo recibe una tarjeta DE ACUERDO, una tarjeta EN DESACUERDO y máximo 8 tarjetas de debate.</p>
 				<p><span class="bold_">2.</span> Cada grupo coloca en el suelo o sobre la mesa, a un metro de distancia, la tarjeta DE ACUERDO y la tarjeta EN DESACUERDO para representar los dos extremos de un debate. Las tarjetas de debate se colocarán en ese espacio de separación. </p>
 				<p><span class="bold_">3.</span> El primer jugador lee la primera tarjeta de debate al resto del grupo. El jugador deberá asegurarse de que todos entienden la tarjeta y, si es necesario, deberá utilizar la información de los preconceptos para asegurarse de que el grupo comprende la afirmación. </p>
 				<p><span class="bold_">4.</span> A continuación, el primer jugador decide en qué medida está de acuerdo con la primera tarjeta. Coloca la tarjeta boca arriba en un punto de la secuencia, más o menos cerca de DE ACUERDO o EN DESACUERDO, según su criterio. Esta será la elección del jugador y el grupo no la someterá a debate. Si lo desea, el jugador podrá dar una justificación. </p>
 				<p><span class="bold_">5.</span> A continuación, los jugadores, por turnos, leen una de las tarjetas de debate, comprueban que todos la comprenden y eligen individualmente dónde colocarla en la secuencia, como hemos visto anteriormente (DE ACUERDO o EN DESACUERDO). </p>
 				<p><span class="bold_">6.</span> Una vez se hayan leído, comprendido y colocado en la secuencia todas las tarjetas, podrá iniciarse el debate. El objetivo es colocar las tarjetas entre DE ACUERDO y EN DESACUERDO en un orden convenido por la mayoría de los jugadores. Los jugadores deben elegir una tarjeta de discusión y debatir si moverla o no. </p>
 				<p><span class="bold_">7.</span> Al final del debate, cada grupo deberá tener una secuencia acordada por la mayoría. </p>
 				<p><span class="bold_">8.</span> Si son varios los grupos que juegan al mismo tiempo, el profesor puede aportar para la presentación de los resultados de los distintos grupos. Preguntando, por ejemplo: ¿Son similares? ¿Puede alguien de cada grupo explicar sus decisiones sobre una tarjeta en particular?</p>

 				<h3>Modelo de Tarjetas:</h3>
 				<img class="imgtabla" width="100%" src="https://i.postimg.cc/KjgybY3P/11-Mat-img1.png" alt="">
 				<br>

 			`,
        upload: false,
        id: 1,
      },
      {
        content: `
 				<h2>→ Actividad 2:</h2>
 				<img src="https://i.postimg.cc/tgbw01Qx/diana-mate.png">

 				<ul class="menu_momento_introductivo">
 					<li class="btn_foro"><span><a alt="Competencias Básicas" href=""></a></span></li>
 					<li class="btn_maloka"><span><a alt="Competencias Socioemocionales" href=""></a></span></li>
 					<li class="btn_perfil"><span><a alt="Competencias Ciudadanas" href=""></a></span></li>
 				</ul>

 				<img class="divicion_image" src="assets/images/fondos/Fondo_division_mod.png">

 				<h3>B. Preconceptos:</h3>
 				<h3 class="italic_">Palabras clave</h3>

 				<p class="parrafo_tiempo">Ten en cuenta los siguientes conceptos para el desarrollo de las actividades propuestas</p>
 				<p class="parrafo_tiempo"><span class="bold_">Enfermedad mental:</span> Trastorno médico que altera los pensamientos, sentimientos, estado de ánimo y capacidad para relacionarse con otras personas, así como el funcionamiento diario. </p>

 				<p class="parrafo_tiempo"><span class="bold_">Psiquiatra: </span> Médico especialista en el diagnóstico y el tratamiento de los problemas de salud mental.  </p>
 				<p class="parrafo_tiempo"><span class="bold_">Psicólogo:</span>  Un psicólogo clínico trabaja con personas que han sido diagnosticadas de problemas de salud mental. </p>
 				<p class="parrafo_tiempo"><span class="bold_">Depresión:</span>  La depresión clínica es un trastorno mental que se caracteriza por un estado de ánimo deprimido, baja autoestima y pérdida de interés en actividades normalmente placenteras.  </p>
 				<p class="parrafo_tiempo"><span class="bold_">Trastornos de ansiedad:</span>  Conjunto de trastornos de larga duración que provocan ansiedad a los pacientes en relación con una amplia variedad de situaciones y temas, más que en un acontecimiento específico. </p>

 				<h3>Cuestiones en torno a los problemas de salud mental </h3>

 				<p>Los problemas de salud mental afectan hasta a un tercio de las personas durante el curso de su vida. Los efectos de los problemas de salud mental en la vida y el bienestar de las personas pueden ser muy graves: no solo como consecuencia del efecto directo del problema en sí mismo, sino también del estigma, la falta de comprensión o tolerancia, los problemas de trabajo y la pérdida de derechos civiles que pueden acompañar al problema. El diagnóstico es a menudo complejo y algunos tipos de tratamiento siguen siendo objeto de controversia. Con un presupuesto limitado para investigación, prevención y tratamiento, ¿cómo deben centrar sus esfuerzos las autoridades de salud? ¿Y qué opciones deben ofrecer a los pacientes?</p>

 				<h3>Estadísticas </h3>

 				<p class="boton_rojo_content">40%: población colombiana adulta ha sufrido, está sufriendo o sufrirá un trastorno mental diagnosticable en algún momento de la vida. </p>
 				<p class="boton_rojo_content"><span class="bold_">30.539:</span> casos de intento de suicidio en el país para el año 2019. </p>

 				<h3>Preguntas y respuestas sobre cuestiones científicas </h3>

 				<section class="extract_content">
 					<p class="bold_">¿Cuál es la magnitud de los problemas de salud mental?</p>
 					<p>Uno de cada diez jóvenes sufre un trastorno psiquiátrico grave que provoca angustia o discapacidad grave, y dificulta sus vidas en el plano emocional, social y académico. Los más frecuentes son los trastornos de ansiedad. La depresión es la principal causa de discapacidad entre los adolescentes, y el suicidio es la segunda causa de muerte más frecuente entre los jóvenes. Una revisión reciente de estudios en Colombia constató que más de 4 de cada 100 adultos había sufrido un trastorno mental durante el año anterior. Esto representa aproximadamente 1.928.000 personas. La cifra real puede ser incluso más alta</p>

 					<h3>¿Cuándo aparecen las enfermedades mentales?  </h3>
 					<p>Diversos problemas empiezan a aparecer a distintas edades. Enfermedades como el trastorno por déficit de atención con hiperactividad (TDAH, ver el recuadro en la página siguiente) tienden a aparecer en la infancia, mientras que la depresión, por ejemplo, generalmente tiene su inicio durante la adolescencia. Otras enfermedades mentales están más asociadas con la edad avanzada</p>

 					<h3>¿Qué problemas pueden causar las enfermedades mentales? </h3>
 					<p>Los niños que padecen enfermedades mentales generalmente se ven afectados de forma recurrente y a largo plazo, y ello repercute de forma importante en su vida y en la de las personas de su entorno. Los estudios demuestran que los problemas de salud mental en la infancia están asociados a problemas en el hogar, la escuela y posteriormente durante la vida, incluyendo mayores índices de enfermedad mental en la edad adulta, menores niveles de empleo y dificultades para establecer relaciones a largo plazo. La sociedad en su conjunto se ve afectada por la enorme magnitud de los problemas de salud mental. Cuanto mayor es el número de personas que sufren trastornos mentales, más recursos económicos deben dedicarse a la atención de salud, la educación, los servicios sociales y el sistema judicial. </p>

 					<h3>¿Cómo se diagnostican las enfermedades mentales?</h3>
 					<p>Un psiquiatra realizará una entrevista exhaustiva. Si el paciente muestra ciertas conductas y síntomas psicológicos que están asociados a un trastorno, y sufre angustia significativa y no es capaz de vivir satisfactoriamente, entonces puede hacerse un diagnóstico. Los psiquiatras buscan la presencia conjunta de ciertos síntomas y conductas que han estado presentes durante un periodo definido de tiempo. Por ejemplo, para el diagnóstico de la depresión buscan síntomas como estado de ánimo deprimido y falta de interés o placer en las actividades habituales durante un periodo de más de dos semanas. Ello no siempre es fácil, ya que síntomas como “estado de ánimo deprimido” son difíciles de medir. A veces los médicos tienen dificultades para distinguir, por ejemplo, si un paciente sufre depresión leve o simplemente está triste.</p>

 					<p>Entre los investigadores existe el debate sobre si las enfermedades mentales deben diagnosticarse por los síntomas o bien construyendo una teoría que explique la causa. No obstante, estas teorías también son difíciles de probar, y es difícil decir si una diferencia en el cerebro causa esquizofrenia, o si la esquizofrenia causa una diferencia en el cerebro, por ejemplo.</p>

 					<h3>¿Cuáles son los factores de riesgo para las enfermedades mentales?</h3>
 					<p>La mayoría de los problemas de salud mental son muy complejos y es difícil identificar una sola causa. En lugar de ello, los investigadores estudian diversos factores que incrementan el riesgo. Los psiquiatras a menudo investigan los antecedentes familiares del paciente, ya que los problemas de salud mental son más frecuentes en personas cuyos familiares biológicos también sufren un trastorno. Pero hay muchos otros factores que pueden aumentar el riesgo de desarrollar un problema de salud mental. Algunos de estos factores incluyen anomalías o desequilibrios químicos en el cerebro, lesiones en la cabeza o abuso de drogas. Los trastornos también pueden desencadenarse como consecuencia de episodios estresantes, como ser víctima de maltrato, la separación de la pareja o el fallecimiento de un amigo o miembro de la familia. </p>

 					<h3>¿Qué tipos de tratamiento existen? </h3>
 					<p>Los médicos generalmente recomiendan una combinación de tratamiento psicológico y farmacológico, así como intervenciones en la familia del paciente, la escuela o la comunidad. La terapia cognitivo-conductual es un tratamiento psicológico que funciona especialmente bien en niños y adolescentes con problemas tales como ansiedad, trastorno obsesivo-compulsivo y depresión. Se trata de un tipo de terapia dirigida a ayudar a las personas a gestionar sus problemas mediante la modificación de sus pensamientos y conducta. La terapia puede ser administrada por un profesional sanitario, pero hay estudios que demuestran que también puede administrarse con un ordenador, con buenos resultados. Los médicos también pueden recetar varios tipos de medicación para tratar los trastornos mentales. Algunos medicamentos están diseñados para su administración a corto plazo, mientras que otros se prescriben durante periodos de tiempo más prolongados. En función de los síntomas, los pacientes pueden necesitar medicamentos para tratar síntomas físicos además de los psicológicos. La medicación puede afectar a los niños y adolescentes de forma diferente que, a los adultos, puesto que los nuevos tratamientos farmacológicos generalmente no se estudian en personas muy jóvenes.
 </p>

 					<h3>¿Cómo pueden prevenirse los problemas de salud mental?</h3>
 					<p>La probabilidad de que un joven desarrolle un problema de salud mental es menor si está bien estimulado desde las primeras etapas de la vida, si está bien atendido y si no tiene otros problemas de salud.</p>

 				</section>
 					<p>Adicionalmente, es necesario comprender la noción de porcentaje y la aplicación de conceptos estadísticos a la situación específica de análisis de la situación actual de las enfermedades mentales en Colombia.</p>

 					<h3>Conceptos implicados</h3>
 					<p class="boton_rojo_content">Al revisar las condiciones generales de la salud mental en Colombia es necesario tener un buen dominio del proceso de recolección, organización y análisis de datos. El cálculo e interpretación de medidas de tendencia central y por supuesto el diseño y la interpretación de gráficas de tipo estadístico.</p>
 					<p class="boton_rojo_content">Al revisar las condiciones generales de la salud mental en Colombia es necesario tener un buen dominio del proceso de recolección, organización y análisis de datos. El cálculo e interpretación de medidas de tendencia central y por supuesto el diseño y la interpretación de gráficas de tipo estadístico.</p>
 					<p>
 						Para repasar sobre estas temáticas propias de los diferentes pensamientos variacional, numérico, etc. se sugiere consultar:</p>
 					<p>
 						<a class="p-800" target="_blank" href="https://www.colombiaaprende.edu.co/contenidos-para-aprender?Nombre=&amp;field_nivel_value=3&amp;field_grado_target_id=3336&amp;field_asignatura_target_id=3322">https://www.colombiaaprende.edu.co/contenidos-para-aprender?Nombre=&amp;field_nivel_value=3&amp;field_grado_target_id=3336&amp;field_asignatura_target_id=3322
 						</a>
 					</p>
 					<p>
 						<a class="p-800" target="_blank" href="http://instaladores-curriculos.sucerman.com/1-curriculo-matematicas/matematicas/">
 							http://instaladores-curriculos.sucerman.com/1-curriculo-matematicas/matematicas/
 						</a>
 					</p>


 			`,
        upload: false,
        id: 1,
      },
      {
        content: `
		<h2 class="ct-matematicas">→ Actividad 3: </h2>

			<img src="https://i.postimg.cc/tgbw01Qx/diana-mate.png">
 				<ul class="menu_momento_introductivo">
 					<li class="btn_foro"><span><a alt="Competencias Básicas" href=""></a></span></li>
 					<li class="btn_maloka"><span><a alt="Competencias Socioemocionales" href=""></a></span></li>
 					<li class="btn_perfil"><span><a alt="Competencias Ciudadanas" href=""></a></span></li>
 				</ul>

 				<img class="divicion_image" src="assets/images/fondos/Fondo_division_mod.png">

 				<h3>C. Realizar un análisis de cada contexto desde la aplicación de las matemáticas identificada, por ejemplo</h3>

 				<p>“En Colombia, las encuestas... han permitido identificar que la principal problemática en materia de salud mental es la creciente prevalencia de la depresión (aproximadamente 5% de la población adulta)” (DANE 2020).</p>

 				<p>Para realizar el análisis de esta afirmación es fundamental averiguar cuál es el tamaño de la población colombiana según el último censo aplicado por el DANE, esto permitirá al grupo de estudiantes calcular el 5% de este número y evaluar las implicaciones de esta problemática para el desarrollo y sostenibilidad del sistema de salud, entre otros tantos aspectos por evaluar.</p>

 				<p>“El 43% de las sesiones virtuales atendidas por la línea de Minsalud durante la pandemia se orientaron a la respuesta frente a síntomas de ansiedad, estrés y depresión, principalmente dando respuesta a solicitudes de apoyo de personas de Bogotá, Antioquia, Cundinamarca y Atlántico (54.5%)” (DANE 2020). </p>

 				<img class="divicion_image" src="assets/images/fondos/Fondo_division_mod.png">

 				<h3>D. Elaborar una tabla que permita la recolección de datos sobre las siguientes cuestiones:</h3>

 				<p>Indagar con los integrantes de la familia de cada estudiante del grupo de trabajo colaborativo sobre la presencia de síntomas como la ansiedad, el estrés y la depresión durante el último año, considerando las implicaciones de la pandemia: el aislamiento, las dificultades económicas, el desempleo, el fallecimiento o enfermedad de familiares, entre otras.</p>

 				<p>Indagar también sobre la presencia de emociones tales como el enojo, la tristeza y el temor</p>

 				<h3>Ejemplo de tabla:</h3>

 				<img class="imgtabla" src="https://i.postimg.cc/QdQcTcF9/11-Mat-tabla1.png">

 				<p>
 					<a class="p-800" target="_blank" href="https://www.colombiaaprende.edu.co/Página sugerida para este análisis: https://www.minsalud.gov.co/Paginas/Minsalud-ratifica-su-compromiso-con-la-salud-mental-de-los-colombianos.aspx">https://www.colombiaaprende.edu.co/Página sugerida para este análisis: https://www.minsalud.gov.co/Paginas/Minsalud-ratifica-su-compromiso-con-la-salud-mental-de-los-colombianos.aspx
 					</a>
 				</p>
 				<p>
 					<a class="p-800" target="_blank" href="https://www.colombiaaprende.edu.co/Página sugerida para este análisis: https://www.minsalud.gov.co/Paginas/Minsalud-ratifica-su-compromiso-con-la-salud-mental-de-los-colombianos.aspx">
 						http://instaladores-curriculos.sucerman.com/1-curriculo-matematicas/matematicas/
 					</a>
 				</p>


 			`,
        upload: true,
        phase: 0,
        id: 1,
      },
      {
        content: `

 				<h1>FASE INTERACTIVA</h1>
 				<h3>Desarrollo</h3>

 				<p>En esta fase se debe diseñar la propuesta para la evaluación de la salud mental de la comunidad durante y después del distanciamiento social obligatorio por COVID-19 en la familia como primer núcleo social, la región, pueblo, localidad, vereda, etc., identificando factores asociados a la presencia y evolución de síntomas. </p>

 				<p>El objetivo de esta fase del proceso es definir, reconocer e identificar las emociones adaptativas, desadaptativas y/o los posibles síntomas de problemas de salud mental en los integrantes de la familia y la comunidad: </p>

				 <img src="https://i.postimg.cc/tgbw01Qx/diana-mate.png">
 				<ul class="menu_momento_introductivo">
 					<li class="btn_foro"><span><a alt="Competencias Básicas" href=""></a></span></li>
 					<li class="btn_maloka"><span><a alt="Competencias Socioemocionales" href=""></a></span></li>
 					<li class="btn_perfil"><span><a alt="Competencias Ciudadanas" href=""></a></span></li>
 				</ul>

 				<img class="divicion_image" src="assets/images/fondos/Fondo_division_mod.png">

 				<h2 class="ct-matematicas">→ Actividad 4: </h2>

 				<h3>Elaboración de la propuesta de estudio sobre condiciones asociadas a salud mental en el contexto de la pandemia del Covid – 19 en la comunidad</h3>

 				<p>Cada grupo de estudiantes, con base en la información aquí aportada y la consulta de información relacionada deberá diseñar un estudio sobre condiciones asociadas a salud mental en el contexto de la pandemia del Covid – 19, haciendo uso de la siguiente estructura o modelo.</p>

 				<h3>GUÍA DE ELABORACIÓN DEL ESTUDIO:</h3>

 				<img class="imgtabla" src="https://i.postimg.cc/t7QJDms3/11-Mat-tabla2.png">


 			`,
        upload: true,
        phase: 1,
        id: 1,
      },
      {
        content: `
			<h2 class="ct-matematicas">→ Actividad 5: </h2>
			<img src="https://i.postimg.cc/tgbw01Qx/diana-mate.png">
 				<ul class="menu_momento_introductivo">
 					<li class="btn_foro"><span><a alt="Competencias Básicas" href=""></a></span></li>
 					<li class="btn_maloka"><span><a alt="Competencias Socioemocionales" href=""></a></span></li>
 					<li class="btn_perfil"><span><a alt="Competencias Ciudadanas" href=""></a></span></li>
 				</ul>

 				<img class="divicion_image" src="assets/images/fondos/Fondo_division_mod.png">
 				<h3>Guía para la elaboración del diseño metodológico de la propuesta</h3>
 				<p>Elabora una tabla como la propuesta, usando la columna en blanco para el desarrollo de los items propuestos en el modelo.</p>
 				<h3>Conceptos básicos</h3>

 				<p>Para el desarrollo de este estudio se hará uso de la estadística como medio para la recolección, organización y análisis de la información, y la posterior divulgación de los resultados.</p>
 				<p>La realización de un estudio de esta naturaleza requiere considerar la ética de la investigación, que no es otra cosa que informar a los participantes todas las características del estudio e invitarlos a participar del mismo; siempre debe utilizarse un consentimiento informado que cada uno de los participantes firmará si está de acuerdo en participar en el proyecto, si es un menor de edad el consentimiento debe ser firmado por el padre de familia o el tutor legal del niño.</p>
 				<p>Para la primera etapa, recolección de información se propone el diseño de una encuesta, a continuación, se describen los conceptos básicos a utilizar:</p>

 				<p><span class="bold_">Encuesta:</span> es un método de investigación y recopilación de datos utilizadas para obtener información de personas sobre diversos temas. Las encuestas tienen una variedad de propósitos y se pueden llevar a cabo de muchas maneras dependiendo de la metodología elegida y los objetivos que se deseen alcanzar.</p>
 				<p><span class="bold_">Pregunta cerrada:</span> en estas preguntas el encuestado tiene que elegir entre las opciones establecidas. A su vez se dividen en dicotómicas o politómicas. </p>
 				<p>Las dicotómicas son preguntas que se responden con un Sí o con un No, o en su defecto No sabe, No contesta o No responde.</p>
 				<p>Las politómicas también conocidas como categorizadas, presentan varias alternativas para que el encuestado elija la más conveniente, por ejemplo, responder “Sí, no, tal vez” o las de tipo “Algunas veces, casi siempre, nunca, casi nunca, siempre”.</p>
 				<p><span class="bold_">Grupo Etario:</span> Es un grupo integrado por personas de la misma edad o de una edad similar.</p>
 				<p>Se sugieren consultar sobre grupos etarios según el Ministerio de salud</p>
 				<p><a class="p-800" target="_blank" href="https://www.minsalud.gov.co/proteccionsocial/Paginas/cicloVida.aspx">https://www.minsalud.gov.co/proteccionsocial/Paginas/cicloVida.aspx</a></p>

 				<h3>Conceptos estadísticos fundamentales </h3>

 				<p>Para la consecución de esta información se propone que el grupo de estudiantes realice una consulta con el apoyo del docente y producto de ella se defina: estadística descriptiva, población, muestra, dato, variable, variable continua, variable discreta, frecuencia, frecuencia relativa, frecuencia absoluta, medidas de tendencia central (media, mediana, moda), gráficos estadísticos (Diagrama de barras, histograma de frecuencias, polígono de frecuencias, diagrama circular) y otros que considere importantes para el desarrollo del estudio y la presentación de los resultados obtenidos.</p>
 				<p>Se sugiere consultar:</p>
 				<p><a class="p-800" target="_blank" href="https://www.colombiaaprende.edu.co/contenidos-para-aprender?Nombre=&amp;field_nivel_value=3&amp;field_grado_target_id=3336&amp;field_asignatura_target_id=3322">https://www.colombiaaprende.edu.co/contenidos-para-aprender?Nombre=&amp;field_nivel_value=3&amp;field_grado_target_id=3336&amp;field_asignatura_target_id=3322</a></p>
 				<p><a class="p-800" target="_blank" href="http://instaladores-curriculos.sucerman.com/1-curriculo-matematicas/matematicas/">http://instaladores-curriculos.sucerman.com/1-curriculo-matematicas/matematicas/</a></p>

 				<h3>Análisis de la población y selección de la muestra a estudiar</h3>

 				<p>Es necesario que él o los cursos de grado once se organicen para identificar la población a estudiar teniendo en cuenta todos los miembros de la comunidad, esto requiere información de la alcaldía, es necesario acceder a datos censales para determinar el número de habitantes por grupo etario.</p>
 				<p>Con base en esta información se propone que cada grupo de trabajo colaborativo integrado por cuatro (4) estudiantes asuma el estudio de uno de los grupos etarios identificados, seleccionando una muestra aleatoria de un tamaño adecuado a las condiciones del estudio, por ejemplo, una cantidad representativa de personas, pero también se deben tener en cuenta factores como la disponibilidad de recursos para el trabajo de campo, recursos tecnológicos, transporte, entre otros. Cada uno de estos factores y su análisis deberá describirse y así explicar con claridad el tamaño y la selección de la muestra de cada grupo.</p>


 			`,
        upload: false,
        id: 1,
      },
      {
        content: `
				<h2 class="ct-matematicas">→ Actividad 6: </h2>
 				<h3>Variables a evaluar y diseño de instrumentos para la recolección de datos</h3>
 				<p>Determinada la muestra que participará del estudio se deben considerar preguntas en relación con las siguientes variables:
 				</p>
 				<p>1. Características sociodemográficas: son características para investigar como edad, género, grupos vulnerables, pertenencia étnica, ciudad de residencia, tenencia de vivienda, situación laboral, ingresos y ahorros del hogar.</p>
 				<p>2. Factores relacionados con las emociones que surgieron como resultado del aislamiento en tiempos de pandemia.</p>
 				<p>3. Factores relacionados con los efectos negativos en el ámbito económico y en el cuidado del hogar a causa de la pandemia.</p>
 				<p>4. Factores relacionados con la salud en general, y con la salud mental en particular.</p>
 				<p>5. Presencia de síntomas relacionados con el estrés, la depresión y la ansiedad.</p>
 				<p>Para abordar a profundidad este tema se sugiere la consulta y estudio de:</p>
 				<p><a class="p-800" target="_blank" href="https://www.colombiaaprende.edu.co/contenidos-para-aprender/formulacion-de-situaciones-aleatorias-de-recoleccion-de-informacion">https://www.colombiaaprende.edu.co/contenidos-para-aprender/formulacion-de-situaciones-aleatorias-de-recoleccion-de-informacion</a></p>
 				<h3>Para diseñar el instrumento se proponen los siguientes parámetros:</h3>
 				<p>a. Diseñen un máximo de cinco (5) preguntas por cada una de las variables, tomen como ejemplo el material sugerido en el enlace. Estas preguntas deben ser cerradas, para facilitar la organización y el análisis de los datos resultantes (usar tablas para tal fin).</p>
 				<p>b. Defina el medio a utilizar para aplicar la encuesta, si se aplicara de manera personal el grupo de trabajo se encargará de aplicar la encuesta, hacer las preguntas a cada miembro de la comunidad que quiera y pueda participar de forma presencial tomando nota de las respuestas sin modificarlas ni interpretarlas, también se pueden grabar las respuestas con ayuda de un celular para evitar sesgos o cambios de sentido en la información.</p>
 				<p>c. Otra posibilidad es el uso de herramientas como Formularios de Google la cual es gratuita y de fácil diseño y uso, podrá ser aplicado a los integrantes de la comunidad que tengan correo electrónico.</p>
 				<p>También están las redes sociales mediante las cuales también es posible diseñar una encuesta:</p>
 				<p>A continuación, se proponen algunos enlaces para facilitar esta actividad:</p>
 				<h3>En Instagram:</h3>
 				<p><a class="p-800" target="_blank" href="https://www.cnet.com/es/noticias/instagram-encuestas-opcion-respuesta/">https://www.cnet.com/es/noticias/instagram-encuestas-opcion-respuesta/</a></p>
 				<h3>En Facebook: </h3>
 				<p><a class="p-800" target="_blank" href="https://www.facebook.com/mis.encuestas/app/155008507867572/?gclid=CjwKCAiA9vOABhBfEiwATCi7GFN-huOh7Av9u5xphO3155ot7Eju7hh3A4qlqbfhmQTemJ-z_84WKhoCz90QAvD_BwE">https://www.facebook.com/mis.encuestas/app/155008507867572/?gclid=CjwKCAiA9vOABhBfEiwATCi7GFN-huOh7Av9u5xphO3155ot7Eju7hh3A4qlqbfhmQTemJ-z_84WKhoCz90QAvD_BwE</a></p>
 				<p>d. La redacción de las preguntas será clave y deberá considerarse el grupo etario aun cuando la intencionalidad de la pregunta sea la misma, el lenguaje deberá cambiar de acuerdo con las características de quienes van a ser encuestados, algunos ejemplos de preguntas se proponen a continuación:</p>
 				<p>Para personas jóvenes y adultas en relación con las emociones se proponen como ejemplo:</p>

 				<img class="imgtabla" src="https://i.postimg.cc/MHDPWg15/11-Mat-tabla3.png">


 			`,
        upload: false,
        id: 1,
      },
      {
        content: `
			<h2 class="ct-matematicas">→ Actividad 7: </h2>
			<img src="https://i.postimg.cc/tgbw01Qx/diana-mate.png">
 				<ul class="menu_momento_introductivo">
 					<li class="btn_foro"><span><a alt="Competencias Básicas" href=""></a></span></li>
 					<li class="btn_maloka"><span><a alt="Competencias Socioemocionales" href=""></a></span></li>
 					<li class="btn_perfil"><span><a alt="Competencias Ciudadanas" href=""></a></span></li>
 				</ul>

 				<img class="divicion_image" src="assets/images/fondos/Fondo_division_mod.png">

 				<h3>Organización y análisis de los datos obtenidos mediante la encuesta</h3>

 				<p>En esta parte del proceso es necesario explicar el cómo organizar los datos obtenidos de acuerdo con la forma en que se haya desarrollado la encuesta.</p>
 				<p>Las aplicaciones y redes sociales facilitan esta etapa del proceso pues están diseñadas para organizar y presentar la información obtenida tanto en tablas como en gráficas de tipo estadístico. Sin embargo, tienen una gran debilidad pues no todos los integrantes de la comunidad podrán o querrán acceder a estos medios.</p>
 				<p>Así que, en caso de realizar una encuesta de forma personal y con datos en papel. No olviden hacer las tablas adecuadas para facilitar la recolección de la información.</p>

 				<h3>Continuando con el ejemplo:</h3>

 				<p>Suponiendo una muestra de diez (10) personas, los resultados obtenidos son:</p>
 				<p>a. Resultados de la aplicación de la encuesta:</p>

 				<img class="imgtabla" src="https://i.postimg.cc/90n9tp2V/11-Mat-tabla4.png">

 				<p>b. Tabla de frecuencia resultante para la pregunta 1:</p>

 				<img class="imgtabla" src="https://i.postimg.cc/cL9JKHsy/11-Mat-tabla5.png">

 				<p><span class="bold_">Fa:</span> Frecuencia absoluta, <span class="bold_">FAA:</span> Frecuencia absoluta acumulada, <span class="bold_">Fr:</span> Frecuencia relativa, <span class="bold_">Fra:</span> Frecuencia relativa acumulada.</p>
 				<p>¿Y cómo se realiza el análisis?, haciendo uso de las medidas de tendencia central previamente consultadas: La medía y la mediana son medidas aplicables a datos numéricos, por lo cual en este ejemplo sólo se aplicará la moda.</p>

 				<img class="imgtabla" src="https://i.postimg.cc/K8ddsSf3/11-Mat-tabla6.png">

 				<p>Como es posible observar, se puede concluir que: </p>
 				<p class="boton_rojo_content">El 50% de las personas entrevistadas piensa que la pandemia de COVID-19 es un problema grave.</p>
 				<p class="boton_rojo_content">El 60% de las personas entrevistadas se ha sentido cansado sin motivo.</p>
 				<p class="boton_rojo_content">El 40% de las personas entrevistadas se ha sentido nervioso</p>
 				<p class="boton_rojo_content">El 60% de las personas entrevistadas NO ha sentido rabia.</p>
 				<p class="boton_rojo_content">Este análisis es apenas un ejemplo de todas las deducciones que es posible extraer de la tabla de datos.</p>
 				<p>d. Representación gráfica de la tabla de frecuencia correspondiente a la pregunta 1:</p>

 				<div class="mod_tar" style="display: none;">
 					<div class="mod_tar_iz">
 						<h3>Diagrama de barras</h3>
 						<p>Pregunta 1	 </p>
 						<img width="300" src="https://i.postimg.cc/5NzS2GLb/11-Mat-img2.png">
 					</div>

 					<div class="mod_tar_der">
 						<h3>Diagrama circular</h3>
 						<p>Pregunta 1	 </p>
 						<img width="300" src="https://i.postimg.cc/xCqKDF9r/11-Mat-img3.png">
 					</div>
 				</div>

 				<p>El análisis de cada una de las preguntas elaboradas por los grupos colaborativos aportará información de gran importancia para la comunidad, posibilitará la detección de la aparición de emociones desadaptativas en los integrantes de esta, especialmente en los núcleos familiares de los estudiantes, y también la presencia de síntomas relacionados con el estrés, la depresión y la ansiedad.</p>


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
 					<li class="btn_perfil"><span><a alt="Competencias Ciudadanas" href=""></a></span></li>
 				</ul>

 				<img class="divicion_image" src="assets/images/fondos/Fondo_division_mod.png">

 				<h3>Estrategias para favorecer la buena salud mental</h3>

 				<p>Esta fase del proyecto es una de las más importantes pues en ella los grupos de trabajo colaborativo deben proponer actividades y alternativas para mantener una mente positiva y lograr que las personas de la comunidad, especialmente niños, niñas y jóvenes se desprendan de ideas limitadoras para mejorar su bienestar.</p>

 				<p>La primera propuesta está enfocada en un conjunto de actividades llamada higiene mental, que trata de cuidar de nuestra mente como lo hacemos o debemos hacerlo con nuestro cuerpo, que permite que una persona esté en equilibrio con su entorno sociocultural. Estas acciones intentan prevenir el surgimiento de comportamientos que no se adapten al funcionamiento social y garantizar el ajuste psicológico imprescindible para que la persona goce de buena salud mental.</p>

 				<p>Se sugieren las siguientes claves para aplicar las técnicas de higiene mental:</p>

 				<p class="boton_rojo_content">Cuestionar las expectativas.</p>
 				<p class="boton_rojo_content">Desprenderse de los imposibles.</p>
 				<p class="boton_rojo_content">Cuidar de sus relaciones.</p>
 				<p class="boton_rojo_content">Pensar sobre sus necesidades básicas.</p>
 				<p class="boton_rojo_content">Practicar la resiliencia.</p>
 				<p class="boton_rojo_content">Marcarse objetivos concretos. </p>
 				<p class="boton_rojo_content">Practica la atención plena.</p>

 				<p>La autonomía, el bienestar, el potencial emocional y la competitividad forman parte de los factores que debe cuidar la higiene mental y resulta necesario desarrollar los siguientes hábitos: tener una valoración positiva de sí mismo, gestionar las emociones, atraer los recuerdos positivos, estar dispuesto a ver lo positivo.</p>

 				<p>Algunas actividades que pueden orientar el diseño de estrategias son:</p>

 				<p>1. Ejercitar la mente leyendo</p>
 				<p>2. Aprender a valorarse, buscar las fortalezas, cualidades y virtudes en cada uno.</p>
 				<p>3. Generar hábitos de descanso, planificar horarios y organizar actividades que mejoren el uso del tiempo libre y la realización de actividades lúdicas que promuevan la motivación y la alegría.</p>
 				<p>4. Practicar la aceptación, reconocer y aceptar la diferencia, adaptarse al cambio y la incertidumbre, ser flexible</p>
 				<p>5. Reconocer las prioridades, dará propósito, motivación y fuerza a todo lo que se haga.</p>
 				<p>6. Practicar actividades al aire libre con compañeros, amigos y/o familiares. </p>
 				<p>7. No dejar para mañana lo que puedas hacer hoy, la organización del tiempo y las actividades facilitará fortalecer hábitos de responsabilidad y evitará la procrastinación, la pereza y la pérdida de tiempo.</p>
 				<p>La segunda propuesta es la llamada gimnasia mental o gimnasia cerebral, es una técnica que permite mejorar el rendimiento escolar y se basa en una serie de ejercicios corporales para despejar la mente, enfocar la atención y revertir casos de hiperactividad, dislexia y trastornos de conducta, entre otros, en los niños, niñas y jóvenes.</p>
 				<p>Se propone un ejemplo de estas actividades para facilitar la consulta y motivación de los estudiantes de grado undécimo en la búsqueda de otras, y así poder diseñar un manual o guía con las estrategias para favorecer la buena salud mental de la comunidad, especialmente la comunidad académica.</p>

 				<h3>Ejercicios simples para aumentar la concentración y la memoria:</h3>

 				<div class="mod_tar" style="display: none;" style="display: flex;">
 					<div class="mod_tar_iz">
 						<div class="text_exercise_mat">
 							<h3>1. Ejercicio para niños (Gateo Cruzado)</h3>
 							<p>Con este ejercicio se obtienen diversos beneficios, activa el cerebro para cruzar la línea media visual, auditiva, kinesiológica y táctil, favorece la receptividad para el aprendizaje, mejora los movimientos oculares derecha a izquierda y la visión binocular y mejora la coordinación izquierda/derecha y la visión y audición.</p>
 							<p>Para realizar: mueve un brazo simultáneamente con la pierna de la parte opuesta del cuerpo. Hay diferentes formas de hacerlo: dobla una rodilla y levántala para tocarla con la mano del lado opuesto o dobla la rodilla llevando el pie hacia atrás y tócalo con la mano del lado contrario. En los niños más pequeños, también se puede hacer con la rodilla y los codos.</p>
 						</div>

 						<div class="text_exercise_mat">
 							<h3>2. Ejercicio para jóvenes (Brazo extendido, manos abiertas)</h3>
 							<p>Como la canción, extiende los brazos frente a ti, abre las palmas. Tu mano derecha tendrá la palma hacia y cerca a tu rostro, y la izquierda hacia a fuera. Ahora cambia. Izquierda a dentro, derecha a fuera. Izquierda a fuera, derecha dentro. Cambia durante 1 minuto, lo más rápido posible.</p>
 							<p>La práctica continua de estos ejercicios aumenta la conexión entre los dos hemisferios del cerebro y también ayuda a desarrollar el aprendizaje, la memoria y la creatividad.</p>
 						</div>

 						<div class="text_exercise_mat">
 							<h3>3. Ejercicio para adultos</h3>
 							<p>Apoyar las manos contra la pared y estirar la pierna izquierda hacia atrás, levantando el talón, el cuerpo debe adoptar un ángulo de 45°. En esta posición exhalar mientras se inclina contra la pared y flexionar la rodilla derecha, al mismo tiempo que presiona contra el piso el talón del pie izquierdo. Luego inhalar regresando a la posición inicial, levantando el talón izquierdo. Este ejercicio mejora la atención y favorece la concentración.
 </p>
 						</div>

 						<div class="text_exercise_mat">
 							<h3>4. Ejercicio para adultos mayores</h3>
 							<p>Escribir una lista de tareas y luego memorizarla, escuchar una nueva canción y escribir una parte de la letra, dibujar un mapa desde su casa hasta un lugar importante para la comunidad, investigar un nuevo tema de interés.</p>
 						</div>

 					</div>

 					<div class="mod_tar_der">
 						<div class="img_exercise_mat">
 							<img height="300" src="https://i.postimg.cc/2yyPqzTy/11-MAT-PG27-1-2x.png">
 						</div>
 						<div class="img_exercise_mat">
 							<img height="300" src="https://bilan.pi-interactiva.com/fotos/var/albums/11MAT_PG27-2%402x.png">
 						</div>
 						<div class="img_exercise_mat">
 							<img height="300" src="https://i.postimg.cc/mDQTDTL7/11-MAT-PG27-3-2x.png">
 						</div>
 						<div class="img_exercise_mat">
 							<img height="300" src="https://i.postimg.cc/BnjTznBS/11-MAT-PG27-4-2x.png">
 						</div>
 					</div>
 				</div>


 			`,
        upload: false,
        id: 1,
      },
      {
        content: `

 				<h1>Fase postactiva o de aplicación</h1>
 				<h2>→ Actividad 4.</h2>

				 <img src="https://i.postimg.cc/tgbw01Qx/diana-mate.png">
 				<ul class="menu_momento_introductivo">
 					<li class="btn_foro"><span><a alt="Competencias Básicas" href=""></a></span></li>
 					<li class="btn_maloka"><span><a alt="Competencias Socioemocionales" href=""></a></span></li>
 					<li class="btn_perfil"><span><a alt="Competencias Ciudadanas" href=""></a></span></li>
 				</ul>
 				<img class="divicion_image" src="assets/images/fondos/Fondo_division_mod.png">

 				<p>A. En los grupos de trabajo colaborativo deben consultar uno de los siguientes estudios estadísticos realizados sobre salud mental en tiempos de pandemia por diferentes organizaciones gubernamentales y no gubernamentales:</p>
 				<p class="boton_rojo_content">a. DIAN. Salud mental en Colombia: una aproximación desde las estadísticas oficiales en el contexto de pandemia. Consultar en: <a class="p-800" target="_blank" href="https://www.dane.gov.co/files/webinar/presentacion-webinar-salud-mental-en-colombia-21-10-2020.pdf">https://www.dane.gov.co/files/webinar/presentacion-webinar-salud-mental-en-colombia-21-10-2020.pdf</a></p>
 				<p class="boton_rojo_content">b. Universidad Javeriana. Salud mental y resiliencia en adultos jóvenes de Sudamérica durante el aislamiento (distanciamiento social obligatorio) por la pandemia de COVID-19. Consultar en:
 					<a class="p-800" target="_blank" href="https://medicina.javeriana.edu.co/documents/3185897/0/ESM+Jo%C2%BFvenes+-+Present+MinSalud+versi%C3%B3n+3.pdf/c5414e93-e078-4e0a-971f-99dfd9adbdbd">https://medicina.javeriana.edu.co/documents/3185897/0/ESM+Jo%C2%BFvenes+-+Present+MinSalud+versi%C3%B3n+3.pdf/c5414e93-e078-4e0a-971f-99dfd9adbdbd</a>
 				</p>
 				<p class="boton_rojo_content">c. Unicef. Encuesta #ENCOVID19Infancia. Efectos de COVID-19 en el bienestar de las niñas, niños y adolescentes. Consultar en: <a class="p-800" target="_blank" href="https://www.unicef.org/mexico/informes/encuesta-encovid19infancia">https://www.unicef.org/mexico/informes/encuesta-encovid19infancia</a></p>
 				<p>B. De acuerdo con los resultados presentados en el estudio seleccionado, el grupo de estudiantes deberá preparar una infografía o poster que contenga la información explicada mediante gráficas de tipo estadístico e interpretaciones elaboradas en un lenguaje claro que permita la comprensión de estos por todos los miembros de la comunidad</p>
 				<p class="boton_rojo_content">a. La infografía o poster debe elaborarse según un modelo común acordado entre estudiantes y docente.</p>
 				<p class="boton_rojo_content">b. La interpretación de las gráficas y los datos estadísticos deben explicarse ampliamente considerando el público, deberán organizar sesiones para los estudiantes del colegio, padres de familia, docentes y directivos, otros miembros de la comunidad que hayan participado del proyecto.</p>
 				<p>C. Elaborar una infografía o poster que contenga los resultados del proyecto sobre salud mental en la comunidad desarrollado por cada grupo de trabajo colaborativo.</p>
 				<p class="boton_rojo_content">a. Organizar un evento de tipo académico donde los diferentes grupos presenten dichos resultados a los estudiantes del colegio, padres de familia, docentes y directivos, y otros miembros de la comunidad.</p>
 				<p class="boton_rojo_content">b. Preparar y desarrollar jornadas académicas donde se socialicen las estrategias propuestas por los estudiantes sobre higiene y gimnasia mental.</p>
 				<p class="boton_rojo_content">c. Documentar estas actividades mediante fotos, audios y/o videos que faciliten su socialización con otras instituciones educativas, de cuidado del adulto mayor, empresas, etc.</p>


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
      await this.evidence.upload(this.phase, 5, formData);
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
