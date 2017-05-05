import React from 'react';
import { View, TouchableHighlight, Text, TextInput, Image, ScrollView, Switch, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import StarRating from 'react-native-star-rating';

import styles from './styles';

export const ProfileView = ({ children }) => (
  <View style={styles.profileView}>
    {children}
  </View>
);

export const ProfileHeader = ({ onMenu, onSave, name, isOpenKeyboard, animationHeight }) => (
  <Animated.View style={[styles.profileHeader, { height: animationHeight }]}>
    <Image source={require('../../resourses/background_profile.png')} style={styles.profileHeaderBackground}>
      <View style={styles.headerButtons}>
        <TouchableHighlight style={styles.menuButton} onPress={onMenu}>
          <Icon name="ios-menu-outline" size={30} color="white" />
        </TouchableHighlight>
        <TouchableHighlight style={styles.menuButton} onPress={onSave}>
          <Icon name="ios-checkmark-circle-outline" size={30} color="white" />
        </TouchableHighlight>
      </View>
      <View style={styles.headerInfo}>
        {!isOpenKeyboard && <Image source={require('../../resourses/avatar.jpg')} style={styles.profileHeaderAvatar} />}
        <Text style={styles.headerName}>{name}</Text>
      </View>
    </Image>
  </Animated.View>
);

export const ProfileHeaderWithBack = ({ onBack, name }) => (
  <View style={styles.profileHeader}>
    <Image source={require('../../resourses/background_profile.png')} style={styles.profileHeaderBackground}>
      <View style={styles.headerButtons}>
        <TouchableHighlight style={styles.menuButton} onPress={onBack}>
          <Icon name="ios-arrow-round-back-outline" size={45} color="white" />
        </TouchableHighlight>
      </View>
      <View style={styles.headerInfo}>
        <Image source={require('../../resourses/avatar.jpg')} style={[styles.profileHeaderAvatar, { width: 120, height: 120, borderRadius: 60, marginTop: -15 }]} />
        <Text style={styles.headerName}>{name}</Text>
      </View>
    </Image>
  </View>
);

export const PhoneWithButtons = ({ title, value, onCall, onMessage }) => (
  <View style={styles.inputItem}>
    <View style={styles.inputItemInfoView}>
      <View>
        <Text style={styles.inputItemTitleText}>{title}</Text>
      </View>
      <View style={styles.inputItemTextInputView}>
        <Text style={styles.selectDateText}>{value}</Text>
      </View>
    </View>
    <View style={styles.itemButtonsView}>
      <TouchableHighlight onPress={onCall} style={[styles.itemButton, { backgroundColor: '#13bdbf' }]}>
        <Text style={styles.itemButtonText}>Позвонить</Text>
      </TouchableHighlight>
      <TouchableHighlight onPress={onMessage} style={styles.itemButton}>
        <Text style={styles.itemButtonText}>Написать СМС</Text>
      </TouchableHighlight>
    </View>
  </View>
);

export const EmailWithButton = ({ title, value, onMessage }) => (
  <View style={styles.inputItem}>
    <View style={styles.inputItemInfoView}>
      <View>
        <Text style={styles.inputItemTitleText}>{title}</Text>
      </View>
      <View style={styles.inputItemTextInputView}>
        <Text style={styles.selectDateText}>{value}</Text>
      </View>
    </View>
    <View style={styles.itemButtonsView}>
      <TouchableHighlight onPress={onMessage} style={styles.itemButton}>
        <Text style={styles.itemButtonText}>Написать e-mail</Text>
      </TouchableHighlight>
    </View>
  </View>
);

export const Reviews = ({ reviews, rate, onCreate }) => (
  <View>
    <View style={styles.inputItem}>
      <View>
        <Text style={styles.reviewsTitle}>Отзывы</Text>
      </View>
      <View style={styles.reviewsInfo}>
        <View style={styles.starRow}>
          <StarRating
            disabled
            maxStars={5}
            rating={rate}
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
    {[1,2].map((item, i) => (
      <View style={styles.inputItem}>
        <View style={styles.reviewHeader}>
          <View>
            <Image source={require('../../resourses/avatar.jpg')} style={styles.reviewAvatar} />
          </View>
          <View>
            <Text style={styles.reviewsTitle}>Ivanov Ican</Text>
            <View style={styles.starRow}>
              <StarRating
                disabled
                maxStars={5}
                rating={4}
                iconSet="Ionicons"
                emptyStar="ios-star-outline"
                fullStar="ios-star"
                halfStar="ios-star-half"
                starSize={15}
                buttonStyle={{width: 15, marginRight: 0, marginLeft: 0}}
                starColor="#fcaa54"
              />
            </View>
          </View>
        </View>
        <View>
          <Text style={styles.inputItemTitleText}>Jnpsd ,jkmijq ntjfask jkdsga fhgsadjkgfvsadghf ghsad asgdhjgds fags fashfgvs</Text>
        </View>
      </View>
    ))}
    <TouchableHighlight onPress={onCreate} style={styles.createReviewButton}>
      <Icon name="ios-add" size={45} color="white" />
    </TouchableHighlight>
  </View>
);

export const InputRate = ({ value, setValue, title }) => (
  <View>
    
  </View>
);
