import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from '../dtos/create-transaction.dto';
import { Transaction } from 'src/common/entities/transaction';
import { TransactionsRepository } from '../repository/transactions.repository';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionsRepository: TransactionsRepository,
  ) {}

  processTransactionsCSV(file) {
    console.log('check');
  }
}
