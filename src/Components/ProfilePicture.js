import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';

class ProfilePicture extends Component {
  render() {
    const {width, status, hash} = this.props;

    const EMOJI_PADDING = 5;

    const r = this.props.width / 2;
    const width_emoji = this.props.width / 4;
    const r_emoji = width_emoji / 2;

    const x = Math.cos(7 * Math.PI / 4) * r + r - r_emoji - EMOJI_PADDING / 2;
    const y = Math.sin(7 * Math.PI / 4) * r + r - r_emoji - EMOJI_PADDING / 2;

    return (
      <View>
        <View
          style={{
            width,
            height: width,
            borderRadius: width / 2,
            backgroundColor: 'rgb(224, 224, 224)',
            overflow: 'hidden',
            // borderColor: 'rgba(208, 208, 208, 0.5)',
            // borderWidth: 0.5,
          }}
        >
          {hash && (
            <Image
              style={{width: width, height: width}}
              source={{uri: `https://ogn.imgix.net/${hash}.jpg?w=${width * 2}&h=${width * 2}&fit=facearea&facepad=1.8`}}
            />
          )}
        </View>
        <Text
          style={{
            fontSize: width_emoji,
            padding: EMOJI_PADDING,
            position: 'absolute',
            bottom: y,
            left: x,
            textShadowColor: 'rgba(0, 0, 0, 0.3)',
            textShadowRadius: 4,
            textShadowOffset: {width: -1, height: 1},
          }}
        >
          {status}
        </Text>
      </View>
    );
  }
}

export default ProfilePicture;
