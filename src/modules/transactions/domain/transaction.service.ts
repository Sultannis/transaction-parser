import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from '../dtos/create-transaction.dto';
import { Transaction } from 'src/common/entities/transaction';
import { TransactionsRepository } from '../repository/transactions.repository';
import { Express } from 'express';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionsRepository: TransactionsRepository,
  ) {}

  processTransactionsCSV(file: Express.Multer.File) {
      
  }
}
