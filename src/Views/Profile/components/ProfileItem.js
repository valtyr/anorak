import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {MaterialCommunityIcons, MaterialIcons, FontAwesome, Entypo} from '@expo/vector-icons';

const iconProps = {
  color: '#DCDAEE',
  size: 25,
};

const getIcon = icon => {
  switch (icon) {
    case 'phone':
      return <FontAwesome name="phone" {...iconProps} />;
    case 'address':
      return <MaterialCommunityIcons name="home" {...iconProps} />;
    case 'snapchat':
      return <FontAwesome name="snapchat-ghost" {...iconProps} />;
    case 'birthday':
      return <MaterialIcons name="cake" {...iconProps} />;
    case 'instagram':
      return <FontAwesome name="instagram" {...iconProps} />;
    case 'messenger':
      return <MaterialCommunityIcons name="facebook-messenger" {...iconProps} />;
    default:
      return null;
  }
};

const ProfileItem = ({title, content, icon, onPress, iconComponent, chevron}) => (
  <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
    <View style={styles.root}>
      <View style={styles.icon}>{iconComponent ? iconComponent() : getIcon(icon)}</View>
      <View style={styles.right}>
        <Text style={styles.title}>{title && title.toUpperCase()}</Text>
        <View style={styles.contentContainer}>
          <Text style={styles.content}>{content}</Text>
        </View>
      </View>
      <View style={styles.secondary}>{chevron && <Entypo name="chevron-right" {...iconProps} />}</View>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  root: {
    marginBottom: 20,
    flexDirection: 'row',
  },
  right: {
    flexDirection: 'column',
    marginTop: 5,
  },
  icon: {
    paddingTop: 20,
    width: 25,
    alignItems: 'flex-start',
  },
  title: {
    color: '#DCDAEE',
    fontSize: 12,
    fontWeight: '800',
    fontStyle: 'italic',
    marginLeft: 15,
  },
  content: {
    marginLeft: 15,
    fontSize: 18,
    lineHeight: 25,
  },
  secondary: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
});
export default ProfileItem;
