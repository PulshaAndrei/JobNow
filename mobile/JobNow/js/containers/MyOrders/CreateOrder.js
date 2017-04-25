import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import moment from 'moment';
require('moment/locale/ru');

import { Container, InputItem, InputDescriptionItem } from '../../components/Common';
import { HeaderWithSave } from '../../components/Header';
import { MyOrdersView, SelectDateTime, InputPrice, CreateOrderScrollView } from '../../components/MyOrders';

class CreateOrder extends Component {
  render() {
    return (
      <Container>
        <MyOrdersView>
          <HeaderWithSave
            imageSource={require('../../resourses/home_background.png')}
            title="Создать заказ"
            onBack={Actions.pop}
            onSave={() => {}}
          />
          <CreateOrderScrollView>
            <InputItem title="Название" value="Положить плитку" setValue={() => {}} />
            <InputDescriptionItem title="Описание" value="Нудно выо аоылл ырад ыдлвра одырф оадлоыф аолы ф" setValue={() => {}} />
            <InputPrice value="12.5" setValue={() => {}} />
            <SelectDateTime isAllDay={false} dateFrom={moment()} dateTo={moment()} setDates={() => {}} />
            <InputItem title="Адрес" value="г. Минск, ул. Октябрьская 10/2" setValue={() => {}} />
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
)(CreateOrder);
