import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView, Animated, SafeAreaView, Platform} from 'react-native';
import {LinearGradient} from 'expo';

import {main} from '../Consts/gradients';

class Screen extends Component {
  constructor() {
    super();
    this.state = {
      scrollY: new Animated.Value(0),
    };
  }

  render() {
    const {title, gradient = main, children} = this.props;

    return (
      <View style={styles.root}>
        <Animated.ScrollView
          onScroll={Animated.event([{nativeEvent: {contentOffset: {y: this.state.scrollY}}}])}
          scrollEventThrottle={16}
          style={styles.scrollView}
        >
          {children}
        </Animated.ScrollView>
        <Animated.View
          style={{
            shadowColor: 'rgba(0, 0, 0, 0.16)',
            shadowOffset: {width: 0, height: 2},
            shadowRadius: 10,
            shadowOpacity: this.state.scrollY.interpolate({
              inputRange: [0, 30],
              outputRange: [0, 1],
            }),
          }}
        >
          <LinearGradient style={styles.navbar} {...gradient}>
            <SafeAreaView>
              <Animated.Text
                style={[
                  styles.title,
                  {
                    opacity: this.state.scrollY.interpolate({
                      inputRange: [0, 30],
                      outputRange: [0, 1],
                    }),
                  },
                ]}
              >
                {title}
              </Animated.Text>
            </SafeAreaView>
          </LinearGradient>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column-reverse',
  },
  navbar: {
    zIndex: 10,
    ...Platform.select({
      android: {
        paddingTop: 25,
      },
    }),
  },
  scrollView: {
    flex: 1,
  },
  title: {
    marginTop: 10,
    marginBottom: 10,
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
    fontStyle: 'italic',
    textAlign: 'center',
  },
});
export default Screen;
