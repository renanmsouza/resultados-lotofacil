import { Controller, Get, Patch } from '@nestjs/common';
import { LotofacilApiService } from 'src/LotofacilApi/lotofacilapi.service';
import { Resultados } from './resultados.entity';
import { ResultadosService } from './resultados.service';

@Controller('resultados')
export class ResultadosController {
    constructor(
        private readonly resultadosService: ResultadosService,
        private readonly lotofacilService: LotofacilApiService
    ) { }

    @Get()
    public hellow(): string {
        return 'Controlador Resultados'
    }

    @Get('todos')
    public async findAll(): Promise<Resultados[]> {
        return this.resultadosService.findAll();
    }

    @Patch('atualizar')
    public async atualizar(): Promise<string> {
        try {
            const ultimoGravado = await this.resultadosService.findLast();
            const ultimoConcurso = await this.lotofacilService.ultimoConcurso();

            if (ultimoGravado.concurso < ultimoConcurso) {
                var proximoConcurso = ultimoGravado.concurso.valueOf() + 1;

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

        } catch (error) {
            return 'Deu Erro: ' + error.toString();    
        }

        return 'Atualizado com sucesso!!';
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
