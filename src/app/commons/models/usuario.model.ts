

export class Usuario {
  public id = 0;
  public nombre = '';
  public correo = '';
  public activo = true;
  public rol = '';

  constructor(fields?: {
    id: number,
    nombre: String,
    correo: String,
    activo: boolean
    rol: string
  }) {
    if (fields) { Object.assign(this, fields); }
  }
}
