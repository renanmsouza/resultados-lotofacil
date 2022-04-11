import { Controller, Patch, Res } from '@nestjs/common';
import { Response } from 'express';
import { Resposta } from 'src/Classes/resposta.class';
import { RelacaoDezenas } from 'src/RelacaoDezenas/relacaodezenas.entity';
import { RelacaoDezenasService } from 'src/RelacaoDezenas/relacaodezenas.service';
import { ResultadosService } from 'src/Resultados/resultados.service';
import { Estatisticas } from './estatisticas.entity';
import { EstatisticasService } from './estatisticas.service';

@Controller('estatisticas')
export class EstatisticasController {
    constructor(
        private estatiscasService: EstatisticasService,
        private resultadosService: ResultadosService,
        private relacaodezenasService: RelacaoDezenasService
    ) {}

    @Patch('atualizar')
    async atualizar(@Res() res: Response): Promise<Response> {
        try {
            await this.atualizaEstatisticas(res);

            await this.atualizarRelacaoDezenas(res);

            return res.status(200)
                .send(new Resposta('OK', 'Atualizado com sucesso', []));
        } catch (error) {
            return res.status(500)
                .send(new Resposta('Erro ao Atualizar', error.toString(), []));
        }
    }

    @Patch('atualizar_estatisticas')
    async atualizaEstatisticas(@Res() res: Response): Promise<Response> {
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

                return res.status(200)
                    .send(new Resposta('OK', 'Atualizado com sucesso', []));

            } catch (error) {
                return res.status(500)
                    .send(new Resposta('Erro ao Atualizar', error.toString(), []));
            }
        }
    }

    @Patch('atualizar_relacao_dezenas')
    async atualizarRelacaoDezenas(@Res() res: Response) {
        try {
            for (let i = 1; i <= 25; i++) {
                for (let j = i + 1; j <= 25; j++) {
                    let dezena = i;
                    let relacionada = j;

                    let novoRelacaoDezenas = new RelacaoDezenas(dezena, relacionada);

                    novoRelacaoDezenas.probabilidadeJuntas =
                        await this.resultadosService.probabilidadeJuntas(dezena, relacionada);

                    novoRelacaoDezenas.probabilidadeSeparadas =
                        await this.resultadosService.probabilidadeSeparadas(dezena, relacionada);

                    novoRelacaoDezenas.maiorJuncao =
                        await this.estatiscasService.maiorJuncao(dezena, relacionada);

                    novoRelacaoDezenas.maiorSeparacao =
                        await this.estatiscasService.maiorSeparacao(dezena, relacionada);

                    novoRelacaoDezenas.ultimoJuntas =
                        await this.resultadosService.ultimoConcursoJuntas(dezena, relacionada);

                    novoRelacaoDezenas.ultimoSeparadas =
                        await this.resultadosService.ultimoConcursoSeparadas(dezena, relacionada);

                    await this.relacaodezenasService.save(novoRelacaoDezenas);

                }
            }

            return res.status(200)
                    .send(new Resposta('OK', 'Atualizado com sucesso', []));

        } catch (error) {
            return res.status(500)
                    .send(new Resposta('Erro ao Atualizar', error.toString(), []));
        }

    }

    private async probabilidadeProxConcurso(estatistica: Estatisticas) {
        const ultimoConcurso = await this.resultadosService.findLast();
        const maiorAusencia = await this.estatiscasService.maiorAusencia(estatistica.dezena);

        const ausenciaAtual = ultimoConcurso.concurso - estatistica.ultimoConcurso;


        return (ausenciaAtual / maiorAusencia) * 100;
    }
}
