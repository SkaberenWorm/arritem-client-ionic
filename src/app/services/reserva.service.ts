import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResultadoProc } from '../commons/interfaces/resultado-proc.interface';
import { map } from 'rxjs/operators';
import { Reserva } from '../commons/models/reserva.model';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  private urlBase = `${environment.backend_url}api/reserva`;
  constructor(private http: HttpClient) {}

  public listado(): Observable<ResultadoProc<Array<Reserva>>> {
    return this.http.get<ResultadoProc<Array<Reserva>>>(`${this.urlBase}/all`).pipe(
      map(result => {
        return result;
      })
    );
  }

  public misReservas(cliente: string): Observable<ResultadoProc<Array<Reserva>>> {
    return this.http
      .get<ResultadoProc<Array<Reserva>>>(`${this.urlBase}/search/me/${cliente}`)
      .pipe(
        map(result => {
          console.log(result.resultado);
          return result;
        })
      );
  }

  public getById(id: number): Observable<ResultadoProc<Reserva>> {
    return this.http.get<ResultadoProc<Reserva>>(`${this.urlBase}/${id}`).pipe(
      map(result => {
        return result;
      })
    );
  }

  public guardar(reserva: Reserva): Observable<ResultadoProc<Reserva>> {
    if (reserva.id > 0) {
      return this.http.put<ResultadoProc<Reserva>>(this.urlBase, reserva);
    } else {
      reserva.estado.id = 1;
      return this.http.post<ResultadoProc<Reserva>>(this.urlBase, reserva);
    }
  }
}
