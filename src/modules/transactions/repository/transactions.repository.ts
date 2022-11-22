import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { TransactionDao } from './dao/transaction.dao';
import { CreateTransactionDto } from '../dtos/create-transaction.dto';
import { Transaction } from 'src/common/entities/transaction';

@Injectable()
export class TransactionsRepository {
  constructor(
    @InjectRepository(TransactionDao)
    private readonly transactionsRepository: Repository<TransactionDao>,
  ) {}

  insertAndFetch(payload: CreateTransactionDto): Promise<Transaction> {
    const source = this.transactionsRepository.create(payload);

    return this.transactionsRepository.save(source);
  }
}
