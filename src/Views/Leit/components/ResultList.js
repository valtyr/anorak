import React from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Keyboard,
  ActivityIndicator
} from 'react-native';

import gql from 'graphql-tag';
import {graphql, compose} from 'react-apollo';
import {withPagination} from '../../../Helpers/graphql';

import {ProfilePicture} from '../../../Components';
import plurotron from '../../../Helpers/plurotron';

const Result = ({user, onTap}) => {
  return (
    <TouchableOpacity style={style.result} onPress={() => onTap(user.id)}>
      <ProfilePicture width={50} hash={user.imageHash} />
      <View style={style.info}>
        <Text style={style.name}>{user.name}</Text>
        <Text style={style.group}>{user.group}</Text>
      </View>
    </TouchableOpacity>
  );
};

const LoadingIndicator = ({visible}) => (
  <View style={style.loadingIndicator}>
    {visible && <ActivityIndicator animating />}
  </View>
);

const ResultList = ({data, onTap, debouncing, search, loadMore, loading}) => {
  const {userSearch} = data;

  if (!userSearch) return null;

  const results = userSearch.edges.map(edge => edge.node);

  return (
    <View style={style.root}>
      {results &&
        results.length !== 0 && (
          <FlatList
            ListHeaderComponent={
              <View style={style.header}>
                <View style={style.headerTextWrapper}>
                  <Text style={style.headerText}>
                    {userSearch.count}{' '}
                    {plurotron('NIÐURSTAÐA', 'NIÐURSTÖÐUR', userSearch.count)}
                  </Text>
                </View>
              </View>
            }
            ListFooterComponent={
              <LoadingIndicator visible={userSearch.pageInfo.hasNextPage} />
            }
            onEndReachedThreshold={0.2}
            onEndReached={({distanceFromEnd}) => {
              if (loadMore) loadMore();
            }}
            style={style.results}
            data={results}
            keyExtractor={u => u.id}
            onScroll={Keyboard.dismiss}
            renderItem={d => <Result user={d.item} onTap={onTap} />}
          />
        )}
      {search &&
        results.length === 0 && (
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
          >
            <Text style={{fontSize: 40}}>😔</Text>
            <Text
              style={{
                marginTop: 20,
                color: 'rgb(187, 187, 187)',
                textAlign: 'center'
              }}
            >
              Engir notendur fundust{'\n'} fyrir leitarorðin "{search}"
            </Text>
          </View>
        )}
      {(!search || search === '') && (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{fontSize: 40}}>🔍</Text>
          <Text
            style={{
              marginTop: 20,
              color: 'rgb(187, 187, 187)',
              textAlign: 'center'
            }}
          >
            Leitaðu að notendum hér að ofan
          </Text>
        </View>
      )}
    </View>
  );
};

const LeitQuery = gql`
  query LeitQuery($search: String!, $after: String) {
    userSearch(query: $search, first: 15, after: $after) {
      edges {
        node {
          id
          name
          group
          imageHash
        }
      }
      count
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

const style = StyleSheet.create({
  root: {
    flex: 1
  },
  results: {
    flex: 1,
    marginTop: -8
  },
  header: {
    marginTop: 30,
    marginBottom: 20,
    alignItems: 'center'
  },
  headerTextWrapper: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: 'black',
    shadowRadius: 7,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 1,
    backgroundColor: 'white'
  },
  headerText: {
    textAlign: 'center',
    fontStyle: 'italic',
    fontSize: 11,
    fontWeight: '700',
    color: 'rgb(226, 223, 223)',
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 16
  },
  result: {
    marginRight: 25,
    marginLeft: 25,
    padding: 5,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: 'black',
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.05,
    elevation: 2
  },
  info: {
    flexDirection: 'column',
    marginLeft: 10
  },
  name: {marginBottom: 5},
  group: {color: 'rgb(103, 103, 103)'},
  loadingIndicator: {
    paddingTop: 20,
    paddingBottom: 20
  }
});

export default compose(graphql(LeitQuery), withPagination('userSearch'))(
  ResultList
);
