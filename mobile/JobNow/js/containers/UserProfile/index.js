import React, { Component } from 'react';
import ReactNative, { Keyboard, Platform, Animated, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Communications from 'react-native-communications';

import { Container, SwitchItem, LoadingIndiactor } from '../../components/Common';
import { ProfileView, ProfileHeaderWithBack, ProfileScrollView, PhoneWithButtons, EmailWithButton, Reviews } from '../../components/Profile';
import { phoneMask } from '../../modules/user';

class UserProfile extends Component {
  render() {
    const { user, currentJob } = this.props;
    return (
      <Container>
        <ProfileView>
          <ProfileHeaderWithBack
            onBack={Actions.pop}
            name={`${user.givenName} ${user.familyName}`}
          />
          <ScrollView>
            {!user.communicationMethod && <PhoneWithButtons
              title="Номер телефона"
              value={phoneMask(user.phone)}
              onCall={() => Communications.phonecall(phoneMask(user.phone), true)}
              onMessage={() => Communications.text(phoneMask(user.phone))}
            />}
            <EmailWithButton
              title="E-mail"
              value={user.email}
              onMessage={() => Communications.email([user.email], null, null, `JobNow - Заказ "${currentJob.name}`, '')}
            />
            <Reviews onCreate={Actions.userReviewByMain} reviews={user.reviews} rate={4.5/*user.rate*/} />
          </ScrollView>
        </ProfileView>
        {/* <LoadingIndiactor visible={isLoading} /> */}
      </Container>
    );
  }
}

export default connect(
  state => ({
    currentJob: state.searchorders.currentJob,
    user: state.searchorders.currentJob.user,
    phoneMask
  }),
  { }
)(UserProfile);
