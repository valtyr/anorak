import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import {ProfilePicture} from '../../../Components';
import {pluralFormatter} from '../../../Consts/formatters';

const Birthdays = ({birthdays, onPress}) => {
  return (
    <View>
      <Text style={style.heading}>Afmæli</Text>
      {birthdays &&
        birthdays.map(user => (
          <TouchableOpacity key={user.id} onPress={() => onPress(user.id)} style={style.user}>
            <ProfilePicture hash={user && user.imageHash} width={50} />
            <View style={style.text}>
              <View>
                <Text>{user.name}</Text>
                <Text style={style.age}>
                  {user.age} {pluralFormatter(user.age, 'árs', 'ára')}
                </Text>
              </View>
              <Text style={style.group}>{user.group}</Text>
            </View>
          </TouchableOpacity>
        ))}
    </View>
  );
};

const style = StyleSheet.create({
  heading: {
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  user: {
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 15,
    alignItems: 'center',
  },
  text: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 10,
  },
  age: {
    color: 'rgb(145, 145, 145)',
    fontWeight: '600',
    fontStyle: 'italic',
    marginTop: 3,
  },
  group: {
    color: 'rgb(145, 145, 145)',
    marginLeft: 'auto',
  },
});

export default Birthdays;
