export class Rol {
  public id = 0;
  public descripcion = '';
  public activo = true;

  constructor(fields?: { id?: number; descripcion?: string; activo?: boolean }) {
    if (fields) {
      Object.assign(this, fields);
    }
  }
}
