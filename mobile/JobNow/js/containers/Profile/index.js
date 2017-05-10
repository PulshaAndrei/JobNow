import React, { Component } from 'react';
import ReactNative, { Keyboard, Platform, Animated, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ImagePicker from 'react-native-image-picker'

import { Container, SwitchItem, InputItem, LoadingIndiactor } from '../../components/Common';
import { ProfileView, ProfileHeader, ProfileScrollView, Reviews } from '../../components/Profile';
import { phoneMask, updateUser, uploadImage } from '../../modules/user';
import { setCurrentUser, loadReviews } from '../../modules/userprofile';

class Profile extends Component {
  state = {
    givenName: '',
    familyName: '',
    phone: '',
    email: '',
    communicationMethod: 0,
    isOpenKeyboard: false,
    animationHeight: new Animated.Value(290),
  }

  componentDidMount() {
    this.setState(this.props.user);
    this.props.setCurrentUser(this.props.user);
    this.props.loadReviews();
  }
  componentWillMount () {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      this.setState({ isOpenKeyboard: true });
      Animated.timing(this.state.animationHeight, { toValue: 160, duration: 100 }).start();
    });
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      this.setState({ isOpenKeyboard: false });
      Animated.timing(this.state.animationHeight, { toValue: 290 }).start();
    });
  }
  componentWillUnmount () {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  render() {
    const { updateUser, isLoading, reviews, user, uploadImage } = this.props;
    //console.warn('', this.state.animationHeight);
    return (
      <Container>
        <ProfileView>
          <ProfileHeader
            isOpenKeyboard={this.state.isOpenKeyboard}
            animationHeight={this.state.animationHeight}
            onMenu={() => Actions.refresh({key: 'drawer', open: true })}
            onSave={() => updateUser(this.state)}
            name={`${this.props.user.givenName} ${this.props.user.familyName}`}
            onPhoto={() => {
              ImagePicker.launchImageLibrary({}, response  => {
                uploadImage(response.uri)
                  //.then(url => console.warn('url: ', url))
                  //.catch(error => console.warn(error))
              })
            }}
          />
          <KeyboardAwareScrollView ref='scrollView'>
            <InputItem
              title="Имя"
              value={this.state.givenName}
              setValue={(value) => this.setState({ givenName: value })}
              //onFocus={(event: Event) => this.refs.scroll.scrollToFocusedInput(ReactNative.findNodeHandle(event.target))}
            />
            <InputItem title="Фамилия" value={this.state.familyName} setValue={(value) => this.setState({ familyName: value })} />
            <InputItem title="Номер телефона" value={phoneMask(this.state.phone)} disabled />
            <SwitchItem title="Телефон виден всем" value={!this.state.communicationMethod} setValue={(value) => this.setState({ communicationMethod: value ? 0 : 1 })} />
            <InputItem
              title="E-mail"
              value={this.state.email}
              setValue={(value) => this.setState({ email: value })}
              keyboardType="email-address"
              onFocus={Platform.OS === 'ios' && ((event: Event) => {
                let scrollResponder = this.refs.scrollView.getScrollResponder();
                let handle = ReactNative.findNodeHandle(event.target);
                setTimeout(() => scrollResponder.scrollResponderScrollNativeHandleToKeyboard(handle, 160, true), 300);
              })}
            />
            <Reviews
              reviews={reviews}
              rate={user.rate}
              reviewCount={user.reviewCount}
              hasMyReview={true}
            />
          </KeyboardAwareScrollView>
        </ProfileView>
        <LoadingIndiactor visible={isLoading} />
      </Container>
    );
  }
}

export default connect(
  state => ({
    isLoading: state.user.isLoading || state.userprofile.isLoading,
    reviews: state.userprofile.reviews,
    user: state.user.user,
    phoneMask
  }),
  { updateUser, setCurrentUser, loadReviews, uploadImage }
)(Profile);
