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
    const { user, reviews, isLoading, myUserId } = this.props;
    return (
      <Container>
        {isLoading ? <LoadingIndiactor visible /> :
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
              {user.email !== '' &&
                <EmailWithButton
                  title="E-mail"
                  value={user.email}
                  onMessage={() => Communications.email([user.email], null, null, 'JobNow', '')}
                />}
              <Reviews
                onCreate={Actions.userReviewByMain}
                reviews={reviews}
                rate={user.rate}
                reviewCount={user.reviewCount}
                hasMyReview={reviews.map(item => item.userFromId).indexOf(myUserId) !== -1}
              />
            </ScrollView>
          </ProfileView>}
      </Container>
    );
  }
}

export default connect(
  state => ({
    myUserId: state.user.user.id,
    user: state.userprofile.user,
    reviews: state.userprofile.reviews,
    isLoading: state.userprofile.isLoading,
    phoneMask
  })
)(UserProfile);
