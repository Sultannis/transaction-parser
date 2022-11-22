import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { TransactionsService } from '../domain/transaction.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post('process-csv')
  @UseInterceptors(FileInterceptor('file'))
  async register(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }
}
