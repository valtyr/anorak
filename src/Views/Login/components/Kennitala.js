import React, {Component} from 'react';
import {KeyboardAvoidingView, TextInput, Text, View, StyleSheet, SafeAreaView, Keyboard, StatusBar} from 'react-native';
import {Button, TitleBar, Particles, BackButton} from '../../../Components';

import gql from 'graphql-tag';
import {graphql} from 'react-apollo';

import NavBar from './NavBar';

class Kennitala extends Component {
  constructor(props) {
    super(props);
    this.state = {
      kt: '',
      errors: undefined,
      loading: false,
    };
  }

  onKt = kt => this.setState({kt});
  ktIsValid = kt => {
    const str = String(kt);
    if (str.length !== 10) return false;
    const s = i => Number(str[i]);
    const sum = 3 * s(0) + 2 * s(1) + 7 * s(2) + 6 * s(3) + 5 * s(4) + 4 * s(5) + 3 * s(6) + 2 * s(7);
    const mod = sum % 11;
    const c = mod === 0 ? 0 : 11 - mod;
    return c === Number(str[8]);
  };

  sendSms = () => {
    const {kt} = this.state;
    const {sendSms, navigation} = this.props;
    Keyboard.dismiss();
    this.setState({loading: true});
    sendSms(kt)
      .then(({data}) => {
        this.setState({success: data, errors: null});
        if (data.sendAuthSms.ok) {
          navigation.navigate('LoginCode', {kt});
        }
      })
      .catch(error => {
        const errors = error.graphQLErrors.map(({message}) => message);
        this.setState({errors, success: null});
      })
      .finally(() => this.setState({loading: false}));
  };

  render() {
    const {kt, errors, loading} = this.state;
    const {navigation} = this.props;
    return (
      <Particles>
        <SafeAreaView style={styles.root}>
          <StatusBar barStyle="dark-content" />
          <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
            <View style={styles.content}>
              <NavBar title="Skráðu þig inn" onBack={() => navigation.goBack()} />
              <View style={styles.center}>
                <TextInput
                  autoFocus
                  style={styles.input}
                  keyboardType="numeric"
                  maxLength={10}
                  value={kt}
                  onChangeText={this.onKt}
                  underlineColorAndroid="transparent"
                  placeholder="Kennitala"
                />
                {errors ? (
                  errors.map((error, i) => (
                    <Text key={i} style={styles.error}>
                      {error}
                    </Text>
                  ))
                ) : (
                  <Text style={styles.explanation}>Þegar þú ýtir á áfram færðu sent SMS með innskráningarkóða.</Text>
                )}
              </View>
              <Button
                onPress={this.sendSms}
                isActive={this.ktIsValid(kt) && !loading}
                title={!loading ? 'Áfram' : 'Hleður...'}
                loading={loading}
              />
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </Particles>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    padding: 15,
  },
  explanation: {
    color: 'rgb(191, 191, 191)',
    marginTop: 10,
    padding: 10,
    textAlign: 'center',
    fontSize: 14,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    fontSize: 20,
    backgroundColor: 'white',
    borderRadius: 200,
    textAlign: 'center',
    padding: 15,
  },
  error: {
    color: 'rgb(246, 121, 94)',
    marginTop: 10,
    fontWeight: '600',
    textAlign: 'center',
    padding: 15,
  },
});

const SendSMSMutation = gql`
  mutation SendSMSMutation($ssn: String!) {
    sendAuthSms(ssn: $ssn) {
      ok
    }
  }
`;

export default graphql(SendSMSMutation, {
  props: ({mutate}) => ({
    sendSms: ssn =>
      mutate({
        variables: {ssn},
      }),
  }),
})(Kennitala);
