import { Transaction } from '../database/entities/transaction.entity';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TransactionsResolver } from './transactions.resolver';
import { TransactionsService } from './transactions.service';
import { AuthService } from 'src/auth/auth.service';
import { KafkaModule } from '../kafka/kafka.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { Module } from '@nestjs/common';
import { join } from 'path';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'schema.gql'),
      installSubscriptionHandlers: true,
    }),
    TypeOrmModule.forFeature([Transaction]),
    KafkaModule,
  ],
  providers: [TransactionsService, TransactionsResolver, AuthService],
  exports: [TransactionsService],
})
export class TransactionsModule {}
