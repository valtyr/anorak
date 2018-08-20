import React from 'react';
import {
  Platform,
  StatusBar,
  View,
  SafeAreaView,
  StyleSheet
} from 'react-native';
import {BackButton} from '.';

const PaddingComponent = ({children}) => {
  if (Platform.OS === 'ios') {
    return <SafeAreaView>{children}</SafeAreaView>;
  } else {
    return <View style={{marginTop: StatusBar.currentHeight}}>{children}</View>;
  }
};

const NavBar = ({onBack}) => {
  return (
    <PaddingComponent>
      <View style={styles.root}>
        <BackButton onPress={onBack} grey />
      </View>
    </PaddingComponent>
  );
};

const styles = StyleSheet.create({
  root: {
    padding: 10
  }
});

export default NavBar;
