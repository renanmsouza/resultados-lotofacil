import { DataSource } from "typeorm";

export const globalDataSouce = new DataSource(
    {
        type: "mysql",
        host: "cottonsheep.com.br",
        port: 3306,
        username: "cotton82_admin",
        password: "Cottonsheep1793*",
        database: "cotton82_DBResultadosLotoFacil",
        entities: ["dist/**/*.entity{.ts,.js}"],
        synchronize: false
    }
);