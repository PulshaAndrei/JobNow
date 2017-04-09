import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import { Container } from '../../components/Common';
import { MainView, MainHeader } from '../../components/Main';

class Main extends Component {
  render() {
    return (
      <Container>
        <MainView>
          <MainHeader onMenu={() => Actions.refresh({key: 'drawer', open: true })} />
        </MainView>
      </Container>
    );
  }
}

export default connect(
  state => ({},
    { /*login*/ }
  )
)(Main);
