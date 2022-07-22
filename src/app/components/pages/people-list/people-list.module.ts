import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeopleListComponent } from './people-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormModule } from '../form/form.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PeopleListComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    FormModule,
    FormsModule
  ], exports: [PeopleListComponent]
})
export class PeopleListModule { }
