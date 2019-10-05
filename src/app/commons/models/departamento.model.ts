export class Departamento {
  public id = 0;
  public nombre = null;
  public direccion = '';
  public tarifa = 0;
  public estado = null;
  public activo = true;

  constructor(fields?: { id?: number; nombre?: string; direccion?: string; tarifa?: number; estado?: string; activo?: boolean }) {
    if (fields) {
      Object.assign(this, fields);
    }
  }
}
