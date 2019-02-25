import React, {Component} from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';

import {graphql} from 'react-apollo';
import gql from 'graphql-tag';

import {edgeToNode} from '../../Helpers/graphql';

import {Screen, Hero, TitleBar} from '../../Components';
import {Birthdays, Events, HeroImage, Posts, Ad} from './components';

import {logOut} from '../../Helpers/session';

const Yfirlit = ({data, navigation}) => {
  if (data.currentUser && data.currentUser.accessEnabled === false) {
    logOut();
  }

  console.log(data.ad);

  return (
    <Screen title="Yfirlit" onRefresh={data.refetch} refreshing={data.loading}>
      <Hero />
      <TitleBar title="Yfirlit" white />
      <HeroImage
        nextPeriod={
          data.currentUser &&
          data.currentUser.timetable &&
          data.currentUser.timetable.nextPeriod
        }
        url={
          data.currentUser &&
          data.currentUser.school &&
          data.currentUser.school.bannerUrl
        }
        onPeriodPress={() => navigation.navigate('Stundaskrá')}
      />
      <Events
        events={edgeToNode(data.events)}
        onPress={id => navigation.navigate('Event', {id})}
      />
      <Ad ad={data.ad} />
      <Birthdays
        birthdays={edgeToNode(data.birthdays)}
        onPress={id => navigation.navigate('Profile', {id})}
      />
      <Posts
        posts={edgeToNode(data.posts)}
        onPress={id => navigation.navigate('Post', {id})}
      />
    </Screen>
  );
};

const YfirlitQuery = gql`
  query YfirlitQuery {
    posts(first: 4) {
      edges {
        node {
          id
          name
          photoUrl
          body
          addedOn
          published
          school {
            id
            code
            organizationName
          }
        }
      }
    }
    events(first: 4) {
      edges {
        node {
          id
          name
          description
          addedOn
          photoUrl
        }
      }
    }
    ad {
      id
      image
      url
    }
    currentUser {
      id
      accessEnabled
      timetable {
        id
        nextPeriod {
          id
          title
          startTime
          weekday
        }
      }
      school {
        id
        bannerUrl
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
