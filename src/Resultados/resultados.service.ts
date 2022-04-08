import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { globalDataSouce } from 'src/app.global.datasource';
import { Repository } from 'typeorm';
import { Resultados } from './resultados.entity';

@Injectable()
export class ResultadosService { 
    private dataSource = globalDataSouce;

    constructor(
        @InjectRepository(Resultados)
        private resultadosRepository: Repository<Resultados>
    ) {
        this.dataSource.initialize();
    }

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
        let dezenaStr = dezena.toLocaleString('pt-BR',{minimumIntegerDigits: 2});
        
        const total = await this.resultadosRepository
            .createQueryBuilder()
            .where(`dezenas like '%${dezenaStr}%'`)
            .getCount();

        return total;
    }

    async ultimoConcursoDezena(dezena: number): Promise<number> {
        let dezenaStr = dezena.toLocaleString('pt-BR',{minimumIntegerDigits: 2});

        const totalConcursos = await this.resultadosRepository
            .createQueryBuilder()
            .where(`dezenas like '%${dezenaStr}%'`)
            .orderBy("concurso", "DESC")
            .getOne();

        return totalConcursos.concurso;
    }

    async save(resultado: Resultados): Promise<Resultados> {
       return this.resultadosRepository.save(resultado);
    }

}
