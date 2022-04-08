import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { globalDataSouce } from 'src/app.global.datasource';
import { Any, Repository } from 'typeorm';
import { Estatisticas } from './estatisticas.entity';

@Injectable()
export class EstatisticasService {
    private _dataSouce = globalDataSouce;

    constructor(
        @InjectRepository(Estatisticas)
        private estatisticasRepository: Repository<Estatisticas>
    ) {
        this._dataSouce.initialize();
    }

    async findAll(): Promise<Estatisticas[]> {
        return await this.estatisticasRepository.find();
    }

    async findByOne(dezena: number): Promise<Estatisticas> {
        return await this.estatisticasRepository.findOne({ where: { dezena: dezena } });
    }

    async save(estatistica: Estatisticas): Promise<Estatisticas> {
        return await this.estatisticasRepository.save(estatistica);
    }

    async maiorAusencia(dezena: number): Promise<number> {
        let dezenaStr = dezena.toLocaleString('pt-BR', { minimumIntegerDigits: 2 });

        const [{ MaiorAusencia }] = await this._dataSouce
            .query(`Select MaiorAusencia('${dezenaStr}') AS MaiorAusencia`);

        console.log(MaiorAusencia);

        return MaiorAusencia;
    }

    async maiorPresenca(dezena: number): Promise<number> {
        let dezenaStr = dezena.toLocaleString('pt-BR', { minimumIntegerDigits: 2 });

        const [{ MaiorPresenca }] = await this.estatisticasRepository
            .query(`Select MaiorPresenca('${dezenaStr}') as MaiorPresenca`);

        return MaiorPresenca;
    }
}
