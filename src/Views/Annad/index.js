import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {Screen, ProfilePicture, Hero} from '../../Components';
import {NameAndGroup, Item} from './components';
import {mainReversed} from '../../Consts/gradients';

import {Entypo, MaterialCommunityIcons, Ionicons} from '@expo/vector-icons';

import gql from 'graphql-tag';
import {graphql} from 'react-apollo';

const iconProps = {color: 'rgb(223, 223, 223)', size: 20};

const Annad = ({data, navigation}) => (
  <Screen style={styles.root} gradient={mainReversed} title="Annað">
    <Hero reverse gradient={mainReversed} />
    <View style={styles.profile}>
      <ProfilePicture
        hash={data.currentUser && data.currentUser.imageHash}
        width={130}
        status={data.currentUser && data.currentUser.status}
      />
      <NameAndGroup
        name={data.currentUser && data.currentUser.name}
        group={data.currentUser && data.currentUser.group}
      />
    </View>

    <View style={styles.items}>
      <Item icon={<MaterialCommunityIcons {...iconProps} name="account-edit" />} title="Mínar upplýsingar" />
      <Item
        icon={<Entypo {...iconProps} name="credit-card" />}
        title="Skírteinið mitt"
        onPress={() => navigation.navigate('Skirteini')}
      />
      <Item icon={<Ionicons {...iconProps} name="md-pricetag" />} title="Afslættir" />
    </View>
  </Screen>
);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'white',
  },
  profile: {
    alignItems: 'center',
  },
  items: {
    padding: 20,
  },
});

const AnnadQuery = gql`
  query {
    currentUser {
      id
      imageHash
      name
      status
      group
    }
  }
`;

export default graphql(AnnadQuery)(Annad);
