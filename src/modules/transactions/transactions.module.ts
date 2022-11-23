import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionSourcesModule } from '../transaction-sources/transaction-sources.module';
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
  providers: [TransactionsService, TransactionsRepository],
})
export class TransactionModule {}
