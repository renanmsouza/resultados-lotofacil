import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { globalDataSouce } from 'src/app.global.datasource';
import { Repository } from 'typeorm';
import { Resultados } from './resultados.entity';

interface MelhoresDezenas {
    origem: string,
    dezena: string,
    probabilidade: number
}

@Injectable()
export class ResultadosService {
    private dataSource = globalDataSouce;

    constructor(
        @InjectRepository(Resultados)
        private resultadosRepository: Repository<Resultados>
    ) {
        this.dataSource.initialize();
    }

    public findAll(): Promise<Resultados[]> {
        return this.resultadosRepository.find();
    }

    public findLast(): Promise<Resultados> {
        return this.resultadosRepository
            .createQueryBuilder()
            .orderBy("concurso", "DESC")
            .getOne();
    }

    public totalConcursos(): Promise<number> {
        return this.resultadosRepository
            .createQueryBuilder()
            .getCount()
    }

    public totalConcursosPorDezena(dezena: number): Promise<number> {
        let dezenaStr = dezena.toLocaleString('pt-BR', { minimumIntegerDigits: 2 });

        const total = this.resultadosRepository
            .createQueryBuilder()
            .where(`dezenas like '%${dezenaStr}%'`)
            .getCount();

        return total;
    }

    public async ultimoConcursoDezena(dezena: number): Promise<number> {
        let dezenaStr = dezena.toLocaleString('pt-BR', { minimumIntegerDigits: 2 });

        const totalConcursos = await this.resultadosRepository
            .createQueryBuilder()
            .where(`dezenas like '%${dezenaStr}%'`)
            .orderBy("concurso", "DESC")
            .getOne();

        return totalConcursos.concurso;
    }

    public async totalConcursosJuntas(dezena1: number, dezena2: number): Promise<number> {
        let dezena1Str = dezena1.toLocaleString('pt-BR', { minimumIntegerDigits: 2 });
        let dezena2Str = dezena2.toLocaleString('pt-BR', { minimumIntegerDigits: 2 });

        const total = await this.resultadosRepository
            .createQueryBuilder()
            .where(`dezenas like '%${dezena1Str}%' and dezenas like '%${dezena2Str}%'`)
            .getCount();

        return total;
    }

    public async probabilidadeJuntas(dezena1: number, dezena2: number): Promise<number> {
        const totalConcursos: number = await this.totalConcursos();
        const totalJuntas: number = await this.totalConcursosJuntas(dezena1, dezena2);

        return (totalJuntas / totalConcursos) * 100;
    }

    public async ultimoConcursoJuntas(dezena1: number, dezena2: number): Promise<number> {
        let dezena1Str = dezena1.toLocaleString('pt-BR', { minimumIntegerDigits: 2 });
        let dezena2Str = dezena2.toLocaleString('pt-BR', { minimumIntegerDigits: 2 });

        const ultimoConcurso = await this.resultadosRepository
            .createQueryBuilder()
            .where(`dezenas like '%${dezena1Str}%' and dezenas like '%${dezena2Str}%'`)
            .orderBy("concurso", "DESC")
            .getOne();

        return ultimoConcurso.concurso;
    }

    public async totalConcursosSeparadas(dezena1: number, dezena2: number): Promise<number> {
        let dezena1Str = dezena1.toLocaleString('pt-BR', { minimumIntegerDigits: 2 });
        let dezena2Str = dezena2.toLocaleString('pt-BR', { minimumIntegerDigits: 2 });

        const total = await this.resultadosRepository
            .createQueryBuilder()
            .where(`dezenas not like '%${dezena1Str}%' and dezenas not like '%${dezena2Str}%'`)
            .getCount();

        return total;
    }


    public async probabilidadeSeparadas(dezena1: number, dezena2: number): Promise<number> {
        const totalConcursos: number = await this.totalConcursos();
        const totalSeparadas: number = await this.totalConcursosSeparadas(dezena1, dezena2);

        return (totalSeparadas / totalConcursos) * 100;
    }

