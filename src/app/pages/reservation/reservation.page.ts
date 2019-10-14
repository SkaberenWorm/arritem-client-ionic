import { Component, OnInit } from '@angular/core';
import { ReservaService } from 'src/app/services/reserva.service';
import { Reserva } from 'src/app/commons/models/reserva.model';
import { AuthenticationService } from 'src/app/commons/services/authentication.service';
import { UtilAlertService } from 'src/app/commons/util/util-alert.service';
import { ActionSheetController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.page.html',
  styleUrls: ['./reservation.page.scss']
})
export class ReservationPage implements OnInit {
  listadoReservas: Array<Reserva> = [];
  constructor(
    private reservaService: ReservaService,
    private authenticationService: AuthenticationService,
    private actionSheetController: ActionSheetController,
    private alert: UtilAlertService,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {
    this.listarReservas();
  }

  listarReservas() {
    this.reservaService
      .misReservas(this.authenticationService.obtenerUserName())
      .subscribe(result => {
        if (!result.error) {
          this.listadoReservas = result.resultado;
        } else {
          this.alert.errorSwal(result.mensaje);
        }
      });
  }

  async presentActionSheet(reserva: Reserva) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones',
      buttons: [
        {
          text: 'Eliminar de la lista',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.presentLoadingWithOptions('Eliminando de la lista...');
            console.log('Eliminar');
            reserva.activo = false;
            this.reservaService.guardar(reserva).subscribe(result => {
              if (!result.error) {
                console.log(result.resultado);
                this.listarReservas();
              } else {
                console.log(result);
              }
              this.cerrarLoadingReserva();
            });
          }
        },
        {
          text: 'Detalle',
          icon: 'md-apps',
          handler: () => {
            console.log('Detalle');
          }
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    await actionSheet.present();
  }

  /**
   * Muestra un popups mientras se carga la reserva
   */
  async presentLoadingWithOptions(mensaje: string) {
    const loading = await this.loadingController.create({
      spinner: 'circles',
      message: mensaje,
      translucent: false,
      cssClass: 'custom-class custom-loading'
    });
    await loading.present();
  }

  /**
   * Cierra la animación de 'Reservando'
   */
  cerrarLoadingReserva() {
    this.loadingController.dismiss({
      dismissed: true
    });
  }
}
