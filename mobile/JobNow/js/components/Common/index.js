import React from 'react';
import { View, TouchableHighlight, Text, TextInput, Switch, Image } from 'react-native';
import StarRating from 'react-native-star-rating';
import Icon from 'react-native-vector-icons/Ionicons';

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

export const InputItem = ({ title, value, setValue, keyboardType, disabled }) => (
  <View style={styles.inputItem}>
    <View>
      <Text style={styles.inputItemTitleText}>{title}</Text>
    </View>
    <View style={styles.inputItemTextInputView}>
      {disabled ?
        <Text style={styles.selectDateText}>{value}</Text> :
        <TextInput
          value={value}
          onChange={setValue}
          style={styles.inputItemTextInput}
          keyboardType={keyboardType}
          disabled={disabled}
          underlineColorAndroid={'transparent'}
        />}
    </View>
  </View>
);

export const InputDescriptionItem = ({ title, value, setValue, disabled }) => (
  <View style={styles.inputDescriptionItem}>
    <View>
      <Text style={styles.inputItemTitleText}>{title}</Text>
    </View>
    <View>
      {disabled ?
        <Text style={[styles.inputItemTextInput, { textAlign: 'left', marginTop: 10 }]}>{value}</Text>
        : <TextInput
          value={value}
          onChange={setValue}
          multiline
          style={[styles.inputItemTextInput, { textAlign: 'left', marginTop: 10 }]}
          numberOfLines={3}
          underlineColorAndroid={'transparent'}
        />}
    </View>
  </View>
);

export const ProfileItem = ({ name, rating }) => (
  <View style={styles.profileItem}>
    <View>
      <Image source={require('../../resourses/avatar.jpg')} style={styles.jobItemAvatar} />
    </View>
    <View>
      <Text style={styles.jobItemTextTitle}>{name}</Text>
      <View style={styles.starRow}>
        <StarRating
          disabled
          maxStars={5}
          rating={rating}
          iconSet="Ionicons"
          emptyStar="ios-star-outline"
          fullStar="ios-star"
          halfStar="ios-star-half"
          starSize={15}
          buttonStyle={{width: 15, marginRight: 0, marginLeft: 0}}
          starColor="#fcaa54"
        />
        <Text style={styles.starText}>5 отзывов</Text>
      </View>
    </View>
  </View>
);

export const ApplyButton = ({ onPress }) => (
  <TouchableHighlight style={styles.applyButton} onPress={onPress}>
    <Icon name="ios-checkmark" size={45} color="white" />
  </TouchableHighlight>
);
