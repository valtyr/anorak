import React from 'react';
import {View, TextInput, StyleSheet, TouchableOpacity, Text} from 'react-native';

import {MaterialCommunityIcons} from '@expo/vector-icons';

import {SearchIcon} from '../../../Icons';

const SearchBar = ({search, onChangeText}) => {
  return (
    <View style={style.root}>
      <View style={style.barContainer}>
        <View style={style.icon}>
          <SearchIcon />
        </View>
        <TextInput
          autoCorrect={false}
          value={search}
          onChangeText={onChangeText}
          underlineColorAndroid="transparent"
          placeholder="Leit"
          style={style.input}
          hitSlop={{top: 50, bottom: 50}}
        />
        {search !== '' &&
          search && (
            <TouchableOpacity style={style.closeButton} onPress={() => onChangeText('')}>
              <MaterialCommunityIcons name="close-circle" size={20} color="rgb(228, 228, 228)" />
            </TouchableOpacity>
          )}
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  root: {
    position: 'relative',
    zIndex: 10,
  },
  barContainer: {
    paddingRight: 15,
    paddingLeft: 15,
    borderRadius: 7,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.15,
    shadowRadius: 13,
    flexDirection: 'row',
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    alignItems: 'center',
    elevation: 10,
    backgroundColor: 'white',
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 17,
    height: 50,
    backgroundColor: 'white',
  },
  icon: {
    width: 20,
    height: 20,
  },
});

export default SearchBar;
