import React, {Component, PureComponent} from 'react';
import {View, Animated, Easing} from 'react-native';

import {Svg, Rect, Circle, Path} from 'react-native-svg';

const CircleParticle = ({color}) => (
  <Svg width="15" height="15" viewBox="0 0 60 60">
    <Circle cx="25" cy="25" r="20" fill="none" stroke={color || '#000000'} strokeWidth="12" />
  </Svg>
);

const TriangleParticle = ({color}) => (
  <Svg width="15" height="15" viewBox="0 0 60 60">
    <Path
      d="M23.221039,5.25568625 L37.2175541,29.1979786 C38.0537398,30.628349 37.5720579,32.4657557 36.1416874,33.3019414 C35.6823052,33.5704934 35.1597598,33.7120266 34.6276394,33.7120266 L6.63460908,33.7120266 C4.97775483,33.7120266 3.63460908,32.3688809 3.63460908,30.7120266 C3.63460908,30.1799062 3.77614234,29.6573608 4.04469431,29.1979786 L18.0412095,5.25568625 C18.8773951,3.82531582 20.7148019,3.34363389 22.1451723,4.17981955 C22.590288,4.4400314 22.9608271,4.81057057 23.221039,5.25568625 Z"
      fill="none"
      x="5"
      y="5"
      stroke={color || '#000000'}
      strokeWidth="12"
    />
  </Svg>
);

const SquareParticle = ({color}) => (
  <Svg width="15" height="15" viewBox="0 0 60 60">
    <Rect stroke={color || '#000000'} strokeWidth="12" x="7" y="7" width="36" height="36" rx="11" fill="none" />
  </Svg>
);

const PentagonParticle = ({color}) => (
  <Svg width="15" height="15" viewBox="0 0 60 60">
    <Path
      stroke={color || '#000000'}
      strokeWidth="12"
      x="5"
      y="5"
      d="M25.4355848,4.13525492 L39.0543909,14.0298967 C40.8068279,15.3031167 41.5401186,17.5599533 40.8707472,19.6200666 L35.6688262,35.6299334 C34.9994548,37.6900467 33.0796749,39.0848484 30.9135436,39.0848484 L14.0797736,39.0848484 C11.9136422,39.0848484 9.99386236,37.6900467 9.32449097,35.6299334 L4.12256994,19.6200666 C3.45319856,17.5599533 4.18648922,15.3031167 5.93892626,14.0298967 L19.5577323,4.13525492 C21.3101694,2.86203488 23.6831478,2.86203488 25.4355848,4.13525492 Z"
      fill="none"
    />
  </Svg>
);

const particleTypes = [SquareParticle, CircleParticle, PentagonParticle, TriangleParticle];

class Particle extends PureComponent {
  constructor(props) {
    super(props);

    const {parentWidth, parentHeight} = props;

    const pixelsPerSecond = 10 / 1000;

    this.originalPosition = {
      x: parentWidth * Math.random(),
      y: parentHeight * Math.random(),
    };
    this.rotation = Math.random() * 0.5;
    this.opacity = 0.03 + 0.03 * Math.random();
    this.lifetime = 5000 + 5000 * Math.random();
    this.distanceX = pixelsPerSecond * this.lifetime * (2 * Math.random() - 1);
    this.distanceY = pixelsPerSecond * this.lifetime * (2 * Math.random() - 1);

    this.particleType = particleTypes[Math.floor(Math.random() * particleTypes.length)];
  }

  state = {
    scale: new Animated.Value(0),
    rotation: new Animated.Value(0.5 * Math.random()),
    y: new Animated.Value(0),
    x: new Animated.Value(0),
  };

  onDeath = () => {
    const {onDeath, timestamp} = this.props;
    onDeath(timestamp);
  };

  componentDidMount() {
    Animated.parallel([
      Animated.sequence([
        Animated.spring(this.state.scale, {toValue: 1, useNativeDriver: true}),
        Animated.spring(this.state.scale, {
          toValue: 0,
          delay: this.lifetime - 2000,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(this.state.y, {
        toValue: this.distanceY,
        duration: this.lifetime,
        useNativeDriver: true,
        easing: Easing.in(),
      }),
      Animated.timing(this.state.x, {
        toValue: this.distanceX,
        duration: this.lifetime,
        useNativeDriver: true,
        easing: Easing.in(),
      }),
      Animated.timing(this.state.rotation, {toValue: this.rotation, duration: this.lifetime, useNativeDriver: true}),
    ]).start(this.onDeath);
  }

  render() {
    const {scale, rotation, y, x} = this.state;
    const {particleColor} = this.props;

    return (
      <Animated.View
        style={{
          position: 'absolute',
          left: this.originalPosition.x,
          bottom: this.originalPosition.y,
          opacity: this.opacity,
          transform: [
            {translateY: y},
            {translateX: x},
            {scale},
            {rotate: rotation.interpolate({inputRange: [0, 1], outputRange: ['0deg', '360deg']})},
          ],
        }}
      >
        <this.particleType color={particleColor} />
      </Animated.View>
    );
  }
}

class Particles extends Component {
  state = {
    width: null,
    height: null,
    particles: [],
  };

  onLayout = ({nativeEvent: {layout}}) => {
    const {width, height} = layout;
    const {spawnInterval} = this.props;
    this.setState({width, height});

    if (this.interval) clearInterval(this.interval);
    this.interval = setInterval(this.createParticle, spawnInterval || 800);
    this.createParticle();
  };

  createParticle = () => {
    const timestamp = Date.now();
    const particles = this.state.particles.splice(0);
    particles.push(timestamp);
    this.setState({particles});
  };

  removeParticle = timestamp => {
    const {particles} = this.state;
    this.setState({
      particles: particles.filter(p => p !== timestamp),
    });
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const {children, backgroundColor, particleColor} = this.props;
    const {particles, width, height} = this.state;

    return (
      <View style={{flex: 1, backgroundColor}} onLayout={this.onLayout}>
        {particles.map(timestamp => (
          <Particle
            key={timestamp}
            parentHeight={height}
            parentWidth={width}
            particleColor={particleColor}
            timestamp={timestamp}
            onDeath={this.removeParticle}
          />
        ))}
        {children}
      </View>
    );
  }
}

export default Particles;
