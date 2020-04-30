import styled from 'styled-components';

export const Container = styled.form`
padding: 16px;
margin-top: 34px;
background-color: #ddd;
border-radius: 8px;

display: flex;
align-items: center;
justify-content: center;

input {
	border: 0;
	border-radius: 4px;
	
	font-size: 16px;
	color: #363F5F;
	max-width: 200px;

	padding: 4px;
	margin: 0 8px;
}

input::placeholder {
	color: #969cb3;
}

select {
	background-color: #fff;
	border-radius: 4px;
	border: 0;
	padding: 4px;
	
	font-size: 16px;
	color: #363F5F;

	width: 150px;
}

button {
	display: flex;
	justify-content: center;
	align-items: center;
	margin-left: auto;

	border: 0;
	background-color: #fff;
	border-radius: 8px;
	padding: 8px;
	
	color: #363F5F;
	transition: all .2s;
	svg {
		margin-left: 4px;
	}

	&:hover {
		background-color: #5636d3;
		color: #fff;
	}
}
`;