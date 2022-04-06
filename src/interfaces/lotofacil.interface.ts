interface Premiacoes {
    acertos: string;
    vencedores: number;
    premio: string;
}

export interface LotofacilInterface {
    loteria: string;
    nome: string;
    concurso: number;
    data: string;
    local: string;
    dezenas: string[];
    premiacoes: Premiacoes[];
    estadosPremiados: string[];
    acumulou: Boolean;
    acumuladaProxConcurso: string;
    dataProxConcurso: string;
    proxConcurso: number;
    timeCoracao: string;
    mesSorte: string;
}