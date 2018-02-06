import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {Screen} from '../../Components';
import {Hero, NameAndGroup} from './components';
import {mainReversed} from '../../Consts/gradients';

import gql from 'graphql-tag';
import {graphql} from 'react-apollo';

const Annad = ({data}) => (
  <Screen style={styles.root} gradient={mainReversed} title="Annað">
    <Hero
      profileImageHash={data.currentUser && data.currentUser.imageHash}
      status={data.currentUser && data.currentUser.status}
    />
    <NameAndGroup name={data.currentUser && data.currentUser.name} group={data.currentUser && data.currentUser.group} />
  </Screen>
);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'white',
  },
});

const AnnadQuery = gql`
  query {
    currentUser {
      id
      imageHash
      name
      status
      group
    }
  }
`;

export default graphql(AnnadQuery)(Annad);
