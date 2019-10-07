import { Component, OnInit, ViewChild } from '@angular/core';
import { DepartamentoService } from '../../services/departamento.service';
import { Departamento } from '../../commons/models/departamento.model';
import { UtilAlertService } from '../../commons/util/util-alert.service';
import { IonInfiniteScroll, ActionSheetController, ModalController } from '@ionic/angular';
import { ReservationAddPage } from '../reservation/reservation-add/reservation-add.page';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss']
})
export class SearchPage implements OnInit {
  public listaDepartamentos: Array<Departamento> = [];
  private listaTemporal: Array<Departamento> = [];
  public departamentoFilter: Departamento = new Departamento();
  public loading = true;

  public page = 1;
  public pageSize = 5;
  public totalElements = 0;

  @ViewChild(IonInfiniteScroll, { static: false }) infiniteScroll: IonInfiniteScroll;
  constructor(
    private departamentoService: DepartamentoService,
    private alert: UtilAlertService,
    private actionSheetController: ActionSheetController,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.listarDepartamentos();
  }

  /**
   * Listamos la primera página de departamentos
   */
  listarDepartamentos(event?) {
    this.loading = true;
    this.departamentoService
      .listWithSearchAndPagination(this.departamentoFilter, this.page, this.pageSize)
      .subscribe(result => {
        if (!result.error) {
          let listaDepartamentosTmp: Array<Departamento> = [];
          listaDepartamentosTmp = result.resultado.content;
          this.totalElements = result.resultado.totalElements;
          if (this.departamentoFilter.direccion.length > 0) {
            this.listaDepartamentos = [];
          }
          this.agregarDepartamentos(listaDepartamentosTmp);
        } else {
          this.alert.warningSwal(result.mensaje);
        }
        this.loading = false;
        if (event != null) {
          event.target.complete();
        }
      });
  }

  /**
   * Agregamos los departamentos a la lista
   * @param departamentos
   */
  agregarDepartamentos(departamentos: Array<Departamento>) {
    departamentos.forEach(depto => {
      this.listaDepartamentos.push(depto);
      this.listaTemporal.push(depto);
    });
  }

  /**
   * Filtra los departamentos que coincidan con la dirección
   * @param depto
   */
  filtrarDepartamento(depto: string) {
    this.loading = true;
    this.page = 1;
    if (depto.length > 0) {
      this.departamentoFilter = new Departamento({ direccion: depto });
    } else {
      this.departamentoFilter = new Departamento({ direccion: '' });
    }
    this.listarDepartamentos();
  }

  borrarFiltroDepartamento() {
    this.filtrarDepartamento('');
  }

  /**
   * Filtra los departamentos que coincidan con la dirección
   * @param depto
   */
  filtrarDepartamento2(depto: string) {
    if (depto.length == 0) {
      this.listaDepartamentos = this.listaTemporal;
      //this.enableInfiniteScroll();
    } else {
      //this.disableInfiniteScroll();
      let coincidencias: Array<Departamento> = [];
      this.listaTemporal.forEach(element => {
        if (element.direccion.toLowerCase().indexOf(depto.toLowerCase()) != -1) {
          coincidencias.push(element);
        }
      });
      this.listaDepartamentos = coincidencias;
    }
  }

  /**
   * Al llegar abajo agregamos la siguiente página a la lista de departamentos
   * @param event
   */
  loadData(event) {
    if (this.listaDepartamentos.length < this.totalElements) {
      this.page++;
      this.listarDepartamentos();
    } else {
      this.toggleInfiniteScroll();
    }

    setTimeout(() => {
      event.target.complete();
      if (this.listaDepartamentos.length == 1000) {
        event.target.disabled = true;
      }
    }, 1000);
  }

  /**
   * Habilitamos/Desabilitamos es infiniteScroll
   */
  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

  /**
   * Desabilitamos es infiniteScroll
   */
  disableInfiniteScroll() {
    this.infiniteScroll.disabled = true;
  }

  /**
   * Hilitamos es infiniteScroll
   */
  enableInfiniteScroll() {
    this.infiniteScroll.disabled = false;
  }

  /**
   * Ejecutamos una acción dependiendo del boton presionado
   * @param departamento
   */
  async presentActionSheet(departamento: Departamento) {
    const actionSheet = await this.actionSheetController.create({
      // header: '¿Qué desea hacer?',
      buttons: [
        {
          text: 'Reservar',
          icon: 'ios-bookmarks',
          handler: () => {
            console.log('Reservation clicked');

            this.presentModal(departamento);
          }
        },

        {
          text: 'Compartir',
          icon: 'share',
          handler: () => {
            console.log('Share clicked');
          }
        },
        {
          text: 'Añadir a favorito',
          icon: 'heart',
          handler: () => {
            console.log('Favorite clicked');
          }
        },
        {
          text: 'Eliminar de la lista',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            console.log('Delete clicked');
          }
        },
        {
          text: 'Cancelar',
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

  async presentModal(departamento: Departamento) {
    const modal = await this.modalController.create({
      component: ReservationAddPage,
      componentProps: departamento
    });
    return await modal.present();
  }
}
