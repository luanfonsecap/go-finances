import { getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';

import TasnsactionsRepository from '../repositories/TransactionsRepository';

class DeleteTransactionService {
  public async execute(id: string): Promise<void> {
    const transactionRepository = getCustomRepository(TasnsactionsRepository);

    const transaction = transactionRepository.findOne(id);

    if (!transaction) {
      throw new AppError('Transaction does not exits', 400);
    }

    await transactionRepository.delete({ id });
  }
}

export default DeleteTransactionService;
