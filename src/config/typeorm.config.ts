import {TypeOrmModuleOptions} from "@nestjs/typeorm";

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'magda',
    password: 'magda',
    database: 'movies_database',
    entities: [__dirname + '/../**/*.entity.ts'],
    synchronize: true,
}