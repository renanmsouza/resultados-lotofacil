import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Resultados } from 'src/Resultados/resultados.entity';
import { ResultadosService } from 'src/Resultados/resultados.service';
import { EstatisticasController } from './estatisticas.controller';
import { Estatisticas } from './estatisticas.entity';
import { EstatisticasService } from './estatisticas.service';

@Module({
    imports: [TypeOrmModule.forFeature([Estatisticas, Resultados])],
    controllers: [EstatisticasController],
    providers: [EstatisticasService, ResultadosService],
})
export class EstatiticasModule {}
