import React from 'react';

import gql from 'graphql-tag';
import {Query} from 'react-apollo';

const SessionContext = React.createContext({user: null});
export default SessionContext;

const SessionQuery = gql`
  query SessionQuery {
    user: currentUser {
      ...UserSnippet
    }
  }
  ${UserSnippet}
`;

export const SessionProvider = ({children}) => (
  <Query query={SessionQuery}>
    {({user}) => <SessionContext.Provider>{children}</SessionContext.Provider>}
  </Query>
);
