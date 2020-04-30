import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';
import AppError from '../errors/AppError';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const transactions = await this.find();

    const balance = transactions.reduce(
      (acc, currrent) => {
        if (currrent.type === 'income') {
          acc.income += currrent.value;
        }
        if (currrent.type === 'outcome') {
          acc.outcome += currrent.value;
        }
        acc.total = acc.income - acc.outcome;

        return acc;
      },
      { income: 0, outcome: 0, total: 0 },
    );

    return balance;
  }
}

export default TransactionsRepository;
