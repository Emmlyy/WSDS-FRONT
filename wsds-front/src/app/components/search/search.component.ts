import { Component } from '@angular/core';
import { GemmaService } from '../../services/gemma.service';
import { map, Observable, startWith } from 'rxjs';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import global from './../../mocks/global';
import { HttpEventType } from '@angular/common/http';
import { LoaderService } from '../../services/loader.service';
interface OnInit {}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  //YourDialog: '../Ficha/ficha.component.html'
})
export class SearchComponent implements OnInit {
  searchControl = new FormControl('');
  townsControl = new FormControl('');
  departmentsControl = new FormControl('');
  loaderInServices = false;
  results: any[] = [];
  indicatorsSet: string = "id1";
  options: string[] = ['Homicidio', 'Feminicidio', 'Asesinato'];
  departments = [
    {
      name: 'Ahuachapán',
      towns: ['Ahuachapán Norte', 'Ahuachapán Centro', 'Ahuachapán Sur'],
    },
    {
      name: 'San Salvador',
      towns: [
        'San Salvador Norte',
        'San Salvador Oeste',
        'San Salvador Este',
        'San Salvador Centro',
        'San Salvador Sur',
      ],
    },
    {
      name: 'La Libertad',
      towns: [
        'La Libertad Norte',
        'La Libertad Centro',
        'La Libertad Oeste',
        'La Libertad Este',
        'La Libertad Costa',
        'La Libertad Sur',
      ],
    },
    {
      name: 'Chalatenango',
      towns: ['Chalatenango Norte', 'Chalatenango Centro', 'Chalatenango Sur'],
    },
    { name: 'Cuscatlán', towns: ['Cuscatlán Norte', 'Cuscatlán Sur'] },
    { name: 'Cabañas', towns: ['Cabañas Este', 'Cabañas Oeste'] },
    { name: 'La Paz', towns: ['La Paz Oeste', 'La Paz Centro', 'La Paz Este'] },
    { name: 'La Unión', towns: ['La Unión Norte', 'La Unión Sur'] },
    {
      name: 'Usulután',
      towns: ['Usulután Norte', 'Usulután Este', 'Usulután Oeste'],
    },
    {
      name: 'Sonsonate',
      towns: [
        'Sonsonate Norte',
        'Sonsonate Centro',
        'Sonsonate Este',
        'Sonsonate Oeste',
      ],
    },
    {
      name: 'Santa Ana',
      towns: [
        'Santa Ana Norte',
        'Santa Ana Centro',
        'Santa Ana Este',
        'Santa Ana Oeste',
      ],
    },
    { name: 'San Vicente', towns: ['San Vicente Norte', 'San Vicente Sur'] },
    {
      name: 'San Miguel',
      towns: ['San Miguel Norte', 'San Miguel Centro', 'San Miguel Oeste'],
    },
    { name: 'Morazán', towns: ['Morazán Norte', 'Morazán Sur'] },
  ];
  filteredOptions: Observable<string[]> | undefined;
  filteredOptionsDepartments: Observable<string[]> | undefined;
  filteredOptionsTowns: Observable<string[]> | undefined;
  currentDepartment: { name: string; towns: string[] } | null | undefined =
    null;
  indicators = [
    'Víctima',
    'Agresor/a',
    'Edad de la víctima y del agresor',
    'Hechos vulneratorios',
    'Contexto del hecho',
    'Lugar del hecho',
    'Arma',
    'Estado del agresor/a después del hecho',
    'Homicidios sin contextos',
  ];
  highPerformance: string = "standard";
  iconMapper = new Map([
    ['diario.elmundo.sv', './../../assets/elmundo.png'],
    ['diariocolatino.com', './../../assets/colatino.png'],
    ['diarioelsalvador.com', './../../assets/elsalvador.png'],
  ]);
  news:
    | {
        title: string;
        text: string;
        source: string;
        sheet: {
          priority: number;
        };
        tag: string;
        url: string;
        sheet_id: string;
        date: string;
      }[]
    | null
    | undefined = null;

