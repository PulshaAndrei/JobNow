import React from 'react';
import { View, TouchableHighlight, Text, TextInput, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import SegmentedControlTab from 'react-native-segmented-control-tab';

import styles from './styles';

export const SignupView = ({ children }) => (
  <View style={styles.signupView}>
    <Image source={require('../../resourses/signup_background.jpg')} style={styles.signupViewImage} />
    <View style={styles.signupBackgroundView} />
    {children}
  </View>
);

export const SignupScrollView = ({ children }) => (
  <View>
    <Image source={require('../../resourses/signup_background.jpg')} style={styles.signupViewImage} />
    <View style={styles.signupBackgroundView} />
    <ScrollView style={styles.signupScrollView} contentContainerStyle={{ paddingBottom: 20 }}>
      {children}
    </ScrollView>
  </View>
);

export const NextButton = ({ onPress }) => (
  <TouchableHighlight style={styles.nextButton} onPress={onPress}>
    <Text style={styles.nextButtonText}>Далее</Text>
  </TouchableHighlight>
);

export const TextInputView = ({ title, value, onChange, keyboardType, disabled }) => (
  <View style={styles.textInputView}>
    <TextInput
      autoCorrect={false}
      placeholder={title}
      placeholderTextColor="#9ea5ab"
      underlineColorAndroid={'transparent'}
      keyboardType={keyboardType}
      style={styles.textInput}
      onChangeText={onChange}
      value={value}
      disabled
    />
  </View>
);

export const PhoneInput = ({ value, onChange }) => (
  <View style={styles.input}>
    <Icon name="ios-call-outline" size={30} color="#9ea5ab" />
    <TextInputView value={value} onChange={onChange} title="Номер телефона" keyboardType="phone-pad" />
  </View>
);

export const ActivationCode = ({ value, setValue, onChange }) => (
  <View style={styles.input}>
    <Icon name="ios-checkmark-circle-outline" size={30} color="#9ea5ab" />
    <TextInputView value={value} onChange={onChange} title="Код активации" keyboardType="numeric" />
  </View>
);

export const FirstName = ({ value, setValue, onChange }) => (
  <View style={styles.input}>
    <Icon name="ios-person-outline" size={30} color="#9ea5ab" />
    <TextInputView value={value} onChange={onChange} title="Имя" keyboardType="default" />
  </View>
);

export const LastName = ({ value, setValue, onChange }) => (
  <View style={styles.input}>
    <Icon name="ios-person-outline" size={30} color="#9ea5ab" />
    <TextInputView value={value} onChange={onChange} title="Фамилия" keyboardType="default" />
  </View>
);

export const PhoneDisabled = ({ value, onChange }) => (
  <View style={styles.input}>
    <Icon name="ios-call-outline" size={30} color="#9ea5ab" />
    <TextInputView value={value} onChange={onChange} title="Номер телефона" keyboardType="phone-pad" disabled/>
  </View>
);

export const Email = ({ value, setValue, onChange }) => (
  <View style={styles.input}>
    <Icon name="ios-mail-outline" size={30} color="#9ea5ab" />
    <TextInputView value={value} onChange={onChange} title="Email" keyboardType="email-address" />
  </View>
);

export const PickerConnection = ({ value, setValue, onChange }) => (
  <View style={styles.pickerConnection}>
    <SegmentedControlTab
      values={['Телефон', 'Электронная почта']}
      selectedIndex={value}
      onTabPress={onChange}
      borderRadius={0}
      tabsContainerStyle={{ height: 50, borderTopWidth: 1,  borderBottomWidth: 1, borderColor: '#364756' }}
      tabStyle={{ backgroundColor: 'transparent', borderColor: 'transparent' }}
      tabTextStyle={{ color: '#9ea5ab' }}
      activeTabStyle={{ backgroundColor: '#364756', borderColor: '#364756' }}
      />
  </View>
);
