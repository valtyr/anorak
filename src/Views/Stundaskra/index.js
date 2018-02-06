import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {Screen} from '../../Components';

const Stundaskra = () => <Screen style={styles.root} title="Stundaskrá" />;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'white',
  },
});
export default Stundaskra;