  constructor(
    private gemmaService: GemmaService,
    private loaderService: LoaderService
  ) {}

  moked = [
    {
      "title": "Arrestan a cuatro peligrosos pandilleros deportados de Estados Unidos",
      "text": "Un grupo de cuatro sujetos miembro de grupos de pandillas y considerados de alta peligrosidad fueron detenidos por elementos de la Policía Nacional Civil (PNC) tras ser deportados de Estados Unidos y arribar al Aeropuerto Internacional de El Salvador. La institución policial detalló que los detenidos son señalados por casos de homicidios y feminicidios, además de su afiliación a grupos de pandillas y estructuras terroristas que operaban en diversas partes de El Salvador. 4 Peligrosos criminales fueron detenidos en el aeropuerto Óscar Arnulfo Romero, deportados de Estados Unidos:▪️Omar Ulises Pineda Amaya, alias Gato o Mouse, gatillero de la 18R, con orden girada por un juez de San Salvador en el año 2023 por homicidio, feminicidio agravado y… pic.twitter.com/BfrjWm1SDN Uno de los detenidos fue identificado como Omar Ulises Pineda Amaya, alias Gato o Mouse, perfilado como gatillero de la pandilla 18R y quien cuenta con orden de captura emitida por un juzgado de San Salvador el pasado año 2023 por los delitos de homicidio, feminicidio agravado y agrupaciones ilícitas. Otro de los detenidos responde al nombre de Milton Adonay Medina Salmerón, alias Chuchi o Cuche, perfilado como homeboy de la pandilla MS13 y con orden de captura emitida en San Francisco Gotera, Morazán, por homicidio agravado y agrupaciones ilícitas. La Policía también logró la captura de David Isaac Castro Merino, alias Deybi, un homeboy de la pandilla 18S quien es señalado por agrupaciones ilícitas. El último de los detenidos fue identificado como Fredy Edenilson Hernández Guardado, alias Tambor, gatillero de la MS13.",
      "source": "diarioelsalvador.com",
      "url": "https://diarioelsalvador.com/arrestan-a-cuatro-peligrosos-pandilleros-deportados-de-estados-unidos/499472/",
      "sheet_id": "https://diarioelsalvador.com/arrestan-a-cuatro-peligrosos-pandilleros-deportados-de-estados-unidos/499472/",
      "tag": "Feminicidio",
      "date": "2024-05-05",
      "sheet": {
        "indicators": [
          {
            "indicator_name": "Clasificacion",
            "response": "La noticia sí describe un homicidio. La noticia indica que los cuatro pandilleros asesinaron a alguien, pero no se proporciona más información sobre el homicidio."
          },
          {
            "indicator_name": "Titulo",
            "response": "**Título de la noticia:** Arrestan a cuatro peligrosos pandilleros deportados de Estados Unidos\n\n**Extraído:** El título de la noticia es \"Arrestan a cuatro peligrosos pandilleros deportados de Estados Unidos\"."
          },
          {
            "indicator_name": "Resumen",
            "response": "**Resumen:**\n\nLa noticia informa sobre la captura de cuatro peligrosos pandilleros salvadoreños que fueron deportados de Estados Unidos y llegados al Aeropuerto Internacional de El Salvador. Los cuatro individuos, miembros de grupos de pandillas y considerados de alta peligrosidad, fueron detenidos por la Policía Nacional Civil (PNC). Los cargos contra ellos incluyen homicidios, feminicidios y agrupaciones ilícitas. Uno de los detenidos, Omar Ulises Pineda Amaya, alias Gato o Mouse, cuenta con orden de captura por homicidio, feminicidio agravado y agrupaciones ilícitas."
          },
          {
            "indicator_name": "Ubicacion del Suceso",
            "response": "La noticia indica que el suceso ocurrió en el Aeropuerto Internacional de El Salvador."
          },
          {
            "indicator_name": "Fuentes",
            "response": "**Cita de fuentes de información:**\n\nLa noticia no indica fuentes de información, por lo que no se puede proporcionar la cita de fuentes de información."
          },
          {
            "indicator_name": "Temas",
            "response": "**Temas principales tratados en la noticia:**\n\n* **Detención de peligrosos pandilleros:** La noticia reporta la detención de cuatro peligrosos pandilleros salvadoreños que fueron deportados de Estados Unidos.\n* **Casos de homicidios y feminicidios:** Los cuatro pandilleros están señalados por casos de homicidios y feminicidios.\n* **Grupos de pandillas y estructuras terroristas:** Los pandilleros están asociados a grupos de pandillas y estructuras terroristas que operaban en diversas partes de El Salvador.\n* **Orden de captura:** Los cuatro pandilleros tienen orden de captura emitida por diferentes tribunales.\n* **Perfiles:** Los pandilleros tienen perfiles asociados a sus grupos de pandillas y delitos."
          },
          {
            "indicator_name": "Hechos Violativos",
            "response": "La noticia no contiene información sobre la violación a la ley, por lo que no se puede proporcionar la información solicitada."
          },
          {
            "indicator_name": "Hipotesis de los Hechos",
            "response": "**Teoría:**\n\nLa noticia reporta el arresto de cuatro peligrosos pandilleros deportados de Estados Unidos en el Aeropuerto Internacional de El Salvador. Los sujetos, identificados como Omar Ulises Pineda Amaya alias Gato o Mouse, Milton Adonay Medina Salmerón alias Chuchi o Cuche, David Isaac Castro Merino alias Deybi, y Fredy Edenilson Hernández Guardado alias Tambor, están relacionados con grupos de pandillas y estructuras terroristas operativas en diversas partes de El Salvador.\n\nLa presencia de estos individuos en el país podría estar ligada a actividades criminales, como homicidios, feminicidios y agrupaciones ilícitas. Es importante destacar que los órdenes de captura para cada uno de los detenidos fueron emitidas por autoridades de diferentes jurisdicciones, lo que indica la magnitud de sus delitos.\n\n**Suposición:**\n\nLas operaciones de captura de los cuatro peligrosos pandilleros deportados de Estados Unidos en el Aeropuerto Internacional de El Salvador demuestran la capacidad de la policía nacional para combater la delincuencia organizada. La eliminación de estos individuos de las calles podría tener un impacto positivo en la reducción de la criminalidad en el país."
          },
          {
            "indicator_name": "Poblacion Vulnerable",
            "response": "La noticia indica que los grupos en riesgo mencionados son:\n\n* **18R:** Esta pandilla se ubica en diversas partes de El Salvador.\n* **MS13:** Esta pandilla se ubica en Morazán.\n* **18S:** Esta pandilla se ubica en el país."
          },
          {
            "indicator_name": "Tipo de Arma",
            "response": "La texto no describe el tipo de arma que se utiliza en la noticia, por lo que no se puede determinar si se menciona el tipo de arma."
          },
          {
            "indicator_name": "Victimas",
            "response": "La texto no contiene información sobre las víctimas, por lo que no se puede proporcionar la información de su identificación en este texto."
          },
          {
            "indicator_name": "Agresor o Sospechoso",
            "response": "La noticia no indica el nombre del agresor, por lo que no se puede proporcionar la información de nombre del agresor."
          }
        ],
        "priority": 2,
        "id": "https://diarioelsalvador.com/arrestan-a-cuatro-peligrosos-pandilleros-deportados-de-estados-unidos/499472/"
      }
    },
    {
      "title": "Criminales enfrentan juicio por el asesinato de una mujer en Teotepeque",
      "text": "Tres pandilleros enfrentan juicio por el asesinato de una mujer, cuyo cuerpo fue encontrado en un predio baldío situado en el distrito de Teotepeque, municipio de La Libertad Costa. La audiencia de vista pública se lleva a cabo en el Juzgado Especializado de Sentencia para una Vida Libre de Violencia y Discriminación para Las Mujeres de San Salvador, donde según la Fiscalía General de la República (FGR) se presentarán todas las pruebas que cómo fue cometido el crimen. En el caso de Rudy Alexander Gamez Sandoval, perfilado como integrante de la pandilla 18, es acusado de homicidio agravado, y según las investigaciones fiscales es señalado de planificar la muerte de la víctima. Los otros implicados son José Heriberto Orellana Lemus y Anival Torres Cruz, quienes enfrentan cargos por feminicidio agravado; ambos son acusados de ejecutar el asesinato. «Los hechos surgen a raíz de un hallazgo realizado el 12 de octubre de 2018 a las 17:00 horas (5:00 pm) en terreno baldío ubicado al costado sur de la carretera Litoral en el km 73 y medio. Es en este lugar donde, ya en estado de descomposición, se da el hallazgo de la víctima y es lo que da pie a iniciar una investigación», explicó el fiscal del caso. Tres sujetos acusados de asesinar a una mujer enfrentan #VistaPública. La @FGR_SV cuenta con suficientes pruebas para demostrar que ellos cometieron este hecho.Rudy Alexander Gamez Sandoval, miembro del Barrio 18, es el principal sospechoso de planificar la muerte de la… pic.twitter.com/PwsTwEDYSA  ",
      "source": "diarioelsalvador.com",
      "url": "https://diarioelsalvador.com/criminales-enfrentan-juicio-por-el-asesinato-de-una-mujer-en-teotepeque/494359/",
      "sheet_id": "https://diarioelsalvador.com/criminales-enfrentan-juicio-por-el-asesinato-de-una-mujer-en-teotepeque/494359/",
      "tag": "Feminicidio",
      "date": "2024-05-05",
      "sheet": {
        "indicators": [
          {
            "indicator_name": "Clasificacion",
            "response": "La noticia describe un homicidio, ya que se habla del asesinato de una mujer."
          },
          {
            "indicator_name": "Titulo",
            "response": "**Título de la noticia:** Criminales enfrentan juicio por el asesinato de una mujer en Teotepeque\n\nLa información extraída se coincide con el título de la noticia."
          },
          {
            "indicator_name": "Resumen",
            "response": "**Resumen:**\n\nLa noticia informa sobre el juicio de tres pandilleros por el asesinato de una mujer en Teotepeque, La Libertad Costa. La víctima fue encontrada en un predio baldío y el asesinato se cree que fue relacionado con la pandilla 18. Los acusados son Rudy Alexander Gamez Sandoval, José Heriberto Orellana Lemus y Anival Torres Cruz. El juicio se lleva a cabo en el Juzgado Especializado de Sentencia para una Vida Libre de Violencia y Discriminación para Las Mujeres de San Salvador."
          },
          {
            "indicator_name": "Ubicacion del Suceso",
            "response": "La noticia indica que el suceso ocurrió en un predio baldío situado en el distrito de Teotepeque, municipio de La Libertad Costa."
          },
          {
            "indicator_name": "Fuentes",
            "response": "La noticia no indica las fuentes de información, por lo que no se puede proporcionar la información sobre las mismas."
          },
          {
            "indicator_name": "Temas",
            "response": "**Temas principales tratados en la noticia:**\n\n* **Crimen de asesinato:** La noticia informa sobre el juicio de tres pandilleros por el asesinato de una mujer en Teotepeque, La Libertad Costa.\n* **Audiencia de vista pública:** La audiencia de vista pública se lleva a cabo en el Juzgado Especializado de Sentencia para una Vida Libre de Violencia y Discriminación para Las Mujeres de San Salvador.\n* **Prueba:** La Fiscalía General de la República (FGR) presenta todas las pruebas que cómo fue cometido el crimen.\n* **Implicados:** Los acusados son Rudy Alexander Gamez Sandoval, José Heriberto Orellana Lemus y Anival Torres Cruz.\n* **Lugar del crimen:** El crimen ocurrió en un predio baldío ubicado en el distrito de Teotepeque."
          },
          {
            "indicator_name": "Hechos Violativos",
            "response": "La texto no contiene información sobre la violación a la ley, por lo que no se puede proporcionar la información requesteda."
          },
          {
            "indicator_name": "Hipotesis de los Hechos",
            "response": "**Teoría:**\n\nLa noticia reporta el juicio por asesinato de una mujer en Teotepeque, La Libertad Costa. Los acusados son tres pandilleros, incluyendo a Rudy Alexander Gamez Sandoval, miembro de la pandilla 18, acusado de homicidio agravado.\n\n**Suposición:**\n\nBasándose en la información disponible, la suposición de la noticia es que el asesinato se llevó a cabo por motivos relacionados con la actividad pandillera."
          },
          {
            "indicator_name": "Poblacion Vulnerable",
            "response": "La noticia no indica grupos en riesgo, por lo que no se puede proporcionar la información solicitada."
          },
          {
            "indicator_name": "Tipo de Arma",
            "response": "La texto no indica el tipo de arma que se utilizó en el asesinato, por lo que no se puede proporcionar la información sobre el tipo de arma."
          },
          {
            "indicator_name": "Victimas",
            "response": "La noticia no identifica a la víctima, por lo que no se puede proporcionar la información de su identificación."
          },
          {
            "indicator_name": "Agresor o Sospechoso",
            "response": "El texto indica que el nombre del agresor es **Rudy Alexander Gamez Sandoval**, pero no se menciona el nombre del otro agresor, por lo que no se puede proporcionar la información de nombre del agresor completa."
          }
        ],
        "priority": 4,
        "id": "https://diarioelsalvador.com/criminales-enfrentan-juicio-por-el-asesinato-de-una-mujer-en-teotepeque/494359/"
      }
    },
    {
      "title": "Criminales enfrentan juicio por el asesinato de una mujer en Teotepeque",
      "text": "Tres pandilleros enfrentan juicio por el asesinato de una mujer, cuyo cuerpo fue encontrado en un predio baldío situado en el distrito de Teotepeque, municipio de La Libertad Costa. La audiencia de vista pública se lleva a cabo en el Juzgado Especializado de Sentencia para una Vida Libre de Violencia y Discriminación para Las Mujeres de San Salvador, donde según la Fiscalía General de la República (FGR) se presentarán todas las pruebas que cómo fue cometido el crimen. En el caso de Rudy Alexander Gamez Sandoval, perfilado como integrante de la pandilla 18, es acusado de homicidio agravado, y según las investigaciones fiscales es señalado de planificar la muerte de la víctima. Los otros implicados son José Heriberto Orellana Lemus y Anival Torres Cruz, quienes enfrentan cargos por feminicidio agravado; ambos son acusados de ejecutar el asesinato. «Los hechos surgen a raíz de un hallazgo realizado el 12 de octubre de 2018 a las 17:00 horas (5:00 pm) en terreno baldío ubicado al costado sur de la carretera Litoral en el km 73 y medio. Es en este lugar donde, ya en estado de descomposición, se da el hallazgo de la víctima y es lo que da pie a iniciar una investigación», explicó el fiscal del caso. Tres sujetos acusados de asesinar a una mujer enfrentan #VistaPública. La @FGR_SV cuenta con suficientes pruebas para demostrar que ellos cometieron este hecho.Rudy Alexander Gamez Sandoval, miembro del Barrio 18, es el principal sospechoso de planificar la muerte de la… pic.twitter.com/PwsTwEDYSA  ",
      "source": "diarioelsalvador.com",
      "url": "https://diarioelsalvador.com/criminales-enfrentan-juicio-por-el-asesinato-de-una-mujer-en-teotepeque/494359/",
      "sheet_id": "https://diarioelsalvador.com/criminales-enfrentan-juicio-por-el-asesinato-de-una-mujer-en-teotepeque/494359/",
      "tag": "Feminicidio",
      "date": "2024-05-05",
      "sheet": {
        "indicators": [
          {
            "indicator_name": "Clasificacion",
            "response": "La noticia describe un homicidio, ya que se habla del asesinato de una mujer."
          },
          {
            "indicator_name": "Titulo",
            "response": "**Título de la noticia:** Criminales enfrentan juicio por el asesinato de una mujer en Teotepeque\n\nLa información extraída se coincide con el título de la noticia."
          },
          {
            "indicator_name": "Resumen",
            "response": "**Resumen:**\n\nLa noticia informa sobre el juicio de tres pandilleros por el asesinato de una mujer en Teotepeque, La Libertad Costa. La víctima fue encontrada en un predio baldío y el asesinato se cree que fue relacionado con la pandilla 18. Los acusados son Rudy Alexander Gamez Sandoval, José Heriberto Orellana Lemus y Anival Torres Cruz. El juicio se lleva a cabo en el Juzgado Especializado de Sentencia para una Vida Libre de Violencia y Discriminación para Las Mujeres de San Salvador."
          },
          {
            "indicator_name": "Ubicacion del Suceso",
            "response": "La noticia indica que el suceso ocurrió en un predio baldío situado en el distrito de Teotepeque, municipio de La Libertad Costa."
          },
          {
            "indicator_name": "Fuentes",
            "response": "La noticia no indica las fuentes de información, por lo que no se puede proporcionar la información sobre las mismas."
          },
          {
            "indicator_name": "Temas",
            "response": "**Temas principales tratados en la noticia:**\n\n* **Crimen de asesinato:** La noticia informa sobre el juicio de tres pandilleros por el asesinato de una mujer en Teotepeque, La Libertad Costa.\n* **Audiencia de vista pública:** La audiencia de vista pública se lleva a cabo en el Juzgado Especializado de Sentencia para una Vida Libre de Violencia y Discriminación para Las Mujeres de San Salvador.\n* **Prueba:** La Fiscalía General de la República (FGR) presenta todas las pruebas que cómo fue cometido el crimen.\n* **Implicados:** Los acusados son Rudy Alexander Gamez Sandoval, José Heriberto Orellana Lemus y Anival Torres Cruz.\n* **Lugar del crimen:** El crimen ocurrió en un predio baldío ubicado en el distrito de Teotepeque."
          },
          {
            "indicator_name": "Hechos Violativos",
            "response": "La texto no contiene información sobre la violación a la ley, por lo que no se puede proporcionar la información requesteda."
          },
          {
            "indicator_name": "Hipotesis de los Hechos",
            "response": "**Teoría:**\n\nLa noticia reporta el juicio por asesinato de una mujer en Teotepeque, La Libertad Costa. Los acusados son tres pandilleros, incluyendo a Rudy Alexander Gamez Sandoval, miembro de la pandilla 18, acusado de homicidio agravado.\n\n**Suposición:**\n\nBasándose en la información disponible, la suposición de la noticia es que el asesinato se llevó a cabo por motivos relacionados con la actividad pandillera."
          },
          {
            "indicator_name": "Poblacion Vulnerable",
            "response": "La noticia no indica grupos en riesgo, por lo que no se puede proporcionar la información solicitada."
          },
          {
            "indicator_name": "Tipo de Arma",
            "response": "La texto no indica el tipo de arma que se utilizó en el asesinato, por lo que no se puede proporcionar la información sobre el tipo de arma."
          },
          {
            "indicator_name": "Victimas",
            "response": "La noticia no identifica a la víctima, por lo que no se puede proporcionar la información de su identificación."
          },
          {
            "indicator_name": "Agresor o Sospechoso",
            "response": "El texto indica que el nombre del agresor es **Rudy Alexander Gamez Sandoval**, pero no se menciona el nombre del otro agresor, por lo que no se puede proporcionar la información de nombre del agresor completa."
          }
        ],
        "priority": 3,
        "id": "https://diarioelsalvador.com/criminales-enfrentan-juicio-por-el-asesinato-de-una-mujer-en-teotepeque/494359/"
      }
    },
    {
      "title": "Criminales enfrentan juicio por el asesinato de una mujer en Teotepeque",
      "text": "Tres pandilleros enfrentan juicio por el asesinato de una mujer, cuyo cuerpo fue encontrado en un predio baldío situado en el distrito de Teotepeque, municipio de La Libertad Costa. La audiencia de vista pública se lleva a cabo en el Juzgado Especializado de Sentencia para una Vida Libre de Violencia y Discriminación para Las Mujeres de San Salvador, donde según la Fiscalía General de la República (FGR) se presentarán todas las pruebas que cómo fue cometido el crimen. En el caso de Rudy Alexander Gamez Sandoval, perfilado como integrante de la pandilla 18, es acusado de homicidio agravado, y según las investigaciones fiscales es señalado de planificar la muerte de la víctima. Los otros implicados son José Heriberto Orellana Lemus y Anival Torres Cruz, quienes enfrentan cargos por feminicidio agravado; ambos son acusados de ejecutar el asesinato. «Los hechos surgen a raíz de un hallazgo realizado el 12 de octubre de 2018 a las 17:00 horas (5:00 pm) en terreno baldío ubicado al costado sur de la carretera Litoral en el km 73 y medio. Es en este lugar donde, ya en estado de descomposición, se da el hallazgo de la víctima y es lo que da pie a iniciar una investigación», explicó el fiscal del caso. Tres sujetos acusados de asesinar a una mujer enfrentan #VistaPública. La @FGR_SV cuenta con suficientes pruebas para demostrar que ellos cometieron este hecho.Rudy Alexander Gamez Sandoval, miembro del Barrio 18, es el principal sospechoso de planificar la muerte de la… pic.twitter.com/PwsTwEDYSA  ",
      "source": "diarioelsalvador.com",
      "url": "https://diarioelsalvador.com/criminales-enfrentan-juicio-por-el-asesinato-de-una-mujer-en-teotepeque/494359/",
      "sheet_id": "https://diarioelsalvador.com/criminales-enfrentan-juicio-por-el-asesinato-de-una-mujer-en-teotepeque/494359/",
      "tag": "Feminicidio",
      "date": "2024-05-05",
      "sheet": {
        "indicators": [
          {
            "indicator_name": "Clasificacion",
            "response": "La noticia describe un homicidio, ya que se habla del asesinato de una mujer."
          },
          {
            "indicator_name": "Titulo",
            "response": "**Título de la noticia:** Criminales enfrentan juicio por el asesinato de una mujer en Teotepeque\n\nLa información extraída se coincide con el título de la noticia."
          },
          {
            "indicator_name": "Resumen",
            "response": "**Resumen:**\n\nLa noticia informa sobre el juicio de tres pandilleros por el asesinato de una mujer en Teotepeque, La Libertad Costa. La víctima fue encontrada en un predio baldío y el asesinato se cree que fue relacionado con la pandilla 18. Los acusados son Rudy Alexander Gamez Sandoval, José Heriberto Orellana Lemus y Anival Torres Cruz. El juicio se lleva a cabo en el Juzgado Especializado de Sentencia para una Vida Libre de Violencia y Discriminación para Las Mujeres de San Salvador."
          },
          {
            "indicator_name": "Ubicacion del Suceso",
            "response": "La noticia indica que el suceso ocurrió en un predio baldío situado en el distrito de Teotepeque, municipio de La Libertad Costa."
          },
          {
            "indicator_name": "Fuentes",
            "response": "La noticia no indica las fuentes de información, por lo que no se puede proporcionar la información sobre las mismas."
          },
          {
            "indicator_name": "Temas",
            "response": "**Temas principales tratados en la noticia:**\n\n* **Crimen de asesinato:** La noticia informa sobre el juicio de tres pandilleros por el asesinato de una mujer en Teotepeque, La Libertad Costa.\n* **Audiencia de vista pública:** La audiencia de vista pública se lleva a cabo en el Juzgado Especializado de Sentencia para una Vida Libre de Violencia y Discriminación para Las Mujeres de San Salvador.\n* **Prueba:** La Fiscalía General de la República (FGR) presenta todas las pruebas que cómo fue cometido el crimen.\n* **Implicados:** Los acusados son Rudy Alexander Gamez Sandoval, José Heriberto Orellana Lemus y Anival Torres Cruz.\n* **Lugar del crimen:** El crimen ocurrió en un predio baldío ubicado en el distrito de Teotepeque."
          },
          {
            "indicator_name": "Hechos Violativos",
            "response": "La texto no contiene información sobre la violación a la ley, por lo que no se puede proporcionar la información requesteda."
          },
          {
            "indicator_name": "Hipotesis de los Hechos",
            "response": "**Teoría:**\n\nLa noticia reporta el juicio por asesinato de una mujer en Teotepeque, La Libertad Costa. Los acusados son tres pandilleros, incluyendo a Rudy Alexander Gamez Sandoval, miembro de la pandilla 18, acusado de homicidio agravado.\n\n**Suposición:**\n\nBasándose en la información disponible, la suposición de la noticia es que el asesinato se llevó a cabo por motivos relacionados con la actividad pandillera."
          },
          {
            "indicator_name": "Poblacion Vulnerable",
            "response": "La noticia no indica grupos en riesgo, por lo que no se puede proporcionar la información solicitada."
          },
          {
            "indicator_name": "Tipo de Arma",
            "response": "La texto no indica el tipo de arma que se utilizó en el asesinato, por lo que no se puede proporcionar la información sobre el tipo de arma."
          },
          {
            "indicator_name": "Victimas",
            "response": "La noticia no identifica a la víctima, por lo que no se puede proporcionar la información de su identificación."
          },
          {
            "indicator_name": "Agresor o Sospechoso",
            "response": "El texto indica que el nombre del agresor es **Rudy Alexander Gamez Sandoval**, pero no se menciona el nombre del otro agresor, por lo que no se puede proporcionar la información de nombre del agresor completa."
          }
        ],
        "priority": 1,
        "id": "https://diarioelsalvador.com/criminales-enfrentan-juicio-por-el-asesinato-de-una-mujer-en-teotepeque/494359/"
      }
    }

  ]

