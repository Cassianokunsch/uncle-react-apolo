import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import { from } from 'apollo-link';
import { store } from '../../store';
import { Creators as Actions } from '../../store/ducks/seller';
import history from '../../services/history';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000',
});

const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (graphQLErrors) {
    for (let err of graphQLErrors) {
      switch (err.message) {
        case 'Not Authorised!':
          store.dispatch(Actions.clearStore);
          history.go('/signIn');
          break;
        case 'Invalid Credentials!':
          err.message = 'E-mail ou senha inválidos!';
          return;
        case 'Email is already in use!':
          err.message = 'E-mail já  cadastrado!';
          return;
        default:
          return;
      }
    }
  }
  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

const authLink = setContext((_, { headers }) => {
  const { seller } = store.getState();
  return {
    headers: {
      ...headers,
      authorization: seller.token ? `Bearer ${seller.token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: from([errorLink, authLink.concat(httpLink)]),
  cache: new InMemoryCache(),
});

export default client;
