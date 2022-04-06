import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LotofacilInterface } from 'src/interfaces/lotofacil.interface';
import { MoreThan, Repository } from 'typeorm';
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

    async save(resultado: Resultados): Promise<Resultados> {
       return this.resultadosRepository.save(resultado);
    }
}
