import React from 'react';
import { View, TouchableHighlight, Text, TextInput, Image, ScrollView, RefreshControl } from 'react-native';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import SegmentedControlTab from 'react-native-segmented-control-tab';

import styles from './styles';

export const MainView = ({ children }) => (
  <View style={styles.mainView}>
    {children}
  </View>
);

export const MainHeader = ({ children, onMenu, onFilter, onPrevMonth, onNextMonth, currentMonth }) => (
  <View style={styles.mainHeader}>
    <Image source={require('../../resourses/home_background.png')} style={styles.mainHeaderBackground}>
      <View style={styles.headerButtons}>
        <TouchableHighlight underlayColor="transparent" style={styles.menuButton} onPress={onMenu}>
          <Icon name="ios-menu-outline" size={30} color="white" />
        </TouchableHighlight>
        <TouchableHighlight underlayColor="transparent" style={styles.menuButton} onPress={onFilter}>
          <Icon name="ios-funnel-outline" size={30} color="white" />
        </TouchableHighlight>
      </View>
      <View style={styles.headerTitles}>
        <Text style={styles.headerTitle}>Поиск заказов</Text>
        {/* <Text style={styles.headerSubTitle}>г. Минск</Text> */}
      </View>
      <View style={styles.monthControl}>
        <TouchableHighlight underlayColor="transparent" style={styles.monthControlButton} onPress={onPrevMonth}>
          <Icon name="ios-arrow-back" size={30} color="#b3bcc1" />
        </TouchableHighlight>
        <Text style={styles.monthControlText}>{currentMonth}</Text>
        <TouchableHighlight underlayColor="transparent" style={styles.monthControlButton} onPress={onNextMonth}>
          <Icon name="ios-arrow-forward" size={30} color="#b3bcc1" />
        </TouchableHighlight>
      </View>
    </Image>
  </View>
);

export const JobList = ({ children, onRefresh, refreshing }) => (
  <ScrollView
    refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor="#13bcbf"
          colors={['#13bcbf']}
          progressBackgroundColor="white"
        />
      }
  >
    {children}
  </ScrollView>
);

export const JobItem = ({ item, prevItem, category, onPress, myProposal, distance }) => (
  <TouchableHighlight underlayColor="transparent" onPress={onPress}>
    <View>
      {!(prevItem && moment.unix(prevItem.startWork).isSame(moment.unix(item.startWork), 'days')) &&
        <SectionHeader title={moment.unix(item.startWork).format('dddd, DD MMMM').toUpperCase()} />}
      <View style={[styles.jobItemView, { borderColor: category.color }]}>
        <Image source={!item.user.imageUrl ? require('../../resourses/avatar.png') : { uri: item.user.imageUrl }} style={styles.jobItemAvatar} />
        <View style={styles.jobItemInfo}>
          <View style={styles.jobItemTextRow}>
            <Text style={styles.jobItemTextTitle} numberOfLines={2}>{item.name}</Text>
            <View style={styles.jobItemPrice}>
              <Text style={styles.jobItemPriceTitle}>{myProposal ? myProposal : item.priceTo} руб.</Text>
            </View>
          </View>
          <View style={styles.jobItemTextRow}>
            <View style={{ flex: 1, marginRight: 10 }}>
              <Text style={styles.jobItemTextAddress} numberOfLines={1}>{item.description}</Text>
            </View>
            {distance && <View>
              <Text style={styles.jobItemTextDistance}>{distance} км</Text>
            </View>}
          </View>
        </View>
      </View>
    </View>
  </TouchableHighlight>
);

export const SectionHeader = ({ title }) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionHeaderText}>{title}</Text>
  </View>
);

export const MainFilterHeader = ({ onBack }) => (
  <View style={styles.mainFilterHeader}>
    <Image source={require('../../resourses/main_filter-background.png')} style={styles.mainFilterHeaderBackground}>
      <TouchableHighlight underlayColor="transparent" style={styles.menuButton} onPress={onBack}>
        <Icon name="ios-arrow-round-back-outline" size={45} color="white" />
      </TouchableHighlight>
      <Text style={styles.headerFilterTitle}>Фильтрация по категориям</Text>
    </Image>
  </View>
);

export const CategoriesScrollView = ({ children }) => (
  <ScrollView style={styles.categoriesScrollView}>
    {children}
  </ScrollView>
);

export const CategoryRow = ({ children }) => (
  <View style={styles.categoryRow}>
    {children}
  </View>
);

export const Category = ({ title, icon, color, onPress, isLeft, selected }) => (
  <TouchableHighlight underlayColor="transparent" onPress={onPress} style={{ flex: 1 }}>
    <View style={[styles.category, isLeft && styles.categoryLeft]}>
      <View style={[styles.categoryIconView, selected && { borderColor: color, borderWidth: 1 }]}>
        <MaterialIcon name={icon} size={45} style={[styles.categoryIcon, selected && { color: color}]} />
      </View>
      <Text style={styles.categoryTitle}>{title}</Text>
    </View>
  </TouchableHighlight>
);
