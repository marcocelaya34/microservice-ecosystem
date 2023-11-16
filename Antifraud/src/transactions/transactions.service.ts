import { TransactionDto } from './dto/validate-transaction.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TransactionsService {
  constructor() {}

  // This method validates a transaction
  async validateTransaction(
    validateTransactionDto: TransactionDto,
  ): Promise<boolean> {
    // It checks if the transaction value is less than or equal to 1000
    // If it is, the transaction is considered valid and the method returns true
    // If not, the method returns false
    // delat of 5 second
    await new Promise((resolve) => setTimeout(resolve, 5000));
    return validateTransactionDto.value <= 1000;
  }
}