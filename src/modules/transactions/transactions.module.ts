import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionDao } from './repository/dao/transaction.dao';

@Module({
  imports: [TypeOrmModule.forFeature([TransactionDao])],
  providers: [],
})
export class TransactionSourcesModule {}
