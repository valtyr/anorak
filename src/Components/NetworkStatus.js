import React, {Component} from 'react';
import {View, Text, NetInfo, StyleSheet} from 'react-native';

import Particles from './Particles';

class NetworkStatus extends Component {
  state = {
    networkStatus: null
  };

  getNetworkStatus = async () => {
    const {type: networkStatus} = await NetInfo.getConnectionInfo();
    this.setState({networkStatus});
  };

  handleStatusChange = ({type: networkStatus}) => {
    this.setState({networkStatus});
  };

  componentDidMount() {
    this.getNetworkStatus();
    NetInfo.addEventListener('connectionChange', this.handleStatusChange);
  }

  render() {
    const {networkStatus} = this.state;
    const {children} = this.props;
    if (networkStatus === 'none') {
      return (
        <Particles>
          <View style={styles.root}>
            <Text style={styles.heading}>Engin nettenging</Text>
            <Text style={styles.explanation}>
              Þú þarft að tengjast netinu til að nota anorak
            </Text>
          </View>
        </Particles>
      );
    }
    return children;
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  heading: {
    fontSize: 23,
    fontWeight: '600',
    marginBottom: 15,
    color: 'rgb(212, 212, 212)'
  },
  explanation: {
    paddingLeft: 20,
    paddingRight: 20
  }
});

export default NetworkStatus;
