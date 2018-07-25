import React from 'react';
import {FlatList, View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {LinearGradient} from 'expo';

import {imageVignette} from '../../../Consts/gradients';

const Event = ({event, index, onPress}) => (
  <View style={[style.itemWrapper, index === 0 && style.first]}>
    <TouchableOpacity style={style.item} activeOpacity={0.6} onPress={onPress}>
      <Image source={{uri: event.img}} height={120} width={120} style={style.image} />
      <LinearGradient {...imageVignette} style={style.vignette} />
      <Text style={style.title}>{event.name}</Text>
    </TouchableOpacity>
  </View>
);

const Events = ({onPress}) => (
  <View>
    <Text style={style.heading}>Viðburðir</Text>
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={[
        {name: 'Árshátíð Framtíðarinnar', id: 1, img: 'http://ogn.imgix.net/aron.png'},
        {
          name: 'Sumarferð Skólafélagsins',
          id: 2,
          img:
            'https://res.cloudinary.com/jerrick/image/upload/f_auto,fl_progressive,q_auto,c_fit,w_1140/uyzsg5vkrtqf1wyupzqz',
        },
        {
          name: 'Miðannarball Framtíðarinnar',
          id: 3,
          img:
            'https://bizbash-production.imgix.net/content/editorial/storyimg/big/jan2017_daybreakers_kkb_8315.jpg?auto=format',
        },
      ]}
      keyExtractor={e => e.id}
      renderItem={event => <Event event={event.item} index={event.index} onPress={onPress} />}
      style={style.list}
    />
  </View>
);

const style = StyleSheet.create({
  itemWrapper: {
    width: 170,
    backgroundColor: 'transparent',
  },
  heading: {
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  list: {
    // paddingRight: 80,
    // paddingLeft: 20,
    marginBottom: 10,
  },
  item: {
    height: 150,
    width: 150,
    backgroundColor: 'rgb(240, 240, 240)',
    borderRadius: 7,
    overflow: 'hidden',
    marginBottom: 20,
  },
  first: {
    width: 190,
    paddingLeft: 20,
    marginLeft: 0,
  },
  title: {
    backgroundColor: 'transparent',
    color: 'white',
    position: 'absolute',
    bottom: 7,
    left: 7,
    right: 7,
    fontSize: 16,
    fontWeight: '600',
    shadowColor: 'black',
    shadowOpacity: 0.6,
    shadowOffset: {width: 0, height: 2},
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  vignette: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    height: 46,
  },
});

export default Events;
