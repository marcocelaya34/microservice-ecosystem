import {
  Args,
  Context,
  Mutation,
  Query,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { TransactionsService } from './transactions.service';
import { Transaction } from '../database/entities/transaction.entity';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { PubSub } from 'graphql-subscriptions';
import { AuthService } from 'src/auth/auth.service';
import { Req } from '@nestjs/common';
import { Request } from 'express';

const pubSub = new PubSub();

@Resolver()
export class TransactionsResolver {
  constructor(
    private readonly transactionsService: TransactionsService,
    private readonly authService: AuthService,
  ) {}

  @Query(() => [Transaction])
  getTransactions() {
    return this.transactionsService.findAll();
  }

  @Query(() => Transaction)
  getOneTransaction(@Args('uuid') uuid: string) {
    return this.transactionsService.findOne(uuid);
  }

  @Mutation(() => Boolean)
  async updateTransaction(
    @Args('updateTransactionDTO') updateTransactionDTO: UpdateTransactionDto,
  ) {
    const resp = await this.transactionsService.update(updateTransactionDTO);
    await pubSub.publish('updatedTransaction', {
      updatedTransaction: this.transactionsService.findOne(
        updateTransactionDTO.uuid,
      ),
    });
    return resp;
  }

  @Mutation(() => Transaction)
  async createTransaction(
    @Args('createTransactionDTO') createTransactionDTO: CreateTransactionDto,
    @Context() context: { req: Request },
  ) {
    const token = context?.req?.headers?.authorization;
    await this.authService.validateAccessToken(token);

    return this.transactionsService.create(createTransactionDTO);
  }

  @Subscription((returns) => Transaction)
  updatedTransaction() {
    return pubSub.asyncIterator('updatedTransaction');
  }
}
