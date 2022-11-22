import * as CsvToJson from 'csvtojson';
import * as fs from 'fs/promises';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { formatStringDateToISOString } from 'src/common/utils/date-formatters';
import { CreateTransactionDto } from '../dtos/create-transaction.dto';
import { TransactionPayloadDto } from '../dtos/transaction-payload.dto';
import { TransactionsRepository } from '../repository/transactions.repository';
import { TransactionSourcesService } from 'src/modules/transaction-sources/domain/transaction-sources.service';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionsRepository: TransactionsRepository,
    private readonly transactionSourcesService: TransactionSourcesService,
  ) {}

  async processTransactionsCsv(file: Express.Multer.File) {
    await this.saveTemporaryFile(file);

    const transactionsPayload: TransactionPayloadDto[] = await CsvToJson()
      .fromFile(`src/storage/${file.originalname}`)
      .then((result) => result);

    await this.deleteTemporaryFile(file);

    for (const transaction of transactionsPayload) {
      const transactionSource =
        await this.transactionSourcesService.createIfDoesntExist({
          name: transaction.source,
        });

      const payload: CreateTransactionDto = {
        sourceId: transactionSource.id,
        amount: +transaction.sum,
        description: transaction.description,
        transferDate: formatStringDateToISOString(transaction.date),
      };

      await this.transactionsRepository.insertAndFetch(payload);
    }
  }

  private async saveTemporaryFile(file: Express.Multer.File): Promise<void> {
    return fs
      .writeFile(`src/storage/${file.originalname}`, file.buffer)
      .catch(() => {
        throw new InternalServerErrorException();
      });
  }

  private async deleteTemporaryFile(file: Express.Multer.File): Promise<void> {
    return fs.unlink(`src/storage/${file.originalname}`);
  }
}
