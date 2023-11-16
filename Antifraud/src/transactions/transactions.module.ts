import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [TransactionsService],
  controllers: [TransactionsController],
  exports: [TransactionsService],
})
export class TransactionsModule {}
