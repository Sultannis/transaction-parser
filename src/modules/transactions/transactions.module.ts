import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionSourcesModule } from '../transaction-sources/transaction-sources.module';
import { TransactionSumByDateResource } from './accessor/resources/transaction-sum-by-date.resource';
import { TransactionBySourceResource } from './accessor/resources/transactions-by-source.resource';
import { TransactionsController } from './accessor/transactions.controller';
import { TransactionsService } from './domain/transaction.service';
import { TransactionDao } from './repository/dao/transaction.dao';
import { TransactionsRepository } from './repository/transactions.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([TransactionDao]),
    TransactionSourcesModule,
  ],
  controllers: [TransactionsController],
  providers: [
    TransactionsService,
    TransactionsRepository,
    TransactionSumByDateResource,
    TransactionBySourceResource,
  ],
})
export class TransactionModule {}
