import React from 'react';
import { View, TouchableHighlight, Text, TextInput, Image, ScrollView, Switch } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import SegmentedControlTab from 'react-native-segmented-control-tab';

import styles from './styles';

export const SettingsView = ({ children }) => (
  <View style={styles.settingsView}>
    {children}
  </View>
);

export const SettingsHeader = ({ onMenu, onSave, isSaveEnabled }) => (
  <View style={styles.settingsHeader}>
    <Image source={require('../../resourses/background_settings.png')} style={styles.settingsHeaderBackground}>
      <View style={styles.headerButtons}>
        <TouchableHighlight style={styles.menuButton} onPress={onMenu}>
          <Icon name="ios-menu-outline" size={30} color="white" />
        </TouchableHighlight>
      </View>
      <View style={styles.headerInfo}>
        <Text style={styles.headerName}>Настройки</Text>
      </View>
    </Image>
  </View>
);

export const SettingButton = ({ title, onPress }) => (
  <TouchableHighlight onPress={onPress}>
    <View style={styles.settingsButton}>
      <Text style={styles.settingsButtonTitle}>{title}</Text>
      <Icon name="ios-arrow-round-forward-outline" size={30} color="#bbbbbd" />
    </View>
  </TouchableHighlight>
);

export const LogoutButton = ({ onPress }) => (
  <TouchableHighlight style={styles.settingsButton} onPress={onPress}>
    <Text style={styles.settingsButtonTitle}>Выход</Text>
  </TouchableHighlight>
);
