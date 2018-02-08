import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';

import {Period} from './components';
import {Screen} from '../../Components';

const Stundaskra = ({data}) => {
  const periods = data.currentUser && data.currentUser.timetable.periods;

  return (
    <Screen style={styles.root} title="Stundaskrá">
      <View style={styles.timetable}>
        {periods && periods.map(period => <Period key={period.id} period={period} />)}
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'white',
  },
  timetable: {
    padding: 15,
  },
});

const StundaskraQuery = gql`
  query {
    currentUser {
      id
      timetable {
        id
        periods {
          id
          title
          startTime
          endTime
          classroom
          teacher
          weekday
        }
      }
    }
  }
`;

export default graphql(StundaskraQuery)(Stundaskra);
