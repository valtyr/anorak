import React, {Component} from 'react';
import {Image, LayoutAnimation} from 'react-native';

class AutoImage extends Component {
  state = {
    aspectRatio: 2
  };

  loadAspectRatio = () => {
    const {uri} = this.props;
    Image.getSize(uri, (width, height) => {
      const aspectRatio = width / height;
      this.setState({aspectRatio});
    });
  };

  componentWillMount() {
    this.loadAspectRatio();
  }

  componentDidUpdate(oldProps) {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    const {uri} = this.props;
    const oldUri = oldProps.uri;

    if (uri !== oldUri) {
      this.loadAspectRatio();
    }
  }

  render() {
    const {uri} = this.props;
    const {aspectRatio} = this.state;
    return (
      <Image
        source={{uri}}
        style={{aspectRatio, backgroundColor: 'rgb(235, 235, 235)'}}
      />
    );
  }
}

export default AutoImage;
