import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-artefacto-card',
  templateUrl: './artefacto-card.component.html',
  styleUrls: ['./artefacto-card.component.scss'],
})
export class ArtefactoCardComponent implements OnInit {
  artefactsContainer: any;
  artefactsList: any;
  artefactWidth: any;
  artefactsPosition: any;
  artefactsGap: number = 2;
  artefactIndex: number = 0;
  firstTime: boolean = true;

  slidesButtons: any = {
    left: true,
    right: true,
  };

  artefacts: any = [
    {
      population: 'Negra Afroamericana, Raizal Palenquera',
      know: 'Las comunidades negras son el conjunto de familias de ascendencia afrocolombiana que poseen una cultura propia, comparten una historia y tienen sus propias  tradiciones y costumbres.',
      url: 'https://www.unidadvictimas.gov.co/es/comunidades-negras-afrocolombianas-raizales-y-palenqueras/277',
    },
    {
      population: 'Negra Afroamericana, Raizal Palenquera',
      know: 'La población raizal es la población nativa de las Islas de San Andrés, Providencia Y Santa Catalina descendientes de la unión entre europeos (principalmente ingleses, españoles y holandeses) y esclavos africanos.',
      url: 'https://www.unidadvictimas.gov.co/es/comunidades-negras-afrocolombianas-raizales-y-palenqueras/277',
    },
    {
      population: 'Negra Afroamericana, Raizal Palenquera',
      know: 'Comunidades Afrocolombianas: Son los grupos humanos que hacen presencia en todo el territorio nacional (urbano-rural), de raíces y descendencia histórica, étnica y cultural africana nacidos en Colombia, con su diversidad racial, lingüística y folclórica.',
      url: 'https://www.unidadvictimas.gov.co/es/comunidades-negras-afrocolombianas-raizales-y-palenqueras/277',
    },
    {
      population: 'Negra Afroamericana, Raizal Palenquera',
      know: 'La Comunidad palenquera está conformada por lo descendientes de los esclavizados que se refugiaron en los territorios de la Costa Norte de Colombia desde el Siglo XV.',
      url: 'https://www.unidadvictimas.gov.co/es/comunidades-negras-afrocolombianas-raizales-y-palenqueras/277',
    },
    {
      population: 'Negra Afroamericana, Raizal Palenquera',
      know: 'Los raizales cuentan con una lengua propia, el Creole y representan entre el 30 y 35% del total de los 80.000 habitantes del Archipiélago de San Andrés, Providencia y Santa Catalina.',
      url: 'https://www.urosario.edu.co/jurisprudencia/catedra-viva-intercultural/ur/Comunidades-Etnicas-de-Colombia/Comunidad-Raizal/',
    },
    {
      population: 'Negra Afroamericana, Raizal Palenquera',
      know: 'Colombia es el Segundo país en Sur América con el mayor número de afro-descendientes, siendo el primero Brasil.',
      url: 'https://www.acnur.org/fileadmin/Documentos/RefugiadosAmericas/Colombia/2013/SituacionColombia_Afrodescendientes_junio2012.pdf?view=1',
    },
    {
      population: 'Negra Afroamericana, Raizal Palenquera',
      know: 'Los Afrocolombianos representan el 12.3% del total de la población internamente desplazada en Colombia.',
      url: 'https://www.acnur.org/fileadmin/Documentos/RefugiadosAmericas/Colombia/2013/SituacionColombia_Afrodescendientes_junio2012.pdf?view=1',
    },
    {
      population: 'Indígena',
      know: 'Según la legislación colombiana, las “comunidades indígenas” son el grupo humano que vive de acuerdo con las formas de relación con el medio natural en el que se asentaron los diferentes grupos aborígenes desde antes de la conquista y la han conservado y dinamizado a lo largo de la historia.',
      url: 'https://www.urosario.edu.co/jurisprudencia/catedra-viva-intercultural/ur/La-Consulta-Previa/Que-es-la-Consulta-Previa/',
    },
    {
      population: 'Indígena',
      know: 'Un pueblo indígena puede estar compuesto por varias comunidades, es decir, una comunidad indígena constituye un fragmento de un pueblo indígena.',
      url: 'https://www.urosario.edu.co/jurisprudencia/catedra-viva-intercultural/ur/La-Consulta-Previa/Que-es-la-Consulta-Previa/',
    },
    {
      population: 'Indígena',
      know: 'De acuerdo al censo nacional llevado a cabo en el año 2018, la población indígena representa el 4,4% de la población total del país, sumando 1.905.617 indígenas de todos los pueblos.',
      url: 'https://www.iwgia.org/es/colombia/3739-mi-2020-colombia.html#:~:text=De%20acuerdo%20al%20censo%20nacional,ind%C3%ADgenas%20de%20todos%20los%20pueblos.',
    },
    {
      population: 'Indígena',
      know: 'El Censo de 2018 identificó la existencia de 115 pueblos nativos en el país.',
      url: 'https://id.presidencia.gov.co/Paginas/prensa/2019/La-poblacion-indigena-en-Colombia-es-de-1905617-personas-segun-Censo-del-Dane-190916.aspx',
    },
    {
      population: 'Indígena',
      know: 'Los departamentos en los que se ubica la mayor cantidad de población indígena son La Guajira, con 394.683 habitantes; Cauca, con 308.455; Nariño con 206.455; Córdoba, con 202.621 y Sucre con 104.890.',
      url: 'https://www.iwgia.org/es/colombia/3739-mi-2020-colombia.html#:~:text=De%20acuerdo%20al%20censo%20nacional,ind%C3%ADgenas%20de%20todos%20los%20pueblos.',
    },
    {
      population: 'Indígena',
      know: 'En Colombia existen aproximadamente 68 lenguas nativas habladas por cerca de 850.000 personas. Entre ellas, se encuentran 65 lenguas indígenas, o indoamericanas',
      url: 'https://mincultura.gov.co/areas/poblaciones/APP-de-lenguas-nativas/Paginas/default.aspx#:~:text=Las%20lenguas%20nativas%20son%20parte,diversidad%20ling%C3%BC%C3%ADstica%20de%20nuestro%20territorio.&text=En%20Colombia%20existen%20aproximadamente%2068,por%20cerca%20de%20850.000%20personas.',
    },
    {
      population: 'Indígena',
      know: 'Los pueblos indígenas habitan en Resguardos, que son instituciones legales y sociopolíticas de carácter especial, conformados por una o más comunidades indígenas.',
      url: 'https://www.minsalud.gov.co/proteccionsocial/promocion-social/Paginas/Pueblos-indigenas.aspx',
    },
    {
      population: 'Indígena',
      know: 'Las etnias con mayor número de miembros son la Wayuu (380.460), la Zenú, (307.091); los Nasa, (243.176) y Pastos (163.873). Estos pueblos concentran el 58,1% de la población indígena colombiana.',
      url: 'https://www.iwgia.org/es/colombia/3739-mi-2020-colombia.html',
    },
    {
      population: 'Indígena',
      know: 'A partir de la Constitución de 1991 Colombia es reconocido como un estado pluriétnico y multicultural y reconoce autonomías culturales, administrativas y jurídicas de los pueblos indígenas',
      url: 'https://www.acnur.org/fileadmin/Documentos/Pueblos_indigenas/2011/Comunidades_indigenas_en_Colombia_-_ACNUR_2011.pdf',
    },
    {
      population: 'Indígena',
      know: 'Las comunidades o pueblos indígenas en su mayoría basan su economía en la agricultura, ganadería, la pesca artesanal, el pastoreo y las artesanías.',
      url: 'https://www.onic.org.co/pueblos',
    },
    {
      population: 'población ROM',
      know: 'La comunidad gitana o Pueblo Rrom es un grupo étnico que llegó a América Latina desde el tiempo de la Colonia.',
      url: 'https://www.eltiempo.com/archivo/documento/CMS-4301943#:~:text=La%20comunidad%20gitana%20o%20Pueblo,en%20varias%20ciudades%20de%20Colombia',
    },
    {
      population: 'población ROM',
      know: 'No se ubican en un territorio específico, ya que son comunidades semi-nómadas y forman grupos de tamaño variable o familias extensas conocidas como Kumpanias, que son unidades de co-residencia o co-circulación.',
      url: 'https://www.eltiempo.com/archivo/documento/CMS-4301943#:~:text=La%20comunidad%20gitana%20o%20Pueblo,en%20varias%20ciudades%20de%20Colombia',
    },
    {
      population: 'población ROM',
      know: 'Según el DANE, el 94% de la población Rrom reside en los departamentos de Atlántico, Bolívar, Valle del Cauca, Norte de Santander, Santander y Nariño y en la ciudad de Bogotá.',
      url: 'https://www.dane.gov.co/files/investigaciones/boletines/grupos-etnicos/presentacion-grupos-etnicos-poblacion-gitana-rrom-2019.pdf',
    },
    {
      population: 'población ROM',
      know: 'Las Kumpanias y las Vitsas son la denominación para los diferentes grupos o linajes que la población Rrom forman como unidades comunitarias de residencia y circulación.',
      url: 'https://www.eltiempo.com/archivo/documento/CMS-4301943#:~:text=La%20comunidad%20gitana%20o%20Pueblo,en%20varias%20ciudades%20de%20Colombia',
    },
    {
      population: 'población ROM',
      know: 'Según el DANE, se identificaron 11 kumpanias en el Censo Nacional Poblacional del 2018. Las principales Kumpanias se ubican en Barranquilla, Cartagena, Cali, Cúcuta, Girón e Ipiales.',
      url: 'https://www.dane.gov.co/files/investigaciones/boletines/grupos-etnicos/presentacion-grupos-etnicos-poblacion-gitana-rrom-2019.pdf',
    },
    {
      population: 'población ROM',
      know: 'Aunque los gitanos ya no son un pueblo totalmente nómada, tampoco se ubican en un lugar específico: “su única patria es el mundo, así es que cuando el trabajo se acaba en un lugar, recogen sus cosas y se van a otro donde puedan ocuparse”',
      url: 'https://www.eltiempo.com/archivo/documento/CMS-4301943#:~:text=La%20comunidad%20gitana%20o%20Pueblo,en%20varias%20ciudades%20de%20Colombia',
    },
    {
      population: 'población ROM',
      know: 'Los Rrom tienen un sistema jurídico propio, llamado Kriss Rromaní o Rromaniya, compuesto por normas, trasmitidas oralmente de generación en generación, que permiten la administración de justicia entre ellos.',
      url: 'https://colaboracion.dnp.gov.co/CDT/Desarrollo%20Territorial/Pueblo%20Rrom%20Gitano.pdf',
    },
    {
      population: 'población ROM',
      know: 'La población ROM no están interesados en ser reconocidos públicamente, lo que buscan es ser reconocidos como ciudadanos con iguales derechos como todos, y además ser aceptados como un grupo étnico.',
      url: 'https://www.eltiempo.com/archivo/documento/CMS-4301943#:~:text=La%20comunidad%20gitana%20o%20Pueblo,en%20varias%20ciudades%20de%20Colombia',
    },
    {
      population: 'población ROM',
      know: 'Los gitanos o Rrom tienen como lengua el romaní, lengua catalogada en la subfamilia indoaria, perteneciente a la familia indoeuropea.',
      url: 'https://lenguasdecolombia.caroycuervo.gov.co/contenido/Lenguas-romanes-o-gitana/introduccion',
    },
  ];

