import { join } from 'path';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'mysql-e20-014-e-20-014.a.aivencloud.com',
    port: 12752, 
    username: 'avnadmin',
    password: 'AVNS_-GAwyiKXOsEDdeULzUs',
    database: 'whises',
    entities: [join(__dirname, '**', '*.entity.{ts,js}')], 
    synchronize: true,
    migrations:[join(__dirname, 'migrations', '*.{ts,js}')],
});
