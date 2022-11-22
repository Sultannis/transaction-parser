import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { TransactionsService } from '../domain/transaction.service';
import { Express } from 'express';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post('process-csv')
  @UseInterceptors(FileInterceptor('file'))
  async processCsv(@UploadedFile() file: Express.Multer.File) {
    await this.transactionsService.processTransactionsCsv(file);
  }
}
