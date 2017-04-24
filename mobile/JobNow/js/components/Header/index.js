import React from 'react';
import { View, TouchableHighlight, Text, TextInput, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from './styles';

export const Header = ({ title, onLeft }) => (
  <View style={styles.header}>
    <TouchableHighlight style={styles.leftButton} onPress={Actions.pop}>
      <Icon name="ios-arrow-round-back-outline" size={48} color="white" />
    </TouchableHighlight>
    <Text style={styles.headerTitle}>{title}</Text>
    <View style={{ width: 30 }}></View>
  </View>
);

export const HeaderWithMenu = ({ onMenu, title, imageSource }) => (
  <View style={styles.headerWithMenu}>
    <Image source={imageSource} style={styles.headerBackground}>
      <View style={styles.headerButtons}>
        <TouchableHighlight style={styles.menuButton} onPress={onMenu}>
          <Icon name="ios-menu-outline" size={30} color="white" />
        </TouchableHighlight>
      </View>
      <View style={styles.headerInfo}>
        <Text style={styles.headerName}>{title}</Text>
      </View>
    </Image>
  </View>
);
