import { Module } from '@nestjs/common';
import { KafkaModule } from './kafka/kafka.module';
import { TransactionsModule } from './transactions/transactions.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { validate } from './utils/env.validation';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
      isGlobal: true,
    }),
    KafkaModule,
    TransactionsModule,
    DatabaseModule,
    AuthModule,
  ],
})
export class AppModule {}
