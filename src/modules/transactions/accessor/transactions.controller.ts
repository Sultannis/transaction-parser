import {
  Body,
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
import { TransactionSourcesService } from 'src/modules/transaction-sources/domain/transaction-sources.service';

@Controller('transactions')
export class TransactionsController {
  constructor(
    private readonly transactionsService: TransactionsService,
    private readonly transactionSourcesService: TransactionSourcesService,
  ) {}

  @Post('process-csv')
  @UseInterceptors(FileInterceptor('file'))
  async processCsv(@UploadedFile() file: Express.Multer.File) {
    await this.transactionsService.processTransactionsCsv(file);
  }

  @Get()
  async getTransactionsBySources(@Query('by-sources') bySourcesQuery: String) {
    const bySources = bySourcesQuery === 'true' || bySourcesQuery === '1';

    await this.transactionsService.fetchAll(bySources);
  }
}
