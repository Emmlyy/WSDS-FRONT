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




}

