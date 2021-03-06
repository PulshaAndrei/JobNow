import React from 'react';
import { View, TouchableHighlight, Text, TextInput, Switch, Image } from 'react-native';
import StarRating from 'react-native-star-rating';
import Icon from 'react-native-vector-icons/Ionicons';
import Spinner from 'react-native-spinkit';
import MapView from 'react-native-maps';

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

export const InputItem = ({ title, value, setValue, keyboardType, disabled, onFocus }) => (
  <View style={styles.inputItem}>
    <View>
      <Text style={styles.inputItemTitleText}>{title}</Text>
    </View>
    <View style={styles.inputItemTextInputView}>
      {disabled ?
        <Text style={styles.selectDateText}>{value}</Text> :
        <TextInput
          value={value}
          onChangeText={setValue}
          style={styles.inputItemTextInput}
          keyboardType={keyboardType}
          autoCapitalize="sentences"
          underlineColorAndroid={'transparent'}
          autoCorrect={false}
          onFocus={onFocus}
        />}
    </View>
  </View>
);

export const InputDescriptionItem = ({ title, value, setValue, disabled, isReviewDescription }) => (
  <View style={styles.inputDescriptionItem}>
    <View>
      <Text style={styles.inputItemTitleText}>{title}</Text>
    </View>
    <View>
      {disabled ?
        <Text style={[styles.inputItemTextInput, { textAlign: 'left', marginTop: 10 }]}>{value}</Text>
        : <TextInput
          value={value}
          onChangeText={setValue}
          multiline
          style={[
            styles.inputItemTextInput,
            { textAlign: 'left', marginTop: 10, textAlignVertical: 'top', height: /*isReviewDescription ? 85 :*/ 65 }]}
          autoCapitalize="sentences"
          autoCorrect={false}
          underlineColorAndroid={'transparent'}
        />}
    </View>
  </View>
);

export const ProfileItem = ({ name, rating, image, reviewCount, onPress }) => (
  <TouchableHighlight underlayColor="transparent" onPress={onPress}>
    <View style={styles.profileItem}>
      <View>
        <Image
          source={!image ? require('../../resourses/avatar.png') : { uri: image }}
          style={styles.jobItemAvatar}
        />
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
          <Text style={styles.starText}>{reviewCount} отзывов</Text>
        </View>
      </View>
    </View>
  </TouchableHighlight>
);

export const ApplyButton = ({ onPress }) => (
  <TouchableHighlight underlayColor="transparent" style={styles.applyButton} onPress={onPress}>
    <Icon name="ios-checkmark" size={45} color="white" />
  </TouchableHighlight>
);

export const LoadingIndiactor = ({ visible }) => (
  <View style={visible ? styles.loadingIndicatorVisible : null}>
    <Spinner isVisible={visible} size={100} type="9CubeGrid" color="#FFFFFF" style={styles.spinner} />
  </View>
);

export const LoadingView = () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Spinner isVisible={true} size={50} type="FadingCircleAlt" color="#13bcbf" style={styles.spinner} />
  </View>
);

export const Category = ({ title, color, selected, onPress }) => (
  <TouchableHighlight underlayColor="transparent" onPress={onPress}>
    <View style={[styles.categoryItem, selected && { backgroundColor: '#f8f8fa', borderColor: color }]}>
      <Icon name="ios-checkmark-outline" size={50} color={selected ? color : "#bbbbbd"} />
      <Text style={styles.categoryTitle}>{title}</Text>
    </View>
  </TouchableHighlight>
);

export const NoJobs = ({ title }) => (
  <View style={styles.noJobs}>
    <Icon name="ios-briefcase-outline" size={35} color="#bbbbbd" />
    <Text style={[styles.categoryTitle, { color: "#bbbbbd" }]}>{title}</Text>
  </View>
);

export const MapItem = ({ latitude, longitude, setCoords }) => (
  <View style={styles.mapItem}>
    <MapView
      style={{ flex: 1 }}
      showsUserLocation
      followsUserLocation
      showsMyLocationButton
      initialRegion={{
        latitude: latitude || 53.903966,
        longitude: longitude || 27.553377,
        latitudeDelta: 0.03,
        longitudeDelta: 0.03,
      }}
    >
      {(latitude && longitude) &&
        <MapView.Marker draggable
          coordinate={{latitude, longitude}}
          onDragEnd={(e) => setCoords(e.nativeEvent.coordinate)}
        />}
    </MapView>
    <View style={styles.mapNote}>
      <Text style={styles.mapNoteText}>Нажмите и удерживайте маркер, чтобы переместить</Text>
    </View>
  </View>
);

export const MapItemDisabled = ({ latitude, longitude }) => (
  <View style={styles.mapItem}>
    <MapView
      style={{ flex: 1 }}
      showsUserLocation
      showsMyLocationButton
      initialRegion={{
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      }}
    >
      <MapView.Marker
        coordinate={{latitude, longitude}}
      />
    </MapView>
  </View>
);