    public async ultimoConcursoSeparadas(dezena1: number, dezena2: number): Promise<number> {
        let dezena1Str = dezena1.toLocaleString('pt-BR', { minimumIntegerDigits: 2 });
        let dezena2Str = dezena2.toLocaleString('pt-BR', { minimumIntegerDigits: 2 });

        const ultimoConcurso = await this.resultadosRepository
            .createQueryBuilder()
            .where(`dezenas not like '%${dezena1Str}%' and dezenas not like '%${dezena2Str}%'`)
            .orderBy("concurso", "DESC")
            .getOne();

        return ultimoConcurso.concurso;
    }

    public async probabilidadeDezenasJuntas(dezenas: string[]): Promise<number> {
        const totalConcursos = await this.totalConcursos();

        let sql = `dezenas like '%${dezenas[0]}%'`
        for (let i = 1; i < dezenas.length; i++) {
            sql = sql + ` and dezenas like '%${dezenas[i]}%'`
        }

        const total = await this.resultadosRepository
            .createQueryBuilder()
            .where(sql)
            .getCount();

        return (total / totalConcursos) * 100
    }

    public async testarJogo(dezenas: string[]): Promise<boolean> {
        let dezenasStr = dezenas.join('|');
        console.log(dezenasStr)
        const total = await this.resultadosRepository
            .createQueryBuilder()
            .where(`dezenas = '${dezenasStr}'`)
            .getCount();

        if (total > 0)
            return true
        else
            return false;
    }

    public async qtdeUltimosJogosPresentes(dezena: number): Promise<number> {
        const ultimoConcurso = await this.findLast();

        let dezenaStr = dezena.toLocaleString('pt-BR', { minimumIntegerDigits: 2 });
        let ultimosResultadosSeguidos = 0;
        let anterior = 0;

        const ultimosResultados = await this.resultadosRepository
            .createQueryBuilder()
            .where(`dezenas like '%${dezenaStr}%'`)
            .orderBy("concurso", "DESC")
            .limit(25)
            .getMany();

        if (ultimosResultados[0].concurso < ultimoConcurso.concurso) {
            return 0
        }

        ultimosResultados.map(resultado => {
            if ((resultado.concurso == anterior + 1) || (anterior == 0)) {
                ultimosResultadosSeguidos++
            }
            anterior = resultado.concurso;
        })

        return ultimosResultadosSeguidos;
    }

    public async melhoresDezenasPara(dezenas: string[]): Promise<MelhoresDezenas[]> {
        let dezenasAux = dezenas;
        let sql: string;
        let sqlTotal: string;
        let resultadoFinal: MelhoresDezenas[] = [];
        let resultado: MelhoresDezenas;
        var totalConcursos: number;
        var total: number;

        for (let i = 1; i <= 25; i++) {
            let dezenaStr = i.toLocaleString('pt-BR', { minimumIntegerDigits: 2 });
            dezenasAux.push(dezenaStr);

            sqlTotal = `dezenas like '%${dezenas[0]}%'`
            for (let i = 1; i < dezenas.length; i++) {
                sql = sql + ` and dezenas like '%${dezenas[i]}%'`
            }
            
            sql = `dezenas like '%${dezenasAux[0]}%'`
            for (let i = 1; i < dezenasAux.length; i++) {
                sql = sql + ` and dezenas like '%${dezenasAux[i]}%'`
            }

            totalConcursos = await this.resultadosRepository
                .createQueryBuilder()
                .where(sqlTotal)
                .getCount();

            total = await this.resultadosRepository
                .createQueryBuilder()
                .where(sql)
                .getCount();

            resultado = {
                origem: dezenasAux.join('|'),
                dezena: dezenaStr,
                probabilidade: (total / totalConcursos) * 100
            }

            resultadoFinal.push(resultado);
            dezenasAux.pop();
        }

        return resultadoFinal;
    }

    public async save(resultado: Resultados): Promise<Resultados> {
        return this.resultadosRepository.save(resultado);
    }

}
