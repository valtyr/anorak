import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {LinearGradient} from 'expo';

import {main} from '../Consts/gradients';

const callIfActive = (active, func) => {
  if (active) func();
};

const ButtonBG = ({children, isActive}) => {
  if (isActive) {
    return (
      <LinearGradient {...main} style={[styles.root]}>
        {children}
      </LinearGradient>
    );
  }
  return <View style={[styles.root, styles.inactive]}>{children}</View>;
};

const Button = ({title, onPress, isActive = true, loading = false}) => (
  <TouchableOpacity onPress={() => callIfActive(isActive, onPress)} activeOpacity={isActive ? 0.6 : 1}>
    <ButtonBG isActive={isActive}>
      <Text style={styles.title}>{title && title.toUpperCase()}</Text>
      {loading && (
        <View style={styles.loadingIndicator}>
          <ActivityIndicator color="white" />
        </View>
      )}
    </ButtonBG>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  root: {
    padding: 20,
    backgroundColor: 'transparent',
    borderRadius: 1000,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  inactive: {
    backgroundColor: 'rgb(227, 225, 225)',
  },
  loadingIndicator: {
    marginLeft: 10,
  },
  title: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 18,
  },
});

export default Button;
