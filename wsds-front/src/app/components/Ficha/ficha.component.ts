import {Component, Input, OnInit } from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { FormBuilder, FormGroup } from '@angular/forms';

/**
 * @title Dialog with header, scrollable content and actions
 */
@Component({
  selector: 'dialog-content',
  templateUrl: './dialog-content.html',
  standalone: true,
  imports: [MatButtonModule, MatCardModule,MatDialogModule],
})
export class DialogContentFicha {
  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(FichaContentDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}


@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: './ficha-content-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatCardModule],
})
export class FichaContentDialog {}

@Component({
  selector: 'app-button-report',
  templateUrl: './buttonReport.html',
  //styleUrls: ['./button.component.css']
})
export class ButtonReportComponent {
  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(NewsDetailsComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  selector: 'app-news-details',
  templateUrl: './ficha-form.componet.html',
  styleUrls: ['./ficha-form.component.css']
})
export class NewsDetailsComponent implements OnInit {
  fichaForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    // Define los campos del formulario y su estado inicial
    this.fichaForm = this.fb.group({
      description: [{ value: 'La noticia describe un homicidio, ya que contiene las palabras clave \"homicidio\" y \"feminicidio\".', disabled: true }],
      classification: [{ value: 'Homicidio', disabled: true }],
      title:  [{ value: 'Detienen a sujeto por golpear e intentar matar a su pareja con un cuchillo', disabled: true }],
      summary:  [{ value: 'La policía detuvo a un hombre por presuntamente intentar asesinar a su compañera de vida con un cuchillo.', disabled: true }],
      location_of_incident:  [{ value: 'No se especifica en la noticia.', disabled: true }],
      sources: [{ value: 'No se indican en la noticia.', disabled: true }],
      themes:  [{ value: 'Violencia contra las mujeres, feminicidio', disabled: true }],
      violative_facts:  [{ value: 'El hombre golpeó a su mujer y posteriormente intento asesinarla con un cuchillo.', disabled: true }],
      hypothesis_of_facts:  [{ value: 'No se especifica en la noticia.', disabled: true }],
      vulnerable_population:  [{ value: 'No se especifica en la noticia.', disabled: true }],
      type_of_weapon: [{ value: 'Cuchillo', disabled: true }],
      victims:  [{ value: 'La víctima no se identifica en la noticia.', disabled: true }],
      perpetrator_or_suspected_aggressor:  [{ value: 'El hombre que perpetró el homicidio no se identifica en la noticia', disabled: true }],
    });
  }

  toggleFormEdit() {
    if (this.fichaForm.enabled) {
      this.fichaForm.disable();
    } else {
      this.fichaForm.enable();
    }
  }
}
