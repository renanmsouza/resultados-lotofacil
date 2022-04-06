import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("Resultados")
export class Resultados {
    @PrimaryColumn({name: "concurso"})
    private _concurso: number;
    @Column({name: "data"})
    private _data: Date;
    @Column({name: "dezenas"})
    private _dezenas: string;

    constructor(
        _concurso: number,
        _data: Date,
        _dezenas: string
    ) {
        this._concurso = _concurso
        this._data = _data
        this._dezenas = _dezenas   
    }

    public get concurso(): number {
        return this._concurso;
    }

    public set concurso(_concurso: number) {
        this._concurso = _concurso;
    }

    public get data(): Date {
        return this._data;
    }

    public set data(_data: Date) {
        this._data = _data;
    }

    public get dezenas(): string {
        return this._dezenas;
    }

    public set dezenas(_dezenas: string) {
        this._dezenas = _dezenas;
    }
}