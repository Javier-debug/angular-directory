import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { take, tap, pluck, withLatestFrom, mergeMap, find} from 'rxjs/operators';
import { APIResponse, Person } from '../interface/data.interface';

const getPersonasQuery = gql `
{
  getPersonas {
    id,
    nombre,
    apellidoP,
    apellidoM,
    direccion,
    telefono
  }
}
`;

let tempersonArray: Person[] = [];

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private peopleSubject = new BehaviorSubject<Person[]>([]);
  people$ = this.peopleSubject.asObservable();

  constructor(private apollo: Apollo) {
    this.getDataAPI();
  }

  public getDataAPI(): void {
    this.apollo.watchQuery<APIResponse<Person[]>>({
      query: getPersonasQuery,
      fetchPolicy: 'no-cache'
    }).valueChanges.pipe(
      take(1),
      tap(({data}) => {
        //tempersonArray.push(data);
        this.peopleSubject.next(data.getPersonas);
      })
    ).subscribe();
  }

  public addPersonData(persona: Person): void {
    let addPersonaQuery = gql `
    mutation{
      createPersona(nombre: "${persona.nombre}", apellidoP: "${persona.apellidoP}", apellidoM: "${persona.apellidoM}", direccion: "${persona.direccion}", telefono: "${persona.telefono}") {
          id,
          nombre,
          apellidoP,
          apellidoM,
          direccion,
          telefono
      }
  }
    `;
    this.apollo.mutate<APIResponse<Person[]>>({
      mutation: addPersonaQuery
    }).pipe(
      take(1),
      tap(({data}) => {
        //tempersonArray.push(data);
      })
    ).subscribe()
  }

  public updatePersonData(persona: Person): void {
    let updatePersonaQuery = gql `
    mutation{
      updatePersona(id: ${persona.id}, nombre: "${persona.nombre}", apellidoP: "${persona.apellidoP}", apellidoM: "${persona.apellidoM}", direccion: "${persona.direccion}", telefono: "${persona.telefono}"){
        id,
        nombre,
        apellidoP,
        apellidoM,
        direccion,
        telefono
    }
    }
    `;
    this.apollo.mutate<APIResponse<Person>>({
      mutation: updatePersonaQuery
    }).pipe(
      take(1),
      tap(({data}) => {
        //tempersonArray.push(data);
      })
    ).subscribe()
  }

  public deletePersonData(id: Number): void {
    let deletePersonaQuery = gql `
    mutation{
      deletePersona(id: ${id})
    }
    `;
    this.apollo.mutate<APIResponse<Person>>({
      mutation: deletePersonaQuery
    }).pipe(
      take(1),
      tap(({data}) => {
        //tempersonArray.push(data);
      })
    ).subscribe()
  }
}