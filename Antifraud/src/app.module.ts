import { TransactionsModule } from './transactions/transactions.module';
import { validate } from './utils/env.validation';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
      isGlobal: true,
    }),
    TransactionsModule,
  ],
})
export class AppModule {}
