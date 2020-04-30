import React from 'react';

import { NavLink } from 'react-router-dom';

import { Container } from './styles';

import Logo from '../../assets/logo.svg';

interface HeaderProps {
  size?: 'small' | 'large';
}


const Header: React.FC<HeaderProps> = ({ size = 'large' }: HeaderProps) => {
  const activeLink = { 
    borderBottom: 'solid',
    borderBottomWidth: '4px',
    borderColor: '#ff9000' 
  };
  
  return (
    <Container size={size}>
      <header>
        <img src={Logo} alt="GoFinances" />
        <nav>
          <NavLink exact activeStyle={activeLink} to="/">Dashboard</NavLink>
          <NavLink activeStyle={activeLink} to="/import">Importar</NavLink>
        </nav>
      </header>
    </Container>
  );
};

export default Header;
