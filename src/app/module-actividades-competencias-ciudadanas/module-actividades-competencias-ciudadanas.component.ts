import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EvidenceUseCase } from '@domain/usecases/evidence.usecase';
import { Phase } from '@domain/models/evidence.model';

@Component({
  selector: 'app-module-actividades-competencias-ciudadanas',
  templateUrl: './module-actividades-competencias-ciudadanas.component.html',
  styleUrls: ['./module-actividades-competencias-ciudadanas.component.scss'],
})
export class ModuleActividadesCompetenciasCiudadanasComponent
  implements OnInit
{
  phases: Phase[] = ['PRE_ACTIVE', 'INTERACTIVE', 'POST_ACTIVE'];
  phase: Phase;
  isValidFile: boolean = false;
  isEvidenceSubmitted: boolean = false;

  page: any;
  grade: any;

  modules: any = {
    10: [
      {
        content: `
				<h1>
					FASE PREACTIVA O DE EXPLORACIÓN DE SABERES PREVIOS
				</h1>

				<p>
					<strong>
						PARTICIPACIÓN CIUDADANA PARA LA RESOLUCIÓN DE CONFLICTOS Y LA CONSTRUCCIÓN DE PAZ
					</strong>
				</p>

				<p>
					La Constitución Política afirma en su primer artículo, que Colombia es un Estado Social de Derecho. Esto significa que es un Estado en el que se protegen y se promueven nuestros derechos fundamentales y los Derechos Humanos. De los derechos fundamentales más importantes de cualquier Constitución justa e igualitaria, son los Derechos Políticos, puesto que nos garantizan la participación democrática en diferentes escenarios que atañen a los intereses colectivos y nacionales. Una de las formas de participación que se establecen en la constitución se denomina mecanismos de participación ciudadana.
				</p>

				<img class="divicion_image" src="assets/images/fondos/Fondo_division_mod.png">

				<h2>
					Actividad 1.
				</h2>
 <ul class="menu_momento_introductivo">
 			<li class="btn_foro" title="Competencias Básicas"><span><a alt="Competencias Básicas" href=""></a></span></li>

 		</ul>
				<p>
					 Antes de hablar sobre participación ciudadana, se propone debatir frente al siguiente caso de discriminación sucedido en Argentina (nota de Semana, 2017). Al finalizar la lectura, en el grupo, se debaten las preguntas orientadoras:
				</p>

				<section class="extract_content">
					<p>
						<strong>
							<i>
								El caso de discriminación a un niño con Asperger que conmociona a la Argentina
							</i>
						</strong>
					</p>

					<p>
						Un grupo de madres celebró la decisión de un colegio de haber sacado a un menor del curso que sufre esta especie de autismo. Pensaron que el hecho pasaría desapercibido, pero generó una ola de indignación.
					</p>

					<p>
						Hace unos días un grupo de madres decidieron no enviar más a sus hijos de cuarto grado al colegio San Antonio de Padua, en Argentina, hasta que la institución no expulsara a un niño con el síndrome de asperger. Ante la presión de las familias, el colegio cambió al pequeño de curso. Pensaron que el hecho no tendría mucha importancia. Pero no fue así.
					</p>

					<p>
						Días después se conoció una conversación en la que algunas madres celebraron la decisión de las directivas del colegio, manifestaciones que hicieron a través de un grupo de Whatsapp. “Al fin una buena noticia”, decía una mujer llamada Viviana quien a su mensaje agregó un gran número de emojis de celebración: Caras felices, aplausos, campanas y botellas de champagne. Otras respondieron con frases como “Ya era hora de que se hagan valer los derechos del niño para 35 y no para uno solo!”. “Ojalá sea una buena noticia para ese nene y una buena noticia para todos los que peleamos para que nuestros hijos tengan una primaria como se merecen”. “Qué bueno para los chicos, que puedan trabajar y estar tranquilos”.  “Un alivio para los nuestros”.
					</p>

					<br>
					<img src="https://i.postimg.cc/N0YShsF5/10-CC-img1.png" alt="" class="tabla">

					<p>
						Rosaura Gómez, la tía del menor, compartió la historia en su cuenta de Facebook y además publicó las imágenes de la conversación de este grupo de mujeres. “Las mamás de los compañeritos hacían paro: no llevaban a sus hijos hasta que no sacaran a mi sobrino del colegio; eso no pasó pero lo cambiaron al otro 4°. Se supone que es un colegio religioso y esta fue la reacción de las mamás al enterarse”, escribió. La publicación se viralizó y fueron miles las personas que mostraron su indignación con el colegio como con las madres que promovían la discriminación del menor.
					</p>

					<p>
						El diario El Clarín de Argentina contactó a Paola Giaco, la madre del pequeño, para que contara su versión de la historia: “ver lo que escribieron las madres me generó angustia y vergüenza ajena. Pedí una reunión con la directora de la escuela para que me ponga por escrito por qué cambiaron a mi hijo de sección. Verbalmente me dijo que lo hacía para ‘aliviar al curso’”.
					</p>

					<p>
						Una de las madres del grupo no estaba de acuerdo con lo que se decía en el grupo así que le envió imágenes de esa conversación a Paola, quien no hacía parte del chat desde segundo grado pues ya habían dicho algo acerca de su hijo que la lastimó y prefirió salirse.
					</p>

					<p>
						“En ese contexto, me anunciaron el cambio a 4° B. Yo firmé y cuando llegué a mi casa me di cuenta de que quería tener los motivos por escrito, por eso volví a pedir una reunión con la directora. Mi hijo está angustiado. Le costó mucho tener un grupo de amigos y no quiere perder lo que consiguió. Lo charló con la psicóloga, pero no es un cambio fácil para él”, agregó la mamá que resaltó que “durante el año lo suspendieron en varias ocasiones. Lo sancionan por sus crisis, cuando son características del Asperger”. […] (Semana, 2017).
					</p>
				</section>

				<br>

				<img src="https://i.postimg.cc/tJJ8rL0v/diana-ciudad.png">

				<ul class="menu_momento_introductivo">
					<li class="btn_foro"><span><a alt="Competencias Básicas" href=""></a></span></li>
					<li class="btn_maloka"><span><a alt="Competencias Socioemocionales" href=""></a></span></li>
				</ul>

				<img class="divicion_image" src="assets/images/fondos/Fondo_division_mod.png">

				<p>
					Preguntas orientadoras del debate:
				</p>

				<p>
					<strong>a.</strong>
					Ante este hecho, ¿qué tipo de acciones o decisiones hubieran tomado en el caso de haber conocido <strong>con antelación</strong>  la decisión del colegio ante la situación de discriminación por parte de las madres?
				</p>
				<p>
					<strong>b.</strong>
					¿Qué tipo de acciones o decisiones hubieran tomado <strong> posterior </strong> a la decisión del colegio ante la situación de discriminación?
				</p>
				<p>
					<strong>c.</strong>
					¿Qué acciones de participación dentro del colegio emplearían para evitar este tipo de acciones discriminatorias en el colegio? ¿A qué instancias de su colegio irían para denunciar cualquier tipo de discriminación?
				</p>

				<p>
					Para responder las preguntas a, b y c se sugiere tener en cuenta la Ley 1620 de 2013 - Decreto 1965 de 2013 y las Guía 29 Guías pedagógicas para la convivencia escolar. Allí claramente se expone que:
				</p>

				<section class="extract_content">
					<p>
						…la Ley 1620 de 2013 y su decreto reglamentario aporta al mejoramiento de la calidad educativa y a la formación para el ejercicio de la ciudadanía, al convertirse en herramientas de política pública que organizan el sector educativo para contribuir al fortalecimiento de la convivencia escolar. De igual forma, la ley hace énfasis en la necesidad de entender la convivencia escolar como un asunto colectivo, cuya responsabilidad es compartida entre la comunidad educativa y otros sectores involucrados (MEN, s.f., p. 17)
					</p>
				</section>

				<p>
					La idea es que, a partir de esta guía y las orientaciones de la ley y el decreto, se centre la discusión en el concepto de la convivencia escolar entendido como:
				</p>

				<section class="extract_content">
					<p>
					…la acción de vivir en compañía de otras personas en el contexto escolar y de manera pacífica y armónica. Se refiere al conjunto de relaciones que ocurren entre las personas que hacen parte de la comunidad educativa, el cual debe enfocarse en el logro de los objetivos educativos y su desarrollo integral (MEN, s.f., p. 25)					</p>
				</section>

				<p>
					Por tanto, es importante que, para el análisis de este caso de discriminación, el cual, también podría suceder en nuestro colegio, tengamos los conocimientos, habilidades y destrezas para resolver conflictos teniendo en cuenta, las pautas asignadas por el manual de convivencia, las Leyes y la Constitución Colombiana.
				</p>

				<p>
					<strong>
						d.
					</strong>
					  Si la situación hubiese sucedido en Colombia, ¿crees que la tutela sería un mecanismo para reparar al niño víctima de la discriminación? ¿qué derechos fundamentales se le estaría vulnerando desde la actuación de las madres que protestaron para sacarlo y del colegio que finalmente lo cambió del curso?
				</p>



			`,
        upload: false,
        id: 1,
      },
      {
        content: `
				<img src="https://i.postimg.cc/tJJ8rL0v/diana-ciudad.png">

				<ul class="menu_momento_introductivo">
					<li class="btn_foro"><span><a alt="Competencias Básicas" href=""></a></span></li>
				</ul>

				<img class="divicion_image" src="assets/images/fondos/Fondo_division_mod.png">
				<h2>Actividad 2.</h2>
 <ul class="menu_momento_introductivo">
 			<li class="btn_foro" title="Competencias Básicas"><span><a alt="Competencias Básicas" href=""></a></span></li>

 			<li class="btn_perfil" title="Competencias Ciudadanas"><span><a alt="Competencias Ciudadanas" href=""></a></span></li>
 		</ul>

				<p>Es importante que se logre distinguir algunos conceptos fundamentales sobre la temática. Para ello, vamos a hacerlo de manera más interactiva.</p>

				<p>
					<span class="bold_">a.</span>
					A continuación, vas a encontrar una tabla con dos columnas. Relaciona el concepto de la columna A con la definición correcta de la columna B escribiendo el número que corresponda en el paréntesis:
				</p>

				<img class="tabla" src="https://i.postimg.cc/LX8WXxzS/10-CC-tabla1.png" alt="">

				<p>
					Para verificar que hubo una buena relación entre el concepto y la definición, resuelva el siguiente crucigrama haciendo uso de los conceptos de la columna A de la tabla anterior:
				</p>
				<br>

				<img src="https://i.postimg.cc/mDm0Nvbh/10-CC-crucigrama.png" alt="" class="tabla">
				<br>
				<br>

				<img src="https://i.postimg.cc/BbKWNKQr/10-CC-tabla2.png" alt="" class="tabla">

				<br>
				<p>
					<span class="bold_">b.</span>
					Teniendo en cuenta los conceptos que anteriormente se trabajaron y aclararon con la con la orientación de su profesor, a continuación se propone explorar la siguiente narrativa (a manera de historieta como aparece abajo) en el que deban acudir a un mecanismo de participación ciudadana. Al final, socialízalo con tus compañeros.
				</p>
				<br>
				<img src="https://i.postimg.cc/MKMhV3gK/10-CC-img2.png" alt="" class="tabla">


				<p>
					<span class="bold_">c.</span>
					La iniciativa legislativa popular en Colombia
				</p>
				<p>
					La iniciativa legislativa, en términos conceptuales, se puede sintetizar de la siguiente manera:
				</p>

				<section class="extract_content">
					<p>
						La ILP [Iniciativa Legislativa Popular] es la institución que da forma al derecho de la ciudadanía a plantear reformas legislativas —sea o no en forma de ley— ante el Poder Legislativo, obligando a este a su correspondiente toma en consideración. En algunos casos, como el de Colombia, puede abarcar también reformas constitucionales. La ILP es directa cuando culmina en la activación de un referéndum en el que se toma la decisión —sin pasar por el Poder Legislativo— e indirecta cuando la decisión final sobre el tema propuesto corresponde al Parlamento u otro órgano de representación. Esta última modalidad, conocida también como Iniciativa de Agenda, permite introducir temas en la agenda legislativa sin erosionar el poder de los legisladores: «consiste en que un determinado mínimo de ciudadanos políticamente capaces puedan presentar un proyecto de ley, a cuya toma en consideración se halle obligado el Parlamento» (Kelsen, 1920, pp. 65-66). (Suárez y Welp, 2019, p. 109).
					</p>
				</section>

				<p>
					Según el texto anterior, en Colombia la figura de la iniciativa legislativa popular, como mecanismo de participación ciudadana, se fortaleció gracias a la carta constitucional de 1991 que la incluyó junto con el referendo, plebiscito, revocatoria del mandato y cabildo abierto. Sin embargo, dicho mecanismo ha sido pocas veces utilizada por los ciudadanos y, cuando se presentan, no prosperan, como lo muestra la Registraduría Nacional del Estado Civil (s.f.):
				</p>

				<br>
				<img src="assets/images/iconos/10CC_tabla3.png" alt="" class="tabla">


			`,
        upload: false,
        id: 1,
      },
      {
        content: `

				<img src="https://i.postimg.cc/tJJ8rL0v/diana-ciudad.png">
				<ul class="menu_momento_introductivo">
					<li class="btn_foro"><span><a alt="Competencias Básicas" href=""></a></span></li>
					<li class="btn_maloka"><span><a alt="Competencias Socioemocionales" href=""></a></span></li>
				</ul>

				<img class="divicion_image" src="assets/images/fondos/Fondo_division_mod.png">
				<h2>Actividad 3</h2>
				<img src="https://i.postimg.cc/tgbw01Qx/diana-ciudad.png" title="Recuerda, en esta actividad debes hacer un entregable.">
<ul class="menu_momento_introductivo">

 			<li class="btn_perfil" title="Competencias Ciudadanas"><span><a alt="Competencias Ciudadanas" href=""></a></span></li>
 		</ul>
				<p>
					De acuerdo con el texto y la tabla presentada,
				</p>



				<p>
					<strong>
						a.
					</strong>
					Qué ejemplos se pueden exponer de una iniciativa legislativa popular directa y una indirecta. Utiliza ejemplos hipotéticos si es el caso.
				</p>

				<p>
					<strong>
						b.
					</strong>
					Con la orientación de tu profesor, consulta cuáles son los requerimientos, según la Constitución, para presentar una iniciativa legislativa popular.
				</p>

				<p>
					<strong>
						c.
					</strong>
					Después de casi 30 años de la Constitución Política de Colombia, ¿por qué crees que se han presentado pocas iniciativas legislativas populares y por qué ninguna ha prosperado?
				</p>





			`,
        upload: true,
        phase: 0,
        id: 1,
      },
      {
        content: `

				<h1>
					Fase interactiva
				</h1>

				<p>
					<strong>
						La participación ciudadana como garantía de estabilidad, paz y convivencia
					</strong>
				</p>

				<p>
					La participación ciudadana debe ser el pilar fundamental, no solo para darle estabilidad a la misma democracia, sino para garantizar uno de los derechos fundamentales de todo ciudadano: la paz y sana convivencia. Cuando estos derechos se ven vulnerados, ya sea porque entran intereses en pugna o conflictos, surgen, infortunadamente, formas violentas de solución a los conflictos que podría desatar la vulneración de otros derechos fundamentales como el de la vida. De esto se podría derivar que un Estado sin participación ciudadana lleva a la erosión de sus instituciones o formas de gobierno arbitrarios.
				</p>

				<img class="divicion_image" src="assets/images/fondos/Fondo_division_mod.png">

				<h2>
					Actividad 4.
				</h2>
 <ul class="menu_momento_introductivo">
 			<li class="btn_foro" title="Competencias Básicas"><span><a alt="Competencias Básicas" href=""></a></span></li>

 			<li class="btn_perfil" title="Competencias Ciudadanas"><span><a alt="Competencias Ciudadanas" href=""></a></span></li>
 		</ul>
				<p>
					A continuación, leamos los siguientes fragmentos de una nota de la BBC New (2021) sobre los problemas de la democracia en Latinoamérica, particularmente en el contexto de la pandemia por la Covid-19, y al final hagamos un debate en torno a unas preguntas orientadoras:
				</p>

				<section class="extract_content">
					<p>
						<strong>
							<i style="color: #a47a44;">
								Por qué solo hay 3 "democracias plenas" en América Latina, según The Economist (y por qué empeoró la situación en 2020)
							</i>
						</strong>
					</p>

					<p>
						Gerardo Lissardy
					</p>

					<p>
						BBC News Mundo, Nueva York
					</p>

					<p>
						3 febrero 2021
					</p>

					<p>
						<strong>
							La democracia fue otra víctima de la pandemia de coronavirus alrededor del mundo, de acuerdo a un nuevo informe de la Unidad de Inteligencia de The Economist.
						</strong>
					</p>

					<p>
						La crisis sanitaria global y en particular las medidas tomadas por los gobiernos para limitar el avance de la covid-19, llevaron en 2020 al peor puntaje promedio global del Índice de Democracia que esa unidad realiza anualmente desde 2006.
					</p>

					<p>
						"Vimos un enorme retroceso de las libertades individuales, creo que el mayor jamás emprendido por los gobiernos en tiempos de paz, y quizá aún en tiempos de guerra", dice Joan Hoey, autora del informe, en una entrevista con BBC Mundo.
					</p>

					<p>
						América Latina tampoco escapa al fenómeno global: la democracia de la región registra su quinto año consecutivo de retroceso y recibe su puntaje más bajo en la historia del índice (6,09 promedio sobre 10 puntos posibles).
					</p>

					<p>
						El informe clasifica a 167 países entre democracias plenas (entre 8 y 10 puntos), democracias imperfectas (entre 6 y 8), regímenes híbridos (entre 4 y 6 puntos) y regímenes autoritarios (por debajo de 4 puntos).
					</p>

					<p>
						El puntaje se otorga en función de variables en los países como proceso electoral y pluralismo, funcionamiento del gobierno, participación política, cultura política y libertades civiles.
					</p>

					<p>
						Noruega encabeza el ranking 2020 con 9,81 puntos y apenas tres países latinoamericanos clasifican como democracias plenas: Uruguay (15º con 8,61), Chile (17º con 8,28) y Costa Rica (18º con 8,16).
					</p>

					<p>
						En el otro extremo, tres países de la región son clasificados como autoritarios: Nicaragua, Cuba, Venezuela.
					</p>
				</section>

				<p>
					Lo que sigue es una síntesis del diálogo telefónico con Hoey, quien también es directora regional para Europa en la Unidad de Inteligencia de The Economist:
				</p>

				<section class="extract_content">
					<p>
						<strong>
							<i style="color: #a47a44;">
								Sabemos que la pandemia de coronavirus tuvo un impacto terrible en la salud pública, pero su informe advierte que también ha disminuido la calidad de las democracias en todo el mundo. ¿Cómo es eso?
							</i>
						</strong>
					</p>

					<p>
						No hay duda de que las medidas que tomaron los gobiernos para mitigar el impacto de la pandemia tuvieron un impacto enorme en la democracia en 2020, como se refleja en el índice.
					</p>

					<p>
						Tenemos, de lejos, el peor puntaje global en el índice de democracia desde que comenzamos a producirlo en 2006.
					</p>
					<p>
						Creo que vimos en todas partes cómo la democracia podía volverse fácilmente prescindible en una emergencia de salud pública mundial. No solo en los regímenes autoritarios o en las democracias menos desarrolladas, sino que en las democracias desarrolladas de Europa, Norteamérica y América Latina vimos una regresión muy grande en los puntajes regionales.
					</p>

					<p>
						Eso se debió esencialmente a que vimos un enorme retroceso de las libertades individuales, creo que el mayor jamás emprendido por los gobiernos en tiempos de paz, y quizá aún en tiempos de guerra. Esta fue la característica sorprendente del año y tuvo un gran impacto en los resultados generales del índice.
					</p>

					<p>
						Quizás vimos más protestas en democracias menos desarrolladas de África, Medio Oriente, incluso América Latina. Tal vez esto sea en parte por los niveles mayores de coerción empleados. Y también muchos líderes usaron la pandemia como pretexto para reprimir a sus opositores, la disidencia, la libertad de expresión.
					</p>

					<p>
						<strong>
							<i style="color: #a47a44;">
								¿En su opinión esto significa que la gente quizás le da menos valor a la libertad de lo que se pensaba?
							</i>
						</strong>
					</p>

					<p>
						No necesariamente. Estoy segura de que la mayoría de la gente pensó mucho en esto. No creo que signifique que la gente no valora la libertad, pero tomó una decisión —se podría decir comprensible, dado el número de muertos por esta nueva enfermedad— de que valía la pena.
					</p>

					<p>
						No significa que no haya sido difícil, o que no haya habido protestas. Es probable que cuanto más dure esto, veamos más protestas como las que hubo en las últimas semanas en Europa.
					</p>

					<p>
						Pero la eliminación de libertades civiles es impactante. En términos del índice, cualquier país que eliminó libertades individuales como la libertad de movimiento, que estableció poderes de emergencia sin permitir un escrutinio democrático adecuado, que eliminó pesos y contrapesos, etcétera, es penalizado independientemente del nivel de apoyo público a las medidas.
					</p>

					<p>
						Así debe ser, porque o tienes estas libertades o no las tienes.

					</p>
					<p>
						Una gran pregunta para el futuro es hasta qué punto estas libertades serán restauradas o no.
					</p>

					<p>
						<strong>
							<i style="color: #a47a44;">
								El informe marca el quinto año consecutivo de regresión de la democracia en América Latina. ¿Por qué?
							</i>
						</strong>
					</p>

					<p>
						El puntaje de América Latina disminuyó el año pasado, como en casi todas las demás regiones del mundo, debido principalmente a las restricciones a las libertades civiles en respuesta a la pandemia.
					</p>

					<p>
						Pero también vimos una continuación de las tendencias que llevaron a ese retroceso de cinco años. Y en áreas en las que la región estaba bastante bien —en proceso electoral y pluralismo, así como en libertades civiles— hemos visto una regresión.
					</p>

					<p>
						Hubo tendencias autoritarias crecientes en países como Venezuela y Nicaragua, por ejemplo.
					</p>

					<p>
						En 2020 las autoridades de esos países aprovecharon la situación para reprimir aún más a la oposición.
					</p>

					<p>
						En El Salvador se impusieron medidas de confinamiento draconianas, que han recibido muchas críticas. Y hubo acusaciones externas de corrupción. Así que El Salvador fue degradado de democracia defectuosa a régimen híbrido.
					</p>

					<p>
						Pero también vimos protestas que comenzaron en 2018 y se aceleraron en 2019, con la gente cada vez más frustrada por las deficiencias de los gobiernos. La pandemia frenó en gran medida esos movimientos de protesta. Sin embargo, es probable que ganen terreno en 2021, a medida que las poblaciones sienten las consecuencias económicas de la pandemia.
					</p>

					<p>
						Si comparamos dónde está América Latina hoy respecto a cuando comenzamos a producir el índice en 2006, vemos una disminución en el puntaje regional promedio en general.
					</p>

					<p>
						Pero 11 países han mejorado su puntaje durante ese período. Países que lo han hecho bien son Argentina, Chile, Colombia, Costa Rica, República Dominicana, Ecuador, Perú, Surinam y Uruguay.
					</p>

					<p>
						<strong>
							<i style="color: #a47a44;">
								El informe clasifica sólo a tres países de la región (Chile, Costa Rica y Uruguay) como democracias plenas. ¿No es muy poco?
							</i>
						</strong>
					</p>

					<p>
						Creo que es un desempeño bastante bueno. La mayoría de los países de América Latina clasifican como democracias imperfectas, algo que la región tiene en común con Europa del Este. Se caracterizan por ciertas deficiencias, sobre todo en el funcionamiento de los gobiernos.
					</p>

					<p>
						Ahora, Latinoamérica en términos de su puntaje regional general (6,09) es la región de mercados emergentes con mejor desempeño. Está mejor que Asia (5,62) y Europa del Este (5,36).
					</p>

					<p>
						La región está siendo arrastrada hacia abajo por los países donde hubo esas grandes regresiones: Venezuela, Nicaragua, Bolivia, etcétera.
					</p>

					<p>
						<strong>
							<i style="color: #a47a44;">
								Hay dos formas de ver las protestas recientes en América Latina. Una es pensar que la gente en la región está cansada de la democracia y de problemas como la corrupción, la inseguridad o la falta de buenos servicios públicos. Pero otros dicen que los latinoamericanos están exigiendo precisamente mejor democracia. ¿Qué opina?
							</i>
						</strong>
					</p>

					<p>
						Creo que es correcto decir que la gente reacciona de dos maneras. Una es desencantarse con la democracia y tal vez eso explique algo la proclividad en América Latina y Europa del Este por hombres fuertes o populistas, porque lo que tienen no está funcionando.
					</p>

					<p>
						Pero lo otro que creo que se expresa es una demanda de más y mejor democracia, mejor representación.
					</p>

					<p>
						Ese es el tipo de impulso subyacente detrás de estos movimientos. No quiere decir que sus líderes o sus políticas vayan a ser una solución al problema. Sin embargo, hay algo positivo en eso. Obviamente pueden ir en diferentes direcciones, una negativa y otra más positiva.
					</p>

					<p>
						Entonces el final es abierto. Y depende de las personas involucradas en esos movimientos y que luchan por la democracia que ganen el debate quienes tengan los mejores argumentos. (Fin)
					</p>

					<p>
						De acuerdo con la nota anterior, una gráfica que puede representar mejor el índice de democracia global del 2020 es el siguiente:
					</p>

				</section>

				<br>
				<img src="https://i.postimg.cc/2SNXvk42/10-CC-img3.png" alt="" class="tabla">
				<br>
				<br>

				<img src="https://i.postimg.cc/tJJ8rL0v/diana-ciudad.png">

				<ul class="menu_momento_introductivo">
					<li class="btn_foro"><span><a alt="Competencias Básicas" href=""></a></span></li>
					<li class="btn_maloka"><span><a alt="Competencias Socioemocionales" href=""></a></span></li>
				</ul>

				<img class="divicion_image" src="assets/images/fondos/Fondo_division_mod.png">

				<p>
					<strong>1.</strong>
					Con la orientación de tu profesor, consulta cuáles son las características de una democracia híbrida. Se propone la lectura del texto de C.B. Macpherson <strong> La democracia liberal y su época.</strong>
				</p>
				<p>
					<strong>2.</strong>
					Expón un ejemplo en el que los Estados hayan tomado decisiones que hayan vulnerado libertades individuales a raíz de la pandemia. Consulta con la orientación de tu profesor.
				</p>
				<p>
					<strong>3.</strong>
					Colombia fue un claro ejemplo en el que por temas de salud pública por la pandemia se obligó al confinamiento a los ciudadanos, pero, a su vez, algunos sectores en esta época convocaron a la movilización social. De este modo, se puso en conflicto dos derechos: el derecho a la salud (si tú te cuidas, cuidas a los demás) y el derecho a la protesta.
				</p>

				<p>
					<strong>a.</strong>
					¿Cuál derecho debería primar sobre el otro y por qué?
				</p>
				<p>
					<strong>b.</strong>
					Organicen un debate en el que un grupo defienda con todos los argumentos el derecho a la salud y otro grupo el derecho a la protesta.
				</p>
				<p>
					<strong>c.</strong>
					Si en tus manos estuviera la decisión definitiva sobre qué acciones tomar respecto a alguno de estos dos derechos, ¿qué decisión tomarías? Argumenta.
				</p>


			`,
        upload: false,
        id: 1,
      },
      {
        content: `

				<h2>
					Actividad 5.
				</h2>
				<img src="https://i.postimg.cc/tgbw01Qx/diana-ciudad.png" title="Recuerda, en esta actividad debes hacer un entregable.">
<ul class="menu_momento_introductivo">
 			<li class="btn_foro" title="Competencias Básicas"><span><a alt="Competencias Básicas" href=""></a></span></li>
 			<li class="btn_maloka" title="Competencias Socioemocionales"><span><a alt="Competencias Socioemocionales" href=""></a></span></li>
 			<li class="btn_perfil" title="Competencias Ciudadanas"><span><a alt="Competencias Ciudadanas" href=""></a></span></li>
 		</ul>
				<p>

					<strong>
						La tutela.
					</strong>
				</p>

				<p>
					¿Recuerdan el caso del niño que sufrió un hecho de discriminación por su estado de salud en Argentina? Pues bien, en ocasiones los mecanismos de participación no son suficientes para proteger y promover tanto los derechos fundamentales como los derechos humanos, característicos de una democracia como la nuestra. Frente a esto, en Colombia se implementó un mecanismo que ha sido un avance en términos democráticos para los ciudadanos y es la tutela. La Constitución Política lo estableció de la siguiente manera:
				</p>

				<section class="extract_content">
					<p>
						Toda persona tendrá acción de tutela para reclamar ante los jueces, en todo momento y lugar, mediante un procedimiento preferente y sumario, por sí misma o por quien actúe a su nombre, la protección inmediata de sus derechos constitucionales fundamentales, cuando quiera que éstos resulten vulnerados o amenazados por la acción o la omisión de cualquier autoridad pública. La protección consistirá en una orden para que aquél respecto de quien se solicita la tutela, actúe o se abstenga de hacerlo. El fallo, que será de inmediato cumplimiento, podrá impugnarse ante el juez competente y, en todo caso, éste lo remitirá a la Corte Constitucional para su eventual revisión. Esta acción sólo procederá cuando el afectado no disponga de otro medio de defensa judicial, salvo que aquélla se utilice como mecanismo transitorio para evitar un perjuicio irremediable. En ningún caso podrán transcurrir más de diez días entre la solicitud de tutela y su resolución. La ley establecerá los casos en los que la acción de tutela procede contra particulares encargados de la prestación de un servicio público o cuya conducta afecte grave y directamente el interés colectivo, o respecto de quienes el solicitante se halle en estado de subordinación o indefensión (CPC, artículo 86).
					</p>

					<p>
						En este orden, la tutela es procedente cuando se le vulneran los derechos fundamentales por parte de la autoridad pública o particulares (en el Titulo II de la Constitución Política podrás encontrar los derechos fundamentales) a cualquier ciudadano de Colombia. Por ello, es conocer nuestros derechos fundamentales y saber cuándo y cómo están siendo amenazados o vulnerados para que puedan ser restituidos mediante la tutela.
					</p>
				</section>

				<br>
					<img src="https://i.postimg.cc/tJJ8rL0v/diana-ciudad.png">
				<ul class="menu_momento_introductivo">
					<li class="btn_foro"><span><a alt="Competencias Básicas" href=""></a></span></li>
					<li class="btn_maloka"><span><a alt="Competencias Socioemocionales" href=""></a></span></li>
					<li class="btn_perfil"><span><a alt="Competencias Ciudadanas" href=""></a></span></li>
				</ul>


				<img class="divicion_image" src="assets/images/fondos/Fondo_division_mod.png">

				<p>
					A continuación, vamos a redactar entre todos, una acción de tutela, que permita reestablecer los derechos que le fueron vulnerados al niño que fué discriminado en Argentina, esto en el caso hipotético que haya sucedido en Colombia. Entre todos redactemos una acción de tutela que permita reestablecer los derechos vulneradores por el niño que fue discriminado, en el caso hipotético que haya sucedido en Colombia. Entre todos, ayudémosle a redactar una tutela completando el siguiente formato:
				</p>

				<section class="extract_content">

					<p>
						Señor <br>
						JUEZ_____________________(REPARTO) <br>
						Ciudad
					</p>

					REFERENCIA: SOLICITUD DE ACCIÓN DE TUTELA

					<p>
						Yo,  ___________________ , mayor de edad, vecino de esta ciudad, identificado con la cédula de ciudadanía cuyo número y lugar de expedición aparece al pie de mi correspondiente firma, residente en _________________ municipio de ________________, actuando en nombre propio (o en representación de), acudo respetuosamente ante su Despacho para promover ACCIÓN DE TUTELA, de conformidad con el artículo 86 de la Constitución Política y los Decretos Reglamentarios 2591 de 1.991 y 1382 de 2.000, para que judicialmente se me (le) conceda la protección de los derechos constitucionales fundamentales que considero vulnerados y/o amenazados por las acciones y/o omisiones de la autoridad pública (o el particular, según el caso) que mencioné en la referencia de este escrito. Fundamento mi petición en los siguientes:
					</p>

					HECHOS

					<p>
						(Detalle en este espacio de manera clara y completa los hechos sucedidos, derechos vulnerados y/o amenazados. Amplíe los hechos de manera hipotética)
					</p>

					<p>
						<strong>
						1.	______________________________________________________________
							______________________________________________________________
							______________________________________________________________
						</strong>
					</p>
					<p>
						<strong>
						2.	______________________________________________________________
							______________________________________________________________
							______________________________________________________________
						</strong>
					</p>

						PETICIÓN

						<p>
							Con fundamento en los hechos narrados y en las consideraciones expuestas, respetuosamente solicito al señor Juez TUTELAR a mi favor los derechos constitucionales fundamentales invocados ORDENÁNDOLE a la autoridad accionada que (detalle en este espacio la orden que pretende que el Juez declare para la protección de sus derechos)
						</p>

						<p>
						<strong>
						1.	______________________________________________________________
							______________________________________________________________
							______________________________________________________________
						</strong>
					</p>
					<p>
						<strong>
						2.	______________________________________________________________
							______________________________________________________________
							______________________________________________________________
						</strong>
					</p>

					MEDIOS DE PRUEBAS

					<p>
						(Relacione en este espacio los documentos o pruebas sumarias que pretende hacer valer y quiere aportar para la defensa de sus derechos fundamentales vulnerados).
					</p>

					JURAMENTO

					<p>
						Bajo la gravedad del juramento manifiesto que, por los mismos hechos y derechos, no he presentado petición similar ante ninguna autoridad judicial.

					</p>

					NOTIFICACIONES
					<p>
						Las mías las recibiré en la secretaria de su Despacho o ____________________________________________________________ Teléfono________________
					</p>

					<p>
						El Accionado en la _____________________________________________________________ Teléfono________________
					</p>

					<p>
						Ruégole, señor Juez, ordenar el trámite de ley para esta petición.
					</p>

					<p>
						Del señor Juez
					</p>

					<p>
						Firma _______________________
					</p>

					<p>
						NOMBRE ______________________
					</p>

					<p>
C.C._____________ DE___________
					</p>


					<p>
						DIRECCIÓN: _______________________
					</p>

					<p>

						CORREO ELECTRÓNICO:   _______________________
					</p>

					<p>
TELÉFONOS DE CONTACTO:    _______________________
					</p>

				</section>




			`,
        upload: true,
        phase: 1,
        id: 1,
      },
      {
        content: `

				<h1>
					Fase Postactiva o de Interacción.
				</h1>

				<p>
					Construyamos en grupo una iniciativa mediante un mecanismo de participación ciudadana:
				</p>

				<img class="divicion_image" src="assets/images/fondos/Fondo_division_mod.png">
				<br>
				<img src="https://i.postimg.cc/tJJ8rL0v/diana-ciudad.png">
				<ul class="menu_momento_introductivo">
					<li class="btn_foro"><span><a alt="Competencias Básicas" href=""></a></span></li>
					<li class="btn_maloka"><span><a alt="Competencias Socioemocionales" href=""></a></span>
					</li>
					<li class="btn_perfil"><span><a alt="Competencias Ciudadanas" href=""></a></span></li>
				</ul>

				<br>
				<h2>
					Actividad 6
				</h2>
<img src="https://i.postimg.cc/tgbw01Qx/diana-ciudad.png" title="Recuerda, en esta actividad debes hacer un entregable.">
<ul class="menu_momento_introductivo">
 			<li class="btn_foro" title="Competencias Básicas"><span><a alt="Competencias Básicas" href=""></a></span></li>

 			<li class="btn_perfil" title="Competencias Ciudadanas"><span><a alt="Competencias Ciudadanas" href=""></a></span></li>
 		</ul>
				<p>
					Con la orientación del docente, lo primero que vamos a hacer es identificar un problema que exista en nuestro territorio departamental, con base a ello, vamos a proponer una iniciativa de participación ciudadana que tenga como finalidad resolver un problema del territorio y la comunidad. Para lo anterior, se sugiere seguir las siguientes indicaciones:
				</p>


				<p>
					<strong>
					1. Definición del problema:
					</strong>
					es el análisis y diagnóstico del territorio. La idea es resolver un (1) problema, que exista en nuestro territorio, así existan otros más y con ello, brindar una posíble solución. Para ello, se propone que, con la orientación del profesor, se realice lluvia de ideas y debates que permitan identificar el problema base que se desea resolver en la comunidad y territorio.
				</p>

				<p>
					Teniendo identificado el problema, es importante realizar el “árbol de problemas”. Para ello, es didáctico realizarlo de acuerdo con la siguiente gráfica:
				</p>

				<br>
				<img src="https://i.postimg.cc/FH08nd9M/10-CC-img5.png" alt="" class="tabla">
				<br>

				<p>
					<strong>
						2.	Posible solución:
					</strong>
					con el árbol de problemas, conociendo las causas y efectos que podría tener, es necesario identificar la posible solución del problema mediante un árbol de objetivos. En él se puede identificar lo siguiente:
				</p>
				<p>
					<strong>
						a.	Fines o resultados:
					</strong>
					el propósito final del proyecto que no es otra cosa que resolver un problema específico de la comunidad. Aquí se debe identificar todos los fines o resultados que se esperan lograr con la solución del problema.
				</p>
				<p>
					<strong>
						b.	Solución:
					</strong>
					es la acción principal y central que eligieron para la solución del problema identificado.
				</p>
				<p>
					<strong>
						c.	Medios:
					</strong>
					es identificar cuáles son los medios o instrumentos que se necesitan para solución del problema y que aportan a los fines y resultados.
				</p>
				<p>
					<strong>
						d.
					</strong>
					Esta parte se puede realizar a partir de la siguiente imagen que tiene un buen ejemplo:
				</p>
				<br>
				<img src="https://i.postimg.cc/WbBxn6Pm/10-CC-img6.png" alt="">
				<br>

				<p>
					Ahora bien, si ya hemos realizado tanto el árbol de problemas como el de objetivos; se procede a buscar, realizar y luego ejecutar una iniciativa de participación ciudadana que, para el caso expuesto, se podría resolver realizando un cabildo abierto (si desean, con la orientación de su profesor, se puede hacer otro tipo de mecanismo, como, por ejemplo, un proyecto legislativo).
				</p>

				<p>
					Te recordamos que un cabildo abierto “…es la reunión pública del concejo distrital, municipal o juntas administradoras locales, en la cual hay participación de los habitantes para discutir libremente de manera directa y pública acerca de los asuntos de interés de la comunidad” (Instituto Distrital de la participación y acción comunal, 2017).
				</p>

				<p>
					Para organizar el cabildo abierto, se sugiere tener un documento organizado en el que se exponga claramente el árbol de problemas y de objetivos que anteriormente trabajaron con la orientación de su profesor. Se sugiere el siguiente orden:
				</p>

				<p>
					<strong>
						a.
					</strong>
					Nombre del debate o tema que se va a exponer en el cabildo abierto.
				</p>
				<p>
					<strong>
						b.
					</strong>
					Incluir el árbol de problemas y de objetivos en el documento (los diagramas).
				</p>
				<p>
					<strong>
						c.
					</strong>
					Objetivos:
					</p><p style="margin-left: 20px; margin-top: -10px;">
						<strong>
							i.
						</strong>
						General: es la solución del árbol de objetivos. <br>
						<strong>
							ii.
						</strong>
						Específicos: son los medios del árbol de objetivos.
					</p>
				<p></p>
				<p>
					<strong>
						d.
					</strong>
					Justificación: en esta fase se debe argumentar sobre la importancia de generar un cabildo abierto para discutir sobre una de las problemáticas de nuestra comunidad. Se debe exponer, además, por qué es importante solucionar este problema y quiénes se van a beneficiar con el proyecto.
				</p>
				<p>
					<strong>
						e.
					</strong>
					Resultados esperados: ¿qué esperan conseguir con el cabildo abierto? ¿Cuál es la propuesta que quieren presentar al gobernante de su territorio?
				</p>
				<p>
					<strong>
						f.
					</strong>
					Actividades y responsables: desarrollar un cronograma y definir los responsables de cada paso para lograr realizar el cabildo abierto.
				</p>

				<p>
					Para mayor información de los pasos y requerimientos para hacer un cabildo abierto, pueden seguir el siguiente enlace de la Registraduría Nacional del Estado Civil:
					<a href="https://www.registraduria.gov.co/-Cabildo-Abierto,3756-.html">https://www.registraduria.gov.co/-Cabildo-Abierto,3756-.html </a>
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
	 		<h1>
	 			FASE PREACTIVA O DE EXPLORACIÓN DE SABERES PREVIOS
	 		</h1>
	 		<img class="divicion_image" src="assets/images/fondos/Fondo_division_mod.png">
	 		<ul class="menu_momento_introductivo">
	 			<li class="btn_foro"><span><a alt="Competencias Básicas" href=""></a></span></li>
	 		</ul>

	 		<h2>
	 			Actividad 1.
	 		</h2>
<img src="https://i.postimg.cc/tgbw01Qx/diana-ciudad.png" title="Recuerda, en esta actividad debes hacer un entregable.">
<ul class="menu_momento_introductivo">
 			<li class="btn_foro" title="Competencias Básicas"><span><a alt="Competencias Básicas" href=""></a></span></li>

 			<li class="btn_perfil" title="Competencias Ciudadanas"><span><a alt="Competencias Ciudadanas" href=""></a></span></li>
 		</ul>
	 		<p>
	 			<strong>
	 				Un debate sobre la construcción del Puerto de Tribugá
	 			</strong>
	 		</p>

	 		<p>
	 			A continuación, vas a encontrar dos posturas sobre la construcción del Puerto de Tribugá en el departamento del Chocó. Te invito a leerlos y al final responder algunas preguntas:
	 		</p>

	 		<p>
	 			<strong>
	 				Postura 1:
	 			</strong>
	 		</p>
	 		<section class="extract_content">
	 			<p>
	 				“Desde hace décadas se viene explorando la posibilidad de la construcción del Puerto de Tribugá, un proyecto que actualmente tiene en la mira al municipio de Nuquí, perteneciente al departamento del Chocó, lugar donde se desarrollaría esta mega obra, que no solo obedece a un puerto de aguas profundas, sino a un paquete de obras que le cambiaría no solo la cara a la región, sino a todo un país.
	 			</p>

	 			<p>
	 				Para la Junta Directiva del ente cameral, con este proyecto, que se desarrollará por primera vez en el país, bajo el concepto de “Ciudad Puerto” no sólo se brindarán alternativas económicas adicionales para la población, sino que se potencializarán los sectores turístico, pesquero y agrícola, actual base de la subsistencia de la población Nuquiseña, que tanto se ha visto afectada por los bajos ingresos económicos en temporadas bajas, las cuales corresponden, a casi el 75% del año. Adicionalmente, alrededor del Puerto se desarrollarán diferentes Zonas Francas, a saber: Portuaria, Multiempresarial, la zona de equipamientos de servicios públicos y otros desarrollos de infraestructura industrial y logística, orientados a facilitar al sector empresarial regional y nacional, la comercialización de bienes y servicios con destino a los mercados del Pacífico. El proyecto fortalecerá los 3 renglones económicos de Nuquí: turístico, agrícola y pesquero. Se propiciará la construcción de infraestructura turística (incluye muelle), ofrecerá una cadena de frío a los pescadores para su pos cosecha, se tendrán instalaciones en la Zona Franca para darle valor agregado a los productos de la pesca con visión exportadora, así como a productos agrícolas.
	 			</p>

	 			<p>
	 				Por otro lado, los empleos directos del Puerto, el tren y la vía serán de aproximadamente 3.400 puestos de trabajo entre Supervisores, Auxiliares, Técnicos, Operarios, Especialistas, y 10.200 empleos indirectos. Del mismo modo, la Zona Franca multiempresarial tanto en Nuquí como en Quibdó, generará alrededor de 500 empleos directos y 1.500 empleos indirectos en sectores agroindustriales de exportación, madera, frigoríficos porcícolas y avícolas, logística, transporte, bodegas, entre otros; además, propiciará el establecimiento de empresas de servicios públicos de aseo, disposición final, energía, y otros servicios propios de una ciudad puerto […]”.
	 			</p>
	 			<p>
	 				Fuente: Cámara de Comercio del Chocó (sf). Puerto de Tribugá: sostenibilidad ambiental y desarrollo económico, no son expresiones antagónicas sino compatibles.
	 				<a href="https://www.camarachoco.org.co/noticias/puerto-de-tribuga-sostenibilidad-ambiental-y-desarrollo-economico-no-son-expresiones-antagonicas-sino-compatibles
	 			" target="_blank" rel="noopener noreferrer">https://www.camarachoco.org.co/noticias/puerto-de-tribuga-sostenibilidad-ambiental-y-desarrollo-economico-no-son-expresiones-antagonicas-sino-compatibles
	 			</a>
	 		</p>
	 		</section>
	 		<p>
	 			<strong>
	 				Postura 2:
	 			</strong>
	 		</p>
	 		<section class="extract_content">
	 			<p>
	 				Catalina Ortiz, Representante a la Cámara por el partido Verde advierte "de graves daños ambientales" si se construye el Puerto de Tribugá en el Chocó, tal como se aprobó en el Plan Nacional de Desarrollo.
	 			</p>

	 			<p>
	 			"Varios partidos políticos hemos fijado nuestra posición en contra de que se construya Puerto Tribugá, un puerto planeado de aguas profundas en el norte del Pacífico, concretamente en Chocó. Para hacer esta obra, es necesario hacer una carretera en medio de la selva pasando por la Serranía del Baudó, habría que destruir la mitad del manglar de Chocó y acabar con la visita de 1.500 ballenas al año", aseguró.
	 			</p>

	 			<p>
	 				Para Ortiz, el país no necesita la construcción de este puerto, dada que "es mucho más eficiente invertir en el puerto actual de Buenaventura, incluso en los demás puertos que tiene Colombia que hacer uno nuevo".
	 			</p>
	 			<p>
	 				La representante a la Cámara aseguró que el argumento del Gobierno estuvo en que el país necesita construir ese puerto.
	 			</p>
	 			<p>
	 				"Son argumentos muy pobres porque la capacidad instalada de los puertos en Colombia es de 440 millones de toneladas y no la estamos usando en su totalidad. Buenaventura solo usa el 75% de la capacidad instalada, por ejemplo", indicó.
	 			</p>

	 			<p>
	 				Las carreteras que pretende construir el Gobierno para realizar el puerto, conectarían al municipio de Las Ánimas en Chocó con Pereira y Las Ánimas hasta Nuquí.

	 		"Es una carretera con un enorme impacto ambiental que además tiene un enorme costo económico. No entiendo cuál es el capricho del Gobierno en construir este puerto", indicó.

	 			</p>
	 			<p>
	 				Morales C. (02 Mayo 2019). RCN Radio. Advierten grave daño ambiental si se construye Puerto Tribugá (Chocó). Fuente: Cámara de Comercio del Chocó (sf). Puerto de Tribugá: sostenibilidad ambiental y desarrollo económico, no son expresiones antagónicas sino compatibles.
	 				<a href="https://www.rcnradio.com/colombia/pacifico/advierten-grave-dano-ambiental-si-se-construye-puerto-tribuga-choco" target="_blank" rel="noopener noreferrer">https://www.rcnradio.com/colombia/pacifico/advierten-grave-dano-ambiental-si-se-construye-puerto-tribuga-choco
	 			</a></p>
	 		</section>


	 	</section>
		 `,
        upload: false,
        id: 1,
      },
      {
        content: `
	 		<img src="https://i.postimg.cc/tJJ8rL0v/diana-ciudad.png">

	 		<ul class="menu_momento_introductivo">
	 			<li class="btn_foro"><span><a alt="Competencias Básicas" href=""></a></span></li>
	 			<li class="btn_foro"><span><a alt="Competencias Básicas" href=""></a></span></li>
	 			<li class="btn_foro"><span><a alt="Competencias Básicas" href=""></a></span></li>
	 		</ul>

	 		<img class="divicion_image" src="assets/images/fondos/Fondo_division_mod.png">
	 		<h2>Actividad 2.</h2>
<img src="https://i.postimg.cc/tgbw01Qx/diana-ciudad.png" title="Recuerda, en esta actividad debes hacer un entregable.">
<ul class="menu_momento_introductivo">
 			<li class="btn_foro" title="Competencias Básicas"><span><a alt="Competencias Básicas" href=""></a></span></li>
 			<li class="btn_maloka" title="Competencias Socioemocionales"><span><a alt="Competencias Socioemocionales" href=""></a></span></li>
 			<li class="btn_perfil" title="Competencias Ciudadanas"><span><a alt="Competencias Ciudadanas" href=""></a></span></li>
 		</ul>
	 		<p><strong>
	 			Preguntas para debatir en grupo
	 		</strong></p>

	 		<p>
	 			Con la orientación del profesor, es importante resolver las preguntas que se formulan a continuación. La clave del siguiente ejercicio es que se pueda identificar el conflicto, los actores que se verían afectados y las posibles alternativas de solución que favorezcan finalmente, a los intereses generales. No obstante, antes de responder a la pregunta número 4, se ve la necesidad que, frente a las dos posturas diametralmente opuestas en sus determinaciones, se consulte otro tipo de informaciones de carácter investigativos (artículos académicos o de investigación, estudios de técnicos, tesis de grado, blogs, entre otros) que permitan tomar decisiones basados en ellos y no exclusivamente sobre las dos informaciones de las lecturas que están en el presente módulo.
	 		</p>
	 		<p>
	 			<span class="bold_">1.</span>
	 			Identifiquen, de cada postura, los principales argumentos utilizados por los actores.
	 		</p>

	 		<p>
	 			<span class="bold_">2.</span>
	 			¿Cuál es el conflicto que se identifican en estas dos posturas?
	 		</p>

	 		<p>
	 			<span class="bold_">3.</span>
	 			Enumeren y justifiquen qué actores pueden hacer parte o verse afectados por cualquiera de las decisiones que se puedan tomar sobre la construcción del puerto.
	 		</p>

	 		<p>
	 			<span class="bold_">4.</span>
	 			Si ustedes fueran los actores que tuvieran que tomar decisiones, ¿qué decisión tomarían? Para la discusión de esta pregunta es necesario tener en cuenta las discusiones de las preguntas anteriores:
	 		</p>
	 		<p>
	 			<span class="bold_">a.</span>
	 			Los argumentos del otro.
	 		</p>
	 		<p>
	 			<span class="bold_">b.</span>
	 			¿Qué tipo de conflictos de intereses, podrían entrar dentro de la construcción del puerto?
	 		</p>
	 		<p>
	 			<span class="bold_">c.</span>
	 			¿Qué actores podrían verse afectados?
	 		</p>
	 		<p>
	 			<span class="bold_">d.</span>
	 			¿Cuál sería el mejor camino para solucionar el conflicto de intereses?
	 		</p>

	 		<p>
	 			<span class="bold_">5.</span>
	 			¿Consideran que la construcción o no construcción del puerto estaría vulnerando algunos derechos fundamentales de las comunidades asentadas en el departamento del Chocó? Respondan con lluvias de ideas del grupo con ayuda de la siguiente tabla:	¿Consideran que la construcción o no construcción del puerto estaría vulnerando algunos derechos fundamentales de las comunidades asentadas en el departamento del Chocó? Realicen una lluvia de ideas entre todos los integrantes del grupo, con ayuda de la siguiente tabla:
	 		</p>
	 		<br>
	 		<img src="https://i.postimg.cc/SRXtLjTt/11-CC-tabla1.png" alt="		" class="tabla">
	 		<br>

	 		<p>
	 			<span class="bold_">6.</span>
	 			De acuerdo con la tabla que resolvieron, ¿cuáles derechos tienen mayor peso o prioridad sobre los otros? Indiquen ¿por qué creen que son esos derechos los prioritarios y escriban su argumento?
	 		</p>

	 		<p>
	 			<strong>
	 				Sopa de letras sobre Estado social de derecho.
	 			</strong>
	 		</p>

	 		<p>
	 			A través de la siguiente sopa de letras, van a identificar los conceptos fundamentales relacionados con el Estado Social de Derecho para entender mejor este importante concepto que es fundamental para comprender la democracia colombiana y su modelo de Estado. Las palabras a encontrar son las siguientes:
	 		</p>
	 		<br>
	 		<img src="https://i.postimg.cc/9QPgY6bV/11-CC-tabla2.png" alt="" class="tabla">
	 		<br>
	 		<br>
	 		<img src="https://i.postimg.cc/T2Ssdqh8/11-CC-Sopa-Letras.png" alt="" class="tabla">

	 		<p>
	 			<strong>
	 				Preconceptos
	 			</strong>
	 		</p>

	 		<p>
	 		En subgrupos, inferir su definición sin acudir a diccionarios. Luego, mediante un ejercicio grupal, se compartirán las definiciones y entre todos, con orientación del docente, se llegará a la definición de los conceptos.
	 		</p>

	 		<ol style="text-align: start; list-style: lower-alpha;">
	 			<li>
	 				<p>
	 					Estado
	 				</p>
	 			</li>
	 			<li>
	 				<p>
	 					Derecho
	 				</p>

	 			</li>
	 			<li>
	 				<p>

	 					Constitución
	 				</p>

	 			</li>
	 			<li>
	 				<p>

	 					Ciudadanía
	 				</p>

	 			</li>
	 			<li>
	 				<p>
	 					Dignidad humana

	 				</p>

	 			</li>
	 			<li>
	 				<p>

	 					República
	 				</p>

	 			</li>
	 			<li>
	 				<p>
	 					Pluralismo
	 				</p>

	 			</li>
	 			<li>
	 				<p>
	 					Derechos culturales
	 				</p>
	 			</li>
	 			<li>
	 				<p>
	 					Derechos sociales
	 				</p>

	 			</li>
	 			<li>
	 				<p>
	 					Derechos económicos
	 				</p>

	 			</li>
	 			<li>
	 				<p>
	 					Derechos fundamentales
	 				</p>
	 			</li>
	 			<li>
	 				<p>
	 					Derechos colectivos
	 				</p>

	 			</li>
	 			<li>
	 				<p>
	 					Derechos ambientales.
	 				</p>
	 			</li>
	 		</ol>


	 	</section>
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
	 		<h2>Actividad 3</h2>
<img src="https://i.postimg.cc/tgbw01Qx/diana-ciudad.png" title="Recuerda, en esta actividad debes hacer un entregable.">
<ul class="menu_momento_introductivo">

 			<li class="btn_perfil" title="Competencias Ciudadanas"><span><a alt="Competencias Ciudadanas" href=""></a></span></li>
 		</ul>
	 		<p>
	 			<strong>
	 				El Estado Social de Derecho
	 			</strong>
	 		</p>

	 		<p>
	 			Características del Estado Social de Derecho:
	 		</p>

	 		<section class="extract_content">
	 			<p>
	 			<strong>
	 				a.
	 			</strong>
	 			El Estado Social de Derecho es una forma de ponerle límites al poder de quienes nos gobiernan. El límite del poder es el derecho que, no es otra cosa, que nuestra Constitución Política. No obstante, esa no es la única función del Estado. Además de poner límites al poder del Estado – para evitar cualquier tipo de arbitrariedad o acciones despóticas contra la ciudadanía – el Estado debe proteger y garantizar los derechos fundamentales y los derechos humanos, además, también promoverlos con políticas públicas enfocadas en construir unas nuevas relaciones con el ambiente bajo unos principios de justicia y equidad, y unos valores políticos fundamentales como la protección de la vida, la prevalencia del interés general sobre el particular,  la cooperación, la protección de las  riquezas culturales y naturales, la dignidad humana y la participación ciudadana
	 		</p>

	 		<p>
	 			<strong>
	 				b.
	 			</strong>
	 			Con el Estado Social de Derecho se garantiza que todos los ciudadanos y las ramas del poder público (legislativo, ejecutivo y judicial) estén supeditados a la norma de normas, es decir, a la Constitución Política.
	 		</p>

	 		<p>
	 			<strong>
	 				c.
	 			</strong>
	 			En el Estado Social de Derecho, la función del Estado no solo es proteger sino también promover los derechos económicos, sociales, culturales, colectivos y del ambiente consagrados en la constitución.
	 		</p>

	 		<p>
	 			<strong>
	 				d.
	 			</strong>
	 			El Estado Social de Derecho se entiende como un sistema en la cual la sociedad participa activamente en la recepción de bienes y servicios y en la formación de la voluntad general del Estado mediante la formulación de políticas distributivas y otras prestaciones estatales.
	 		</p>

	 		<p>
	 			<strong>
	 				e.
	 			</strong>
	 			El fin, con el Estados Social de Derecho, es que los ciudadanos cuenten con los mínimos vitales que les permita ejercer sus libertades públicas.
	 		</p>

	 		<p>
	 			<strong>
	 				f.
	 			</strong>
	 			En el Estado Social de Derecho, lo social es el establecimiento de la oportunidad de libre desarrollo del ciudadano en la sociedad.
	 		</p>

	 		<p>
	 			<strong>
	 				El Estado Social de Derecho en Colombia
	 			</strong>
	 		</p>

	 		<p>
	 			El artículo 1 de la Constitución Política de Colombia dice lo siguiente: “Colombia es un Estado social de derecho, organizado en forma de República unitaria, descentralizada, con autonomía de sus entidades territoriales, democrática, participativa y pluralista, fundada en el respeto de la dignidad humana, en el trabajo y la solidaridad de las personas que la integran y en la prevalencia del interés general”.
	 		</p>

	 		<p>
	 			Como se puede leer en el artículo 1, el respeto a la dignidad humana está en el centro del Estado Social de Derecho en Colombia. Por lo tanto, cualquier acción u omisión por parte del Estado, individuos u organizaciones que desprecie o atente contra la dignidad humana es una afrenta contra el Estado Social de Derecho y, por ende, contra los derechos fundamentales y los derechos humanos.
	 		</p>
	 	</section>

	 	<img src="https://i.postimg.cc/tJJ8rL0v/diana-ciudad.png">

	 	<ul class="menu_momento_introductivo">
	 			<li class="btn_foro"><span><a alt="Competencias Básicas" href=""></a></span></li>
	 			<li class="btn_foro"><span><a alt="Competencias Básicas" href=""></a></span></li>
	 		</ul>

	 		<img class="divicion_image" src="assets/images/fondos/Fondo_division_mod.png">

	 		<p>
	 			<strong>
	 				Taller:
	 			</strong>
	 			para poner en contexto la importancia del Estado Social de Derecho, se propone leer y luego discutir la siguiente Sentencia de la Corte Constitucional. Pero antes de eso, se les invita que, con orientación del docente, consulten dos cosas importantes:
	 		</p>

	 		<p>
	 			<strong>
	 				1.
	 			</strong>
	 			¿Qué es y cuál es la función de la Corte Constitucional en Colombia?
	 		</p>

	 		<p>
	 			<strong>
	 				2.
	 			</strong>
	 			¿Cuál es la finalidad de las Sentencias de la Corte Constitucional?
	 		</p>

	 		<p>
	 			A continuación, se propone leer la Sentencia de Tutela T-154/13 sobre la protección de derechos colectivos ( <a href="https://www.corteconstitucional.gov.co/relatoria/2013/T-154-13.htm" target="_blank" rel="noopener noreferrer">https://www.corteconstitucional.gov.co/relatoria/2013/T-154-13.htm</a> ) y sobre eso trabajar un taller-proyecto grupal.
	 		</p>

	 		<p>
	 			<strong>
	 				Preguntas
	 			</strong>
	 		</p>
	 		<p>
	 			<strong>
	 				1.
	 			</strong>
	 			¿Qué tipo de derechos fundamentales se están analizando en la Sentencia?
	 		</p>

	 		<p>
	 			<strong>
	 				2.
	 			</strong>
	 			¿Identifiquen el conflicto que se describe en la Sentencia
	 		</p>

	 		<p>
	 			En la Sentencia el Magistrado utiliza una serie de argumentos para basar su decisión del fallo. De una manera sintética y en subgrupos, debatan y expongan los argumentos jurídicos, éticos e históricos-sociológicos completando la siguiente matriz (cada idea entre dos y tres líneas) para que después se puedan socializar en el grupo:
	 		</p>
	 		<br>
	 		<img src="https://i.postimg.cc/Vv3ZK12s/11-CC-tabla3.png" alt="" class="tabla">
	 		<br>

	 		<p>
	 			Posterior a ello, cada grupo socializará un solo ámbito de la matriz.
	 		</p>

	 		<p>
	 			La siguiente actividad permite conocer casos muy específicos en el que se vulnera uno de los derechos fundamentales en Colombia que es el de la salud. Pero antes de revisar la siguiente infografía, con orientación del docente, consulte:
	 		</p>

	 			<p>
	 			<strong>
	 				a.
	 			</strong>
	 			¿Qué es una tutela y cuál es su función?
	 		</p>

	 		<p>
	 			<strong>
	 				b.
	 			</strong>
	 			¿Cuándo es necesario interponer una tutela y cuándo no es procedente?
	 		</p>

	 		<p>
	 			Después de consultar y discutir sobre la tutela, lean detenidamente la siguiente infografía y respondan a las siguientes preguntas:
	 		</p>
	 		<br>
	 		<img src="https://i.postimg.cc/xd3rqkhv/c-ciudadanas11-2x.png" alt="" class="tabla">

	 		<p>
	 			<strong>
	 				a.
	 			</strong>
	 			En un párrafo (texto escrito) describir la infografía.
	 		</p>

	 		<p>
	 			<strong>
	 				b.
	 			</strong>
	 			¿Qué relación tendría el alto porcentaje de tutelas sobre la salud con la vulneración al Estado Social de Derecho?
	 		</p>
	 		<p>
	 			<strong>
	 				c.
	 			</strong>
	 			¿Escriban una hipótesis sobre el fenómeno del porqué existe más porcentaje de tutelas sobre la salud en el sexo femenino que en el sexo masculino?
	 		</p>
	 		<p>
	 			<strong>
	 				d.
	 			</strong>
	 			¿Cómo se explica que haya más tutelas en departamentos (Antioquia, por ejemplo) y ciudades (Bogotá, por ejemplo) con una red hospitalaria estable que en otras partes periféricas del país?
	 		</p>


	 	</section>
		 `,
        upload: false,
        id: 1,
      },
      {
        content: `
	 		<h2>
	 			Actividad 4.
	 		</h2>
<img src="https://i.postimg.cc/tgbw01Qx/diana-ciudad.png" title="Recuerda, en esta actividad debes hacer un entregable.">
<ul class="menu_momento_introductivo">

 			<li class="btn_perfil" title="Competencias Ciudadanas"><span><a alt="Competencias Ciudadanas" href=""></a></span></li>
 		</ul>
	 		<p>
	 			Luego de haber debatido mediante los talleres la importancia de saber y conocer sobre el Estado Social de Derecho, ahora revisen su relación que existe con una de las características fundamentales de nuestro país: su diversidad y pluralidad.
	 		</p>

	 		<p>
	 			<strong>
	 				El Estado social de derecho frente a la diversidad y pluralidad: una forma de construcción de la paz.
	 			</strong>
	 		</p>

	 		<p>
	 			Es importante que logremos distinguir algunos conceptos fundamentales sobre la temática. Para ellos, vamos hacerlo de manera más interactiva.
	 		</p>

	 		<img src="https://i.postimg.cc/tJJ8rL0v/diana-ciudad.png">

	 		<ul class="menu_momento_introductivo">
	 			<li class="btn_foro"><span><a alt="Competencias Básicas" href=""></a></span></li>
	 			<li class="btn_maloka"><span><a alt="Competencias Socioemocionales" href=""></a></span></li>
	 			<li class="btn_maloka"><span><a alt="Competencias Socioemocionales" href=""></a></span></li>
	 		</ul>

	 		<img class="divicion_image" src="assets/images/fondos/Fondo_division_mod.png">

	 		<p>
	 		A continuación, van a encontrar una tabla con dos columnas. Relacionen el concepto de la columna A con la definición correcta de la columna B escribiendo el número que corresponda en el paréntesis:
	 		</p>
	 		<br>
	 		<img src="https://i.postimg.cc/0N8WWVXS/11-CC-tabla4.png" alt="" class="tabla">

	 		<p>
	 			Para verificar que hubo una buena relación entre el concepto y la definición, resuelvan el siguiente crucigrama haciendo uso de los conceptos de la columna A de la tabla anterior:
	 		</p>
	 		<br>
	 		<img src="https://i.postimg.cc/LXQbZjT1/11-CC-crucigrama.png" alt="" class="tabla">
	 		<br><br>
	 		<img src="https://i.postimg.cc/q7jm92W5/11-CC-tabla5.png" alt="" class="tabla">


	 	</section>
		 `,
        upload: true,
        phase: 1,
        id: 1,
      },
      {
        content: `

	 		<img src="https://i.postimg.cc/tJJ8rL0v/diana-ciudad.png">

	 		<ul class="menu_momento_introductivo">
	 			<li class="btn_foro"><span><a alt="Competencias Básicas" href=""></a></span></li>
	 			<li class="btn_maloka"><span><a alt="Competencias Socioemocionales" href=""></a></span></li>
	 		</ul>

	 		<img class="divicion_image" src="assets/images/fondos/Fondo_division_mod.png">

	 		<h2>
	 			Actividad 5.
	 		</h2>
	 		<img src="https://i.postimg.cc/tgbw01Qx/diana-ciudad.png" title="Recuerda, en esta actividad debes hacer un entregable.">
<ul class="menu_momento_introductivo">
 			<li class="btn_foro" title="Competencias Básicas"><span><a alt="Competencias Básicas" href=""></a></span></li>
 			<li class="btn_maloka" title="Competencias Socioemocionales"><span><a alt="Competencias Socioemocionales" href=""></a></span></li>
 			<li class="btn_perfil" title="Competencias Ciudadanas"><span><a alt="Competencias Ciudadanas" href=""></a></span></li>
 		</ul>
	 		<p>
	 			De acuerdo con lo anterior, ¿consideran que en sus territorios existen algunas formas de pluralidad, multiculturalidad e interculturalidad, pero también de discriminación? Argumenten cada una de ellas exponiéndolos con ejemplo de sus entornos sociales y culturales:
	 		</p>

	 		<p>
	 			Pluralidad: ________________________________________________________________
	 		</p>

	 		<p>
	 			Multiculturalidad: ________________________________________________________________
	 		</p>

	 		<p>
	 			Interculturalidad: ________________________________________________________________
	 		</p>

	 		<p>
	 			Discriminación: ________________________________________________________________
	 		</p>

	 		<p>
	 			<strong>
	 				Qué dice la ley sobre el respeto a la diversidad y la pluralidad
	 			</strong>
	 		</p>

	 		<section class="extract_content">
	 			<p>
	 				Desde el ámbito constitucional, la diversidad y la pluralidad están siendo protegidas jurídicamente ya que se entienden como derechos fundamentales compatibles con los derechos humanos. Esto lo afirman los dos siguientes artículos de la Constitución Política de Colombia:
	 			</p>

	 			<p>
	 				<span class="icon_objetivos"></span>
	 				“…el Estado reconoce y protege la diversidad étnica y cultural de la Nación colombiana” (CPC, 1991, Art. 7).
	 			</p>
	 			<p>
	 				<span class="icon_objetivos"></span>
	 				“todas las personas nacen libres e iguales ante la ley, recibirán la misma protección y trato de las autoridades y gozarán de los mismos derechos, libertades y oportunidades sin ninguna discriminación por razones de sexo, raza, origen nacional o familiar, lengua, religión, opinión política o filosófica (CPC, 1991, Art. 13).
	 			</p>

	 			<p>
	 				Del mismo modo, como lo expresa Gutiérrez (2011), la Corte Constitucional se ha pronunciado: el multiculturalismo ha empezado a construirse por la Corte Constitucional con base en dos premisas: maximización de la diversidad étnica y cultural y minimización de restricciones bajo las siguientes fórmulas:
	 			</p>

	 			<p>
	 				<strong>a.</strong>
	 				A mayor conservación de usos y costumbres, mayor autonomía.
	 			</p>
	 			<p>
	 				<strong>b.</strong>
	 				El núcleo esencial de los derechos fundamentales constitucionales constituye el mínimo obligatorio de convivencia para todos los particulares.
	 			</p>
	 		</section>

	 		<br>
	 			<img src="https://i.postimg.cc/tJJ8rL0v/diana-ciudad.png">
	 		<ul class="menu_momento_introductivo">
	 			<li class="btn_foro"><span><a alt="Competencias Básicas" href=""></a></span></li>
	 			<li class="btn_maloka"><span><a alt="Competencias Socioemocionales" href=""></a></span></li>
	 			<li class="btn_perfil"><span><a alt="Competencias Ciudadanas" href=""></a></span></li>
	 		</ul>

	 		<img class="divicion_image" src="assets/images/fondos/Fondo_division_mod.png">

	 		<p>
	 			<strong>
	 				Cómo contribuir a promover la paz promoviendo la diversidad y pluralidad: una cartografía social de nuestro territorio.
	 			</strong>
	 		</p>

	 		<section class="extract_content">
	 			<p>
	 				¿Qué es la cartografía social? Es importante, primero, definir cuál es la función de la cartografía social y para qué nos sirve. Una investigación sobre temas socioambientales en el territorio afrodescendiente de la cuenca alta del río Cauca entenderá la cartografía social de la siguiente manera:
	 			</p>
	 			<p>
	 				Se entiende la cartografía social como una metodología participativa y colaborativa de investigación que invita a la reflexión, organización y acción alrededor de un espacio físico y social específico. Como metodología de trabajo en campo y como herramienta de investigación, se concibe a la cartografía social como una técnica dialógica (Fals Borda 1987) que permite proponer, desde una perspectiva transdisciplinaria, preguntas y perspectivas críticas para abordar los conflictos socioambientales que motivaron el presente ejercicio de investigación. A la vez, esta perspectiva de cartografía social permitió reconocer e incorporar en la investigación los intereses y las posiciones (también políticas) de la comunidad y de las organizaciones sociales (Offen 2009), las cuales se expresaron en las representaciones gráficas y en las indicaciones específicas que los participantes trazaron sobre los mapas. Además, durante el ejercicio cartográfico surgieron nuevas preguntas para futuras indagaciones territoriales y, más importante aún, se tomaron decisiones políticas y de planeación autónoma del territorio relacionadas con el uso de los resultados cartográficos (Vélez, Rátiva, Varela, 2012, p. 62).
	 			</p>
	 		</section>

	 		<p>
	 			De este modo, se puede observar que la cartografía social permite, de manera constructiva y participativa, identificar problemas, preguntas, soluciones, tendencias ideológicas, políticas y éticas sobre un determinado territorio donde confluyen estas variables, mediante una representación gráfica que es el mapa. Teniendo en cuenta esto, van a trabajar, mediante la cartografía social, el tema de la pluralidad y diversidad en nuestro territorio. Sigan las siguientes indicaciones con la orientación del docente:
	 		</p>

	 		<p>
	 			<strong>
	 				Paso 1:
	 			</strong>
	 			van a buscar el mapa de su territorio, en el caso particular, del municipio o barrio en donde se encuentra su colegio. La idea es que se dibuje en un pliego de papel (periódico, cartón cartulina, cartulina).
	 		</p>

	 		<p>
	 			<strong>
	 				Paso 2:
	 			</strong>
	 			es necesario formular algunas preguntas en el grupo que permitan enriquecer, con sus aportes, a la cartografía social. Para iniciar, se sugieren las siguientes preguntas y responderlas en el grupo de clase. Cada idea, respuesta y aporte es imprescindible anotarlo. Se sugiere que haya una persona encargada de escribirlos. Las preguntas son las siguientes:
	 		</p>

	 		<p>
	 			<strong>
	 				a.
	 			</strong>
	 			¿Qué grupos étnicos, religiosos y políticos existen en el territorio? Es necesario ubicarlos en el mapa.
	 		</p>

	 		<p>
	 			<strong>
	 				b.
	 			</strong>
	 			¿Existe otro tipo de grupos que no se puede identificar en el territorio (pandillas, grupos armados ilegales, bandas criminales, culturas urbanas, entre otros)?
	 		</p>

	 		<p>
	 			<strong>
	 				c.
	 			</strong>
	 			De los grupos que identificaron, ¿cuáles ejercen algún tipo de violencia y qué tipo de violencia?
	 		</p>

	 		<p>
	 			<strong>
	 				d.
	 			</strong>
	 			Entre dichos grupos que lograron identificar en su territorio, ¿existen conflictos? ¿Cuáles? Es de recordar que no todo tipo de conflicto necesariamente es violento, pero en el caso de que exista, identifíquenlo.
	 		</p>

	 		<p>
	 			<strong>
	 				Paso 3:
	 			</strong>
	 			luego de tener las respuestas de las preguntas, se propone registrar en el mapa aquello de lo que se conversó. La idea es ir ubicando, no solo los grupos que identificaron, sino las ideas en el mapa (conflictos, formas de violencia y los otros elementos que fueron surgiendo).
	 		</p>

	 		<p>
	 			<strong>
	 				Paso 4:
	 			</strong>
	 			 cuando se tenga todo el mapa con los registros (paso 3), se puede generar:
	 		</p>

	 		<p>
	 			<strong>
	 				a.
	 			</strong>
	 			Preguntas que orienten una posible investigación sobre el territorio.
	 		</p>

	 		<p>
	 			<strong>
	 				b.
	 			</strong>
	 			Reflexiones éticas y políticas alrededor de las problemáticas sociales identificadas.

	 		</p>

	 		<p>
	 			<strong>
	 				c.
	 			</strong>
	 			Posibles soluciones a las problemáticas sociales identificadas.

	 		</p>

	 		<p>
	 			<strong>
	 				d.
	 			</strong>
	 			Y cómo, desde sus quehaceres, podrían aportar para evitar conflictos violentos y, más bien, para ser constructores de paz.

	 		</p>

	 		<p>
	 			Para ampliar información sobre la actividad de la cartografía social, se sugiere ver o compartir a los estudiantes el siguiente: <a href="https://www.youtube.com/watch?v=Gt-APMxlf_I&amp;feature=youtu.be " target="_blank" rel="noopener noreferrer">https://www.youtube.com/watch?v=Gt-APMxlf_I&amp;feature=youtu.be </a>
	 		</p>


	 	</section>
		 `,
        upload: false,
        id: 1,
      },
      {
        content: `

	 		<h1>
	 			Fase postactiva o de aplicación
	 		</h1>

	 		<img class="divicion_image" src="assets/images/fondos/Fondo_division_mod.png">
	 		<br>
	 		<img src="https://i.postimg.cc/tJJ8rL0v/diana-ciudad.png">
	 		<ul class="menu_momento_introductivo">
	 			<li class="btn_foro"><span><a alt="Competencias Básicas" href=""></a></span></li>
	 			<li class="btn_maloka"><span><a alt="Competencias Socioemocionales" href=""></a></span>
	 			</li>
	 			<li class="btn_perfil"><span><a alt="Competencias Ciudadanas" href=""></a></span></li>
	 		</ul>

	 		<br>
	 		<h2>
	 			Actividad 6
	 		</h2>
<img src="https://i.postimg.cc/tgbw01Qx/diana-ciudad.png" title="Recuerda, en esta actividad debes hacer un entregable.">
<ul class="menu_momento_introductivo">
 			<li class="btn_foro" title="Competencias Básicas"><span><a alt="Competencias Básicas" href=""></a></span></li>
 			<li class="btn_maloka" title="Competencias Socioemocionales"><span><a alt="Competencias Socioemocionales" href=""></a></span></li>
 			<li class="btn_perfil" title="Competencias Ciudadanas"><span><a alt="Competencias Ciudadanas" href=""></a></span></li>
 		</ul>
	 		<p>
	 			Con la orientación del docente y con base en el trabajo de la cartografía social, el grupo creará un proyecto básico que tenga como finalidad resolver un problema del territorio y la comunidad. Para ello, se sugiere seguir las siguientes indicaciones:
	 		</p>

	 		<p>
	 			<strong>
	 			1. Definición del problema:
	 			</strong>
	 			es el análisis y diagnóstico del territorio. Este trabajo ya lo adelantaron en la actividad de la cartografía social. Por tanto, ya tienen un diagnóstico sobre el territorio y ya tienen un problema identificado. Es de resaltar que la idea es resolver UN problema, así existan otros más.
	 		</p>

	 		<p>
	 			Teniendo identificado el problema, es importante realizar el “árbol de problemas”. Para ello, es didáctico realizarlo de acuerdo con la siguiente gráfica:
	 		</p>
	 		<br>
	 		<img src="https://i.postimg.cc/FH08nd9M/10-CC-img5.png" alt="" class="tabla">
	 		<br>
	 		<p>
	 			<strong>
	 				2.	Posible solución:
	 			</strong>
	 			con el árbol de problemas, conociendo las causas y efectos que podría tener, es necesario identificar la posible solución del problema mediante un árbol de objetivos. En él se puede identificar lo siguiente:
	 		</p>
	 		<p>
	 			<strong>
	 				a.	Fines o resultados:
	 			</strong>
	 			el propósito final del proyecto que no es otra cosa que resolver un problema específico de la comunidad. Aquí se debe identificar todos los fines o resultados que se esperan lograr con la solución del problema.
	 		</p>
	 		<p>
	 			<strong>
	 				b.	Solución:
	 			</strong>
	 			es la acción principal y central que eligieron para la solución del problema identificado.
	 		</p>
	 		<p>
	 			<strong>
	 				c.	Medios:
	 			</strong>
	 			es identificar cuáles son los medios o instrumentos que se necesitan para solución del problema y que aportan a los fines y resultados.
	 		</p>
	 		<p>
	 			<strong>
	 				d.
	 			</strong>
	 			Esta parte se puede realizar a partir de la siguiente imagen que tiene un buen ejemplo:
	 		</p>
	 		<br>
	 		<img src="https://i.postimg.cc/4yMqjpHg/IMG-COMPCIUD-10y11-2x.png" alt="" class="tabla">
	 		<br>

	 		<p>
	 			Ahora bien, con el árbol tanto de problemas como de objetivos, se procede a escribir el documento del proyecto. Estos son las partes que deben tener:
	 		</p>

	 		<p>
	 			<strong>
	 				a.
	 			</strong>
	 			Nombre del proyecto: debe ser claro, corto y que refleje la intervención que se va a realizar.
	 		</p>
	 		<p>
	 			<strong>
	 				b.
	 			</strong>
	 			Incluir el árbol de problemas y de objetivos en el documento (los diagramas).
	 		</p>
	 		<p>
	 			<strong>
	 				c.
	 			</strong>
	 			Objetivos:
	 			</p><p style="margin-left: 20px; margin-top: -10px;">
	 				<strong>
	 					i.
	 				</strong>
	 				General: es la solución del árbol de objetivos. <br>
	 				<strong>
	 					ii.
	 				</strong>
	 				Específicos: son los medios del árbol de objetivos.
	 			</p>
	 		<p></p>
	 		<p>
	 			<strong>
	 				d.
	 			</strong>
	 			Justificación: aquí se argumenta sobre la importancia de generar un cabildo abierto sobre una de las problemáticas de nuestra comunidad. Se debe exponer por qué es importante solucionar este problema y quiénes se van a beneficiar con el proyecto.
	 		</p>
	 		<p>
	 			<strong>
	 				e.
	 			</strong>
	 			Objetivos: son los beneficios del proyecto (fines o resultados del árbol de objetivos). Deben ser medibles, reales y concretos.
	 		</p>
	 		<p>
	 			<strong>
	 				f.
	 			</strong>
	 			Actividades y responsables: son las actividades concretas que se necesitan para alcanzar los objetivos del proyecto. A cada objetivo específico debe proponerse una o dos actividades con sus respectivos responsables.
	 		</p>
	 		<p>
	 			<strong>
	 				g.
	 			</strong>
	 			Con esta propuesta, que está fundamentado por problemas reales y acciones concretas de solución, se propone que, con la orientación del docente, se presente ante las autoridades gubernamentales de su región o entidades no gubernamentales que promuevan la participación ciudadana y sea tenida en cuenta, como propuesta del grupo de la institución educativa, para la solución de problemas en la comunidad.
	 		</p>

	 		<p>
	 			Para mayor información de los pasos y requerimientos para hacer un cabildo abierto, pueden seguir el siguiente enlace de la Registraduría Nacional del Estado Civil:
	 			<a href="https://www.registraduria.gov.co/-Cabildo-Abierto,3756-.html">https://www.registraduria.gov.co/-Cabildo-Abierto,3756-.html </a>
	 		</p>

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
  uploadForm: FormGroup;

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
        this.isEvidenceSubmitted = await this.checkIfAlreadySubmitted(this.phase, 2);
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
      await this.evidence.upload(this.phase, 4, formData);
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
