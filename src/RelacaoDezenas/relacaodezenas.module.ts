import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RelacaoDezenas } from './relacaodezenas.entity';

@Module({
    imports: [TypeOrmModule.forFeature([RelacaoDezenas])],
    controllers: [],
    providers: [],
})
export class RelacaoDezenasModule { }
