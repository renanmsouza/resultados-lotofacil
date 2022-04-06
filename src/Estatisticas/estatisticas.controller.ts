import { Controller } from '@nestjs/common';
import { ResultadosService } from 'src/Resultados/resultados.service';
import { Estatisticas } from './estatisticas.entity';
import { EstatisticasService } from './estatisticas.service';

@Controller('estatisticas')
export class EstatisticasController { 
    constructor(
        private estatiscasService: EstatisticasService,
        private resultadosService: ResultadosService
    ) {}

    atualizaEstatisticas(): string {
        for(let i = 1; i <= 25; i++) {
            let novaEstatistica = new Estatisticas(i);
            // totalConcursos
            // probabilidadeTotal
            // ultimoConcurso
            // maiorAusencia
            // probabilidadeProxConcurso
        }
        
        return 'Estatísticas Atualizadas' 
    }
}
