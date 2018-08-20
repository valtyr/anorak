import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  RefreshControl,
  Animated,
  SafeAreaView,
  Platform,
  StatusBar
} from 'react-native';
import {LinearGradient} from 'expo';

import {BackButton} from '../Components';

import {main} from '../Consts/gradients';

class Screen extends Component {
  constructor() {
    super();
    this.state = {
      scrollY: new Animated.Value(0)
    };
  }

  render() {
    const {
      title,
      gradient = main,
      children,
      light,
      onBack,
      onRefresh,
      refreshing
    } = this.props;

    return (
      <View style={styles.root}>
        {light ? (
          <StatusBar barStyle="dark-content" animated />
        ) : (
          <StatusBar barStyle="light-content" animated />
        )}
        <Animated.ScrollView
          onScroll={Animated.event([
            {nativeEvent: {contentOffset: {y: this.state.scrollY}}}
          ])}
          scrollEventThrottle={16}
          style={styles.scrollView}
          overScrollMode="always"
          refreshControl={
            onRefresh && (
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            )
          }
        >
          {children}
        </Animated.ScrollView>
        <Animated.View
          style={{
            shadowColor: 'rgba(0, 0, 0, 0.16)',
            shadowOffset: {width: 0, height: 2},
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            shadowRadius: 10,
            shadowOpacity: 1,
            opacity: this.state.scrollY.interpolate(
              {
                inputRange: [0, 30],
                outputRange: [0, 1]
              },
              {useNativeDriver: true}
            )
          }}
          pointerEvents="none"
        >
          <LinearGradient style={styles.navbar} {...gradient}>
            <SafeAreaView
              style={[
                styles.navbarContent,
                onBack && styles.navbarContentWithBackButton
              ]}
            >
              {onBack && (
                <Animated.View
                  style={{
                    opacity: this.state.scrollY.interpolate(
                      {
                        inputRange: [30, 50],
                        outputRange: [0, 1]
                      },
                      {useNativeDriver: true}
                    )
                  }}
                >
                  <BackButton labelVisible={false} onPress={onBack} grey />
                </Animated.View>
              )}
              <Text style={light ? styles.lightTitle : styles.title}>
                {title}
              </Text>
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
    flexGrow: 1,
    backgroundColor: 'white',
    flexDirection: 'column-reverse'
  },
  navbar: {
    zIndex: 10,
    ...Platform.select({
      android: {
        paddingTop: 25
      }
    })
  },
  navbarContent: {
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'center'
  },
  navbarContentWithBackButton: {
    marginRight: 30
  },
  scrollView: {
    flex: 1
  },
  title: {
    marginTop: 10,
    marginBottom: 10,
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
    // fontStyle: 'italic',
    textAlign: 'center',
    flex: 1
  },

  lightTitle: {
    marginTop: 10,
    marginBottom: 10,
    color: 'black',
    fontSize: 20,
    fontWeight: '500',
    // fontStyle: 'italic',
    textAlign: 'center',
    flex: 1
  }
});
export default Screen;
