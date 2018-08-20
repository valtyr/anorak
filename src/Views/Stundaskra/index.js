import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import gql from 'graphql-tag';
import {graphql, compose} from 'react-apollo';

import {Period, FetchTimetable} from './components';
import {Screen, TitleBar, Hero} from '../../Components';

import {light} from '../../Consts/gradients';

const getNextPeriodIndex = periods => {
  const now = new Date();
  for (const index in periods) {
    const period = periods[index];
    const periodEndSplit = period.endTime.split(':');
    const periodEndHour = Number(periodEndSplit[0]);
    const periodEndMinutes = Number(periodEndSplit[1]);
    if (
      period.weekday >= now.getDay() - 1 &&
      periodEndHour >= now.getHours() &&
      periodEndMinutes >= now.getMinutes()
    ) {
      return index;
    }
  }
  return 0;
};

const sortedPeriods = periods => {
  if (!periods) return null;
  const doublePeriods = periods.concat(periods);
  const nextPeriodIndex = getNextPeriodIndex(periods);
  return doublePeriods.slice(
    nextPeriodIndex,
    nextPeriodIndex + periods.length - 1
  );
};

const Stundaskra = ({data, fetchTimetable}) => {
  const periods =
    data.currentUser &&
    data.currentUser.timetable &&
    sortedPeriods(data.currentUser.timetable.periods);

  if (!periods) return <FetchTimetable fetchTimetable={fetchTimetable} />;

  return (
    <Screen style={styles.root} title="Stundaskrá">
      <Hero />
      <TitleBar title="Stundaskrá" white />
      <View style={styles.timetable}>
        {periods.map((period, index) => (
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
    backgroundColor: 'white'
  },
  timetable: {
    padding: 20,
    backgroundColor: 'transparent'
  }
});

const FetchTimetableMutation = gql`
  mutation fetchTimetable($password: String!) {
    getTimetable(password: $password) {
      ok
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

export default compose(
  graphql(StundaskraQuery),
  graphql(FetchTimetableMutation, {
    props: ({mutate, loading, error}) => ({
      fetchTimetable: password => mutate({variables: {password}})
    }),
    options: {
      update: (proxy, {data: {getTimetable}}) => {
        const data = proxy.readQuery({query: StundaskraQuery});
        data.currentUser.timetable = getTimetable.timetable;
        proxy.writeQuery({query: StundaskraQuery, data});
      }
    }
  })
)(Stundaskra);
