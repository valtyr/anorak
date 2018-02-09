import React from 'react';

import {ApolloProvider} from 'react-apollo';
import ApolloClient from 'apollo-client';
import {HttpLink} from 'apollo-link-http';
import {ApolloLink, concat} from 'apollo-link';
import {InMemoryCache} from 'apollo-cache-inmemory';

const uribase = __DEV__ ? 'https://dev.valtyr.is' : 'https://api.anorak.is';
const uri = endpoint => `${uribase}/${endpoint}`;

const generateClient = token => {
  if (token) {
    const httpLink = new HttpLink({uri: uri('graphql')});
    const authMiddleware = new ApolloLink((operation, forward) => {
      // add the authorization to the headers
      console.log(token);

      operation.setContext({
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      return forward(operation);
    });

    return new ApolloClient({
      link: concat(authMiddleware, httpLink),
      cache: new InMemoryCache(),
    });
  }

  const httpLink = new HttpLink({uri: uri('auth')});
  return new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });
};

export default ({children, token}) => {
  const client = generateClient(token);
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
