import React from 'react';
import {View, Text, Switch, StyleSheet} from 'react-native';

const VisibilitySwitch = ({value, onChange}) => {
  return (
    <View style={styles.root}>
      <Text style={styles.text}>Samnemendur mínir mega sjá mig</Text>
      <Switch value={value} onValueChange={onChange} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginTop: 20,
    marginBottom: 30,
    paddingTop: 10,
    paddingBottom: 10,
    borderColor: 'rgb(236, 236, 236)'
  },
  text: {
    flex: 1,
    fontSize: 16,
    marginRight: 10
  }
});

export default VisibilitySwitch;
