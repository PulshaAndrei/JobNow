import React from 'react';
import { View, TouchableHighlight, Text, TextInput, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import SegmentedControlTab from 'react-native-segmented-control-tab';

import styles from './styles';

export const MyOrdersView = ({ children }) => (
  <View style={styles.mainView}>
    {children}
  </View>
);

export const MyOrdersHeader = ({ onMenu }) => (
  <View style={styles.header}>
    <Image source={require('../../resourses/home_background.png')} style={styles.headerBackground}>
      <View style={styles.headerButtons}>
        <TouchableHighlight style={styles.menuButton} onPress={onMenu}>
          <Icon name="ios-menu-outline" size={30} color="white" />
        </TouchableHighlight>
      </View>
      <View style={styles.headerInfo}>
        <Text style={styles.headerName}>Мои заказы</Text>
      </View>
    </Image>
  </View>
);

export const CreateButton = ({ onCreate }) => (
  <TouchableHighlight style={styles.createButton} onPress={onCreate}>
    <Icon name="ios-add" size={40} color="white" />
  </TouchableHighlight>
);

export const JobItemWithProposals = ({ item, prevItem }) => (
  <View style={[styles.jobItemView, { borderColor: item.category.color }]}>
    <Image source={require('../../resourses/avatar.jpg')} style={styles.jobItemAvatar} />
    <View style={styles.jobItemInfo}>
      <View style={styles.jobItemTextRow}>
        <Text style={styles.jobItemTextTitle} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.jobItemPriceTitle} numberOfLines={1}>{item.price} руб.</Text>
      </View>
      <View style={styles.jobItemTextRow}>
        <Text style={styles.jobItemTextAddress}>{item.address}</Text>
        <Text style={styles.jobItemTextDistance}>{item.distance} м</Text>
      </View>
    </View>
  </View>
);
