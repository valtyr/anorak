import React, {Component} from 'react';
import {
  KeyboardAvoidingView,
  TextInput,
  Text,
  ScrollView,
  View,
  StyleSheet,
  SafeAreaView,
  Keyboard,
} from 'react-native';
import {Button, TitleBar, Particles} from '../../../Components';

import NavBar from './NavBar';

import gql from 'graphql-tag';
import {graphql} from 'react-apollo';

class Code extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '',
      errors: undefined,
      loading: false,
    };
  }

  onCode = code => this.setState({code});

  checkCode = () => {
    const {code} = this.state;
    const {checkCode, navigation, kt} = this.props;
    Keyboard.dismiss();
    this.setState({loading: true});
    checkCode(kt, code)
      .then(({data}) => {
        this.setState({success: data, errors: null});
        if (data.checkAuthCode.ok) {
          const {token, user} = data.checkAuthCode;
          navigation.navigate('LoginSuccess', {token, user});
        }
      })
      .catch(error => {
        const errors = error.graphQLErrors.map(({message}) => message);
        this.setState({errors, success: null});
      })
      .finally(() => this.setState({loading: false}));
  };

  render() {
    const {code, errors, loading} = this.state;
    const {navigation} = this.props;
    return (
      <Particles>
        <SafeAreaView style={styles.root}>
          <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
            <View style={styles.content}>
              <NavBar title="Staðfestu kóða" onBack={() => navigation.goBack()} />
              <View style={styles.center}>
                <TextInput
                  autoFocus
                  style={styles.input}
                  keyboardType="numeric"
                  maxLength={6}
                  onChangeText={this.onCode}
                  placeholder="000000"
                  value={this.state.text}
                  underlineColorAndroid="transparent"
                />
                {errors ? (
                  errors.map((error, i) => (
                    <Text key={i} style={styles.error}>
                      {error}
                    </Text>
                  ))
                ) : (
                  <Text style={styles.explanation}>
                    Innan skamms færðu SMS með kóða. Stimplaðu hann inn hér að ofan til að ljúka innskráningu.
                  </Text>
                )}
              </View>
              <Button
                onPress={this.checkCode}
                isActive={code.length === 6 && !loading}
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

const CheckAuthCodeMutation = gql`
  mutation CheckAuthCodeMutation($ssn: String!, $code: String!) {
    checkAuthCode(ssn: $ssn, code: $code) {
      ok
      token
      user {
        id
        name
        imageHash
      }
    }
  }
`;

export default graphql(CheckAuthCodeMutation, {
  props: ({mutate}) => ({
    checkCode: (ssn, code) =>
      mutate({
        variables: {ssn, code},
      }),
  }),
})(Code);
