import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RelacaoDezenas } from "./relacaodezenas.entity";

@Injectable()
export class RelacaoDezenasService {
    constructor(
        @InjectRepository(RelacaoDezenas)
        private relacaoDezenasRepository: Repository<RelacaoDezenas>
    ) {}
}