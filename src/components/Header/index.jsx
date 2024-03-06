import React from 'react';
import { AppBar, Toolbar, Container } from '@mui/material';
import Logo from './Pokédex_logo.png'; // Substitua pelo caminho real para a sua logo

const Header = () => {
  return (
    <AppBar position="static" style={{ backgroundColor: '#fc0303' }}>
      <Container>
        <Toolbar>
          {/* Centralize a logo usando flexbox */}
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <img src={Logo} alt="Logo" style={{ maxWidth: '200px', maxHeight: '60px', width: 'auto', height: 'auto' }} />
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
