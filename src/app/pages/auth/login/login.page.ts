import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UtilValidation } from 'src/app/commons/util/util.validation';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/commons/services/authentication.service';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  test: Date = new Date();
  private nativeElement: Node;
  public formLogin: FormGroup;
  private subscriptionStore: Subscription;

  constructor(
    private element: ElementRef,
    private loginService: LoginService,
    private utilValidation: UtilValidation,
    private router: Router,
    private authenticationService: AuthenticationService //private store: Store<AppState>
  ) {
    this.nativeElement = element.nativeElement;
  }

  ngOnInit() {
    this.validarRol();

    this.formLogin = new FormGroup({
      usuario: new FormControl('', [Validators.required]),
      clave: new FormControl('', Validators.required)
    });
  }

  validarRol() {
    if (this.authenticationService.esRol('Administrador')) {
      this.authenticationService.logout();
      Swal.fire({
        title: 'Error',
        text: 'Plataforma solo para clientes',
        type: 'error'
      });
    } else if (this.authenticationService.esRol('Funcionario')) {
      this.authenticationService.logout();
      Swal.fire({
        title: 'Error',
        text: 'Plataforma solo para clientes',
        type: 'error'
      });
    } else if (this.authenticationService.esRol('Cliente')) {
      this.router.navigate(['/tabs']);
    } else {
      this.authenticationService.logout();
    }
  }

  ngOnDestroy() {
    if (this.subscriptionStore != null) {
      this.subscriptionStore.unsubscribe();
    }

    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('login-page');
    body.classList.remove('off-canvas-sidebar');
  }

  login() {
    this.utilValidation.setFormForValidate(this.formLogin);
    if (this.formLogin.valid) {
      const usuario = this.formLogin.controls.usuario.value;
      const clave = this.formLogin.controls.clave.value;
      const tipo = '';

      const identificacion = {
        usuario: usuario,
        clave: clave,
        tipo: tipo
      };

      this.loginService
        .login(identificacion.usuario, identificacion.clave, identificacion.tipo)
        .subscribe(
          res => {
            this.authenticationService.guardarStorage(res);
            this.validarRol();
          },
          err => {
            let mensaje = err.error.error_description;
            if (mensaje == 'Bad credentials') {
              mensaje = 'Credenciales incorrrectas';
            }
            Swal.fire({
              text: mensaje,
              type: 'error'
            });
          }
        );
    }
  }
}
