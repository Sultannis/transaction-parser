import {
  Controller,
  Get,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { TransactionsService } from '../domain/transaction.service';
import { Express } from 'express';
import { TransactionBySourceResource } from './resources/transactions-by-source.resource';

@Controller('transactions')
export class TransactionsController {
  constructor(
    private readonly transactionsService: TransactionsService,
    private readonly transactionBySourceResource: TransactionBySourceResource,
  ) {}

  @Post('process-csv')
  @UseInterceptors(FileInterceptor('file'))
  async processCsv(@UploadedFile() file: Express.Multer.File) {
    await this.transactionsService.processTransactionsCsv(file);
  }

  @Get('by-sources')
  async getTransactionsBySources(
    @Query('source') source: String,
    @Query('date') date: String,
  ) {
    const transactions = await this.transactionsService.fetchAll({
      source,
      date,
    });

    return {
      transactions: transactions.map((transaction) =>
        this.transactionBySourceResource.convert(transaction),
      ),
    };
  }
}
