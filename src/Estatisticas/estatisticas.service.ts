import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Estatisticas } from './estatisticas.entity';

@Injectable()
export class EstatisticasService {
    constructor(
        @InjectRepository(Estatisticas)
        private estatisticasRepository: Repository<Estatisticas>
    ) {}

    async findAll(): Promise<Estatisticas[]> {
        return await this.estatisticasRepository.find();
    }

    async findByOne(dezena: number): Promise<Estatisticas> {
        return await this.estatisticasRepository.findOne({where: {dezena: dezena}});
    }

    async save(estatistica: Estatisticas): Promise<Estatisticas> {
        return await this.estatisticasRepository.save(estatistica);
    }
 }
