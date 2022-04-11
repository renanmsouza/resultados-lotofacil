import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RelacaoDezenas } from 'src/RelacaoDezenas/relacaodezenas.entity';
import { RelacaoDezenasService } from 'src/RelacaoDezenas/relacaodezenas.service';
import { Resultados } from 'src/Resultados/resultados.entity';
import { ResultadosService } from 'src/Resultados/resultados.service';
import { EstatisticasController } from './estatisticas.controller';
import { Estatisticas } from './estatisticas.entity';
import { EstatisticasService } from './estatisticas.service';

@Module({
    imports: [TypeOrmModule.forFeature([Estatisticas, Resultados, RelacaoDezenas])],
    controllers: [EstatisticasController],
    providers: [EstatisticasService, ResultadosService, RelacaoDezenasService],
})
export class EstatiticasModule {}
