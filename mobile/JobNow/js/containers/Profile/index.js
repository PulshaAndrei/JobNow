import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import { Container } from '../../components/Common';
import { ProfileView, ProfileHeader } from '../../components/Profile';

class Profile extends Component {
  render() {
    return (
      <Container>
        <ProfileView>
          <ProfileHeader
            onMenu={() => Actions.refresh({key: 'drawer', open: true })}
            onFilter={Actions.mainFilter}
          />
        </ProfileView>
      </Container>
    );
  }
}

export default connect(
  state => ({},
    { /*login*/ }
  )
)(Profile);
