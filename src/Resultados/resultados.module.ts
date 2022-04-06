import { ResultadosService } from './resultados.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Resultados } from './resultados.entity';
import { ResultadosController } from './resultados.controller';
import { LotofacilApiService } from 'src/LotofacilApi/lotofacilapi.service';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [
        TypeOrmModule.forFeature([Resultados]),
        HttpModule
    ],
    controllers: [ResultadosController],
    providers: [ResultadosService, LotofacilApiService],
})
export class ResultadosModule { }
