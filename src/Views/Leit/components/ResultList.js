import React from 'react';
import {FlatList, View, StyleSheet, Text, TouchableOpacity, Keyboard} from 'react-native';

import gql from 'graphql-tag';
import {graphql} from 'react-apollo';

import {ProfilePicture} from '../../../Components';
import plurotron from '../../../Helpers/plurotron';

const Result = ({user, onTap}) => {
  return (
    <TouchableOpacity style={style.result} onPress={() => onTap(user.id)}>
      <ProfilePicture width={50} />
      <View style={style.info}>
        <Text style={style.name}>{user.name}</Text>
        <Text style={style.group}>{user.group}</Text>
      </View>
    </TouchableOpacity>
  );
};

const ResultList = ({data, onTap, debouncing}) => {
  const {userSearch} = data;

  if (!userSearch) return null;

  const results = userSearch.edges.map(edge => edge.node);

  return (
    <View style={style.root}>
      {debouncing && <Text>debouncing</Text>}
      <FlatList
        ListHeaderComponent={
          <View style={style.header}>
            <Text style={style.headerText}>
              {userSearch.count} {plurotron('NIÐURSTAÐA', 'NIÐURSTÖÐUR', userSearch.count)}
            </Text>
          </View>
        }
        style={style.results}
        data={results}
        keyExtractor={u => u.id}
        onScroll={Keyboard.dismiss}
        renderItem={d => <Result user={d.item} onTap={onTap} />}
      />
    </View>
  );
};

const LeitQuery = gql`
  query LeitQuery($search: String!) {
    userSearch(query: $search) {
      edges {
        node {
          id
          name
          group
          imageHash
        }
      }
      count
    }
  }
`;

const style = StyleSheet.create({
  root: {
    flex: 1,
  },
  results: {
    flex: 1,
  },
  header: {
    marginTop: 30,
    marginBottom: 20,
  },
  headerText: {
    textAlign: 'center',
    fontStyle: 'italic',
    fontSize: 11,
    fontWeight: '700',
    color: 'rgb(226, 223, 223)',
  },
  result: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 5,
    paddingBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  info: {
    flexDirection: 'column',
    marginLeft: 10,
  },
  name: {marginBottom: 5},
  group: {color: 'rgb(103, 103, 103)'},
});

export default graphql(LeitQuery)(ResultList);
