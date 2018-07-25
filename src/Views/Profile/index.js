import React, {Component} from 'react';
import {View, Text, ScrollView, StyleSheet, Image, Linking} from 'react-native';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';

import formatBirthday from '../../Helpers/formatBirthday';
import formatPhoneNumber from '../../Helpers/formatPhoneNumber';
import {edgeToNode} from '../../Helpers/graphql';

import {ProfilePicture, Grid, Screen, TitleBar} from '../../Components';
import {blue} from '../../Consts/gradients';
import {Hero, ProfileItem, NameAndGroup, Bitmoji, CurrentPeriod} from './components';

class Profile extends Component {
  render() {
    const {data, navigation} = this.props;

    const user = data.user;
    const formattedBirthday = () => formatBirthday(user.birthday);
    const formattedPhone = () => formatPhoneNumber(user.phone.number);
    const phoneUrl = () =>
      user.phone.countryCode ? `tel:+${user.phone.countryCode}${user.phone.number}` : `tel:${user.phone.number}`;
    const groupMates = edgeToNode(data.groupMates);

    return (
      <Screen title={user && user.name.split(' ')[0]} gradient={blue}>
        <Hero profileImageHash={user && user.imageHash} status={user && user.status} />
        {user && (
          <View style={style.userInfo}>
            <NameAndGroup name={user.name} group={user.group} />
            {user.timetable && <CurrentPeriod period={user.timetable.currentPeriod} />}
            <ProfileItem
              title="Farsími"
              content={formattedPhone()}
              icon="phone"
              onPress={() => Linking.openURL(phoneUrl())}
              chevron
            />
            <ProfileItem
              title="Heimilsfang"
              content={`${user.address},\n${user.postcode} ${user.city}`}
              icon="address"
              chevron
            />
            {user.snapchatUsername && (
              <ProfileItem
                title="Snapchat"
                content={`@${user.snapchatUsername}`}
                iconComponent={() => <Bitmoji size={30} username={user.snapchatUsername} />}
                onPress={() => Linking.openURL(`https://www.snapchat.com/add/${user.snapchatUsername}`)}
                chevron
              />
            )}
            {user.facebookUsername && (
              <ProfileItem
                title="Facebook Messenger"
                content={`@${user.facebookUsername}`}
                icon="messenger"
                onPress={() => Linking.openURL(`https://www.m.me/${user.facebookUsername}`)}
              />
            )}
            {user.instagramUsername && (
              <ProfileItem
                title="Instagram"
                content={`@${user.instagramUsername}`}
                icon="instagram"
                onPress={() => Linking.openURL(`https://instagram.com/${user.instagramUsername}`)}
              />
            )}
            <ProfileItem title="Afmæli" content={formattedBirthday()} icon="birthday" />

            {/* {groupMates && (
                <Grid
                  data={groupMates}
                  minWidth={75}
                  render={(i, width) => {
                    return (
                      <View style={{flex: 1, alignItems: 'center', marginBottom: 10}}>
                        <ProfilePicture hash={i.hash} width={width - 10} />
                      </View>
                    );
                  }}
                />
              )} */}
          </View>
        )}
      </Screen>
    );
  }
}

const style = StyleSheet.create({
  userInfo: {
    paddingLeft: 25,
    paddingRight: 25,
    marginBottom: 50,
  },
  bitmoji: {
    height: 35,
    width: 35,
    transform: [{rotate: '10deg'}],
    marginTop: -5,
  },
});

const ProfileQuery = gql`
  query ProfileQuery($id: UUID!) {
    user(id: $id) {
      name
      birthday
      group
      age
      address
      city
      postcode
      imageHash
      status
      snapchatUsername
      facebookUsername
      instagramUsername
      phone {
        number
        countrycode
      }
      timetable {
        currentPeriod {
          title
          startTime
          endTime
          classroom
        }
      }
    }
    groupMates(id: $id) {
      edges {
        node {
          id
          name
          imageHash
        }
      }
    }
  }
`;

export default graphql(ProfileQuery, {
  options: ({navigation}) => ({
    variables: {
      id: navigation.state.params.id,
    },
  }),
})(Profile);
