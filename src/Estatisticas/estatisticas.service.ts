import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Any, Repository } from 'typeorm';
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
        return await this.estatisticasRepository.findOneBy({ dezena: dezena });
    }

    async save(estatistica: Estatisticas): Promise<Estatisticas> {
        return await this.estatisticasRepository.save(estatistica);
    }

    async maiorAusencia(dezena: number): Promise<number> {
        let dezenaStr = dezena.toLocaleString('pt-BR', { minimumIntegerDigits: 2 });

        const [{ MaiorAusencia }] = await this.estatisticasRepository
            .query(`Select MaiorAusencia('${dezenaStr}') AS MaiorAusencia`);

        return MaiorAusencia;
    }

    async maiorPresenca(dezena: number): Promise<number> {
        let dezenaStr = dezena.toLocaleString('pt-BR', { minimumIntegerDigits: 2 });

        const [{ MaiorPresenca }] = await this.estatisticasRepository
            .query(`Select MaiorPresenca('${dezenaStr}') as MaiorPresenca`);

        return MaiorPresenca;
    }

    async maiorSeparacao(dezena1: number, dezena2: number): Promise<number> {
        let dezena1Str = dezena1.toLocaleString('pt-BR', { minimumIntegerDigits: 2 });
        let dezena2Str = dezena2.toLocaleString('pt-BR', { minimumIntegerDigits: 2 });

        const [{ MaiorSeparacao }] = await this.estatisticasRepository
            .query(`Select MaiorSeparacao('${dezena1Str}', '${dezena2Str}') AS MaiorSeparacao`);

        return MaiorSeparacao;
    }

    async maiorJuncao(dezena1: number, dezena2: number): Promise<number> {
        let dezena1Str = dezena1.toLocaleString('pt-BR', { minimumIntegerDigits: 2 });
        let dezena2Str = dezena2.toLocaleString('pt-BR', { minimumIntegerDigits: 2 });

        const [{ MaiorJuncao }] = await this.estatisticasRepository
            .query(`Select MaiorJuncao('${dezena1Str}', '${dezena2Str}') AS MaiorJuncao`);

        return MaiorJuncao;
    }
}
