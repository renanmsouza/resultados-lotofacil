import { RelacaoDezenasModule } from './RelacaoDezenas/relacaodezenas.module';
import { ResultadosModule } from './Resultados/resultados.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstatiticasModule } from './Estatisticas/estatiticas.module';

@Module({
  imports: [
    RelacaoDezenasModule,
    ResultadosModule,
    EstatiticasModule,
    TypeOrmModule.forRoot()
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
