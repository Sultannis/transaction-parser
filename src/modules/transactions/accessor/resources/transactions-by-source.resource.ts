import { Injectable } from '@nestjs/common';
import { TransactionBySourceDto } from '../../dtos/transaction-by-source.dto';
import { TransactionSumByDateResource } from './transaction-sum-by-date.resource';

@Injectable()
export class TransactionBySourceResource {
  constructor(
    private readonly transactionSumByDateResource: TransactionSumByDateResource,
  ) {}

  convert(transactionBySource: TransactionBySourceDto) {
    return {
      source: transactionBySource.source,
      data: transactionBySource.data.map(
        this.transactionSumByDateResource.convert,
      ),
    };
  }
}
