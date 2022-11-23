import { Injectable } from '@nestjs/common';
import { Transaction } from 'src/common/entities/transaction';
import { TransactionSumByDateResource } from './transaction-sum-by-date.resource';

@Injectable()
export class TransactionBySourceResource {
  constructor() {}
  
  convert(transactionBySource) {
    return {
      source: transactionBySource.source,
      data: TransactionSumByDateResource[],
    };
  }
}
