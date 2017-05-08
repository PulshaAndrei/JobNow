import React, { Component } from 'react';
import { View, TouchableHighlight, Text, TextInput, Image, ScrollView, Switch, Slider, Platform } from 'react-native';
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
  <TouchableHighlight underlayColor="transparent" style={styles.createButton} onPress={onCreate}>
    <Icon name="ios-add" size={45} color="white" />
  </TouchableHighlight>
);

export const JobItemWithProposals = ({ item, prevItem, category, onPress, isEnded }) => (
  <TouchableHighlight underlayColor="transparent" onPress={onPress}>
    <View style={[styles.jobItemView, category && { borderColor: category.color }]}>
      <Image source={require('../../resourses/avatar.png')} style={styles.jobItemAvatar} />
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
        <TouchableHighlight underlayColor="transparent" onPress={() => onPress('from', 'datetime')}>
          <Text style={styles.selectDateText}>{dateFrom.format('DD MMMM YYYY')}</Text>
        </TouchableHighlight>
        {!isAllDay && <TouchableHighlight underlayColor="transparent" style={styles.selectDateButton} onPress={() => onPress('from', 'time')}>
          <Text style={styles.selectDateText}>{dateFrom.format('HH:mm')}</Text>
        </TouchableHighlight>}
      </View>
    </View>
    <View style={styles.dataRangeView}>
      <Text style={styles.inputItemTitleText}>До</Text>
      <View style={styles.dateRange}>
        <TouchableHighlight underlayColor="transparent" onPress={() => onPress('to', 'datetime')}>
          <Text style={styles.selectDateText}>{dateTo.format('DD MMMM YYYY')}</Text>
        </TouchableHighlight>
        {!isAllDay && <TouchableHighlight underlayColor="transparent" style={styles.selectDateButton} onPress={() => onPress('to', 'time')}>
          <Text style={styles.selectDateText}>{dateTo.format('HH:mm')}</Text>
        </TouchableHighlight>}
      </View>
    </View>
  </View>
);

export const InputPrice = ({ value, setValue, disabled, onFocus }) => (
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
            onFocus={onFocus}
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
            ? (dateFrom.format('dddd DD MMMM') + " -\n" + dateTo.format('dddd DD MMMM'))
            : (dateFrom.format('HH:mm, dddd DD MMMM') + " -\n" + dateTo.format('HH:mm, dddd DD MMMM')))
        }
      </Text>
    </View>
  </View>
);

export const Proposals = ({ title, proposals, onPress, disabled }) => (
  <TouchableHighlight underlayColor="transparent" onPress={(!disabled && proposals.length !== 0) ? onPress: undefined}>
    <View  style={styles.inputItem}>
      <View>
        <Text style={styles.inputItemTitleText}>{title}</Text>
      </View>
      <View style={styles.inputItemTextInputView}>
        <View style={[styles.myProposalView, { marginBottom: 0, height: 30, backgroundColor: '#fbab54' }]}>
          <Text style={[styles.selectDateText, {color: 'white'}]}>
            {proposals.length === 0
              ? `Нет откликов`
              : (Math.min.apply(Math, proposals.map(el => el.price)) === Math.max.apply(Math, proposals.map(el => el.price))
                ? `${Math.min.apply(Math, proposals.map(el => el.price))} руб.`
                : `от ${Math.min.apply(Math, proposals.map(el => el.price))} до ${Math.max.apply(Math, proposals.map(el => el.price))} руб.`
              )}
          </Text>
        </View>
        {(proposals.length !== 0 && !disabled) && <Icon name="ios-arrow-round-forward-outline" style={{ marginLeft: 20 }} size={30} color="#bbbbbd" />}
      </View>
    </View>
  </TouchableHighlight>
);

export const MyProposal = ({ title, value, onPress }) => (
  <TouchableHighlight underlayColor="transparent" onPress={onPress}>
    <View  style={styles.inputItem}>
      <View>
        <Text style={styles.inputItemTitleText}>{title}</Text>
      </View>
      <View style={styles.inputItemTextInputView}>
        <View style={[styles.myProposalView, {marginBottom: 0}]}>
          <Text style={[styles.selectDateText, { color: 'white' }]}>{value}</Text>
        </View>
        <Text style={styles.inputItemTitleText}> руб.</Text>
      </View>
    </View>
  </TouchableHighlight>
);

