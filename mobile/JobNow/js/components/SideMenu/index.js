import React from 'react';
import { View, TouchableHighlight, Text, TextInput, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import SegmentedControlTab from 'react-native-segmented-control-tab';

import styles from './styles';

export const SideMenu = ({ children, onClose, menuButtons, currentItem }) => (
  <View style={styles.sideMenu}>
    <TouchableHighlight underlayColor="transparent" onPress={onClose} style={styles.closeButton}>
      <Icon name="ios-close" size={60} color="#bbbbbd" />
    </TouchableHighlight>
    <View style={styles.sideMenuButtons}>
      {menuButtons.map((item, i) =>
        <SideMenuButton title={item.title} onPress={item.onPress} selected={currentItem == i} key={i} /> )}
    </View>
  </View>
);

export const SideMenuButton = ({ title, selected, onPress }) => (
  <TouchableHighlight underlayColor="transparent" onPress={onPress} style={[styles.sideMenuButton, selected && styles.sideMenuButtonSelected]}>
    <Text style={styles.menuButtonText}>{title}</Text>
  </TouchableHighlight>
);
