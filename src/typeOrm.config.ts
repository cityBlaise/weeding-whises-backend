import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';

export const typeOrmConfig = async (configService: ConfigService): Promise<TypeOrmModuleOptions> => ({
  type: configService.get<any>('DB_TYPE'),
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  synchronize: configService.get<number>('DB_SYNCHRONIZE')==1,
  username: configService.get<string>('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_DATABASE'),
  entities: [join(__dirname, '**', '*.entity.{ts,js}')],  
  migrations:[join(__dirname, 'migrations', '*.{ts,js}')], 
});
