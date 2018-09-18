import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import {LinearGradient} from 'expo';

import {main, lightGray} from '../Consts/gradients';

const callIfActive = (active, func) => {
  if (active) func();
};

const ButtonBG = ({children, isActive, secondary}) => {
  const gradient = secondary ? lightGray : main;

  if (isActive) {
    return (
      <LinearGradient
        {...gradient}
        style={[styles.root, secondary && styles.secondaryRoot]}
      >
        {children}
      </LinearGradient>
    );
  }
  return <View style={[styles.root, styles.inactive]}>{children}</View>;
};

const Button = ({
  title,
  onPress,
  isActive = true,
  loading = false,
  secondary
}) => (
  <TouchableOpacity
    onPress={() => callIfActive(isActive, onPress)}
    activeOpacity={isActive ? 0.6 : 1}
  >
    <ButtonBG isActive={isActive} secondary={secondary}>
      <Text style={[styles.title, secondary && styles.secondaryTitle]}>
        {title && title.toUpperCase()}
      </Text>
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
    justifyContent: 'center'
  },
  inactive: {
    backgroundColor: 'rgb(227, 225, 225)'
  },
  loadingIndicator: {
    marginLeft: 10
  },
  title: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 18
  },
  secondaryRoot: {
    padding: 10
  },
  secondaryTitle: {
    color: 'rgb(190, 190, 190)',
    fontSize: 14
  }
});

export default Button;
