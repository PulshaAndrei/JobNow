import React from 'react';
import { View, TouchableHighlight, Text, TextInput, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import SegmentedControlTab from 'react-native-segmented-control-tab';

import styles from './styles';

export const MyProposalsView = ({ children }) => (
  <View style={styles.mainView}>
    {children}
  </View>
);

export const MyProposalsHeader = ({ onMenu }) => (
  <View style={styles.header}>
    <Image source={require('../../resourses/home_background.png')} style={styles.headerBackground}>
      <View style={styles.headerButtons}>
        <TouchableHighlight style={styles.menuButton} onPress={onMenu}>
          <Icon name="ios-menu-outline" size={30} color="white" />
        </TouchableHighlight>
      </View>
      <View style={styles.headerInfo}>
        <Text style={styles.headerName}>Мои отклики</Text>
      </View>
    </Image>
  </View>
);
