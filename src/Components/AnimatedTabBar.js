import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Animated, SafeAreaView} from 'react-native';
import {withNavigation} from 'react-navigation';

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'white',
    elevation: 10,
    zIndex: 10,
  },
  tabBar: {
    flexDirection: 'row',
    shadowColor: 'black',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: {width: 0, height: -6},
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 15,
  },
  tabs: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '700',
    color: 'black',
  },
  line: {
    width: 180,
    height: 2,
    backgroundColor: 'black',
  },
});

class CampaignsTabBar extends React.Component {
  state = {
    layout: [],
  };

  handleLayout = (event, index) => {
    const layout = this.state.layout;
    layout[index] = event.nativeEvent.layout;

    this.setState({
      layout,
    });
  };

  getInterpolatedValues = () => {
    const {position, navigationState} = this.props;
    const inputRange = [...navigationState.routes.map((x, i) => i)];

    const layout = this.state.layout;

    if (!layout || (layout && layout.length !== inputRange.length)) return {};

    const width = position.interpolate(
      {
        inputRange,
        outputRange: inputRange.map(inputIndex => layout[inputIndex] && layout[inputIndex].width),
      },
      {useNativeDriver: true},
    );
    const marginLeft = position.interpolate(
      {
        inputRange,
        outputRange: inputRange.map(inputIndex => layout[inputIndex] && layout[inputIndex].x),
      },
      {useNativeDriver: true},
    );

    return {
      marginLeft,
      width,
    };
  };

  render() {
    const {navigationState, getLabel, jumpToIndex, position} = this.props;

    const inputRange = [-1, ...navigationState.routes.map((x, i) => i)];

    return (
      <SafeAreaView style={styles.root}>
        <View style={styles.tabs}>
          <View style={styles.tabBar}>
            {navigationState.routes.map((route, idx) => {
              // const activeTab = navigationState.index === idx;
              const outputRange = inputRange.map(inputIndex => (inputIndex === idx ? 1 : 0.3));
              const opacity = position.interpolate({inputRange, outputRange}, {useNativeDriver: true});

              return (
                <TouchableOpacity
                  key={route.key}
                  onPress={() => jumpToIndex(idx)}
                  onLayout={event => this.handleLayout(event, idx)}
                  hitSlop={{top: 50, bottom: 50, left: 5, right: 5}}
                  activeOpacity={0.9}
                >
                  <Animated.View style={[styles.tab, {opacity}]}>
                    <Text style={styles.tabText}>{getLabel({route}).toUpperCase()}</Text>
                  </Animated.View>
                </TouchableOpacity>
              );
            })}
          </View>
          {this.state.layout[navigationState.index] && (
            <Animated.View style={[styles.line, this.getInterpolatedValues()]} />
          )}
        </View>
      </SafeAreaView>
    );
  }
}

export default withNavigation(CampaignsTabBar);
