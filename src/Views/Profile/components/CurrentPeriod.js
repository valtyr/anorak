import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {LinearGradient} from 'expo';

import {lightBlue} from '../../../Consts/gradients';

const CurrentPeriod = ({period}) => {
  const startTime = period && period.startTime.split(':');
  const startTimeFormatted = startTime && `${startTime[0]}:${startTime[1]}`;

  const endTime = period && period.endTime.split(':');
  const endTimeFormatted = endTime && `${endTime[0]}:${endTime[1]}`;

  return (
    period && (
      <View>
        <Text style={styles.title}>ER Í TÍMA:</Text>
        <LinearGradient {...lightBlue} style={styles.root}>
          <Text style={styles.primary}>{period.title}</Text>
          <View style={styles.lower}>
            <Text style={styles.secondary}>{period.classroom}</Text>
            <Text style={styles.secondary}>
              {startTimeFormatted} – {endTimeFormatted}
            </Text>
          </View>
        </LinearGradient>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowOffset: {width: 2, height: 4},
    shadowRadius: 10,
    marginBottom: 30
  },
  title: {
    color: '#DCDAEE',
    fontSize: 12,
    fontWeight: '800',
    fontStyle: 'italic',
    marginLeft: 10,
    marginBottom: 10
  },
  lower: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  primary: {
    color: 'white',
    fontSize: 26,
    fontWeight: '700'
  },
  secondary: {
    color: 'white',
    opacity: 0.8,
    fontSize: 16,
    fontWeight: '600'
  }
});

export default CurrentPeriod;
