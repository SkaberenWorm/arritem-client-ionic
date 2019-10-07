import { Component, OnInit, Input } from '@angular/core';
import {
  ModalController,
  NavParams,
  LoadingController,
  AlertController,
  ToastController
} from '@ionic/angular';
import { Departamento } from 'src/app/commons/models/departamento.model';
import { ClienteService } from 'src/app/services/cliente.service';
import { Reserva } from 'src/app/commons/models/reserva.model';
import { AuthenticationService } from 'src/app/commons/services/authentication.service';
import { UtilAlertService } from 'src/app/commons/util/util-alert.service';
import { ReservaService } from 'src/app/services/reserva.service';
import { ResultadoProc } from 'src/app/commons/interfaces/resultado-proc.interface';

@Component({
  selector: 'app-reservation-add',
  templateUrl: './reservation-add.page.html',
  styleUrls: ['./reservation-add.page.scss']
})
export class ReservationAddPage implements OnInit {
  customPickerOptions: any;
  public departamento: Departamento;
  public reserva: Reserva = new Reserva();
  constructor(
    private navParams: NavParams,
    private modalController: ModalController,
    private loadingController: LoadingController,
    private clienteService: ClienteService,
    private authenticationService: AuthenticationService,
    private alert: UtilAlertService,
    private reservaService: ReservaService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.reserva.departamento = this.departamento = new Departamento({
      id: this.navParams.get('id'),
      direccion: this.navParams.get('direccion')
    });
    this.clienteService
      .getByUserOrEmail(this.authenticationService.obtenerUserName())
      .subscribe(result => {
        if (!result.error) {
          this.reserva.cliente = result.resultado;
        } else {
          this.alert.errorSwal(result.mensaje);
        }
      });
  }

  /**
   * Cierra esta ventana
   */
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      dismissed: true
    });
  }

  /**
   * Cierra la animación de 'Reservando'
   */
  cerrarLoadingReserva() {
    this.loadingController.dismiss({
      dismissed: true
    });
  }

  validarFecha(event: any) {
    console.log(event);
  }

  /**
   * Guarda la reserva en la base de datos
   */
  reservar() {
    console.log('reservando');
    this.presentLoadingWithOptions();
    this.reservaService.guardar(this.reserva).subscribe(result => {
      if (!result.error) {
        this.presentAlert(result);
      } else {
        this.presentAlert(result);
      }
      this.cerrarLoadingReserva();
    });
  }

  async presentAlert(resut: ResultadoProc<Reserva>) {
    if (!resut.error) {
      const toast = await this.toastController.create({
        header: 'Hecho!!',
        translucent: false,
        message: resut.mensaje,
        position: 'top',
        animated: true,
        color: 'success',
        buttons: [
          {
            icon: 'md-close',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]
      });
      toast.present();
    } else {
      const toast = await this.toastController.create({
        header: 'Error!!',
        translucent: false,
        message: resut.mensaje,
        position: 'top',
        animated: true,
        color: 'danger',
        buttons: [
          {
            icon: 'md-close',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]
      });
      toast.present();
    }
  }

  closeToast() {
    this.toastController.dismiss({
      dismissed: true
    });
  }

  /**
   * Muestra un popups mientras se carga la reserva
   */
  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      spinner: 'circles',
      message: 'Reservando...',
      translucent: false,
      cssClass: 'custom-class custom-loading'
    });
    await loading.present();
  }
}
