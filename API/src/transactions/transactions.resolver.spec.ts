import {
  TransactionStatusName,
  UpdateTransactionDto,
} from './dto/update-transaction.dto';
import { Transaction } from '../database/entities/transaction.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionsResolver } from './transactions.resolver';
import { TransactionsService } from './transactions.service';
import { ParamsDictionary } from 'express-serve-static-core';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth/auth.service';
import { Request } from 'express';
import { ParsedQs } from 'qs';

describe('TransactionsResolver', () => {
  let resolver: TransactionsResolver;
  let service: jest.Mocked<TransactionsService>;
  let authService: jest.Mocked<AuthService>;

  beforeEach(async () => {
    service = {
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      create: jest.fn(),
    } as any;

    authService = {
      validateAccessToken: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionsResolver,
        { provide: TransactionsService, useValue: service },
        { provide: AuthService, useValue: authService },
      ],
    }).compile();

    resolver = module.get<TransactionsResolver>(TransactionsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should get all transactions', () => {
    resolver.getTransactions();
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should get one transaction', () => {
    const uuid = 'test-uuid';
    resolver.getOneTransaction(uuid);
    expect(service.findOne).toHaveBeenCalledWith(uuid);
  });

  it('should update a transaction', () => {
    const updateTransactionDTO: UpdateTransactionDto = {
      uuid: 'test-uuid',
      transactionStatus: { name: TransactionStatusName.APPROVED },
    };
    resolver.updateTransaction(updateTransactionDTO);
    expect(service.update).toHaveBeenCalledWith(updateTransactionDTO);
  });

  it('should create a transaction', async () => {
    const createTransactionDTO: CreateTransactionDto = {
      accountExternalIdDebit: 'debit-id',
      accountExternalIdCredit: 'credit-id',
      tranferTypeId: 1,
      value: 0,
    };
    jest
      .spyOn(service, 'create')
      .mockImplementation(() => Promise.resolve(new Transaction()));
    const req: Request<ParamsDictionary, any, any, ParsedQs> = {
      headers: { bearer: 'token' },
    } as any;
    await resolver.createTransaction(createTransactionDTO, { req });
    expect(service.create).toHaveBeenCalledWith(createTransactionDTO);
  });
});
