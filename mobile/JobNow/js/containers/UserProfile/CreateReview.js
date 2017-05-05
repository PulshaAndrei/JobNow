import React, { Component } from 'react';
import ReactNative, { Keyboard, Platform, Animated, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Communications from 'react-native-communications';

import { Container, InputDescriptionItem, LoadingIndiactor } from '../../components/Common';
import { HeaderWithSave } from '../../components/Header';
import { ProfileView, InputRate } from '../../components/Profile';
import { phoneMask } from '../../modules/user';

class CreateReview extends Component {
  state = {
    text: '',
    rate: 0,
    isOpenKeyboard: false,
    animationHeight: new Animated.Value(220),
  }
  componentWillMount () {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      this.setState({ isOpenKeyboard: true });
      Animated.timing(this.state.animationHeight, { toValue: 160, duration: 100 }).start();
    });
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      this.setState({ isOpenKeyboard: false });
      Animated.timing(this.state.animationHeight, { toValue: 220 }).start();
    });
  }
  componentWillUnmount () {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }
  render() {
    const { user, currentJob, createReview, isLoading } = this.props;
    const { rate, text } = this.state;
    return (
      <Container>
        <ProfileView>
          <HeaderWithSave
            isOpenKeyboard={this.state.isOpenKeyboard}
            animationHeight={this.state.animationHeight}
            imageSource={require('../../resourses/home_background.png')}
            title="Оставить отзыв"
            onBack={Actions.pop}
            onSave={() => {
              Keyboard.dismiss();
              //createReview();
            }}
            isSaveEnabled={ rate !== 0 && text !== '' }
          />
          <KeyboardAwareScrollView ref='scrollView'>
            <InputRate title="Рейтинг" value={rate} setValue={rate => this.setState({ rate })} />
            <InputDescriptionItem
              title="Отзыв"
              value={text}
              setValue={text => this.setState({ text })}
              onFocus={Platform.OS === 'ios' && ((event: Event) => {
                let scrollResponder = this.refs.scrollView.getScrollResponder();
                let handle = ReactNative.findNodeHandle(event.target);
                setTimeout(() => scrollResponder.scrollResponderScrollNativeHandleToKeyboard(handle, 170, true), 300);
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
    currentJob: state.searchorders.currentJob,
    user: state.searchorders.currentJob.user,
  }),
  { /*createReview*/ }
)(CreateReview);
