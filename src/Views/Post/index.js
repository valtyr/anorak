import React from 'react';
import {Text, StyleSheet, View, Image} from 'react-native';

import Hyperlink from 'react-native-hyperlink';
import {momentFormatter} from '../../Helpers/formatters';

import {graphql} from 'react-apollo';
import gql from 'graphql-tag';

import {Screen, NavBar, AutoImage, Pinwheel} from '../../Components';
import {light} from '../../Consts/gradients';

const Post = ({data, navigation}) => {
  if (!data.post)
    return (
      <Screen gradient={light} light>
        <Pinwheel />
      </Screen>
    );

  const {post} = data;

  const formattedDate = momentFormatter(post.addedOn).calendar();

  return (
    <Screen
      title={post.name}
      gradient={light}
      light
      onBack={() => navigation.goBack()}
      topPadding
    >
      {post.photoUrl && <AutoImage uri={post.photoUrl} />}
      <View style={styles.content}>
        <Text style={[styles.title, post.photoUrl && {textAlign: 'left'}]}>
          {post.name}
        </Text>
        {post.published === false && (
          <View
            style={[
              styles.unpublished,
              post.photoUrl && {justifyContent: 'flex-start'}
            ]}
          >
            <View style={styles.unpublishedDot} />
            <Text style={styles.unpublishedText}>
              Ekki sýnilegt almennum notendum
            </Text>
          </View>
        )}
        <View style={styles.schoolInfo}>
          <Image
            style={styles.image}
            source={{
              uri: `https://ogn.imgix.net/schoolicons/${post.school.code}.png`
            }}
          />
          <View style={styles.schoolText}>
            <Text style={styles.organizationName}>
              {post.school && post.school.organizationName}
            </Text>
            <Text style={styles.postDate}>{formattedDate}</Text>
          </View>
        </View>
        <Hyperlink linkDefault={true} linkStyle={{color: '#da8846'}}>
          <Text style={styles.body}>{post.body}</Text>
        </Hyperlink>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    fontWeight: '600',
    textAlign: 'center'
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20
  },
  body: {
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 50
  },
  content: {
    padding: 20
  },
  schoolInfo: {
    marginTop: 25,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 22
  },
  schoolText: {
    marginLeft: 10
  },
  organizationName: {
    fontWeight: '600'
  },
  postDate: {
    color: 'rgb(166, 166, 166)'
  },
  unpublished: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10
  },
  unpublishedText: {
    color: 'rgb(245, 87, 53)'
  },
  unpublishedDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: 'rgb(245, 87, 53)',
    marginRight: 5
  }
});

const PostQuery = gql`
  query postQuery($id: UUID!) {
    post(id: $id) {
      id
      name
      body
      addedOn
      photoUrl
      published
      school {
        id
        organizationName
        code
      }
    }
  }
`;

export default graphql(PostQuery, {
  options: ({navigation}) => ({
    variables: {
      id: navigation.state.params.id
    }
  })
})(Post);
