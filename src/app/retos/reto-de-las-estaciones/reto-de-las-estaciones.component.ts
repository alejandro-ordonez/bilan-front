import {
  Component,
  OnInit,
  ViewChild,
  TemplateRef,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AnswerRecord, Stat, TribePoint } from '@domain/models/stat.model';
import { GameUseCase } from '@domain/usecases/game.usecase';
import { UserDataUseCase } from '@domain/usecases/user-data.usecase';
import { Router } from '@angular/router';

import { DateTime } from 'luxon';

import {
  QuestionRequest,
  Activity,
  Answer,
  GameInfo,
  Challenge,
  Tribe,
  Action,
  Question,
  ValidateQuestionRequest,
} from '@domain/models/game.model';
import { getItem, setItem } from '@frameworks/storage/Storage';
import { STORAGE } from '@frameworks/config/Constants';

@Component({
  selector: 'reto-de-las-estaciones',
  templateUrl: './reto-de-las-estaciones.component.html',
  styleUrls: ['./reto-de-las-estaciones.component.scss'],
})
export class RetoDeLasEstacionesComponent implements OnInit, OnDestroy {
  @ViewChild('challengeFinished')
  private challengeFinishedTpl: TemplateRef<any>;

  @ViewChild('answerWrong')
  private answerWrongTpl: TemplateRef<any>;

  @ViewChild('answerCorrect')
  private answerCorrectTpl: TemplateRef<any>;

  initChallengeTime: DateTime;
  finishChallengeTime: DateTime;
  challengeDuration: any;

  tribeIds: { [index: string]: any } = {
    matematicas: 5,
    competenciasCiudadanas: 4,
    competenciasSocioemocionales: 1,
    cienciasNaturales: 3,
    lenguaje: 2,
    'competencias-ciudadanas': 4,
    'competencias-socioemocionales': 1,
    'ciencias-naturales': 3,
  };

  materia: string;
  materiaFolder: string;
  grade: any;

  currentAction: Action;
  challenges: Challenge[];
  currentChallenge: Challenge;
  currentTribe: Tribe;
  currentActionName: string;
  currentTribeName: string;
  totalQuestions: number;

  answerRecords: AnswerRecord[] = [];

  challengeId: number;
  tribeId: number;
  challengeDifficulty: number;
  questionsloaded: Boolean = false;
  validateQuestion: any;
  challengePoints: number = 0;
  pointsPerQuestion: number;

  stats: Stat;
  answerSelectedAnswer: Answer;
  correctAnswer: Answer;

  challengeName: string;

  questionsBurneds: any = {
    cienciasNaturales: {
      10: [
        {
          context: [
            {
              text:
                'El dióxido de carbono (CO2) se reconoce como uno de los dos gases más importantes junto al metano (CH4) asociados al efecto invernadero. Estos gases se producen desde muchos lugares del planeta. Para el caso de ecosistemas tropicales como el páramo y la selva, actividades humanas como la minería, la ganadería, los monocultivos y el uso de agroquímicos, contribuyen al incremento de estos gases en la atmósfera. ',
            },
            {
              text: 'Tabla 1. ',
            },
            {
              text:
                'Carbono acumulado en suelos y vegetación para el páramo y la selva tropical',
            },
            {
              img: 'https://i.postimg.cc/KYN5sGpN/imagen-2021-06-28-141503.png',
            },
            {
              text:
                'Nota. Tomado y adaptado de El páramo y su potencial de captura de carbono; experiencia páramo La Cortadera-Boyacá, por L. Márquez & G. Cely, 2013. Memorias Congreso Investigación y Pedagogía.',
            },
          ],
          question: 'De acuerdo con la Tabla 1, es posible afirmar que:',
          answers: [
            {
              text:
                'A. preservar el ecosistema de páramo permite que de forma natural sus bajas temperaturas causen bajas tasas de mineralización y reciclaje de nutrientes, favoreciendo la lenta y continua absorción neta de CO2 atmosférico en el suelo. ',
              correct: true,
            },
            {
              text:
                'B. preservar el ecosistema de páramo permite que de forma natural sus altas temperaturas conlleven a altas tasas de mineralización y reciclaje de nutrientes, favoreciendo la lenta y continua absorción neta de CO2 atmosférico en el suelo.',
              correct: false,
            },
            {
              text:
                'C. preservar el ecosistema de páramo permite que de forma natural sus bajas temperaturas promuevan bajas tasas de mineralización y reciclaje de nutrientes, favoreciendo la rápida y continua absorción neta de CO2 atmosférico en la vegetación.',
              correct: false,
            },
            {
              text:
                'D. preservar el ecosistema de páramo permite que de forma natural sus altas temperaturas generen bajas tasas de mineralización y reciclaje de nutrientes, favoreciendo la lenta y continua absorción neta de CO2 atmosférico en la vegetación.',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text:
                'TE INVITAMOS A QUE MEJORES TU NIVEL DE desempeño. Revisa de nuevo la pregunta y acude a la(s) siguiente(s) fuente(s): ',
            },
            {
              url:
                'http://sired.udenar.edu.co/200/1/memoriasfinal.pdf#page=1562',
            },
            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 5,
            totems: 5,
          },
          difficult: 5,
        },
        {
          context: [
            {
              text:
                'Un grupo de estudiantes junto con su profesor estudian el agua en una quebrada de un páramo ubicado en la Cordillera Central del relieve colombiano, el cual se caracteriza por presentar fuertes intervenciones agrícolas, mineras y de asentamientos humanos. Toman varias muestras y las mezclan para obtener una muestra representativa, luego la dividen en cinco submuestras para ser sometidas a diferentes tipos de tratamientos.',
            },
            {
              text: 'Tabla 2.',
            },
            {
              text:
                'Nivel de los diferentes contaminantes en las submuestras después de haber efectuado cada uno de los tratamientos.',
            },
            {
              img: 'tabla',
            },
            {
              text: 'Nota. Elaboración propia.',
            },
          ],
          question:
            'El grupo de estudiantes concluyó, acertadamente a partir de la información de la tabla, que:',
          answers: [
            {
              text:
                'A. hervir el agua durante 10 minutos es un método muy adecuado para purificar el agua.',
              correct: false,
            },
            {
              text:
                'B. para contrarrestar la acción de químicos agrícolas, hay que usar el carbón activado. ',
              correct: false,
            },
            {
              text:
                'C. hay que evitar la agricultura no orgánica, debido a que sus desechos son muy difíciles de eliminar.',
              correct: true,
            },
            {
              text:
                'D. hay que usar el cloro y el carbón activado para eliminar los diferentes contaminantes presentes en el agua.',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text:
                'TE INVITAMOS A QUE MEJORES TU NIVEL DE desempeño. Revisa de nuevo la pregunta y acude a la(s) siguiente(s) fuente(s): ',
            },
            {
              url:
                'https://revistas.unilibre.edu.co/index.php/ingeniare/article/view/530/413',
            },
            {
              url: 'https://journals.openedition.org/polis/9158',
            },
            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 7.5,
            totems: 3,
          },
          difficult: 7.5,
        },
        {
          context: [
            {
              text:
                'El metano es uno de los dos gases que mayormente incide en el Cambio Climático, siendo una de sus principales fuentes, las flatulencias o gases de las vacas. Una estudiante en clase de química construye y comparte ante sus compañeros la siguiente ecuación para representar la combustión del metano:',
            },
            {
              text: 'CH4 + O2        ==>      CO2 + H2O',
            },
          ],
          question:
            'Otro estudiante de la clase analiza la ecuación y argumenta correctamente que:',
          answers: [
            {
              text:
                'A. está balanceada, porque reaccionan 1 mol de metano con 1 mol de O2 y se  producen 1 mol de H2O y 1 mol de CO2.',
              correct: false,
            },
            {
              text:
                'B. está balanceada, ya que hay átomos de carbono, hidrógeno y oxígeno en las dos partes de la reacción. ',
              correct: false,
            },
            {
              text:
                'C. No está́ balanceada, por dos razones: la primera es que hay 4 átomos de hidrógeno en los reactivos y 2 átomos de hidrógeno en los productos, la segunda es que hay 2 átomos de oxígeno en los reactivos y 3 en los productos.',
              correct: true,
            },
            {
              text:
                'D. No está balanceada, debido a que las moléculas de los reactivos no se corresponden con las presentes en los productos. ',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text:
                'TE INVITAMOS A QUE MEJORES TU NIVEL DE desempeño. Revisa de nuevo la pregunta y acude a la(s) siguiente(s) fuente(s): ',
            },
            {
              url:
                'https://cdn.educ.ar/dinamico/UnidadHtml__get__e8dfbca6-e269-4a9f-b7dc-f40700e6e02b/15067-edi/data/6912d864-c851-11e0-8071-e7f760fda940/index.htm',
            },
            {
              url:
                'https://www.agua.org.mx/wp-content/uploads/2017/05/LUCHA-CONTRA-LA-CONTAMINACION.pdf',
            },
            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 2.5,
            totems: 3,
          },
          difficult: 2.5,
        },
        {
          context: [
            {
              text:
                'Muchos textos y medios de comunicación plantean el fenómeno planetario que causa el aumento de gases efecto invernadero como calentamiento global,',
            },
          ],
          question: 'este término es',
          answers: [
            {
              text:
                'A. acertado, porque la temperatura en todo el planeta ha aumentado, paulatinamente, desde la revolución industrial.',
              correct: false,
            },
            {
              text:
                'B. equivocado, ya que el clima en los distintos lugares del planeta varía de forma extrema, con: grandes sequías; fuertes heladas o nevadas; impredecibles tormentas y huracanes. ',
              correct: true,
            },
            {
              text:
                'C. acertado, debido a que el aumento de la temperatura se presenta en todas las regiones del planeta.',
              correct: false,
            },
            {
              text:
                'D. equivocado, ya que la elevación de la temperatura se presenta en muy pocas regiones de la Tierra.el consumo de cocaína, un mes antes a la consulta, fue menor al de otras sustancias, incluso al de drogas farmacéuticas. ',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text: 'Te invitamos a que mejores tu nivel de competencia.',
            },
            {
              text:
                'Revisa de nuevo la pregunta y acude al siguiente apartado de este módulo:',
            },
            {
              text: 'El Cambio Climático y la soberanía alimentaria.',
            },
          ],
          positiveFeedback: {
            stars: 2.5,
            totems: 3,
          },
          difficult: 2.5,
        },
        {
          context: [
            {
              text:
                'La modernidad se caracteriza por el uso prácticamente supremo de la razón, motivo por el cual la ciencia y sus métodos se han convertido para la generalidad de las poblaciones humanas, en la única forma valida de producir conocimiento. En ese mismo sentido, la ciencia unida al desarrollo ha llevado a la explotación desbordada del páramo, entre otros ecosistemas.',
            },
          ],
          question:
            'La forma más sustentable a través de la cual los pueblos y sus gobiernos aportarían a la conservación de estos y otros valiosos ecosistemas sería mediante el diálogo participativo, horizontal y público entre',
          answers: [
            {
              text:
                'A. los representantes de las distintas disciplinas científicas.',
              correct: false,
            },
            {
              text:
                'B. el gobierno central y representantes de las distintas disciplinas científicas.',
              correct: false,
            },
            {
              text:
                'C. los representantes del territorio, del gobierno central y de las distintas disciplinas científicas.',
              correct: true,
            },
            {
              text:
                'D. los representantes del territorio y de las distintas disciplinas científicas.',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text: 'Te invitamos a que mejores tu nivel de competencia.',
            },
            {
              text:
                'Revisa de nuevo la pregunta y acude al siguiente apartado de este módulo:',
            },
            {
              text: 'El Cambio Climático y la soberanía alimentaria.',
            },
          ],
          positiveFeedback: {
            stars: 2.5,
            totems: 3,
          },
          difficult: 2.5,
        },
        {
          context: [
            {
              text:
                'Anualmente se producen cerca de 330 millones de toneladas de carne de res en el mundo (Ritchie, 2019). Los gases generados por los rumiantes que producen esta cantidad de carne son responsables de cerca del 18% de la contaminación que trae como consecuencia el Cambio Climático (Armas & Jiménez, 2017). ',
            },
          ],
          question: 'El gas que emiten dichos animales principalmente es el',
          answers: [
            {
              text: 'A. metano (CH4)',
              correct: true,
            },
            {
              text: 'B. dióxido de carbono (CO2)',
              correct: false,
            },
            {
              text: 'C. ozono (O3)',
              correct: false,
            },
            {
              text: 'D. óxido nitroso (N2O)',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text: 'Te invitamos a que mejores tu nivel de competencia.',
            },
            {
              text:
                'Revisa de nuevo y acude a la pregunta 2 de esta prueba Saber.',
            },
          ],
          positiveFeedback: {
            stars: 2.5,
            totems: 3,
          },
          difficult: 2.5,
        },
        {
          context: [
            {
              text:
                'El agua es un compuesto esencial e insustituible para la supervivencia de las diferentes especies animales en producción y tiene un efecto radical en sus niveles productivos.  El desafío está en aumentar la soberanía alimentaria,  mitigar la pobreza y producir proteína animal de alta calidad nutricional, desde los principios de la sustentabilidad, es decir, protegiendo el patrimonio hídrico, la cultura y los ecosistemas.',
            },
            {
              img: 'https://i.postimg.cc/gJRqvhbK/Asset-14-2x.png',
            },
          ],
          question:
            'La huella hídrica de la producción de carne bovina es mayor a la de otras especies animales de granja.  Los impactos de la ganadería en detrimento de la calidad y disponibilidad de agua son sustanciales y su mayor impacto se da por:',
          answers: [
            {
              text:
                'A. la compra del ganado bovino y la contaminación por sus excretas.A. metano (CH4)',
              correct: false,
            },
            {
              text:
                'B. la producción de insumos y pastos para la alimentación animal hasta la transformación y transporte de los diferentes subproductos animales.',
              correct: true,
            },
            {
              text:
                'C. El aumento de peso de los animales que causa la compactación del suelo que a su vez produce erosión.',
              correct: false,
            },
            {
              text:
                'D. El sostenimiento de extensas áreas de monocultivo para su alimentación.',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text: 'Te invitamos a que mejores tu nivel de competencia.',
            },
            {
              text:
                'RRevisa de nuevo la pregunta y acude a la(s) siguiente(s) fuente(s):',
            },
          ],
          positiveFeedback: {
            stars: 5,
            totems: 3,
          },
          difficult: 5,
        },
        {
          context: [
            {
              text:
                'Los problemas que genera la ganadería bovina no solo están relacionados con la producción de gases efecto invernadero, también están conectados con la compactación del suelo y la deforestación de grandes extensiones de tierra debido a la transformación del ecosistema en pastizales (monocultivo), causando erosión, escasez de nutrientes y pérdida de la biodiversidad.',
            },
          ],
          question:
            'Entre otras causas, los impactos ecológicos negativos producidos por la ganadería extensiva son originados por:',
          answers: [
            {
              text:
                'A. el alto crecimiento de las poblaciones en zonas urbanas con el consecuente aumento en el consumo de subproductos animales.',
              correct: true,
            },
            {
              text:
                'B. la baja flexibilización de los gobiernos en el comercio de los diversos productos de origen animal.',
              correct: false,
            },
            {
              text:
                'C. el paso de muchos individuos a dietas que involucran el consumo de menor cantidad de alimentos de origen animal.',
              correct: false,
            },
            {
              text:
                'D. los cambios en la alimentación de los animales, los cuales incluyen más productos de origen natural.',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text: 'Te invitamos a que mejores tu nivel de competencia.',
            },
            {
              text:
                'Revisa de nuevo la pregunta y acude a la(s) siguiente(s) fuente(s):',
            },
            {
              url: 'http://www.scielo.org.mx/pdf/prode/v39n154/v39n154a11.pdf',
            },
          ],
          positiveFeedback: {
            stars: 5,
            totems: 3,
          },
          difficult: 5,
        },
        {
          context: [
            {
              text:
                'RESPONDA LA PREGUNTA 9 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN ',
            },
            {
              text: 'Figura 8. ',
            },
            {
              text: 'Costo ambiental de traer los alimentos a nuestras casas.',
            },
            {
              text:
                'Gunkey, una niña de una cultura indígena colombiana observa la Figura 8 y se preocupa mucho por la destrucción que se hace a la Madre Tierra, que dentro de su cosmovisión es otro ser vivo,  Su preocupación radica en el costo ambiental generado por el  trasporte de alimentos,  por lo cual se propone realizar un proyecto sustentable (de carácter cultural, ecológico y ético) que permita mitigar dicho costo.',
            },
          ],
          question: 'este es',
          answers: [
            {
              text:
                'A. Establecer  un monocultivo que suministre parte de los alimentos necesarios para hacer el almuerzo de los estudiantes, con el apoyo de los saberes ancestrales de los habitantes de la región.',
              correct: false,
            },
            {
              text:
                'B. Establecer un policultivo a través de una huerta orgánica que suministre parte de los alimentos necesarios para hacer el almuerzo de los estudiantes, con el apoyo de los saberes ancestrales de los habitantes de la región',
              correct: true,
            },
            {
              text:
                'C. Establecer un policultivo que suministre parte de los alimentos necesarios para hacer el almuerzo de los estudiantes.',
              correct: false,
            },
            {
              text:
                'D. Establecer un monocultivo a través de una huerta orgánica que suministre parte de los alimentos necesarios para hacer el almuerzo de los estudiantes.',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text: 'Te invitamos a que mejores tu nivel de competencia.',
            },
            {
              text:
                'Revisa de nuevo la pregunta y acude al siguiente apartado de este módulo:',
            },
            {
              text:
                'Planteamiento del objetivo general y objetivos específicos.',
            },
          ],
          positiveFeedback: {
            stars: 7.5,
            totems: 3,
          },
          difficult: 7.5,
        },
        {
          context: [
            {
              text:
                'RESPONDA LAS PREGUNTA 10 A 12 DE ACUERDO CON LAS SIGUIENTES GRÁFICAS ',
            },
            {
              img: 'https://i.postimg.cc/y8Zd6ymn/mg-color-1-2x.png',
            },
            {
              text: 'Figura 9. ',
            },
            {
              text: 'Modelos de la respiración en diferentes seres vivos.',
            },
            {
              text: 'Nota. Tomado y modificado de Figueroa (2009).',
            },
            {
              text:
                'La respiración es un proceso bioquímico a través del cual muchos seres vivos intercambian oxígeno y dióxido de carbono con el medio físico. El oxígeno en el interior de los mamíferos realiza la combustión de los azúcares y entre otros productos se libera energía.',
            },
          ],
          question: 'La figura que mejor representa esta idea es:',
          answers: [
            {
              text: 'A. 1',
              correct: true,
            },
            {
              text: 'B. 2',
              correct: false,
            },
            {
              text: 'C. 3',
              correct: false,
            },
            {
              text: 'D. 4',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text: 'Te invitamos a que mejores tu nivel de competencia.',
            },
            {
              text:
                ' Revisa de nuevo la pregunta y acude a la(s) siguiente(s) fuente(s):',
            },
            {
              url:
                'https://www.abc.com.py/edicion-impresa/suplementos/escolar/la-respiracion-en-los-animales-1513620.html',
            },
          ],
          positiveFeedback: {
            stars: 5,
            totems: 3,
          },
          difficult: 5,
        },
        {
          context: [
            {
              text:
                'RESPONDA LAS PREGUNTA 10 A 12 DE ACUERDO CON LAS SIGUIENTES GRÁFICAS ',
            },
            {
              img: 'https://i.postimg.cc/y8Zd6ymn/mg-color-1-2x.png',
            },
            {
              text: 'Figura 9. ',
            },
            {
              text: 'Modelos de la respiración en diferentes seres vivos.',
            },
            {
              text: 'Nota. Tomado y modificado de Figueroa (2009).',
            },
            {
              text:
                'La respiración aerobia es un proceso que libera dióxido de carbono a la biósfera y la realizan la mayoría de los seres vivos del planeta Tierra, la descarga de este gas es un proceso natural.  Algunos de los organismos menos complejos de la escala evolutiva respiran por difusión. En esta respiración el intercambio de gases se hace directamente entre el medio exterior y el interior del organismo, de un medio de mayor a otro de menor concentración de moléculas.',
            },
          ],
          question: 'La figura que mejor explica esta clase de respiración es:',
          answers: [
            {
              text: 'A. 1',
              correct: false,
            },
            {
              text: 'B. 2',
              correct: false,
            },
            {
              text: 'C. 3',
              correct: true,
            },
            {
              text: 'D. 4',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text: 'Te invitamos a que mejores tu nivel de competencia.',
            },
            {
              text:
                'Revisa de nuevo la pregunta y acude a la(s) siguiente(s) fuente(s):',
            },
            {
              url:
                'https://www.unprofesor.com/ciencias-naturales/tipos-de-respiracion-animal-4431.html',
            },
          ],
          positiveFeedback: {
            stars: 5,
            totems: 3,
          },
          difficult: 5,
        },
        {
          context: [
            {
              text:
                'RESPONDA LAS PREGUNTA 10 A 12 DE ACUERDO CON LAS SIGUIENTES GRÁFICAS ',
            },
            {
              img: 'https://i.postimg.cc/y8Zd6ymn/mg-color-1-2x.png',
            },
            {
              text: 'Figura 9. ',
            },
            {
              text: 'Modelos de la respiración en diferentes seres vivos.',
            },
            {
              text: 'Nota. Tomado y modificado de Figueroa (2009).',
            },
            {
              text:
                'La fotosíntesis es un proceso bioquímico que realizan plantas, algas y algunas bacterias. A través de esta reacción estos seres vivos absorben una buena cantidad de dióxido de carbono de la biósfera, contribuyendo de tal forma a disminuir los niveles de gases efecto invernadero. Por esto es muy importante evitar la deforestación, conservar y proteger los bosques y fuentes hídricas',
            },
            {
              text: 'La siguiente ecuación química representa la fotosíntesis:',
            },
            {
              text: '6H2O + 6CO2 ==> 6O2 + C6H12O6',
            },
          ],
          question:
            '¿Cuál de las siguientes opciones muestra acertadamente los productos de la reacción?',
          answers: [
            {
              text: 'A. 6 moléculas de Oxígeno  una molécula de glucosa',
              correct: true,
            },
            {
              text: 'B. 12 O, 6 C y 8 H',
              correct: false,
            },
            {
              text: 'C. 8 O, 6 C y 8 H',
              correct: false,
            },
            {
              text: 'D. 8 O, 6 C y 12 H',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text: 'Te invitamos a que mejores tu nivel de competencia.',
            },
            {
              text:
                ' Revisa de nuevo la pregunta y acude a la(s) siguiente(s) fuente(s):',
            },
            {
              url:
                'https://0201.nccdn.net/1_2/000/000/112/ddc/Qu--mica-3--A-3--B-3--C--Ecuaci--n-qu--mica-APUNTE.-PDF.pdf',
            },
          ],
          positiveFeedback: {
            stars: 2.5,
            totems: 3,
          },
          difficult: 2.5,
        },
        {
          context: [
            {
              text:
                'El aumento de agua dulce en el océano es otro factor que ha repercutido directamente en las redes tróficas por la alteración de la dinámica del hielo (ver Figura 10). La contracción del área del hielo marino en invierno modifica la variedad y composición regional del fitoplancton, lo que perjudica al krill, parte importante del zooplancton.',
            },
            {
              text: 'Figura 10.',
            },
            {
              text:
                'Red trófica ártica simplificada. (Modificado de Duarte,2007)',
            },
            {
              img: 'https://i.postimg.cc/RhZ72Dng/CN-img-color-2-2x-100.jpg',
            },
          ],
          question: 'La disminución del Krill afecta:',
          answers: [
            {
              text: 'A. La fauna bentónica y pelágica.',
              correct: false,
            },
            {
              text: 'B. La fauna del hielo y pelágica.',
              correct: false,
            },
            {
              text: 'C. Las distintas clases de fauna marina.',
              correct: true,
            },
            {
              text: 'D. Ninguna de las clases de fauna marina.',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text: 'Te invitamos a que mejores tu nivel de competencia.',
            },
            {
              text:
                ' Revisa de nuevo la pregunta y acude a la(s) siguiente(s) fuente(s):',
            },
            {
              url:
                'https://0201.nccdn.net/1_2/000/000/112/ddc/Qu--mica-3--A-3--B-3--C--Ecuaci--n-qu--mica-APUNTE.-PDF.pdf',
            },
          ],
          positiveFeedback: {
            stars: 5,
            totems: 3,
          },
          difficult: 5,
        },
        {
          context: [
            {
              text:
                'RESPONDA LAS PREGUNTAS 14 A 17 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN',
            },
            {
              text: 'Efectos de la luz solar sobre la germinación de maleza.',
            },
            {
              text:
                'Algunos miles de años antes de la invención de los herbicidas, los campesinos simplemente araban sus campos para controlar las malas hierbas. Incluso hoy en día, en algunos campos el arado es una parte valiosa de un programa integrado de manejo de malezas. Aunque el arado mata una gran cantidad de hierbas indeseables que están en pie, los agricultores saben desde hace mucho tiempo que con gran frecuencia conduce a la aparición de nuevas plántulas no apreciables en pocas semanas.',
            },
            {
              text:
                'Biólogos han demostrado que un campo agrícola puede tener 50000 o más semillas de malezas por m2 enterradas debajo de la superficie del suelo. Fisiólogos vegetales han demostrado que las semillas enterradas más de un centímetro por debajo de la superficie del suelo no reciben suficiente luz para germinar. ',
            },
            {
              text:
                'Es posible que: ¿Las hojas de un instrumento de arado, que pueden llegar a más de 30cm por debajo de la superficie del suelo, expongan semillas que se encontraban enterradas, y así su germinación sea inducida por la exposición a la luz solar?',
            },
            {
              text:
                'Hacia finales del siglo XX, Karl Hartmann, de la Universidad de Erlangen en Alemania, razonó que cuando los agricultores aran sus campos durante el día, las semillas de malezas enterradas se exponen brevemente a la luz solar cuando se revuelve el suelo, y esto estimula su germinación. Por lo tanto, la germinación de las semillas de malezas se reduciría al mínimo si los agricultores simplemente aran sus campos durante la noche, cuando los fotones golpean la superficie por debajo de 1015 fotones por metro cuadrado por segundo. Aunque incluso en estas condiciones, cientos de millones de fotones golpean cada milímetro cuadrado de suelo cada segundo, esta iluminación está por debajo del umbral necesario para estimular la germinación de la mayoría de las semillas.',
            },
            {
              text:
                'Hartmann probó su idea en Alemania. Cultivó una franja, alrededor del mediodía y la otra por la noche. No se plantaron cultivos en estos experimentos piloto para evitar una posible competencia con las malezas emergentes. Como resultado más del 80 por ciento de la superficie del campo arado a la luz del día estaba cubierta por malas hierbas, mientras que solo alrededor del 2 por ciento del campo arado durante la noche estaba cubierto por malas hierbas.  En la tabla 3 se muestran los resultados de experimentos posteriores de Hartmann.',
            },
            {
              text: 'Esta lectura ha sido modificada de Ensminger, 2001.',
            },
            {
              text: 'Life Under the Sun',
            },
            {
              text: 'Peter A. Ensminger',
            },
            {
              text: '2001',
            },
            {
              text: '2001',
            },
            {
              text: 'Print ISBN-13: 9780300088045',
            },
            {
              text: 'Tabla 3.',
            },
            {
              text:
                'Número de plántulas de maleza que germinaron en muestras de suelo un mes después de arar en un experimento posterior de Hartmann.',
            },
            {
              text: 'Nota. Tomado y modificado de Ensminger, 2001.',
            },
          ],
          question:
            'Según la lectura, la carencia de exposición a la luz de las semillas de plantas consideradas malezas impide que',
          answers: [
            {
              text: 'A. Inicien su desarrollo ',
              correct: true,
            },
            {
              text:
                'B. absorban los nutrientes necesarios para desarrollar flores. ',
              correct: false,
            },
            {
              text:
                'C. Se produzca competencia con los cultivos a establecerse.',
              correct: false,
            },
            {
              text: 'D. Inicien procesos de fotosíntesis',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text: 'Te invitamos a que mejores tu nivel de competencia.',
            },
            {
              text:
                ' Revisa de nuevo la pregunta y acude a la(s) siguiente(s) fuente(s):',
            },
            {
              text:
                'Revisar último párrafo y tabla de la lectura: Efectos de la luz solar sobre la germinación de maleza.',
            },
          ],
          positiveFeedback: {
            stars: 2.5,
            totems: 3,
          },
          difficult: 2.5,
        },
        {
          context: [
            {
              text:
                'RESPONDA LAS PREGUNTAS 14 A 17 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN',
            },
            {
              text: 'Efectos de la luz solar sobre la germinación de maleza.',
            },
            {
              text:
                'Algunos miles de años antes de la invención de los herbicidas, los campesinos simplemente araban sus campos para controlar las malas hierbas. Incluso hoy en día, en algunos campos el arado es una parte valiosa de un programa integrado de manejo de malezas. Aunque el arado mata una gran cantidad de hierbas indeseables que están en pie, los agricultores saben desde hace mucho tiempo que con gran frecuencia conduce a la aparición de nuevas plántulas no apreciables en pocas semanas.',
            },
            {
              text:
                'Biólogos han demostrado que un campo agrícola puede tener 50000 o más semillas de malezas por m2 enterradas debajo de la superficie del suelo. Fisiólogos vegetales han demostrado que las semillas enterradas más de un centímetro por debajo de la superficie del suelo no reciben suficiente luz para germinar. ',
            },
            {
              text:
                'Es posible que: ¿Las hojas de un instrumento de arado, que pueden llegar a más de 30cm por debajo de la superficie del suelo, expongan semillas que se encontraban enterradas, y así su germinación sea inducida por la exposición a la luz solar?',
            },
            {
              text:
                'Hacia finales del siglo XX, Karl Hartmann, de la Universidad de Erlangen en Alemania, razonó que cuando los agricultores aran sus campos durante el día, las semillas de malezas enterradas se exponen brevemente a la luz solar cuando se revuelve el suelo, y esto estimula su germinación. Por lo tanto, la germinación de las semillas de malezas se reduciría al mínimo si los agricultores simplemente aran sus campos durante la noche, cuando los fotones golpean la superficie por debajo de 1015 fotones por metro cuadrado por segundo. Aunque incluso en estas condiciones, cientos de millones de fotones golpean cada milímetro cuadrado de suelo cada segundo, esta iluminación está por debajo del umbral necesario para estimular la germinación de la mayoría de las semillas.',
            },
            {
              text:
                'Hartmann probó su idea en Alemania. Cultivó una franja, alrededor del mediodía y la otra por la noche. No se plantaron cultivos en estos experimentos piloto para evitar una posible competencia con las malezas emergentes. Como resultado más del 80 por ciento de la superficie del campo arado a la luz del día estaba cubierta por malas hierbas, mientras que solo alrededor del 2 por ciento del campo arado durante la noche estaba cubierto por malas hierbas.  En la tabla 3 se muestran los resultados de experimentos posteriores de Hartmann.',
            },
            {
              text: 'Esta lectura ha sido modificada de Ensminger, 2001.',
            },
            {
              text: 'Life Under the Sun',
            },
            {
              text: 'Peter A. Ensminger',
            },
            {
              text: '2001',
            },
            {
              text: '2001',
            },
            {
              text: 'Print ISBN-13: 9780300088045',
            },
            {
              text: 'Tabla 3.',
            },
            {
              text:
                'Número de plántulas de maleza que germinaron en muestras de suelo un mes después de arar en un experimento posterior de Hartmann.',
            },
            {
              text: 'Nota. Tomado y modificado de Ensminger, 2001.',
            },
            {
              text:
                'Lectura y tablas: Efectos de la luz solar sobre la germinación de maleza.',
            },
          ],
          question:
            'La pregunta que se encuentra inmediatamente después del segundo párrafo principalmente sirve para',
          answers: [
            {
              text: 'A. enfatizar el método de estudio a seguir en la lectura.',
              correct: false,
            },
            {
              text:
                'B. formular el objetivo de investigación a tratar en la lectura.',
              correct: false,
            },
            {
              text:
                'C. sugerir una hipótesis para ser desarrollada a través de la lectura. ',
              correct: true,
            },
            {
              text:
                'D. evidenciar el alcance del proyecto que se aborda en la lectura.',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text: 'Te invitamos a que mejores tu nivel de competencia.',
            },
            {
              text:
                ' Revisa de nuevo la pregunta y acude a la(s) siguiente(s) fuente(s):',
            },
            {
              text:
                'http://scielo.sld.cu/scielo.php?script=sci_arttext&pid=S1815-76962018000100122',
            },
          ],
          positiveFeedback: {
            stars: 7.5,
            totems: 3,
          },
          difficult: 7.5,
        },
        {
          context: [
            {
              text:
                'RESPONDA LAS PREGUNTAS 14 A 17 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN',
            },
            {
              text: 'Efectos de la luz solar sobre la germinación de maleza.',
            },
            {
              text:
                'Algunos miles de años antes de la invención de los herbicidas, los campesinos simplemente araban sus campos para controlar las malas hierbas. Incluso hoy en día, en algunos campos el arado es una parte valiosa de un programa integrado de manejo de malezas. Aunque el arado mata una gran cantidad de hierbas indeseables que están en pie, los agricultores saben desde hace mucho tiempo que con gran frecuencia conduce a la aparición de nuevas plántulas no apreciables en pocas semanas.',
            },
            {
              text:
                'Biólogos han demostrado que un campo agrícola puede tener 50000 o más semillas de malezas por m2 enterradas debajo de la superficie del suelo. Fisiólogos vegetales han demostrado que las semillas enterradas más de un centímetro por debajo de la superficie del suelo no reciben suficiente luz para germinar. ',
            },
            {
              text:
                'Es posible que: ¿Las hojas de un instrumento de arado, que pueden llegar a más de 30cm por debajo de la superficie del suelo, expongan semillas que se encontraban enterradas, y así su germinación sea inducida por la exposición a la luz solar?',
            },
            {
              text:
                'Hacia finales del siglo XX, Karl Hartmann, de la Universidad de Erlangen en Alemania, razonó que cuando los agricultores aran sus campos durante el día, las semillas de malezas enterradas se exponen brevemente a la luz solar cuando se revuelve el suelo, y esto estimula su germinación. Por lo tanto, la germinación de las semillas de malezas se reduciría al mínimo si los agricultores simplemente aran sus campos durante la noche, cuando los fotones golpean la superficie por debajo de 1015 fotones por metro cuadrado por segundo. Aunque incluso en estas condiciones, cientos de millones de fotones golpean cada milímetro cuadrado de suelo cada segundo, esta iluminación está por debajo del umbral necesario para estimular la germinación de la mayoría de las semillas.',
            },
            {
              text:
                'Hartmann probó su idea en Alemania. Cultivó una franja, alrededor del mediodía y la otra por la noche. No se plantaron cultivos en estos experimentos piloto para evitar una posible competencia con las malezas emergentes. Como resultado más del 80 por ciento de la superficie del campo arado a la luz del día estaba cubierta por malas hierbas, mientras que solo alrededor del 2 por ciento del campo arado durante la noche estaba cubierto por malas hierbas.  En la tabla 3 se muestran los resultados de experimentos posteriores de Hartmann.',
            },
            {
              text: 'Esta lectura ha sido modificada de Ensminger, 2001.',
            },
            {
              text: 'Life Under the Sun',
            },
            {
              text: 'Peter A. Ensminger',
            },
            {
              text: '2001',
            },
            {
              text: '2001',
            },
            {
              text: 'Print ISBN-13: 9780300088045',
            },
            {
              text: 'Tabla 3.',
            },
            {
              text:
                'Número de plántulas de maleza que germinaron en muestras de suelo un mes después de arar en un experimento posterior de Hartmann.',
            },
            {
              text: 'Nota. Tomado y modificado de Ensminger, 2001.',
            },
            {
              text:
                'Lectura y tablas: Efectos de la luz solar sobre la germinación de maleza.',
            },
          ],
          question:
            'La lectura sugiere qué si Hartmann hubiera plantado algún cultivo en las dos franjas agrícolas de su experimento, el porcentaje de la superficie de cada franja cubierta con malezas sería',
          answers: [
            {
              text: 'A. enfatizar el método de estudio a seguir en la lectura.',
              correct: false,
            },
            {
              text:
                'B. formular el objetivo de investigación a tratar en la lectura.',
              correct: true,
            },
            {
              text:
                'C. sugerir una hipótesis para ser desarrollada a través de la lectura. ',
              correct: false,
            },
            {
              text:
                'D. evidenciar el alcance del proyecto que se aborda en la lectura.',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text: 'Te invitamos a que mejores tu nivel de competencia.',
            },
            {
              text:
                ' Revisa de nuevo la pregunta y acude a la(s) siguiente(s) fuente(s):',
            },
            {
              text:
                'Revisar último párrafo de la lectura: Efectos de la luz solar sobre la germinación de maleza.',
            },
          ],
          positiveFeedback: {
            stars: 7.5,
            totems: 3,
          },
          difficult: 7.5,
        },
        {
          context: [
            {
              text:
                'RESPONDA LAS PREGUNTAS 14 A 17 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN',
            },
            {
              text: 'Efectos de la luz solar sobre la germinación de maleza.',
            },
            {
              text:
                'Algunos miles de años antes de la invención de los herbicidas, los campesinos simplemente araban sus campos para controlar las malas hierbas. Incluso hoy en día, en algunos campos el arado es una parte valiosa de un programa integrado de manejo de malezas. Aunque el arado mata una gran cantidad de hierbas indeseables que están en pie, los agricultores saben desde hace mucho tiempo que con gran frecuencia conduce a la aparición de nuevas plántulas no apreciables en pocas semanas.',
            },
            {
              text:
                'Biólogos han demostrado que un campo agrícola puede tener 50000 o más semillas de malezas por m2 enterradas debajo de la superficie del suelo. Fisiólogos vegetales han demostrado que las semillas enterradas más de un centímetro por debajo de la superficie del suelo no reciben suficiente luz para germinar. ',
            },
            {
              text:
                'Es posible que: ¿Las hojas de un instrumento de arado, que pueden llegar a más de 30cm por debajo de la superficie del suelo, expongan semillas que se encontraban enterradas, y así su germinación sea inducida por la exposición a la luz solar?',
            },
            {
              text:
                'Hacia finales del siglo XX, Karl Hartmann, de la Universidad de Erlangen en Alemania, razonó que cuando los agricultores aran sus campos durante el día, las semillas de malezas enterradas se exponen brevemente a la luz solar cuando se revuelve el suelo, y esto estimula su germinación. Por lo tanto, la germinación de las semillas de malezas se reduciría al mínimo si los agricultores simplemente aran sus campos durante la noche, cuando los fotones golpean la superficie por debajo de 1015 fotones por metro cuadrado por segundo. Aunque incluso en estas condiciones, cientos de millones de fotones golpean cada milímetro cuadrado de suelo cada segundo, esta iluminación está por debajo del umbral necesario para estimular la germinación de la mayoría de las semillas.',
            },
            {
              text:
                'Hartmann probó su idea en Alemania. Cultivó una franja, alrededor del mediodía y la otra por la noche. No se plantaron cultivos en estos experimentos piloto para evitar una posible competencia con las malezas emergentes. Como resultado más del 80 por ciento de la superficie del campo arado a la luz del día estaba cubierta por malas hierbas, mientras que solo alrededor del 2 por ciento del campo arado durante la noche estaba cubierto por malas hierbas.  En la tabla 3 se muestran los resultados de experimentos posteriores de Hartmann.',
            },
            {
              text: 'Esta lectura ha sido modificada de Ensminger, 2001.',
            },
            {
              text: 'Life Under the Sun',
            },
            {
              text: 'Peter A. Ensminger',
            },
            {
              text: '2001',
            },
            {
              text: '2001',
            },
            {
              text: 'Print ISBN-13: 9780300088045',
            },
            {
              text: 'Tabla 3.',
            },
            {
              text:
                'Número de plántulas de maleza que germinaron en muestras de suelo un mes después de arar en un experimento posterior de Hartmann.',
            },
            {
              text: 'Nota. Tomado y modificado de Ensminger, 2001.',
            },
            {
              text:
                'Lectura y tablas: Efectos de la luz solar sobre la germinación de maleza.',
            },
          ],
          question:
            'Según la tabla, ¿en cuál muestra y bajo qué condiciones para arar el suelo es mejor sembrar? ¿Y por qué?',
          answers: [
            {
              text: 'A. Plantación de coníferas en la luz',
              correct: false,
            },
            {
              text: 'B. Pradera de hierba alta en la oscuridad.',
              correct: true,
            },
            {
              text: 'C. Plantación de coníferas en la oscuridad.',
              correct: false,
            },
            {
              text: 'D. Pradera de hierba alta en la luz.',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text: 'Te invitamos a que mejores tu nivel de competencia.',
            },
            {
              text:
                ' Revisa de nuevo la pregunta y acude a la(s) siguiente(s) fuente(s):',
            },
            {
              text:
                'Revisar la tabla de la lectura: Efectos de la luz solar sobre la germinación de maleza.',
            },
          ],
          positiveFeedback: {
            stars: 7.5,
            totems: 3,
          },
          difficult: 7.5,
        },
        {
          context: [
            {
              text:
                'El autor desea incluir un título para la tabla que sea consistente con la descripción que ésta hace.',
            },
          ],
          question:
            '¿Cuál de las siguientes opciones es el título más adecuado y preciso de la tabla según la información que presenta?',
          answers: [
            {
              text: 'A. Generación de residuos sólidos en Colombia',
              correct: false,
            },
            {
              text:
                'B. Contribución a la variación anual de residuos sólidos para Colombia en el 2018p',
              correct: false,
            },
            {
              text:
                'C. Variación anual de residuos sólidos para Colombia, comparación entre los años 2017 y 2018p',
              correct: false,
            },
            {
              text:
                'D. Oferta de residuos sólidos según tipo de desechos en Toneladas para Colombia en el 2018p.',
              correct: true,
            },
          ],
          negativeFeedback: [
            {
              text: 'Te invitamos a que mejores tu nivel de competencia.',
            },
            {
              text:
                ' Revisa de nuevo la pregunta y acude a la(s) siguiente(s) fuente(s):',
            },
            {
              url:
                'https://www.dane.gov.co/files/investigaciones/pib/ambientales/cuentas_ambientales/cuentas-residuos/Bt-Cuenta-residuos-2018p.pdf',
            },
          ],
          positiveFeedback: {
            stars: 7.5,
            totems: 3,
          },
          difficult: 7.5,
        },
        {
          context: [
            {
              text:
                'Como lo evidencia la tabla 4 para el 2018, la oferta de residuos sólidos ascendió́ a 21,38 millones de toneladas.',
            },
          ],
          question:
            'De acuerdo con los resultados que se muestran esta tabla, ¿un proyecto que permita disminuir la cifra al respecto de la contribución a la variación en la oferta en puntos porcentuales sería?',
          answers: [
            {
              text:
                'A. Manejo integral de la disposición final de los residuos sólidos en Colombia',
              correct: false,
            },
            {
              text:
                'B. Manejo integral de los desperdicios orgánicos a través del compostaje en el origen.',
              correct: true,
            },
            {
              text:
                'C. Manejo integral de los desperdicios orgánicos a través del compostaje en los vertederos.',
              correct: false,
            },
            {
              text:
                'D. Manejo integral (Separación en el origen) de los residuos sólidos en Colombia',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text: 'Te invitamos a que mejores tu nivel de competencia.',
            },
            {
              text:
                ' Revisa de nuevo la pregunta y acude a la(s) siguiente(s) fuente(s):',
            },
            {
              url:
                'https://www.dane.gov.co/files/investigaciones/pib/ambientales/cuentas_ambientales/cuentas-residuos/Bt-Cuenta-residuos-2018p.pdf',
            },
          ],
          positiveFeedback: {
            stars: 7.5,
            totems: 3,
          },
          difficult: 7.5,
        },
        {
          context: [
            {
              text:
                'Los restaurantes y supermercados son dos de los lugares donde se desperdician más alimentos.',
            },
          ],
          question:
            'Un restaurante decide emprender un proyecto sustentable en sus tres dimensiones (carácter cultural, ecológico y ético), por lo que plantea coherentemente el siguiente objetivo general:',
          answers: [
            {
              text:
                'A. Realizar un control estricto en la compra de alimentos para reducir su desperdicio y estos, depositarlos en un recipiente separado para que posteriormente sean recogidos por el camión de la basura.',
              correct: false,
            },
            {
              text:
                'B. Vender los desperdicios al mejor comprador para evitar el gran gasto generado por recolección de basuras.',
              correct: false,
            },
            {
              text:
                'C. Desarrollar un programa de formación en manejo de residuos sólidos con los meseros del restaurante.',
              correct: false,
            },
            {
              text:
                'D. Realizar un control estricto en la compra de alimentos para reducir su desperdicio  e implementar un doble esquema para el tratamiento de alimentos sobrantes, el primero relacionado con la donación de alimentos no consumidos, y el segundo destinado a enviar los desperdicios a granjas y/o huertas para utilizarlos como abono orgánico.',
              correct: true,
            },
          ],
          negativeFeedback: [
            {
              text: 'Te invitamos a que mejores tu nivel de competencia.',
            },
            {
              text:
                ' Revisa de nuevo la pregunta y acude a la(s) siguiente(s) fuente(s):',
            },
            {
              url: 'https://news.un.org/es/story/2018/10/1443382',
            },
          ],
          positiveFeedback: {
            stars: 2.5,
            totems: 3,
          },
          difficult: 2.5,
        },
      ],
      11: [
        {
          context: [
            {
              text:
                'RESPONDA LAS PREGUNTAS 1 A 4 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN ',
            },
            {
              text: 'Figura 13. ',
            },
            {
              text:
                'Relaciones entre el Cambio Climático, el consumo de comida chatarra y la obesidad infantil.',
            },
            {
              img: 'https://i.postimg.cc/jjzNkbCH/CN-img-color-3-2x.png',
            },
            {
              text: 'Nota. Elaboración propia a partir de ',
            },
            {
              text:
                'Piña, C. (2019). Cambio Climático, inseguridad alimentaria y obesidad infantil. Revista Cubana de Salud Pública.',
            },
            {
              text:
                'Organización Mundial de la Salud. (2020). https://www.who.int/end-childhood-obesity/facts/es/',
            },
            {
              text: 'Nota. Elaboración propia a partir de ',
            },
            {
              text:
                'La Organización Mundial de la Salud, en el año 2020, plantea que en los países en desarrollo (países de ingresos bajos y medianos) el sobrepeso y la obesidad infantil entre los niños en edad preescolar sobrepasa el 30%. Como se observa en la Figura 13, si se mantienen las tendencias de las últimas décadas, el número de lactantes y niños pequeños con sobrepeso llegará a los 70 millones para el año 2025. Sin la intervención adecuada, la obesidad se mantendrá durante la infancia, la adolescencia y la edad adulta. ',
            },
          ],
          question:
            'De las siguientes intervenciones, Cuál causaría mayor impacto a nivel de su territorio, en torno a la seguridad alimentaria y a la reducción de la tendencia descrita para el 2025, según la figura 15?',
          answers: [
            {
              text:
                'A. agrícola, si se promueve el cultivo de hortalizas orgánicas y se disminuyen las prácticas que involucran el uso de agroquímicos.',
              correct: true,
            },
            {
              text:
                'B. educativo, si se fortalecen programas pedagógicos encaminados al desarrollo del pensamiento crítico en los niños y niñas, respecto al consumo de comida saludable y balanceada.',
              correct: false,
            },
            {
              text:
                'C. económico, si por una parte, se establecen políticas que incentiven la disminución de los precios de la alimentación saludable y balanceada y, por otro lado, se aumentan los impuestos para la comida chatarra.',
              correct: false,
            },
            {
              text:
                'D. político, si se establecen leyes que castiguen severamente a las grandes y pequeñas industrias por el uso de publicidad engañosa.',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text:
                'TE INVITAMOS A QUE MEJORES TU NIVEL DE desempeño. Revisa de nuevo la pregunta y acude a la(s) siguiente(s) fuente(s): ',
            },
            {
              url:
                'http://bibliotecadigital.udea.edu.co/dspace/bitstream/10495/10576/1/FrancoAlejandro_2018_TratamiendoObesidadInfantil.pdf',
            },
            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 7.5,
            totems: 5,
          },
          difficult: 7.5,
        },
        {
          context: [
            {
              text:
                'RESPONDA LAS PREGUNTAS 1 A 4 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN ',
            },
            {
              text: 'Figura 13. ',
            },
            {
              text:
                'Relaciones entre el Cambio Climático, el consumo de comida chatarra y la obesidad infantil.',
            },
            {
              img: 'https://i.postimg.cc/jjzNkbCH/CN-img-color-3-2x.png',
            },
            {
              text: 'Nota. Elaboración propia a partir de ',
            },
            {
              text:
                'Piña, C. (2019). Cambio Climático, inseguridad alimentaria y obesidad infantil. Revista Cubana de Salud Pública.',
            },
            {
              text:
                'Organización Mundial de la Salud. (2020). https://www.who.int/end-childhood-obesity/facts/es/',
            },
            {
              text:
                'En un estudio realizado en baja California, Olmos, González & Contreras (2013) recolectaron datos a partir de la aplicación de 250 encuestas. Los resultados muestran que la mayor parte de la población conoce el significado de Cambio Climático y que el principal efecto observado es la falta de agua como consecuencia del aumento en las sequías y en la frecuencia e intensidad de los huracanes. Los impactos económicos generados han sido la reducción de la actividad pesquera y efectos negativos en el hato ganadero.',
            },
          ],
          question:
            'La situación presentada, en esta región, podría conducir al alto consumo de',
          answers: [
            {
              text:
                'A. comida chatarra, debido a los bajos precios de los alimentos saludables y balanceados.',
              correct: false,
            },
            {
              text:
                'B. comida saludable y balanceada, debido a sus precios bajos.',
              correct: false,
            },
            {
              text:
                'C. comida chatarra, debido al incremento en los precios de los alimentos saludables y balanceados.',
              correct: true,
            },
            {
              text:
                'D. comida saludable y balanceada, debido al aumento en los precios de la comida chatarra. ',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text:
                'TE INVITAMOS A QUE MEJORES TU NIVEL DE desempeño. Revisa de nuevo la pregunta y acude a la(s) siguiente(s) fuente(s): ',
            },
            {
              url:
                'http://bibliotecadigital.udea.edu.co/dspace/bitstream/10495/10576/1/FrancoAlejandro_2018_TratamiendoObesidadInfantil.pdf',
            },
            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 7.5,
            totems: 3,
          },
          difficult: 7.5,
        },
        {
          context: [
            {
              text:
                'RESPONDA LAS PREGUNTAS 1 A 4 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN ',
            },
            {
              text: 'Figura 13. ',
            },
            {
              text:
                'Relaciones entre el Cambio Climático, el consumo de comida chatarra y la obesidad infantil.',
            },
            {
              img: 'https://i.postimg.cc/jjzNkbCH/CN-img-color-3-2x.png',
            },
            {
              text: 'Nota. Elaboración propia a partir de ',
            },
            {
              text:
                'Piña, C. (2019). Cambio Climático, inseguridad alimentaria y obesidad infantil. Revista Cubana de Salud Pública.',
            },
            {
              text:
                'Organización Mundial de la Salud. (2020). https://www.who.int/end-childhood-obesity/facts/es/',
            },
            {
              text:
                'Son múltiples las causas de la obesidad infantil, algunas de ellas se pueden relacionar con las dificultades agrícolas y ganaderas derivadas del Cambio Climático. La sobrealimentación causa obesidad en cerca del 7 % de la población latinoamericana infantil, cifra que se encuentra por encima del promedio mundial (Piña, 2019). Esta problemática se relaciona en buena parte con la falta de alfabetización sobre el consumo de comida chatarra vs la ingesta de alimentos saludables y balanceados.',
            },
          ],
          question:
            'El círculo vicioso que mejor representa esta situación es:',
          answers: [
            {
              text: 'A.',
              correct: true,
            },
            {
              text: 'B.',
              correct: false,
            },
            {
              text: 'C.',
              correct: false,
            },
            {
              text: 'D. ',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text:
                'TE INVITAMOS A QUE MEJORES TU NIVEL DE desempeño. Revisa de nuevo la pregunta y acude a la(s) siguiente(s) fuente(s): ',
            },
            {
              url: 'https://www.scielosp.org/article/rcsp/2019.v45n3/e1964/',
            },
            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 5,
            totems: 3,
          },
          difficult: 5,
        },
        {
          context: [
            {
              text:
                'RESPONDA LAS PREGUNTAS 1 A 4 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN ',
            },
            {
              text: 'Figura 13. ',
            },
            {
              text:
                'Relaciones entre el Cambio Climático, el consumo de comida chatarra y la obesidad infantil.',
            },
            {
              img: 'https://i.postimg.cc/jjzNkbCH/CN-img-color-3-2x.png',
            },
            {
              text: 'Nota. Elaboración propia a partir de ',
            },
            {
              text:
                'Piña, C. (2019). Cambio Climático, inseguridad alimentaria y obesidad infantil. Revista Cubana de Salud Pública.',
            },
            {
              text:
                'Organización Mundial de la Salud. (2020). https://www.who.int/end-childhood-obesity/facts/es/',
            },
            {
              text:
                'El fenómeno global del Cambio Climático se asocia con la alteración  global en la producción agrícola. (Figura 13)',
            },
          ],
          question:
            'Un impacto terciario que provocaría una menor disponibilidad de alimentos estaría relacionado con:',
          answers: [
            {
              text:
                'A. el aumento en la diversidad de fitoparásitos que transmiten enfermedades en plantas y animales.',
              correct: false,
            },
            {
              text:
                'B. la crisis migratoria de miles de campesinos, indígenas y de personas de otras comunidades en algunos lugares del planeta.',
              correct: false,
            },
            {
              text:
                'C. la disminución de especies polinizadoras debido al incremento de monocultivos impulsados desde políticas públicas económicas.',
              correct: true,
            },
            {
              text:
                'D. el aumento en la diversidad de vectores que transmiten enfermedades en plantas y animales.',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text: 'Te invitamos a que mejores tu nivel de competencia.',
            },
            {
              text: ' Revisa de nuevo la Figura 13.',
            },
          ],
          positiveFeedback: {
            stars: 5,
            totems: 3,
          },
          difficult: 5,
        },
        {
          context: [
            {
              text:
                'La síntesis de proteínas para las células eucariotas inicia en el núcleo de la célula y termina en el ribosoma, como se muestra en la Figura 14. ',
            },
            {
              text: 'Figura 14. ',
            },
            {
              text: 'Proceso de síntesis de proteínas.',
            },
            {
              img: 'https://i.postimg.cc/XvpNpc6p/CN-img-color-4-2x-100.jpg',
            },
            {
              text: 'Nota. Elaboración propia.',
            },
          ],
          question:
            'Las proteínas son moléculas esenciales para la vida. De acuerdo con el modelo, si se interrumpe la traducción del ARNm, el efecto será que ',
          answers: [
            {
              text:
                'A. no se formará la secuencia de aminoácidos necesaria para la construcción de proteínas en el citoplasma de la célula.',
              correct: true,
            },
            {
              text:
                'B. el ARNm no podrá traducir del núcleo hacia el ribosoma.',
              correct: false,
            },
            {
              text:
                'C. no se formará la secuencia de aminoácidos necesaria para la construcción de proteínas en el núcleo de la célula.',
              correct: false,
            },
            {
              text:
                'D. no se sintetizará el ARNm a través de la transcripción.',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text: 'Te invitamos a que mejores tu nivel de competencia.',
            },
            {
              text:
                'Revisa de nuevo la pregunta y acude a la(s) siguiente(s) fuente(s):',
            },
            {
              url:
                'https://www.ucm.es/data/cont/media/www/pag-56185/09-Procesos%20genéticos%20de%20la%20s%C3%ADntesis%20de%20prote%C3%ADnas-la%20transcripción.pdf',
            },
          ],
          positiveFeedback: {
            stars: 5,
            totems: 3,
          },
          difficult: 5,
        },
        {
          context: [
            {
              text:
                'La función polinizadora de las abejas es fundamental para la agricultura mundial. Tal como lo presenta Rodríguez (2015), la polilla de la cera tiene una gran importancia como plaga, ya que causa grandes pérdidas económicas a los apicultores de todo el planeta por la gran cantidad de panales que destruye.',
            },
            {
              text:
                'El ataque a los panales se realiza de la siguiente forma: el estadio adulto vuela hasta encontrar una colmena donde poner los huevos, las larvas que emergen realizan túneles, dejando hilos de seda y pelusa que deshacen totalmente la colonia de abejas.',
            },
            {
              text: 'Figura 15. ',
            },
            {
              text:
                'Porcentaje de duración de las diferentes fases en el ciclo de vida de la polilla de la cera. ',
            },
          ],
          question:
            'Según la información anterior, ¿cuál de las siguientes preguntas puede plantearse en una investigación para resolver eficazmente la problemática de la polilla de la cera en la apicultura?',
          answers: [
            {
              text:
                'A. ¿Cómo desarrollar un tratamiento de control biológico que elimine los adultos de la polilla de la cera?)',
              correct: false,
            },
            {
              text:
                'B. ¿Cómo desarrollar un tratamiento de control biológico que elimine las crisálidas de la polilla de la cera?',
              correct: false,
            },
            {
              text:
                'C. ¿Cómo desarrollar un tratamiento de control biológico que elimine las larvas de la polilla de la cera?',
              correct: false,
            },
            {
              text:
                'D. ¿Cómo desarrollar un tratamiento de control biológico que elimine los huevos de la polilla de la cera? ',
              correct: true,
            },
          ],
          negativeFeedback: [
            {
              text: 'Te invitamos a que mejores tu nivel de competencia.',
            },
            {
              text:
                ' Revisa de nuevo la pregunta y acude a la(s) siguiente(s) fuente(s):',
            },
            {
              url:
                'http://repositorio.lamolina.edu.pe/bitstream/handle/UNALM/2107/H10-R67-T.pdf?sequence=1&isAllowed=y',
            },
          ],
          positiveFeedback: {
            stars: 5,
            totems: 3,
          },
          difficult: 5,
        },
        {
          context: [
            {
              text:
                'En el año 2015 la Organización de las Naciones Unidas (ONU), estableció la agenda 2030, la cual promueve 17 objetivos para el desarrollo sostenible (Ver Figura 16), éstos tienen entre otros propósitos la mitigación del Cambio Climático, la producción y el consumo responsable, además del fin de la pobreza.',
            },
            {
              text: 'Figura 16.',
            },
            {
              text: 'Objetivos del Desarrollo Sostenible.',
            },
            {
              img: '',
            },
            {
              text: 'Nota. Tomado de ONU, (2021).',
            },
          ],
          question:
            'La acción que más promueve el cumplimiento de los objetivos 1, 2, 3, 6, 10, 11, 12, 13, 14 y 15 es el establecimiento en las casas de las familias de todo el planeta de:',
          answers: [
            {
              text: 'A. jardines verticales porque capturan CO2.',
              correct: false,
            },
            {
              text:
                'B. puntos de reciclaje porque facilitan la disposición correcta de residuos solidos',
              correct: false,
            },
            {
              text:
                'C. cultivos hidropónicos porque aumentan la producción de biomasa en menor espacio.',
              correct: false,
            },
            {
              text:
                'D. huertas orgánicas, porque se producen alimentos sin contaminantes y aportan a la seguridad alimentaria y la conservación de la biodiversidad.',
              correct: true,
            },
          ],
          negativeFeedback: [
            {
              text: 'Te invitamos a que mejores tu nivel de competencia.',
            },
            {
              text:
                'Revisa de nuevo la pregunta y acude a la(s) siguiente(s) fuente(s):',
            },
            {
              url: 'https://youtu.be/24IiC2r4nk0',
            },
          ],
          positiveFeedback: {
            stars: 5,
            totems: 3,
          },
          difficult: 5,
        },
        {
          context: [
            {
              text:
                'Plantea Carrizosa (2014), en su libro Colombia compleja, que, para educar ciudadanos es fundamental tener en cuenta, entre muchos otros aspectos, los sesgos del propio mirar y respetar las miradas y opiniones de los otros.',
            },
            {
              text:
                'Las personas como individuos o colectivos pueden no ser capaces de reconocer y comprender a los otros y a la complejidad que los rodea, al menospreciar o ignorar el diálogo horizontal con los otros: personas, culturas, naturaleza, sociedad, ideas (Carrizosa, 2014). ',
            },
          ],
          question:
            'En este sentido, un objetivo realizable que la educación ambiental en Colombia puede contribuir es:',
          answers: [
            {
              text:
                'A. formar ciudadanos capaces de autocriticarse y de permitir la otredad, con el propósito de tener visiones más completas de lo que se observa.',
              correct: true,
            },
            {
              text:
                'B. formar ciudadanos conscientes de las implicaciones del cambio climático, para obtener beneficio propio.',
              correct: false,
            },
            {
              text:
                'C. Consolidar  regiones  capaces de autogestionarse, con el propósito de tener visiones más completas de lo que se observa.',
              correct: false,
            },
            {
              text:
                'D. Permitir al país desarrollar su soberanía alimentaria desde la visión completa de la realidad económica de las comunidades.',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text: 'Te invitamos a que mejores tu nivel de competencia.',
            },
            {
              text:
                'Revisa de nuevo la pregunta y acude al siguiente apartado de este módulo:',
            },
            {
              text: 'Definir el alcance.',
            },
          ],
          positiveFeedback: {
            stars: 5,
            totems: 3,
          },
          difficult: 5,
        },
        {
          context: [
            {
              text:
                'En la naturaleza, muchas de las interacciones son de tipo lineal de causa-efecto, pero ocurre ampliamente que aquello que en un momento es “efecto”, en el momento siguiente se traduce en “causa” (Wilches-Chaux, 2017). Un caso de relación lineal de causa-efecto y a la inversa esta en: la tala de los bosques de montaña en una zona rural aledaña a Mocoa-Putumayo y el deterioro de la capacidad de dichos bosques para prestar servicios ambientales (ver Figura 17) como mitigar el impacto de las tormentas sobre los suelos, y liberar agua gradualmente. Esto se tradujo en que el 31 de marzo de 2017, lluvias fuertes provocaran el desbordamiento de los ríos Mocoa, Mulato y Sangoyaco, como consecuencia, más de 1400 personas perdieron la vida y hubo más de 1000 damnificados y, en un plazo más largo, se ha generado el empobrecimiento de suelos y el desplazamiento de muchas de las personas afectadas.',
            },
            {
              text: 'Figura 17. ',
            },
            {
              text: 'La selva como sistema sociocultural y ecológico.',
            },
            {
              img: 'https://i.postimg.cc/HshhTQzS/img-color-5-2x-100.jpg',
            },
            {
              text:
                'Nota. Tomado y modificado de El concepto-herramienta de la seguridad territorial y la gestión de humedales (p.92), por G. Wilches-Chaux, 2017. Biodiversidad en la práctica. Documentos del trabajo del instituto Von Humbolt.',
            },
          ],
          question: 'Esta situación se explica por:',
          answers: [
            {
              text:
                'A.  los mecanismos de retroalimentación negativa existentes en todo sistema/proceso, que resultan en degradación de los servicios ecosistémicos',
              correct: false,
            },
            {
              text:
                'B. los mecanismos de retroalimentación negativa o positiva existentes en todo sistema/proceso que mantienen en desequilibrio el sistema.',
              correct: true,
            },
            {
              text:
                'C. los mecanismos de retroalimentación positiva existentes en todo sistema/proceso que facilitan la rápida recuperación del ecosistema',
              correct: false,
            },
            {
              text:
                'D. la ausencia de mecanismos de retroalimentación negativa o positiva en todo sistema/proceso.',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text: 'Te invitamos a que mejores tu nivel de competencia.',
            },
            {
              text:
                'Revisa de nuevo la pregunta y acude a la(s) siguiente(s) fuente(s)',
            },
            {
              url:
                'http://revistas.humboldt.org.co/index.php/BEP/article/view/453/442',
            },
          ],
          positiveFeedback: {
            stars: 5,
            totems: 3,
          },
          difficult: 5,
        },
        {
          context: [
            {
              text:
                'De acuerdo con la ficha técnica de un jugo de naranja, este producto debe salir al mercado con un pH de 4,0 ± 0,2. En un análisis de calidad realizado a una muestra tomada aleatoriamente de un supermercado, se encontró un pH de 3,2.',
            },
          ],
          question: 'Se puede decir con acierto que el error puede deberse a',
          answers: [
            {
              text: 'A. la pérdida de ácidos de la muestra por evaporación.',
              correct: false,
            },
            {
              text:
                'B. una entrada adicional de agua en algún momento del proceso de envasado.',
              correct: false,
            },
            {
              text:
                'C. la presencia de microorganismos fermentadores en la muestra.',
              correct: false,
            },
            {
              text: 'D. una sobre adición de ácido a la muestra.',
              correct: true,
            },
          ],
          negativeFeedback: [
            {
              text: 'Te invitamos a que mejores tu nivel de competencia.',
            },
            {
              text:
                ' Revisa de nuevo la pregunta y acude a la(s) siguiente(s) fuente(s):',
            },
            {
              url: 'https://phet.colorado.edu/es/simulation/ph-scale-basics',
            },
          ],
          positiveFeedback: {
            stars: 5,
            totems: 3,
          },
          difficult: 5,
        },
        {
          context: [
            {
              text:
                'RESPONDA LAS PREGUNTAS 11 A 13 CON AYUDA DE LA SIGUIENTE INFORMACIÓN',
            },
            {
              text: 'Propiedades nutricionales de la quinua',
            },
            {
              text:
                'La quinua (Chenopodium quinoa), es una planta que tiene su origen en los alrededores del lago Titicaca, entre Perú y Bolivia, de altas propiedades nutricionales y al parecer constituyó uno de los principales y más antiguos alimentos de la América aborigen (Bazile, Bertero & Nieto, 2014). Su fácil cultivo, junto a sus atributos alimenticios, son suficiente motivo para desarrollar un plan gubernamental con el fin de que sea ampliamente cultivada como alternativa de las poblaciones de Colombia y de otros países. La especie puede germinar y producirse bien en suelos pobres y erosionados, en cualquier piso térmico (hasta los 4000 msnm), resiste las sequías y heladas, no requiere de biocidas y tiene un alto rendimiento. Por otra parte, de la planta se utiliza todo, desde las raíces hasta su semilla, mediante las cuales se pueden preparar más de 60 fórmulas culinarias (Arias, 2017).',
            },
            {
              text:
                'Algunas de las propiedades nutricionales de su grano son que contiene aproximadamente: un 10 % de agua; un 16,5% de proteínas, con 16 aminoácidos, incluidos todos los esenciales para el ser humano; un 69 % de carbohidratos; un 6,3 % de grasas polinsaturadas (Escalante, 2019).',
            },
            {
              text: 'De acuerdo con la lectura,',
            },
          ],
          question:
            'las propiedades nutritivas y los beneficios para la salud más relevantes de la quinua, que la destacan por sobre otros alimentos son',
          answers: [
            {
              text:
                'A. algunas de las proteínas esenciales para el buen funcionamiento de los sistemas del ser humano, un mínimo porcentaje de almidón y una alta concentración de agua.',
              correct: false,
            },
            {
              text:
                'B. todas las moléculas esenciales para la construcción de las proteínas que requieren los sistemas de ser humano para su buen funcionamiento y un gran porcentaje de almidón.',
              correct: false,
            },
            {
              text:
                'C. todas las moléculas esenciales para la construcción de todas las proteínas que requiere el ser humano y grasas insaturadas como el omega 3 y 6 indispensables para el buen funcionamiento del cerebro.',
              correct: true,
            },
            {
              text:
                'D. algunas de las moléculas esenciales para la construcción de todas las proteínas necesarias para el ser humano y grasas insaturadas como el omega 3 y 6 indispensables para el buen funcionamiento del cerebro.',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text: 'Te invitamos a que mejores tu nivel de competencia.',
            },
            {
              text:
                'Revisa de nuevo la pregunta y acude a la(s) siguiente(s) fuente(s):',
            },
            {
              text: 'https://medlineplus.gov/spanish/ency/article/002222.htm',
            },
          ],
          positiveFeedback: {
            stars: 5,
            totems: 3,
          },
          difficult: 5,
        },
        {
          context: [
            {
              text: 'Desde el contexto que da la lectura,',
            },
          ],
          question:
            'uno de los principales factores culturales por el cual no es amplio el consumo de la quinua en Colombia es la:',
          answers: [
            {
              text: 'A. violencia de los siglos XX y XXI.',
              correct: false,
            },
            {
              text:
                'B. insuficiente educación que se da sobre sus beneficios a la generalidad de la población.',
              correct: true,
            },
            {
              text:
                'C. escasa financiación para su producción por parte del gobierno nacional.',
              correct: false,
            },
            {
              text:
                'D. gran demanda de recursos que se requieren para su producción.',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text: 'Te invitamos a que mejores tu nivel de competencia.',
            },
            {
              text:
                ' Revisa de nuevo la pregunta y acude a la(s) siguiente(s) fuente(s):',
            },
            {
              text: 'https://reinamares.hypotheses.org/5186',
            },
          ],
          positiveFeedback: {
            stars: 5,
            totems: 3,
          },
          difficult: 5,
        },
        {
          context: [
            {
              text:
                'Las plantas angiospermas como la quinua, también son llamadas plantas con flores y dependen de la polinización para su reproducción.',
            },
          ],
          question:
            'Para un inmenso número de angiospermas, la desaparición de las abejas:',
          answers: [
            {
              text: 'A. no acarrearía problemas significativos.',
              correct: false,
            },
            {
              text: 'B. les causaría un crecimiento débil.',
              correct: false,
            },
            {
              text: 'C. produciría frutos sin semillas',
              correct: false,
            },
            {
              text: 'D. posiblemente las conduciría a la extinción.',
              correct: true,
            },
          ],
          negativeFeedback: [
            {
              text: 'Te invitamos a que mejores tu nivel de competencia.',
            },
            {
              text:
                ' Revisa de nuevo la pregunta y acude a la(s) siguiente(s) fuente(s):',
            },
            {
              text:
                'http://agrega.educacion.es/repositorio/08042014/a2/es_2013121413_9182622/3_la_flor_el_fruto_y_las_semillas.html',
            },
          ],
          positiveFeedback: {
            stars: 5,
            totems: 3,
          },
          difficult: 5,
        },
        {
          context: [
            {
              text:
                'RESPONDA LAS PREGUNTAS 14 A 17 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN',
            },
            {
              text:
                'Esta lectura está modificada de Zuk, M. (2013), Paleofantasía: Lo que realmente nos dice la evolución sobre el sexo, la dieta y cómo vivimos. ISBN 978-0-393-08137-4 New York: W. W. Norton & Company, 2013. 328pp.',
            },
            {
              text:
                'Un guppy (Poecilia reticulata) hembra, puede alcanzar la madurez sexual a los dos meses de edad y tener sus primeros alevinos solo un mes después. Esta incansable tasa de reproducción hace que los guppies sean ideales para estudiar la tasa de evolución, y el biólogo Reznick, ha estado haciendo exactamente eso durante varias décadas.',
            },
            {
              text:
                'La gente suele pensar en los guppies como coloridos peces de acuario, ellos normalmente habitan en arroyos y ríos en lugares del trópico. Los guppies pueden experimentar diferentes tipos de condiciones, un guppy puede nacer sobre una cascada o en un conjunto de rápidos, hecho que los mantiene alejados de los peces que los depredan llamados cíclidos lucios que se encuentran en aguas más tranquilas río abajo. Como se pensaría de forma lógica, la tasa de mortalidad de los guppies, es mucho más alta en los sitios con cíclidos rapaces que en los que no los tienen.',
            },
            {
              text:
                'Reznick ha demostrado a través de experiencias de laboratorio que, los guppies de los sitios con muchos predadores maduran sexualmente cuando son más jóvenes que aquellos de los sitios libres de dichos animales. Además, cada cría individual es más pequeña que las producidas por sus contrapartes de aguas rápidas. Tales diferencias tienen sentido porque el riesgo de ser depredado es alto, poder tener crías y repartir su energía entre muchas de ellas, aumenta la probabilidad de heredar sus genes antes de morir. Distintos científicos han demostrado que estos rasgos son determinados desde su información genética y no por el ambiente en el que se desarrollan.',
            },
            {
              text:
                'Surge la siguiente pregunta: ¿qué tan rápido, mediante procesos evolutivos, pueden haberse producido estas diferencias? Debido a la gran cantidad de corrientes de agua existentes en los países tropicales, Reznick se dio cuenta de que tenía la oportunidad de "tratar los ríos como tubos de ensayo gigantes introduciendo guppies o a sus predadores", para luego observar cómo la selección natural actúa. La manipulación de la naturaleza en el hábitat real se conoce con el nombre de “evolución experimental” y se usa mucho entre los investigadores de aquellos organismos que se reproducen tan rápido como para que los científicos puedan ver resultados muy pronto. ',
            },
            {
              text:
                'Reznick y otros investigadores, colocaron grupos de guppies sin predadores en ríos por encima de las cataratas. Aunque se desarrollaron pequeños peces depredadores en estos nuevos sitios, dichos peces no presentan el peligro de los cíclidos. Luego, los científicos llevaron a los descendientes de los peces trasplantados al laboratorio para examinar su reproducción. Después de experimentar por once años, los guppies liberados en los nuevos cuerpos de agua evolucionaron a tener crías más grandes en cada camada, de la misma forma que los guppies de las corrientes que naturalmente están libres de cíclidos. Otros estudios de más investigadores con guppies han mostrado cambios evolutivos en poco más de cuatro generaciones, en el color, manchas y rayas en los machos.',
            },
            {
              text: 'De acuerdo con la lectura,',
            },
          ],
          question: 'el primer párrafo de la lectura tiene la función de',
          answers: [
            {
              text:
                'A. ofrecer un marco teórico y metodológico para el surgimiento de una nueva línea de investigación. ',
              correct: false,
            },
            {
              text:
                'B. evidenciar el valor de estudiar la descendencia de un pez en particular.',
              correct: false,
            },
            {
              text:
                'C. plantear una hipótesis en el centro de un debate científico en curso.',
              correct: false,
            },
            {
              text:
                'D. describir el motivo por el que se seleccionó una determinada especie para su investigación.',
              correct: true,
            },
          ],
          negativeFeedback: [
            {
              text: 'Te invitamos a que mejores tu nivel de competencia.',
            },
            {
              text:
                ' Revisa de nuevo la pregunta y acude a la(s) siguiente(s) fuente(s):',
            },
            {
              url: 'https://www.pnas.org/content/107/8/3616.full',
            },
          ],
          positiveFeedback: {
            stars: 5,
            totems: 3,
          },
          difficult: 5,
        },
        {
          context: [
            {
              text:
                'RESPONDA LAS PREGUNTAS 14 A 17 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN',
            },
            {
              text:
                'Esta lectura está modificada de Zuk, M. (2013), Paleofantasía: Lo que realmente nos dice la evolución sobre el sexo, la dieta y cómo vivimos. ISBN 978-0-393-08137-4 New York: W. W. Norton & Company, 2013. 328pp.',
            },
            {
              text:
                'Un guppy (Poecilia reticulata) hembra, puede alcanzar la madurez sexual a los dos meses de edad y tener sus primeros alevinos solo un mes después. Esta incansable tasa de reproducción hace que los guppies sean ideales para estudiar la tasa de evolución, y el biólogo Reznick, ha estado haciendo exactamente eso durante varias décadas.',
            },
            {
              text:
                'La gente suele pensar en los guppies como coloridos peces de acuario, ellos normalmente habitan en arroyos y ríos en lugares del trópico. Los guppies pueden experimentar diferentes tipos de condiciones, un guppy puede nacer sobre una cascada o en un conjunto de rápidos, hecho que los mantiene alejados de los peces que los depredan llamados cíclidos lucios que se encuentran en aguas más tranquilas río abajo. Como se pensaría de forma lógica, la tasa de mortalidad de los guppies, es mucho más alta en los sitios con cíclidos rapaces que en los que no los tienen.',
            },
            {
              text:
                'Reznick ha demostrado a través de experiencias de laboratorio que, los guppies de los sitios con muchos predadores maduran sexualmente cuando son más jóvenes que aquellos de los sitios libres de dichos animales. Además, cada cría individual es más pequeña que las producidas por sus contrapartes de aguas rápidas. Tales diferencias tienen sentido porque el riesgo de ser depredado es alto, poder tener crías y repartir su energía entre muchas de ellas, aumenta la probabilidad de heredar sus genes antes de morir. Distintos científicos han demostrado que estos rasgos son determinados desde su información genética y no por el ambiente en el que se desarrollan.',
            },
            {
              text:
                'Surge la siguiente pregunta: ¿qué tan rápido, mediante procesos evolutivos, pueden haberse producido estas diferencias? Debido a la gran cantidad de corrientes de agua existentes en los países tropicales, Reznick se dio cuenta de que tenía la oportunidad de "tratar los ríos como tubos de ensayo gigantes introduciendo guppies o a sus predadores", para luego observar cómo la selección natural actúa. La manipulación de la naturaleza en el hábitat real se conoce con el nombre de “evolución experimental” y se usa mucho entre los investigadores de aquellos organismos que se reproducen tan rápido como para que los científicos puedan ver resultados muy pronto. ',
            },
            {
              text:
                'Reznick y otros investigadores, colocaron grupos de guppies sin predadores en ríos por encima de las cataratas. Aunque se desarrollaron pequeños peces depredadores en estos nuevos sitios, dichos peces no presentan el peligro de los cíclidos. Luego, los científicos llevaron a los descendientes de los peces trasplantados al laboratorio para examinar su reproducción. Después de experimentar por once años, los guppies liberados en los nuevos cuerpos de agua evolucionaron a tener crías más grandes en cada camada, de la misma forma que los guppies de las corrientes que naturalmente están libres de cíclidos. Otros estudios de más investigadores con guppies han mostrado cambios evolutivos en poco más de cuatro generaciones, en el color, manchas y rayas en los machos.',
            },
            {
              text: 'Desde el contexto de la lectura,',
            },
          ],
          question:
            'en el párrafo 4, el investigador recurre a la frase "tubos de ensayo gigantes" para dar a entender que en la naturaleza algunas corrientes de agua pueden',
          answers: [
            {
              text:
                'A. ofrecer las condiciones prácticamente ideales para un desarrollo experimental.',
              correct: true,
            },
            {
              text:
                'B. aumentar las tasas de mutualismo entre especies de peces.',
              correct: false,
            },
            {
              text:
                'C. aumentar las tasas de mutación en las poblaciones de peces.',
              correct: false,
            },
            {
              text:
                'D. ayudar a entender y solucionar problemas socioambientales generalizados.',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text: 'Te invitamos a que mejores tu nivel de competencia.',
            },
            {
              text:
                ' Revisa de nuevo la pregunta y acude a la(s) siguiente(s) fuente(s):',
            },
            {
              text:
                'Párrafo 4 de la lectura modificada de Zuk (2013), Paleofantasía: Lo que realmente nos dice la evolución sobre el sexo, la dieta y cómo vivimos. ',
            },
          ],
          positiveFeedback: {
            stars: 5,
            totems: 3,
          },
        },
        {
          context: [
            {
              text:
                'RESPONDA LAS PREGUNTAS 14 A 17 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN',
            },
            {
              text:
                'Esta lectura está modificada de Zuk, M. (2013), Paleofantasía: Lo que realmente nos dice la evolución sobre el sexo, la dieta y cómo vivimos. ISBN 978-0-393-08137-4 New York: W. W. Norton & Company, 2013. 328pp.',
            },
            {
              text:
                'Un guppy (Poecilia reticulata) hembra, puede alcanzar la madurez sexual a los dos meses de edad y tener sus primeros alevinos solo un mes después. Esta incansable tasa de reproducción hace que los guppies sean ideales para estudiar la tasa de evolución, y el biólogo Reznick, ha estado haciendo exactamente eso durante varias décadas.',
            },
            {
              text:
                'La gente suele pensar en los guppies como coloridos peces de acuario, ellos normalmente habitan en arroyos y ríos en lugares del trópico. Los guppies pueden experimentar diferentes tipos de condiciones, un guppy puede nacer sobre una cascada o en un conjunto de rápidos, hecho que los mantiene alejados de los peces que los depredan llamados cíclidos lucios que se encuentran en aguas más tranquilas río abajo. Como se pensaría de forma lógica, la tasa de mortalidad de los guppies, es mucho más alta en los sitios con cíclidos rapaces que en los que no los tienen.',
            },
            {
              text:
                'Reznick ha demostrado a través de experiencias de laboratorio que, los guppies de los sitios con muchos predadores maduran sexualmente cuando son más jóvenes que aquellos de los sitios libres de dichos animales. Además, cada cría individual es más pequeña que las producidas por sus contrapartes de aguas rápidas. Tales diferencias tienen sentido porque el riesgo de ser depredado es alto, poder tener crías y repartir su energía entre muchas de ellas, aumenta la probabilidad de heredar sus genes antes de morir. Distintos científicos han demostrado que estos rasgos son determinados desde su información genética y no por el ambiente en el que se desarrollan.',
            },
            {
              text:
                'Surge la siguiente pregunta: ¿qué tan rápido, mediante procesos evolutivos, pueden haberse producido estas diferencias? Debido a la gran cantidad de corrientes de agua existentes en los países tropicales, Reznick se dio cuenta de que tenía la oportunidad de "tratar los ríos como tubos de ensayo gigantes introduciendo guppies o a sus predadores", para luego observar cómo la selección natural actúa. La manipulación de la naturaleza en el hábitat real se conoce con el nombre de “evolución experimental” y se usa mucho entre los investigadores de aquellos organismos que se reproducen tan rápido como para que los científicos puedan ver resultados muy pronto. ',
            },
            {
              text:
                'Reznick y otros investigadores, colocaron grupos de guppies sin predadores en ríos por encima de las cataratas. Aunque se desarrollaron pequeños peces depredadores en estos nuevos sitios, dichos peces no presentan el peligro de los cíclidos. Luego, los científicos llevaron a los descendientes de los peces trasplantados al laboratorio para examinar su reproducción. Después de experimentar por once años, los guppies liberados en los nuevos cuerpos de agua evolucionaron a tener crías más grandes en cada camada, de la misma forma que los guppies de las corrientes que naturalmente están libres de cíclidos. Otros estudios de más investigadores con guppies han mostrado cambios evolutivos en poco más de cuatro generaciones, en el color, manchas y rayas en los machos.',
            },
            {
              text: 'A partir del análisis de la lectura,',
            },
          ],
          question:
            'La lectura sugiere qué si Hartmann hubiera plantado algún cultivo en las dos franjas agrícolas de su experimento, el porcentaje de la superficie de cada franja cubierta con malezas sería',
          answers: [
            {
              text:
                'A. Se ha demostrado que la evolución experimental en hábitats naturales es perjudicial para las especies de los ecosistemas.',
              correct: false,
            },
            {
              text:
                'B. El nuevo sitio en el que Reznick desarrolló sus estudios de evolución experimental está habitado por peces tan depredadores para los guppies como en los lugares iniciales.',
              correct: false,
            },
            {
              text:
                'C. Los guppies examinados en otras investigaciones de diferentes científicos en distintas partes del mundo exhiben cambios en los rasgos genéticos de forma marcadamente contraria a la evidenciada por los guppies con los que Reznick trabajó.',
              correct: true,
            },
            {
              text:
                'D. Se ha demostrado que los descendientes de los peces trasplantados de Reznicks maduran más temprano que los guppies que viven en los rápidos',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text: 'Te invitamos a que mejores tu nivel de competencia.',
            },
            {
              text:
                ' Revisa de nuevo la pregunta y acude a la(s) siguiente(s) fuente(s):',
            },
            {
              text:
                'Lectura modificada de Zuk (2013), Paleofantasía: Lo que realmente nos dice la evolución sobre el sexo, la dieta y cómo vivimos.',
            },
          ],
          positiveFeedback: {
            stars: 5,
            totems: 3,
          },
          difficult: 5,
        },
        {
          context: [
            {
              text:
                'RESPONDA LAS PREGUNTAS 14 A 17 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN',
            },
            {
              text:
                'Esta lectura está modificada de Zuk, M. (2013), Paleofantasía: Lo que realmente nos dice la evolución sobre el sexo, la dieta y cómo vivimos. ISBN 978-0-393-08137-4 New York: W. W. Norton & Company, 2013. 328pp.',
            },
            {
              text:
                'Un guppy (Poecilia reticulata) hembra, puede alcanzar la madurez sexual a los dos meses de edad y tener sus primeros alevinos solo un mes después. Esta incansable tasa de reproducción hace que los guppies sean ideales para estudiar la tasa de evolución, y el biólogo Reznick, ha estado haciendo exactamente eso durante varias décadas.',
            },
            {
              text:
                'La gente suele pensar en los guppies como coloridos peces de acuario, ellos normalmente habitan en arroyos y ríos en lugares del trópico. Los guppies pueden experimentar diferentes tipos de condiciones, un guppy puede nacer sobre una cascada o en un conjunto de rápidos, hecho que los mantiene alejados de los peces que los depredan llamados cíclidos lucios que se encuentran en aguas más tranquilas río abajo. Como se pensaría de forma lógica, la tasa de mortalidad de los guppies, es mucho más alta en los sitios con cíclidos rapaces que en los que no los tienen.',
            },
            {
              text:
                'Reznick ha demostrado a través de experiencias de laboratorio que, los guppies de los sitios con muchos predadores maduran sexualmente cuando son más jóvenes que aquellos de los sitios libres de dichos animales. Además, cada cría individual es más pequeña que las producidas por sus contrapartes de aguas rápidas. Tales diferencias tienen sentido porque el riesgo de ser depredado es alto, poder tener crías y repartir su energía entre muchas de ellas, aumenta la probabilidad de heredar sus genes antes de morir. Distintos científicos han demostrado que estos rasgos son determinados desde su información genética y no por el ambiente en el que se desarrollan.',
            },
            {
              text:
                'Surge la siguiente pregunta: ¿qué tan rápido, mediante procesos evolutivos, pueden haberse producido estas diferencias? Debido a la gran cantidad de corrientes de agua existentes en los países tropicales, Reznick se dio cuenta de que tenía la oportunidad de "tratar los ríos como tubos de ensayo gigantes introduciendo guppies o a sus predadores", para luego observar cómo la selección natural actúa. La manipulación de la naturaleza en el hábitat real se conoce con el nombre de “evolución experimental” y se usa mucho entre los investigadores de aquellos organismos que se reproducen tan rápido como para que los científicos puedan ver resultados muy pronto. ',
            },
            {
              text:
                'Reznick y otros investigadores, colocaron grupos de guppies sin predadores en ríos por encima de las cataratas. Aunque se desarrollaron pequeños peces depredadores en estos nuevos sitios, dichos peces no presentan el peligro de los cíclidos. Luego, los científicos llevaron a los descendientes de los peces trasplantados al laboratorio para examinar su reproducción. Después de experimentar por once años, los guppies liberados en los nuevos cuerpos de agua evolucionaron a tener crías más grandes en cada camada, de la misma forma que los guppies de las corrientes que naturalmente están libres de cíclidos. Otros estudios de más investigadores con guppies han mostrado cambios evolutivos en poco más de cuatro generaciones, en el color, manchas y rayas en los machos.',
            },
            {
              text: 'Desde el recorrido que se puede hacer del texto,',
            },
          ],
          question:
            'se puede inferir más razonablemente que los experimentos de Reznick han demostrado que los guppies',
          answers: [
            {
              text:
                'A. de las aguas tranquilas evolucionan más lento que los de aguas tormentosas como los que habitan rápidos.',
              correct: false,
            },
            {
              text:
                'B. son depredados principalmente por peces más peligrosos que los cíclidos.',
              correct: false,
            },
            {
              text:
                'C. prosperan mejor en aguas tranquilas debajo de cascadas que en corrientes calmadas sobre las cataratas.',
              correct: false,
            },
            {
              text:
                'D. son más fáciles de investigar en un entorno natural que en un laboratorio.',
              correct: true,
            },
          ],
          negativeFeedback: [
            {
              text: 'Te invitamos a que mejores tu nivel de competencia.',
            },
            {
              text:
                ' Revisa de nuevo la pregunta y acude a la(s) siguiente(s) fuente(s):',
            },
            {
              url:
                'http://ayura.udea.edu.co:8080/jspui/bitstream/123456789/2943/1/CardonaJuan_2011_enseñanzaaprendizaje.pdf',
            },
          ],
          positiveFeedback: {
            stars: 5,
            totems: 3,
          },
          difficult: 5,
        },
        {
          context: [
            {
              text: 'De acuerdo a los datos de la Tabla 1, ',
            },
          ],
          question:
            'se puede inferir que las tasas de descendientes de guppies en entornos de alta predación nos indican que estos peces se ubican en corrientes',
          answers: [
            {
              text: 'A. tranquilas arriba de las cascadas.',
              correct: false,
            },
            {
              text: 'B. preferiblemente rápidas y tormentosas.',
              correct: false,
            },
            {
              text: 'C. tranquilas por debajo de las cascadas.',
              correct: false,
            },
            {
              text: 'D. tranquilas abajo o arriba de las cascadas.',
              correct: true,
            },
          ],
          negativeFeedback: [
            {
              text: 'Te invitamos a que mejores tu nivel de competencia.',
            },
            {
              text:
                ' Revisa de nuevo la pregunta y acude a la(s) siguiente(s) fuente(s):',
            },
            {
              text: 'La Tabla 1.',
            },
          ],
          positiveFeedback: {
            stars: 5,
            totems: 3,
          },
          difficult: 5,
        },
        {
          context: [
            {
              text: 'A partir de la Tabla 2,',
            },
          ],
          question: 'se puede concluir que la masa embrionaria de los guppies:',
          answers: [
            {
              text: 'A. depende de la orientación de la ladera.',
              correct: false,
            },
            {
              text: 'B. depende más del nivel de predación.',
              correct: true,
            },
            {
              text: 'C. depende de los niveles de predación y de la pendiente',
              correct: false,
            },
            {
              text:
                'D. nacidos en ambientes de baja depredación es menor que en los de alta.',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text: 'Te invitamos a que mejores tu nivel de competencia.',
            },
            {
              text:
                ' Revisa de nuevo la pregunta y acude a la(s) siguiente(s) fuente(s):',
            },
            {
              text: 'La Tabla 2.',
            },
          ],
          positiveFeedback: {
            stars: 5,
            totems: 3,
          },
          difficult: 5,
        },
        {
          context: [
            {
              text: 'Los datos de las Tablas 1 y 2,',
            },
          ],
          question:
            'apoyan la predicción de que en comparación con los guppies de corrientes de bajas tasas de predación, los de entornos de alta depredación tienen más probabilidades de tener',
          answers: [
            {
              text:
                'A. mayor descendencia y de alcanzar la madurez completa de forma temprana.',
              correct: true,
            },
            {
              text:
                'B. menor descendencia y de alcanzar la madurez completa de forma temprana.',
              correct: false,
            },
            {
              text:
                'C. menor descendencia y de alcanzar la madurez completa de forma tardía',
              correct: false,
            },
            {
              text:
                'D. mayor descendencia y de alcanzar la madurez completa de forma tardía.',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text: 'Te invitamos a que mejores tu nivel de competencia.',
            },
            {
              text:
                ' Revisa de nuevo la pregunta y acude a la(s) siguiente(s) fuente(s):',
            },
            {
              text: 'Las tablas 1 y 2',
            },
          ],
          positiveFeedback: {
            stars: 5,
            totems: 3,
          },
          difficult: 5,
        },
      ],
    },
    competenciasCiudadanas: {
      10: [
        {
          context: [
            {
              text:
                'Dentro del territorio colombiano existe la presencia de grupos al margen de la ley, concentrándose la mayoría de ellos en regiones como: el departamento de Arauca, la región del Catatumbo, el sur de Bolívar y en sí la zona del Magdalena Medio. En dichos sectores son constantes los enfrentamientos armados entre los paramilitares y los grupos guerrilleros, además de los hostigamientos a bases militares y policiales, sin dejar de lado el forzoso desplazamiento de miembros de la sociedad civil, ajenos al conflicto, hacia las ciudades y cabeceras municipales en busca de un mejor ambiente de vida.',
            },
          ],
          question:
            'A partir de lo anterior, podemos afirmar que una consecuencia de carácter social dejada por esta problemática puede sintetizarse en:',
          answers: [
            {
              text:
                'a.	Falta de una presencia Estatal adecuada y efectiva en las regiones afectadas.',
              correct: false,
            },
            {
              text: 'b.	La ruptura del tejido social y el desarraigo.',
              correct: true,
            },
            {
              text:
                'c.	El desarraigo del terruño y la pérdida de los recursos naturales de coexistencia.',
              correct: false,
            },
            {
              text:
                'd.	El favorecimiento de generar latifundios en dichas zonas, aumentando el poder de los gamonales locales',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              url:
                'https://www.peacebrigades.org/fileadmin/user_files/projects/colombia_formacion/files/Doc umentos/Desplazamiento/desplazamiento-miedo.pdf ',
            },
            {
              text:
                'Desplazamiento forzado en Colombia. El miedo: un eje transversal del éxodo y de la lucha por la  ciudadanía',
            },
            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 2.5,
            totems: 5,
          },
          difficult: 2.5,
        },
        {
          context: [
            {
              text:
                'Las guerrillas de los años 50 sustentaban parte de su poder en la utilización de las armas, el terror que inspiraban y en el hecho de que cierto sector de la población colaboraba porque administraban justica, es decir, ejercían la autoridad. En la actualidad estos tres elementos siguen presentes en zonas de conflicto armado del país.',
            },
          ],
          question: 'Esta situación podría cambiar',
          answers: [
            {
              text:
                'a.	Con una gestión real del Estado y una mayor participación política que le dé legitimidad.',
              correct: true,
            },
            {
              text:
                'b.	Armando la población civil que está en alto riesgo de ser manipulada por grupos armados.',
              correct: false,
            },
            {
              text:
                'c.	Reduciendo el comercio ilegal de armas para que no lleguen a manos de grupos ilegales. ',
              correct: false,
            },
            {
              text:
                'd.	Creando más batallones militares en sitios estratégicos que impidan la confrontación de estos grupos.',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text:
                'Ver módulo fase interactiva: La participación ciudadana como garantía de estabilidad, paz y convivencia.',
            },
          ],
          positiveFeedback: {
            stars: 2.5,
            totems: 3,
          },
          difficult: 2.5,
        },
        {
          context: [
            {
              text:
                'Según los analistas, la violencia se puede clasificar en tres categorías: violencia política: que hace la referencia a la comisión de actos violentos motivada por un deseo, consciente o inconsciente, de mantener el poder político; violencia económica, referida a la comisión de actos violentos motivada por un deseo, consciente o inconsciente, de obtener ganancias económicas o de mantener el poder económico; y violencia social, que tiene que ver con la comisión de actos violento motivada por un deseo, inconsciente o consciente, de obtener ganancias sociales, o de obtener o mantener el poder social (Caroline Moser, Marco Conceptual para la reducción de la violencia. Banco mundial, 1999).',
            },
          ],
          question:
            'Con base en la anterior clasificación, se puede decir que es expresión de violencia política',
          answers: [
            {
              text: 'a.	El narcotráfico.',
              correct: false,
            },
            {
              text: 'b.	El secuestro de cualquier índole.',
              correct: false,
            },
            {
              text: 'c.	El conflicto guerrillero.',
              correct: true,
            },
            {
              text: 'd.	La corrupción.',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text:
                'Ver módulo fase interactiva: La participación ciudadana como garantía de estabilidad, paz y convivencia.',
            },
          ],
          positiveFeedback: {
            stars: 2.5,
            totems: 3,
          },
          difficult: 2.5,
        },
        {
          context: [
            {
              text:
                'El periodo comprendido entre 1946 y 1958 se le denominó “la Violencia”. Se calcula que uno dos millones de colombianos tuvieron que abandonar sus hogares y sus tierras por la persecución política y los ajusticiamientos masivos. Desde entonces los estallidos periódicos de violencia han ocasionado nuevas oleadas de “desplazamiento”.',
            },
          ],
          question:
            'Según lo anterior, la principal causa de este tipo de desplazamiento forzado interno es:',
          answers: [
            {
              text: 'a.	La ausencia de oportunidades de trabajo estable.',
              correct: false,
            },
            {
              text: 'b.	La necesidad de proteger la vida propia.',
              correct: true,
            },
            {
              text: 'c.	La búsqueda de una mejor calidad de vida.',
              correct: false,
            },
            {
              text: 'd.	La desaparición de minifundio como zona productiva.',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              url:
                'https://www.peacebrigades.org/fileadmin/user_files/projects/colombia_formacion/files/D ocumentos/Desplazamiento/desplazamiento-miedo.pdf ',
            },
            {
              text:
                'Desplazamiento forzado en Colombia. El miedo: un eje transversal del éxodo y de la lucha por la ciudadanía',
            },
            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 2.5,
            totems: 3,
          },
          diffocult: 2.5,
        },
        {
          context: [
            {
              text:
                'El desplazamiento forzado como fenómeno social es uno de los problemas que afecta profundamente a Colombia. Miles de personas se ven obligadas a abandonar su tierra, hogar, permanencias, redes sociales y a romper de manera abrupta con su historia y su tradición. Esta situación conlleva pérdidas irreparables, tanto en el círculo familiar como en el colectivo.  .',
            },
          ],
          question:
            'La principal consecuencia de este fenómeno para el desplazamiento es',
          answers: [
            {
              text:
                'a.	La erosión del sentido de pertenencia y resquebrajamiento de la identidad',
              correct: false,
            },
            {
              text:
                'b.	La ausencia de vivienda digna y tierra propia para establecerse. ',
              correct: false,
            },
            {
              text: 'c.	La pérdida o anulación de la dignidad humana ',
              correct: true,
            },
            {
              text:
                'd.	Deterioro de su calidad de vida y la imposibilidad de sobrevivir.',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              url:
                'https://www.peacebrigades.org/fileadmin/user_files/projects/colombia_formacion/files/Documentos/Desplazamiento/desplazamiento-miedo.pdf ',
            },
            {
              text:
                'Desplazamiento forzado en Colombia. El miedo: un eje transversal del éxodo y de la lucha por la ciudadanía',
            },
            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 5,
            totems: 3,
          },
          difficult: 5,
        },
        {
          context: [
            {
              text:
                'Daniel Pécaut y Malcom Deas han coincidido en el hecho de que las limitaciones impuestas a la oposición política durante el periodo del frente nacional caracterizado por el bipartidismo (1958-1974), dejaron como única alternativa la lucha armada.',
            },
          ],
          question:
            'Según lo anterior se puede afirmar que ésta pudo haber sido la única alternativa a tomar por los sujetos que estaban en oposición porque:',
          answers: [
            {
              text:
                'a.	La vía armada garantizaba tener una oposición deliberante y romper con el bipartidismo. ',
              correct: false,
            },
            {
              text:
                'b.	El régimen político colombiano se caracterizaba por ser excluyente y cerrado. ',
              correct: true,
            },
            {
              text:
                'c.	La precariedad del estado impedía satisfacer las necesidades básicas de la población.',
              correct: false,
            },
            {
              text:
                'd.	La vía armada garantizaba la participación del ciudadano en las decisiones del estado.',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text:
                'Ver módulo fase interactiva: la participación ciudadana como garantía de estabilidad, paz y convivencia.',
            },
          ],
          positiveFeedback: {
            stars: 2.5,
            totems: 3,
          },
          difficult: 2.5,
        },
        {
          context: [
            {
              text:
                'Desde mediados de los años 1980 la violencia se incrementó en las zonas rurales por la expansión del narcotráfico. La masiva compra de fincas por parte de los traficantes de drogas en zonas de ganadería extensiva y de expansión de la frontera agrícola ha traído consigo el surgimiento de grupos armados privados que le han disputado a la guerrilla su poder local y han desplazado grandes volúmenes de población pobre hacia zonas urbanas. ',
            },
          ],
          question: 'Una explicación de lo anterior es que',
          answers: [
            {
              text:
                'a.	La población desplazada se dedicaba fundamentalmente a la ganadería extensiva. ',
              correct: false,
            },
            {
              text:
                'b.	Los grupos armados privados dependen de los narcotraficantes para financiarse.',
              correct: true,
            },
            {
              text:
                'c.	La guerrilla controlaba territorialmente las zonas de expansión de la frontera agrícola y de la ganadería extensiva.',
              correct: false,
            },
            {
              text:
                'd.	Antes de la presencia del narcotráfico los campesinos se ubicaron en zonas de expansión de la frontera. ',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text:
                'ROCHA GARCÍA, RICARDO (2001). Antecedentes y perspectivas del narcotráfico en Colombia: una mirada a las políticas. Problemas del Desarrollo. Revista Latinoamericana de Economía, 32(126),59-109.[fecha de Consulta 28 de Marzo de 2021]. ISSN: 0301-7036. Disponible en:',
            },
            {
              url: 'https://www.redalyc.org/articulo.oa?id=11820094004 ',
            },
            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 7.5,
            totems: 3,
          },
          difficult: 7.5,
        },
        {
          context: [
            {
              text:
                'No todos los habitantes de un territorio pertenecen a la nación y, aun los que sí pertenecen a ella, no lo hacen en condiciones de igualdad.',
            },
          ],
          question: 'Esto significa que',
          answers: [
            {
              text:
                'a.	El proceso de imaginación de la nación no es igual en todas partes.',
              correct: false,
            },
            {
              text:
                'b.	Existen grupos culturales que son absorbidos por las imposiciones de otros.',
              correct: false,
            },
            {
              text:
                'c.	La comunidad de iguales se fracturó entre los de “arriba y los de abajo”.',
              correct: false,
            },
            {
              text:
                'd.	La nación es imaginada de manera selectiva, olvidando ciertas historias.',
              correct: true,
            },
          ],
          negativeFeedback: [
            {
              text:
                'Fase preactiva: participación ciudadana para la resolución de conflictos y la construcción de paz',
            },
          ],
          positiveFeedback: {
            stars: 7.5,
            totems: 3,
          },
          difficult: 7.5,
        },
        {
          context: [
            {
              text:
                'Los actores de la violencia en Colombia no se comportan de manera uniforme lo cual hace muy difícil ubicar en un solo contexto sus motivos de acción. Si los narcotraficantes corrompen al Estado se convierten en actores políticos, sí la guerrilla cuida laboratorios de drogas, pierde o al menos desdibuja su carácter político.',
            },
          ],
          question:
            'Se podría decir que esta situación tiene como consecuencia la',
          answers: [
            {
              text:
                'a.	Dificultad de encontrar los móviles reales de las muertes violentas.',
              correct: false,
            },
            {
              text:
                'b.	Falta de claridad para definir el carácter de la violencia política.',
              correct: false,
            },
            {
              text:
                'c.	Ambigüedad de carácter político del conflicto en relación con sus móviles.',
              correct: false,
            },
            {
              text:
                'd.	Pérdida de carácter político del conflicto armado en Colombia.',
              correct: true,
            },
          ],
          negativeFeedback: [
            {
              text:
                'Estándar general: participo constructivamente en iniciativas o proyectos a favor de la no-violencia en el nivel local o global.',
            },
          ],
          positiveFeedback: {
            stars: 5,
            totems: 3,
          },
          difficult: 5,
        },
        {
          context: [
            {
              text:
                'La violencia física contra la mujer se produce tanto en hogares de estrato socioeconómicos bajos como altos, involucrando a personas con altos grados de escolaridad y con escaso nivel de educación formal.',
            },
          ],
          question: 'Esta situación evidencia que',
          answers: [
            {
              text:
                'a.	La violencia contra la mujer se presenta en todas las clases sociales.',
              correct: true,
            },
            {
              text:
                'b.	Hay temor de denunciar los casos de maltrato en el hogar. ',
              correct: false,
            },
            {
              text:
                'c.	La violencia física tiene relación directa con la psicológica. ',
              correct: false,
            },
            {
              text:
                'd.	Las mujeres no tienen la suficiente fuerza física para atacar al hombre.',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              url:
                'https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/INEC/INV/7%20-%20VIOLENCIA%20CONTRA%20LAS%20MUJERES%20EN%20COLOMBIA.pdf',
            },
            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 2.5,
            totems: 3,
          },
          difficult: 2.5,
        },
        {
          context: [
            {
              text:
                'Colombia, por ser un Estado social de derecho constitucional, se caracteriza por su división y control recíproco entre los poderes públicos. ',
            },
          ],
          question:
            '¿Cuál de las siguientes decisiones sería una acción en contra del principio de equilibrio de poderes y por qué? ',
          answers: [
            {
              text:
                'a.	Que el presidente anunciara el cierre del Congreso, porque sería injerencia del Poder Ejecutivo en el Legislativo.',
              correct: true,
            },
            {
              text:
                'b.	Que el presidente decidiera las principales políticas de seguridad en el país, porque esto es potestad del poder Legislativo.',
              correct: false,
            },
            {
              text:
                'c.	Que la Corte Constitucional revisara si los decretos presidenciales cumplen con la Constitución, porque esto no hace parte de las funciones del Poder Judicial. ',
              correct: false,
            },
            {
              text:
                'd.	Que el Congreso de la República discutiera y aprobara leyes sobre el sistema educativo del país, pues esto no hace parte de las funciones del Poder Legislativo.',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text:
                'Fase interactiva: La participación ciudadana como garantía de estabilidad, paz y convivencia.',
            },
          ],
          positiveFeedback: {
            stars: 5,
            totems: 3,
          },
          difficult: 5,
        },
        {
          context: [
            {
              text:
                '“A la casa yo no entro, me arreglo, pero no me quedo porque mi padrastro está allí… Hay veces que pasan cosas, pero ¡ah! Para mí es igual hacer el bien que hacer el mal, porque robar es como un trabajo, ¿no? Porque se está ahí es ganando alguna cosa. Realmente uno roba para la droga, no roba para bien…, entonces, uno hace maldad completa, lo que yo hago a veces me gusta, a veces me siento mal. Las hago y después las pienso” (Violencia en la escuela – Secretaria de Educación Distrital).',
            },
          ],
          question:
            'Ante las pandillas, la sociedad parece indolente, se angustia por el fenómeno mismo, pero es muy poco lo que hace por solucionarlo, por eso sería bueno que',
          answers: [
            {
              text:
                'a.	La escuela asumiera una actitud diferente frente al pandillero, no de aceptación sino de un proceso de cambio para que acepten las normas sociales. ',
              correct: false,
            },
            {
              text:
                'b.	El Estado asumiera un mayor compromiso con las comunidades marginales urbanas.',
              correct: true,
            },
            {
              text:
                'c.	Se crearan instituciones educativas para esta problemática social. Centralizando problemas se centralizan las soluciones.',
              correct: false,
            },
            {
              text:
                'd.	Se separe a los jóvenes de su núcleo familiar y trabajar con ellos en instituciones especializadas.',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text:
                'Fase interactiva: La participación ciudadana como garantía de estabilidad, paz y convivencia.',
            },
          ],
          positiveFeedback: {
            stars: 5,
            totems: 3,
          },
          difficult: 5,
        },
        {
          context: [
            {
              text:
                'A instancias de los grupos alzados en armas se viene presentando en la actualidad la fragmentación geopolítica del Estado colombiano. Los territorios cedidos a la guerrilla salen del dominio del Estado generando incertidumbre sobre la unidad política nacional. ',
            },
          ],
          question:
            'Desde la concepción del Estado moderno esta situación dificulta',
          answers: [
            {
              text:
                'a.	El principio de que Colombia es una sociedad multiétnica.',
              correct: false,
            },
            {
              text:
                'b.	Concebir la pluriculturalidad como una condición para la construcción de la nación. ',
              correct: false,
            },
            {
              text:
                'c.	La construcción de la unidad política administrativa colombiana.',
              correct: true,
            },
            {
              text:
                'd.	La posibilidad de articular lo diferente a lo común de la funcionabilidad política. ',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text:
                'Fase interactiva: La participación ciudadana como garantía de estabilidad, paz y convivencia.',
            },
          ],
          positiveFeedback: {
            stars: 5,
            totems: 3,
          },
          difficult: 5,
        },
        {
          context: [
            {
              text:
                'El Frente Nacional concebido como un acuerdo político entre las elites de los partidos tradicionales de Colombia, dirigió los destinos políticos de Colombia durante 16 años periodo en el cual se alternaron en el poder liberales y conservadores. ',
            },
          ],
          question: 'Esta práctica implico para el país',
          answers: [
            {
              text:
                'a.	La exclusión radical de toda propuesta política diferente a los partidos tradicionales. ',
              correct: true,
            },
            {
              text:
                'b.	La desaparición total de la práctica de la democracia participativa.',
              correct: false,
            },
            {
              text: 'c.	La ausencia de elecciones populares.',
              correct: false,
            },
            {
              text:
                'd.	La ausencia de elecciones populares lo cual limitó las costumbres políticas. ',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text:
                'Ver módulo fase interactiva: la participación ciudadana como garantía de estabilidad, paz y convivencia.',
            },
          ],
          positiveFeedback: {
            stars: 7.5,
            totems: 3,
          },
          difficult: 7.5,
        },
        {
          context: [
            {
              text:
                '“Los desplazados por violencia en Colombia son en su mayoría mujeres y menores de edad provenientes del campo que se ubican en zonas marginales urbanas de ciudades grandes e intermedias y en zonas y áreas metropolitanas. Los desplazados enfrentan un dramático deterioro de su calidad de vida, pero prefieren en su mayoría quedarse donde están ante la persistencia de los fenómenos de violencia en sus regiones de origen” (UNICEF- Colombia 1999). ',
            },
          ],
          question:
            'Los principales actores armados que originan el desplazamiento en nuestro país presentan como característica central',
          answers: [
            {
              text:
                'a.	Una presión sobre la población civil urbana originando terrorismo y tensión a nivel político. ',
              correct: false,
            },
            {
              text:
                'b.	Un conflicto a nivel económico-político por el dominio de territorios. ',
              correct: false,
            },
            {
              text:
                'c.	El desalojo de la población civil como mecanismo de presión al gobierno frente a sus intereses. ',
              correct: true,
            },
            {
              text:
                'd.	El fuego cruzado entre actores armados para la consecución del poder político en Colombia.',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text:
                'Ver módulo fase interactiva: la participación ciudadana como garantía de estabilidad, paz y convivencia.',
            },
          ],
          positiveFeedback: {
            stars: 7.5,
            totems: 3,
          },
          difficult: 7.5,
        },
        {
          context: [
            {
              text:
                'Dentro del gráfico la información como otros actores armados responsables del desplazamiento en Colombia, los entrevistados se referían al “miedo”, que si bien es cierto no es un actor armado, sí resume las preocupaciones, tensiones y angustias de la población en situación de desplazamiento. Otras respuestas como “desconocidos”, “violencia”, tienen relación con el temor de los desplazados de identificar a un actor armado o el desconocimiento real de la identidad de las personas que provocaron la huida.',
            },
            {
              img: 'https://i.postimg.cc/c1YzdK2Z/IMG-COMPCIUD-10-PG43-2x.png',
            },
          ],
          question:
            'Teniendo en cuenta las características de nuestro país, este porcentaje de “otros” incluye:',
          answers: [
            {
              text:
                'a.	Una preocupante tendencia a resolver cualquier desavenencia familiar o social mediante el uso de la fuerza o la intimidación.',
              correct: true,
            },
            {
              text:
                'b.	Un crecimiento del narcotráfico como recurso de guerra de los grupos armados ilegales.',
              correct: false,
            },
            {
              text:
                'c.	La intervención de las fuerzas militares del Estado que ingresan a zonas anteriormente dominadas por la guerrilla o los paramilitares.',
              correct: false,
            },
            {
              text:
                'd.	La intervención de las milicias urbanas como actor mayoritario de los desplazamientos en el país.',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              url:
                'https://www.peacebrigades.org/fileadmin/user_files/projects/colombia_formacion/files/D ocumentos/Desplazamiento/desplazamiento-miedo.pdf ',
            },
            {
              text:
                'Desplazamiento forzado en Colombia. El miedo: un eje transversal del éxodo y de la lucha por la ciudadanía',
            },
            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 7.5,
            totems: 3,
          },
          difficult: 7.5,
        },
        {
          context: [
            {
              text:
                '“En cuanto a las formas de desplazamiento en el año 2000, se registraron 315.384 personas, de las cuales el 42% fue de tipo unifamiliar, el 10% de tipo individual, el 22% colectivo disperso y el 12% como éxodos organizados. Al comparar los primeros trimestres del 2000 y 2001 se comprobó que este último año se incrementó el desplazamiento en un 60% con relación al año anterior, especialmente los referentes a los éxodos masivos” (Grupo de apoyo a organizaciones de desplazados. 2001). ',
            },
          ],
          question:
            'Algunas de las soluciones a las migraciones forzadas puede ser el',
          answers: [
            {
              text:
                'a.	Propiciar diálogos regionales debido a que las problemáticas en las diferentes zonas del país tienen características especiales que merecen soluciones particulares. ',
              correct: true,
            },
            {
              text:
                'b.	Fortalecer las medidas de protección por parte de la fuerza pública y autoridades gubernamentales, y que se trata de hechos públicos.',
              correct: false,
            },
            {
              text:
                'c.	Respetar los derechos humanos por parte de los actores gubernamentales de la región. ',
              correct: false,
            },
            {
              text:
                'd.	Llevar a cabo una reforma agraria que propicie la distribución de tierras aptas para la agricultura y ganadería.',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              url:
                'https://www.peacebrigades.org/fileadmin/user_files/projects/colombia_formacion/files/Documentos/Desplazamiento/desplazamiento-miedo.pdf',
            },
            {
              text:
                'Desplazamiento forzado en Colombia. El miedo: un eje transversal del éxodo y de la lucha por la ciudadanía',
            },
            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 5,
            totems: 3,
          },
          difficult: 5,
        },
        {
          context: [
            {
              text:
                'En el país de los “murciélagos” estos deciden organizarse y conformar una sociedad que garantice el pleno uso de la libertad para que todos los miembros puedan satisfacer sus necesidades básicas y construir así la felicidad. ',
            },
          ],
          question:
            'Un grupo de murciélagos decide marginarse de este movimiento invocando el derecho a la autodeterminación, por cuanto es correcto afirmar',
          answers: [
            {
              text:
                'a.	Los murciélagos pueden renunciar voluntariamente a su felicidad.',
              correct: false,
            },
            {
              text:
                'b.	El grupo de murciélagos disidente faltó al principio de participación democrática para establecer el consenso. ',
              correct: false,
            },
            {
              text:
                'c.	En toda la sociedad existe indeseables que no entienden la abnegada lucha por el bienestar. ',
              correct: false,
            },
            {
              text:
                'd.	La diversidad de opinión y de acción es un rasgo común en las sociedades democráticas.',
              correct: true,
            },
          ],
          negativeFeedback: [
            {
              text:
                'Ver módulo fase interactiva: la participación ciudadana como garantía de estabilidad, paz y convivencia.',
            },
          ],
          positiveFeedback: {
            stars: 5,
            totems: 3,
          },
          difficult: 5,
        },
        {
          context: [
            {
              text:
                'La Costa Pacífica colombiana está particularmente habitada por población de raza afro americana, sus condiciones de vida son muy precarias. ',
            },
          ],
          question:
            'Esta situación de poco desarrollo es originada principalmente por ',
          answers: [
            {
              text:
                'a.	La preocupación de sus habitantes por conservar sus raíces culturales.  	',
              correct: false,
            },
            {
              text:
                'b.	La poca atención que el gobierno central brinda a la región. ',
              correct: true,
            },
            {
              text:
                'c.	Falta de acceso al agua potable, como uno de los derechos humanos fundamentales.',
              correct: false,
            },
            {
              text:
                'd.	Un clima lluvioso poco adecuado para el desarrollo agrícola e industrial. ',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text:
                'Ver módulo fase interactiva: la participación ciudadana como garantía de estabilidad, paz y convivencia.',
            },
          ],
          positiveFeedback: {
            stars: 7.5,
            totems: 3,
          },
          difficult: 7.5,
        },
        {
          context: [
            {
              text:
                '“En Colombia sólo un pequeño porcentaje del total de delitos cometidos se denuncia a las autoridades: en 1985 esta cifra fue de 30%, en 1991 26% y en 1995 alcanzó el 31%, según la información de la encuesta hogares. Sólo un 23% de los crímenes denunciados entra a la etapa final del proceso penal y es sobre éstos que se dictaminan las sentencias. Así, a pesar de que el código Penal estipule penas y sanciones para los delincuentes, el crimen se expande, alentado por el regazo y la lenta efectividad de las sanciones judiciales para aplicar justicia”. ',
            },
          ],
          question: 'Del texto anterior se podría inferir que',
          answers: [
            {
              text:
                'a.	El aumento de las tasas de criminalidad está directa y exclusivamente relacionado con la falta de monopolio de la fuerza por parte del Estado. ',
              correct: false,
            },
            {
              text:
                'b.	Mientras el sistema de justicia sea ineficaz y consagre la impunidad, se estimular á el crecimiento de la delincuencia. ',
              correct: true,
            },
            {
              text:
                'c.	La única solución para bajar los índices de criminalidad es la creación de leyes y castigos más eficientes frente a los delincuentes. ',
              correct: false,
            },
            {
              text:
                'd.	Las altas tasas de criminalidad son el resultado de la falta de confianza de los ciudadanos en el Estado.',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text:
                'Ver módulo fase interactiva: la participación ciudadana como garantía de estabilidad, paz y convivencia.',
            },
          ],
          positiveFeedback: {
            stars: 5,
            totems: 3,
          },
          difficult: 5,
        },
      ],
      11: [
        {
          context: [
            {
              text:
                'Responder a la pregunta de acuerdo con los siguientes textos que se refieren a la posición de diferentes actores sobre la construcción del Puerto Tribugá en el departamento del Chocó.',
            },
            {
              text: 'Postura 1:',
            },
            {
              text:
                '“Desde hace décadas se viene explorando la posibilidad de la construcción del Puerto de Tribugá, un proyecto que actualmente tiene en la mira al municipio de Nuquí, perteneciente al departamento del Chocó, lugar donde se desarrollaría esta mega obra, que no solo obedece a un puerto de aguas profundas, sino a un paquete de obras que le cambiaría no solo la cara a la región, sino a todo un país. ',
            },
            {
              text:
                'Para la Junta  Directiva del ente cameral, con este proyecto, que se desarrollará por primera vez en el país, bajo el concepto de “Ciudad Puerto” no sólo se brindarán alternativas económicas adicionales para la población, sino que se potencializarán los sectores turístico, pesquero y agrícola, actual base de la subsistencia de la población Nuquiseña, que tanto se ha visto afectada por los bajos ingresos económicos en temporadas bajas, las cuales corresponden, a casi el 75% del año (Fuente: Cámara de Comercio del Chocó (sf). Puerto de Tribugá: sostenibilidad ambiental y desarrollo económico, no son expresiones antagónicas sino compatibles. ',
            },
            {
              url:
                'https://www.camarachoco.org.co/noticias/puerto-de-tribuga-sostenibilidad-ambiental-y-desarrollo-economico-no-son-expresiones-antagonicas-sino-compatibles)',
            },
            {
              text: 'Postura 2:',
            },
            {
              text:
                'Catalina Ortiz, Representante a la Cámara por el partido Verde advierte "de graves daños ambientales" si se construye el Puerto de Tribugá en el Chocó, tal como se aprobó en el Plan Nacional de Desarrollo. ',
            },
            {
              text:
                '"Varios partidos políticos hemos fijado nuestra posición en contra de que se construya Puerto Tribugá, un puerto planeado de aguas profundas en el norte del Pacífico, concretamente en Chocó. Para hacer esta obra, es necesario hacer una carretera en medio de la selva pasando por la Serranía del Baudó, habría que destruir la mitad del manglar de Chocó y acabar con la visita de 1.500 ballenas al año", aseguró. ',
            },
            {
              text:
                'Para Ortiz, el país no necesita la construcción de este puerto, dada que "es mucho más eficiente invertir en el puerto actual de Buenaventura, incluso en los demás puertos que tiene Colombia que hacer uno nuevo" (Morales C. (02 Mayo 2019). RCN Radio. Advierten grave daño ambiental si se construye Puerto Tribugá (Chocó). ',
            },
            {
              url:
                'https://www.rcnradio.com/colombia/pacifico/advierten-grave-dano-ambiental-si-se-construye-puerto-tribuga-choco)',
            },
          ],
          question:
            'De acuerdo con las dos posturas, se puede inferir que el conflicto de intereses entre las partes es entre',
          answers: [
            {
              text:
                'a.	Promover el desarrollo del departamento y cuidar el medio ambiente',
              correct: true,
            },
            {
              text: 'b.	La Cámara de Comercio del Chocó y el Partido Verde',
              correct: false,
            },
            {
              text:
                'c.	Promover el turismo en la región e invertir en el puerto actual de Buenaventura.',
              correct: false,
            },
            {
              text: 'd.	Promover la pesca y cuidar el medio ambiente.',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text: 'Ver módulo fase preactiva.',
            },
          ],
          positiveFeedback: {
            stars: 2.5,
            totems: 5,
          },
          difficult: 2.5,
        },
        {
          context: [
            {
              text:
                'Responder a la pregunta de acuerdo con los siguientes textos que se refieren a la posición de diferentes actores sobre la construcción del Puerto Tribugá en el departamento del Chocó.',
            },
            {
              text: 'Postura 1:',
            },
            {
              text:
                '“Desde hace décadas se viene explorando la posibilidad de la construcción del Puerto de Tribugá, un proyecto que actualmente tiene en la mira al municipio de Nuquí, perteneciente al departamento del Chocó, lugar donde se desarrollaría esta mega obra, que no solo obedece a un puerto de aguas profundas, sino a un paquete de obras que le cambiaría no solo la cara a la región, sino a todo un país. ',
            },
            {
              text:
                'Para la Junta  Directiva del ente cameral, con este proyecto, que se desarrollará por primera vez en el país, bajo el concepto de “Ciudad Puerto” no sólo se brindarán alternativas económicas adicionales para la población, sino que se potencializarán los sectores turístico, pesquero y agrícola, actual base de la subsistencia de la población Nuquiseña, que tanto se ha visto afectada por los bajos ingresos económicos en temporadas bajas, las cuales corresponden, a casi el 75% del año (Fuente: Cámara de Comercio del Chocó (sf). Puerto de Tribugá: sostenibilidad ambiental y desarrollo económico, no son expresiones antagónicas sino compatibles. ',
            },
            {
              url:
                'https://www.camarachoco.org.co/noticias/puerto-de-tribuga-sostenibilidad-ambiental-y-desarrollo-economico-no-son-expresiones-antagonicas-sino-compatibles)',
            },
            {
              text: 'Postura 2:',
            },
            {
              text:
                'Catalina Ortiz, Representante a la Cámara por el partido Verde advierte "de graves daños ambientales" si se construye el Puerto de Tribugá en el Chocó, tal como se aprobó en el Plan Nacional de Desarrollo. ',
            },
            {
              text:
                '"Varios partidos políticos hemos fijado nuestra posición en contra de que se construya Puerto Tribugá, un puerto planeado de aguas profundas en el norte del Pacífico, concretamente en Chocó. Para hacer esta obra, es necesario hacer una carretera en medio de la selva pasando por la Serranía del Baudó, habría que destruir la mitad del manglar de Chocó y acabar con la visita de 1.500 ballenas al año", aseguró. ',
            },
            {
              text:
                'Para Ortiz, el país no necesita la construcción de este puerto, dada que "es mucho más eficiente invertir en el puerto actual de Buenaventura, incluso en los demás puertos que tiene Colombia que hacer uno nuevo" (Morales C. (02 Mayo 2019). RCN Radio. Advierten grave daño ambiental si se construye Puerto Tribugá (Chocó). ',
            },
            {
              url:
                'https://www.rcnradio.com/colombia/pacifico/advierten-grave-dano-ambiental-si-se-construye-puerto-tribuga-choco)',
            },
          ],
          question:
            'De acuerdo con la postura dos sobre la construcción del puerto, cuál de los siguientes derechos se estarían vulnerando si se ejecutara el proyecto',
          answers: [
            { text: 'a.	Derechos económicos', correct: false },
            {
              text: 'b.	Derechos ambientales',
              correct: true,
            },
            {
              text: 'c.	Derechos culturales ',
              correct: false,
            },
            {
              text: 'd.	Derechos fundamentales.',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text: 'Ver módulo fase preactiva.',
            },
          ],
          positiveFeedback: {
            stars: 2.5,
            totems: 3,
          },
          difficult: 2.5,
        },
        {
          context: [
            {
              text:
                'Responder a la pregunta de acuerdo con los siguientes textos que se refieren a la posición de diferentes actores sobre la construcción del Puerto Tribugá en el departamento del Chocó.',
            },
            {
              text: 'Postura 1:',
            },
            {
              text:
                '“Desde hace décadas se viene explorando la posibilidad de la construcción del Puerto de Tribugá, un proyecto que actualmente tiene en la mira al municipio de Nuquí, perteneciente al departamento del Chocó, lugar donde se desarrollaría esta mega obra, que no solo obedece a un puerto de aguas profundas, sino a un paquete de obras que le cambiaría no solo la cara a la región, sino a todo un país. ',
            },
            {
              text:
                'Para la Junta  Directiva del ente cameral, con este proyecto, que se desarrollará por primera vez en el país, bajo el concepto de “Ciudad Puerto” no sólo se brindarán alternativas económicas adicionales para la población, sino que se potencializarán los sectores turístico, pesquero y agrícola, actual base de la subsistencia de la población Nuquiseña, que tanto se ha visto afectada por los bajos ingresos económicos en temporadas bajas, las cuales corresponden, a casi el 75% del año (Fuente: Cámara de Comercio del Chocó (sf). Puerto de Tribugá: sostenibilidad ambiental y desarrollo económico, no son expresiones antagónicas sino compatibles.',
            },
            {
              url:
                'https://www.camarachoco.org.co/noticias/puerto-de-tribuga-sostenibilidad-ambiental-y-desarrollo-economico-no-son-expresiones-antagonicas-sino-compatibles)',
            },
            {
              text: 'Postura 2:',
            },
            {
              text:
                'Catalina Ortiz, Representante a la Cámara por el partido Verde advierte "de graves daños ambientales" si se construye el Puerto de Tribugá en el Chocó, tal como se aprobó en el Plan Nacional de Desarrollo.  ',
            },
            {
              text:
                '"Varios partidos políticos hemos fijado nuestra posición en contra de que se construya Puerto Tribugá, un puerto planeado de aguas profundas en el norte del Pacífico, concretamente en Chocó. Para hacer esta obra, es necesario hacer una carretera en medio de la selva pasando por la Serranía del Baudó, habría que destruir la mitad del manglar de Chocó y acabar con la visita de 1.500 ballenas al año", aseguró. ',
            },
            {
              text:
                'Para Ortiz, el país no necesita la construcción de este puerto, dada que "es mucho más eficiente invertir en el puerto actual de Buenaventura, incluso en los demás puertos que tiene Colombia que hacer uno nuevo" (Morales C. (02 Mayo 2019). RCN Radio. Advierten grave daño ambiental si se construye Puerto Tribugá (Chocó).',
            },
            {
              url:
                'https://www.rcnradio.com/colombia/pacifico/advierten-grave-dano-ambiental-si-se-construye-puerto-tribuga-choco)',
            },
          ],
          question:
            'En términos de derechos, cuáles derechos estarían en conflicto',
          answers: [
            {
              text: 'a.	Derechos económicos y derechos culturales',
              correct: false,
            },
            {
              text: 'b.	Derechos fundamentales y derechos económicos',
              correct: false,
            },
            {
              text: 'c.	Derechos económicos y derechos ambientales',
              correct: true,
            },
            {
              text: 'd.	Derechos fundamentales y derechos culturales',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text: 'Ver módulo fase preactiva.',
            },
          ],
          positiveFeedback: {
            stars: 2.5,
            totems: 3,
          },
          difficult: 2.5,
        },
        {
          context: [
            {
              text:
                'Responder a la pregunta de acuerdo con los siguientes textos que se refieren a la posición de diferentes actores sobre la construcción del Puerto Tribugá en el departamento del Chocó.',
            },
            {
              text: 'Postura 1:',
            },
            {
              text:
                '“Desde hace décadas se viene explorando la posibilidad de la construcción del Puerto de Tribugá, un proyecto que actualmente tiene en la mira al municipio de Nuquí, perteneciente al departamento del Chocó, lugar donde se desarrollaría esta mega obra, que no solo obedece a un puerto de aguas profundas, sino a un paquete de obras que le cambiaría no solo la cara a la región, sino a todo un país. ',
            },
            {
              text:
                'Para la Junta  Directiva del ente cameral, con este proyecto, que se desarrollará por primera vez en el país, bajo el concepto de “Ciudad Puerto” no sólo se brindarán alternativas económicas adicionales para la población, sino que se potencializarán los sectores turístico, pesquero y agrícola, actual base de la subsistencia de la población Nuquiseña, que tanto se ha visto afectada por los bajos ingresos económicos en temporadas bajas, las cuales corresponden, a casi el 75% del año (Fuente: Cámara de Comercio del Chocó (sf). Puerto de Tribugá: sostenibilidad ambiental y desarrollo económico, no son expresiones antagónicas sino compatibles.',
            },
            {
              url:
                'https://www.camarachoco.org.co/noticias/puerto-de-tribuga-sostenibilidad-ambiental-y-desarrollo-economico-no-son-expresiones-antagonicas-sino-compatibles)',
            },
            {
              text: 'Postura 2:',
            },
            {
              text:
                'Catalina Ortiz, Representante a la Cámara por el partido Verde advierte "de graves daños ambientales" si se construye el Puerto de Tribugá en el Chocó, tal como se aprobó en el Plan Nacional de Desarrollo.  ',
            },
            {
              text:
                '"Varios partidos políticos hemos fijado nuestra posición en contra de que se construya Puerto Tribugá, un puerto planeado de aguas profundas en el norte del Pacífico, concretamente en Chocó. Para hacer esta obra, es necesario hacer una carretera en medio de la selva pasando por la Serranía del Baudó, habría que destruir la mitad del manglar de Chocó y acabar con la visita de 1.500 ballenas al año", aseguró. ',
            },
            {
              text:
                'Para Ortiz, el país no necesita la construcción de este puerto, dada que "es mucho más eficiente invertir en el puerto actual de Buenaventura, incluso en los demás puertos que tiene Colombia que hacer uno nuevo" (Morales C. (02 Mayo 2019). RCN Radio. Advierten grave daño ambiental si se construye Puerto Tribugá (Chocó).',
            },
            {
              url:
                'https://www.rcnradio.com/colombia/pacifico/advierten-grave-dano-ambiental-si-se-construye-puerto-tribuga-choco)',
            },
          ],
          question:
            'En el caso de que se aprobara la ejecución del proyecto y si la ciudadanía no estuviera de acuerdo con él, ¿cuál sería el mecanismo de participación ciudadana que podría hacer recular la construcción del puerto?',
          answers: [
            { text: 'a.	Referendo', correct: false },
            {
              text: 'b.	Consulta popular',
              correct: true,
            },
            {
              text: 'c.	Plebiscito',
              correct: false,
            },
            {
              text: 'd.	Iniciativa legislativa',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              url:
                ' https://www.registraduria.gov.co/Consultas-populares-mecanismo-de.html ',
            },
            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 5,
            totems: 3,
          },
          difficult: 5,
        },
        {
          context: [
            {
              text:
                'El concepto de representación definido por el republicanismo radical de Rousseau consiste en el ejercicio colectivo de la participación política de ciudadanos libres e iguales como formación soberana de la voluntad común. En ese sentido, la Constitución nace de la voluntad popular soberana y se impone la voluntad de la mayoría. ',
            },
          ],
          question:
            'No obstante, esta tesis en el que se le otorga todo el poder a la mayoría, como lo exponían en su momento pensadores como Constant y Tocqueville, podría justificar la tiranía porque',
          answers: [
            {
              text: 'a.	Quien gobernaría sería el imperio de la ley',
              correct: false,
            },
            {
              text: 'b.	La voluntad general tendría un poder ilimitado',
              correct: true,
            },
            {
              text: 'c.	Se crearía un estado de terror',
              correct: false,
            },
            {
              text: 'd.	La mayoría estaría limitada por el derecho',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text: 'Ver módulo fase preactiva.',
            },
          ],
          positiveFeedback: {
            stars: 7.5,
            totems: 3,
          },
          difficult: 7.5,
        },
        {
          context: [
            {
              text:
                'Locke sostiene que en el estado de naturaleza existen unos derechos naturales e individuales tales como el derecho a la vida, a la libertad y a la propiedad privada. El resultado de un pacto social entre los individuos es un Estado Civil que tenga como función única proteger tales derechos. ',
            },
          ],
          question: 'La consecuencia de esta función del Estado pone como',
          answers: [
            {
              text:
                'a.	Prioridad los derechos individuales sobre los derechos colectivos',
              correct: true,
            },
            {
              text:
                'b.	Prioridad los derechos colectivos sobre los derechos individuales',
              correct: false,
            },
            {
              text: 'c.	Prioridad el Estado sobre los derechos individuales',
              correct: false,
            },
            {
              text: 'd.	Prioridad el Estado sobre los derechos colectivos.',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text:
                'fase interactiva: Estado Social de Derecho y artículo 374 de la Constitución Política de Colombia de 1991.',
            },
          ],
          positiveFeedback: {
            stars: 7.5,
            totems: 3,
          },
          difficult: 7.5,
        },
        {
          context: [
            {
              text:
                'La Corte Constitucional es una institución de la Rama Judicial del Poder Público creada mediante la adopción de la Constitución de 1991 con el fin de guardar la integridad y supremacía de la Carta Política. Entre sus funciones se encuentra la decidir sobre las demandas de inconstitucionalidad que promuevan el gobierno nacional, el congreso y los  ciudadanos contra los actos reformatorios de la Constitución, cualquiera que sea su origen.',
            },
          ],
          question:
            'De acuerdo con esta definición y función de la Corte Constitucional, se podría inferir que una de sus funciones es',
          answers: [
            { text: 'a.	Proteger que no exista abuso de poder', correct: false },
            {
              text: 'b.	Proteger el Estado de Derecho',
              correct: true,
            },
            {
              text: 'c.	Reformar la constitución.',
              correct: false,
            },
            {
              text:
                'd.	Velar por el cumplimiento de las normas constitucionales.',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text:
                'fase interactiva: Estado Social de Derecho y artículo 374 de la Constitución Política de Colombia de 1991.',
            },
          ],
          positiveFeedback: {
            stars: 5,
            totems: 3,
          },
          difficult: 5,
        },
        {
          context: [
            {
              text:
                'En varias ocasiones, las iniciativas legislativas de ciudadanos o, incluso, proyectos de ley elaborados por los órganos competentes, como el legislativo, la Corte Constitucional los ha declarado “inconstitucionales”.',
            },
          ],
          question: 'Esto se debe porque son leyes que',
          answers: [
            { text: 'a.	No aportan al bienestar del país', correct: false },
            {
              text: 'b.	No se ajustan al Plan de Gobierno de turno',
              correct: false,
            },
            {
              text:
                'c.	Vulneran la integridad y principios fundamentales de la Constitución',
              correct: true,
            },
            {
              text: 'd.	Vulneran la integridad y principios democráticos',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text:
                'fase interactiva: Estado Social de Derecho y artículo 374 de la Constitución Política de Colombia de 1991.',
            },
          ],
          positiveFeedback: {
            stars: 2.5,
            totems: 3,
          },
          difficult: 2.5,
        },
        {
          context: [
            {
              text:
                'Existen culturas que conviven dentro de un mismo espacio y pueden expresar sus diferentes cosmovisiones, interactuar y comunicarse entre ellas para enriquecerse entre sí. Colombia, desde luego, es un ejemplo de esta convivencia y diálogo entre culturas. ',
            },
          ],
          question: 'El concepto que mejor define este fenómeno es',
          answers: [
            { text: 'a.	Interculturalidad', correct: true },
            {
              text: 'b.	Multiculturalidad',
              correct: false,
            },
            {
              text: 'c.	Pluralidad',
              correct: false,
            },
            {
              text: 'd.	Diversidad',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text:
                'fase interactiva: El Estado social de derecho frente a la diversidad y pluralidad: una forma de construcción de la paz.',
            },
          ],
          positiveFeedback: {
            stars: 2.5,
            totems: 3,
          },
          difficult: 2.5,
        },
        {
          context: [
            {
              text:
                'Esta es una pregunta de conocimientos similares a las pruebas saber 11.',
            },
          ],
          question:
            'La Constitución política de Colombia se puede modificar mediante ',
          answers: [
            { text: 'a.	una consulta popular. ', correct: false },
            {
              text: 'b.	un plebiscito. ',
              correct: false,
            },
            {
              text: 'c.	un referendo. ',
              correct: true,
            },
            {
              text: 'd.	un cabildo abierto.',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text:
                'fase interactiva: Estado Social de Derecho y artículo 374 de la Constitución Política de Colombia de 1991.',
            },
          ],
          positiveFeedback: {
            stars: 7.5,
            totems: 3,
          },
          difficult: 7.5,
        },
        {
          context: [
            {
              text:
                'El filósofo Karl Popper en La sociedad muerta y sus enemigos expuso la llamada paradoja de la tolerancia, que dice así: “la tolerancia ilimitada debe (o puede), conducir a la desaparición de la tolerancia. Si extendemos la tolerancia ilimitada aun a aquellos que son intolerantes; si no nos hallamos preparados para defender una sociedad tolerante contra las tropelías de los intolerantes, el resultado será la destrucción de los tolerantes y, junto con ellos, de la tolerancia”. ',
            },
          ],
          question: 'Una paradoja puede entenderse como ',
          answers: [
            { text: 'a.	Una contradicción de los enunciados', correct: true },
            {
              text: 'b.	Un complemento entre los enunciados',
              correct: false,
            },
            {
              text: 'c.	Una falacia de los enunciados.',
              correct: false,
            },
            {
              text: 'd.	Un error lógico entre los enunciados.',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text:
                'POPPER, Karl. La sociedad abierta y sus enemigos. Barcelona: Paidós, 1981. (Pág. 512)',
            },
          ],
          positiveFeedback: {
            stars: 7.5,
            totems: 3,
          },
          difficult: 7.5,
        },
        {
          context: [
            {
              text:
                'El filósofo Karl Popper en La sociedad muerta y sus enemigos expuso la llamada paradoja de la tolerancia, que dice así: “la tolerancia ilimitada debe (o puede), conducir a la desaparición de la tolerancia. Si extendemos la tolerancia ilimitada aun a aquellos que son intolerantes; si no nos hallamos preparados para defender una sociedad tolerante contra las tropelías de los intolerantes, el resultado será la destrucción de los tolerantes y, junto con ellos, de la tolerancia”. ',
            },
          ],
          question:
            'Cuál sería un buen ejemplo de la destrucción de los tolerantes y la tolerancia a causa de la tolerancia ilimitada',
          answers: [
            {
              text: 'a.	La tolerancia a los regímenes totalitarios',
              correct: true,
            },
            {
              text: 'b.	La tolerancia a las religiones no monoteístas',
              correct: false,
            },
            {
              text: 'c.	La tolerancia a la eutanasia',
              correct: false,
            },
            {
              text: 'd.	La tolerancia a la diversidad cultural',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text:
                'POPPER, Karl. La sociedad abierta y sus enemigos. Barcelona: Paidós, 1981. (Pág. 512)',
            },
          ],
          positiveFeedback: {
            stars: 7.5,
            totems: 3,
          },
          difficult: 7.5,
        },
        {
          context: [
            {
              text:
                'Las comunidades indígenas atraviesan por diferentes problemáticas. Las condiciones de pobreza, de atraso, la discriminación, la supervivencia y los escasos espacios de participación política evidencian la dificultad para comprender la diversidad étnica que presenta la sociedad colombiana y los desarrollos particulares que presentan cada una de estas comunidades. ',
            },
          ],
          question: 'Una reivindicación actual de los indígenas es:',
          answers: [
            {
              text:
                'a.	La lucha ancestral por la recuperación de los territorios usurpados por España. ',
              correct: false,
            },
            {
              text: 'b.	Ser tenidos en cuenta en las negociaciones de TLC. ',
              correct: false,
            },
            {
              text:
                'c.	La no adjudicación de la tierra para los resguardos del Cauca. ',
              correct: true,
            },
            {
              text:
                'd.	El respeto por la identidad cultural al nivel del grupo afro colombiano. ',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text:
                'fase interactiva: El Estado social de derecho frente a la diversidad y pluralidad: una forma de construcción de la paz.',
            },
          ],
          positiveFeedback: {
            stars: 2.5,
            totems: 3,
          },
          difficult: 2.5,
        },
        {
          context: [
            {
              text:
                'El clientelismo, caracterizado por la apropiación privada de recursos del Estado con fines políticos personalistas, se ejerce por medio de una vasta red de relaciones que articulan el sistema político. Algunos analistas llegan a afirmar que el clientelismo comanda el conjunto de relaciones que definen la forma real como opera la política, a partir de las normas establecidas por el Estado. ',
            },
          ],
          question:
            'Se afirma que el sistema político colombiano se ha constituido desde el clientelismo, porque:',
          answers: [
            {
              text:
                'a.	El clientelismo se constituyó en la forma más efectiva de hacer conseguir los favores del Estado en los sectores en donde éste nunca ha estado presente. ',
              correct: true,
            },
            {
              text:
                'b.	El clientelismo constituye la manera más efectiva de hacer política y de preservar el statu quo. ',
              correct: false,
            },
            {
              text:
                'c.	El clientelismo es la forma más inusual de hacer política en medio del proceso de descentralización. ',
              correct: false,
            },
            {
              text:
                'd.	El clientelismo es un mecanismo económico de promover políticas públicas en el Estado colombiano. ',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text:
                'fase interactiva: El Estado social de derecho en Colombia.',
            },
          ],
          positiveFeedback: {
            stars: 5,
            totems: 3,
          },
          difficult: 5,
        },
        {
          context: [
            {
              text:
                '“La hipótesis expresada con frecuencia de que las condiciones de pobreza son caldo de cultivo de la violencia no es sostenible a la luz de la experiencia colombiana reciente. Los resultados de algunas investigaciones muestran que la tasa de homicidios no está asociada positivamente a niveles mayores de pobreza. Al contrario, se encuentra una relación real entre el índice de homicidios y la riqueza. Esta relación quiere decir que tienen más alta probabilidad de sufrir violencia los municipios donde se dan posibilidades nuevas de acumulación de riqueza (ganaderas, petroleras, de cultivos ilícitos) dadas las inequitativas condiciones actuales de distribución de ingresos, de participación ciudadana y de una débil acción del Estado (Alfredo Sarmiento, Violencia y equidad vol XXX, No. 3, Bogotá, julio 1999) ',
            },
          ],
          question:
            'A partir de lo que sostiene el autor se puede inferir que: ',
          answers: [
            {
              text:
                'a.	Una mayor participación ciudadana aumenta las posibilidades de producir una mayor riqueza. ',
              correct: false,
            },
            {
              text:
                'b.	A mayor riqueza en una región y mayor inequidad en su distribución, mayor probabilidad de violencia.  ',
              correct: true,
            },
            {
              text:
                'c.	En una región con pobreza, pero con alta participación ciudadana hay menos probabilidades de violencia.  ',
              correct: false,
            },
            {
              text:
                'd.	La distribución más equitativa se presenta en las regiones más pobres y con más débil acción estatal. ',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text:
                'fase interactiva: El Estado social de derecho en Colombia.',
            },
          ],
          positiveFeedback: {
            stars: 7.5,
            totems: 3,
          },
          difficult: 7.5,
        },
        {
          context: [
            {
              text:
                'En la historia del conflicto armado de Colombia se ha presentado una explotación del sentimiento religioso con los fines políticos. Por ejemplo, en los 50’ se decía desde el púlpito que el liberalismo era ateo y que obraba en contra de la religión católica. Con estas consignas se movilizó a la gente para que actuara en contra de sus vecinos porque estaban en contra de su fe, lo que determinó que el conflicto entre liberales y conservadores se intensificara.  ',
            },
          ],
          question:
            'Teniendo en cuenta lo anterior, el papel de la iglesia en el conflicto armado debería ser:',
          answers: [
            {
              text:
                'a.	Mediador, pero sin tener una decisión política particular. ',
              correct: true,
            },
            {
              text: 'b.	Seguir evangelizando en medio del conflicto armado. ',
              correct: false,
            },
            {
              text: 'c.	De respaldo al accionar de los partidos políticos. ',
              correct: false,
            },
            {
              text: 'd.	Dedicado exclusivamente a la asistencia social.',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text:
                'fase interactiva: El Estado social de derecho frente a la diversidad y pluralidad: una forma de construcción de la paz.',
            },
          ],
          positiveFeedback: {
            stars: 5,
            totems: 3,
          },
          difficult: 5,
        },
        {
          context: [
            {
              text:
                'Entre nosotros ha prevalecido una concepción estática y negativa de la paz, basada en el legado griego que la entiende como ausencia de los conflictos violentos y como tranquilidad personal interior, y en la perspectiva jurídico-legal de la Pax Romana, que la equipara con la ausencia de guerra exterior y con el orden interno basado en el respeto a la ley. ',
            },
          ],
          question:
            'Una concepción más amplia de la paz ciertamente consideraría la ausencia de violencia directa, pero incorporaría además la',
          answers: [
            {
              text: 'a.	Democracia y un Estado con una fuerza armada fuerte. ',
              correct: false,
            },
            {
              text: 'b.	Justicia social con una fuerza armada fuerte.',
              correct: false,
            },
            {
              text: 'c.	Supremacía de la ley y un ordenamiento legal fuerte.  ',
              correct: false,
            },
            {
              text: 'd.	Igualdad y la satisfacción de las necesidades básicas. ',
              correct: true,
            },
          ],
          negativeFeedback: [
            {
              url:
                'file:///C:/Users/PC/Downloads/5602-Texto%20del%20art%C3%ADculo-23144-1-10-20181110.pdf ',
            },
            {
              text:
                'Reflexiones sobre la paz positiva. Un diálogo con la paz imperfecta. Revista de Paz y Conflictos. 1988-7221 | Vol. 11 | Nº 1 | 2018 | pp. 29-59)',
            },
          ],
          positiveFeedback: {
            stars: 5,
            totems: 3,
          },
          difficult: 5,
        },
        {
          context: [
            {
              text:
                '¿Qué tiene dueño la tierra? ¿Cómo así? ¿Cómo se ha de vender? ¿Cómo se ha de comprar? Si ella no nos pertenece pues. Nosotros somos de ella. Sus hijos somos. Así siempre, siempre tierra viva, como cría a los gusanos así nos cría. Tiene huevos y sangre. Leche tiene y nos da de mamar. Pelo tiene, pasto, paja, arboles. Ella sabe partir papas. Hace nacer cosas. Gente hace nacer. Ella nos cuida y nosotros la cuidamos. Ella bebe chicha, acepta nuestro convite. Hijos suyos somos. ¿Cómo se ha de vender? ¿Cómo se ha de comprar?... ',
            },
          ],
          question:
            'Si comparamos esta cosmovisión indígena acerca de la naturaleza con el modo de vivir de la sociedad occidental podemos concluir que',
          answers: [
            {
              text:
                'a.	Contrario a las sociedades indígenas, el hombre blanco posee un conocimiento científico y verdadero de la naturaleza. ',
              correct: false,
            },
            {
              text:
                'b.	Contrario a la sociedad occidental, el indígena ha sabido vivir en equilibrio con la naturaleza. ',
              correct: true,
            },
            {
              text:
                'c.	Para llegar a dominar la naturaleza, el occidental ha dejado atrás todo pensamiento misticista. ',
              correct: false,
            },
            {
              text:
                'd.	La sociedad occidental conserva los principios de respeto a la naturaleza sin tener ninguna conciencia depredadora. ',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text:
                ' fase interactiva: El Estado social de derecho frente a la diversidad y pluralidad: una forma de construcción de la paz.',
            },
          ],
          positiveFeedback: {
            stars: 5,
            totems: 3,
          },
          difficult: 5,
        },
        {
          context: [
            {
              text:
                'En una provincia existe un comprador de ganado y sólo un distribuidor, pero se sabe que llegará un nuevo comprador, quien va a inaugurar su negocio en dicha provincia. El distribuidor ha tenido problemas económicos y desea acabar con su negocio, así es que las cien reses que va a vender la próxima semana serán las últimas. Un nuevo distribuidor abastecerá a los dos compradores, pero solo en un mes con precios más altos. Cada uno de los compradores necesita, para que su negocio subsista un mes, por lo menos cien reses. Uno de los compradores, quien necesita la carne, es informado de que el nuevo comprador inaugurará otro expendio de carne, el nuevo comprador, que desconoce la actividad de este, es advertido sobre el interés del carnicero en las cien reses. Cada uno de ellos está dispuesto a hacer lo que sea para obtener esas reses. Uno de los compradores, en su afán de dejar al otro sin nada y de paso eliminar la competencia, ha comprado las reses por el doble de valor real. Un mes después se entera de que el otro comprador necesitaba las reses para su curtiembre. Si estos dos hombres hubiesen hablado tendrían una buena ganancia en sus negocios porque habrían comprado las reses al precio real y juntos se habrían beneficiado pagando sólo la mitad del precio de las mismas, pues uno necesitaba únicamente la carne y el otro, sólo el cuero. ',
            },
          ],
          question:
            'A partir del texto anterior, podemos observar que entre estas dos personas se generó un conflicto porque:',
          answers: [
            {
              text:
                'a.	Requieren los mismos bienes para satisfacer la demanda de sus negocios. ',
              correct: true,
            },
            {
              text:
                'b.	Desconocían los intereses de la otra parte y actuaron sobre prejuicios.  ',
              correct: false,
            },
            {
              text:
                'c.	Podían encontrar quién los abasteciera rápido y económicamente. ',
              correct: false,
            },
            {
              text:
                'd.	Intentaron un arreglo directo que satisficiera los intereses de ambos. ',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text: ' Ver módulo fase preactiva.',
            },
          ],
          positiveFeedback: {
            stars: 2.5,
            totems: 3,
          },
          difficult: 2.5,
        },
      ],
    },
    competenciasSocioemocionales: {
      10: [
        {
          context: [
            {
              text:
                'Alicia es una joven que está próxima a terminar su vida escolar en el colegio. Durante varios años se ha dado cuenta que es muy talentosa para el área de artística, pues se le facilita la danza y expresión corporal, por eso desea estudiar en la Universidad Distrital Francisco José de Caldas – Facultad de Artes ASAB, que por lo que ha escuchado de sus docentes es una de las mejores del país para formación en este campo. Sin embargo, Alicia tiene un inconveniente y es que sus padres desean que ella estudie Contaduría, debido a que consideran que es una carrera que da “plata” y se niegan rotundamente a permitir que Alicia cumpla su sueño de formarse en el mundo de la danza. ',
            },
          ],
          question: '¿Qué decisión consideras que Alicia debería tomar?',
          answers: [
            {
              text:
                'a.	Alicia debería hacer lo que ella quiere, así sus padres no estén de acuerdo',
              correct: false,
            },
            {
              text:
                'b.	Alicia debería buscar ayuda en sus docentes y redes de apoyo para lograr guiarse y saber qué decisión tomar',
              correct: false,
            },
            {
              text:
                'c.	Alicia debería mostrarles a sus padres las ventajas del programa que desea estudiar, basándose en la información que le brinda la Universidad y sus docentes; además de establecer un espacio de diálogo con sus padres exponiendo sus gustos, habilidades y sueños',
              correct: true,
            },
            {
              text:
                'd.	Alicia debería hacerles caso a sus padres y estudiar contaduría pues es una carrera que sí da “plata”',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text: '',
            },
            {
              url: '',
            },

            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 0,
            totems: 0,
          },
          difficult: 0,
        },
        {
          context: [
            {
              text:
                'De la afirmación: “el que es pobre, es pobre porque quiere” y según el Banco Mundial, “de la población mundial pobre de 15 años o más, alrededor del 70% no tiene ninguna formación o sólo una instrucción básica” ',
            },
          ],
          question: '¿Qué puedes deducir?',
          answers: [
            {
              text:
                'a.	La pobreza está directamente relacionada con no estudiar o formarse ',
              correct: false,
            },
            {
              text:
                'b.	Las pocas oportunidades en el área laboral y de formación es un factor determinante para que las personas estén en pobreza',
              correct: false,
            },
            {
              text:
                'c.	La pobreza tiene que ver estrictamente con la situación económica de las personas',
              correct: false,
            },
            {
              text:
                'd.	La pobreza es una situación que tiene trasfondo, por ejemplo, el conflicto y la violencia',
              correct: true,
            },
          ],
          negativeFeedback: [
            {
              text: '',
            },
            {
              url: '',
            },

            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 0,
            totems: 0,
          },
          difficult: 0,
        },
        {
          context: [
            {
              text:
                'Pedro es un niño de 8 años, vive con sus padres y dos hermanas mayores. En clase, Pedro es un niño poco participativo, tiende a evitar el trabajo en grupo, casi no le gusta hablar o compartir espacios de ocio con sus compañeros y a veces tiende a ser agresivo. El director de aula, Antonio, se ha percatado de esta situación hace algún tiempo.',
            },
          ],
          question:
            '¿Qué debería hacer Antonio para identificar la o las causas del comportamiento de Pedro?',
          answers: [
            {
              text: 'a.	Hablar con los padres de Pedro',
              correct: false,
            },
            {
              text:
                'b.	Hablar con el coordinador para identificar las medidas que van a tomar',
              correct: false,
            },
            {
              text: 'c.	Buscar un espacio de diálogo con Pedro y escucharlo',
              correct: true,
            },
            {
              text:
                'd.	Hablar con la docente orientadora, pues ella sabe que hacer en estos casos',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text: '',
            },
            {
              url: '',
            },

            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 0,
            totems: 0,
          },
          difficult: 0,
        },
        {
          context: [
            {
              text:
                'Andrea tiene 35 años y se encuentra desempleada hace 5 meses, piensa mucho en el futuro y lo que será de él sino consigue trabajo. Laura tiene 35 años y lleva 2 meses desempleada. Las dos se presentaron a un curso sobre técnicas para buscar empleo. Laura se inscribió a este curso cuando estaba realizando una de las tantas búsquedas que ha realizado para conseguir empleo, a diferencia de Andrea que se inscribió por medio de una agencia de empleo.Las dos mujeres tienen un objetivo en común y es conseguir empleo. Andrea envía a sus contactos, su hoja de vida y aplica constantemente en algunos portales web que ofertan trabajos, pero tiende a sentirse cansada, aburrida, abrumada con esta situación. Laura elaboró un plan de trabajo diario para realizar la búsqueda de empleo, atendiendo al mismo tiempo sus responsabilidades en casa y consigo misma, como hacer deporte y mejorando su perfil laboral por medio de cursos cortos con el SENA y otras entidades. ',
            },
          ],
          question: '¿Cuál crees que es la diferencia entre Andrea y Laura?',
          answers: [
            {
              text:
                'a.	No hay diferencia, pues las dos se encuentran en la misma situación',
              correct: false,
            },
            {
              text:
                'b.	Andrea es más realista con su situación laboral, hace lo que puede. Laura es demasiado optimista si cree que buscar empleo es sencillo',
              correct: false,
            },
            {
              text:
                'c.	Laura está centrada en el presente, planifica y sigue preparándose para fortalecer su curriculum, en cambio Andrea no vive el presente, no planifica y se distrae de su meta real que es conseguir empleo pensando en el futuro',
              correct: true,
            },
            {
              text:
                'd.	Cada cual asume su situación como le parece y como se le facilita, no todos somos iguales, ni asumimos de la misma forma las situaciones. No hay diferencia',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text: '',
            },
            {
              url: '',
            },

            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 0,
            totems: 0,
          },
          difficult: 0,
        },
        {
          context: [
            {
              text:
                'Imagina que estás en una situación que pone a prueba tu paciencia. Es una situación que te genera estrés y por eso reaccionas violentamente. ',
            },
          ],
          question:
            'Una persona que observaba, se te acerca después y cuestiona tu manera de actuar, a lo que deberías responder:',
          answers: [
            {
              text: 'a.	sí soy yo, no es algo que le incumba',
              correct: false,
            },
            {
              text: 'b.	Escucho y me quedo pensando en lo que sucedió',
              correct: false,
            },
            {
              text:
                'c.	Asumo mi responsabilidad y acepto que mi reacción frente a la situación no fue la correcta',
              correct: true,
            },
            {
              text: 'd.	No sabría que hacer',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text: '',
            },
            {
              url: '',
            },

            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 0,
            totems: 0,
          },
        },
        {
          context: [
            {
              text: '',
            },
          ],
          question:
            'Si presencias una situación de bullying con algún compañero, tú: ',
          answers: [
            {
              text: 'a.	Te quedas callado, no quieres problemas',
              correct: false,
            },
            {
              text:
                'b.	Le comentas al docente y esperas que él decida que hacer',
              correct: true,
            },
            {
              text:
                'c.	Hablas con tu compañero que está siendo agredido y lo animas a hablar con sus padres',
              correct: true,
            },
            {
              text:
                'd.	Le cuentas a tus padres lo que está pasando con tu compañero',
              correct: true,
            },
          ],
          negativeFeedback: [
            {
              text: '',
            },
            {
              url: '',
            },

            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 0,
            totems: 0,
          },
        },
        {
          context: [
            {
              text: '',
            },
          ],
          question:
            'Respecto a la afirmación “me parece útil lograr encontrar alternativas de solución a diferentes problemáticas” crees que es algo:',
          answers: [
            {
              text: 'a.	Fácil de decir, pero difícil de lograr',
              correct: false,
            },
            {
              text: 'b.	Incierto',
              correct: false,
            },
            {
              text: 'c.	Una posibilidad al cambio',
              correct: true,
            },
            {
              text: 'd.	No me parece útil',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text: '',
            },
            {
              url: '',
            },

            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 0,
            totems: 0,
          },
        },
        {
          context: [
            {
              text:
                'Federico es un estudiante de media, nunca se había preocupado por sus notas, generalmente aprobaba las materias con la nota mínima; hasta que un día tuvo la oportunidad de acceder a un curso de proyecto de vida y se percató que si seguía haciendo las cosas de esa forma no iba a poder aplicar a una universidad pública, pues era consciente que si quería estudiar un programa de pregrado debía ser en este tipo de institución, pues su familia no contaba con recursos económicos. Después de ese curso, decidió hacer un cambio rotundo en su forma de estudiar, poco a poco fue mejorando, generó un plan de estudio y finalmente las notas ya no eran tan bajas, sino que le iba muy bien. La familia de Federico al ver sus esfuerzos querían recompensarlo.',
            },
          ],
          question: '¿Qué crees que debería asumir Federico?',
          answers: [
            {
              text: 'a.	Aprovechar y pedir el celular que tanto quiere',
              correct: false,
            },
            {
              text:
                'b.	La meta es mayor, cuando logre entrar a la universidad pública compartiría su felicidad con la familia',
              correct: true,
            },
            {
              text: 'c.	No sabría que debe hacer',
              correct: false,
            },
            {
              text: 'd.	Si uno hace algo bien pues debe tener su recompensa',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text: '',
            },
            {
              url: '',
            },

            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 0,
            totems: 0,
          },
        },
        {
          context: [
            {
              text: '',
            },
          ],
          question:
            'Consideras que ¿reconoces la diferencia entre sentirte enojado, triste o estresado?',
          answers: [
            {
              text: 'a.	Las tres emociones son parecidas para mí',
              correct: true,
            },
            {
              text: 'b.	Nunca he pensado en eso',
              correct: true,
            },
            {
              text: 'c.	Reconozco cada una, pero tienden a combinarse',
              correct: true,
            },
            {
              text:
                'd.	Cada emoción es completamente clara para mí, todo depende de la situación que se presente',
              correct: true,
            },
          ],
          negativeFeedback: [
            {
              text: '',
            },
            {
              url: '',
            },

            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 0,
            totems: 0,
          },
        },
        {
          context: [
            {
              text: '',
            },
          ],
          question:
            '¿Usualmente cuestiono mis opiniones frente a distintos temas?',
          answers: [
            {
              text: 'a.	Algunas veces',
              correct: true,
            },
            {
              text: 'b.	Siempre',
              correct: true,
            },
            {
              text: 'c.	No me he percatado',
              correct: true,
            },
            {
              text: 'd.	Nunca',
              correct: true,
            },
          ],
          negativeFeedback: [
            {
              text: '',
            },
            {
              url: '',
            },

            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 0,
            totems: 0,
          },
        },
        {
          context: [
            {
              text:
                'Si estás próximo a graduarte y aun no tienes clara la Institución de Educación Superior (IES) a la que puedes entrar a estudiar el programa que te gusta,',
            },
          ],
          question: '¿Cuál es el primer paso que debes dar para poder elegir?',
          answers: [
            {
              text:
                'a.	Preguntar a los docentes si conocen alguna Institución de Educación Superior donde pueda estudiar el programa que quiero',
              correct: true,
            },
            {
              text:
                'b.	Buscar en internet acerca de las IES que ofertan el programa que me interesa estudiar y leer el pensum de cada una',
              correct: true,
            },
            {
              text:
                'c.	Verificar con mi familia y redes de apoyo la capacidad de pago de un programa de estudios y así tendré claro hacia donde debo especializar la búsqueda de IES',
              correct: true,
            },
            {
              text: 'd.	Buscar asesoría en las IES ',
              correct: true,
            },
          ],
          negativeFeedback: [
            {
              text: '',
            },
            {
              url: '',
            },

            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 0,
            totems: 0,
          },
        },
        {
          context: [
            {
              text:
                'Jairo después del colegio decidió estudiar Ingeniería mecatrónica y a mitad del primer semestre se dio cuenta que no era lo que él esperaba o quería. Se retiró del programa y ahora está pensando en que va a hacer,',
            },
          ],
          question: '¿Qué le aconsejarías a Jairo?',
          answers: [
            {
              text:
                'a.	Lo que puede hacer es trabajar y va mirando que quiere hacer en relación a sus estudios',
              correct: true,
            },
            {
              text:
                'b.	Empezar a mirar otras opciones en las paginas web de las universidades',
              correct: true,
            },
            {
              text:
                'c.	Buscar asesoría en la universidad, específicamente en bienestar-orientación para que le ayuden a generar un plan de búsqueda en otro programa que se acomode a sus gustos y necesidades',
              correct: true,
            },
            {
              text: 'd.	Hablar con la familia y ver que solución le plantean',
              correct: true,
            },
          ],
          negativeFeedback: [
            {
              text: '',
            },
            {
              url: '',
            },

            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 0,
            totems: 0,
          },
        },
        {
          context: [
            {
              text: '',
            },
          ],
          question:
            'Te interesaría diseñar programas de computación y explorar nuevas aplicaciones tecnológicas para uso del internet ',
          answers: [
            {
              text: 'a.	Te interesa mucho',
              correct: true,
            },
            {
              text: 'b.	Te interesa más o menos',
              correct: true,
            },
            {
              text: 'c.	Te interesa poco',
              correct: true,
            },
            {
              text: 'd.	No me interesa',
              correct: true,
            },
          ],
          negativeFeedback: [
            {
              text: '',
            },
            {
              url: '',
            },

            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 0,
            totems: 0,
          },
        },
        {
          context: [
            {
              text: '',
            },
          ],
          question:
            'Te interesaría criar, cuidar y tratar animales domésticos y de campo',
          answers: [
            {
              text: 'a.	Te interesa mucho',
              correct: true,
            },
            {
              text: 'b.	Te interesa más o menos',
              correct: true,
            },
            {
              text: 'c.	Te interesa poco',
              correct: true,
            },
            {
              text: 'd.	No me interesa',
              correct: true,
            },
          ],
          negativeFeedback: [
            {
              text: '',
            },
            {
              url: '',
            },

            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 0,
            totems: 0,
          },
        },
        {
          context: [
            {
              text: '',
            },
          ],
          question: 'Te interesaría ilustrar, dibujar y animar digitalmente',
          answers: [
            {
              text: 'a.	Te interesa mucho',
              correct: true,
            },
            {
              text: 'b.	Te interesa más o menos',
              correct: true,
            },
            {
              text: 'c.	Te interesa poco',
              correct: true,
            },
            {
              text: 'd.	No me interesa',
              correct: true,
            },
          ],
          negativeFeedback: [
            {
              text: '',
            },
            {
              url: '',
            },

            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 0,
            totems: 0,
          },
        },
        {
          context: [
            {
              text: '',
            },
          ],
          question:
            'Te interesaría seleccionar, capacitar y motivar al personal de una organización o empresa',
          answers: [
            {
              text: 'a.	Te interesa mucho',
              correct: true,
            },
            {
              text: 'b.	Te interesa más o menos',
              correct: true,
            },
            {
              text: 'c.	Te interesa poco',
              correct: true,
            },
            {
              text: 'd.	No me interesa',
              correct: true,
            },
          ],
          negativeFeedback: [
            {
              text: '',
            },
            {
              url: '',
            },

            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 0,
            totems: 0,
          },
        },
        {
          context: [
            {
              text: '',
            },
          ],
          question:
            'Te interesaría realizar excavaciones para descubrir restos del pasado',
          answers: [
            {
              text: 'a.	Te interesa mucho',
              correct: true,
            },
            {
              text: 'b.	Te interesa más o menos',
              correct: true,
            },
            {
              text: 'c.	Te interesa poco',
              correct: true,
            },
            {
              text: 'd.	No me interesa',
              correct: true,
            },
          ],
          negativeFeedback: [
            {
              text: '',
            },
            {
              url: '',
            },

            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 0,
            totems: 0,
          },
        },
        {
          context: [
            {
              text: '',
            },
          ],
          question:
            'Te interesaría resolver problemas de cálculo para construir un puente',
          answers: [
            {
              text: 'a.	Te interesa mucho',
              correct: true,
            },
            {
              text: 'b.	Te interesa más o menos',
              correct: true,
            },
            {
              text: 'c.	Te interesa poco',
              correct: true,
            },
            {
              text: 'd.	No me interesa',
              correct: true,
            },
          ],
          negativeFeedback: [
            {
              text: '',
            },
            {
              url: '',
            },

            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 0,
            totems: 0,
          },
        },
        {
          context: [
            {
              text: '',
            },
          ],
          question:
            'Diseñar cursos para enseñar a la gente sobre temas de salud e higiene',
          answers: [
            {
              text: 'a.	Te interesa mucho',
              correct: true,
            },
            {
              text: 'b.	Te interesa más o menos',
              correct: true,
            },
            {
              text: 'c.	Te interesa poco',
              correct: true,
            },
            {
              text: 'd.	No me interesa',
              correct: true,
            },
          ],
          negativeFeedback: [
            {
              text: '',
            },
            {
              url: '',
            },

            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 0,
            totems: 0,
          },
        },
        {
          context: [
            {
              text: '',
            },
          ],
          question: 'Tocar un instrumento y componer música',
          answers: [
            {
              text: 'a.	Te interesa mucho',
              correct: true,
            },
            {
              text: 'b.	Te interesa más o menos',
              correct: true,
            },
            {
              text: 'c.	Te interesa poco',
              correct: true,
            },
            {
              text: 'd.	No me interesa',
              correct: true,
            },
          ],
          negativeFeedback: [
            {
              text: '',
            },
            {
              url: '',
            },

            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 0,
            totems: 0,
          },
        },
      ],
      11: [
        {
          context: [
            {
              text:
                'Alicia es una joven que está próxima a terminar su vida escolar en el colegio. Durante varios años se ha dado cuenta que es muy talentosa para el área de artística, pues se le facilita la danza y expresión corporal, por eso desea estudiar en la Universidad Distrital Francisco José de Caldas – Facultad de Artes ASAB, que por lo que ha escuchado de sus docentes es una de las mejores del país para formación en este campo. Sin embargo, Alicia tiene un inconveniente y es que sus padres desean que ella estudie Contaduría, debido a que consideran que es una carrera que da “plata” y se niegan rotundamente a permitir que Alicia cumpla su sueño de formarse en el mundo de la danza. ',
            },
          ],
          question: '¿Qué decisión consideras que Alicia debería tomar?',
          answers: [
            {
              text:
                'a.	Alicia debería hacer lo que ella quiere, así sus padres no estén de acuerdo',
              correct: false,
            },
            {
              text:
                'b.	Alicia debería buscar ayuda en sus docentes y redes de apoyo para lograr guiarse y saber qué decisión tomar',
              correct: false,
            },
            {
              text:
                'c.	Alicia debería mostrarles a sus padres las ventajas del programa que desea estudiar, basándose en la información que le brinda la Universidad y sus docentes; además de establecer un espacio de diálogo con sus padres exponiendo sus gustos, habilidades y sueños',
              correct: true,
            },
            {
              text:
                'd.	Alicia debería hacerles caso a sus padres y estudiar contaduría pues es una carrera que sí da “plata”',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text: '',
            },
            {
              url: '',
            },

            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 0,
            totems: 0,
          },
        },
        {
          context: [
            {
              text:
                'De la afirmación: “el que es pobre, es pobre porque quiere” y según el Banco Mundial, “de la población mundial pobre de 15 años o más, alrededor del 70% no tiene ninguna formación o sólo una instrucción básica” ',
            },
          ],
          question: '¿Qué puedes deducir?',
          answers: [
            {
              text:
                'a.	La pobreza está directamente relacionada con no estudiar o formarse ',
              correct: false,
            },
            {
              text:
                'b.	Las pocas oportunidades en el área laboral y de formación es un factor determinante para que las personas estén en pobreza',
              correct: false,
            },
            {
              text:
                'c.	La pobreza tiene que ver estrictamente con la situación económica de las personas',
              correct: false,
            },
            {
              text:
                'd.	La pobreza es una situación que tiene trasfondo, por ejemplo, el conflicto y la violencia',
              correct: true,
            },
          ],
          negativeFeedback: [
            {
              text: '',
            },
            {
              url: '',
            },

            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 0,
            totems: 0,
          },
        },
        {
          context: [
            {
              text:
                'Pedro es un niño de 8 años, vive con sus padres y dos hermanas mayores. En clase, Pedro es un niño poco participativo, tiende a evitar el trabajo en grupo, casi no le gusta hablar o compartir espacios de ocio con sus compañeros y a veces tiende a ser agresivo. El director de aula, Antonio, se ha percatado de esta situación hace algún tiempo.',
            },
          ],
          question:
            '¿Qué debería hacer Antonio para identificar la o las causas del comportamiento de Pedro?',
          answers: [
            {
              text: 'a.	Hablar con los padres de Pedro',
              correct: false,
            },
            {
              text:
                'b.	Hablar con el coordinador para identificar las medidas que van a tomar',
              correct: false,
            },
            {
              text: 'c.	Buscar un espacio de diálogo con Pedro y escucharlo',
              correct: true,
            },
            {
              text:
                'd.	Hablar con la docente orientadora, pues ella sabe que hacer en estos casos',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text: '',
            },
            {
              url: '',
            },

            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 0,
            totems: 0,
          },
        },
        {
          context: [
            {
              text:
                'Andrea tiene 35 años y se encuentra desempleada hace 5 meses, piensa mucho en el futuro y lo que será de él sino consigue trabajo. Laura tiene 35 años y lleva 2 meses desempleada. Las dos se presentaron a un curso sobre técnicas para buscar empleo. Laura se inscribió a este curso cuando estaba realizando una de las tantas búsquedas que ha realizado para conseguir empleo, a diferencia de Andrea que se inscribió por medio de una agencia de empleo.Las dos mujeres tienen un objetivo en común y es conseguir empleo. Andrea envía a sus contactos, su hoja de vida y aplica constantemente en algunos portales web que ofertan trabajos, pero tiende a sentirse cansada, aburrida, abrumada con esta situación. Laura elaboró un plan de trabajo diario para realizar la búsqueda de empleo, atendiendo al mismo tiempo sus responsabilidades en casa y consigo misma, como hacer deporte y mejorando su perfil laboral por medio de cursos cortos con el SENA y otras entidades. ',
            },
          ],
          question: '¿Cuál crees que es la diferencia entre Andrea y Laura?',
          answers: [
            {
              text:
                'a.	No hay diferencia, pues las dos se encuentran en la misma situación',
              correct: false,
            },
            {
              text:
                'b.	Andrea es más realista con su situación laboral, hace lo que puede. Laura es demasiado optimista si cree que buscar empleo es sencillo',
              correct: false,
            },
            {
              text:
                'c.	Laura está centrada en el presente, planifica y sigue preparándose para fortalecer su curriculum, en cambio Andrea no vive el presente, no planifica y se distrae de su meta real que es conseguir empleo pensando en el futuro',
              correct: true,
            },
            {
              text:
                'd.	Cada cual asume su situación como le parece y como se le facilita, no todos somos iguales, ni asumimos de la misma forma las situaciones. No hay diferencia',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text: '',
            },
            {
              url: '',
            },

            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 0,
            totems: 0,
          },
        },
        {
          context: [
            {
              text:
                'Imagina que estás en una situación que pone a prueba tu paciencia. Es una situación que te genera estrés y por eso reaccionas violentamente. ',
            },
          ],
          question:
            'Una persona que observaba, se te acerca después y cuestiona tu manera de actuar, a lo que deberías responder:',
          answers: [
            {
              text: 'a.	sí soy yo, no es algo que le incumba',
              correct: false,
            },
            {
              text: 'b.	Escucho y me quedo pensando en lo que sucedió',
              correct: false,
            },
            {
              text:
                'c.	Asumo mi responsabilidad y acepto que mi reacción frente a la situación no fue la correcta',
              correct: true,
            },
            {
              text: 'd.	No sabría que hacer',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text: '',
            },
            {
              url: '',
            },

            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 0,
            totems: 0,
          },
        },
        {
          context: [
            {
              text: '',
            },
          ],
          question:
            'Si presencias una situación de bullying con algún compañero, tú: ',
          answers: [
            {
              text: 'a.	Te quedas callado, no quieres problemas',
              correct: false,
            },
            {
              text:
                'b.	Le comentas al docente y esperas que él decida que hacer',
              correct: true,
            },
            {
              text:
                'c.	Hablas con tu compañero que está siendo agredido y lo animas a hablar con sus padres',
              correct: true,
            },
            {
              text:
                'd.	Le cuentas a tus padres lo que está pasando con tu compañero',
              correct: true,
            },
          ],
          negativeFeedback: [
            {
              text: '',
            },
            {
              url: '',
            },

            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 0,
            totems: 0,
          },
        },
        {
          context: [
            {
              text: '',
            },
          ],
          question:
            'Respecto a la afirmación “me parece útil lograr encontrar alternativas de solución a diferentes problemáticas” crees que es algo:',
          answers: [
            {
              text: 'a.	Fácil de decir, pero difícil de lograr',
              correct: false,
            },
            {
              text: 'b.	Incierto',
              correct: false,
            },
            {
              text: 'c.	Una posibilidad al cambio',
              correct: true,
            },
            {
              text: 'd.	No me parece útil',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text: '',
            },
            {
              url: '',
            },

            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 0,
            totems: 0,
          },
        },
        {
          context: [
            {
              text:
                'Federico es un estudiante de media, nunca se había preocupado por sus notas, generalmente aprobaba las materias con la nota mínima; hasta que un día tuvo la oportunidad de acceder a un curso de proyecto de vida y se percató que si seguía haciendo las cosas de esa forma no iba a poder aplicar a una universidad pública, pues era consciente que si quería estudiar un programa de pregrado debía ser en este tipo de institución, pues su familia no contaba con recursos económicos. Después de ese curso, decidió hacer un cambio rotundo en su forma de estudiar, poco a poco fue mejorando, generó un plan de estudio y finalmente las notas ya no eran tan bajas, sino que le iba muy bien. La familia de Federico al ver sus esfuerzos querían recompensarlo.',
            },
          ],
          question: '¿Qué crees que debería asumir Federico?',
          answers: [
            {
              text: 'a.	Aprovechar y pedir el celular que tanto quiere',
              correct: false,
            },
            {
              text:
                'b.	La meta es mayor, cuando logre entrar a la universidad pública compartiría su felicidad con la familia',
              correct: true,
            },
            {
              text: 'c.	No sabría que debe hacer',
              correct: false,
            },
            {
              text: 'd.	Si uno hace algo bien pues debe tener su recompensa',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text: '',
            },
            {
              url: '',
            },

            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 0,
            totems: 0,
          },
        },
        {
          context: [
            {
              text: '',
            },
          ],
          question:
            'Consideras que ¿reconoces la diferencia entre sentirte enojado, triste o estresado?',
          answers: [
            {
              text: 'a.	Las tres emociones son parecidas para mí',
              correct: true,
            },
            {
              text: 'b.	Nunca he pensado en eso',
              correct: true,
            },
            {
              text: 'c.	Reconozco cada una, pero tienden a combinarse',
              correct: true,
            },
            {
              text:
                'd.	Cada emoción es completamente clara para mí, todo depende de la situación que se presente',
              correct: true,
            },
          ],
          negativeFeedback: [
            {
              text: '',
            },
            {
              url: '',
            },

            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 0,
            totems: 0,
          },
        },
        {
          context: [
            {
              text: '',
            },
          ],
          question:
            '¿Usualmente cuestiono mis opiniones frente a distintos temas?',
          answers: [
            {
              text: 'a.	Algunas veces',
              correct: true,
            },
            {
              text: 'b.	Siempre',
              correct: true,
            },
            {
              text: 'c.	No me he percatado',
              correct: true,
            },
            {
              text: 'd.	Nunca',
              correct: true,
            },
          ],
          negativeFeedback: [
            {
              text: '',
            },
            {
              url: '',
            },

            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 0,
            totems: 0,
          },
        },
        {
          context: [
            {
              text:
                'Si estás próximo a graduarte y aun no tienes clara la Institución de Educación Superior (IES) a la que puedes entrar a estudiar el programa que te gusta,',
            },
          ],
          question: '¿Cuál es el primer paso que debes dar para poder elegir?',
          answers: [
            {
              text:
                'a.	Preguntar a los docentes si conocen alguna Institución de Educación Superior donde pueda estudiar el programa que quiero',
              correct: true,
            },
            {
              text:
                'b.	Buscar en internet acerca de las IES que ofertan el programa que me interesa estudiar y leer el pensum de cada una',
              correct: true,
            },
            {
              text:
                'c.	Verificar con mi familia y redes de apoyo la capacidad de pago de un programa de estudios y así tendré claro hacia donde debo especializar la búsqueda de IES',
              correct: true,
            },
            {
              text: 'd.	Buscar asesoría en las IES ',
              correct: true,
            },
          ],
          negativeFeedback: [
            {
              text: '',
            },
            {
              url: '',
            },

            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 0,
            totems: 0,
          },
        },
        {
          context: [
            {
              text:
                'Jairo después del colegio decidió estudiar Ingeniería mecatrónica y a mitad del primer semestre se dio cuenta que no era lo que él esperaba o quería. Se retiró del programa y ahora está pensando en que va a hacer,',
            },
          ],
          question: '¿Qué le aconsejarías a Jairo?',
          answers: [
            {
              text:
                'a.	Lo que puede hacer es trabajar y va mirando que quiere hacer en relación a sus estudios',
              correct: true,
            },
            {
              text:
                'b.	Empezar a mirar otras opciones en las paginas web de las universidades',
              correct: true,
            },
            {
              text:
                'c.	Buscar asesoría en la universidad, específicamente en bienestar-orientación para que le ayuden a generar un plan de búsqueda en otro programa que se acomode a sus gustos y necesidades',
              correct: true,
            },
            {
              text: 'd.	Hablar con la familia y ver que solución le plantean',
              correct: true,
            },
          ],
          negativeFeedback: [
            {
              text: '',
            },
            {
              url: '',
            },

            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 0,
            totems: 0,
          },
        },
        {
          context: [
            {
              text: '',
            },
          ],
          question:
            'Te interesaría diseñar programas de computación y explorar nuevas aplicaciones tecnológicas para uso del internet ',
          answers: [
            {
              text: 'a.	Te interesa mucho',
              correct: true,
            },
            {
              text: 'b.	Te interesa más o menos',
              correct: true,
            },
            {
              text: 'c.	Te interesa poco',
              correct: true,
            },
            {
              text: 'd.	No me interesa',
              correct: true,
            },
          ],
          negativeFeedback: [
            {
              text: '',
            },
            {
              url: '',
            },

            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 0,
            totems: 0,
          },
        },
        {
          context: [
            {
              text: '',
            },
          ],
          question:
            'Te interesaría criar, cuidar y tratar animales domésticos y de campo',
          answers: [
            {
              text: 'a.	Te interesa mucho',
              correct: true,
            },
            {
              text: 'b.	Te interesa más o menos',
              correct: true,
            },
            {
              text: 'c.	Te interesa poco',
              correct: true,
            },
            {
              text: 'd.	No me interesa',
              correct: true,
            },
          ],
          negativeFeedback: [
            {
              text: '',
            },
            {
              url: '',
            },

            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 0,
            totems: 0,
          },
        },
        {
          context: [
            {
              text: '',
            },
          ],
          question: 'Te interesaría ilustrar, dibujar y animar digitalmente',
          answers: [
            {
              text: 'a.	Te interesa mucho',
              correct: true,
            },
            {
              text: 'b.	Te interesa más o menos',
              correct: true,
            },
            {
              text: 'c.	Te interesa poco',
              correct: true,
            },
            {
              text: 'd.	No me interesa',
              correct: true,
            },
          ],
          negativeFeedback: [
            {
              text: '',
            },
            {
              url: '',
            },

            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 0,
            totems: 0,
          },
        },
        {
          context: [
            {
              text: '',
            },
          ],
          question:
            'Te interesaría seleccionar, capacitar y motivar al personal de una organización o empresa',
          answers: [
            {
              text: 'a.	Te interesa mucho',
              correct: true,
            },
            {
              text: 'b.	Te interesa más o menos',
              correct: true,
            },
            {
              text: 'c.	Te interesa poco',
              correct: true,
            },
            {
              text: 'd.	No me interesa',
              correct: true,
            },
          ],
          negativeFeedback: [
            {
              text: '',
            },
            {
              url: '',
            },

            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 0,
            totems: 0,
          },
        },
        {
          context: [
            {
              text: '',
            },
          ],
          question:
            'Te interesaría realizar excavaciones para descubrir restos del pasado',
          answers: [
            {
              text: 'a.	Te interesa mucho',
              correct: true,
            },
            {
              text: 'b.	Te interesa más o menos',
              correct: true,
            },
            {
              text: 'c.	Te interesa poco',
              correct: true,
            },
            {
              text: 'd.	No me interesa',
              correct: true,
            },
          ],
          negativeFeedback: [
            {
              text: '',
            },
            {
              url: '',
            },

            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 0,
            totems: 0,
          },
        },
        {
          context: [
            {
              text: '',
            },
          ],
          question:
            'Te interesaría resolver problemas de cálculo para construir un puente',
          answers: [
            {
              text: 'a.	Te interesa mucho',
              correct: true,
            },
            {
              text: 'b.	Te interesa más o menos',
              correct: true,
            },
            {
              text: 'c.	Te interesa poco',
              correct: true,
            },
            {
              text: 'd.	No me interesa',
              correct: true,
            },
          ],
          negativeFeedback: [
            {
              text: '',
            },
            {
              url: '',
            },

            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 0,
            totems: 0,
          },
        },
        {
          context: [
            {
              text: '',
            },
          ],
          question:
            'Diseñar cursos para enseñar a la gente sobre temas de salud e higiene',
          answers: [
            {
              text: 'a.	Te interesa mucho',
              correct: true,
            },
            {
              text: 'b.	Te interesa más o menos',
              correct: true,
            },
            {
              text: 'c.	Te interesa poco',
              correct: true,
            },
            {
              text: 'd.	No me interesa',
              correct: true,
            },
          ],
          negativeFeedback: [
            {
              text: '',
            },
            {
              url: '',
            },

            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 0,
            totems: 0,
          },
        },
        {
          context: [
            {
              text: '',
            },
          ],
          question: 'Tocar un instrumento y componer música',
          answers: [
            {
              text: 'a.	Te interesa mucho',
              correct: true,
            },
            {
              text: 'b.	Te interesa más o menos',
              correct: true,
            },
            {
              text: 'c.	Te interesa poco',
              correct: true,
            },
            {
              text: 'd.	No me interesa',
              correct: true,
            },
          ],
          negativeFeedback: [
            {
              text: '',
            },
            {
              url: '',
            },

            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 0,
            totems: 0,
          },
        },
      ],
    },
    lenguaje: {
      10: [
        {
          context: [
            {
              text:
                'Responda las preguntas 1, 2, 3 y 4 de acuerdo con la siguiente información: ',
            },
            {
              text: 'Identidad cultural. ',
            },
            {
              text:
                'El concepto de identidad cultural encierra un sentido de pertenencia a un grupo social con el cual se comparten rasgos culturales, como costumbres, valores y creencias. La identidad no es un concepto fijo, sino que se recrea individual y colectivamente y se alimenta de forma continua de la influencia exterior. ',
            },
            {
              text:
                '“La identidad cultural de un pueblo viene definida históricamente a través de múltiples aspectos en los que se plasma su cultura, como la lengua, instrumento de comunicación entre los miembros de una comunidad, las relaciones sociales, ritos y ceremonias propias, o los comportamientos colectivos, esto es, los sistemas de valores y creencias   ',
            },
            {
              text:
                '.(...) Un rasgo propio de estos elementos de identidad cultural es su carácter inmaterial y anónimo, pues son producto de la colectividad” (González Varas, 2000: 43) .',
            },

            {
              text:
                ' ¿Qué es la identidad? Es el sentido de pertenencia a una colectividad, a un sector social, a un grupo específico de referencia. Esta colectividad puede estar por lo general localizada geográficamente, pero no de manera necesaria (por ejemplo, los casos de refugiados, desplazados, emigrantes, etc.). Hay manifestaciones culturales que expresan con mayor intensidad que otras su sentido de identidad, hecho que las diferencia de otras actividades que son parte común de la vida cotidiana. Por ejemplo, manifestaciones como la fiesta, el ritual de las procesiones, la música, la danza. A estas representaciones culturales de gran repercusión pública, la UNESCO las ha registrado bajo el concepto de “patrimonio cultural inmaterial” (Romero Cevallos, 2005: 62)',
            },
            {
              text:
                '“La identidad sólo es posible y puede manifestarse a partir del patrimonio cultural, que existe de antemano y su existencia es independiente de su reconocimiento o valoración. Es la sociedad la que a manera de agente activo, configura su patrimonio cultural al establecer e identificar aquellos elementos que desea valorar y que asume como propios y los que, de manera natural, se van convirtiendo en el referente de identidad (...) Dicha identidad implica, por lo tanto, que las personas o grupos de personas se reconocen históricamente en su propio entorno físico y social y es ese constante reconocimiento el que le da carácter activo a la identidad cultural (...) El patrimonio y la identidad cultural no son elementos estáticos, sino entidades sujetas a permanentes cambios, están condicionadas por factores externos y por la continua retroalimentación entre ambos”(Bákula, 2000: 169).  ',
            },
            {
              text:
                'La identidad está ligada a la historia y al patrimonio cultural. La identidad cultural no existe sin la memoria, sin la capacidad de reconocer el pasado, sin elementos simbólicos o referentes que le son propios y que ayudan a construir el futuro.Fuente: Molano L., Olga Lucía. (2007) Identidad cultural un concepto que evoluciona, Revista Opera, núm. 7, pp. 69-84.',
            },
          ],

          question:
            'De acuerdo con el texto anterior ¿Cuál de las siguientes afirmaciones es incompatible con el concepto de identidad cultural expresado en el texto?',
          answers: [
            {
              text:
                'a. La identidad cultural es un referente para reconocer un grupo humano, incluso, fuera de su territorio. ',
              correct: false,
            },
            {
              text:
                'b.La identidad cultural surge y se consolida a partir de una persona reconocida y apreciada en la sociedad ',
              correct: true,
            },
            {
              text:
                'c.La identidad cultural se nutre del pasado, la memoria y los símbolos.',
              correct: false,
            },
            {
              text:
                'd.La identidad cultural se alimenta y fortalece desde dentro y desde el exterior.',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text:
                'TE INVITAMOS A QUE MEJORES TU NIVEL DE desempeño. Revisa de nuevo la pregunta y acude a la(s) siguiente(s) fuente(s): ',
            },
            {
              url: 'https://www.redalyc.org/pdf/675/67500705.pdf',
            },
            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 5,
            totems: 5,
          },
          difficult: 5,
        },
        {
          context: [
            {
              text:
                'Responda las preguntas 1, 2, 3 y 4 de acuerdo con la siguiente información: ',
            },
          ],
          question:
            'De acuerdo con el contenido del texto, el patrimonio cultural inmaterial reconocido por la UNESCO se refiere a:',
          answers: [
            {
              text:
                'a. Todas las manifestaciones culturales que dan identidad a una sociedad. ',
              correct: false,
            },
            {
              text:
                'b.  Manifestaciones culturales que son referente de identidad y que se expresan con más intensidad que otras obteniendo repercusión pública. ',
              correct: true,
            },
            {
              text:
                'c. La integración entre la identidad y el patrimonio cultural ',
              correct: false,
            },
            {
              text:
                'd. La capacidad que tiene una cultura de reconocer el pasado y los elementos simbólicos.',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text:
                'TE INVITAMOS A QUE MEJORES TU NIVEL DE desempeño. Revisa de nuevo la pregunta y acude a la(s) siguiente(s) fuente(s): ',
            },
            {
              url: 'https://www.redalyc.org/pdf/675/67500705.pdf',
            },

            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 2.5,
            totems: 0,
          },
          difficult: 2.5,
        },
        {
          context: [{}],
          question:
            'De acuerdo con el contenido del texto, una conclusión coherente es:',
          answers: [
            {
              text:
                'a. La identidad cultural está más atada al pasado que al presente, ya que en el encuentra el soporte para fortalecer la identidad. ',
              correct: false,
            },
            {
              text:
                'b. Las colectividades pueden perder su identidad si se resquebraja su memoria histórica y sus símbolos esenciales. ',
              correct: false,
            },
            {
              text:
                'c. La identidad supone un reconocimiento y apropiación de la memoria histórica, del pasado. Un pasado que puede ser reconstruido o reinventado, pero que es conocido y apropiado por todos.  ',
              correct: true,
            },
            {
              text:
                'd. El cambio termina aniquilando la identidad cultural, ya que la desdibuja y la resquebraja.',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text:
                'TE INVITAMOS A QUE MEJORES TU NIVEL DE desempeño. Revisa de nuevo la pregunta y acude a la(s) siguiente(s) fuente(s): ',
            },
            {
              url: 'https://www.redalyc.org/pdf/675/67500705.pdf',
            },

            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 7.5,
            totems: 0,
          },
          difficult: 7.5,
        },
        {
          context: [{}],
          question:
            '¿Cuál de las siguientes opciones describe mejor la relación entre el contenido del texto y el título del artículo de donde se extrajo?',
          answers: [
            {
              text:
                'a. La identidad cultural se recrea de manera individual y colectiva y se alimenta permanentemente de la influencia exterior.  ',
              correct: true,
            },
            {
              text:
                'b. La identidad cultural sólo se puede manifestar a partir del patrimonio cultural.',
              correct: false,
            },
            {
              text:
                'c. La identidad cultural existe con la memoria para reconocer el pasado y los elementos simbólicos propios. ',
              correct: false,
            },
            {
              text:
                'd. Es el sentido de pertenencia a una colectividad, a un sector social, a un grupo específico de referencia.',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text:
                'TE INVITAMOS A QUE MEJORES TU NIVEL DE desempeño. Revisa de nuevo la pregunta y acude a la(s) siguiente(s) fuente(s): ',
            },
            {
              url: 'https://www.redalyc.org/pdf/675/67500705.pdf',
            },

            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 7.5,
            totems: 0,
          },
          difficult: 7.5,
        },
        {
          context: [
            {
              text:
                'Responda las preguntas 5 y 6 de acuerdo con la siguiente información.  ',
            },
            {
              text:
                'Más allá de un concepto abstracto, las tradiciones culturales son una red de comportamientos, ideas, sentimientos, deseos, percepciones, relaciones, entre otros aspectos, que identifi¬can a las personas de un lugar específi¬co, construidas desde las subjetividades, los imaginarios colectivos, las relaciones con el espacio y la memoria ancestral, también son el reflejo de la resistencia social y cultural de cada comunidad; además, estas se caracterizan porque cada persona percibe su cultura individualmente y la exterioriza colectivamente, lo que le otorga un carácter dinámico, en palabras de Warnier (2002) “No creamos que la cultura de la tradición sea la reproducción idéntica de un conjunto de hábitos petrifi¬cados. Las lenguas y las culturas cambian, pues están inmersas en las turbulencias de la historia. A ¬fin de asegurar su función de orientación, deben integrar el cambio” (p.13)..  ',
            },
            {
              text:
                'Fuente: Fonseca, A.J. y Quesada, E.G. (2014). Confi¬guración de la tradición cultural campesina desde la educación popular. En: Espiral, Revista de Docencia e Investigación, 4(1), 49 – 58. ',
            },
          ],
          question: 'Los autores, introducen la cita de Warnier con el fin de:',
          answers: [
            {
              text:
                'a. Señalar un nuevo elemento o característica que se incluye en la definición.  ',
              correct: false,
            },
            {
              text:
                'b. Convencer al lector que las tradiciones culturales cambian a lo largo del tiempo. ',
              correct: false,
            },
            {
              text:
                'c. Reforzar la afirmación de los autores, en el sentido que las tradiciones culturales tienen un carácter dinámico. ',
              correct: true,
            },
            {
              text:
                'd. Legitimar la definición de tradiciones culturales que presentan los autores.',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text:
                'TE INVITAMOS A QUE MEJORES TU NIVEL DE desempeño. Revisa de nuevo la pregunta y acude a la(s) siguiente(s) fuente(s): ',
            },
            {
              url: 'file:///C:/Users/gabor/Downloads/550-1081-1-PB.pdf',
            },

            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 2.5,
            totems: 0,
          },
          difficult: 2.5,
        },
        {
          context: [{}],
          question:
            '¿Cuál de las siguientes afirmaciones se infiere del texto?',
          answers: [
            {
              text:
                'a. Las tradiciones culturales son unos conceptos y comportamientos abstractos compuestos por una red de ideas, sentimientos, deseos, percepciones y relaciones que dan identidad a las personas. ',
              correct: false,
            },
            {
              text:
                'b. Las tradiciones culturales son una red de comportamientos, ideas, sentimientos, deseos, percepciones y relaciones individuales que no dan identidad a las personas. ',
              correct: false,
            },
            {
              text:
                'c. Las tradiciones culturales son una red de comportamientos, ideas, sentimientos, deseos, entre otros aspectos, que dan identidad a las personas y se centran en las memorias ancestrales. ',
              correct: false,
            },
            {
              text:
                'd. Las tradiciones culturales son una red dinámica de comportamientos, ideas, sentimientos, deseos, entre otros aspectos, que dan identidad a las personas, quienes la perciben de manera individual y las manifiestan de manera colectiva. ',
              correct: true,
            },
          ],
          negativeFeedback: [
            {
              text:
                'TE INVITAMOS A QUE MEJORES TU NIVEL DE desempeño. Revisa de nuevo la pregunta y acude a la(s) siguiente(s) fuente(s): ',
            },
            {
              url: 'file:///C:/Users/gabor/Downloads/550-1081-1-PB.pdf',
            },

            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 6,
            totems: 0,
          },
          difficult: 6,
        },
        {
          context: [
            {
              text:
                'Responda las preguntas 7, 8, 9 y 10 de acuerdo con la siguiente información.  ',
            },
            {
              text:
                'La cultura en los Objetivos de Desarrollo del Milenio.Hoy, quince años después de la aprobación de los Objetivos de Desarrollo del Milenio, sabemos que no ha sido posible cumplir con todas esas metas porque, en buena medida, los programas, estrategias y políticas de desarrollo adoptados no eran suficientes, o no fueron definidos adecuadamente. Asombrosamente, la cultura no fue incorporada a los Objetivos de Desarrollo del Milenio, ni tampoco a sus indicadores, al alegarse numerosas dificultades para poder medir su impacto en el desarrollo.',
            },
            {
              text:
                'Sin embargo, una de las razones por las que no se alcanzaron los objetivos fijados en el año 2000 es probablemente no haber reconocido explícitamente el papel de la cultura en el crecimiento económico, en la gestión de recursos, en la resolución de conflictos, en abordar las inequidades sociales o en la reafirmación de identidades.   ',
            },
            {
              text:
                ' Tampoco se entendió entonces que la cultura es un vector extremadamente eficiente de conocimiento, y que, por tanto, es la base de la innovación y la creación, incluida la creación científica. Se ignoró, quizás, que no existen recetas únicas de desarrollo, ya que son las culturas las que deben de determinar sus modelos de desarrollo, y no al contrario. Se olvidó, en fin, que reconocer, valorar y compartir la cultura, las culturas de cada uno de nosotros y de nuestros colectivos diversos, es el paso imprescindible para reducir la desigualdad social y permitir la integración plena en la sociedad. Es necesario recordar que el valor de la cultura está en la producción y consumo de bienes, servicios y actividades culturales, y en el conocimiento que nos transmitimos unos a otros a través de símbolos que comprendemos e interiorizamos, para luego transformarlos e innovar. Esos símbolos compartidos dan un sentimiento de pertenencia colectiva y de identidad, una cohesión social necesaria para establecer relaciones, sean comerciales, profesionales o personales. ',
            },
            {
              text:
                'Además, la comprensión de los símbolos empleados por otros colectivos, a través del intercambio cultural, nos permiten establecer relaciones más allá de nuestro grupo y, por ende, adquirir nuevos conocimientos. Nos permite resolver conflictos, y entablar un diálogo para ampliar horizontes. Por todo ello, la cultura debe ser reconocida como un pilar esencial de desarrollo que complemente los pilares económico, social y medioambiental. La cultura entendida como un sector económico, como un medio de transmisión de conocimiento y de identidades, y como base de la calidad de vida, de la cohesión social, la resolución de conflictos y la reducción de desigualdades. ',
            },
            {
              text:
                ' La diversidad cultural es tan necesaria para el desarrollo sostenible como la biodiversidad. Si se reduce la diversidad cultural, o se limita la capacidad de intercambio cultural entre las sociedades, se destruirían recursos culturales. Esos recursos, a diferencia de los naturales, son ilimitados si se protegen y promocionan, ya que surgen de las personas mismas y del intercambio entre ellas.Ésa es la teoría. Sin embargo, en la práctica, hay una infrautilización sistemática de los recursos culturales, sean patrimoniales o contemporáneos, terrestres o subacuáticos, muebles o inmuebles, materiales o inmateriales, debido a la falta, o peor aún, de la no aplicación de normas, medidas y políticas para su protección, gestión y promoción. --Fuente: UNESCO, (2016). Cultura y desarrollo. Agenda 2030. Plan de trabajo regional de cultura para América Latina y el Caribe LAC UNESCO 2016 – 2021. ',
            },
          ],
          question:
            'El conector “sin embargo”, al inicio del tercer párrafo, tiene la función de:',
          answers: [
            {
              text: 'a. Introducir un nuevo tema de reflexión. ',
              correct: false,
            },
            {
              text: 'b. Negar la información anterior. ',
              correct: false,
            },
            {
              text:
                'c. Destacar la equivocación de no incluir la cultura en los Objetivos del Milenio. ',
              correct: true,
            },
            {
              text:
                'd. Agregar nuevos detalles acerca de los Objetivos del Milenio.',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text:
                'TE INVITAMOS A QUE MEJORES TU NIVEL DE desempeño. Revisa de nuevo la pregunta y acude a la(s) siguiente(s) fuente(s): ',
            },
            {
              url:
                'https://cerlalc.org/wp-content/uploads/2019/10/19-Cultura-y-desarrollo-14-Agenda-2030_2016.pdf',
            },

            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 2.5,
            totems: 0,
          },
          difficult: 2.5,
        },
        {
          context: [{}],
          question:
            '¿Cuál de los siguientes argumentos utiliza el autor para apoyar el planteamiento central del texto?',
          answers: [
            {
              text:
                'a. En la práctica, hay una infrautilización sistemática de los recursos culturales. ',
              correct: false,
            },
            {
              text:
                'b. Los recursos culturales, a diferencia de los naturales, son ilimitados si se protegen y promocionan, ya que surgen de las personas mismas y del intercambio entre ellas.',
              correct: false,
            },
            {
              text:
                'c. La cultura debe ser reconocida como un pilar esencial de desarrollo, que complemente los pilares económico, social y medioambiental. ',
              correct: true,
            },
            {
              text:
                'd. Hoy, quince años después de la aprobación de los Objetivos de Desarrollo del Milenio, sabemos que no ha sido posible cumplir con todas esas metas.',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text:
                'TE INVITAMOS A QUE MEJORES TU NIVEL DE desempeño. Revisa de nuevo la pregunta y acude a la(s) siguiente(s) fuente(s): ',
            },
            {
              url:
                'https://cerlalc.org/wp-content/uploads/2019/10/19-Cultura-y-desarrollo-14-Agenda-2030_2016.pdf',
            },

            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 2.5,
            totems: 0,
          },
          difficult: 2.5,
        },
        {
          context: [{}],
          question:
            '¿Qué conclusión puede derivarse del texto para la formulación de nuevos objetivos de desarrollo con alcance mundial?',
          answers: [
            {
              text:
                'a. Existe muy poca aplicación de normas, medidas y políticas para la protección cultural. ',
              correct: false,
            },
            {
              text:
                'b. Existe una gran dificultad para medir el impacto de la cultura en el desarrollo, a partir de indicadores. ',
              correct: false,
            },
            {
              text:
                'c. Se presenta una infrautilización sistemática de los recursos culturales a nivel mundial.',
              correct: false,
            },
            {
              text:
                'd. La cultura es un pilar esencial del desarrollo, junto a lo económico, social y medioambiental.',
              correct: true,
            },
          ],
          negativeFeedback: [
            {
              text:
                'TE INVITAMOS A QUE MEJORES TU NIVEL DE desempeño. Revisa de nuevo la pregunta y acude a la(s) siguiente(s) fuente(s): ',
            },
            {
              url:
                'https://cerlalc.org/wp-content/uploads/2019/10/19-Cultura-y-desarrollo-14-Agenda-2030_2016.pdf',
            },

            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 7.5,
            totems: 0,
          },
          difficult: 7.5,
        },
        {
          context: [
            {
              text:
                '“Aprender a usar información científica forma el pensamiento científico de los estudiantes y desarrolla la capacidad de elaborar una producción científica documentada. Forma la capacidad para solucionar problemas, desarrolla el pensamiento crítico y fomenta las metodologías para ser autodidacta. Habilidades que permiten actualizar permanente e independientemente los conocimientos que constituyen el capital variable de la formación profesional.”Tomado de: Gutiérrez Vargas, M.E. (2002). El aprendizaje de la ciencia y la información científica en Educación Superior. Anales de Documentación, núm. 5, p. 205.     ',
            },
            {
              url: 'https://www.redalyc.org/pdf/635/63500507.pdf',
            },
          ],
          question: 'Del texto no se puede deducir que:',
          answers: [
            {
              text:
                'a. El aprender a usar la información científica ayuda al desarrollo de nuevas capacidades en los estudiantes ',
              correct: false,
            },
            {
              text:
                'b. El desarrollo de la autonomía es una capacidad humana que se favorece con el desarrollo de las capacidades científicas. ',
              correct: false,
            },
            {
              text:
                'c. El pensamiento crítico de un estudiante surge de su actuación cotidiana. ',
              correct: true,
            },
            {
              text:
                'd. La solución de problemas requiere el desarrollo de las capacidades de pensamiento científico.',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text:
                'TE INVITAMOS A QUE MEJORES TU NIVEL DE desempeño. Revisa de nuevo la pregunta y acude a la(s) siguiente(s) fuente(s): ',
            },
            {
              text: 'Leer detenidamente el texto que aporta el contexto.',
            },

            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 2.5,
            totems: 0,
          },
          difficult: 2.5,
        },
        {
          context: [
            {
              text:
                'En su concepto sobre Alfabetización Informacional, la American Library Association (ALA) establece que: "una persona debe ser capaz de reconocer cuándo necesita información, así como tener la capacidad para localizarla, evaluarla y utilizarla con efectividad". También afirma que "los individuos alfabetizados informacionalmente son aquellos que han aprendido cómo aprender. Ellos saben cómo aprender porque saben cómo está organizado el conocimiento, cómo encontrar información y cómo emplear la información de manera que otros puedan aprender de ellos”.Tomado de: Valdés Payo, Lilibeth. (2008). Alfabetización informacional: una breve reflexión sobre el tema. ACIMED, 17(2) Recuperado en 29 de marzo de 2021, de  ',
            },
            {
              url:
                'http://scielo.sld.cu/scielo.php?script=sci_arttext&pid=S1024-94352008000200006&lng=es&tlng=es.',
            },
          ],
          question:
            'De acuerdo con el contenido del texto, la intencionalidad formativa de la alfabetización informacional es:',
          answers: [
            {
              text:
                'a. Desarrollar metodologías para ubicar, hacer uso eficaz y eficiente de los recursos de información para aprender a aprender. ',
              correct: true,
            },
            {
              text:
                'b. Desarrollar habilidades y nuevas capacidades para el uso de herramientas informáticas. ',
              correct: false,
            },
            {
              text:
                'c. Aprender procedimientos y mecanismos para buscar y localizar información. ',
              correct: false,
            },
            {
              text:
                'd. Aprender a identificar las necesidades de información y su localización.',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text:
                'TE INVITAMOS A QUE MEJORES TU NIVEL DE desempeño. Revisa de nuevo la pregunta y acude a la(s) siguiente(s) fuente(s):Leer detenidamente el texto que aporta el contexto. ',
            },

            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 5,
            totems: 0,
          },
          difficult: 5,
        },
        {
          context: [
            {
              text:
                'El libro electrónico ha pasado supuestamente de extinguir al libro físico durante una época, a ser un valor a la baja, dando al traste con diversas empresas  ',
            },
          ],
          question: 'De la idea anterior se puede inferir que:',
          answers: [
            {
              text: 'a. En el futuro no habrá libros físicos. ',
              correct: false,
            },
            {
              text: 'b.	Los libros electrónicos están en crisis.',
              correct: true,
            },
            {
              text: 'c.	El libro electrónico va a extinguir el libro físico. ',
              correct: false,
            },
            {
              text:
                'd.	Las expectativas de desarrollo del libro electrónico se están cumpliendo.',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text:
                'TE INVITAMOS A QUE MEJORES TU NIVEL DE desempeño. Revisa de nuevo la pregunta y acude a la(s) siguiente(s) fuente(s): Leer detenidamente el texto que aporta el contexto. ',
            },

            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 5,
            totems: 0,
          },
          difficult: 5,
        },
        {
          context: [
            {
              text:
                'Responda las preguntas 14, 15 y 16, de acuerdo con la siguiente información.  ',
            },
            {
              text:
                'Daniel Cassany propone que en el nivel de lectura literal (el autor denomina, las líneas), se da por sentado que el significado se encuentra en el propio texto, de donde es extraído por el lector. Dicho significado se descubre al descodificar las palabras y las frases que articulan el texto. Es claro que para este enfoque el texto tiene el papel activo, mientras que el lector es un receptor pasivo. El nivel inferencial (el autor denomina, entre líneas) considera que el significado y la comprensión es producto de la interacción del lector y el texto. La información que proporciona el texto es complementada por la información que proyecta sobre él el lector. Y, esto puede hacerlo gracias a que esa información personal se encuentra configurada en un esquema mental, el cual es un entramado de vivencias y conocimientos que posee identificando lo que sugiere el texto. El nivel de lectura crítica (el autor denomina, detrás de las líneas) considera que cada texto contiene un trasfondo social y cultural de donde proviene; por lo tanto, el discurso y argumentos utilizados para sustentar las ideas reflejan los puntos de vista y la concepción que tiene el autor de la realidad, lo que incluye las intencionalidades particulares, la ideología que subyace en el texto, la interrelación con otros discursos, la estructura particular del texto y unas formas comunicativas especiales. ',
            },
            {
              text:
                'Tomado de: CASSANY, DANIEL. (2006). Tras las líneas. Sobre la lectura contemporánea. Barcelona: Editorial Anagrama S.A. p. 52-62. ',
            },
          ],
          question:
            'Una pregunta que da cuenta del nivel de lectura crítica es:',
          answers: [
            {
              text: 'a. ¿Qué significado tiene las ideas del texto? ',
              correct: false,
            },
            {
              text: 'b ¿Cuáles son las palabras claves del texto? ',
              correct: false,
            },
            {
              text: 'c. ¿Qué ideas centrales plantea el texto? ',
              correct: false,
            },
            {
              text: 'd. ¿Qué validez tienen los argumentos planteados?',
              correct: true,
            },
          ],
          negativeFeedback: [
            {
              text:
                'TE INVITAMOS A QUE MEJORES TU NIVEL DE desempeño. Revisa de nuevo la pregunta y acude a la(s) siguiente(s) fuente(s): Leer detenidamente el texto que aporta el contexto.',
            },

            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 5,
            totems: 0,
          },
          difficult: 5,
        },
        {
          context: [],
          question:
            'Al evaluar el contenido, se puede concluir que la intencionalidad de Cassany al escribir el texto es:',
          answers: [
            {
              text:
                'a. Que los lectores elijan cuál nivel de lectura se acomoda más a sus intereses. ',
              correct: false,
            },
            {
              text:
                'b. Que los docentes elijan el nivel que más conviene desarrollar con sus estudiantes. ',
              correct: false,
            },
            {
              text:
                'c. Mostrar que la lectura es un proceso que se va desarrollando en niveles que tienen distinta complejidad.',
              correct: true,
            },
            {
              text:
                'd. Mostrar que el nivel de lectura crítica es lo único que vale la pena aprender.',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text:
                'TE INVITAMOS A QUE MEJORES TU NIVEL DE desempeño. Revisa de nuevo la pregunta y acude a la(s) siguiente(s) fuente(s): Leer detenidamente el texto que aporta el contexto.',
            },

            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 7.5,
            totems: 0,
          },
          difficult: 7.5,
        },
        {
          context: [],
          question:
            'A partir del planteamiento de Cassany sobre el nivel de lectura inferencial, si usted observa una vela blanca encendida sobre una superficie plana, una inferencia correcta sería afirmar que:',
          answers: [
            { text: 'a. Su color es blanco. ', correct: false },
            {
              text: 'b. Libera luz mientras se quema. ',
              correct: false,
            },
            { text: 'c. Disminuye su tamaño al consumirse.', correct: false },
            {
              text: 'd. Necesita oxígeno para estar encendida',
              correct: true,
            },
          ],
          negativeFeedback: [
            {
              text:
                'TE INVITAMOS A QUE MEJORES TU NIVEL DE desempeño. Revisa de nuevo la pregunta y acude a la(s) siguiente(s) fuente(s): Leer detenidamente el texto que aporta el contexto.',
            },

            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 5,
            totems: 0,
          },
          difficult: 5,
        },
        {
          context: [
            {
              text:
                'La analogía puede concebirse como un proceso en el que, el tópico o concepto científico nuevo que se va a aprender, se compara con el análogo, que es la situación conocida y familiar al contexto de los aprendices, favoreciendo de esta manera la comprensión del concepto científico; esto se hace posible al establecerse una correspondencia de relaciones entre las características similares de ambos (del tópico y del análogo), facilitando la construcción de significados y sentidos a la información nueva, para que se puedan elaborar estructuras de conocimiento más comprensibles. ',
            },
            {
              text:
                'Elaborado a partir de: Fernández González, J.; González González, B.M.; Moreno Jiménez, T. La modelización con analogías en los textos de ciencias de Secundaria Revista Eureka sobre Enseñanza y Divulgación de las Ciencias, vol. 2, núm. 3, 2005, pp. 430-439. Recuperado de:  ',
            },
            {
              url: 'https://www.redalyc.org/pdf/920/92020310.pdf',
            },
          ],
          question:
            'A partir del concepto anterior, ¿cuál de las siguientes opciones es una analogía?',
          answers: [
            {
              text:
                'a. Los enlaces químicos covalentes que unen los átomos pueden compararse a la lucha entre dos personas jalando una cuerda por los extremos.  ',
              correct: true,
            },
            {
              text:
                'b. Los átomos son la porción material menor de un elemento químico que interviene en las reacciones químicas y posee las propiedades características de dicho elemento.',
              correct: false,
            },
            { text: 'c. Cuando el río suena, piedras lleva. ', correct: false },
            {
              text: 'd. Las montañas son tan altas que cuesta mucho subirlas.',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text:
                'TE INVITAMOS A QUE MEJORES TU NIVEL DE desempeño. Revisa de nuevo la pregunta y acude a la(s) siguiente(s) fuente(s): Leer detenidamente el texto que aporta el contexto.',
            },

            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 7.5,
            totems: 0,
          },
          difficult: 7.5,
        },
        {
          context: [
            {
              text:
                'Villardón afirma que, la evaluación tiene una función reguladora del aprendizaje, puesto que las decisiones que toman los estudiantes para gestionar el estudio están relacionadas con las demandas de la evaluación a las que tienen que enfrentarse.Tomado de: Villardón, L. (2006). Evaluación del aprendizaje para promover el desarrollo de competencias. Educatio Siglo XXI, No. 4. Recuperado de:  ',
            },
            {
              url: 'https://revistas.um.es/educatio/article/view/153/136',
            },
          ],
          question: 'Del texto anterior se puede inferir que:',
          answers: [
            {
              text: 'a. La evaluación fomenta la amplitud del aprendizaje. ',
              correct: false,
            },
            {
              text: 'b. La evaluación condiciona el aprendizaje. ',
              correct: true,
            },
            {
              text: 'c. La evaluación orienta adecuadamente el aprendizaje. ',
              correct: false,
            },
            {
              text:
                'd. La evaluación no afecta al aprendizaje, sino que valora lo aprendido.',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text:
                'TE INVITAMOS A QUE MEJORES TU NIVEL DE desempeño. Revisa de nuevo la pregunta y acude a la(s) siguiente(s) fuente(s): Leer detenidamente el texto que aporta el contexto.',
            },

            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 5,
            totems: 0,
          },
          difficult: 5,
        },
        {
          context: [
            {
              text:
                'La metacognición es un hecho mental –motivacional referido esencialmente a la capacidad que el ser humano tiene para someter a estudio y análisis los procesos que él mismo utiliza para conocer, aprender y resolver problemas y poder mejorar sus habilidades estratégicas. Es el conocimiento que tenemos sobre nuestros procesos cognitivos, y también el control que ejercemos sobre dichos procesos para mejorarlos. ',
            },
            {
              text:
                'Tomado de: Correa Z., María Elena; Castro Rubilar, Fancy; Lira Ramos, Hugo. (2002). Hacia una conceptualización de la metacognición y sus ámbitos de desarrollo Horizontes. Educacionales, núm. 7. Recuperado de:  ',
            },
            {
              url: 'https://www.redalyc.org/pdf/979/97917885008.pdf',
            },
          ],
          question:
            'De acuerdo con el contenido del texto, una pregunta que corresponde con la definición de metacognición es:',
          answers: [
            {
              text: 'a. ¿Cuál es tema que sigue a continuación? ',
              correct: false,
            },
            {
              text:
                'b. ¿Cuáles fueron las dificultades que tuvo para aprender el tema? ',
              correct: true,
            },
            {
              text:
                'cc. ¿Cuál es la intencionalidad que tiene el autor con esa afirmación? ',
              correct: false,
            },
            {
              text:
                'd. Profesor ¿cuál es la idea central que usted quiere expresar',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text:
                'TE INVITAMOS A QUE MEJORES TU NIVEL DE desempeño. Revisa de nuevo la pregunta y acude a la(s) siguiente(s) fuente(s): Leer detenidamente el texto que aporta el contexto.',
            },

            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 7.5,
            totems: 0,
          },
          difficult: 7.5,
        },
        {
          context: [
            {
              text:
                'El Decreto 1290 de 2009 del Ministerio de Educación Nacional, que reglamenta la evaluación del aprendizaje y promoción de los estudiantes de educación básica y media, establece que los propósitos de la evaluación de los estudiantes en la institución son: a)identificar las características personales, intereses, ritmos de desarrollo y estilos de aprendizaje del estudiante para valorar su avance; b)proporcionar información básica para consolidar o reorientar los procesos educativos relacionados con el desarrollo integral del estudiante; c)suministrar información que permita implementar estrategias pedagógicas para apoyar a los estudiantes que presenten debilidades y desempeños superiores en su proceso formativo; d)determinar la proporción de estudiantes; e)aportar información para el ajuste e implementación del plan de mejoramiento institucional. ',
            },
            {
              text: 'Tomado de: MEN. Decreto 1290 de 2009. Recuperado de: ',
            },
            {
              url:
                'https://www.mineducacion.gov.co/1621/articles-187765_archivo_pdf_decreto_1290.pdf',
            },
          ],
          question:
            'A partir del contenido del texto, la orientación que se le da a evaluación es de:',
          answers: [
            {
              text: 'a. De promoción, mejoramiento y desarrollo ',
              correct: true,
            },
            {
              text: 'b. Diagnosticar, calificar y promocionar. ',
              correct: false,
            },
            { text: 'c. Calificar, informar y reportar. ', correct: false },
            {
              text: 'd. Analizar, calificar y registrar.',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text:
                'TE INVITAMOS A QUE MEJORES TU NIVEL DE desempeño. Revisa de nuevo la pregunta y acude a la(s) siguiente(s) fuente(s): Leer detenidamente el texto que aporta el contexto. ',
            },

            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 5,
            totems: 0,
          },
          difficult: 5,
        },
      ],
      11: [
        {
          context: [
            {
              text:
                'Responda las preguntas 1, 2, 3 y 4 de acuerdo con la siguiente información: ',
            },
            {
              text: 'Identidad cultural y desarrollo territorial ',
            },
            {
              text:
                'La cultura juega un papel importante en el desarrollo de un territorio, a tal punto que muchos pueblos y lugares en Europa y en América Latina han apostado por una revalorización de lo cultural, de lo identitario (recreando incluso nuevas identidades culturales) y patrimonial como eje de su propio desarrollo. ',
            },
            {
              text:
                '“La identidad cultural de un pueblo viene definida históricamente a través de múltiples aspectos en los que se plasma su cultura, como la lengua, instrumento de comunicación entre los miembros de una comunidad, las relaciones sociales, ritos y ceremonias propias, o los comportamientos colectivos, esto es, los sistemas de valores y creencias   ',
            },
            {
              text:
                '“El desarrollo local se ha convertido en el nuevo activador de las políticas de patrimonialización. Mientras la sociedad de los lugares se convierte en la sociedad de los flujos, parece como si los lugares se hayan involucrado en una obra de construcción identitaria, que privilegia la dimensión local o ciudadana por encima de las nacionales, estatales y globales. La identidad es el viejo territorio del patrimonio y no es de extrañar que entre los objetivos reconocidos por la mayor parte de actuaciones patrimoniales que se realizan en estos ámbitos, figure la (re) construcción de las identidades locales” (García, 2002: 66).',
            },

            {
              text:
                ' Para que una o varias identidades culturales generen desarrollo territorial es necesaria una voluntad colectiva (política, comunal, empresarial, asociativa, etc.) y un reconocimiento del pasado, de la historia. Como lo menciona Bernard Kayser (1994: 37), “las diferenciaciones culturales localizadas preparan a veces competiciones que justifican las fugaces rivalidades entre pueblos, aldeas y barrios: éstas pueden servir para encauzar las pasiones individuales y colectivas que no encuentran aplicación. Pero, al contrario, la búsqueda o reconstrucción de una identidad territorial constituye la razón evidente de individuos, de grupos, de localidades y de espacios motivados por un deseo de situarse, de enraizarse en una sociedad. De esta manera en particular, la connotación cultural regional es reconocida por todos, a través de las especificidades legadas por el pasado, y que se encuentran aún vivas: el idioma, los gustos, los comportamientos colectivos e individuales, la música, etc.”',
            },
            {
              text:
                '“Fuente: Molano L., Olga Lucía. (2007). Identidad cultural un concepto que evoluciona, Revista Opera, núm. 7, pp. 69-84. Recuperado de: ',
            },
            {
              url: 'https://www.redalyc.org/pdf/675/67500705.pdf',
            },
          ],

          question:
            'Dentro del texto, el concepto de recreación identitaria se refiere a:',
          answers: [
            {
              text:
                'a. La capacidad que tienen las comunidades para cohesionarse y potenciar diferentes expresiones de su identidad cultural, desarrollando productos, bienes o servicios culturales, desatando actividades económicas que mejoran los ingresos y la calidad de vida.',
              correct: false,
            },
            {
              text:
                'b. Al papel que juega la cultura en el proceso educativo de los territorios.',
              correct: true,
            },
            {
              text:
                'c. Las diferenciaciones culturales localizadas preparan a veces competiciones que justifican las fugaces rivalidades entre pueblos, aldeas y barrios',
              correct: false,
            },
            {
              text:
                'd. A la estrecha la relación viaje – patrimonio cultural, que llevó al surgimiento de los primeros museos públicos y lo que actualmente se conoce como recorridos turísticos culturales.',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text:
                'TE INVITAMOS A QUE MEJORES TU NIVEL DE desempeño. Revisa de nuevo la pregunta y acude a la(s) siguiente(s) fuente(s): Leer detenidamente el texto que aporta el contexto. ',
            },

            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 2.5,
            totems: 5,
          },
          difficult: 2.5,
        },
        {
          context: [],
          question:
            'En la cita de García (2002), que se introduce en el texto, se afirma que: “La identidad es el viejo territorio del patrimonio”. De esta frase se puede inferir que:',
          answers: [
            {
              text:
                ' a. La identidad cultural sólo requiere un reconocimiento del pasado.',
              correct: false,
            },
            {
              text:
                'b. La identidad cultural se desarrolla de manera espontánea en una comunidad ',
              correct: false,
            },
            {
              text:
                'c. La identidad cultural concentra los múltiples aspectos en los que se plasma y recrea un grupo humano en el tiempo. ',
              correct: true,
            },
            {
              text:
                'd. El patrimonio surge al margen de la intervención humana.',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text:
                'TE INVITAMOS A QUE MEJORES TU NIVEL DE desempeño. Revisa de nuevo la pregunta y acude a la(s) siguiente(s) fuente(s): Leer detenidamente el texto que aporta el contexto. ',
            },

            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 5,
            totems: 0,
          },
          difficult: 5,
        },
        {
          context: [],
          question:
            'El autor introduce en el texto la cita de Hernández (2002), con el propósito de:',
          answers: [
            {
              text:
                'a. Señalar que uno de los mejores viajes turísticos es al continente europeo. ',
              correct: false,
            },
            {
              text:
                'b. Enfatizar que en el continente europeo se encuentra el mejor patrimonio. ',
              correct: false,
            },
            {
              text: 'c. Plantear un nuevo concepto de identidad cultural. ',
              correct: false,
            },
            {
              text:
                'd. Argumentar que muchos servicios de turismo tienen una relación histórica con el patrimonio.',
              correct: true,
            },
          ],
          negativeFeedback: [
            {
              text:
                'TE INVITAMOS A QUE MEJORES TU NIVEL DE desempeño. Revisa de nuevo la pregunta y acude a la(s) siguiente(s) fuente(s): Leer detenidamente el texto que aporta el contexto.',
            },

            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 5,
            totems: 0,
          },
          difficult: 5,
        },
        {
          context: [],
          question:
            '¿Cuál de los siguientes enunciados sintetiza mejor el contenido del texto?',
          answers: [
            {
              text:
                'a. La revitalización del patrimonio cultural en las regiones se da incentivando los servicios de turismo que motivan a las personas a viajar para conocer costumbres y expresiones diferentes a las propias. ',
              correct: false,
            },
            {
              text:
                'b. Actualmente, la cultura es un factor relevante para el desarrollo de los territorios, de tal manera que muchos pueblos para transformarse socialmente han realizado grandes esfuerzos por revitalizar su cultura, tradiciones y patrimonio trayendo como consecuencia la revitalización del patrimonio cultural de las comunidades, logrando así una mayor cohesión social y nuevas actividades económicas.  ',
              correct: true,
            },
            {
              text:
                'c. Por encima de las identidades nacionales y globales, las comunidades locales no están redescubriendo sus patrimonios culturales, ya que no se están dedicando a valorar su historia, tradiciones, expresiones culturales y formas de vida como algo propio que se ha desarrollado en ellos durante mucho tiempo. ',
              correct: false,
            },
            {
              text:
                'd. La búsqueda o reconstrucción de una identidad territorial no es una razón evidente de individuos, de grupos, de localidades y de espacios motivados por un deseo de situarse, de enraizarse en una sociedad. De esta manera en particular, la connotación cultural regional no es una realidad reconocida por todos.',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text:
                'TE INVITAMOS A QUE MEJORES TU NIVEL DE desempeño. Revisa de nuevo la pregunta y acude a la(s) siguiente(s) fuente(s): Leer detenidamente el texto que aporta el contexto. ',
            },

            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 7.5,
            totems: 0,
          },
          difficult: 7.5,
        },
        {
          context: [
            {
              text:
                'RESPONDA A LAS PREGUNTAS 5 A 8 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN. ',
            },
            {
              text:
                'Entre los Kogui, el nacimiento de un niño no cambia en nada el curso de la vida diaria de la población y ocurre, al parecer, casi inadvertido. Es un acontecimiento que tiene importancia sólo para la familia inmediata, sólo para los que en los últimos meses han estado al lado de la encinta, en la misma casa con ella. Los demás, sean familiares más o menos cercanos, miembros del mismo tuxe o solamente vecinos, son indiferentes al acontecimiento. Ellos han visto la mujer mes por mes, semana por semana y saben así que pronto nacerá un niño. Pero de eso no se habla ni se hacen comentarios. Para el Kogui, un niño es como una semilla que cae a la tierra, sin que se sepa si crecerá o no. Tal vez morirá poco después del parto, tal vez morirá al año. Si la madre “está de acuerdo”, si la familia ha cumplido con el ceremonial prescrito, entonces el niño nacerá bien, crecerá y será un día adulto. Pero ¿Quién podrá saber eso? El mamo lo sabe, pero él no puede divulgarlo. Así, es mejor no hablar de ello. Sea como sea, lo único que se sabe es que pronto nacerá un niño. ',
            },
            {
              text:
                'Mientras tanto la encinta sigue la rutina diaria como de costumbre, acompañando a su marido en su trabajo, de sembrado en sembrado; nadie trata de aliviar sus múltiples tareas y así sigue cargando las pesadas mochilas, comiendo los mismos alimentos de siempre, haciendo los mismos oficios, cocinando, trayendo agua, remendando vestidos. Ninguna dieta especial observa y los pocos caprichos alimenticios que tenga los debe satisfacer ella misma, buscándose la comida que más le agrade. ',
            },
            {
              text:
                'La satisfacción y la reprimida alegría que ambos padres han sentido hace meses cuando se supo de modo cierto que iban a tener un niño, se han transformado en el último tiempo en un estado de ansiosa preocupación. Mientras que los pensamientos de la mujer giran alrededor del hecho del parto, del gran miedo que siente de los dolores, del peligro y del deseo de tener un niño sano y fuerte, el hombre considera sólo el aspecto religioso del hecho de que nacerá un niño. Él sabe que un niño sólo puede nacer “bien” y desarrollarse “bien” si “todo está de acuerdo”. El sinnúmero de requisitos ceremoniales, las ofrendas de la madres, padres y dueños, el saber del mamo, la disposición de los antepasados de ambas familias, todo eso está ahora en manos del futuro padre y así se prepara para él una gran responsabilidad. Pero las responsabilidades implican decisiones e iniciativas y para ellas ningún hombre Kogui ha sido educado. ',
            },
            {
              text:
                ' Preferible es huir, evitar tales situaciones; pero ya que la huida es imposible le queda sólo el pequeño recurso de preocuparse, atormentarse y tener lástima de sí mismo. Entre los maridos no se discuten estas angustias y cada uno por su cuenta busca consejo y apoyo en las personas que “saben”, los mayores, sea su propio padre, el suegro o el mismo mamo.Fuente: adaptado por la Universidad de la Salle de:  Amarís, M. y Cepeda, J. Revisión bibliográfica analítica sobre los elementos culturales de la familia de los pueblos amerindios Kogui y Wayúu. En: Psicología desde el Caribe. Enero-Junio 2006: No. 17. Recuperado de: rcientificas.uninorte.edu.co/index.php/psicologia/article/view/1911/5288',
            },
          ],
          question: 'De contenido puede deducirse que el mamo es:',
          answers: [
            { text: 'a. El hechicero. ', correct: false },
            {
              text: 'b. Un abuelo. ',
              correct: false,
            },
            { text: 'c. Un consejero. ', correct: true },
            {
              text: 'd. Un familiar de la mamá.',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text:
                'TE INVITAMOS A QUE MEJORES TU NIVEL DE desempeño. Revisa de nuevo la pregunta y acude a la(s) siguiente(s) fuente(s): Leer detenidamente el texto que aporta el contexto. ',
            },

            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 2.5,
            totems: 0,
          },
          difficult: 2.5,
        },
        {
          context: [],
          question: 'El tema central del texto se refiere:',
          answers: [
            {
              text:
                'a. A la forma como una cultura en particular asume el nacimiento de un niño. ',
              correct: true,
            },
            {
              text:
                'b. A los ritos ceremoniales de una mujer kogui embarazada. ',
              correct: false,
            },
            {
              text:
                'c. A la influencia de los mayores en la cultura Kogui con su sabiduría sobre los demás. ',
              correct: false,
            },
            {
              text: 'd. A la vida cotidiana de la mujer Kogui embarazada.',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text:
                'TE INVITAMOS A QUE MEJORES TU NIVEL DE desempeño. Revisa de nuevo la pregunta y acude a la(s) siguiente(s) fuente(s): Leer detenidamente el texto que aporta el contexto.',
            },

            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo. ',
            },
          ],
          positiveFeedback: {
            stars: 5,
            totems: 0,
          },
          difficult: 5,
        },
        {
          context: [],
          question:
            'Al comparar el comportamiento del padre de un niño Kogui que está por nacer con respecto a los padres de otras culturas, ellos:',
          answers: [
            {
              text:
                'a. Se concentran en los aspectos religiosos y ceremoniales del nacimiento. ',
              correct: true,
            },
            {
              text:
                'b. No presenta ninguna ansiedad ante la inminencia del parto. ',
              correct: false,
            },
            {
              text: 'c. Deja de realizar sus actividades cotidianas. ',
              correct: false,
            },
            {
              text: 'd. No se preocupa mucho por el futuro de la criatura.',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text:
                'TE INVITAMOS A QUE MEJORES TU NIVEL DE desempeño. Revisa de nuevo la pregunta y acude a la(s) siguiente(s) fuente(s): Leer detenidamente el texto que aporta el contexto',
            },

            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 2.5,
            totems: 0,
          },
          difficult: 2.5,
        },
        {
          context: [],
          question:
            'La expresión que mejor señala la analogía que hace el Kogui con el niño recién nacido es.',
          answers: [
            {
              text: 'a. Formará un nuevo tuxe en la comunidad. ',
              correct: false,
            },
            {
              text: 'b. Crecerá y será un día adulto. ',
              correct: false,
            },
            {
              text: 'c. Dará alegría y satisfacción a los Kogui. ',
              correct: false,
            },
            {
              text: 'd. Una semilla que cae a la tierra, puede crecer o no.',
              correct: true,
            },
          ],
          negativeFeedback: [
            {
              text:
                'TE INVITAMOS A QUE MEJORES TU NIVEL DE desempeño. Revisa de nuevo la pregunta y acude a la(s) siguiente(s) fuente(s): Leer detenidamente el texto que aporta el contexto. ',
            },
            {
              url: '',
            },

            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 2.5,
            totems: 0,
          },
          difficult: 2.5,
        },
        {
          context: [
            {
              text:
                'Responda a las preguntas 9, 10 y 11, de acuerdo con la siguiente información. ',
            },
            {
              text:
                'Las sopas de las abuelas recobran protagonismo en la cocina.Una simple cucharada de sopa se convierte para muchas personas en un viaje a través del tiempo, que los traslada a la infancia cuando la abuela, la mamá y las tías eran las que cocinaban y congregaban a la familia entera alrededor de la mesa.',
            },
            {
              text:
                'Preparaciones con plátano, guineo, arracacha, ahuyama y verduras son algunos sabores que conectan con esa etapa temprana de la vida, una experiencia que Óscar Gónima, chef del restaurante El Almacén, del Hotel Novotel Medellín, explica desde el hecho que “esos productos dejan huella en el subconsciente, es una corriente poderosa que conecta con los recuerdos”. ',
            },
            {
              text:
                'Conocido como Kitchen for the Soul o Cocina para el Alma este movimiento comenzó hace varias décadas en Estados Unidos y en Colombia es abanderado la chef Leonor Espinoza. “Es usar ahora la cocina de antaño, sus preparaciones e ingredientes con técnicas de cocción más profesionales”, recalca Gónima, que desde su restaurante la está aplicando básicamente en las sopas y cremas y en algunos sólidos, básicamente en ensaladas y purés. Gónima cuenta que esta modalidad no solo busca rescatar las tradiciones, sino que tiene un componente social con el apoyo a los campesinos de la región, a quienes le están comprando directamente los productos. ',
            },
            {
              text:
                ' Resalta la necesidad de retomar en la cocina ingredientes como el plátano (que no solo sea frito), el guineo, las hierbas aromáticas, la zanahoria y la berenjena, entre otros. Entre algunas preparaciones destaca la sopa de oreja (tortilla de huevo), patacón, guineo, de verduras con albóndigas o las cremas de ahuyama.',
            },
            {
              text:
                'Carlos Sánchez, antropólogo y docente de cátedra de la Universidad de La Sabana y de la Escuela Taller de Bogotá, destaca que Colombia es un país de sopas campesinas, una tradición que lamentablemente se está olvidando, en la llamada alta cocina. “Se les echa lo que haya en el entorno”, comenta al hablar de las distintas preparaciones de sopas a lo largo del país. Dice que en Colombia lamentablemente siempre ha habido un desprecio por lo popular y lo autóctono, que ha llevado que muchas cocciones se hayan perdido en la mesa. Al contrario, señala que el hecho de ser popular es lo que las hace grandes. ',
            },
            {
              text:
                ' A lo que Gónima anota que, en las escuelas de gastronomía, habla de Medellín, a los chefs les falta vena investigativa y entender que antes de ellos las que cocinaban, las que hicieron grande la cocina criolla, fueron las abuelas, las tías, las mamás. Comenta, por ejemplo, que los vegetales en la mayoría de los restaurantes solo los sirven salteados cuando se prestan para muchas presentaciones.',
            },
            {
              text:
                'El periodista y crítico gastronómico Lorenzo Villegas confirmó que estas tradiciones se están perdiendo y por eso destaca el trabajo que se trata hacer desde Kitchen for the Soul o Cocina para el Alma. Villegas resalta que, si bien a los cundiboyacenses les adjudican el recetario de sopas colombianos, los antioqueños “tenemos un gran acervo en materia de caldos salados y adobados con legumbres, verduras, tubérculos y carnes”. ',
            },
            {
              text:
                'Destaca que, en el texto En La Buena Mesa, de doña Sofía Ospina de Navarro, se describen más de 30 sopas “como quien dice, sin repetir en un mes”. Entre ellas están la de arepa, arroz, campesina, albóndigas, apio avena, cebolla a la francesa, champiñones a la crema, espárragos, frijoles, frijoles blancos, higarete, hilos de huevo, lechuga, legumbres, lentejas, limón, mazorca con pollo, papa y mazorca. ',
            },
            {
              text:
                'El chef y tecnólogo en gastronomía, Jhony Cañas, apunta que la idea no es solo llevar esta corriente a las preparaciones o recetas, sino que trasciendan en el apoyo a los productores, cocineras ancestrales y salvaguardas de semillas. Narra que desde el Occidente del departamento Caldas, en municipios como Riosucio, Supía y Quinchía, se está rescatando y fortaleciendo el tema del barro para la elaboración de vasijas, así como la panadería en hornos de barro. ',
            },
            {
              text:
                '“También se está potencializando los envueltos, el chontaduro, las curubas y las gulupas (una fusión entre curuba y maracuyá)”, relata Cañas, desde el restaurante Devonómada, una propuesta itinerante que no es estática y que viaja por diferentes regiones. Viaje al pasado, con aromas y recuerdos de la abuela, la tía o la mamá, de la mano de un buen plato de sopa casera. ',
            },
            {
              text:
                'Fuente: Arango, H. (2021). Las sopas de las abuelas recobran protagonismo en la cocina. Texto publicado en el diario El Colombiano el 8 de enero. Recuperado de: https://www.elcolombiano.com/cultura/las-sopas-de-las-abuelas-de-nuevo-en-las-mesas-AP14391809 ',
            },
          ],
          question:
            'De acuerdo con el contenido del texto, la expresión “cocina para el alma” se refiere a:',
          answers: [
            {
              text:
                'a. Una tendencia gastronómica que utiliza elementos tradicionales para ayudar a restablecer la salud de las personas y que se desarrollan principalmente en las comunidades campesinas. ',
              correct: false,
            },
            {
              text:
                'b. Un libro especializado en recetas tradicionales de Colombia con productos campesinos y plantas medicinales para alimentar a las poblaciones del campo colombiano. ',
              correct: false,
            },
            {
              text:
                'c. Una tendencia gastronómica que utiliza ingredientes y recetas tradicionales para crear sabores que conecten a las personas con su infancia, reunidos en un ambiente familiar y con impacto económico y alimentario en las comunidades campesinas. ',
              correct: true,
            },
            {
              text:
                'd. Es una receta especial colombiana creada a base de plátano y verduras, adornada con presentaciones especiales que se sirven en restaurantes de todo el país.',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text:
                'TE INVITAMOS A QUE MEJORES TU NIVEL DE desempeño. Revisa de nuevo la pregunta y acude a la(s) siguiente(s) fuente(s): Leer detenidamente el texto que aporta el contexto.',
            },

            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 2.5,
            totems: 0,
          },
          difficult: 2.5,
        },
        {
          context: [],
          question:
            '¿Cuál de los siguientes enunciados sintetiza mejor el contenido del texto?',
          answers: [
            {
              text:
                'a. El rescate de las preparaciones e ingredientes de la cocina tradicional con nuevas técnicas culinarias, y, que a pesar del olvido o desprecio que han tenido en ocasiones en algunos escenarios, esto constituye un fortalecimiento de la identidad y las tradiciones culturales de las comunidades, creando nuevas posibilidades económicas para los campesinos y centros urbanos.   ',
              correct: true,
            },
            {
              text:
                'b. Lorenzo Villegas confirmó que estas tradiciones se están perdiendo y por eso destaca que, si bien a los cundiboyacenses les adjudican el recetario de sopas colombianos, los antioqueños “tenemos un gran acervo en materia de caldos salados y adobados con legumbres, verduras, tubérculos y carnes”. ',
              correct: false,
            },
            {
              text:
                'c. Una simple cucharada de sopa se convierte para muchas personas en un viaje a través del tiempo, que los traslada a la infancia cuando la abuela, la mamá y las tías eran las que cocinaban y congregaban a la familia entera alrededor de la mesa. ',
              correct: false,
            },
            {
              text:
                'd. A los chefs les falta vena investigativa y entender que antes de ellos las que cocinaban, las que hicieron grande la cocina criolla, fueron las abuelas, las tías, las mamás. Comenta, por ejemplo, que los vegetales en la mayoría de los restaurantes solo los sirven salteados cuando se prestan para muchas presentaciones.',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text:
                'TE INVITAMOS A QUE MEJORES TU NIVEL DE desempeño. Revisa de nuevo la pregunta y acude a la(s) siguiente(s) fuente(s): Leer detenidamente el texto que aporta el contexto.',
            },

            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 5,
            totems: 0,
          },
          difficult: 5,
        },
        {
          context: [],
          question:
            '¿Cuál es el propósito e intencionalidad del autor al escribir el texto?',
          answers: [
            {
              text:
                'a.	Proponer una competencia entre los sabores tradicionales de las recetas de antaño con las contemporáneas creadas por cocineros profesionales. ',
              correct: false,
            },
            {
              text:
                'b.	Destacar las preparaciones y platos típicos tradicionales de las regiones de Colombia. ',
              correct: false,
            },
            {
              text:
                'c.	Resaltar la importancia de las recetas tradicionales de antaño en la cocina profesional actual, su impacto en las personas y en las comunidades campesinas. ',
              correct: true,
            },
            {
              text:
                'd.	Promover algunos textos de recetas culinarias tradicionales, así como el desempeño de algunos cocineros profesionales.',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text:
                'TE INVITAMOS A QUE MEJORES TU NIVEL DE desempeño. Revisa de nuevo la pregunta y acude a la(s) siguiente(s) fuente(s): Leer detenidamente el texto que aporta el contexto.',
            },

            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 7.5,
            totems: 0,
          },
          difficult: 7.5,
        },
        {
          context: [
            {
              text:
                'El Plan Nacional de Desarrollo 2018-2022, en el capítulo denominado “Educación de calidad para un futuro con oportunidades para todos”, propone el siguiente objetivo: impulsar el diálogo entre diversos actores a favor de la calidad y pertinencia de la educación y formación para el trabajo. ',
            },
            {
              text:
                'Tomado de: Gobierno de Colombia. (2018).  Plan Nacional de Desarrollo 2018-2022 Pacto por Colombia, pacto por la equidad. Recuperado de: https://colaboracion.dnp.gov.co/CDT/Prensa/Resumen-PND2018-2022-final.pdf ',
            },
          ],
          question:
            'Una de las siguientes acciones es opuesta a la orientación del objetivo citado:',
          answers: [
            {
              text:
                'a. Desarrollar reuniones con estudiantes, padres de familia, profesores y comunidades del entorno.  ',
              correct: false,
            },
            {
              text:
                'b. Identificar requerimientos y necesidades de formación de talento humano para la ocupación laboral en el contexto. ',
              correct: false,
            },
            {
              text:
                'c. Promover escenarios donde cada actor construye soluciones por su propia cuenta e iniciativa. ',
              correct: true,
            },
            {
              text:
                'd. Hacer análisis de las problemáticas y necesidades del contexto escolar y familiar para discutirlo en la comunidad escolar.',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text:
                'TE INVITAMOS A QUE MEJORES TU NIVEL DE desempeño. Revisa de nuevo la pregunta y acude a la(s) siguiente(s) fuente(s): Leer detenidamente el texto que aporta el contexto. ',
            },

            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 5,
            totems: 0,
          },
          difficult: 5,
        },
        {
          context: [
            {
              text:
                'El Plan Nacional Decenal de Educación 2016-2026. El camino hacia la calidad y la equidad, en su Tercer Desafío Estratégico, propone avanzar en el establecimiento de lineamientos curriculares generales, pertinentes y flexibles. En coherencia con dicho desafío, uno de los lineamientos estratégicos específicos que presenta se orienta a: promover en las instituciones la elaboración de currículos que desarrollen la autonomía, el pensamiento crítico, la sensibilidad, la creatividad y la voluntad del saber. ',
            },
            {
              text:
                ' Tomado de: Gobierno de Colombia. (2017). Plan Nacional Decenal de Educación 2016-2026. El camino hacia la calidad y la equidad. Recuperado de: http://www.plandecenal.edu.co/cms/media/herramientas/PNDE%20FINAL_ISBN%20web.pdf ',
            },
          ],
          question:
            'Una de las siguientes proposiciones es opuesta al alcance del lineamiento estratégico específico citado en el texto.',
          answers: [
            {
              text:
                'a. Formar a los estudiantes para el desarrollo del pensamiento crítico, creativo y el gusto por aprender. ',
              correct: false,
            },
            {
              text:
                'b. El desarrollo artístico y estético es de gran importancia en el proceso formativo. ',
              correct: false,
            },
            {
              text:
                'c. Disentir con argumentos es un comportamiento normal de los estudiantes en el entorno escolar.  ',
              correct: false,
            },
            {
              text:
                'd. Los equipos de profesores establecen los objetivos y contenidos de aprendizaje de cada área disciplinar para los estudiantes. ',
              correct: true,
            },
          ],
          negativeFeedback: [
            {
              text:
                'TE INVITAMOS A QUE MEJORES TU NIVEL DE desempeño. Revisa de nuevo la pregunta y acude a la(s) siguiente(s) fuente(s): Leer detenidamente el texto que aporta el contexto.',
            },

            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 5,
            totems: 0,
          },
          difficult: 5,
        },
        {
          context: [
            {
              text:
                'Responda a las preguntas 14 y 15, de acuerdo con la siguiente información. ',
            },
            {
              text:
                'El sistema nacional de convivencia escolar y formación para los derechos humanos, la educación para la sexualidad y la prevención y mitigación de la violencia se fundamenta en unos principios. Uno de ellos se conceptualiza de la siguiente manera: el Sistema se fundamenta en el reconocimiento, respeto y valoración de la dignidad propia y ajena, sin discriminación por razones de género, orientación o identidad sexual, etnia o condición física, social o cultural. Los niños, niñas y adolescentes tienen derecho a recibir una educación y formación que se fundamente en una concepción integral de la persona y la dignidad humana, en ambientes pacíficos, democráticos e incluyentes. ',
            },
            {
              text:
                'Tomado de: Congreso de la República. Ley 1620 de 15 de marzo de 2003. "Por la cual se crea el sistema nacional de convivencia escolar y formación para el ejercicio de los derechos humanos, la educación para la sexualidad y la prevención y mitigación de la violencia escolar". ',
            },
          ],
          question:
            'De acuerdo con el contenido del texto, el principio al que corresponde es el de:',
          answers: [
            { text: 'a. Participación ', correct: false },
            {
              text: 'b. Autonomía ',
              correct: false,
            },
            { text: 'c. Diversidad ', correct: true },
            {
              text: 'd. Integralidad',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text:
                'TE INVITAMOS A QUE MEJORES TU NIVEL DE desempeño. Revisa de nuevo la pregunta y acude a la(s) siguiente(s) fuente(s): Leer detenidamente el texto que aporta el contexto',
            },

            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 5,
            totems: 0,
          },
          difficult: 5,
        },
        {
          context: [],
          question:
            'Una de las siguientes proposiciones no se relaciona con el alcance del principio expresado.',
          answers: [
            {
              text:
                'a. La familia y la sociedad son corresponsables de la formación ',
              correct: true,
            },
            {
              text: 'b. La inclusión es un valor social y educativo ',
              correct: false,
            },
            {
              text: 'c. Desde las diferencias es posible construir en equidad ',
              correct: false,
            },
            {
              text:
                'd. La pertenencia a una etnia no convierte en inferior a un estudiante',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text:
                'TE INVITAMOS A QUE MEJORES TU NIVEL DE desempeño. Revisa de nuevo la pregunta y acude a la(s) siguiente(s) fuente(s): Leer detenidamente el texto que aporta el contexto',
            },

            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 5,
            totems: 0,
          },
          difficult: 5,
        },
        {
          context: [
            {
              text:
                'Responda a las preguntas 16 y 17, de acuerdo con la siguiente información. ',
            },
            {
              text:
                'El Plan Nacional Decenal de Educación 2016 2026. El camino hacia la calidad y la equidad, en su diagnóstico de la situación actual de la educación, específicamente en la categoría de acceso y cobertura diagnostica que el nivel de educación media (grados décimo y once) presenta el mayor logro en el decenio con un aumento de 10,61 puntos porcentuales (p.p.) al pasar de 68,87% en 2006 a 79,48% en 2016 en la cobertura bruta. Por su parte, el nivel de secundaria presenta un aumento de 7,37 p.p. con un comportamiento regular en esta década educativa, al pasar de una tasa de 93,01% en 2006 al 100,38% en 2016. La cobertura neta exhibe una trayectoria similar a la descrita anteriormente, en la que los niveles de media y secundaria tienen avances en el decenio de 6,77 y 6,27 p.p., respectivamente. ',
            },
            {
              text:
                'Tomado de: Gobierno de Colombia. (2017). Plan Nacional Decenal de Educación 2016-2026. El camino hacia la calidad y la equidad. Recuperado de: http://www.plandecenal.edu.co/cms/media/herramientas/PNDE%20FINAL_ISBN%20web.pdf ',
            },
          ],
          question: 'Del texto se infiere que:',
          answers: [
            {
              text:
                'a. La cobertura neta en el nivel de educación media es superior a la cobertura bruta. ',
              correct: false,
            },
            {
              text:
                'b. La cobertura bruta en el nivel de secundaria es inferior a la neta.  ',
              correct: false,
            },
            {
              text:
                'c. La cobertura bruta y neta en secundaria en superior a la del nivel de educación media. ',
              correct: false,
            },
            {
              text:
                'd. La cobertura bruta y neta en el nivel de educación media es superior a la del nivel de secundaria. ',
              correct: true,
            },
          ],
          negativeFeedback: [
            {
              text:
                'TE INVITAMOS A QUE MEJORES TU NIVEL DE desempeño. Revisa de nuevo la pregunta y acude a la(s) siguiente(s) fuente(s): Leer detenidamente el texto que aporta el contexto.',
            },

            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 7.5,
            totems: 0,
          },
          difficult: 7.5,
        },
        {
          context: [],
          question: 'De texto se puede concluir que:',
          answers: [
            {
              text:
                'a. El comportamiento de la cobertura neta, tanto en el nivel de secundaria como en el nivel de educación media, se ha mantenido estable. ',
              correct: false,
            },
            {
              text:
                'b. El comportamiento de la cobertura neta, tanto en el nivel de secundaria como en el nivel de educación media, ha aumentado de manera significativa. ',
              correct: false,
            },
            {
              text:
                ' c. El comportamiento de la cobertura neta, tanto en el nivel de secundaria como en el nivel de educación media, ha aumentado de manera regular.',
              correct: true,
            },
            {
              text:
                'd. El comportamiento de la cobertura neta, tanto en el nivel de secundaria como en el nivel de educación media, no ha aumentado.',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text:
                'TE INVITAMOS A QUE MEJORES TU NIVEL DE desempeño. Revisa de nuevo la pregunta y acude a la(s) siguiente(s) fuente(s): Leer detenidamente el texto que aporta el contexto.',
            },

            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 7.5,
            totems: 0,
          },
          difficult: 7.5,
        },

        {
          context: [
            {
              text:
                'Autores como Argüelles y Nagles plantean que el aprendizaje es un cambio en la estructura cognitiva de la persona generado por la confrontación con nuevas representaciones, ideas, conceptos y experiencias con los que ya posee; este cambio está influenciado por las vivencias, sentimientos, emociones y por el contexto en el que interactúa cada persona. El aprendizaje puede traer cambios en las conductas de las personas. Un proceso de aprendizaje integra en forma dinámica diversos elementos como: información, ideas, sentimientos, emociones y acciones; es decir, activa el pensamiento, el sentimiento, la acción y todas las habilidades que generan algún tipo de actividad de las personas.',
            },
            {
              text:
                'Tomado de: Argüelles, D. y Nagles, N. (2016). Estrategias para promover procesos de aprendizaje autónomo. Universidad EAN.',
            },
          ],
          question: 'Del texto se puede concluir que el aprendizaje genera:',
          answers: [
            {
              text:
                'a. Cambios en la estructura cognitiva de la persona con procesos cotidianos que requieren poco esfuerzo.',
              correct: false,
            },
            {
              text: 'b. Desarrollo de procesos y estrategias en la persona. ',
              correct: false,
            },
            {
              text:
                'c. Cambios en la manera de pensar, sentir y actuar de la persona.  ',
              correct: true,
            },
            {
              text: 'd. Vivencias, sentimientos y emociones.',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text:
                'TE INVITAMOS A QUE MEJORES TU NIVEL DE desempeño. Revisa de nuevo la pregunta y acude a la(s) siguiente(s) fuente(s): Leer detenidamente el texto que aporta el contexto.',
            },

            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 7.5,
            totems: 0,
          },
          difficult: 7.5,
        },
        {
          context: [
            {
              text:
                'La Resolución 18583 de 2017 por la cual se ajustan las características específicas de calidad de los programas de Licenciatura en Colombia propone que el aspirante a maestro, en su proceso de formación debe desarrollar unos componentes generales, uno de ellos es el de la didáctica de las disciplinas, el cual reconoce la necesaria articulación entre la pedagogía y la didáctica como fundamentos del quehacer del educador. Se refiere a la capacidad para aprehender y apropiar el contenido disciplinar desde la perspectiva de enseñarlo y como objeto de enseñanza; conocer cómo las personas aprenden esos contenidos y habilidades concretas; reconocer dónde se encuentran las mayores dificultades para lograrlo; saber cómo utilizar estrategias y prácticas que permitan que el estudiante resuelva estas dificultades, y conocer cómo evaluar los aprendizajes concretos desarrollados. Implica una intersección entre los saberes didácticos y contenidos disciplinares del campo o el área de desempeño del educador y sus prácticas pedagógicas, de forma que esté en capacidad de apropiar e investigar prácticas y evaluar su impacto, así como de comprender las exigencias pedagógicas y didácticas de su propio campo o área de desempeño.   ',
            },
          ],
          question:
            'A partir de texto, una actividad coherente con la aplicación de las didácticas de las disciplinas en el aula es:',
          answers: [
            {
              text:
                'a. Organizar la evaluación que se lleva a cabo en las fechas de los periodos escolares. ',
              correct: false,
            },
            {
              text:
                'b. Facilitar textos escolares para que los estudiantes aborden los temas de las disciplinas ',
              correct: false,
            },
            {
              text:
                'c. Construir con los estudiantes mecanismos para aprender a resolver dificultades en el proceso de aprendizaje de una disciplina.  ',
              correct: true,
            },
            {
              text:
                'd. El uso de las tecnologías de la información para buscar contenidos.',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text:
                'TE INVITAMOS A QUE MEJORES TU NIVEL DE desempeño. Revisa de nuevo la pregunta y acude a la(s) siguiente(s) fuente(s): Leer detenidamente el texto que aporta el contexto.',
            },

            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 7.5,
            totems: 0,
          },
          difficult: 7.5,
        },
      ],
    },
    matematicas: {
      10: [
        {
          context: [
            {
              text:
                'Se mide el tiempo de vaciado del agua de un tanque a través de una llave conectada al fondo del mismo. La siguiente tabla muestra los resultados de este experimento, tomados para tres llaves de diferentes diámetros y para el tanque lleno hasta determinada altura.',
            },
            {
              Img: 'https://i.postimg.cc/vTC6TkTk/prgunta-1.png',
            },
          ],
          question:
            'Con base en los datos registrados en la tabla sobre la dependencia del tiempo de vaciado y tomando en cuenta el diámetro de la llave y la altura del agua, se puede afirmar que',
          answers: [
            {
              text:
                'a.	Disminuye más cuando el diámetro de la llave aumenta 1 cm que cuando se reduce la altura del nivel del agua en 10 cm.',
              correct: true,
            },
            {
              text:
                'b.	Disminuye más cuando el diámetro de la llave reduce 1 cm que cuando se reduce la altura del nivel del agua en 10 cm.',
              correct: false,
            },
            {
              text:
                'c.	Aumenta más cuando el diámetro de la llave aumenta 1 cm que cuando se reduce la altura del nivel del agua en 10 cm.',
              correct: false,
            },
            {
              text:
                'd.	Aumenta más cuando el diámetro de la llave aumenta 1 cm que cuando se aumenta la altura del nivel del agua en 10 cm.',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text:
                'TE INVITAMOS A QUE MEJORES TU NIVEL DE desempeño. Revisa de nuevo la pregunta y acude a la(s) siguiente(s) fuente(s): ',
            },
            {
              url:
                'http://instaladores-curriculos.sucerman.com/1-curriculo-matematicas/matematicas/index.html',
            },
            {
              url:
                'https://www.colombiaaprende.edu.co/contenidos-para-aprender?Nombre=&field_nivel_value=3&field_grado_target_id=3335&field_asignatura_target_id=3322&page=0',
            },
            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 5,
            totems: 5,
          },
          difficult: 5,
        },
        {
          context: [
            {
              text:
                'RESPONDA LAS PREGUNTAS 2 y 3 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN ',
            },
            {
              text:
                'El siguiente dibujo, representa el sistema que tiene un pequeño pueblo para sacar agua del río. ',
            },
            {
              img: 'https://i.postimg.cc/PfDwX0Md/MAT10-PG26-color-2x.png',
            },
          ],
          question:
            'En los últimos años la población del pueblo ha crecido y por esto el agua que surte el molino ya no es suficiente. Para superar esta situación se propone duplicar el número de baldes que hay en el molino, lo cual se puede lograr si',
          answers: [
            { text: 'a.	Se coloca un balde cada 15º ', correct: true },
            {
              text:
                'b.	Se duplica la distancia del centro del molino a cada balde ',
              correct: false,
            },
            { text: 'c.	Se coloca un balde cada 60º ', correct: false },
            {
              text:
                'd.	Se disminuye la distancia del centro del molino a cada balde, a su mitad',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text:
                'TE INVITAMOS A QUE MEJORES TU NIVEL DE desempeño. Revisa de nuevo la pregunta y acude a la(s) siguiente(s) fuente(s): ',
            },
            {
              url:
                'http://instaladores-curriculos.sucerman.com/1-curriculo-matematicas/matematicas/index.html',
            },
            {
              url:
                'https://www.colombiaaprende.edu.co/contenidos-para-aprender?Nombre=&field_nivel_value=3&field_grado_target_id=3335&field_asignatura_target_id=3322&page=0',
            },
            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 2.5,
            totems: 3,
          },
          difficult: 2.5,
        },
        {
          context: [
            {
              text:
                'RESPONDA LAS PREGUNTAS 2 y 3 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN ',
            },
            {
              text:
                'El siguiente dibujo, representa el sistema que tiene un pequeño pueblo para sacar agua del río. ',
            },
            {
              img: 'https://i.postimg.cc/PfDwX0Md/MAT10-PG26-color-2x.png',
            },
          ],
          question:
            'En el dibujo 1cm equivale a 1m del molino real. Para que los ángulos formados por los segmentos que van del centro a cada balde tengan la misma medida, en el dibujo y en el molino real, se necesita que ',
          answers: [
            {
              text:
                'a.	En el dibujo los ángulos sean 100 veces más pequeños que en el molino',
              correct: false,
            },
            {
              text:
                'b.	En el dibujo los ángulos sean 100 veces más grandes que en el molino',
              correct: false,
            },
            {
              text:
                'c.	En el dibujo un ángulo de 1º equivale a un ángulo de 100º en el molino',
              correct: false,
            },
            {
              text:
                'd.	En el dibujo y en el molino los ángulos tengan la misma abertura  ',
              correct: true,
            },
          ],
          negativeFeedback: [
            {
              text:
                'TE INVITAMOS A QUE MEJORES TU NIVEL DE desempeño. Revisa de nuevo la pregunta y acude a la(s) siguiente(s) fuente(s): ',
            },
            {
              url:
                'http://instaladores-curriculos.sucerman.com/1-curriculo-matematicas/matematicas/index.html',
            },
            {
              url:
                'https://www.colombiaaprende.edu.co/contenidos-para-aprender?Nombre=&field_nivel_value=3&field_grado_target_id=3335&field_asignatura_target_id=3322&page=0',
            },
            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 2.5,
            totems: 3,
          },
          difficult: 2.5,
        },
        {
          context: [
            {
              text:
                'RESPONDA LAS PREGUNTAS 4 a 7 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN  ',
            },
            {
              text:
                'En una industria construyen un tanque de forma cónica de radio 5 dm y altura 15 dm, para el almacenamiento de agua, pero por una falla en su construcción pierde agua a razón de 1 dm3 por minuto. ',
            },
            {
              img: 'https://i.postimg.cc/bvFGBBLY/MAT-PREG4-2x.png',
            },
          ],
          question: 'Al cabo de t minutos, h(t) representa',
          answers: [
            {
              text: 'a.	La altura del tanque en t minutos',
              correct: false,
            },
            {
              text: 'b.	El espacio desocupado en el tanque en un instante t',
              correct: false,
            },
            {
              text: 'c.	La profundidad del agua en un instante t',
              correct: true,
            },
            {
              text:
                'd.	El tiempo que tardó en desocuparse una parte del tanque ',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text:
                'TE INVITAMOS A QUE MEJORES TU NIVEL DE desempeño. Revisa de nuevo la pregunta y acude a la(s) siguiente(s) fuente(s): ',
            },
            {
              url:
                'http://instaladores-curriculos.sucerman.com/1-curriculo-matematicas/matematicas/index.html',
            },
            {
              url:
                'https://www.colombiaaprende.edu.co/contenidos-para-aprender?Nombre=&field_nivel_value=3&field_grado_target_id=3335&field_asignatura_target_id=3322&page=0',
            },
            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 2.5,
            totems: 3,
          },
          difficult: 2.5,
        },
        {
          context: [
            {
              text:
                'RESPONDA LAS PREGUNTAS 4 a 7 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN ',
            },
            {
              text:
                'En una industria construyen un tanque de forma cónica de radio 5 dm y altura 15 dm, para el almacenamiento de agua, pero por una falla en su construcción pierde agua a razón de 1 dm3 por minuto. ',
            },
            {
              img: 'https://i.postimg.cc/1tJmfnnW/MAT10-PG26-color-2x.png',
            },
          ],
          question:
            'En la figura 2, se hace una representación de la sección transversal del tanque en un instante t. De la representación se puede deducir la siguiente proporción',
          answers: [
            {
              text: 'a. 	(15-x)/5=15/r',
              correct: false,
            },
            {
              text: 'b.		(15-x)/15=r/5',
              correct: true,
            },
            {
              text: 'c.		x/15=r/5',
              correct: false,
            },
            {
              text: 'd.	x/15=15/r ',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text:
                'TE INVITAMOS A QUE MEJORES TU NIVEL DE desempeño. Revisa de nuevo la pregunta y acude a la(s) siguiente(s) fuente(s): ',
            },
            {
              url:
                'http://instaladores-curriculos.sucerman.com/1-curriculo-matematicas/matematicas/index.html',
            },
            {
              url:
                'https://www.colombiaaprende.edu.co/contenidos-para-aprender?Nombre=&field_nivel_value=3&field_grado_target_id=3335&field_asignatura_target_id=3322&page=0',
            },
            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 5,
            totems: 3,
          },
          difficult: 5,
        },
        {
          context: [
            {
              text:
                'RESPONDA LAS PREGUNTAS 4 a 7 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN  ',
            },
            {
              text:
                'En una industria construyen un tanque de forma cónica de radio 5 dm y altura 15 dm, para el almacenamiento de agua, pero por una falla en su construcción pierde agua a razón de 1 dm3 por minuto. ',
            },
            {
              text:
                'En determinada zona de una ciudad se construyen edificios de apartamentos en los que cada metro cuadrado tiene un costo de $800.000, y se asegura a los compradores que en esta zona anualmente, el metro cuadrado se valoriza un 5 % respecto al costo del año anterior.  ',
            },
            {
              img: 'https://i.postimg.cc/1tJmfnnW/MAT10-PG26-color-2x.png',
            },
          ],
          question:
            '¿Con cuál de las siguientes expresiones se representa el costo de un metro cuadrado en esa zona, transcurridos n años?',
          answers: [
            {
              text: 'a.		800.000+5n',
              correct: false,
            },
            {
              text: 'b.		800.000(5n)',
              correct: false,
            },
            {
              text: 'c.		800.000(5/100)^n',
              correct: false,
            },
            {
              text: 'd.	800.000(1+5/100)^n',
              correct: true,
            },
          ],
          negativeFeedback: [
            {
              text:
                'TE INVITAMOS A QUE MEJORES TU NIVEL DE desempeño. Revisa de nuevo la pregunta y acude a la(s) siguiente(s) fuente(s): ',
            },
            {
              url:
                'http://instaladores-curriculos.sucerman.com/1-curriculo-matematicas/matematicas/index.html',
            },
            {
              url:
                'https://www.colombiaaprende.edu.co/contenidos-para-aprender?Nombre=&field_nivel_value=3&field_grado_target_id=3335&field_asignatura_target_id=3322&page=0',
            },
            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 7.5,
            totems: 3,
          },
          difficult: 7.5,
        },
        {
          context: [
            {
              text:
                'RESPONDA LAS PREGUNTAS 4 a 7 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN ',
            },
            {
              text:
                'En una industria construyen un tanque de forma cónica de radio 5 dm y altura 15 dm, para el almacenamiento de agua, pero por una falla en su construcción pierde agua a razón de 1 dm3 por minuto. ',
            },
            {
              text:
                'Se pueden encontrar números racionales mayores que un número entero k, de manera que sean cada vez más cercanos a él, calculando k+1/j  (con j entero positivo). Cuanto más grande sea j, más cercano a k será el racional construido.',
            },
            {
              img: 'https://i.postimg.cc/1tJmfnnW/MAT10-PG26-color-2x.png',
            },
          ],
          question:
            '¿Cuántos números racionales se pueden construir cercanos a k y menores que k+1/11 ? ',
          answers: [
            {
              text: 'a.	10, que es la cantidad de racionales menores que 11',
              correct: false,
            },
            {
              text:
                'b.	Una cantidad infinita, pues existen infinitos números enteros mayores que 11. ',
              correct: true,
            },
            {
              text: 'c.	11, que es el número que equivale en este caso a j. ',
              correct: false,
            },
            {
              text:
                'd.	Uno, pues el racional más cercano a k se halla con j = 10, es decir, con k + 0,1. ',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text:
                'TE INVITAMOS A QUE MEJORES TU NIVEL DE desempeño. Revisa de nuevo la pregunta y acude a la(s) siguiente(s) fuente(s): ',
            },
            {
              url:
                'http://instaladores-curriculos.sucerman.com/1-curriculo-matematicas/matematicas/index.html',
            },
            {
              url:
                'https://www.colombiaaprende.edu.co/contenidos-para-aprender?Nombre=&field_nivel_value=3&field_grado_target_id=3335&field_asignatura_target_id=3322&page=0',
            },
            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 7.5,
            totems: 3,
          },
          difficult: 7.5,
        },
        {
          context: [
            {
              text:
                'De un tanque se extrae agua tratada para regar una plantación, de acuerdo con la siguiente dinámica periódica: cuando el tanque está lleno, se abre el conducto que da salida al agua, hasta que esta llega al nivel mínimo, momento en el cual se abre el conducto de entrada y se cierra el conducto de salida, hasta que se llena el tanque; nuevamente, se abre el de salida y se cierra el de entrada. ',
            },
          ],
          question:
            'Una gráfica que representa adecuadamente el proceso, tomando como momento cero un momento en el que el tanque este lleno, es',
          answers: [
            {
              img: 'https://i.postimg.cc/FFfLSNpP/MAT10-PG28-A-2x.png',
              correct: false,
            },
            {
              img: 'https://i.postimg.cc/xTMNs5WM/MAT10-PG28-B-2x.png',
              correct: false,
            },
            {
              img: 'https://i.postimg.cc/YC7GTgHV/MAT10-PG28-C-2x.png',
              correct: true,
            },
            {
              img: 'https://i.postimg.cc/sgJQzXf2/MAT10-PG28-D-2x.png',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text:
                'TE INVITAMOS A QUE MEJORES TU NIVEL DE desempeño. Revisa de nuevo la pregunta y acude a la(s) siguiente(s) fuente(s): ',
            },
            {
              url:
                'http://instaladores-curriculos.sucerman.com/1-curriculo-matematicas/matematicas/index.html',
            },
            {
              url:
                'https://www.colombiaaprende.edu.co/contenidos-para-aprender?Nombre=&field_nivel_value=3&field_grado_target_id=3335&field_asignatura_target_id=3322&page=0',
            },
            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 7.5,
            totems: 3,
          },
          difficult: 7.5,
        },
        {
          context: [
            {
              text:
                'RESPONDA LAS PREGUNTAS 9 A 11 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN ',
            },
            {
              text:
                'En un recipiente de forma cónica de 1 metro de radio y 2 metros de altura se vierte agua a una velocidad constante como se ilustra en la figura ',
            },
            {
              img: '',
            },
          ],
          question:
            'En el instante en que el radio de la superficie del agua es 0,25 metros, dicha superficie se encuentra a una distancia de',
          answers: [
            {
              text: 'a.	0,5 metros del borde superior del tanque. ',
              correct: false,
            },
            {
              text: 'b.	1 metro de la tapa del tanque. ',
              correct: false,
            },
            {
              text: 'c.	1,5 metros de la tapa del tanque. ',
              correct: true,
            },
            {
              text: 'd.	2 metros de la tapa del tanque. ',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text:
                'TE INVITAMOS A QUE MEJORES TU NIVEL DE desempeño. Revisa de nuevo la pregunta y acude a la(s) siguiente(s) fuente(s): ',
            },
            {
              url:
                'http://instaladores-curriculos.sucerman.com/1-curriculo-matematicas/matematicas/index.html',
            },
            {
              url:
                'https://www.colombiaaprende.edu.co/contenidos-para-aprender?Nombre=&field_nivel_value=3&field_grado_target_id=3335&field_asignatura_target_id=3322&page=0',
            },
            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 7.5,
            totems: 3,
          },
          difficult: 7.5,
        },
        {
          context: [
            {
              text:
                'RESPONDA LAS PREGUNTAS 9 A 11 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN ',
            },
            {
              text:
                'En un recipiente de forma cónica de 1 metro de radio y 2 metros de altura se vierte agua a una velocidad constante como se ilustra en la figura ',
            },
            {
              img: '',
            },
          ],
          question:
            'Cuando el nivel del agua en el tanque alcanza una altura de 1 metro, la cantidad de agua que hace falta para llenar el tanque es ',
          answers: [
            {
              text: 'a.	π/12    metros cúbicos',
              correct: false,
            },
            {
              text: 'b.	π/3     metros cúbicos',
              correct: false,
            },
            {
              text: 'c.	2/3 π  metros cúbicos ',
              correct: false,
            },
            {
              text: 'd.	7/12 π  metros cúbicos ',
              correct: true,
            },
          ],
          negativeFeedback: [
            {
              text:
                'TE INVITAMOS A QUE MEJORES TU NIVEL DE desempeño. Revisa de nuevo la pregunta y acude a la(s) siguiente(s) fuente(s): ',
            },
            {
              url:
                'http://instaladores-curriculos.sucerman.com/1-curriculo-matematicas/matematicas/index.html',
            },
            {
              url:
                'https://www.colombiaaprende.edu.co/contenidos-para-aprender?Nombre=&field_nivel_value=3&field_grado_target_id=3335&field_asignatura_target_id=3322&page=0',
            },
            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 5,
            totems: 3,
          },
          difficult: 5,
        },
        {
          context: [
            {
              text:
                'RESPONDA LAS PREGUNTAS 9 A 11 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN ',
            },
            {
              text:
                'En un recipiente de forma cónica de 1 metro de radio y 2 metros de altura se vierte agua a una velocidad constante como se ilustra en la figura ',
            },
            {
              img: '',
            },
          ],
          question:
            'Cuando el nivel del agua en el tanque alcanza una altura de h metros, la cantidad de agua que hace falta para llenar el tanque es ',
          answers: [
            {
              text: 'a.	2/3 π h  metros cúbicos',
              correct: false,
            },
            {
              text: 'b.	1/12 π h^3  metros cúbicos ',
              correct: false,
            },
            {
              text: 'c.	1/12 π (8- h^3)  metros cúbicos',
              correct: true,
            },
            {
              text: 'd.	1/6 π (4- h^3)  metros cúbicos ',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text:
                'TE INVITAMOS A QUE MEJORES TU NIVEL DE desempeño. Revisa de nuevo la pregunta y acude a la(s) siguiente(s) fuente(s): ',
            },
            {
              url:
                'http://instaladores-curriculos.sucerman.com/1-curriculo-matematicas/matematicas/index.html',
            },
            {
              url:
                'https://www.colombiaaprende.edu.co/contenidos-para-aprender?Nombre=&field_nivel_value=3&field_grado_target_id=3335&field_asignatura_target_id=3322&page=0',
            },
            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 2.5,
            totems: 3,
          },
          difficult: 2.5,
        },
        {
          context: [
            {
              text:
                'RESPONDA LAS PREGUNTAS 12 A 14 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN ',
            },
            {
              text:
                'En el siguiente texto, se proporciona información sobre una investigación llevada a cabo, entorno a adicciones: "...en una muestra de 120 indigentes de corta edad [...] se constató́ que únicamente en el mes anterior a la consulta, 86% de los muchachos habían consumido tabaco, 51% alcohol, 44% marihuana, 11% cocaína y 56% inhalantes. Además 26 de ellos afirmaron haber ingerido drogas farmacéuticas".',
            },
            {
              img: '',
            },
          ],
          question:
            'Cuando el nivel del agua en el tanque alcanza una altura de h metros, la cantidad de agua que hace falta para llenar el tanque es ',
          answers: [
            {
              text: 'a.	2/3 π h  metros cúbicos',
              correct: false,
            },
            {
              text: 'b.	1/12 π h^3  metros cúbicos ',
              correct: false,
            },
            {
              text: 'c.	1/12 π (8- h^3)  metros cúbicos',
              correct: true,
            },
            {
              text: 'd.	1/6 π (4- h^3)  metros cúbicos ',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text:
                'TE INVITAMOS A QUE MEJORES TU NIVEL DE desempeño. Revisa de nuevo la pregunta y acude a la(s) siguiente(s) fuente(s): ',
            },
            {
              url:
                'http://instaladores-curriculos.sucerman.com/1-curriculo-matematicas/matematicas/index.html',
            },
            {
              url:
                'https://www.colombiaaprende.edu.co/contenidos-para-aprender?Nombre=&field_nivel_value=3&field_grado_target_id=3335&field_asignatura_target_id=3322&page=0',
            },
            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 7.5,
            totems: 3,
          },
          difficult: 7.5,
        },
        {
          context: [
            {
              text:
                'RESPONDA LAS PREGUNTAS 12 A 14 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN ',
            },
            {
              text:
                'En el siguiente texto, se proporciona información sobre una investigación llevada a cabo, entorno a adicciones: "...en una muestra de 120 indigentes de corta edad [...] se constató́ que únicamente en el mes anterior a la consulta, 86% de los muchachos habían consumido tabaco, 51% alcohol, 44% marihuana, 11% cocaína y 56% inhalantes. Además 26 de ellos afirmaron haber ingerido drogas farmacéuticas".',
            },
          ],
          question:
            'Un antropólogo, que adelantó una investigación sobre el mismo tema, lee el texto y toma algunos apuntes útiles para su estudio; sin darse cuenta, hace una interpretación errada del texto, esta es: ',
          answers: [
            {
              text:
                'a.	más del 30% de los jóvenes examinados habían consumido tabaco y alcohol, un mes antes a la consulta ',
              correct: false,
            },
            {
              text:
                'b.	un mes antes a la consulta, los 120 jóvenes habían consumido inhalantes o marihuana. ',
              correct: true,
            },
            {
              text:
                'c.	un mes antes a la consulta, el 7% de los jóvenes consumieron inhalantes y alcohol ',
              correct: false,
            },
            {
              text:
                'd.	el consumo de cocaína, un mes antes a la consulta, fue menor al de otras sustancias, incluso al de drogas farmacéuticas. ',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text:
                'TE INVITAMOS A QUE MEJORES TU NIVEL DE desempeño. Revisa de nuevo la pregunta y acude a la(s) siguiente(s) fuente(s): ',
            },
            {
              url:
                'http://instaladores-curriculos.sucerman.com/1-curriculo-matematicas/matematicas/index.html',
            },
            {
              url:
                'https://www.colombiaaprende.edu.co/contenidos-para-aprender?Nombre=&field_nivel_value=3&field_grado_target_id=3335&field_asignatura_target_id=3322&page=0',
            },
            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 5,
            totems: 3,
          },
          difficult: 5,
        },
        {
          context: [
            {
              text:
                'RESPONDA LAS PREGUNTAS 12 A 14 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN ',
            },
            {
              text:
                'En el siguiente texto, se proporciona información sobre una investigación llevada a cabo, entorno a adicciones: "...en una muestra de 120 indigentes de corta edad [...] se constató́ que únicamente en el mes anterior a la consulta, 86% de los muchachos habían consumido tabaco, 51% alcohol, 44% marihuana, 11% cocaína y 56% inhalantes. Además 26 de ellos afirmaron haber ingerido drogas farmacéuticas".',
            },
          ],
          question:
            'Tomando como fuente el texto presentado, un periodista ha preparado un artículo en el que afirma que el 30% de los muchachos consumió, un mes antes a la consulta, drogas farmacéuticas. Antes de ser publicado el artículo, se le sugiere que cambie esta afirmación, porque',
          answers: [
            {
              text:
                'a.	no fue la tercera parte de la muestra, la que consumió drogas farmacéuticas un mes antes a la consulta',
              correct: false,
            },
            {
              text:
                'b.	estaría incluyendo a 6 personas que no consumieron drogas farmacéuticas un mes antes a la consulta',
              correct: false,
            },
            {
              text:
                'c.	no fueron 30 personas las que consumieron drogas farmacéuticas un mes antes a la consulta',
              correct: false,
            },
            {
              text:
                'd.	estaría incluyendo a 10 personas que no consumieron drogas farmacéuticas un mes antes a la consulta',
              correct: true,
            },
          ],
          negativeFeedback: [
            {
              text:
                'TE INVITAMOS A QUE MEJORES TU NIVEL DE desempeño. Revisa de nuevo la pregunta y acude a la(s) siguiente(s) fuente(s): ',
            },
            {
              url:
                'http://instaladores-curriculos.sucerman.com/1-curriculo-matematicas/matematicas/index.html',
            },
            {
              url:
                'https://www.colombiaaprende.edu.co/contenidos-para-aprender?Nombre=&field_nivel_value=3&field_grado_target_id=3335&field_asignatura_target_id=3322&page=0',
            },
            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 2.5,
            totems: 3,
          },
          difficult: 2.5,
        },
        {
          context: [
            {
              text:
                'RESPONDA LAS PREGUNTAS 12 A 14 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN ',
            },
            {
              text:
                'En el siguiente texto, se proporciona información sobre una investigación llevada a cabo, entorno a adicciones: "...en una muestra de 120 indigentes de corta edad [...] se constató́ que únicamente en el mes anterior a la consulta, 86% de los muchachos habían consumido tabaco, 51% alcohol, 44% marihuana, 11% cocaína y 56% inhalantes. Además 26 de ellos afirmaron haber ingerido drogas farmacéuticas".',
            },
          ],
          question:
            'Profundizando en el estudio, se encontró que la cuarta parte de los jóvenes que consumieron cocaína, eran menores de 10 años mientras que la cuarta parte de los jóvenes que consumieron alcohol eran mayores de 10 años. Estos resultados pueden presentarse al público mediante el gráfico',
          answers: [
            {
              img: 'a.	',
              correct: false,
            },
            {
              img: 'b.	',
              correct: false,
            },
            {
              img: 'c.	',
              correct: true,
            },
            {
              img: 'd.	',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text:
                'TE INVITAMOS A QUE MEJORES TU NIVEL DE desempeño. Revisa de nuevo la pregunta y acude a la(s) siguiente(s) fuente(s): ',
            },
            {
              url:
                'http://instaladores-curriculos.sucerman.com/1-curriculo-matematicas/matematicas/index.html',
            },
            {
              url:
                'https://www.colombiaaprende.edu.co/contenidos-para-aprender?Nombre=&field_nivel_value=3&field_grado_target_id=3335&field_asignatura_target_id=3322&page=0',
            },
            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 5,
            totems: 3,
          },
          difficult: 5,
        },
        {
          context: [
            {
              text:
                'De un tanque se extrae agua tratada para regar una plantación, de acuerdo con la siguiente dinámica periódica: cuando el tanque está lleno, se abre el conducto que da salida al agua, hasta que esta llega al nivel mínimo, momento en el cual se abre el conducto de entrada y se cierra el conducto de salida, hasta que se llena el tanque; nuevamente, se abre el de salida y se cierra el de entrada.',
            },
            {
              text:
                'La siguiente grafica representa el proceso de llenado y vaciado, en cada uno de los intervalos de tiempo en los que esto sucede.',
            },
            {
              img: '',
            },
          ],
          question: 'De esta gráfica, se puede afirmar que',
          answers: [
            {
              text:
                'a.	el volumen de agua del tanque siempre varia de manera constante',
              correct: false,
            },
            {
              text:
                'b.	el tanque se llena de manera constante a razón de 1 500 litros por hora',
              correct: false,
            },
            {
              text:
                'c.	el tanque se llena de manera constante a razón de 500 litros por hora',
              correct: true,
            },
            {
              text:
                'd.	el tanque se vacía de manera constante a razón de 1 500 litros por hora',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text:
                'TE INVITAMOS A QUE MEJORES TU NIVEL DE desempeño. Revisa de nuevo la pregunta y acude a la(s) siguiente(s) fuente(s): ',
            },
            {
              url:
                'http://instaladores-curriculos.sucerman.com/1-curriculo-matematicas/matematicas/index.html',
            },
            {
              url:
                'https://www.colombiaaprende.edu.co/contenidos-para-aprender?Nombre=&field_nivel_value=3&field_grado_target_id=3335&field_asignatura_target_id=3322&page=0',
            },
            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 2.5,
            totems: 3,
          },
          difficult: 2.5,
        },
        {
          context: [
            {
              text:
                'De un tanque se extrae agua tratada para regar una plantación, de acuerdo con la siguiente dinámica periódica: cuando el tanque esta lleno, se abre el conducto que da salida al agua, hasta que esta llega al nivel mínimo, momento en el cual se abre el conducto de entrada y se cierra el conducto de salida, hasta que se llena el tanque; nuevamente, se abre el de salida y se cierra el de entrada.',
            },
            {
              img: '',
            },
          ],
          question:
            'Una persona empieza a observar el proceso cuando han transcurrido a horas de haber comenzado a llenarse el tanque (ver grafica). Si la persona vuelve después de 72 horas exactas, se puede afirmar que el tanque',
          answers: [
            {
              text: 'a.	esta vacío',
              correct: false,
            },
            {
              text: 'b.	tiene 3 000 litros de agua',
              correct: false,
            },
            {
              text: 'c.	tiene 1 500 litros de agua y esta llenándose',
              correct: true,
            },
            {
              text: 'd.	tiene 1 500 litros de agua y esta vaciándose',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text:
                'TE INVITAMOS A QUE MEJORES TU NIVEL DE desempeño. Revisa de nuevo la pregunta y acude a la(s) siguiente(s) fuente(s): ',
            },
            {
              url:
                'http://instaladores-curriculos.sucerman.com/1-curriculo-matematicas/matematicas/index.html',
            },
            {
              url:
                'https://www.colombiaaprende.edu.co/contenidos-para-aprender?Nombre=&field_nivel_value=3&field_grado_target_id=3335&field_asignatura_target_id=3322&page=0',
            },
            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 5,
            totems: 3,
          },
          difficult: 5,
        },
        {
          context: [
            {
              text:
                'RESPONDA LAS PREGUNTAS 17 Y 18 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN ',
            },
            {
              text:
                'Observe el resultado de calcular potencias (entero positivo) de tres (3) sucesivamente',
            },
            {
              text:
                '3^0 =1; 3^1=3; 3^2=9; 3^3=27; 3^4=81; 3^5=243; 3^6=729; 3^7=2187',
            },
            {
              text:
                'Como puede ver, la cifra de las unidades en cada una de las potencias de tres se repite cíclicamente como lo muestra la siguiente secuencia: 1, 3, 9, 7, 1, 3, 9, 7, 1, ...',
            },
          ],
          question:
            'Si 3 es elevado a una potencia múltiplo de 4, se encontrará que siempre termina en 1, esto puede ser explicado, porque',
          answers: [
            {
              text:
                'a.	en la secuencia que establece las cifras de las unidades, el número 1 aparece cada cuatro posiciones',
              correct: false,
            },
            {
              text:
                'b.	la suma de dos números consecutivos de la secuencia es siempre un múltiplo de 4',
              correct: false,
            },
            {
              text:
                'c.	4n dividido por 4 nos da como residuo 0, luego 3 elevado a 4n terminará igual que 3 a la potencia 0',
              correct: true,
            },
            {
              text: 'd.	3 elevado a la potencia 4 es 81',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text:
                'TE INVITAMOS A QUE MEJORES TU NIVEL DE desempeño. Revisa de nuevo la pregunta y acude a la(s) siguiente(s) fuente(s): ',
            },
            {
              url:
                'http://instaladores-curriculos.sucerman.com/1-curriculo-matematicas/matematicas/index.html',
            },
            {
              url:
                'https://www.colombiaaprende.edu.co/contenidos-para-aprender?Nombre=&field_nivel_value=3&field_grado_target_id=3335&field_asignatura_target_id=3322&page=0',
            },
            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 5,
            totems: 3,
          },
          difficult: 5,
        },
        {
          context: [
            {
              text:
                'RESPONDA LAS PREGUNTAS 17 Y 18 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN ',
            },
            {
              text:
                'Observe el resultado de calcular potencias (entero positivo) de tres (3) sucesivamente',
            },
            {
              text:
                '3^0 =1; 3^1=3; 3^2=9; 3^3=27; 3^4=81; 3^5=243; 3^6=729; 3^7=2187',
            },
            {
              text:
                'Como puede ver, la cifra de las unidades en cada una de las potencias de tres se repite cíclicamente como lo muestra la siguiente secuencia: 1, 3, 9, 7, 1, 3, 9, 7, 1, ...',
            },
          ],
          question: 'Una forma de saber en qué número termina 3^21 sería',
          answers: [
            {
              text:
                'a.	conociendo en qué número termina 3^20 se logra identificar en la secuencia el número que sigue',
              correct: true,
            },
            {
              text:
                'b.	hallar el residuo de 21 dividiendo entre 4 e identificar la cifra de las unidades en el resultado de elevar 3 a dicho residuo',
              correct: true,
            },
            {
              text:
                'c.	identificar la cifra de las unidades en cualquier potencia de tres, que sea factor de 21',
              correct: false,
            },
            {
              text:
                'd.	efectuando los productos que permiten aplicar el concepto de potencia',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text:
                'TE INVITAMOS A QUE MEJORES TU NIVEL DE desempeño. Revisa de nuevo la pregunta y acude a la(s) siguiente(s) fuente(s): ',
            },
            {
              url:
                'http://instaladores-curriculos.sucerman.com/1-curriculo-matematicas/matematicas/index.html',
            },
            {
              url:
                'https://www.colombiaaprende.edu.co/contenidos-para-aprender?Nombre=&field_nivel_value=3&field_grado_target_id=3335&field_asignatura_target_id=3322&page=0',
            },
            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 5,
            totems: 3,
          },
          difficult: 5,
        },
        {
          context: [
            {
              text:
                'Un almacén mayorista vende camisetas a $28 500; cada una le cuesta al almacén $14 250, pero existe una promoción según la cual por la compra de más de cinco camisetas se puede llevar a mitad de precio las restantes, pero sin llevar más de nueve camisetas.',
            },
          ],
          question:
            'El administrador realiza una prueba a los cajeros del almacén para conocer si entendieron la promoción. En esa prueba aparecen valores de posibles ventas. Si un cajero la entendió, él deberá escoger',
          answers: [
            {
              text: 'a.	$14 250, porque corresponde a la venta de una camiseta',
              correct: false,
            },
            {
              text:
                'b.	$142 500, porque corresponde a la venta de cinco camisetas',
              correct: true,
            },
            {
              text:
                'c.	$156 750, porque corresponde a la venta de seis camisetas',
              correct: true,
            },
            {
              text:
                'd.	$285 000, porque corresponde a la venta de diez camisetas',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text:
                'TE INVITAMOS A QUE MEJORES TU NIVEL DE desempeño. Revisa de nuevo la pregunta y acude a la(s) siguiente(s) fuente(s): ',
            },
            {
              url:
                'http://instaladores-curriculos.sucerman.com/1-curriculo-matematicas/matematicas/index.html',
            },
            {
              url:
                'https://www.colombiaaprende.edu.co/contenidos-para-aprender?Nombre=&field_nivel_value=3&field_grado_target_id=3335&field_asignatura_target_id=3322&page=0',
            },
            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 5,
            totems: 3,
          },
          difficult: 5,
        },
        {
          context: [
            {
              text:
                'En una fábrica se emplean cajas de diez tamaños para empacar los productos. En la caja más pequeña (tamaño 1) se empacan tres productos y en cada uno de los demás (tamaño 2 a tamaño 10) se empacan tres cajas del tamaño inmediatamente anterior.',
            },
          ],
          question:
            'Un cliente ha hecho un pedido que puede empacarse exactamente en tres cajas tamaño 9 pero se ha agotado este tipo de caja. Para poder cumplir con el pedido, usted sugeriría que se enviaran en reemplazo',
          answers: [
            {
              text:
                'a.	nueve cajas tamaño 3, porque cada caja tamaño 9 contiene tantos productos como tres cajas tamaño 3',
              correct: false,
            },
            {
              text:
                'b.	veintisiete cajas tamaño 7, porque cada caja tamaño 9 contiene tantos productos como nueve cajas tamaño 7',
              correct: true,
            },
            {
              text:
                'c.	nueve cajas tamaño 8, porque cada caja tamaño 9 contiene tantos productos como tres cajas tamaño 8',
              correct: true,
            },
            {
              text:
                'd.	veintisiete cajas tamaño 1, porque cada caja tamaño 9 contiene tantos productos como nueve cajas tamaño 1',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text:
                'TE INVITAMOS A QUE MEJORES TU NIVEL DE desempeño. Revisa de nuevo la pregunta y acude a la(s) siguiente(s) fuente(s): ',
            },
            {
              url:
                'http://instaladores-curriculos.sucerman.com/1-curriculo-matematicas/matematicas/index.html',
            },
            {
              url:
                'https://www.colombiaaprende.edu.co/contenidos-para-aprender?Nombre=&field_nivel_value=3&field_grado_target_id=3335&field_asignatura_target_id=3322&page=0',
            },
            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 5,
            totems: 3,
          },
          difficult: 5,
        },
      ],
      11: [
        {
          context: [
            {
              text:
                'Responda las preguntas 1 y 2 de acuerdo con la siguiente información ',
            },
            {
              text:
                'Para tomar la decisión de construir una plaza de mercado en el barrio Los Rosales, la Junta de Acción Comunal desea contar con el apoyo de la mayoría de las familias que allí́ viven. Para determinar qué quiere la mayoría, realizaron un sondeo en el que preguntaron: "¿Cree usted que sería de beneficio para el sector la construcción de una plaza de mercado?". Los resultados se muestran en la siguiente tabla: ',
            },
            {
              Img: '',
            },
          ],
          question:
            'La Junta de Acción Comunal se inclinó́ por NO construir una plaza de mercado, debido a que los resultados del sondeo muestran que:',
          answers: [
            {
              text:
                'a.	el 70% de familias encuestadas no respondió́ afirmativamente',
              correct: true,
            },
            {
              text:
                'b.	la mitad de las familias encuestadas estuvieron inseguras o no respondieron la encuesta',
              correct: true,
            },
            {
              text:
                'c.	el número de familias que respondieron "sí", supera a quienes respondieron negativamente en un 50% ',
              correct: false,
            },
            {
              text:
                'd.	el número de familias que respondieron "no" es el doble de las que están inseguras ',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text:
                'TE INVITAMOS A QUE MEJORES TU NIVEL DE desempeño. Revisa de nuevo la pregunta y acude a la(s) siguiente(s) fuente(s): ',
            },
            {
              url:
                'http://instaladores-curriculos.sucerman.com/1-curriculo-matematicas/matematicas/index.html',
            },
            {
              url:
                'https://www.colombiaaprende.edu.co/contenidos-para-aprender?Nombre=&field_nivel_value=3&field_grado_target_id=3335&field_asignatura_target_id=3322&page=0',
            },
            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 7.5,
            totems: 5,
          },
          difficult: 7.5,
        },
        {
          context: [
            {
              text:
                'Responda las preguntas 1 y 2 de acuerdo con la siguiente información ',
            },
            {
              text:
                'Para tomar la decisión de construir una plaza de mercado en el barrio Los Rosales, la Junta de Acción Comunal desea contar con el apoyo de la mayoría de las familias que allí́ viven. Para determinar qué quiere la mayoría, realizaron un sondeo en el que preguntaron: "¿Cree usted que sería de beneficio para el sector la construcción de una plaza de mercado?". Los resultados se muestran en la siguiente tabla: ',
            },
            {
              Img: '',
            },
          ],
          question:
            'Un gráfico que se podría presentar a los habitantes del barrio, sobre los resultados del sondeo, es ',
          answers: [
            {
              img: 'https://i.postimg.cc/15QD1b0J/MAT11-PG31-1-A-2x.png',
              correct: true,
            },
            {
              img: 'https://i.postimg.cc/cJgvncMv/MAT11-PG31-1-B-2x.png',
              correct: false,
            },
            {
              img: 'https://i.postimg.cc/rm2wt2wH/MAT11-PG31-1-C-2x.png',
              correct: false,
            },
            {
              img: 'https://i.postimg.cc/bwKzKfkv/MAT11-PG31-1-D-2x.png',
              correct: true,
            },
          ],
          negativeFeedback: [
            {
              text:
                'TE INVITAMOS A QUE MEJORES TU NIVEL DE desempeño. Revisa de nuevo la pregunta y acude a la(s) siguiente(s) fuente(s): ',
            },
            {
              url:
                'http://instaladores-curriculos.sucerman.com/1-curriculo-matematicas/matematicas/index.html',
            },
            {
              url:
                'https://www.colombiaaprende.edu.co/contenidos-para-aprender?Nombre=&field_nivel_value=3&field_grado_target_id=3335&field_asignatura_target_id=3322&page=0',
            },
            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 5,
            totems: 5,
          },
          difficult: 5,
        },
        {
          context: [
            {
              text:
                'Responda las preguntas 3 y 4 de acuerdo con la siguiente información ',
            },
            {
              text:
                'La empresa, Estadísticas de Colombia, realiza una encuesta a 100 hombres y 100 mujeres de Bogotá́. A la primera pregunta responden afirmativamente el 40% de las mujeres y el 60% de los hombres. A este grupo se le hace una segunda pregunta a la cual responden afirmativamente el 90% de las mujeres y el 40% de los hombres. ',
            },
          ],
          question:
            'Con la información suministrada por la empresa Estadística de Colombia, ¿cómo se presentarían los datos gráficamente?',
          answers: [
            {
              img: 'https://i.postimg.cc/fLz1P82L/MAT11-PG31-3-A-2x.png',
              correct: true,
            },
            {
              img: 'https://i.postimg.cc/hvh6DfqR/MAT11-PG31-3-B-2x.png',
              correct: false,
            },
            {
              img: 'https://i.postimg.cc/SsgHbc3G/MAT11-PG31-3-C-2x.png',
              correct: false,
            },
            {
              img: 'https://i.postimg.cc/Jhc9KfQv/MAT11-PG31-3-D-2x.png',
              correct: true,
            },
          ],
          negativeFeedback: [
            {
              text:
                'TE INVITAMOS A QUE MEJORES TU NIVEL DE desempeño. Revisa de nuevo la pregunta y acude a la(s) siguiente(s) fuente(s): ',
            },
            {
              url:
                'http://instaladores-curriculos.sucerman.com/1-curriculo-matematicas/matematicas/index.html',
            },
            {
              url:
                'https://www.colombiaaprende.edu.co/contenidos-para-aprender?Nombre=&field_nivel_value=3&field_grado_target_id=3335&field_asignatura_target_id=3322&page=0',
            },
            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 5,
            totems: 3,
          },
          difficult: 5,
        },
        {
          context: [
            {
              text:
                'Responda las preguntas 3 y 4 de acuerdo con la siguiente información ',
            },
            {
              text:
                'La empresa, Estadísticas de Colombia, realiza una encuesta a 100 hombres y 100 mujeres de Bogotá́. A la primera pregunta responden afirmativamente el 40% de las mujeres y el 60% de los hombres. A este grupo se le hace una segunda pregunta a la cual responden afirmativamente el 90% de las mujeres y el 40% de los hombres. ',
            },
          ],
          question:
            'A las personas que respondieron afirmativamente la 1a y 2a pregunta se les hace una 3a pregunta. Esta pregunta solo la respondió el 40% de estas personas. ¿Existe la posibilidad que entre ese 40% no se encuentre ninguna mujer?',
          answers: [
            {
              text:
                'a.	sí, porque el 40% de los hombres que respondieron la tercera pregunta, es una parte del 60% que respondió́ afirmativamente la primera pregunta ',
              correct: true,
            },
            {
              text:
                'b.	no, porque el 40% del 90% de las mujeres que respondieron la primera pregunta es igual al 40% que respondió́ la tercera pregunta ',
              correct: false,
            },
            {
              text:
                'c.	sí, porque un 40% de los hombres respondió́ la segunda pregunta, por lo tanto, puede ser el mismo que respondió́ la tercera pregunta ',
              correct: true,
            },
            {
              text:
                'd.	no, porque en una gran mayoría (90%) las mujeres respondieron afirmativamente a la segunda pregunta',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text:
                'TE INVITAMOS A QUE MEJORES TU NIVEL DE desempeño. Revisa de nuevo la pregunta y acude a la(s) siguiente(s) fuente(s): ',
            },
            {
              url:
                'http://instaladores-curriculos.sucerman.com/1-curriculo-matematicas/matematicas/index.html',
            },
            {
              url:
                'https://www.colombiaaprende.edu.co/contenidos-para-aprender?Nombre=&field_nivel_value=3&field_grado_target_id=3335&field_asignatura_target_id=3322&page=0',
            },
            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 7.5,
            totems: 3,
          },
          difficult: 7.5,
        },
        {
          context: [
            {
              text:
                'Responda las preguntas 5 a 9 de acuerdo con la siguiente información ',
            },
            {
              text:
                'Algunos estudiantes de una universidad recogieron información acerca del número de hombres y mujeres que nacieron en un hospital durante 2 semanas. La información la registraron en las siguientes tablas:',
            },
            {
              text: 'Tabla 1. Nacimientos en la primera semana',
            },
            {
              img: '',
            },
            {
              text: 'Tabla 2. Nacimientos en la segunda semana',
            },
            {
              img: '',
            },
          ],
          question:
            'Con los datos que registraron los estudiantes desean hacer una comparación entre la cantidad de hombres nacidos durante las 2 semanas. ¿Cuál de las siguientes gráficas representa mejor esta comparación? ',
          answers: [
            {
              img: 'https://i.postimg.cc/5NygRhfT/MAT11-PG31-AA-2x.png',
              correct: false,
            },
            {
              img: 'https://i.postimg.cc/RVYd5gFF/MAT11-PG31-AB-2x.png',
              correct: true,
            },
            {
              img: 'https://i.postimg.cc/6pG09C2h/MAT11-PG31-AC-2x.png',
              correct: false,
            },
            {
              img: 'https://i.postimg.cc/y6vnn1C0/MAT11-PG31-AD-2x.png',
              correct: true,
            },
          ],
          negativeFeedback: [
            {
              text:
                'TE INVITAMOS A QUE MEJORES TU NIVEL DE desempeño. Revisa de nuevo la pregunta y acude a la(s) siguiente(s) fuente(s): ',
            },
            {
              url:
                'http://instaladores-curriculos.sucerman.com/1-curriculo-matematicas/matematicas/index.html',
            },
            {
              url:
                'https://www.colombiaaprende.edu.co/contenidos-para-aprender?Nombre=&field_nivel_value=3&field_grado_target_id=3335&field_asignatura_target_id=3322&page=0',
            },
            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 5,
            totems: 3,
          },
          difficult: 5,
        },
        {
          context: [
            {
              text:
                'Responda las preguntas 5 a 9 de acuerdo con la siguiente información ',
            },
            {
              text:
                'Algunos estudiantes de una universidad recogieron información acerca del número de hombres y mujeres que nacieron en un hospital durante 2 semanas. La información la registraron en las siguientes tablas:',
            },
            {
              text: 'Tabla 1. Nacimientos en la primera semana',
            },
            {
              img: '',
            },
            {
              text: 'Tabla 2. Nacimientos en la segunda semana',
            },
            {
              img: '',
            },
          ],
          question:
            'Partiendo de los datos presentados en las tablas es falso afirmar que ',
          answers: [
            {
              text:
                'a.	en la primera semana hubo más nacimientos que en la segunda semana',
              correct: true,
            },
            {
              text:
                'b.	el nacimiento de hombres en la primera semana fue menor que el nacimiento de mujeres',
              correct: false,
            },
            {
              text:
                'c.	el número de nacimientos de mujeres fue menor que el nacimiento de hombres durante las dos semanas ',
              correct: true,
            },
            {
              text:
                'd.	el número de nacimientos de mujeres fue mayor en la segunda semana que en la primera semana',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text:
                'TE INVITAMOS A QUE MEJORES TU NIVEL DE desempeño. Revisa de nuevo la pregunta y acude a la(s) siguiente(s) fuente(s): ',
            },
            {
              url:
                'http://instaladores-curriculos.sucerman.com/1-curriculo-matematicas/matematicas/index.html',
            },
            {
              url:
                'https://www.colombiaaprende.edu.co/contenidos-para-aprender?Nombre=&field_nivel_value=3&field_grado_target_id=3335&field_asignatura_target_id=3322&page=0',
            },
            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 2.5,
            totems: 3,
          },
          difficult: 2.5,
        },
        {
          context: [
            {
              text:
                'Responda las preguntas 5 a 9 de acuerdo con la siguiente información ',
            },
            {
              text:
                'Algunos estudiantes de una universidad recogieron información acerca del número de hombres y mujeres que nacieron en un hospital durante 2 semanas. La información la registraron en las siguientes tablas:',
            },
            {
              text: 'Tabla 1. Nacimientos en la primera semana',
            },
            {
              img: '',
            },
            {
              text: 'Tabla 2. Nacimientos en la segunda semana',
            },
            {
              img: '',
            },
          ],
          question:
            'Según los datos recogidos por los estudiantes durante las 2 semanas en el hospital ¿es posible afirmar que la probabilidad de que nazca un varón en cualquier día de la semana es de 1/2? ',
          answers: [
            {
              text:
                'a.	sí́, porque el porcentaje de nacimientos de hombres y mujeres en las dos semanas es del 50% ',
              correct: true,
            },
            {
              text:
                'b.	no, porque el número de nacimientos de hombres en la primera semana fue distinto al número de nacimientos en la segunda semana ',
              correct: false,
            },
            {
              text:
                'c.	sí́, porque al mirar el número de nacimientos al finalizar las dos semanas la cantidad de hombres nacidos es igual a la cantidad de mujeres ',
              correct: true,
            },
            {
              text:
                'd.	no, porque los datos registrados en la tabla no permiten establecer el porcentaje entre el nacimiento de hombres y de mujeres durante las dos semanas',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text:
                'TE INVITAMOS A QUE MEJORES TU NIVEL DE desempeño. Revisa de nuevo la pregunta y acude a la(s) siguiente(s) fuente(s): ',
            },
            {
              url:
                'http://instaladores-curriculos.sucerman.com/1-curriculo-matematicas/matematicas/index.html',
            },
            {
              url:
                'https://www.colombiaaprende.edu.co/contenidos-para-aprender?Nombre=&field_nivel_value=3&field_grado_target_id=3335&field_asignatura_target_id=3322&page=0',
            },
            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 7.5,
            totems: 3,
          },
          difficult: 7.5,
        },
        {
          context: [
            {
              text:
                'Responda las preguntas 5 a 9 de acuerdo con la siguiente información ',
            },
            {
              text:
                'Algunos estudiantes de una universidad recogieron información acerca del número de hombres y mujeres que nacieron en un hospital durante 2 semanas. La información la registraron en las siguientes tablas:',
            },
            {
              text: 'Tabla 1. Nacimientos en la primera semana',
            },
            {
              img: '',
            },
            {
              text: 'Tabla 2. Nacimientos en la segunda semana',
            },
            {
              img: '',
            },
          ],
          question:
            'Respecto a los datos que se presentan en las tablas, ¿cuáles diagramas representan el porcentaje de hombres y mujeres nacidos en la primera y segunda semana en el hospital?',
          answers: [
            {
              img: 'https://i.postimg.cc/d3Y3gkkn/MAT11-PG31-2a-2x.png',
              correct: false,
            },
            {
              img: 'https://i.postimg.cc/mZYtCwJn/MAT11-PG31-2b-2x.png',
              correct: true,
            },
            {
              img: 'https://i.postimg.cc/NFkFtsRt/MAT11-PG31-2c-2x.png',
              correct: true,
            },
            {
              img: 'https://i.postimg.cc/j5NC8Q5L/MAT11-PG31-2d-2x.png',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text:
                'TE INVITAMOS A QUE MEJORES TU NIVEL DE desempeño. Revisa de nuevo la pregunta y acude a la(s) siguiente(s) fuente(s): ',
            },
            {
              url:
                'http://instaladores-curriculos.sucerman.com/1-curriculo-matematicas/matematicas/index.html',
            },
            {
              url:
                'https://www.colombiaaprende.edu.co/contenidos-para-aprender?Nombre=&field_nivel_value=3&field_grado_target_id=3335&field_asignatura_target_id=3322&page=0',
            },
            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 5,
            totems: 3,
          },
          difficult: 5,
        },
        {
          context: [
            {
              text:
                'Responda las preguntas 5 a 9 de acuerdo con la siguiente información ',
            },
            {
              text:
                'Algunos estudiantes de una universidad recogieron información acerca del número de hombres y mujeres que nacieron en un hospital durante 2 semanas. La información la registraron en las siguientes tablas:',
            },
            {
              text: 'Tabla 1. Nacimientos en la primera semana',
            },
            {
              img: '',
            },
            {
              text: 'Tabla 2. Nacimientos en la segunda semana',
            },
            {
              img: '',
            },
          ],
          question:
            'Al iniciar la tercera semana, el departamento de estadística del hospital hace algunas predicciones, a partir de la información de la tabla, sobre los nacimientos que se pueden presentar en los siguientes días. Una de estas predicciones es que ',
          answers: [
            {
              text:
                'a.	la probabilidad de que nazca una mujer en viernes, sábado o domingo es igual',
              correct: false,
            },
            {
              text:
                'b.	la probabilidad de que nazca un hombre en sábado es un tercio',
              correct: true,
            },
            {
              text:
                'c.	con total certeza los nacimientos de hombres en jueves excederán en 1 a los de mujeres',
              correct: false,
            },
            {
              text:
                'd.	aproximadamente por cada 5 hombres que nazcan en lunes, nacerán 2 mujeres ',
              correct: true,
            },
          ],
          negativeFeedback: [
            {
              text:
                'TE INVITAMOS A QUE MEJORES TU NIVEL DE desempeño. Revisa de nuevo la pregunta y acude a la(s) siguiente(s) fuente(s): ',
            },
            {
              url:
                'http://instaladores-curriculos.sucerman.com/1-curriculo-matematicas/matematicas/index.html',
            },
            {
              url:
                'https://www.colombiaaprende.edu.co/contenidos-para-aprender?Nombre=&field_nivel_value=3&field_grado_target_id=3335&field_asignatura_target_id=3322&page=0',
            },
            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 5,
            totems: 3,
          },
          difficult: 5,
        },
        {
          context: [
            {
              text:
                'Una empresa ha hecho un estudio para determinar qué tan conocido es el producto que ofrece. Para este estudio realizaron encuestas dividiendo la población encuestada en tres grupos. Los resultados fueron los siguientes: ',
            },
            {
              img: '',
            },
          ],
          question:
            'Según las expectativas de la empresa, se fijó́ que el producto permanecería en el mercado si el 60% de la población hace uso de él. A partir de los resultados del estudio es más probable que ',
          answers: [
            {
              text:
                'a.	el producto continúe en el mercado, porque en todos los grupos la cantidad de personas que no usan el producto es menor que la cantidad de los que lo usan ',
              correct: false,
            },
            {
              text:
                'b.	el producto no continúe en el mercado, porque solo 31 de cada 85 personas encuestadas usan el producto ',
              correct: true,
            },
            {
              text:
                'c.	el producto continúe en el mercado, porque solo 6 de cada 85 personas encuestadas no conocen el producto',
              correct: false,
            },
            {
              text:
                'd.	el producto no continúe en el mercado, porque el porcentaje de encuestados en el grupo III que usa el producto es aproximadamente el 2,3% de los encuestados',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text:
                'TE INVITAMOS A QUE MEJORES TU NIVEL DE desempeño. Revisa de nuevo la pregunta y acude a la(s) siguiente(s) fuente(s): ',
            },
            {
              url:
                'http://instaladores-curriculos.sucerman.com/1-curriculo-matematicas/matematicas/index.html',
            },
            {
              url:
                'https://www.colombiaaprende.edu.co/contenidos-para-aprender?Nombre=&field_nivel_value=3&field_grado_target_id=3335&field_asignatura_target_id=3322&page=0',
            },
            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 7.5,
            totems: 3,
          },
          difficult: 7.5,
        },
        {
          context: [
            {
              text:
                'RESPONDA LAS PREGUNTAS 11 y 12 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN ',
            },
            {
              text:
                'En una industria construyen un tanque de forma cónica de radio 5 dm y altura 15 dm, para el almacenamiento de agua, pero por una falla en su construcción pierde agua a razón de 1 dm3 por minuto.',
            },
            {
              img: 'https://i.postimg.cc/bvFGBBLY/MAT-PREG4-2x.png',
            },
          ],
          question:
            '¿Cuál de los siguientes planteamientos es suficiente para encontrar la rapidez con la que desciende el nivel del agua cuando está a una altura de 10 dm?',
          answers: [
            {
              text:
                'a.	dado dh/dt=0 dm, se requiere encontrar dv/dt, cuando v=1 dm',
              correct: false,
            },
            {
              text:
                'b.		dado dv/dt=1 〖dm〗^3/min, se requiere encontrar dh/dt, cuando h=5 dm',
              correct: false,
            },
            {
              text:
                'c.	dado dh/dt=5 dm, se requiere encontrar dv/dt, cuando v=1 dm',
              correct: false,
            },
            {
              text:
                'd.	dado dv/dt=1 〖dm〗^3/min, se requiere encontrar dh/dt, cuando h=10 dm',
              correct: true,
            },
          ],
          negativeFeedback: [
            {
              text:
                'TE INVITAMOS A QUE MEJORES TU NIVEL DE desempeño. Revisa de nuevo la pregunta y acude a la(s) siguiente(s) fuente(s): ',
            },
            {
              url:
                'http://instaladores-curriculos.sucerman.com/1-curriculo-matematicas/matematicas/index.html',
            },
            {
              url:
                'https://www.colombiaaprende.edu.co/contenidos-para-aprender?Nombre=&field_nivel_value=3&field_grado_target_id=3335&field_asignatura_target_id=3322&page=0',
            },
            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 5,
            totems: 3,
          },
          difficult: 5,
        },
        {
          context: [
            {
              text:
                'RESPONDA LAS PREGUNTAS 11 y 12 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN ',
            },
            {
              text:
                'En una industria construyen un tanque de forma cónica de radio 5 dm y altura 15 dm, para el almacenamiento de agua, pero por una falla en su construcción pierde agua a razón de 1 dm3 por minuto.',
            },
            {
              img: '',
            },
          ],
          question:
            'La expresión que permite encontrar la rapidez con que el nivel del agua desciende desde cualquier profundidad, es',
          answers: [
            {
              text: 'a.	dv/dt=π/27 (h(t))^2  dh/dt',
              correct: true,
            },
            {
              text: 'b.	dv/dt=π/27 (h(t))^2',
              correct: false,
            },
            {
              text: 'c.	dh/dt=1/3 〖π (r(t))〗^2 h(t)',
              correct: false,
            },
            {
              text: 'd.	dh/dt=h(t)  dv/dt+(r(t))^2',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text:
                'TE INVITAMOS A QUE MEJORES TU NIVEL DE desempeño. Revisa de nuevo la pregunta y acude a la(s) siguiente(s) fuente(s): ',
            },
            {
              url:
                'http://instaladores-curriculos.sucerman.com/1-curriculo-matematicas/matematicas/index.html',
            },
            {
              url:
                'https://www.colombiaaprende.edu.co/contenidos-para-aprender?Nombre=&field_nivel_value=3&field_grado_target_id=3335&field_asignatura_target_id=3322&page=0',
            },
            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 7.5,
            totems: 3,
          },
          difficult: 7.5,
        },
        {
          context: [
            {
              text:
                'Una escuela de natación cuenta con un total de 16 estudiantes. Para las clases se usan 2 piscinas con distinta profundidad. Por seguridad, las personas con una estatura inferior a 1,80 m se envían a la piscina menos profunda, y las demás, a la más profunda. ',
            },
          ],
          question:
            'Un día, el director de la escuela escucha que el promedio de estatura de las 16 personas es 1,70 m e insiste en aumentar la cantidad de alumnos para que el promedio sea 1,80 m, afirmando que de esta manera se logrará igualar la cantidad de personas en las dos piscinas. Esta afirmación es errónea, porque',
          answers: [
            {
              text:
                'a.	las 16 personas se encuentran actualmente en la piscina menos profunda. El director de la escuela debe aceptar otros 16 alumnos con una estatura superior a 1,80 m. ',
              correct: false,
            },
            {
              text:
                'b.	con el promedio es imposible determinar la cantidad de personas en las piscinas. Es necesario utilizar otras medidas, como la estatura máxima o mínima de las personas, en lugar de esta. ',
              correct: false,
            },
            {
              text:
                'c.	incrementar el promedio a 1,80 m es insuficiente. El director de la escuela debe aceptar más estudiantes con una altura de 1,80 m hasta que la cantidad de alumnos sea igual en ambas piscinas. ',
              correct: false,
            },
            {
              text:
                'd.	aunque el promedio de estatura de las 16 personas sea inferior a 1,80 m, no significa que la cantidad de personas en las piscinas sea diferente. ',
              correct: true,
            },
          ],
          negativeFeedback: [
            {
              text:
                'TE INVITAMOS A QUE MEJORES TU NIVEL DE desempeño. Revisa de nuevo la pregunta y acude a la(s) siguiente(s) fuente(s): ',
            },
            {
              url:
                'http://instaladores-curriculos.sucerman.com/1-curriculo-matematicas/matematicas/index.html',
            },
            {
              url:
                'https://www.colombiaaprende.edu.co/contenidos-para-aprender?Nombre=&field_nivel_value=3&field_grado_target_id=3335&field_asignatura_target_id=3322&page=0',
            },
            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 2.5,
            totems: 3,
          },
          difficult: 2.5,
        },
        {
          context: [
            {
              text:
                'En una feria robótica, el robot P y el robot Q disputan un juego de tenis de mesa. En el momento que el marcador se encuentra 7 a 2 a favor del robot P, estos se reprograman de tal forma que por cada 2 puntos que anota el robot P, el robot Q anota 3. ',
            },
          ],
          question:
            '¿Cuál de las siguientes ecuaciones permite determinar cuándo igualará en puntos el robot Q al robot P? ',
          answers: [
            {
              text:
                'a.	3/2 x=0. Donde x es la cantidad de puntos que anotará P.  ',
              correct: false,
            },
            {
              text:
                'b.	7+x=3/2 x+2. Donde x es la cantidad de puntos que anotará P. ',
              correct: true,
            },
            {
              text:
                'c.	7+3x=2+2y. Donde x es la cantidad de puntos que anotará P, y y es la cantidad de puntos que anotará Q.',
              correct: false,
            },
            {
              text:
                'd.	x+y=7+2. Donde x es la cantidad de puntos que anotará P, y y es la cantidad de puntos que anotará Q. ',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text:
                'TE INVITAMOS A QUE MEJORES TU NIVEL DE desempeño. Revisa de nuevo la pregunta y acude a la(s) siguiente(s) fuente(s): ',
            },
            {
              url:
                'http://instaladores-curriculos.sucerman.com/1-curriculo-matematicas/matematicas/index.html',
            },
            {
              url:
                'https://www.colombiaaprende.edu.co/contenidos-para-aprender?Nombre=&field_nivel_value=3&field_grado_target_id=3335&field_asignatura_target_id=3322&page=0',
            },
            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 5,
            totems: 3,
          },
          difficult: 5,
        },
        {
          context: [
            {
              text:
                'RESPONDA LAS PREGUNTAS 15 a 17 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN ',
            },
            {
              text:
                'El subsidio familiar de vivienda (SFV) es un aporte que entrega el Estado y que constituye un complemento del ahorro, para facilitarle la adquisición, construcción o mejoramiento de una solución de vivienda de interés social al ciudadano. A continuación, se presenta la tabla de ingresos en salarios mínimos mensuales legales vigentes (SMMLV) y el subsidio al que tiene derecho, para cierto año. ',
            },
            {
              img: '',
            },
          ],
          question:
            'Una persona que observa la información de la tabla elabora la gráfica que se presenta a continuación.',
          answers: [
            {
              text:
                'a.	los ingresos y el subsidio correspondientes se dan en miles de pesos, y no en SMMLV. ',
              correct: false,
            },
            {
              text:
                'b.	la correspondencia entre ingresos y subsidios es inversa, pero no disminuye de manera constante y continua. ',
              correct: true,
            },
            {
              text:
                'c.	faltan algunos valores de los subsidios presentados en la tabla',
              correct: false,
            },
            {
              text:
                'd.	los valores del subsidio deben ser ascendentes, pues a menores ingresos, mayor es el subsidio.  ',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text:
                'TE INVITAMOS A QUE MEJORES TU NIVEL DE desempeño. Revisa de nuevo la pregunta y acude a la(s) siguiente(s) fuente(s): ',
            },
            {
              url:
                'http://instaladores-curriculos.sucerman.com/1-curriculo-matematicas/matematicas/index.html',
            },
            {
              url:
                'https://www.colombiaaprende.edu.co/contenidos-para-aprender?Nombre=&field_nivel_value=3&field_grado_target_id=3335&field_asignatura_target_id=3322&page=0',
            },
            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 2.5,
            totems: 3,
          },
          difficult: 2.5,
        },
        {
          context: [
            {
              text:
                'RESPONDA LAS PREGUNTAS 15 a 17 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN ',
            },
            {
              text:
                'El subsidio familiar de vivienda (SFV) es un aporte que entrega el Estado y que constituye un complemento del ahorro, para facilitarle la adquisición, construcción o mejoramiento de una solución de vivienda de interés social al ciudadano. A continuación, se presenta la tabla de ingresos en salarios mínimos mensuales legales vigentes (SMMLV) y el subsidio al que tiene derecho, para cierto año. ',
            },
            {
              img: '',
            },
          ],
          question:
            'Con el SFV más los ahorros con los que cuente el grupo familiar y el crédito que obtenga de una entidad financiera, se puede comprar la vivienda. Por tanto, el procedimiento correcto para estimar el valor del crédito que debe solicitarse al banco es:',
          answers: [
            {
              text:
                'a.	Valor del crédito = ingresos + ahorros + subsidio + valor de la vivienda.',
              correct: false,
            },
            {
              text:
                'b.	Valor del crédito = valor de la vivienda – ahorros – subsidio.',
              correct: true,
            },
            {
              text:
                'c.	Valor del crédito = ingresos + ahorros – subsidio + valor de la vivienda.',
              correct: false,
            },
            {
              text:
                'd.	Valor del crédito = valor de la vivienda + subsidio – ahorros. ',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text:
                'TE INVITAMOS A QUE MEJORES TU NIVEL DE desempeño. Revisa de nuevo la pregunta y acude a la(s) siguiente(s) fuente(s): ',
            },
            {
              url:
                'http://instaladores-curriculos.sucerman.com/1-curriculo-matematicas/matematicas/index.html',
            },
            {
              url:
                'https://www.colombiaaprende.edu.co/contenidos-para-aprender?Nombre=&field_nivel_value=3&field_grado_target_id=3335&field_asignatura_target_id=3322&page=0',
            },
            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 2.5,
            totems: 3,
          },
          difficult: 2.5,
        },
        {
          context: [
            {
              text:
                'RESPONDA LAS PREGUNTAS 15 a 17 DE ACUERDO CON LA SIGUIENTE INFORMACIÓN ',
            },
            {
              text:
                'El subsidio familiar de vivienda (SFV) es un aporte que entrega el Estado y que constituye un complemento del ahorro, para facilitarle la adquisición, construcción o mejoramiento de una solución de vivienda de interés social al ciudadano. A continuación, se presenta la tabla de ingresos en salarios mínimos mensuales legales vigentes (SMMLV) y el subsidio al que tiene derecho, para cierto año. ',
            },
            {
              img: '',
            },
          ],
          question:
            'Una familia con ingresos entre 0 y 1 SMMLV recibe un subsidio equivalente a',
          answers: [
            {
              text:
                'a.	1,4 veces el subsidio de una familia de ingresos entre 2 y 2,25 SMMLV. ',
              correct: false,
            },
            {
              text:
                'b.	1,8 veces el subsidio de una familia de ingresos entre 2,5 y 2,75 SMMLV. ',
              correct: false,
            },
            {
              text:
                'c.	3,5 veces el subsidio de una familia de ingresos entre 3 y 3,5 SMMLV. ',
              correct: false,
            },
            {
              text:
                'd.	5,5 veces el subsidio de una familia de ingresos entre 3,5 y 4 SMMLV. ',
              correct: true,
            },
          ],
          negativeFeedback: [
            {
              text:
                'TE INVITAMOS A QUE MEJORES TU NIVEL DE desempeño. Revisa de nuevo la pregunta y acude a la(s) siguiente(s) fuente(s): ',
            },
            {
              url:
                'http://instaladores-curriculos.sucerman.com/1-curriculo-matematicas/matematicas/index.html',
            },
            {
              url:
                'https://www.colombiaaprende.edu.co/contenidos-para-aprender?Nombre=&field_nivel_value=3&field_grado_target_id=3335&field_asignatura_target_id=3322&page=0',
            },
            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 7.5,
            totems: 3,
          },
          difficult: 7.5,
        },
        {
          context: [
            {
              text:
                'Un trapecio isósceles es un cuadrilátero que tiene un par de lados paralelos y los otros dos de igual medida. En un plano cartesiano se dibuja un trapecio isósceles de modo que el eje Y divide al trapecio en dos figuras iguales. ',
            },
          ],
          question:
            'Si las coordenadas de dos de los vértices del trapecio son (-4, 2) y (-2, 8), ¿cuáles son las coordenadas de los otros dos vértices?',
          answers: [
            {
              text: 'a.	(8, 2) y (2, 4).',
              correct: false,
            },
            {
              text: 'b.	(-2, -4) y (-8, -2).',
              correct: false,
            },
            {
              text: 'c.	 (2, 8) y (4, 2).',
              correct: true,
            },
            {
              text: 'd.	 (-4, -2) y (-2, -8).',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text:
                'TE INVITAMOS A QUE MEJORES TU NIVEL DE desempeño. Revisa de nuevo la pregunta y acude a la(s) siguiente(s) fuente(s): ',
            },
            {
              url:
                'http://instaladores-curriculos.sucerman.com/1-curriculo-matematicas/matematicas/index.html',
            },
            {
              url:
                'https://www.colombiaaprende.edu.co/contenidos-para-aprender?Nombre=&field_nivel_value=3&field_grado_target_id=3335&field_asignatura_target_id=3322&page=0',
            },
            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 2.5,
            totems: 3,
          },
          difficult: 2.5,
        },
        {
          context: [
            {
              text:
                'Para adquirir un crédito por $6.000.000, Ángela solicita en una entidad financiera información sobre las modalidades de pago para crédito. Un asesor le da la siguiente información.',
            },
            {
              img: '',
            },
            {
              text:
                '*En cualquier modalidad, el saldo del crédito cada mes será igual a la diferencia entre el saldo del crédito del mes anterior y el abono al crédito realizado en el mes.',
            },
          ],
          question:
            'Después de analizar la información, Ángela afirma: “Con la modalidad I, el valor de la cuota disminuirá $50.000 en cada mes”. La afirmación es correcta porque',
          answers: [
            {
              text:
                'a.	el interés total del crédito será $300.000 y cada mes disminuirá $50.000.',
              correct: false,
            },
            {
              text:
                'b.	cada mes se abonará al crédito $1.000.000 y el interés disminuirá en $50.000.',
              correct: true,
            },
            {
              text:
                'c.	cada mes aumentará el abono al crédito en $50.000, de manera que el interés disminuirá.',
              correct: false,
            },
            {
              text:
                'd.	el abono al crédito disminuirá $50.000 cada mes, al igual que el interés.',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text:
                'TE INVITAMOS A QUE MEJORES TU NIVEL DE desempeño. Revisa de nuevo la pregunta y acude a la(s) siguiente(s) fuente(s): ',
            },
            {
              url:
                'http://instaladores-curriculos.sucerman.com/1-curriculo-matematicas/matematicas/index.html',
            },
            {
              url:
                'https://www.colombiaaprende.edu.co/contenidos-para-aprender?Nombre=&field_nivel_value=3&field_grado_target_id=3335&field_asignatura_target_id=3322&page=0',
            },
            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 2.5,
            totems: 3,
          },
          difficult: 2.5,
        },
        {
          context: [
            {
              text:
                'Para adquirir un crédito por $6.000.000, Ángela solicita en una entidad financiera información sobre las modalidades de pago para crédito. Un asesor le da la siguiente información.',
            },
            {
              img: '',
            },
            {
              text:
                '*En cualquier modalidad, el saldo del crédito cada mes será igual a la diferencia entre el saldo del crédito del mes anterior y el abono al crédito realizado en el mes.',
            },
            {
              text:
                '*En cualquier modalidad, el saldo del crédito cada mes será igual a la diferencia entre el saldo del crédito del mes anterior y el abono al crédito realizado en el mes.',
            },
          ],
          question:
            'El interés total de un crédito es la cantidad de dinero que se paga adicional al valor de este.',
          answers: [
            {
              text: 'a.	1 solamente.',
              correct: false,
            },
            {
              text: 'b.	2 solamente.',
              correct: false,
            },
            {
              text: 'c.	1 y 3 solamente.',
              correct: true,
            },
            {
              text: 'd.	2 y 3 solamente.',
              correct: false,
            },
          ],
          negativeFeedback: [
            {
              text:
                'TE INVITAMOS A QUE MEJORES TU NIVEL DE desempeño. Revisa de nuevo la pregunta y acude a la(s) siguiente(s) fuente(s): ',
            },
            {
              url:
                'http://instaladores-curriculos.sucerman.com/1-curriculo-matematicas/matematicas/index.html',
            },
            {
              url:
                'https://www.colombiaaprende.edu.co/contenidos-para-aprender?Nombre=&field_nivel_value=3&field_grado_target_id=3335&field_asignatura_target_id=3322&page=0',
            },
            {
              text:
                'Si no tienes conexión a internet, te recomendamos que leas de nuevo los conceptos que se explicaron en esta fase del módulo.',
            },
          ],
          positiveFeedback: {
            stars: 5,
            totems: 3,
          },
          difficult: 5,
        },
      ],
    },
  };

  quizzes = [];

  dataQuestion: QuestionRequest = {
    tribeId: 1,
    numberOfQuestions: 2,
  };

  daysIndex: { [index: number]: any } = {
    0: 'sunday',
    1: 'monday',
    2: 'tuesday',
    3: 'wednesday',
    4: 'thursday',
    5: 'friday',
    6: 'saturday',
  };

  weekday: string;

  currentQuiz: number;
  answerSelected: boolean = false;
  correctAnswers = 0;
  incorrectAnswers = 0;
  prevAnswered = [] as any;
  currentQuestion: any;
  isValid: boolean;

  result = false;
  resultStatus = 'Show Result';

  questions: Question[];

  preguntasSelect: any;

  constructor(
    private route: ActivatedRoute,
    private modal: NgbModal,
    private game: GameUseCase,
    private userStats: UserDataUseCase,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initChallengeTime = DateTime.now();
    this.route.params.subscribe((params: Params) => {
      this.materia = params.materia.replace(/-([a-z])/g, function (
        g: string[]
      ) {
        return g[1].toUpperCase();
      });

      this.materiaFolder = params.materia;
      this.grade = params.grade;

      this.currentTribeName = params.materia;
      this.currentActionName = params.type;
      this.challengeId = params.challenge || '2';

      this.grade = params.grade;
      this.challengeName = params.name;
      const stats: Stat = getItem(STORAGE.userStats);
      this.stats = stats;
    });
    this.tribeId = this.tribeIds[this.materia];
    this.dataQuestion.tribeId = this.tribeId;

    this.manageData();
    this.initGame();
  }

  manageData() {
    const gameInfo: GameInfo = getItem(STORAGE.gameInfo);

    this.challenges = gameInfo.challenges;

    this.currentChallenge = gameInfo.challenges.find((challenge: Challenge) => {
      if (challenge.id?.toString() === this.challengeId.toString()) {
        return challenge;
      }
    }) || { cost: 0 };

    this.currentTribe =
      gameInfo.tribes?.find((tribe: any) => {
        if (
          tribe.name?.replace(' ', '-')?.replace('á', 'a').toLowerCase() ===
          this.currentTribeName
        ) {
          return tribe;
        }
      }) || {};

    this.currentAction =
      gameInfo.actions.find((action: Action) => {
        if (
          action.name?.replace('ó', 'o').toLowerCase() ===
          this.currentActionName
        ) {
          return action;
        }
      }) || {};
  }

  async initGame() {
    this.challengeDifficulty = this.getdifficulty();

    await this.setVariablesForDate();

    this.currentQuiz = 0;

    await this.getGameQuestions(this.dataQuestion);

    this.preguntasSelect = this.questions;
    this.quizzes = this.preguntasSelect;

    this.prevAnswered.push(this.currentQuiz);
    this.getCorrectAnswer();
  }

  async setVariablesForDate() {
    var today = await new Date();
    this.weekday = this.daysIndex[today.getDay()];

    switch (this.weekday) {
      case 'sunday':
        alert('Hoy es domingo no puedes hacer este reto hoy, vuelve mañana');
        this.goToHome();
        break;
      case 'monday':
        this.dataQuestion.numberOfQuestions = 4 + this.challengeDifficulty;
        this.pointsPerQuestion = 1;
        break;
      case 'tuesday':
        this.dataQuestion.numberOfQuestions = 3 + this.challengeDifficulty;
        this.pointsPerQuestion = 2;
        break;
      case 'wednesday':
        this.dataQuestion.numberOfQuestions = 3 + this.challengeDifficulty;
        this.pointsPerQuestion = 3;
        break;
      case 'thursday':
        this.dataQuestion.numberOfQuestions = 3 + this.challengeDifficulty;
        this.pointsPerQuestion = 2;
        break;
      case 'friday':
        this.dataQuestion.numberOfQuestions = 2 + this.challengeDifficulty;
        this.pointsPerQuestion = 5;
        break;
      case 'saturday':
        this.dataQuestion.numberOfQuestions = 1 + this.challengeDifficulty;
        this.pointsPerQuestion = 1;
        break;
    }
  }

  selectAnswer(answer: Answer) {
    this.questions[this.currentQuiz].answers?.forEach((answer) => {
      answer.selected = false;
    });
    answer.selected = true;

    this.answerSelectedAnswer = answer;
  }

  async onAnswer() {

    var data: ValidateQuestionRequest = {
      answer: this.answerSelectedAnswer?.id,
      questionId: this.questions[this.currentQuiz].id,
    };

    this.validateQuestion = await this.game
      .validateQuestion(data)
      .catch((err) => err);

    this.answerRecords.push({
      answerId: this.answerSelectedAnswer?.id,
      questionId: this.questions[this.currentQuiz].id,
    });

    if (this.validateQuestion) {
      this.challengePoints += this.pointsPerQuestion;
      this.correctAnswers++;

      this.challengePoints += this.currentQuiz + 1;
      this.openModalRegular(this.answerCorrectTpl);
    } else {
      this.incorrectAnswers++;
      this.pointsPerQuestion = this.pointsPerQuestion / 2;
      this.openModalRegular(this.answerWrongTpl);
    }
    if (this.currentQuiz >= this.questions.length - 1) {
      this.finishChallenge();
    } else {
      this.currentQuiz++;
      this.getCorrectAnswer();
    }
  }

  async finishChallenge() {
    this.challengePoints = Math.ceil(this.challengePoints);
    this.openModalRegular(this.challengeFinishedTpl);

    this.goToHome();

    const newStats: Stat = this.userStats.calculateStats(
      this.currentAction,
      this.currentChallenge,
      this.currentTribe,
      this.stats,
      this.answerRecords,
      this.challengePoints,
      this.questions.length
    );
    await this.userStats.updateStats(newStats);
  }

  goToHome() {
    this.router.navigateByUrl('/modulos');
  }

  openModal(
    modalCorrect: any,
    modalWrong: any,
    correctAnswer: boolean = this.validateQuestion
  ) {
    if (correctAnswer) {
      this.modal.open(modalCorrect, {
        size: 'lg',
        centered: true,
        scrollable: true,
      });
    } else {
      this.modal.open(modalWrong, {
        size: 'lg',
        centered: true,
        scrollable: true,
      });
    }
  }

  openModalRegular(contenido: any) {
    this.modal.open(contenido, {
      size: 'lg',
      centered: true,
      scrollable: true,
    });
  }

  async getGameQuestions(data: QuestionRequest) {
    this.questions = await this.game.getQuestions(data).catch((err) => err);
    this.totalQuestions = this.questions.length;
  }

  async getCorrectAnswer() {
    this.questions[this.currentQuiz].answers?.forEach(async (answer) => {
      var data: ValidateQuestionRequest = {
        answer: answer?.id,
        questionId: this.questions[this.currentQuiz].id,
      };

      this.validateQuestion = await this.game
        .validateQuestion(data)
        .catch((err) => err);

      if (this.validateQuestion) {
        this.correctAnswer = answer;
      }
    });
  }

  getdifficulty(min: number = 1, max: number = 3) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  ngOnDestroy(): void {
    this.finishChallengeTime = DateTime.now();

    this.challengeDuration = this.finishChallengeTime
      .diff(this.initChallengeTime, 'minutes')
      .toObject().minutes;
    this.userStats.updateStats({
      ...this.stats,
      timeInGame: this.stats.timeInGame + this.challengeDuration,
    });
  }
}
