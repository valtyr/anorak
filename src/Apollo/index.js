import React from 'react';

import {ApolloProvider} from 'react-apollo';
import ApolloClient from 'apollo-client';
import {HttpLink} from 'apollo-link-http';
import {ApolloLink, concat} from 'apollo-link';
import {onError} from 'apollo-link-error';

import {InMemoryCache} from 'apollo-cache-inmemory';

const uribase = __DEV__ ? 'https://v.anorak.is' : 'https://api.anorak.is';
// const uribase = 'https://api.anorak.is';
const uri = endpoint => `${uribase}/${endpoint}`;

const generateClient = token => {
  const errorHandlerLink = onError(({graphQLErrors, networkError}) => {
    if (graphQLErrors)
      graphQLErrors.map(({message, locations, path}) =>
        console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`),
      );

    if (networkError) console.log(`[Network error]: ${networkError}`);
  });

  if (token) {
    const httpLink = new HttpLink({uri: uri('graphql')});
    const authMiddleware = new ApolloLink((operation, forward) => {
      operation.setContext({
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      return forward(operation);
    });

    const link = ApolloLink.from([errorHandlerLink, httpLink]);

    return new ApolloClient({
      link: concat(authMiddleware, link),
      cache: new InMemoryCache(),
    });
  }

  const httpLink = new HttpLink({uri: uri('auth')});
  const link = ApolloLink.from([errorHandlerLink, httpLink]);

  return new ApolloClient({
    link: link,
    cache: new InMemoryCache(),
  });
};

export default ({children, token}) => {
  const client = generateClient(token);
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
