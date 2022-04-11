export class Resposta {
    private _mensagem: string;
    private _detalhes: string;
    private _objeto: Array<any> = [];

    constructor(_mensagem: string, _detalhes: string, _objeto: Array<any> = []) {
        this._mensagem = _mensagem
        this._detalhes = _detalhes
        this._objeto = _objeto
    }

    public get mensagem(): string {
        return this._mensagem;
    }

    public set mensagem(_mensagem: string) {
        this._mensagem = _mensagem;
    }

    public get detalhes(): string {
        return this._detalhes;
    }

    public set detalhes(_detalhes: string) {
        this._detalhes = _detalhes;
    }

    public get objeto(): Array<any> {
        return this._objeto;
    }

    public set objeto(_objeto: Array<any>) {
        this._objeto = _objeto;
    }

}