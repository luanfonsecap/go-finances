import React, { createContext, useState, useContext } from 'react';
import { AxiosResponse } from 'axios';
import { format } from 'date-fns';

import formatValue from '../utils/formatValue';
import api from '../services/api';

interface Transaction {
  id: string;
  title: string;
  value: number;
  formattedValue: string;
  formattedDate: string;
  type: 'income' | 'outcome';
  category: { title: string };
  created_at: Date;
}

interface Balance {
	income: string;
	outcome: string;
	total: string;
}

interface TransactionContextData {	
	transactions: Transaction[];
	balance: Balance;
	loadTransactions(): Promise<void>;
	handleAddTransaction(transaction: TransactionDTO): Promise<void>;
}

interface Response {
  transactions: Transaction[];
  balance: Balance;
}

interface TransactionDTO {
	title: string;
	value: number;
	type: string;
	category: string;
}

const TransactionContext = createContext<TransactionContextData>({} as TransactionContextData);

const TransactionProvider: React.FC = ({children}) => {
	const [transactions, setTransactions] = useState<Transaction[]>([]);
	const [balance, setBalance] = useState<Balance>({} as Balance);
	
	function formatTransactions(response: AxiosResponse<Response>) {
		const formattedTransactions = response.data.transactions.map(item => {
			const formattedDate = format(new Date(item.created_at), 'dd/mm/yyyy');
			const formattedValue = formatValue(item.value);

			const newItem = { ...item, formattedValue, formattedDate };
			return newItem;
		});

		const formattedBalance = {
			income: response.data.balance.income.toString(),
			outcome: response.data.balance.outcome.toString(),
			total: response.data.balance.total.toString(),
		};

		return {formattedTransactions, formattedBalance};
	}

	async function loadTransactions(): Promise<void> {
		const response = await api.get<Response>('transactions');

		const { formattedTransactions, formattedBalance } = formatTransactions(response);

		setBalance(formattedBalance);
		setTransactions(formattedTransactions);
	}

	async function handleAddTransaction({ title, value, type, category }: TransactionDTO): Promise<void> {
		await api.post('transactions', { title, value, type, category });
		await loadTransactions();
	};

	return (
		<TransactionContext.Provider value={
			{ transactions, balance, loadTransactions, handleAddTransaction }
		}>
			{children}
		</TransactionContext.Provider>
	);
};

function useTransactions(): TransactionContextData {
	const context = useContext(TransactionContext);

	if(!context) {
		throw new Error('useTransactions must be used within an TransactionProvider');
	}

	return context;
}

export { TransactionProvider, useTransactions };
