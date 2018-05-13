import React, {Component} from 'react';
import {View, StyleSheet, Platform, Text, SafeAreaView} from 'react-native';
import debounce from 'lodash.debounce';

import {ResultList, SearchBar} from './components';
import {Hero, TitleBar} from '../../Components';
import {mainReversed} from '../../Consts/gradients';

class Leit extends Component {
  constructor() {
    super();
    this.state = {
      searchBarValue: '',
      query: '',
    };
  }

  updateQuery = query => this.setState({query});
  updateQueryDebouced = debounce(this.updateQuery, 200, {maxWait: 200});

  updateSearch = query => {
    this.setState({searchBarValue: query});
    this.updateQueryDebouced(query);
  };

  render() {
    const {searchBarValue, query} = this.state;
    const {navigation} = this.props;
    return (
      <View style={{flex: 1}}>
        <SafeAreaView>
          <View style={styles.navbarDummy}>
            <Text style={styles.title}>Leit</Text>
          </View>
        </SafeAreaView>
        <Hero noVerticalFill reverse gradient={mainReversed} />
        <TitleBar title="Leit" white />
        <SearchBar search={searchBarValue} onChangeText={this.updateSearch} />
        <ResultList search={query !== '' && query} onTap={id => navigation.navigate('Profile', {id})} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  navbarDummy: {
    zIndex: 10,
    ...Platform.select({
      android: {
        paddingTop: 25,
      },
    }),
  },
  title: {
    marginTop: 10,
    marginBottom: 10,
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
    fontStyle: 'italic',
    textAlign: 'center',
    opacity: 0,
  },
});

export default Leit;
