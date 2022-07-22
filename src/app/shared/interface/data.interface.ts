export interface APIResponse<T>{
  getPersonas: T;
}

export interface Person{
  id: number;
  nombre: string;
  apellidoP: string;
  apellidoM: string;
  direccion: string;
  telefono: string;
}