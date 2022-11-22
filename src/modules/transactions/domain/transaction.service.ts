import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateTransactionDto } from '../dtos/create-transaction.dto';
import { Transaction } from 'src/common/entities/transaction';
import { TransactionsRepository } from '../repository/transactions.repository';
import { Express } from 'express';
import * as CsvToJson from 'csvtojson';
import * as fs from 'fs/promises';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionsRepository: TransactionsRepository,
  ) {}

  async processTransactionsCSV(file: Express.Multer.File) {
    await fs
      .writeFile(`src/storage/${file.originalname}`, file.buffer)
      .catch(() => {
        throw new InternalServerErrorException();
      });

    const result = await CsvToJson()
      .fromFile(`src/storage/${file.originalname}`)
      .then((result) => result);

    await fs.unlink(`src/storage/${file.originalname}`);

    console.log(result);
  }
}
