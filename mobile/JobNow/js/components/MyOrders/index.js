import React from 'react';
import { View, TouchableHighlight, Text, TextInput, Image, ScrollView, Switch } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import moment from 'moment';

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

export const JobItemWithProposals = ({ item, prevItem, category, onPress, isEnded }) => (
  <TouchableHighlight onPress={onPress}>
    <View style={[styles.jobItemView, category && { borderColor: category.color }]}>
      <Image source={require('../../resourses/avatar.jpg')} style={styles.jobItemAvatar} />
      <View style={styles.jobItemInfo}>
        <View style={styles.jobItemTextRow}>
          <Text style={styles.jobItemTextTitle} numberOfLines={2}>{item.name}</Text>
          {isEnded
            ? <View style={styles.myProposalView}>
              <Text style={[styles.selectDateText, { color: 'white', fontSize: 12 }]}>Завершено</Text>
            </View>
            : <View style={[styles.myProposalView, { backgroundColor: '#fbab54'}]}>
              <Text style={[styles.selectDateText, { color: 'white', fontSize: 12 }]}>
                {item.bets.length === 0
                  ? `${item.priceTo} руб.`
                  : `от ${Math.min.apply(Math, item.bets.map(el => el.price))} руб.`}
              </Text>
            </View>}
        </View>
        <View style={styles.jobItemTextRow}>
          <Text style={styles.jobItemTextAddress}>{moment.unix(item.startWork).format('dddd, DD MMMM')}</Text>
          <Text style={styles.jobItemTextDistance}>{item.bets.length} откликов</Text>
        </View>
      </View>
    </View>
  </TouchableHighlight>
);

export const SelectDateTime = ({ isAllDay, dateFrom, dateTo, setAllDay, onPressDateFrom, onPress }) => (
  <View style={styles.selectDateTime}>
    <View style={styles.allDay}>
      <Text style={styles.inputItemTitleText}>Весь день</Text>
      <Switch
        value={isAllDay}
        onValueChange={setAllDay}
        style={styles.inputItemSwitch}
      />
    </View>
    <View style={styles.dataRangeView}>
      <Text style={styles.inputItemTitleText}>C</Text>
      <View style={styles.dateRange}>
        <TouchableHighlight onPress={() => onPress('from', 'datetime')}>
          <Text style={styles.selectDateText}>{dateFrom.format('DD MMMM YYYY')}</Text>
        </TouchableHighlight>
        {!isAllDay && <TouchableHighlight style={styles.selectDateButton} onPress={() => onPress('from', 'time')}>
          <Text style={styles.selectDateText}>{dateFrom.format('HH:mm')}</Text>
        </TouchableHighlight>}
      </View>
    </View>
    <View style={styles.dataRangeView}>
      <Text style={styles.inputItemTitleText}>До</Text>
      <View style={styles.dateRange}>
        <TouchableHighlight onPress={() => onPress('to', 'datetime')}>
          <Text style={styles.selectDateText}>{dateTo.format('DD MMMM YYYY')}</Text>
        </TouchableHighlight>
        {!isAllDay && <TouchableHighlight style={styles.selectDateButton} onPress={() => onPress('to', 'time')}>
          <Text style={styles.selectDateText}>{dateTo.format('HH:mm')}</Text>
        </TouchableHighlight>}
      </View>
    </View>
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
          onChangeText={setValue}
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
      <Text style={[styles.selectDateText, { textAlign: 'right' }]}>
        {dateFrom.diff(dateTo, 'days') === 0
          ? (isAllDay
            ? dateFrom.format('dddd DD MMMM')
            : (dateFrom.format('HH:mm') + " - " + dateTo.format('HH:mm') + ",\n" + dateFrom.format('dddd DD MMMM')))
          : (isAllDay
            ? (dateFrom.format('dddd DD MMMM') + " - " + dateTo.format('dddd DD MMMM'))
            : (dateFrom.format('HH:mm, dddd DD MMMM') + " - \n" + dateTo.format('HH:mm, dddd DD MMMM')))
        }
      </Text>
    </View>
  </View>
);

export const Proposals = ({ title, proposals, onPress }) => (
  <TouchableHighlight onPress={proposals.length !== 0 ? onPress: undefined}>
    <View  style={styles.inputItem}>
      <View>
        <Text style={styles.inputItemTitleText}>{title}</Text>
      </View>
      <View style={styles.inputItemTextInputView}>
        <View style={[styles.myProposalView, { marginBottom: 0, height: 30, backgroundColor: '#fbab54' }]}>
          <Text style={[styles.selectDateText, {color: 'white'}]}>
            {proposals.length === 0
              ? `Нет откликов`
              : `от ${Math.min.apply(Math, proposals.map(el => el.price))} до ${Math.max.apply(Math, proposals.map(el => el.price))} руб.`}
          </Text>
        </View>
        {proposals.length !== 0 && <Icon name="ios-arrow-round-forward-outline" style={{ marginLeft: 20 }} size={30} color="#bbbbbd" />}
      </View>
    </View>
  </TouchableHighlight>
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

export const CategoryItem = ({ title, value, onPress }) => (
  <TouchableHighlight onPress={onPress}>
    <View style={styles.inputItem}>
      <View>
        <Text style={styles.inputItemTitleText}>{title}</Text>
      </View>
      <View style={styles.inputItemTextInputView}>
        <Text style={[styles.selectDateText, { marginRight: 15, marginLeft: 25 }]} numberOfLines={1}>{value}</Text>
        <Icon name="ios-arrow-round-forward-outline" size={30} color="#bbbbbd" />
      </View>
    </View>
  </TouchableHighlight>
);

export const Proposal = ({ bet, user, onPress }) => (
  <TouchableHighlight onPress={onPress}>
    <View style={styles.inputItem}>
      <Image source={require('../../resourses/avatar.jpg')} style={styles.proposalAvatar} />
      <View style={styles.proposalInfo}>
        <Text style={[styles.inputItemTitleText, {color: 'black', fontSize: 18}]}>{ user ? user.givenName + " " + user.falimyName : "Загрузка..."}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center'}}>
          <View style={[styles.myProposalView, { marginBottom: 0, marginRight: 10 }]}>
            <Text style={[styles.selectDateText, { color: 'white' }]}>{bet.price} руб.</Text>
          </View>
          <Icon name="ios-arrow-round-forward-outline" size={30} color="#bbbbbd" />
        </View>
      </View>
    </View>
  </TouchableHighlight>
);
