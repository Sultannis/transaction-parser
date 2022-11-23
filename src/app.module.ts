import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfiguration } from './common/configurations/database.configuration';
import { AuthModule } from './modules/auth/auth.module';
import { TransactionSourceDao } from './modules/transaction-sources/repository/dao/transaction-source.dao';
import { TransactionSourcesModule } from './modules/transaction-sources/transaction-sources.module';
import { TransactionDao } from './modules/transactions/repository/dao/transaction.dao';
import { TransactionModule } from './modules/transactions/transactions.module';
import { UserDao } from './modules/users/repository/dao/user.dao';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: databaseConfiguration.host,
      port: databaseConfiguration.port,
      username: databaseConfiguration.username,
      password: databaseConfiguration.password,
      database: databaseConfiguration.database,
      entities: [UserDao, TransactionSourceDao, TransactionDao],
      migrations: ['../database/migrations/*{.ts,.js}'],
      synchronize: false,
    }),
    AuthModule,
    UsersModule,
    TransactionSourcesModule,
    TransactionModule,
  ],
})
export class AppModule {}
