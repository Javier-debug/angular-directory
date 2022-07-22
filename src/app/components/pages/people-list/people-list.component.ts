import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Person } from 'src/app/shared/interface/data.interface';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.scss']
})
export class PeopleListComponent implements OnInit {


  condition: string = ''
  people$ = this.dataSvc.people$;
  people: Person[] = []
  title: string = ""
  button: string = ""
  tempPeople: Person[] = []

  persona: Person = {
    id: 0,
    nombre: '',
    apellidoP: '',
    apellidoM: '',
    direccion: '',
    telefono: ''
  }

  constructor(private dataSvc: DataService, private changeDetectorRefs: ChangeDetectorRef) {
   }

  ngOnInit(): void {
    this.dataSvc.people$.subscribe(
      (response: Person[]) => {
        this.people = []
        this.people.push(...response);
      }
    )
  }

  filterPeople(condition: string){
    this.dataSvc.people$.subscribe(
      (response: Person[]) => {
        this.tempPeople = []
        this.tempPeople.push(...response);
      }
    )
    this.people = [];
    if (condition == '') {
      this.refreshTable();
    }
    this.tempPeople.forEach(person => {
      if(person.nombre.toLowerCase().includes(condition) || person.apellidoP.toLowerCase().includes(condition) || person.apellidoM.toLowerCase().includes(condition)) {
        this.people.push(person)
      }
    });
    return true;
  }

  displayedColumns: string[] = ['id', 'nombre', 'apellidoP', 'apellidoM', 'direccion', 'telefono', 'update', 'delete'];
  
  isShowing: boolean = false;

   editPerson(element: Person): void {
    this.persona = element;
    this.title = "Editar persona"
    this.button = "Actualizar"
    this.showForm();
   }

  showForm(){
    this.isShowing = !this.isShowing;
    this.refreshTable();
  }

  refreshTable() {
    this.dataSvc.getDataAPI();
    this.dataSvc.people$.subscribe(
      (response: Person[]) => {
        this.people = []
        this.people.push(...response);
      }
    )
    this.changeDetectorRefs.detectChanges();
  }

  deletePerson(id: number, name: string): void {
    this.dataSvc.deletePersonData(id);
    alert("Se elimino a " + name);
    this.refreshTable();
  }

  addPerson(): void {
    this.title = "Agregar persona"
    this.button = "Guardar"
    this.showForm();
    //this.refreshTable();
   }
}
