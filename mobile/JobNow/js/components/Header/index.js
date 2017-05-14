import React from 'react';
import { View, TouchableHighlight, Text, TextInput, Image, Animated } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from './styles';

export const Header = ({ title, onLeft }) => (
  <View style={styles.header}>
    <TouchableHighlight underlayColor="transparent" style={styles.leftButton} onPress={Actions.pop}>
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
        <TouchableHighlight underlayColor="transparent" style={styles.menuButton} onPress={onMenu}>
          <Icon name="ios-menu-outline" size={30} color="white" />
        </TouchableHighlight>
      </View>
      <View style={styles.headerInfo}>
        <Text style={styles.headerName}>{title}</Text>
      </View>
    </Image>
  </View>
);

export const HeaderWithSave = ({ onBack, onSave, title, imageSource, isSaveEnabled, isOpenKeyboard, animationHeight }) => (
  <Animated.View style={[styles.headerWithMenu, animationHeight && { height: animationHeight }]}>
    <Image source={imageSource} style={styles.headerBackground}>
      <View style={styles.headerButtons}>
        <TouchableHighlight underlayColor="transparent" style={styles.menuButton} onPress={onBack}>
          <Icon name="ios-arrow-round-back-outline" size={45} color="white" />
        </TouchableHighlight>
        <TouchableHighlight underlayColor="transparent" style={styles.menuButton} onPress={isSaveEnabled ? onSave : null}>
            <Icon name="ios-checkmark-circle-outline" size={30} style={!isSaveEnabled && {opacity: 0.3}} color="white" />
        </TouchableHighlight>
      </View>
      <View style={styles.headerInfo}>
        <Text style={styles.headerName}>{title}</Text>
      </View>
    </Image>
  </Animated.View>
);

export const HeaderWithClose = ({ onBack, onClose, title, imageSource }) => (
  <View style={styles.headerWithMenu}>
    <Image source={imageSource} style={styles.headerBackground}>
      <View style={styles.headerButtons}>
        <TouchableHighlight underlayColor="transparent" style={styles.menuButton} onPress={onBack}>
          <Icon name="ios-arrow-round-back-outline" size={45} color="white" />
        </TouchableHighlight>
        <TouchableHighlight underlayColor="transparent" style={styles.menuButton} onPress={onClose}>
            <Icon name="ios-close-circle-outline" size={30} color="white" />
        </TouchableHighlight>
      </View>
      <View style={styles.headerInfo}>
        <Text style={styles.headerName}>{title}</Text>
      </View>
    </Image>
  </View>
);

export const HeaderWithBack = ({ onBack, title, imageSource }) => (
  <View style={styles.headerWithMenu}>
    <Image source={imageSource} style={styles.headerBackground}>
      <View style={styles.headerButtons}>
        <TouchableHighlight underlayColor="transparent" style={styles.menuButton} onPress={onBack}>
          <Icon name="ios-arrow-round-back-outline" size={45} color="white" />
        </TouchableHighlight>
      </View>
      <View style={styles.headerInfo}>
        <Text style={styles.headerName} numberOfLines={2}>{title}</Text>
      </View>
    </Image>
  </View>
);
