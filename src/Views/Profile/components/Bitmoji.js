import React, {Component} from 'react';
import {Animated, LayoutAnimation} from 'react-native';
import {FontAwesome} from '@expo/vector-icons';

import getBitmoji from '../../../Helpers/getBitmoji';

const iconProps = {
  color: '#DCDAEE',
  size: 25,
};

class Bitmoji extends Component {
  constructor() {
    super();
    this.state = {
      animation: new Animated.Value(0),
    };
  }

  componentDidMount() {
    const {username} = this.props;
    if (username) {
      getBitmoji(username).then(bitmojiUri => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
        this.setState({bitmojiUri});
      });
    }
  }

  fadeIn = () =>
    Animated.timing(this.state.animation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

  render() {
    const {size} = this.props;
    const {bitmojiUri} = this.state;
    if (!bitmojiUri) return <FontAwesome name="snapchat-ghost" {...iconProps} />;

    return (
      <Animated.View style={{opacity: this.state.animation, paddingTop: 5}}>
        <Animated.Image
          style={{
            height: size,
            width: size,
            marginLeft: -2,
            marginTop: -5,
          }}
          source={{uri: bitmojiUri}}
          onLoad={this.fadeIn}
        />
      </Animated.View>
    );
  }
}

export default Bitmoji;
