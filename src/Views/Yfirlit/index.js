import React, {Component} from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';

import {graphql} from 'react-apollo';
import gql from 'graphql-tag';

import {edgeToNode} from '../../Helpers/graphql';

import {Screen} from '../../Components';
import {Hero, Birthdays, Events, NavBar} from './components';

const Yfirlit = ({data, navigation}) => (
  <Screen title="Yfirlit">
    <Hero />
    <Events />
    <Birthdays birthdays={edgeToNode(data.birthdays)} onPress={id => navigation.navigate('Profile', {id})} />
  </Screen>
);

const style = StyleSheet.create({
  flex: {
    flex: 1,
  },
});

const YfirlitQuery = gql`
  query YfirlitQuery {
    currentUser {
      timetable {
        nextPeriod {
          title
          startTime
          weekday
        }
      }
    }
    birthdays {
      edges {
        node {
          id
          name
          age
          imageHash
        }
      }
    }
  }
`;

export default graphql(YfirlitQuery)(Yfirlit);