import React from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';

import {timeFormatter} from '../../../Helpers/formatters';
import {weekdaysDefiniteArticle} from '../../../Consts/weekdays';

const HeroImage = ({nextPeriod, onPeriodPress}) => {
  return (
    <View style={style.heroContent}>
      <View style={style.heroImageContainer}>
        <Image
          source={{
            uri: 'https://ogn.imgix.net/fordistokkur.jpg'
          }}
          style={style.heroImage}
        />
      </View>
      {nextPeriod && (
        <TouchableOpacity style={style.nextPeriod} onPress={onPeriodPress}>
          <Text style={style.desc}>Næsti tíminn þinn er</Text>
          <View style={style.period}>
            <Text style={style.periodName}>{nextPeriod.title}</Text>
            <Text style={style.periodTime}>
              kl. {timeFormatter(nextPeriod.startTime)} á{' '}
              {weekdaysDefiniteArticle[nextPeriod.weekday]}
            </Text>
          </View>
        </TouchableOpacity>
      )}
      {!nextPeriod && (
        <TouchableOpacity style={style.nextPeriod} onPress={onPeriodPress}>
          <Text style={style.getTimetable}>
            Ýttu hér til að sækja stundaskrána þína
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  heroImage: {
    aspectRatio: 1920 / 1080
  },
  heroImageContainer: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    overflow: 'hidden',
    flex: 1
  },
  heroContent: {
    position: 'relative',
    borderRadius: 8,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.15,
    shadowRadius: 13,
    zIndex: 2,
    elevation: 10,
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 40
  },
  nextPeriod: {
    padding: 20,
    flexDirection: 'row',
    // color: '280A6E',
    alignItems: 'center'
  },
  period: {
    marginLeft: 'auto'
  },
  desc: {
    fontSize: 13,
    fontWeight: '600',
    color: '#280A6E',
    width: 100
  },
  getTimetable: {
    fontSize: 13,
    fontWeight: '600',
    color: '#280A6E'
  },
  periodName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#280A6E',
    textAlign: 'right'
  },
  periodTime: {
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'right',
    color: '#280A6E'
  }
});

export default HeroImage;
