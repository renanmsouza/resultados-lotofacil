import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("Estatisticas")
export class Estatisticas {
    @PrimaryColumn({name: "dezena"})
    private _dezena: number;
    @Column({name: "totalConcursos"})
	private _totalConcursos: number;
    @Column({name: "probabilidadeTotal"})
	private _probabilidadeTotal: number;
    @Column({name: "ultimoConcurso"})
	private _ultimoConcurso: number;
    @Column({name: "maiorAusencia"})
	private _maiorAusencia: number;
    @Column({name: "maiorPresenca"})
	private _maiorPresenca: number;
    @Column({name: "probabilidadeProxConcurso"})
	private _probabilidadeProxConcurso: number;
    @Column({name: "improbabilidadeProxConcurso"})
	private _improbabilidadeProxConcurso: number;

    constructor(dezena: number) {
        this._dezena = dezena;
    }

    public get dezena(): number {
        return this._dezena;
    }

    public set dezena(_dezena: number) {
        this._dezena = _dezena;
    }

    public get totalConcursos(): number {
        return this._totalConcursos;
    }

    public set totalConcursos(_totalSeorteios: number) {
        this._totalConcursos = _totalSeorteios;
    }

    public get probabilidadeTotal(): number {
        return this._probabilidadeTotal;
    }

    public set probabilidadeTotal(_probabilidadeTotal: number) {
        this._probabilidadeTotal = _probabilidadeTotal;
    }

    public get ultimoConcurso(): number {
        return this._ultimoConcurso;
    }

    public set ultimoConcurso(_ultimoConcurso: number) {
        this._ultimoConcurso = _ultimoConcurso;
    }

    public get maiorAusencia(): number {
        return this._maiorAusencia;
    }

    public set maiorAusencia(_maiorAusencia: number) {
        this._maiorAusencia = _maiorAusencia;
    }

    public get maiorPresenca(): number {
        return this._maiorPresenca;
    }

    public set maiorPresenca(_maiorPresenca: number) {
        this._maiorPresenca = _maiorPresenca;
    }

    public get probabilidadeProxConcurso(): number {
        return this._probabilidadeProxConcurso;
    }

    public set probabilidadeProxConcurso(_probabilidadeProxConcurso: number) {
        this._probabilidadeProxConcurso = _probabilidadeProxConcurso;
    }

    public get improbabilidadeProxConcurso(): number {
        return this._improbabilidadeProxConcurso;
    }

    public set improbabilidadeProxConcurso(_improbabilidadeProxConcurso: number) {
        this._improbabilidadeProxConcurso = _improbabilidadeProxConcurso;
    }   

}