import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { TransactionDao } from './dao/transaction.dao';
import { CreateTransactionDto } from '../dtos/create-transaction.dto';
import { Transaction } from 'src/common/entities/transaction';
import {
  formatISODateToStringDate,
  formatPartialStringDateToISOString,
} from 'src/common/utils/date-formatters';

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

  fetchSumGroupedByDate() {
    return this.transactionsRepository
      .createQueryBuilder('transaction')
      .select("date_trunc('month', transaction.transfer_date)", 'date_to_group')
      .addSelect('SUM(transaction.amount)', 'total')
      .groupBy("date_trunc('month', transaction.transfer_date)")
      .where('transaction.source_id = 2')
      .getRawMany();
  }

  async findSumsBySourceId({ sourceId, date }) {
    let query = this.transactionsRepository
      .createQueryBuilder('transaction')
      .select("date_trunc('month', transaction.transfer_date)", 'date')
      .addSelect('SUM(transaction.amount)', 'total')
      .groupBy("date_trunc('month', transaction.transfer_date)")
      .where('transaction.source_id = :sourceId', { sourceId });

    if (date) {
      query = query
        .andWhere(
          'EXTRACT(MONTH FROM transaction.transfer_date) = :findMonth',
          {
            findMonth: date.slice(0, 2),
          },
        )
        .andWhere('EXTRACT(YEAR FROM transaction.transfer_date) = :findYear', {
          findYear: date.slice(3),
        });
    }

    const transactions = await query.getRawMany();

    return transactions.map((transaction) => ({
      date: formatISODateToStringDate(transaction.date),
      total: transaction.total,
    }));
  }
}
