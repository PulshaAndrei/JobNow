import React from 'react';
import { View, Image, TouchableHighlight, Text, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from './styles';

export const LoginView = ({ children }) => (
  <View style={styles.loginView}>
    <Image source={require('../../resourses/background.jpg')} style={styles.loginViewImage} />
    <View style={styles.loginBackgroundView} />
    {children}
  </View>
);

export const BrandView = ({ children }) => (
  <View style={{ flex: 4, justifyContent: 'center' }}>
    {children}
  </View>
);

export const InputView = ({ children }) => (
  <View style={{ flex: 3, marginBottom: 25 }}>
    {children}
  </View>
);

export const LoginAndSignupView = ({ children }) => (
  <View style={{ /*flex: 2*/ }}>
    {children}
  </View>
);

export const BrandIcon = ({ children }) => (
  <View style={styles.brandIcon}>
    {children}
  </View>
);

export const BrandTitle = ({ title }) => (
  <View style={styles.brandTitle}>
    <Text style={styles.brandTitleText}>{title}</Text>
  </View>
);

export const PhoneInput = ({ value, setValue, onFocus }) => (
  <View style={styles.input}>
    <Icon name="ios-person-outline" size={30} color="#9ea5ab" />
    <View style={styles.textInputView}>
      <TextInput
        autoCorrect={false}
        placeholder="Номер телефона"
        placeholderTextColor="#9ea5ab"
        underlineColorAndroid={'transparent'}
        keyboardType={'phone-pad'}
        style={styles.textInput}
        onChangeText={setValue}
        value={value}
        onFocus={onFocus}
      />
    </View>
  </View>
);

export const PasswordInput = ({ value, setValue }) => (
  <View style={styles.input}>
    <Icon name="ios-lock-outline" size={30} color="#9ea5ab" />
    <View style={styles.textInputView}>
      <TextInput
        autoCorrect={false}
        placeholder="Пароль"
        placeholderTextColor="#9ea5ab"
        underlineColorAndroid={'transparent'}
        secureTextEntry
        keyboardType={'default'}
        style={styles.textInput}
        onChangeText={setValue}
        value={value}
      />
    </View>
  </View>
);

export const ForgotButton = ({ onPress }) => (
  <TouchableHighlight style={styles.forgotButton} onPress={onPress}>
    <Text style={styles.forgotButtonText}>Забыли пароль?</Text>
  </TouchableHighlight>
);

export const LoginButton = ({ onPress }) => (
  <TouchableHighlight style={styles.loginButton} onPress={onPress}>
    <Text style={styles.loginButtonText}>Войти</Text>
  </TouchableHighlight>
);

export const SignupButton = ({ onPress }) => (
  <View style={styles.signupButton}>
    <Text style={styles.signupButtonLabel}>Нет аккаунта?</Text>
    <TouchableHighlight onPress={onPress}>
      <Text style={styles.signupButtonRegistration}>Зарегистрироваться</Text>
    </TouchableHighlight>
  </View>
);
