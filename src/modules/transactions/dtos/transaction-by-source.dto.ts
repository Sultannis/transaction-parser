import { TransactionSumByDateDto } from './transaction-sum-by-date.dto';

export type TransactionBySourceDto = {
  source: string;
  data: TransactionSumByDateDto[];
};
