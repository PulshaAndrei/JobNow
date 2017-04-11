import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import moment from 'moment';
require('moment/locale/ru');

import { Container } from '../../components/Common';
import { MainView, MainHeader } from '../../components/Main';

class Main extends Component {
  state = {
    currentDate: moment()
  }

  prev = () => {
    const newDate = this.state.currentDate.subtract(1, 'months');
    if (!newDate.isSameOrAfter(moment(), 'month')) {
      return;
    }
    //this.props.prev(newDate);
    this.setState({ currentDate: newDate });
  }
  next = () => {
    const newDate = this.state.currentDate.add(1, 'months');
    //this.props.next(newDate);
    this.setState({ currentDate: newDate });
  }

  render() {
    return (
      <Container>
        <MainView>
          <MainHeader
            onMenu={() => Actions.refresh({key: 'drawer', open: true })}
            onFilter={Actions.mainFilter}
            onPrevMonth={this.prev}
            onNextMonth={this.next}
            currentMonth={this.state.currentDate.format('MMMM').toUpperCase()}
          />
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
