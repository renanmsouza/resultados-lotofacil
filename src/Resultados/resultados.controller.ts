import { Body, Controller, Get, Patch, Res } from '@nestjs/common';
import { Response } from 'express';
import { Resposta } from 'src/Classes/resposta.class';
import { LotofacilApiService } from 'src/LotofacilApi/lotofacilapi.service';
import { Resultados } from './resultados.entity';
import { ResultadosService } from './resultados.service';

@Controller('resultados')
export class ResultadosController {
    constructor(
        private readonly resultadosService: ResultadosService,
        private readonly lotofacilService: LotofacilApiService,
    ) {}

    @Get()
    public hellow(@Res() res: Response): Response {
        return res.status(200).send(new Resposta('Hellow', 'Controlador de Resultados'));
    }

    @Get('todos')
    public async findAll(@Res() res: Response): Promise<Response> {
        try {
            return res.status(200)
                .send(new Resposta('Sucesso', 'Todos os Resultados', await this.resultadosService.findAll()));    
        } catch (error) {
            return res.status(500)
                .send(new Resposta('Falha ao obter os dados', error.toString(), [error]));    
        }
    }

    @Get('ultimo_concurso')
    public async findLast(@Res() res: Response): Promise<Response> {
        try {
            return res.status(200)
                .send(new Resposta('Sucesso', 'Todos os Resultados', [await this.resultadosService.findLast()]));    
        } catch (error) {
            return res.status(500)
                .send(new Resposta('Falha ao obter os dados', error.toString(), [error]));    
        }
    }

    @Patch('atualizar')
    public async atualizar(@Res() res: Response): Promise<Response> {
        try {
            var concurso: number = 0;
            const ultimoGravado = await this.resultadosService.findLast();
            const ultimoConcurso = await this.lotofacilService.ultimoConcurso();

            if (ultimoGravado) {
                concurso = ultimoGravado.concurso;    
            }
    
            if ((concurso < ultimoConcurso) || (concurso > 0)) {
                var proximoConcurso = concurso + 1;

                while (proximoConcurso < ultimoConcurso) {
                    let novoConcurso = await this.lotofacilService.findOne(proximoConcurso);
                       
                    const novoResultado = new Resultados(
                        novoConcurso.concurso,
                        this.converteData(novoConcurso.data),
                        this.converteDezenas(novoConcurso.dezenas)
                    );
                    console.log(novoResultado);
                    await this.resultadosService.save(novoResultado);

                    proximoConcurso++;
                }
            }

            return res.status(200).send(new Resposta('OK', 'Atualizado com sucesso', []));

        } catch (error) {
            return res.status(500).send(new Resposta('Falha ao atualizar', error.toString(), [error]));    
        }

        
    }

    @Get('probabilidade_dezenas_juntas')
    public async probabilidadeDezenasJuntas(@Res() res: Response, @Body() dezenas: string[]): Promise<Response> {
        try {
            let probabilidade = await this.resultadosService.probabilidadeDezenasJuntas(dezenas); 
            
            return res.status(200).send(new Resposta('OK', 'Calculado com sucesso', [probabilidade]));
        } catch (error) {
            return res.status(500).send(new Resposta('Falha ao calcular a probabilidade', error.toString(), [error]));      
        }
    }

    @Get('testar_jogo')
    public async testarJogo(@Res() res: Response, @Body() dezenas: string[]): Promise<Response> {
        try {
            let jogoExiste = await this.resultadosService.testarJogo(dezenas);

            if (jogoExiste) {
                return res.status(200).send(new Resposta('OK', 'Aposta já foi sorteada!', [jogoExiste])); 
            } else {
                return res.status(200).send(new Resposta('OK', 'Aposta não foi sorteada!', [jogoExiste]));
            }
        } catch (error) {
            return res.status(500).send(new Resposta('Falha ao encontrar a aposta', error.toString(), [error]));    
        }
    }

    @Get('melhores_dezenas')
    public async melhoreDezenasPara(@Res() res: Response, @Body() dezenas: string[]): Promise<Response> {
        try {
            return res.status(200)
                .send(new Resposta('Sucesso', 'Todos os Resultados', await this.resultadosService.melhoresDezenasPara(dezenas)));    
        } catch (error) {
            return res.status(500)
                .send(new Resposta('Falha ao obter os dados', error.toString(), [error]));    
        }
    }

    private converteData(dataBrl: string): Date {
        const [DD, MM, YYYY] = dataBrl.split('/');
        return new Date(`${YYYY}-${MM}-${DD}`);  
    }

    private converteDezenas(dezenas: String[]): string {
        const exp = /,/g;
        var retorno = dezenas.toString();

        return retorno.replace(exp, '|');
    }
}
