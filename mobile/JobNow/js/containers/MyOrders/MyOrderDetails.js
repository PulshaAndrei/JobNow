import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import moment from 'moment';
require('moment/locale/ru');

import { Container, InputItem, InputDescriptionItem } from '../../components/Common';
import { HeaderWithClose } from '../../components/Header';
import { MyOrdersView, SelectDateTime, InputPrice, CreateOrderScrollView, DateRange, Proposals } from '../../components/MyOrders';

class MyOrderDetails extends Component {
  render() {
    return (
      <Container>
        <MyOrdersView>
          <HeaderWithClose
            imageSource={require('../../resourses/home_background.png')}
            title="Положить плитку"
            onBack={Actions.pop}
            onClose={() => {}}
          />
          <CreateOrderScrollView>
            <Proposals title="Отклики" min={12} max={25} />
            <InputDescriptionItem disabled title="Описание" value="Нудно выо аоылл ырад ыдлвра одырф оадлоыф аолы ф" />
            <InputPrice disabled title="Максимальная цена" value="25" />
            <DateRange dateFrom={moment()} dateTo={moment()} isAllDay={false} />
            <InputItem disabled title="Адрес" value="г. Минск, ул. Октябрьская 10/2" />
          </CreateOrderScrollView>
        </MyOrdersView>
      </Container>
    );
  }
}

export default connect(
  state => ({},
    { /*login*/ }
  )
)(MyOrderDetails);
