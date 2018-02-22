import React, {Component} from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import {Camera, BlurView, ScreenOrientation} from 'expo';
import {Svg, Polygon} from 'react-native-svg';

const LeftSide = ({height}) => {
  const width = height * 0.4;
  return (
    <View>
      <Svg height={height} width={width}>
        <Polygon points={`0,0 ${width},0 ${width / 2},${height}, 0,${height}`} fill="orange" />
      </Svg>
    </View>
  );
};

class Skirteini extends Component {
  state = {
    height: null,
  };

  componentDidMount() {
    ScreenOrientation.allow(ScreenOrientation.Orientation.LANDSCAPE);
  }

  componentWillUnmount() {
    ScreenOrientation.allow(ScreenOrientation.Orientation.PORTRAIT);
  }

  saveHeight = event => {
    const height = event.nativeEvent.layout.height;
    this.setState({height});
  };

  render() {
    const {data} = this.props;
    const {height} = this.state;
    return (
      <View style={styles.root}>
        <Camera style={StyleSheet.absoluteFill} type={Camera.Constants.Type.back} />
        <BlurView style={styles.blur} tint="dark" intensity={100}>
          <SafeAreaView>
            <View style={styles.skirteini} onLayout={this.saveHeight}>
              {height && <LeftSide height={height} />}
            </View>
          </SafeAreaView>
        </BlurView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'white',
  },
  blur: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  skirteini: {
    flex: 1,
    margin: 20,
    aspectRatio: 1.586,
    backgroundColor: 'white',
    borderRadius: 15,
    shadowColor: 'black',
    shadowOffset: {width: -3, height: 0},
    shadowRadius: 10,
    shadowOpacity: 0.2,

    overflow: 'hidden',
  },
});
export default Skirteini;
