import React from 'react';
import {Text, StyleSheet, View, Image} from 'react-native';

import Hyperlink from 'react-native-hyperlink';

import {momentFormatter} from '../../Helpers/formatters';

import {graphql} from 'react-apollo';
import gql from 'graphql-tag';

import {Screen, AutoImage, Pinwheel} from '../../Components';
import {light} from '../../Consts/gradients';

const Event = ({data, navigation}) => {
  if (!data.event)
    return (
      <Screen gradient={light} light>
        <Pinwheel />
      </Screen>
    );

  const {event} = data;

  const formattedDate = momentFormatter(event.startTime).format('lll');

  return (
    <Screen
      title={event.name}
      gradient={light}
      light
      topPadding
      onBack={() => navigation.goBack()}
    >
      {event.photoUrl && <AutoImage uri={event.photoUrl} />}
      <View style={styles.content}>
        <Text style={[styles.title, event.photoUrl && {textAlign: 'left'}]}>
          {event.name}
        </Text>
        <Text style={[styles.eventDate, event.photoUrl && {textAlign: 'left'}]}>
          {formattedDate}
        </Text>
        {event.published === false && (
          <View
            style={[
              styles.unpublished,
              event.photoUrl && {justifyContent: 'flex-start'}
            ]}
          >
            <View style={styles.unpublishedDot} />
            <Text style={styles.unpublishedText}>
              Ekki sýnilegt almennum notendum
            </Text>
          </View>
        )}
        <Hyperlink linkDefault={true} linkStyle={{color: '#da8846'}}>
          <Text style={styles.description}>{event.description}</Text>
        </Hyperlink>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    fontWeight: '600',
    textAlign: 'center'
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20
  },
  description: {
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 50
  },
  content: {
    padding: 20
  },
  schoolInfo: {
    marginTop: 25,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 22
  },
  schoolText: {
    marginLeft: 10
  },
  organizationName: {
    fontWeight: '600'
  },
  eventDate: {
    color: 'rgb(166, 166, 166)',
    textAlign: 'center'
  },
  unpublished: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10
  },
  unpublishedText: {
    color: 'rgb(245, 87, 53)'
  },
  unpublishedDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: 'rgb(245, 87, 53)',
    marginRight: 5
  }
});

const EventQuery = gql`
  query eventQuery($id: UUID!) {
    event(id: $id) {
      id
      name
      description
      addedOn
      photoUrl
      published
      startTime
    }
  }
`;

export default graphql(EventQuery, {
  options: ({navigation}) => ({
    variables: {
      id: navigation.state.params.id
    }
  })
})(Event);
