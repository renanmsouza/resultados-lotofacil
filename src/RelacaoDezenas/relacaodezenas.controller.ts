import { Controller, Get, Param, Res } from "@nestjs/common";
import { Response } from "express";
import { Resposta } from "src/Classes/resposta.class";
import { RelacaoDezenasService } from "./relacaodezenas.service";

@Controller('relacao_dezenas')
export class RelacaoDezenasController {
    constructor(
        private relacaodezenasService: RelacaoDezenasService
    ) {}

    @Get('todos')
    public async findAll(@Res() res: Response): Promise<Response> {
        try {
            return res.status(200)
                .send(new Resposta('Sucesso', 'Todos os Resultados', await this.relacaodezenasService.findAll()));    
        } catch (error) {
            return res.status(500)
                .send(new Resposta('Falha ao obter os dados', error.toString(), [error]));    
        }
    }

    @Get('relacao/:dezena')
    public async findRelacao(@Res() res: Response, @Param('dezena') dezena: number): Promise<Response> {
        try {
            return res.status(200)
                .send(new Resposta('Sucesso', 'Todos os Resultados', await this.relacaodezenasService.findRelacoes(dezena)));    
        } catch (error) {
            return res.status(500)
                .send(new Resposta('Falha ao obter os dados', error.toString(), [error]));    
        }
    }
}