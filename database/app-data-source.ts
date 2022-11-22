import { databaseConfiguration } from '../src/common/configurations/database.configuration';
import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: databaseConfiguration.host,
  port: databaseConfiguration.port,
  username: databaseConfiguration.username,
  password: databaseConfiguration.password,
  database: databaseConfiguration.database,
  entities: ['src/common/dao/*{.ts,.js}'],
  migrations: ['database/migrations/*{.ts,.js}'],
  synchronize: false,
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized');
  })
  .catch(() => {
    console.error('Error during Data Source initialization');
  });

export { AppDataSource };
