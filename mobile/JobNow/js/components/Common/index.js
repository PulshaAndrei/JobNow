import React from 'react';
import { View, TouchableHighlight, Text, TextInput, Switch } from 'react-native';
//import IconIonicons from 'react-native-vector-icons/Ionicons';

import styles from './styles';

export const Container = ({ children }) => (
  <View style={styles.container}>
    {children}
  </View>
);

export const DescriptionTitle = ({ children }) => (
  <Text style={styles.descriptionTitle}>{children}</Text>
);

export const SwitchItem = ({ title, value, setValue }) => (
  <View style={styles.inputItem}>
    <View>
      <Text style={styles.inputItemTitleText}>{title}</Text>
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
