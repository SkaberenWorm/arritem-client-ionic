import { Rol } from './rol.model';

export class Cliente {
  public id = 0;
  public run = '';
  public nombre = '';
  public apellidos = '';
  public email = '';
  public activo = true;
  public celular = '';
  public rol = new Rol();
  public password = '';
  public user = '';

  constructor(fields?: {
    id?: number;
    run?: String;
    nombre?: String;
    apellidos?: string;
    email?: String;
    user?: String;
    activo?: boolean;
    rol?: Rol;
    celular?: string;
    password?: string;
  }) {
    if (fields) {
      Object.assign(this, fields);
    }
  }
}
