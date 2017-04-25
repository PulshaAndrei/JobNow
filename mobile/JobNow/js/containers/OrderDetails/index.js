import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import moment from 'moment';
require('moment/locale/ru');

import { Container, InputItem, InputDescriptionItem, ProfileItem, ApplyButton } from '../../components/Common';
import { HeaderWithBack } from '../../components/Header';
import { MyOrdersView, SelectDateTime, InputPrice, CreateOrderScrollView, DateRange, Proposals, MyProposal } from '../../components/MyOrders';

class OrderDetails extends Component {
  render() {
    return (
      <Container>
        <MyOrdersView>
          <HeaderWithBack
            imageSource={require('../../resourses/home_background.png')}
            title="Положить плитку"
            onBack={Actions.pop}
          />
          {!this.props.isOrderWithMyProposal && <ApplyButton onPress={() => {}} />}
          <CreateOrderScrollView>
            <ProfileItem name="Иван Иванов" rating={4.5} />
            {this.props.isOrderWithMyProposal && <MyProposal title="Мой отклик" value={15.25} />}
            <InputDescriptionItem disabled title="Описание" value="Нудно выо аоылл ырад ыдлвра одырф оадлоыф аолы ф" />
            <InputPrice disabled title="Максимальная цена" value="25" />
            <Proposals title="Отклики" min={12} max={25} disabled />
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
)(OrderDetails);
