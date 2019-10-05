export class ConfiguracionModel{
    public matricula = '';
    public activa = false;

    constructor(
        fields?: {
            matricula: string,
            activa: boolean
        }) {
        if (fields) { Object.assign(this, fields); }
    }
}