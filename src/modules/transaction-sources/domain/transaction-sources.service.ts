import { ConflictException, Injectable } from '@nestjs/common';
import { TransactionSource } from 'src/common/entities/transaction-source';
import { CreateTransactionSourceDto } from '../dtos/create-transaction-source.dto';
import { TransactionSourcesRepository } from '../repository/transaction-sources.repository';

@Injectable()
export class TransactionSourcesService {
  constructor(
    private readonly transactionSourcesRepository: TransactionSourcesRepository,
  ) {}

  async createIfDoesntExist(
    payload: CreateTransactionSourceDto,
  ): Promise<TransactionSource> {
    const existingSource =
      await this.transactionSourcesRepository.findOneByName(payload.name);
    if (existingSource) {
      return existingSource;
    }

    return this.transactionSourcesRepository.insertAndFetch(payload);
  }

  async fetchTransactions() {
    
  }
}
