import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from '../database/entities/transaction.entity';
import { KafkaModule } from '../kafka/kafka.module';
import { TransactionsResolver } from './transactions.resolver';
import { Context, GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AuthService } from 'src/auth/auth.service';

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
