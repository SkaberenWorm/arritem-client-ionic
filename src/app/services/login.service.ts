import { Injectable } from '@angular/core';
import { AuthenticationService } from 'src/app/commons/services/authentication.service';
import { environment } from 'src/environments/environment';
import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';
import { RespuestaLogin } from 'src/app/commons/interfaces/respuesta-login-interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(
    public http: HttpClient,
    public router: Router,
    public authService: AuthenticationService
  ) {}
  public login(username: string, password: string, tipo: string = '') {
    const url = `${environment.auth_url}oauth/token`;
    let bodyH;

    bodyH = new HttpParams()
      .set('username', username)
      .set('password', password)
      .set('grant_type', 'password');

    const options = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8')
        .set('Authorization', 'Basic YXJyaXRlbUNsaWVudDoxMjM0NTY='),
      body: bodyH
    };
    return this.http.post<RespuestaLogin>(url, bodyH.toString(), options);
  }
}
