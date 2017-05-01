import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Alert } from 'react-native';
import moment from 'moment';
require('moment/locale/ru');

import { Container } from '../../components/Common';
import { HeaderWithClose, HeaderWithBack } from '../../components/Header';
import { MyOrdersView, CreateOrderScrollView, Proposal } from '../../components/MyOrders';
import { loadBetUsers } from '../../modules/myorders';

class MyOrderProposals extends Component {
  render() {
    const { job, users } = this.props;
    return (
      <Container>
        <MyOrdersView>
          <HeaderWithBack
            imageSource={require('../../resourses/home_background.png')}
            title={`Отклики на заказ «${job.name}»`}
            onBack={Actions.pop}
          />
          <CreateOrderScrollView>
            {job.bets.map((item, i) => (
              <Proposal key={i} bet={item} user={users.find(el => el.id === item.userId)} />
            ))}
          </CreateOrderScrollView>
        </MyOrdersView>
      </Container>
    );
  }
}

export default connect(
  state => ({
    job: state.myorders.currentJob,
    users: state.myorders.users,
  }),
  { loadBetUsers }
)(MyOrderProposals);
