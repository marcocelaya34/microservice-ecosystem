import { TransactionsModule } from './transactions/transactions.module';
import { DatabaseModule } from './database/database.module';
import { KafkaModule } from './kafka/kafka.module';
import { validate } from './utils/env.validation';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

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
