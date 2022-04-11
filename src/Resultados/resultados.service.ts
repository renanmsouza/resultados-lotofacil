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

    public async findAll(): Promise<Resultados[]> {
        return await this.resultadosRepository.find();
    }

    public async findLast(): Promise<Resultados> {
        return await this.resultadosRepository
            .createQueryBuilder()
            .orderBy("concurso", "DESC")
            .getOne();
    }

    public async totalConcursos(): Promise<number> {
        return await this.resultadosRepository
            .createQueryBuilder()
            .getCount()    
    }

    public async totalConcursosPorDezena(dezena: number): Promise<number> {
        let dezenaStr = dezena.toLocaleString('pt-BR',{minimumIntegerDigits: 2});
        
        const total = await this.resultadosRepository
            .createQueryBuilder()
            .where(`dezenas like '%${dezenaStr}%'`)
            .getCount();

        return total;
    }

    public async ultimoConcursoDezena(dezena: number): Promise<number> {
        let dezenaStr = dezena.toLocaleString('pt-BR',{minimumIntegerDigits: 2});

        const totalConcursos = await this.resultadosRepository
            .createQueryBuilder()
            .where(`dezenas like '%${dezenaStr}%'`)
            .orderBy("concurso", "DESC")
            .getOne();

        return totalConcursos.concurso;
    }

    public async totalConcursosJuntas(dezena1: number, dezena2: number): Promise<number> {
        let dezena1Str = dezena1.toLocaleString('pt-BR',{minimumIntegerDigits: 2});
        let dezena2Str = dezena2.toLocaleString('pt-BR',{minimumIntegerDigits: 2});
        
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
        let dezena1Str = dezena1.toLocaleString('pt-BR',{minimumIntegerDigits: 2});
        let dezena2Str = dezena2.toLocaleString('pt-BR',{minimumIntegerDigits: 2});

        const ultimoConcurso = await this.resultadosRepository
            .createQueryBuilder()
            .where(`dezenas like '%${dezena1Str}%' and dezenas like '%${dezena2Str}%'`)
            .orderBy("concurso", "DESC")
            .getOne();

        return ultimoConcurso.concurso;
    }

    public async totalConcursosSeparadas(dezena1: number, dezena2: number): Promise<number> {
        let dezena1Str = dezena1.toLocaleString('pt-BR',{minimumIntegerDigits: 2});
        let dezena2Str = dezena2.toLocaleString('pt-BR',{minimumIntegerDigits: 2});
        
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
        let dezena1Str = dezena1.toLocaleString('pt-BR',{minimumIntegerDigits: 2});
        let dezena2Str = dezena2.toLocaleString('pt-BR',{minimumIntegerDigits: 2});

        const ultimoConcurso = await this.resultadosRepository
            .createQueryBuilder()
            .where(`dezenas not like '%${dezena1Str}%' and dezenas not like '%${dezena2Str}%'`)
            .orderBy("concurso", "DESC")
            .getOne();

        return ultimoConcurso.concurso;
    }

    public async probabilidadeDezenasJuntas(dezenas: number[]): Promise<number> {
        let dezenasStr = dezenas.join('|');
        const totalConcursos = await this.totalConcursos();

        const total = await this.resultadosRepository
            .createQueryBuilder()
            .where(`dezenas like '%${dezenasStr}%'`)
            .getCount();
        
        return (total / totalConcursos) * 100
    }

    public async save(resultado: Resultados): Promise<Resultados> {
       return this.resultadosRepository.save(resultado);
    }

}
