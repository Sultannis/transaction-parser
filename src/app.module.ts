import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfiguration } from './common/configurations/database.configuration';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: databaseConfiguration.host,
      port: databaseConfiguration.port,
      username: databaseConfiguration.username,
      password: databaseConfiguration.password,
      database: databaseConfiguration.database,
      entities: [],
      migrations: ['../database/migrations/*{.ts,.js}'],
      synchronize: false,
    }),
  ],
})
export class AppModule {}