  constructor(private modal: NgbModal) {}

  ngOnInit(): void {}

  initArtefacts() {
    if (this.firstTime) {
      this.artefactsContainer = document.getElementById('slidesContainer');
      this.artefactsList = document.querySelectorAll('.artefact__card');
      this.artefactWidth =
        this.artefactsContainer.scrollWidth / this.artefactsList.length;

      this.artefactsPosition = this.artefactWidth * this.artefactsGap;

      this.ButtonStatus();
      this.setSlideClass();
    }
    this.firstTime = false;
  }

  sliderPrev() {
    this.artefactsPosition += this.artefactWidth;
    this.artefactIndex--;
    this.ButtonStatus();
    this.setSlideClass();
  }
  sliderNext() {
    this.artefactsPosition -= this.artefactWidth;
    this.artefactIndex++;
    this.ButtonStatus();
    this.setSlideClass();
  }

  ButtonStatus() {
    if (this.artefactIndex + 1 <= 1) {
      this.slidesButtons.left = false;
    } else {
      this.slidesButtons.left = true;
    }

    if (this.artefactIndex + 1 >= this.artefactsList.length) {
      this.slidesButtons.right = false;
    } else {
      this.slidesButtons.right = true;
    }
  }

  setSlideClass() {
    this.artefactsList.forEach((artefactSlide: any) => {
      artefactSlide.classList.remove('is-active');
    });

    this.artefactsList[this.artefactIndex].classList.add('is-active');
  }

  openModal(contenido: any) {
    this.modal.open(contenido, {
      size: 'lg',
      centered: true,
      scrollable: true,
    });
  }
}
