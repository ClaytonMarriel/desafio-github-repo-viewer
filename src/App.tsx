import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { Provider } from 'react-redux';
import { Container } from '@mui/material';
import client from './apollo/client';
import store from './store';
import RepositoryTable from './components/RepositoryTable/RepositoryTable';
import RepositoryModal from './components/RepositoryModal/RepositoryModal';
import './styles/global.scss';
import Header from './components/Header/Header';

function App() {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
          <Header />
        <Container>
          <RepositoryTable />
          <RepositoryModal />
        </Container>
      </Provider>
    </ApolloProvider>
  );
}

export default App;
