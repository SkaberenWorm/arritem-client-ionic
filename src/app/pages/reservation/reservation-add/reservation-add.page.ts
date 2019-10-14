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
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Util } from 'src/app/commons/util/util';
import * as moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservation-add',
  templateUrl: './reservation-add.page.html',
  styleUrls: ['./reservation-add.page.scss']
})
export class ReservationAddPage implements OnInit {
  customPickerOptions: any;
  public paso = 1;
  public departamento: Departamento;
  public reserva: Reserva = new Reserva();
  public formulario: FormGroup;
  public cantidadDias = 0;
  public slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  public slideOpts2 = {
    initialSlide: 0,
    speed: 400,
    spaceBetween: 10
  };

  constructor(
    private navParams: NavParams,
    private modalController: ModalController,
    private loadingController: LoadingController,
    private clienteService: ClienteService,
    private authenticationService: AuthenticationService,
    private alert: UtilAlertService,
    private reservaService: ReservaService,
    private toastController: ToastController,
    private router: Router
  ) {}

  ngOnInit() {
    this.reserva.departamento = this.departamento = new Departamento({
      id: this.navParams.get('id'),
      direccion: this.navParams.get('direccion'),
      tarifa: this.navParams.get('tarifa'),
      estado: this.navParams.get('estado')
    });

    this.formulario = new FormGroup({
      fechaInicio: new FormControl('', [Validators.required]),
      fechaTermino: new FormControl('', [Validators.required])
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
    this.calcularDiasAndCosto();
    console.log(event);
  }

  /**
   * Guarda la reserva en la base de datos
   */
  reservar() {
    console.log('reservando');
    console.log(this.formulario);
    Util.setFormForValidate(this.formulario);

    if (this.formulario.valid) {
      this.calcularDiasAndCosto();
      this.presentLoadingWithOptions();
      this.reservaService.guardar(this.reserva).subscribe(result => {
        if (!result.error) {
          this.presentAlert(result);
          this.router.navigate(['/tabs/reservation']);
          this.dismiss();
        } else {
          this.presentAlert(result);
        }
        console.log(result);
        this.cerrarLoadingReserva();
      });
    } else {
      console.log('Formulario inválido');
    }
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

  /**
   * Continua con el siguiente paso de la reserva
   */
  next() {
    if (this.paso <= 2) {
      this.paso++;
    }
  }

  /**
   * Retrocede 1 paso de la reserva y si esta en la primera pagina se sale de la reserva
   */
  previous() {
    if (this.paso == 1) {
      this.dismiss();
    } else if (this.paso >= 2) {
      this.paso--;
    }
  }

  calcularDiasAndCosto() {
    if (
      this.formulario.controls.fechaInicio.value != '' &&
      this.formulario.controls.fechaTermino.value != ''
    ) {
      let fechaInicio = moment(this.formulario.controls.fechaInicio.value);
      let fechaTermino = moment(this.formulario.controls.fechaTermino.value);
      this.reserva.fechaHoraInicio = fechaInicio.toDate();
      this.reserva.fechaHoraTermino = fechaTermino.toDate();
      let dias = fechaTermino.diff(fechaInicio, 'days') + 1;
      console.log(fechaInicio, fechaTermino, dias);
      this.reserva.total = this.reserva.departamento.tarifa * dias;
      this.cantidadDias = dias;
    }
  }
}
