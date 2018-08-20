import React, {Component} from 'react';
import {
  KeyboardAvoidingView,
  Text,
  StyleSheet,
  Linking,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  View
} from 'react-native';

import {Button} from '../../../Components';

class FetchTimetable extends Component {
  state = {
    password: '',
    errors: null,
    loading: false
  };

  setPassword = password => this.setState({password});
  forgotPassword = () => Linking.openURL('https://inna.is/gleymt-lykilord');
  fetchTimetable = async () => {
    const {password} = this.state;
    const {fetchTimetable} = this.props;
    try {
      this.setState({loading: true, errors: null});
      await fetchTimetable(password);
    } catch (e) {
      const errors = e.graphQLErrors.map(({message}) => message);
      this.setState({errors});
    }
    this.setState({loading: false});
  };

  render() {
    const {password, loading, errors} = this.state;

    return (
      <KeyboardAvoidingView style={styles.root} enabled behavior="padding">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <Text style={styles.title}>Stundaskrá</Text>
            <Text style={styles.helper}>
              Þú getur sótt stundaskrána þína í Innu og fengið hana beint inn í
              anorak.
            </Text>
            <TextInput
              value={password}
              onChangeText={this.setPassword}
              secureTextEntry
              placeholder="Innulykilorð"
              style={styles.input}
            />
            <Button
              isActive={password !== ''}
              title="Áfram"
              onPress={this.fetchTimetable}
              loading={loading}
            />
            {errors &&
              errors.map(e => (
                <Text key={e} style={styles.error}>
                  {e}
                </Text>
              ))}

            <TouchableOpacity
              style={styles.forgotButton}
              onPress={this.forgotPassword}
            >
              <Text style={styles.forgot}>Ég man ekki lykilorðið mitt</Text>
            </TouchableOpacity>
            {/* <Text style={styles.disclaimer}>
              Lykilorðið þitt er aldrei geymt hjá anorak.
            </Text> */}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20
  },
  title: {
    fontSize: 26,
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: 10
  },
  helper: {
    color: 'rgb(144, 144, 144)',
    textAlign: 'center',
    fontSize: 15,
    lineHeight: 22,
    paddingRight: 20,
    paddingLeft: 20,
    marginBottom: 5
  },
  disclaimer: {
    color: 'rgb(207, 207, 207)',
    textAlign: 'center',
    fontSize: 15,
    lineHeight: 22,
    paddingRight: 20,
    paddingLeft: 20,
    marginTop: 30
  },
  input: {
    marginTop: 50,
    fontSize: 20,
    backgroundColor: 'white',
    borderRadius: 200,
    textAlign: 'center',
    padding: 15,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.1,
    shadowRadius: 13,
    elevation: 10,
    marginBottom: 20
  },
  error: {
    color: 'rgb(246, 121, 94)',
    marginTop: 10,
    fontWeight: '600',
    textAlign: 'center',
    padding: 15
  },
  forgot: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '500',
    color: 'rgb(191, 191, 191)'
  },
  forgotButton: {
    marginTop: 20
  }
});

export default FetchTimetable;
