import React from 'react';
import { View, TouchableHighlight, Text, TextInput, Image, ScrollView, Switch } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import SegmentedControlTab from 'react-native-segmented-control-tab';

import styles from './styles';

export const ProfileView = ({ children }) => (
  <View style={styles.profileView}>
    {children}
  </View>
);

export const ProfileHeader = ({ onMenu, onSave, isSaveEnabled }) => (
  <View style={styles.profileHeader}>
    <Image source={require('../../resourses/background_profile.png')} style={styles.profileHeaderBackground}>
      <View style={styles.headerButtons}>
        <TouchableHighlight style={styles.menuButton} onPress={onMenu}>
          <Icon name="ios-menu-outline" size={30} color="white" />
        </TouchableHighlight>
        <TouchableHighlight style={styles.menuButton} onPress={onSave}>
          <Icon name="ios-checkmark-circle-outline" size={30} style={!isSaveEnabled && {opacity: 0.3}} color="white" />
        </TouchableHighlight>
      </View>
      <View style={styles.headerInfo}>
        <Image source={require('../../resourses/avatar.jpg')} style={styles.profileHeaderAvatar} />
        <Text style={styles.headerName}>Иванов Иван</Text>
      </View>
    </Image>
  </View>
);
