import { Controller, Patch } from '@nestjs/common';
import e, { response } from 'express';
import { ResultadosService } from 'src/Resultados/resultados.service';
import { Estatisticas } from './estatisticas.entity';
import { EstatisticasService } from './estatisticas.service';

@Controller('estatisticas')
export class EstatisticasController {
    constructor(
        private estatiscasService: EstatisticasService,
        private resultadosService: ResultadosService
    ) { }

    @Patch('atualizar')
    async atualizaEstatisticas(): Promise<string> {
        for (let i = 1; i <= 25; i++) {
            var novaEstatistica = new Estatisticas(i);

            try {
                // totalConcursos
                novaEstatistica.totalConcursos = await this.resultadosService.totalConcursosPorDezena(i);
                
                // probabilidadeTotal
                novaEstatistica.probabilidadeTotal = (
                    novaEstatistica.totalConcursos /
                    await this.resultadosService.totalConcursos()
                ) * 100;
                
                // ultimoConcurso
                novaEstatistica.ultimoConcurso = await this.resultadosService.ultimoConcursoDezena(i);
                
                // maiorAusencia
                novaEstatistica.maiorAusencia = await this.estatiscasService.maiorAusencia(i);
                // maiorPresenca
                novaEstatistica.maiorPresenca = await this.estatiscasService.maiorPresenca(i);
                // probabilidadeProxConcurso
                novaEstatistica.probabilidadeProxConcurso = await this.probabilidadeProxConcurso(novaEstatistica);
                console.log(novaEstatistica);
                await this.estatiscasService.save(novaEstatistica);
            } catch (error) {
                return 'Erro: ' + error; 
            }
        }

        return 'Atualizado com sucesso'
    }

    async probabilidadeProxConcurso(estatistica: Estatisticas) {
        const ultimoConcurso = await this.resultadosService.findLast();
        const maiorAusencia = await this.estatiscasService.maiorAusencia(estatistica.dezena);

        const ausenciaAtual = ultimoConcurso.concurso - estatistica.ultimoConcurso;


        return (ausenciaAtual / maiorAusencia) * 100;
    }
}
