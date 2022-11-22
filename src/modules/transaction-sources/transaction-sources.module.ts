import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionSourcesService } from './domain/transaction-sources.service';
import { TransactionSourceDao } from './repository/dao/transaction-source.dao';
import { TransactionSourcesRepository } from './repository/transaction-sources.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TransactionSourceDao])],
  providers: [TransactionSourcesService, TransactionSourcesRepository],
  exports: [TransactionSourcesService],
})
export class TransactionSourcesModule {}
