import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { LotofacilInterface } from 'src/Interfaces/lotofacil.interface';

@Injectable()
export class LotofacilApiService {
    private url: string = 'https://loteriascaixa-api.herokuapp.com/api/';

    constructor(
        private httpService: HttpService
    ) {}

    async findLast(): Promise<LotofacilInterface> {
        const response = await lastValueFrom(this.httpService.get(this.url + 'lotofacil/latest'));
        return response.data as LotofacilInterface;
    }

    async findOne(concurso: number): Promise<LotofacilInterface> {
        console.log(`api/lotofacil/${concurso}`);
        const response = await lastValueFrom(this.httpService.get(this.url + `lotofacil/${concurso}`));
        
        return response.data as LotofacilInterface;
    }

    async ultimoConcurso(): Promise<Number> {
        return this.findLast().then((data) => data.concurso);
    }
}
