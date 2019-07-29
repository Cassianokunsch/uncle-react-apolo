import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import { from } from 'apollo-link';
import { TOKEN_KEY } from '../../store';
import history from '../../services/history';
import { clearCredentials } from '../../store';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000',
});

const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (graphQLErrors) {
    for (let err of graphQLErrors) {
      switch (err.message) {
        case 'Not Authorised!':
          clearCredentials();
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
  const token = localStorage.getItem(TOKEN_KEY);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: from([errorLink, authLink.concat(httpLink)]),
  cache: new InMemoryCache(),
});

export default client;
