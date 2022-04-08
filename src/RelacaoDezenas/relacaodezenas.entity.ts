import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("RelacaoDezenas")
export class RelacaoDezenas {
    @PrimaryColumn({ name: "dezena" })
    private _dezena: number;
    @PrimaryColumn({ name: "relacionada" })
    private _relacionada: number;
    @Column({ name: "probabilidadeJuntas" })
    private _probabilidadeJuntas: number;
    @Column({ name: "probabilidadeSeparadas" })
    private _probabilidadeSeparadas: number;
    @Column({ name: "ultimoJuntas" })
    private _ultimoJuntas: number;
    @Column({ name: "ultimoSeparadas" })
    private _ultimoSeparadas: number;
    @Column({ name: "maiorJuncao" })
    private _maiorJuncao: number;
    @Column({ name: "maiorSeparacao" })
    private _maiorSeparacao: number;

    constructor(
        _dezena: number,
        _relacionada: number
    ) {
        this._dezena = _dezena
        this._relacionada = _relacionada
    }

    public get dezena(): number {
        return this._dezena;
    }

    public set dezena(_dezena: number) {
        this._dezena = _dezena;
    }

    public get relacionada(): number {
        return this._relacionada;
    }

    public set relacionada(_relacionada: number) {
        this._relacionada = _relacionada;
    }

    public get probabilidadeJuntas(): number {
        return this._probabilidadeJuntas;
    }

    public set probabilidadeJuntas(_probabilidadeJuntas: number) {
        this._probabilidadeJuntas = _probabilidadeJuntas;
    }

    public get probabilidadeSeparadas(): number {
        return this._probabilidadeSeparadas;
    }

    public set probabilidadeSeparadas(_probabilidadeSeparadas: number) {
        this._probabilidadeSeparadas = _probabilidadeSeparadas;
    }

    public get ultimoJuntas(): number {
        return this._ultimoJuntas;
    }

    public set ultimoJuntas(_ultimoJuntas: number) {
        this._ultimoJuntas = _ultimoJuntas;
    }

    public get ultimoSeparadas(): number {
        return this._ultimoSeparadas;
    }

    public set ultimoSeparadas(_ultimoSeparadas: number) {
        this._ultimoSeparadas = _ultimoSeparadas;
    }

    public get maiorJuncao(): number {
        return this._maiorJuncao;
    }

    public set maiorJuncao(_maiorJuncao: number) {
        this._maiorJuncao = _maiorJuncao;
    }

    public get maiorSeparacao(): number {
        return this._maiorSeparacao;
    }

    public set maiorSeparacao(_maiorSeparacao: number) {
        this._maiorSeparacao = _maiorSeparacao;
    }
}