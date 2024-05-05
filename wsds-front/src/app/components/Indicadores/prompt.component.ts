import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

interface Indicador {
  indicator_name: string;
  prompt: string;
  id: number;
}

@Component({
  selector: 'app-indicadores',
  templateUrl: './prompt-form.html',
  styleUrls: ['./prompt-form.component.css']
})
export class IndicadoresComponent implements OnInit {
  indicadoresForm: FormGroup;
  indicadores: Indicador[] = [];

  constructor(private fb: FormBuilder) {
    this.indicadoresForm = this.fb.group({});
  }
  disableEdit: boolean = true;

  ngOnInit(): void {
    // Simulación de la obtención del JSON de indicadores desde algún servicio
    const jsonIndicadores: Indicador[] = [
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


    ];

    // Asignar el JSON de indicadores y crear FormControl para cada uno
    this.indicadores = jsonIndicadores;
    this.indicadores.forEach(indicador => {
      this.indicadoresForm.addControl(indicador.id.toString(), this.fb.control({value: indicador.prompt, disabled: this.disableEdit}));
    });
  }

  // Método para habilitar/deshabilitar la edición del formulario

  toggleFormEdit() {
    this.indicadoresForm.enabled ? this.indicadoresForm.disable() : this.indicadoresForm.enable();
  }
}
