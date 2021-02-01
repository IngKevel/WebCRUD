import { Component, OnInit, OnDestroy } from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import { Subscription } from 'rxjs';

const GET_USER = gql`
{
  personas {
    id
    nombre
    apellido_paterno
    apellido_materno
    direccion
    telefono
  }
}
`;

const GET_SEARCH = gql `
query ($nombre: String!, $apellido_paterno: String!, $apellido_materno: String!){
  getPersona(nombre: $nombre, apellido_paterno: $apellido_paterno, apellido_materno: $apellido_materno){
    nombre
    apellido_paterno
    apellido_materno
    direccion
    telefono
  }
}
`;

const DELETE_USER = gql`
  mutation ($id: Int!) {
    deletePersona(id: $id)
  }
`;

const UPDATE_USER = gql`
mutation ($id: Int!, $nombre: String!, $apellido_paterno: String!, $apellido_materno: String!, $direccion: String!, $telefono: String!) {
  updatePersona (id: $id, fields: {
    nombre: $nombre,
    apellido_paterno: $apellido_paterno,
    apellido_materno: $apellido_materno,
    direccion: $direccion,
    telefono: $telefono
  })
}
`;


@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.css']
})
export class PeopleListComponent implements OnInit, OnDestroy {

  users: any;

  idUpdate: number;

  private querySubscription: Subscription;

  constructor(private apollo: Apollo) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(){
    this.querySubscription = this.apollo.watchQuery<any>({
      query: GET_USER,
      pollInterval: 500
    })
      .valueChanges
      .subscribe(({ data }) => {
        this.users = data.personas;
      });
  }

  getSearch(datoN: string, datoAP: string, datoAM: string){
    this.querySubscription = this.apollo.watchQuery({
      query: GET_SEARCH,
      variables:{
        nombre: datoN,
        apellido_paterno: datoAP,
        apellido_materno: datoAM
      }
    })
      .valueChanges
      .subscribe(({ data }) => {
        this.users = Object.values(data);
        this.users = Object.values(this.users[0]);
      });
    (<HTMLInputElement>document.getElementById("buttonClean")).style.display = 'block';
  }

  cleanSearch(){
    this.getUsers();
    (<HTMLInputElement>document.getElementById("buttonClean")).style.display = 'none';
    (<HTMLInputElement>document.getElementById("dato")).value = "";
  }

  deleteUser(id: number) {
    this.apollo.mutate({
      mutation: DELETE_USER,
      variables: {
        id
      }
    }).subscribe(({ data }) => {
      console.log('Borrado', data);
    }, (error) => {
      console.log('Hubo un error', error);
    });
  }

  updateUser(id: number, nombre: string, apellido_paterno: string, apellido_materno: string, direccion: string, telefono: string){
    this.idUpdate = id;
    (<HTMLInputElement>document.getElementById("nombre")).value = nombre;
    (<HTMLInputElement>document.getElementById("apellido_paterno")).value = apellido_paterno;
    (<HTMLInputElement>document.getElementById("apellido_materno")).value = apellido_materno;
    (<HTMLInputElement>document.getElementById("direccion")).value = direccion;
    (<HTMLInputElement>document.getElementById("telefono")).value = telefono;
    (<HTMLInputElement>document.getElementById("formulario")).style.display = 'block';
  }

  saveUpdate(nombre: string, apellido_paterno: string, apellido_materno: string, direccion: string, telefono: string){
    this.apollo.mutate({
      mutation: UPDATE_USER,
      variables: {
        id: this.idUpdate,
        nombre,
        apellido_paterno,
        apellido_materno,
        direccion,
        telefono
      }
    }).subscribe(({ data }) => {
      console.log('Actualizado', data);
    }, (error) => {
      console.log('Hubo un error', error);
    });
    (<HTMLInputElement>document.getElementById("formulario")).style.display = 'none';
  }

  closeUpdate(){
    (<HTMLInputElement>document.getElementById("formulario")).style.display = 'none';
  }

  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }
}