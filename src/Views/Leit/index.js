import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Platform,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import debounce from 'lodash.debounce';

import {ResultList, SearchBar} from './components';
import {Hero, TitleBar} from '../../Components';
import {mainReversed} from '../../Consts/gradients';

class Leit extends Component {
  constructor() {
    super();
    this.state = {
      searchBarValue: '',
      query: ''
    };
  }

  updateQuery = query => this.setState({query});
  updateQueryDebouced = debounce(this.updateQuery, 500, {maxWait: 500});

  updateSearch = query => {
    this.setState({searchBarValue: query});
    this.updateQueryDebouced(query);
  };

  render() {
    const {searchBarValue, query} = this.state;
    const {navigation} = this.props;
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{flex: 1}}>
          <Hero reverse gradient={mainReversed} />
          <SafeAreaView>
            <View style={styles.navbarDummy}>
              <Text style={styles.title}>Leit</Text>
            </View>
          </SafeAreaView>
          <TitleBar title="Leit" white />
          <SearchBar search={searchBarValue} onChangeText={this.updateSearch} />
          <ResultList
            search={query !== '' && query}
            onTap={id => navigation.navigate('Profile', {id})}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  navbarDummy: {
    zIndex: 10,
    ...Platform.select({
      android: {
        paddingTop: 25
      }
    }),
    marginTop: -50
  },
  title: {
    marginTop: 10,
    marginBottom: 10,
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
    fontStyle: 'italic',
    textAlign: 'center',
    opacity: 0
  }
});

export default Leit;
