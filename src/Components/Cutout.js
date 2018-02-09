import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {StyleSheet} from 'react-native';

export default ({width, reverse}) => {
  const d = `M0,40 C${width / 2},40 ${width /
    2},0 ${width},0 C${width},0 ${width},13.3333333 ${width},40 C66.6666667,40 0,40 0,40 Z`;
  return (
    <Svg style={[styles.cutout, reverse && styles.reverse]}>
      <Path d={d} fill="white" />
    </Svg>
  );
};

const styles = StyleSheet.create({
  cutout: {
    height: 40,
    position: 'absolute',
    bottom: -1,
    left: 0,
    right: 0,
  },
  reverse: {
    transform: [{scaleX: -1}],
  },
});