  ngOnInit() {
    //this.news = this.moked
    this.filteredOptions = this.searchControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
    this.filteredOptionsDepartments = this.departmentsControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterDepartments(value || ''))
    );
    this.departmentsControl.valueChanges.subscribe((value) => {
      this.currentDepartment = this.departments.find(
        (obj) => obj.name == value
      );
      console.log(this.currentDepartment);
    });
  }
  onSearch(): void {
    if (this.searchControl.value) {
      let current_text = '';
      this.gemmaService.searchData(this.searchControl.value).subscribe(
        (event) => {
          if (event.type === HttpEventType.Response) {
            this.loaderInServices = false;
          } else if (event.type === HttpEventType.DownloadProgress) {
            if (
              event.partialText.includes('data: True') &&
              !this.loaderInServices
            ) {
              this.loaderService.hide();
              this.loaderInServices = true;
            } else {
              let res = event.partialText;
              res = res.substring(current_text.length);
              const obj = JSON.parse(res.substring(res.indexOf('[')));
              current_text = event.partialText;
              this.news = obj;
              console.log('dd', this.news);
            }
          }
        },
        (error) => {
          console.error('Error:', error);
        }
      );
    } else {
      this.results = [];
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  private _filterDepartments(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.departments
      .filter((option) => option.name.toLowerCase().includes(filterValue))
      .map((el) => el.name);
  }
  changeDepartments($event: Event) {
    console.log(this.departmentsControl.value);
  }
}

/*
@Component({
  selector: '../Ficha/ficha.component',
  templateUrl: '../Ficha/ficha.component.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class FichaComponent {

  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(FichaComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}*/
