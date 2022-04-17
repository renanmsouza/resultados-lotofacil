import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RelacaoDezenasController } from './relacaodezenas.controller';
import { RelacaoDezenas } from './relacaodezenas.entity';
import { RelacaoDezenasService } from './relacaodezenas.service';

@Module({
    imports: [TypeOrmModule.forFeature([RelacaoDezenas])],
    controllers: [RelacaoDezenasController],
    providers: [RelacaoDezenasService],
})
export class RelacaoDezenasModule { }
