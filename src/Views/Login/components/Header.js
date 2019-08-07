import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import {Svg, Polygon} from 'react-native-svg';
import {View, Text, StyleSheet, SafeAreaView, Dimensions, StatusBar} from 'react-native';
import {TitleBar} from '../../../Components';
import {main} from '../../../Consts/gradients';

const Header = ({title}) => {
  var {width} = Dimensions.get('window');
  return (
    <LinearGradient {...main} style={styles.root}>
      <StatusBar barStyle="light-content" animated />
      <SafeAreaView>
        {/* <Svg style={styles.cutout}>
          <Polygon points={`0,30 ${width},0 ${width},30`} fill="white" />
        </Svg> */}
        <View style={styles.content}>
          <TitleBar title={title} white />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  root: {
    position: 'relative',
    zIndex: 2,
    height: 70,
  },
  content: {
    padding: 15,
  },
  cutout: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 30,
    flex: 1,
  },
});
export default Header;
