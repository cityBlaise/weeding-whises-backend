import { join } from 'path';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306, 
    username: 'root',
    password: 'admin',
    database: 'whises',
    entities: [join(__dirname, '**', '*.entity.{ts,js}')], 
    synchronize: false,
    migrations:[join(__dirname, 'migrations', '*.{ts,js}')],
});
