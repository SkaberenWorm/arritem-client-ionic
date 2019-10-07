import { Departamento } from './departamento.model';
import { Cliente } from './cliente.model';
import { EstadoReserva } from './estado-reserva.model';

export class Reserva {
  public id = 0;
  public cliente = new Cliente();
  public fechaHoraInicio = new Date();
  public fechaHoraTermino = new Date();
  public totalInicioPagado = 0;
  public total = 0;
  public observacion = '';
  public createdAt = new Date();
  public departamento = new Departamento();
  public estado = new EstadoReserva();
  public activo = true;

  constructor(fields?: {
    id: number;
    cliente: Cliente;
    observacion: String;
    fechaHotaInicio: Date;
    fechaHoraTermino: Date;
    totalInicioPagado: number;
    total: number;
    createdAt: Date;
    departamento: Departamento;
    estado: EstadoReserva;
  }) {
    if (fields) {
      Object.assign(this, fields);
    }
  }
}
