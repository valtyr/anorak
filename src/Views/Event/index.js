import React from 'react';
import {View, Text, StyleSheet, Image, SafeAreaView} from 'react-native';

import {Screen, Button} from '../../Components';
import {light} from '../../Consts/gradients';

const dummyEvent = {
  title: 'Árshátíð Framtíðarinnar',
  image: 'http://ogn.imgix.net/aron.png',
  location: 'Gullhömrum',
  date: '14. febrúar',
  content: [
    {id: 1, type: 'tagline', content: 'Árshátíð Framtíðarinnar verður haldin hátíðleg 120. skiptið í Gullhömrum í ár!'},
    {id: 2, type: 'subheading', content: 'Fram koma:'},
    {id: 3, type: 'text', content: '☞ Hildur\n☛ Joey Christ\n☛ Leoncie\n☛ DJ MuscleBoy.'},
    {
      id: 4,
      type: 'text',
      content: 'Undirbúið ykkur fyrir veislu aldarinnar með öllu tilheyrandi og mestu bombuviku sem MR hefur upplifað.',
    },
    {
      id: 5,
      type: 'text',
      content: 'Náið ykkur í miða áður en þeir seljast upp.',
    },
  ],
};

const Tagline = ({content}) => (
  <View style={styles.baseItem}>
    <Text style={styles.tagline}>{content}</Text>
  </View>
);
const Subheading = ({content}) => (
  <View style={styles.baseItem}>
    <Text style={styles.subheading}>{content}</Text>
  </View>
);
const TextItem = ({content}) => (
  <View style={styles.baseItem}>
    <Text style={styles.textItem}>{content}</Text>
  </View>
);

const renderItem = item => {
  switch (item.type) {
    case 'tagline':
      return <Tagline key={item.id} content={item.content} />;
    case 'subheading':
      return <Subheading key={item.id} content={item.content} />;
    case 'text':
      return <TextItem key={item.id} content={item.content} />;
    default:
      return null;
  }
};

const Event = ({event = dummyEvent}) => (
  <Screen title="Árshátíð Framtíðarinnar" gradient={light} light>
    <Image style={styles.image} source={{uri: 'http://ogn.imgix.net/aron.png'}} />
    <View style={styles.root}>
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.date}>
        {event.date} – {event.location}
      </Text>
      <View style={styles.content}>{event.content.map(renderItem)}</View>
      <Button onPress={() => {}} title="Kaupa miða" />
    </View>
  </Screen>
);

const styles = StyleSheet.create({
  root: {
    padding: 20,
  },
  image: {
    aspectRatio: 1,
    alignSelf: 'stretch',
  },
  title: {
    fontSize: 25,
    fontWeight: '600',
  },
  date: {
    fontSize: 20,
    color: 'rgb(117, 117, 117)',
    marginBottom: 30,
  },
  textItem: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 20,
  },
  baseItem: {},
  tagline: {
    fontSize: 18,
    color: 'rgb(56, 56, 56)',
    fontWeight: '600',
    lineHeight: 25,
    marginBottom: 20,
  },
  subheading: {
    fontSize: 18,
    fontWeight: '600',
    color: 'rgb(144, 144, 144)',
    marginBottom: 5,
  },
  content: {
    marginBottom: 30,
  },
});
export default Event;

const desc =
  'Árshátíð Framtíðarinnar verður haldin hátíðleg 120. skiptið í Gullhömrum í ár!\n\nFram koma:\n☞ Hildur\n☛ Joey Christ\n☛ Leoncie\n☛ DJ MuscleBoy.\n\nNáið ykkur í miða áður en þeir seljast upp!';
