import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { TransactionSourceDao } from './dao/transaction-source.dao';
import { TransactionSource } from 'src/common/entities/transaction-source';
import { CreateTransactionSourceDto } from '../dtos/create-transaction-source.dto';

@Injectable()
export class TransactionSourcesRepository {
  constructor(
    @InjectRepository(TransactionSourceDao)
    private readonly transactionSourcesRepository: Repository<TransactionSourceDao>,
  ) {}

  insertAndFetch(payload: CreateTransactionSourceDto): Promise<TransactionSource> {
    const source =  this.transactionSourcesRepository.create(payload)
  
    return this.transactionSourcesRepository.save(source)
  }

  findOneByName(name: string): Promise<TransactionSource> {
    return this.transactionSourcesRepository.findOneBy({
      name
    })
  }

  findTransactionsBySources(): Promise<TransactionSource> {
    return this.transactionSourcesRepository.createQueryBuilder('source').
  }
}
