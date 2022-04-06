import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Resultados } from './resultados.entity';

@Injectable()
export class ResultadosService { 
    constructor(
        @InjectRepository(Resultados)
        private resultadosRepository: Repository<Resultados>
    ) {}

    findAll(): Promise<Resultados[]> {
        return this.resultadosRepository.find();
    }

    async findLast(): Promise<Resultados> {
        return await this.resultadosRepository
            .createQueryBuilder()
            .orderBy("concurso", "DESC")
            .getOne();
    }

    async totalConcursos(): Promise<number> {
        return await this.resultadosRepository
            .createQueryBuilder()
            .getCount()    
    }

    async totalConcursosPorDezena(dezena: number): Promise<number> {
        let dezenaStr = dezena.toLocaleString('',{minimumIntegerDigits: 2});

        return await this.resultadosRepository
            .createQueryBuilder()
            .where("dezenas like '%:dezena%'", {dezenaStr})
            .getCount()
    }

    async ultimoConcursoDezena(dezena: number): Promise<number> {
        let dezenaStr = dezena.toLocaleString('',{minimumIntegerDigits: 2});

        const totalConcursos = await this.resultadosRepository
            .createQueryBuilder()
            .select("concurso")
            .where("dezenas like '%:dezena%'", {dezenaStr})
            .orderBy("concurso", "DESC")
            .getOne()

        return totalConcursos.concurso;
    }

    async save(resultado: Resultados): Promise<Resultados> {
       return this.resultadosRepository.save(resultado);
    }
}
