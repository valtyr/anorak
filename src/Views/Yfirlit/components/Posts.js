import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

const Posts = ({posts, onPress}) => {
  return (
    <View style={style.root}>
      <Text style={style.heading}>Fréttir</Text>
      {posts &&
        posts.map(post => {
          const excerpt = post.body && post.body.substring(0, 100);
          const excerptWithEllipsis =
            excerpt === post.body ? excerpt : `${excerpt}...`;

          return (
            <TouchableOpacity
              key={post.id}
              onPress={() => onPress(post.id)}
              style={style.post}
            >
              <Image
                style={style.image}
                source={{
                  uri: `https://ogn.imgix.net/schoolicons/${
                    post.school.code
                  }.png`
                }}
              />
              <View style={style.text}>
                <View style={style.titleContainer}>
                  <Text style={style.title}>{post.name}</Text>
                  {post.published === false && (
                    <View style={style.unpublished} />
                  )}
                </View>
                <View style={style.separator} />
                <Text style={style.excerpt}>{excerptWithEllipsis}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
    </View>
  );
};

const style = StyleSheet.create({
  root: {
    marginTop: 15
  },
  post: {
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 15
  },
  heading: {
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 15
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    fontWeight: '500'
  },
  unpublished: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: 'rgb(245, 87, 53)',
    marginLeft: 5
  },
  text: {
    flex: 1,
    marginLeft: 10
  },
  excerpt: {
    color: 'rgb(145, 145, 145)'
  },
  separator: {
    width: 30,
    height: 1,
    backgroundColor: 'rgb(237, 237, 237)',
    marginTop: 5,
    marginBottom: 5
  }
});

export default Posts;
