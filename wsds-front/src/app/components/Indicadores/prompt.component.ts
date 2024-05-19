import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import {IndicatorService} from '../../services/indicator.service'
import { HttpEventType } from '@angular/common/http';
import { v4 as uuidv4 } from 'uuid';




let indicatorEntryList: IndicatorEntry[] = [];
let indicatorEntry: IndicatorEntry = {
  indicators: [],
  name: '',
  id: ''
};

@Component({
  selector: 'app-news-details',
  templateUrl: './form-newPrompt-content-dialog.html',
  styleUrls: ['./new-form.component.css'],
})
export class NewIndicadorComponent  {

  NewIndicadorForm: FormGroup;

  constructor(private formBuilder: FormBuilder,private DBService: IndicatorService) {
    this.NewIndicadorForm = this.formBuilder.group({
      indicator_name:  [''],
      description: ['']
    });
  }

  createNewPrompt() {
    console.log("click crear")
    const newIndicator:Indicator = {
      indicator_name: this.NewIndicadorForm.value.indicator_name,
      prompt: this.NewIndicadorForm.value.description,
      id: uuidv4()  // Generar ID único
    };

    indicatorEntry.indicators.push(newIndicator);
    console.log("id: ", indicatorEntry.id)
    console.log("new:", newIndicator.id)
      this.DBService.updateEntry(indicatorEntry.id, indicatorEntry).subscribe(
        response => {
          console.log('Entry updated successfully in backend', response);

        },
        error => {
          console.error('Error updating entry in backend', error);
        }
      );

  }

}


@Component({
  selector: 'app-indicadores',
  templateUrl: './prompt-form.html',
  styleUrls: ['./prompt-form.component.css']
})
export class IndicadoresComponent implements OnInit {
  indicadoresForm: FormGroup;
  indicadores: Indicator[] = [];
  //indicadores: any;
  disableEdit: boolean = true;
  loaderInServices = false;
  //current_text: any;
  //responseArray: any [] = [];

  constructor(private DBService: IndicatorService, private fb: FormBuilder, private dialog: MatDialog) {
    this.indicadoresForm = this.fb.group({});
  }

  ngOnInit(): void {

    this.loadPrompts();

    this.indicadores.forEach((ind: { toString: () => any; prompt: any; }) => {
      this.indicadoresForm.addControl(ind.toString(), this.fb.control({value: ind.prompt, disabled: this.disableEdit}));
    });

  }
  openDialog() {
    const dialogRef = this.dialog.open(NewIndicadorComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
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
})
export class TabComponent implements OnInit {
  indicatorEntry: any[] = [];
  loaderInServices = false;
  indicatorEntryForm: FormGroup;
  disableEdit: boolean = true;
  selectedTabId: string | null = null;


  constructor(private DBService: IndicatorService, private fb: FormBuilder) {
    this.indicatorEntryForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.loadPrompts();
  }

  toggleFormEdit() {
    this.disableEdit = !this.disableEdit;
    Object.keys(this.indicatorEntryForm.controls).forEach(entryId => {
      const entryGroup = this.indicatorEntryForm.get(entryId) as FormGroup;
      if (entryGroup) {
        Object.keys(entryGroup.controls).forEach(indicatorId => {
          const control = entryGroup.get(indicatorId);
          if (control) {
            this.disableEdit ? control.disable() : control.enable();
          }
        });
      }
    });
  }


  loadPrompts(): void {
    this.DBService.getAllPromptEntryData().subscribe(
      event => {
        if (event.type === HttpEventType.Response) {
          this.loaderInServices = false;
          let response;
          if (typeof event.body === 'string') {
            response = JSON.parse(event.body);
          } else {
            response = event.body;
          }

          if (Array.isArray(response)) {
            this.indicatorEntry = response;
            console.log('Prompts entry:', this.indicatorEntry);
            this.indicatorEntry.forEach(entry => {
              const entryGroup = this.fb.group({});
              entry.indicators.forEach((indicator: { id: string; prompt: any; }) => {
                entryGroup.addControl(
                  indicator.id, this.fb.control({ value: indicator.prompt, disabled: this.disableEdit })
                );
              });
              this.indicatorEntryForm.addControl(entry.id, entryGroup);
            });
          }
        }
      },
      error => {
        console.error('Error al obtener los prompts:', error);
      }
    );
  }


  onTabChange(event: any) {

    indicatorEntry.id = this.indicatorEntry[event.index].id;
    indicatorEntry.name = this.indicatorEntry[event.index].name;
    indicatorEntry.indicators = this.indicatorEntry[event.index].indicators;

    console.log("id tab: ", indicatorEntry.id)

  }

  /*addIndicator(Id: string, newIndicatorEntry: Indicator) {
    const entryId = Id;
    const newIndicator = newIndicatorEntry;

    console.log("newIndicatorEntry: ",newIndicator )

    const entry = this.indicatorEntry.find(e => e.id === entryId);

    if (entry) {
      entry.indicators.push(newIndicator);

      // Llamar al servicio para actualizar el backend
      this.DBService.updateEntry(entryId, entry).subscribe(
        response => {
          console.log('Entry updated successfully in backend', response);

          // Actualizar el formulario después de la actualización en el backend
          const entryGroup = this.indicatorEntryForm.get(entryId) as FormGroup;
          if (entryGroup) {
            entryGroup.addControl(
              newIndicator.id.toString(), this.fb.control({ value: newIndicator.prompt, disabled: this.disableEdit })
            );
          }
        },
        error => {
          console.error('Error updating entry in backend', error);
        }
      );
    }
  }
*/

}
