// Arquivo inicial do app, onde coloca-se o router e estilo global
import React from 'react';
import { BrowserRouter } from 'react-router-dom'; // router
import { GlobalStyle } from './styles/global'; // global-style
import { Routes } from './routes';

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
      <GlobalStyle />
    </>
  );
};

export default App;
