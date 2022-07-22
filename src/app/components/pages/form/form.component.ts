import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { Person } from 'src/app/shared/interface/data.interface';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @Output("showForm") showForm: EventEmitter<any> = new EventEmitter();
  
  @Input() title: String = "";
  @Input() button: String = "";
  @Input() persona: Person = {
    id: 0,
    nombre: '',
    apellidoM: '',
    apellidoP: '',
    direccion: '',
    telefono: ''
  };

  nombreFormControl = new FormControl('', [Validators.required]);
  apellidoPFormControl = new FormControl('', [Validators.required]);
  apellidoMFormControl = new FormControl('', [Validators.required]);
  direccionFormControl = new FormControl('', [Validators.required]);
  telefonoFormControl = new FormControl('', [Validators.required]);

  matcher = new MyErrorStateMatcher();

  constructor(private dataScv: DataService) { }

  ngOnInit(): void {
    if(this.persona.id != 0) {
      this.nombreFormControl.setValue(this.persona.nombre);
      this.apellidoPFormControl.setValue(this.persona.apellidoP);
      this.apellidoMFormControl.setValue(this.persona.apellidoM);
      this.direccionFormControl.setValue(this.persona.direccion);
      this.telefonoFormControl.setValue(this.persona.telefono);
    }
  }

  onCloseForm() {
    this.showForm.emit();
  }

  onSubmit(): void {
    if(this.persona.id === 0) {
      if(this.telefonoFormControl.hasError('required') || this.nombreFormControl.hasError('required') || this.apellidoPFormControl.hasError('required') || this.apellidoMFormControl.hasError('required') || this.direccionFormControl.hasError('required')) {
        
      }
      else {
        this.persona = {
          id: 0,
          nombre: this.nombreFormControl.value,
          apellidoM: this.apellidoMFormControl.value,
          apellidoP: this.apellidoPFormControl.value,
          direccion: this.direccionFormControl.value,
          telefono: this.telefonoFormControl.value
        }

      }
      this.dataScv.addPersonData(this.persona);
      this.onCloseForm();
    }
    else {
      if(this.telefonoFormControl.hasError('required') || this.nombreFormControl.hasError('required') || this.apellidoPFormControl.hasError('required') || this.apellidoMFormControl.hasError('required') || this.direccionFormControl.hasError('required')) {
        
      }
      else {
        this.persona = {
          id: this.persona.id,
          nombre: this.nombreFormControl.value,
          apellidoM: this.apellidoMFormControl.value,
          apellidoP: this.apellidoPFormControl.value,
          direccion: this.direccionFormControl.value,
          telefono: this.telefonoFormControl.value
        }

      }
      this.dataScv.updatePersonData(this.persona);
      
      this.onCloseForm();
    }
  }
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
