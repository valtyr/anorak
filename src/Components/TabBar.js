import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, SafeAreaView} from 'react-native';
// import {SafeAreaView} from 'react-native-safe-area-view';

const Tab = ({title, active, onPress}) => (
  <TouchableOpacity style={style.tab} onPress={onPress}>
    <View style={active && style.underline}>
      <Text style={!active ? style.tabTitle : style.tabTitleActive}>{title}</Text>
    </View>
  </TouchableOpacity>
);

const TabBar = ({navigation}) => {
  const {routes, index} = navigation.state;
  return (
    <SafeAreaView style={style.root}>
      <View style={style.tabBar}>
        {routes.map((route, i) => (
          <Tab
            title={route.routeName}
            key={i}
            active={i === index}
            onPress={() => navigation.navigate(route.routeName)}
          />
        ))}
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  root: {
    backgroundColor: 'white',
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
  },
  tab: {
    paddingTop: 15,
    paddingBottom: 15,
  },
  tabTitle: {
    color: '#999999',
  },
  underline: {
    borderBottomWidth: 2,
    borderBottomColor: 'black',
  },
  tabTitleActive: {
    backgroundColor: 'transparent',
    fontWeight: '600',
  },
});

export default TabBar;
