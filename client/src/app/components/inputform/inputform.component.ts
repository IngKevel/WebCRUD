import { Component, OnInit, HostBinding } from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router'

const CREATE_USER = gql`
mutation ($nombre: String!, $apellido_paterno: String!, $apellido_materno: String!, $direccion: String!, $telefono: String!) {
  createPersona (datos: {
    nombre: $nombre,
    apellido_paterno: $apellido_paterno,
    apellido_materno: $apellido_materno,
    direccion: $direccion,
    telefono: $telefono
  }) {
    id
    nombre
  }
}
`;

@Component({
  selector: 'app-inputform',
  templateUrl: './inputform.component.html',
  styleUrls: ['./inputform.component.css']
})
export class InputformComponent implements OnInit {

  users: any;

  private querySubscription: Subscription;

  @HostBinding('class') clases = 'row';

  constructor(private apollo: Apollo, private router: Router) { }

  ngOnInit(): void {
  }

  createUser(nombre: string, apellido_paterno: string, apellido_materno: string, direccion: string, telefono: string) {
    this.apollo.mutate({
      mutation: CREATE_USER,
      variables: {
        nombre,
        apellido_paterno,
        apellido_materno,
        direccion,
        telefono
      }
    }).subscribe(({ data }) => {
      console.log('Agregado', data);
      this.router.navigate(['/users']);
    },(error) => {
      console.log('Hubo un error', error);
    });
  }

}