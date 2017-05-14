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

export const SettingsHeader = ({ title, onMenu, onBack }) => (
  <View style={styles.settingsHeader}>
    <Image source={require('../../resourses/background_settings.png')} style={styles.settingsHeaderBackground}>
      <View style={styles.headerButtons}>
        <TouchableHighlight underlayColor="transparent" style={styles.menuButton} onPress={onMenu || onBack}>
          <Icon
            name={onMenu ? "ios-menu-outline" : "ios-arrow-round-back-outline"}
            size={onMenu ? 30 : 45}
            color="white"
          />
        </TouchableHighlight>
      </View>
      <View style={styles.headerInfo}>
        <Text style={styles.headerName}>{title}</Text>
      </View>
    </Image>
  </View>
);

export const SettingButton = ({ title, onPress }) => (
  <TouchableHighlight underlayColor="transparent" onPress={onPress}>
    <View style={styles.settingsButton}>
      <Text style={styles.settingsButtonTitle}>{title}</Text>
      <Icon name="ios-arrow-round-forward-outline" size={30} color="#bbbbbd" />
    </View>
  </TouchableHighlight>
);

export const LogoutButton = ({ onPress }) => (
  <TouchableHighlight underlayColor="transparent" style={styles.settingsButton} onPress={onPress}>
    <Text style={styles.settingsButtonTitle}>Выход</Text>
  </TouchableHighlight>
);

export const SettingsSwitcher = ({ title, value, setValue }) => (
  <View style={styles.settingsButton}>
    <View>
      <Text style={styles.settingsButtonTitle}>{title}</Text>
    </View>
    <View style={styles.inputItemSwitchView}>
      <Switch
        value={value}
        onValueChange={setValue}
        style={styles.inputItemSwitch}
      />
    </View>
  </View>
);
