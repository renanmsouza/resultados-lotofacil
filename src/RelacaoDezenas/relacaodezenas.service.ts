import { Injectable, Res } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RelacaoDezenas } from "./relacaodezenas.entity";

@Injectable()
export class RelacaoDezenasService {
    constructor(
        @InjectRepository(RelacaoDezenas)
        private relacaoDezenasRepository: Repository<RelacaoDezenas>
    ) {}

    public findAll(): Promise<RelacaoDezenas[]> {
        return this.relacaoDezenasRepository.find();
    }

    public findOne(dezena: number, relacionada: number): Promise<RelacaoDezenas> {
        return this.relacaoDezenasRepository.findOneBy({
            dezena: dezena, 
            relacionada: relacionada
        });
    }

    public findRelacoes(dezena: number): Promise<RelacaoDezenas[]> {
        let dezenaStr = dezena.toLocaleString('pt-BR', { minimumIntegerDigits: 2 });

        return this.relacaoDezenasRepository.createQueryBuilder()
            .where(`dezena = ${dezenaStr} or relacionada = ${dezenaStr}`)
            .getMany()
    }

    public findByDezena(dezena: number): Promise<RelacaoDezenas[]> {
        return this.relacaoDezenasRepository.findBy({
            dezena: dezena
        });
    }
    
    public save(relacao: RelacaoDezenas): Promise<RelacaoDezenas> {
        return this.relacaoDezenasRepository.save(relacao);
    }
}