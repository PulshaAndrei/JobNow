import React, { Component } from 'react';
import ReactNative, { Keyboard, Platform, Animated, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { Container, SwitchItem, InputItem, LoadingIndiactor } from '../../components/Common';
import { ProfileView, ProfileHeader, ProfileScrollView } from '../../components/Profile';
import { phoneMask, updateUser } from '../../modules/user';

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
    const { updateUser, isLoading } = this.props;
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
          </KeyboardAwareScrollView>
        </ProfileView>
        <LoadingIndiactor visible={isLoading} />
      </Container>
    );
  }
}

export default connect(
  state => ({
    isLoading: state.user.isLoading,
    user: state.user.user,
    phoneMask
  }),
  { updateUser }
)(Profile);
