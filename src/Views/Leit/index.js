import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import debounce from 'lodash.debounce';

import {Hero, ResultList, SearchBar} from './components';

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
        <SearchBar search={searchBarValue} onChangeText={this.updateSearch} />
        {query !== '' && <ResultList search={query} onTap={id => navigation.navigate('Profile', {id})} />}
      </View>
    );
  }
}

export default Leit;
