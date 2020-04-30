import React, { useState, FormEvent, useCallback } from 'react';
import { FiPlusCircle } from 'react-icons/fi'

import { useTransactions } from '../../hooks/transactions';

import { Container } from './styles'

const Form: React.FC = () => {
	const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
	const [type, setType] = useState('income');
  const [category, setCategory] = useState('');
	
	const { handleAddTransaction } = useTransactions();

	function handleSubmit(e: FormEvent) {
		e.preventDefault()

		handleAddTransaction({
			title,
			value: Number(value),
			type,
			category
		});

		setTitle('');
		setValue('');
		setType('');
		setCategory('');
	};

	return (
		<Container onSubmit={handleSubmit}>
			<div>
				<input
					placeholder="Título"
					required
					value={title}
					onChange={e => setTitle(e.target.value)} 
				/>
				<input
					type="number"
					placeholder="Valor" 
					required
					value={value}
					onChange={e => setValue(e.target.value)} 
				/>
				<input
					placeholder="Categoria"
					required
					value={category}
					onChange={e => setCategory(e.target.value)} 
				/>

				<select 
					required
					value={type}
					onChange={e => setType(e.target.value)}
				>
					<option value="income">Entrada</option>
					<option value="outcome">Saída</option>
				</select>
			</div>

			<button type="submit">  
				Adicionar 
				<FiPlusCircle size={25} color="#ff9000" />
			</button>          

		</Container>
	);

};

export default Form;