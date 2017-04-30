import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Alert } from 'react-native';
import moment from 'moment';
require('moment/locale/ru');

import { Container, InputItem, InputDescriptionItem, LoadingView, LoadingIndiactor } from '../../components/Common';
import { HeaderWithClose, HeaderWithBack } from '../../components/Header';
import { MyOrdersView, SelectDateTime, InputPrice, CreateOrderScrollView, DateRange, Proposals } from '../../components/MyOrders';
import { closeJob, loadCurrentJob } from '../../modules/myorders';

class MyOrderDetails extends Component {
  componentDidMount() {
    // this.props.loadCurrentJob();
  }
  render() {
    const { job, closeJob, isLoading, categories } = this.props;
    return (
      <Container>
        {//isLoading ? <LoadingView /> :
          <MyOrdersView>
            {job.isClosed ?
              <HeaderWithBack
                imageSource={require('../../resourses/home_background.png')}
                title={job.name}
                onBack={Actions.pop}
              /> :
              <HeaderWithClose
                imageSource={require('../../resourses/home_background.png')}
                title={job.name}
                onBack={Actions.pop}
                onClose={() => Alert.alert(
                    'Подтвердите действие',
                    `Удалить заказ «${job.name}»?`,
                    [{ text: 'Удалить', onPress: closeJob, style: 'destroy' }])}
              />}
            <CreateOrderScrollView>
              <Proposals title="Отклики" min={12} max={25} />
              <InputDescriptionItem disabled title="Описание" value={job.description} />
              <InputItem disabled title="Категория" value={categories[job.categoryId] && categories[job.categoryId].title} />
              <InputPrice disabled title="Максимальная цена" value={job.priceTo} />
              <DateRange dateFrom={moment.unix(job.startWork)} dateTo={moment.unix(job.endWork)} isAllDay={job.isAllDay} />
              <InputItem disabled title="Адрес" value={job.address} />
            </CreateOrderScrollView>
          </MyOrdersView>}
          <LoadingIndiactor visible={isLoading} />
      </Container>
    );
  }
}

export default connect(
  state => ({
    isLoading: state.myorders.isLoading,
    job: state.myorders.currentJob,
    categories: state.common.categories,
  }),
  { closeJob, loadCurrentJob }
)(MyOrderDetails);