export const CategoryItem = ({ title, value, onPress }) => (
  <TouchableHighlight underlayColor="transparent" onPress={onPress}>
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
  <TouchableHighlight underlayColor="transparent" onPress={onPress}>
    <View style={styles.inputItem}>
      <Image source={require('../../resourses/avatar.png')} style={styles.proposalAvatar} />
      <View style={styles.proposalInfo}>
        <View style={{ flex: 1, marginRight: 10 }}>
          <Text style={[styles.inputItemTitleText, {color: 'black', fontSize: 18, flex: 1, textAlignVertical: 'center'}]}>
            {user.givenName} {user.familyName}
          </Text>
        </View>
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

export default class PopupView extends Component {
  state = {
    value: this.props.currentPrice,
    inputValue: this.props.currentPrice.toString(),
  }
  render() {
    const { maxPrice, setPrice, onClose, onSend, onChange, onDelete, isChange } = this.props;
    const { value, inputValue } = this.state;
    return (
      <View style={styles.popupView}>
        <View>
          <Text style={styles.popupViewTitle}>Предложите свою цену за выбранный заказ</Text>
        </View>
        <View>
          <Slider
            minimumValue={1}
            maximumValue={maxPrice}
            step={0.5}
            value={value}
            onValueChange={value => this.setState({ value, inputValue: value.toString() })}
          />
          <View style={styles.popupViewPriceView}>
            <Text>Цена:</Text>
            <View style={styles.popupViewPrice}>
              <TextInput
                value={inputValue}
                onChangeText={inputValue => this.setState({ inputValue })}
                onEndEditing={() => this.setState({
                  inputValue: (inputValue < maxPrice && parseFloat(inputValue).toString()) || value.toString(),
                  value: (inputValue < maxPrice && parseFloat(inputValue)) || value })}
                style={styles.inputItemTextInput}
                keyboardType={Platform.OS === 'ios' ? "numbers-and-punctuation" : "numeric" }
                autoCorrect={false}
                underlineColorAndroid={'transparent'}
              />
              <Text style={styles.inputItemTitleText}> руб.</Text>
            </View>
          </View>
        </View>
        {isChange
          ? <View>
              <View style={[styles.bottomButtons, { marginBottom: 15 }]}>
                <TouchableHighlight underlayColor="transparent" onPress={() => onChange(this.state.value)} style={[styles.bottomButton, { backgroundColor: '#13bcbf' }]}>
                  <Text style={styles.bottomButtonText}>Изменить</Text>
                </TouchableHighlight>
              </View>
              <View style={styles.bottomButtons}>
                  <TouchableHighlight underlayColor="transparent" onPress={onClose} style={[styles.bottomButton, { backgroundColor: '#c8c8ca' }]}>
                    <Text style={styles.bottomButtonText}>Отмена</Text>
                  </TouchableHighlight>
                  <TouchableHighlight underlayColor="transparent" onPress={onDelete} style={[styles.bottomButton, { backgroundColor: '#bf1313' }]}>
                    <Text style={styles.bottomButtonText}>Удалить</Text>
                  </TouchableHighlight>
                </View>
              </View>
          : <View style={styles.bottomButtons}>
              <TouchableHighlight underlayColor="transparent" onPress={onClose} style={[styles.bottomButton, { backgroundColor: '#c8c8ca' }]}>
                <Text style={styles.bottomButtonText}>Отмена</Text>
              </TouchableHighlight>
              <TouchableHighlight underlayColor="transparent" onPress={() => onSend(this.state.value)} style={[styles.bottomButton, { backgroundColor: '#13bcbf' }]}>
                <Text style={styles.bottomButtonText}>Подтвердить</Text>
              </TouchableHighlight>
            </View>}
      </View>)
  }
};
