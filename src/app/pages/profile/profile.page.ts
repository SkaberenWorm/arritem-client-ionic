import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/commons/services/authentication.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { UtilAlertService } from 'src/app/commons/util/util-alert.service';
import { Cliente } from 'src/app/commons/models/cliente.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss']
})
export class ProfilePage implements OnInit {
  public cliente: Cliente = new Cliente();

  constructor(
    private menu: MenuController,
    private authenticationService: AuthenticationService,
    private alert: UtilAlertService,
    private clienteService: ClienteService
  ) {}

  ngOnInit() {
    this.obtenerCliente();
  }

  obtenerCliente() {
    this.clienteService
      .getByUser(this.authenticationService.obtenerUserName())
      .subscribe(result => {
        if (!result.error) {
          this.cliente = result.resultado;
          console.clear();
          console.table(this.cliente);
        } else {
          this.alert.errorSwal(result.mensaje);
        }
      });
  }

  openEnd() {
    this.menu.open('end');
  }
}
