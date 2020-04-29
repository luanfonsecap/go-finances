import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    const { transactions } = this;

    return transactions;
  }

  public getBalance(): Balance {
    const balance = this.transactions.reduce(
      (acc, current): Balance => {
        if (current.type === 'income') {
          acc.income += current.value;
        }
        if (current.type === 'outcome') {
          acc.outcome += current.value;
        }

        acc.total = acc.income - acc.outcome;

        return acc;
      },
      { income: 0, outcome: 0, total: 0 },
    );

    return balance;
  }

  public create(transaction: Transaction): Transaction {
    const balance = this.getBalance();

    if (transaction.type === 'outcome' && transaction.value > balance.total) {
      throw Error('Insufficient balance');
    }

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
