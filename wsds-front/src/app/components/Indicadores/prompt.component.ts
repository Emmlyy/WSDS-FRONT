import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import {DBService} from '../../services/api.dbmongo.service'
import { HttpEventType } from '@angular/common/http';

interface Indicador {
  indicator_name: string;
  prompt: string;
  id: number;
}

@Component({
  selector: 'app-button-new-promtp',
  templateUrl: './button-newDialog-prompt.html',
  //styleUrls: ['./button.component.css']
})
export class ButtonNewPromptComponent {
  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(NewIndicadorComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  selector: 'app-news-details',
  templateUrl: './form-newPrompt-content-dialog.html',
  styleUrls: ['./new-form.component.css'],
})
export class NewIndicadorComponent  {

  NewIndicadorForm!: FormGroup;
  apiService: any;

  /*constructor(private fb: FormBuilder) {}


  ngOnInit(): void {
    // Define los campos del formulario y su estado inicial
    this.NewIndicadoresForm = this.fb.group({
      indicador_name: [{value:'prueba nombre',disabled: false,},],
      description: [{value:'',disabled: false,},]
    });
  }*/

  constructor(private DBService: DBService, private formBuilder: FormBuilder) {
    this.NewIndicadorForm = this.formBuilder.group({
      indicator_name:  [''],
      description: ['']
    });
  }

  createNewPrompt(){

    const newIndicator = {
      "indicator_name": this.NewIndicadorForm.value.indicator_name,
      "prompt": this.NewIndicadorForm.value.description
    };

      if (this.NewIndicadorForm.valid) {
        this.DBService.createIndicator(newIndicator).subscribe(
          response => {
            console.log('Prompt creado con éxito:', response);
            // Aquí podrías resetear el formulario o realizar otras acciones después de la creación exitosa
          },
          error => {
            console.error('Error al crear el prompt:', error);
          }
        );
      }
  }
}


@Component({
  selector: 'app-indicadores',
  templateUrl: './prompt-form.html',
  styleUrls: ['./prompt-form.component.css']
})
export class IndicadoresComponent implements OnInit {
  indicadoresForm: FormGroup;
  indicadores: Indicador[] = [];
  //indicadores: any;
  disableEdit: boolean = true;
  loaderInServices = false;
  current_text: any;
  responseArray: any [] = [];

  constructor(private DBService: DBService, private fb: FormBuilder) {
    this.indicadoresForm = this.fb.group({});
  }

  ngOnInit(): void {
    // Simulación de la obtención del JSON de indicadores desde algún servicio
    /*const jsonIndicadores: Indicador[] = [
        {
          "indicator_name": "Clasificación",
          "prompt": "Clasifica el tipo de incidente reportado",
          "id": 2,
        },
        {
          "indicator_name": "Título",
          "prompt": "Extrae el título de la noticia",
          "id": 3,
        },
        {
          "indicator_name": "Resumen",
          "prompt": "Proporciona un breve resumen de la noticia",
          "id": 4,
        },
        {
          "indicator_name": "Lugar de los Hechos",
          "prompt": "Dónde ocurrió el suceso",
          "id": 5,
        },
        {
          "indicator_name": "Fuentes",
          "prompt": "Cita las fuentes de información",
          "id": 6,
        },
        {
          "indicator_name": "Temas",
          "prompt": "Los temas principales tratados",
          "id": 7,
        },
        {
          "indicator_name": "Hechos Violatorios",
          "prompt": "Detalles específicos sobre la violación a la ley",
          "id": 8,
        },
        {
          "indicator_name": "Hipótesis de Hechos",
          "prompt": "Cualquier teoría o suposición presentada",
          "id": 9,
        },
        {
          "indicator_name": "Población Vulnerable",
          "prompt": "Grupos en riesgo mencionados",
          "id": 10,
        },
        {
          "indicator_name": "Tipo de Arma",
          "prompt": "Especifica el tipo de arma, si se menciona",
          "id": 11,
        },
        {
          "indicator_name": "Víctimas",
          "prompt": "Identifica a las víctimas, si es posible",
          "id": 12,
        },
        {
          "indicator_name": "Victimario o Presunto Agresor",
          "prompt": "Nombre del agresor, si se menciona",
          "id": 13,
        }


    ];*/

    // Asignar el JSON de indicadores y crear FormControl para cada uno
    //this.indicadores = jsonIndicadores;
    this.loadPrompts();

    this.indicadores.forEach((ind: { toString: () => any; prompt: any; }) => {
      this.indicadoresForm.addControl(ind.toString(), this.fb.control({value: ind.prompt, disabled: this.disableEdit}));
    });

  }

  // Método para habilitar/deshabilitar la edición del formulario

  toggleFormEdit() {
    this.indicadoresForm.enabled ? this.indicadoresForm.disable() : this.indicadoresForm.enable();
  }

  loadPrompts():void {

    this.DBService.searchAllPromptData().subscribe(
      event => {
        if (event.type === HttpEventType.Response) {
          this.loaderInServices = false;
          let response;
          if(typeof event.body === 'string'){
             response = JSON.parse(event.body);
          }else{
            response = event.body;
          }
          if(Array.isArray(response)){
            this.indicadores = response;
            console.log('Prompts imprimir:', this.indicadores);
            this.indicadores.forEach((ind:any)=>{
              const Cname = ind.id.toString();
              this.indicadoresForm.addControl(
                Cname, this.fb.control({value: ind.prompt, disabled: this.disableEdit  }));
            })
          }

          console.log(typeof this.indicadores);
        } else if (event.type === HttpEventType.DownloadProgress) {
          // let res = event.partialText;
          // res = res.substring(this.current_text.length);
          // const obj = JSON.parse(res.substring(res.indexOf('[')));
          // this.current_text = event.partialText;
          // this.indicadores = obj;
          // console.log('Datos progresivos:', this.indicadores);
        }
      },
      error => {
        console.error('Error al obtener los prompts:', error);
      }
    );
  }

}


@Component({
  selector: 'tab-entryPrompt',
  templateUrl: './tab-prompt.html',
  //styleUrls: ['./prompt-form.component.css']
})
export class TabComponent{

}
