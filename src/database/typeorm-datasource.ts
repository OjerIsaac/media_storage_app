import * as path from 'path';
import { Media } from '../modules/media/entities';
import { DataSource, DataSourceOptions } from 'typeorm';
import { DATABASE_URL } from './config';

//TODO: Bug here at entities
export const options: DataSourceOptions = {
  type: 'postgres',
  url: DATABASE_URL,
  // entities: ["src/**/*.entity.{ts,js}"],
  entities: [Media],
  migrations: [path.join(__dirname, '/../**/migrations/*{.ts,.js}')],
  synchronize: true,
};

export default new DataSource(options);
