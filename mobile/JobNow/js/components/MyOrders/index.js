import React from 'react';
import { View, TouchableHighlight, Text, TextInput, Image, ScrollView, Switch } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import SegmentedControlTab from 'react-native-segmented-control-tab';

import styles from './styles';

export const MyOrdersView = ({ children }) => (
  <View style={styles.mainView}>
    {children}
  </View>
);

export const CreateButton = ({ onCreate }) => (
  <TouchableHighlight style={styles.createButton} onPress={onCreate}>
    <Icon name="ios-add" size={45} color="white" />
  </TouchableHighlight>
);

export const JobItemWithProposals = ({ item, prevItem, onPress }) => (
  <TouchableHighlight onPress={onPress}>
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
  </TouchableHighlight>
);

export const SelectDateTime = ({ isAllDay, dateFrom, dateTo, setAllDay, setDayFrom, setDayTo }) => (
  <View style={styles.selectDateTime}>
    <View style={styles.allDay}>
      <Text style={styles.inputItemTitleText}>Весь день</Text>
      <Switch
        value={isAllDay}
        onValueChange={setAllDay}
        style={styles.inputItemSwitch}
      />
    </View>
    {!isAllDay &&
      <View style={styles.dataRangeView}>
        <Text style={styles.inputItemTitleText}>C</Text>
        <View style={styles.dateRange}>
          <TouchableHighlight style={styles.selectDateButton}>
            <Text style={styles.selectDateText}>{dateFrom.format('MMMM DD, YYYY')}</Text>
          </TouchableHighlight>
          <TouchableHighlight>
            <Text style={styles.selectDateText}>{dateFrom.format('HH:mm')}</Text>
          </TouchableHighlight>
        </View>
      </View>}
    {!isAllDay &&
        <View style={styles.dataRangeView}>
        <Text style={styles.inputItemTitleText}>До</Text>
        <View style={styles.dateRange}>
          <TouchableHighlight style={styles.selectDateButton}>
            <Text style={styles.selectDateText}>{dateTo.format('MMMM DD, YYYY')}</Text>
          </TouchableHighlight>
          <TouchableHighlight>
            <Text style={styles.selectDateText}>{dateTo.format('HH:mm')}</Text>
          </TouchableHighlight>
        </View>
      </View>}
  </View>
);

export const InputPrice = ({ value, setValue, disabled }) => (
  <View style={styles.inputItem}>
    <View>
      <Text style={styles.inputItemTitleText}>Максимальная цена</Text>
    </View>
    <View style={styles.inputItemTextInputView}>
      {disabled ?
        <Text style={styles.selectDateText}>{value}</Text> :
          <TextInput
          value={value}
          onChange={setValue}
          style={styles.inputItemTextInput}
          keyboardType="numeric"
          underlineColorAndroid={'transparent'}
        />}
      <Text style={styles.inputItemTitleText}> руб.</Text>
    </View>
  </View>
);

export const CreateOrderScrollView = ({ children }) => (
  <ScrollView>
    {children}
  </ScrollView>
);

export const DateRange = ({ dateFrom, dateTo, isAllDay }) => (
  <View  style={styles.inputItem}>
    <View>
      <Text style={styles.inputItemTitleText}>Когда</Text>
    </View>
    <View style={styles.inputItemTextInputView}>
      <Text style={styles.selectDateText}>
        {dateFrom.diff(dateTo, 'days') === 0
          ? (isAllDay
            ? dateFrom.format('DD MMMM')
            : (dateFrom.format('HH:mm') + " - " + dateTo.format('HH:mm') + ", " + dateFrom.format('DD MMMM')))
          : (isAllDay
            ? (dateFrom.format('DD MMMM') + " - " + dateTo.format('DD MMMM'))
            : (dateFrom.format('HH:mm, DD MMMM') + " - " + dateTo.format('HH:mm, DD MMMM')))
        }
      </Text>
    </View>
  </View>
);

export const Proposals = ({ title, min, max, disabled }) => (
  <View  style={styles.inputItem}>
    <View>
      <Text style={styles.inputItemTitleText}>{title}</Text>
    </View>
    <View style={styles.inputItemTextInputView}>
      <Text style={styles.selectDateText}>от {min} до {max} руб.</Text>
      {!disabled && <Icon name="ios-arrow-round-forward-outline" style={{ marginLeft: 20 }} size={30} color="#bbbbbd" />}
    </View>
  </View>
);

export const MyProposal = ({ title, value }) => (
  <View  style={styles.inputItem}>
    <View>
      <Text style={styles.inputItemTitleText}>{title}</Text>
    </View>
    <View style={styles.inputItemTextInputView}>
      <View style={styles.myProposalView}>
        <Text style={[styles.selectDateText, { color: 'white' }]}>{value}</Text>
      </View>
      <Text style={styles.inputItemTitleText}> руб.</Text>
    </View>
  </View>
);
