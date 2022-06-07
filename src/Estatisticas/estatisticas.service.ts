import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { dezenaValor } from 'src/Interfaces/dezena-valor.interface';
import { Repository } from 'typeorm';
import { Estatisticas } from './estatisticas.entity';

@Injectable()
export class EstatisticasService {

    constructor(
        @InjectRepository(Estatisticas)
        private estatisticasRepository: Repository<Estatisticas>
    ) {}

    public async findAll(): Promise<Estatisticas[]> {
        return await this.estatisticasRepository.find();
    }

    public async findByOne(dezena: number): Promise<Estatisticas> {
        return await this.estatisticasRepository.findOneBy({ dezena: dezena });
    }

    public async save(estatistica: Estatisticas): Promise<Estatisticas> {
        return await this.estatisticasRepository.save(estatistica);
    }

    public async maiorAusencia(dezena: number): Promise<number> {
        let dezenaStr = dezena.toLocaleString('pt-BR', { minimumIntegerDigits: 2 });

        const [{ MaiorAusencia }] = await this.estatisticasRepository
            .query(`Select MaiorAusencia('${dezenaStr}') AS MaiorAusencia`);

        return MaiorAusencia;
    }

    public async maiorPresenca(dezena: number): Promise<number> {
        let dezenaStr = dezena.toLocaleString('pt-BR', { minimumIntegerDigits: 2 });

        const [{ MaiorPresenca }] = await this.estatisticasRepository
            .query(`Select MaiorPresenca('${dezenaStr}') as MaiorPresenca`);

        return MaiorPresenca;
    }

    public async maiorSeparacao(dezena1: number, dezena2: number): Promise<number> {
        let dezena1Str = dezena1.toLocaleString('pt-BR', { minimumIntegerDigits: 2 });
        let dezena2Str = dezena2.toLocaleString('pt-BR', { minimumIntegerDigits: 2 });

        const [{ MaiorSeparacao }] = await this.estatisticasRepository
            .query(`Select MaiorSeparacao('${dezena1Str}', '${dezena2Str}') AS MaiorSeparacao`);

        return MaiorSeparacao;
    }

    public async maiorJuncao(dezena1: number, dezena2: number): Promise<number> {
        let dezena1Str = dezena1.toLocaleString('pt-BR', { minimumIntegerDigits: 2 });
        let dezena2Str = dezena2.toLocaleString('pt-BR', { minimumIntegerDigits: 2 });

        const [{ MaiorJuncao }] = await this.estatisticasRepository
            .query(`Select MaiorJuncao('${dezena1Str}', '${dezena2Str}') AS MaiorJuncao`);

        return MaiorJuncao;
    }

    public async listaDezenasPorProbabilidade(): Promise<dezenaValor[]> {
        const resultado = await this.estatisticasRepository
            .query('SELECT dezena, probabilidadeProxConcurso valor FROM Estatisticas'
                +' WHERE probabilidadeProxConcurso > 0'
                +' ORDER BY probabilidadeProxConcurso DESC') as dezenaValor[];
        
        return resultado;
    } 

    public async listaDezenasPorImprobabilidade(): Promise<dezenaValor[]> {
        const resultado = await this.estatisticasRepository
            .query('SELECT dezena, improbabilidadeProxConcurso valor FROM Estatisticas'
                +' WHERE improbabilidadeProxConcurso > 0'
                +' ORDER BY improbabilidadeProxConcurso') as dezenaValor[];
        
        return resultado;
    } 
}
