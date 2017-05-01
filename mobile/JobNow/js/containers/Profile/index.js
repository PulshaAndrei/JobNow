import React, { Component } from 'react';
import ReactNative from 'react-native';
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
  }
  componentDidMount() {
    this.setState(this.props.user);
  }
  render() {
    const { updateUser, isLoading } = this.props;
    return (
      <Container>
        <ProfileView>
          <ProfileHeader
            onMenu={() => Actions.refresh({key: 'drawer', open: true })}
            onSave={() => updateUser(this.state)}
            name={`${this.props.user.givenName} ${this.props.user.familyName}`}
          />
          <KeyboardAwareScrollView ref='scroll' enableAutoAutomaticScroll={false}>
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
              onFocus={(event: Event) => {
                const UIManager = require('NativeModules').UIManager;
                const handle = ReactNative.findNodeHandle(event.target);
                UIManager.measureLayoutRelativeToParent(handle, () => {}, (x, y, w, h) => this.refs.scroll.scrollToPosition(0, h + 60, true))}}
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
