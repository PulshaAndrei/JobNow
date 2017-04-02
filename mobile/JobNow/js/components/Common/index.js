import React from 'react';
import { View, TouchableHighlight, Text, TextInput } from 'react-native';
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
