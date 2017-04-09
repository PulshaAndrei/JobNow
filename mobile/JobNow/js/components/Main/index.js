import React from 'react';
import { View, TouchableHighlight, Text, TextInput, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import SegmentedControlTab from 'react-native-segmented-control-tab';

import styles from './styles';

export const MainView = ({ children }) => (
  <View style={styles.mainView}>
    {children}
  </View>
);

export const MainHeader = ({ children, onMenu }) => (
  <View style={styles.mainHeader}>
    <Image source={require('../../resourses/home_background.png')} style={styles.mainHeaderBackground}>
      <View style={styles.headerButtons}>
        <TouchableHighlight style={styles.menuButton} onPress={onMenu}>
          <Icon name="ios-menu-outline" size={30} color="white" />
        </TouchableHighlight>
        <TouchableHighlight style={styles.menuButton}>
          <Icon name="ios-funnel-outline" size={30} color="white" />
        </TouchableHighlight>
      </View>
      <View style={styles.headerTitles}>
        <Text style={styles.headerTitle}>Поиск заказов в</Text>
        <Text style={styles.headerSubTitle}>г. Минск</Text>
      </View>
    </Image>
  </View>
);
