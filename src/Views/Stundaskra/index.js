import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';

import {Period} from './components';
import {Screen, TitleBar, Hero} from '../../Components';

const getNextPeriodIndex = periods => {
  const now = new Date();
  for (const index in periods) {
    const period = periods[index];
    const periodEndSplit = period.endTime.split(':');
    const periodEndHour = Number(periodEndSplit[0]);
    const periodEndMinutes = Number(periodEndSplit[1]);
    if (period.weekday >= now.getDay() && periodEndHour >= now.getHours() && periodEndMinutes >= now.getMinutes()) {
      return index;
    }
  }
  return 0;
};

const sortedPeriods = periods => {
  if (!periods) return null;
  const doublePeriods = periods.concat(periods);
  const nextPeriodIndex = getNextPeriodIndex(periods);
  return doublePeriods.slice(nextPeriodIndex, nextPeriodIndex + periods.length - 1);
};

const Stundaskra = ({data}) => {
  const periods = data.currentUser && sortedPeriods(data.currentUser.timetable.periods);

  return (
    <Screen style={styles.root} title="Stundaskrá">
      <Hero />
      <View style={styles.header}>
        <TitleBar title="Stundaskrá" white />
      </View>
      <View style={styles.timetable}>
        {periods &&
          periods.map((period, index) => (
            <Period
              key={period.id}
              period={period}
              lastPeriod={index - 1 >= 0 ? periods[index - 1] : null}
              first={index === 0}
            />
          ))}
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
    padding: 20,
  },
  header: {
    paddingLeft: 20,
    paddingRight: 20,
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
