import React from 'react';

export const edgeToNode = data => data && data.edges.map(e => e.node);

const PaginatedQuery = props => {
  const {Component, queryToPaginate, data, loading} = props;

  const loadMore = () => {
    if (!data) return;
    if (loading) return;

    const queryResult = data[queryToPaginate];
    if (!queryResult) return;

    if (!queryResult.pageInfo) return;
    if (!queryResult.pageInfo.hasNextPage) return;
    if (!queryResult.pageInfo.endCursor) return;

    data.fetchMore({
      variables: {
        after: queryResult.pageInfo.endCursor
      },
      updateQuery: (previousResult, {fetchMoreResult}) => {
        const newEdges = fetchMoreResult[queryToPaginate].edges;
        const pageInfo = fetchMoreResult[queryToPaginate].pageInfo;
        return newEdges.length
          ? {
              ...previousResult,
              [queryToPaginate]: {
                ...previousResult[queryToPaginate],
                edges: [...previousResult[queryToPaginate].edges, ...newEdges],
                pageInfo
              }
            }
          : previousResult;
      }
    });
  };

  const newProps = {
    ...props,
    loadMore,
    queryToPaginate: undefined,
    wrappedComponent: undefined
  };

  return <Component {...newProps} />;
};

export const withPagination = queryName => Component => {
  return props => (
    <PaginatedQuery
      {...props}
      queryToPaginate={queryName}
      Component={Component}
    />
  );
};
