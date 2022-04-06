import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { LotofacilInterface } from 'src/interfaces/lotofacil.interface';

@Injectable()
export class LotofacilApiService { 
    constructor(
        private httpService: HttpService
    ) {}

    async findLast(): Promise<any> {
        const response = await lastValueFrom(this.httpService.get('https://loteriascaixa-api.herokuapp.com/api/lotofacil/latest'));
        return response.data;
    }

    async findOne(concurso: number): Promise<LotofacilInterface> {
        const response = await lastValueFrom(this.httpService.get(`https://loteriascaixa-api.herokuapp.com/api/lotofacil/${concurso}`));
        return response.data as LotofacilInterface;
    }

    async ultimoConcurso(): Promise<Number> {
        return this.findLast().then((data: LotofacilInterface) => {
            return data.concurso
        });
    }
}
