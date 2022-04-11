import { Injectable, Res } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Response } from "express";
import { Resposta } from "src/Classes/resposta.class";
import { Repository } from "typeorm";
import { RelacaoDezenas } from "./relacaodezenas.entity";

@Injectable()
export class RelacaoDezenasService {
    constructor(
        @InjectRepository(RelacaoDezenas)
        private relacaoDezenasRepository: Repository<RelacaoDezenas>
    ) {}

    public findOne(dezena: number, relacionada: number): Promise<RelacaoDezenas> {
        return this.relacaoDezenasRepository.findOneBy({
            dezena: dezena, 
            relacionada: relacionada
        });
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