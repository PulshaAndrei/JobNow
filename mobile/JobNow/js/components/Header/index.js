import React from 'react';
import { View, TouchableHighlight, Text, TextInput } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from './styles';

export const Header = ({ title, onLeft }) => (
  <View style={styles.header}>
    <TouchableHighlight onPress={Actions.pop}>
      <Icon name="arrow-back" size={30} color="white" />
    </TouchableHighlight>
    <Text style={styles.headerTitle}>{title}</Text>
    <View style={{ width: 30 }}></View>
  </View>
);
