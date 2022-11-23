import { Injectable } from '@nestjs/common';
import { TransactionSumByDateDto } from '../../dtos/transaction-sum-by-date.dto';

@Injectable()
export class TransactionSumByDateResource {
  convert(transactionBySource: TransactionSumByDateDto) {
    return {
      date: transactionBySource.date,
      total: +transactionBySource.total,
    };
  }
}
