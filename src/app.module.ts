import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfiguration } from './common/configurations/database.configuration';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: databaseConfiguration.host,
      port: databaseConfiguration.port,
      username: databaseConfiguration.username,
      password: databaseConfiguration.password,
      database: databaseConfiguration.database,
      entities: ['src/common/dao/*{.ts,.js}'],
      migrations: ['../database/migrations/*{.ts,.js}'],
      synchronize: false,
    }),
  ],
})
export class AppModule {}
