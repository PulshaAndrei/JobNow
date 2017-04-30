import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Keyboard } from 'react-native';
import moment from 'moment';
import DateTimePicker from 'react-native-modal-datetime-picker';
require('moment/locale/ru');

import { Container, InputItem, InputDescriptionItem, LoadingIndiactor } from '../../components/Common';
import { HeaderWithSave } from '../../components/Header';
import { MyOrdersView, SelectDateTime, InputPrice, CreateOrderScrollView, CategoryItem } from '../../components/MyOrders';
import { setNewJob, saveJob } from '../../modules/myorders';

class CreateOrder extends Component {
  state = {
    isDateTimePickerVisible: false,
    dateTimePickerMode: 'date',
    dateTimePickerType: 'from',
    dateTimePickerInitDate: moment().unix(),
  }
  showDateTimePicker = (type, mode) => this.setState({
    isDateTimePickerVisible: true,
    dateTimePickerMode: mode,
    dateTimePickerType: type,
    dateTimePickerInitDate: type === 'from' ? this.props.newJob.startWork : this.props.newJob.endWork,
  });
  hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });
  handleDatePicked = (date) => {
    const { newJob, setNewJob } = this.props;
    if (date.getTime()) {
      const dt = moment(date);
      if (this.state.dateTimePickerType === 'from') {
        if (this.state.dateTimePickerMode === 'time') {
          const current = moment.unix(newJob.startWork);
          dt = dt.date(current.date()).month(current.month()).year(current.year())
        }
        setNewJob({ ...newJob, startWork: dt.unix() });
        if (dt.unix() > newJob.endWork) setNewJob({ ...newJob, startWork: dt.unix(), endWork: dt.unix() });
      }
      else {
        if (this.state.dateTimePickerMode === 'time') {
          const current = moment.unix(newJob.endWork);
          dt = dt.date(current.date()).month(current.month()).year(current.year())
        }
        setNewJob({ ...newJob, endWork: dt.unix() });
        if (dt.unix() < newJob.startWork) setNewJob({ ...newJob, endWork: newJob.startWork });
      }
    }
    this.hideDateTimePicker();
  };
  render() {
    const { newJob, setNewJob, categories, saveJob } = this.props;
    const { isDateTimePickerVisible, dateTimePickerType, dateTimePickerMode, dateTimePickerInitDate } = this.state;
    return (
      <Container>
        <MyOrdersView>
          <HeaderWithSave
            imageSource={require('../../resourses/home_background.png')}
            title="Создать заказ"
            onBack={Actions.pop}
            onSave={() => {
              Keyboard.dismiss();
              saveJob();
            }}
            isSaveEnabled={ newJob.name && newJob.description && newJob.priceTo }
          />
          <CreateOrderScrollView>
            <InputItem title="Название" value={newJob.name} setValue={name => setNewJob({ ...newJob, name })} />
            <InputDescriptionItem title="Описание" value={newJob.description} setValue={description => setNewJob({ ...newJob, description })} />
            <InputPrice value={newJob.priceTo} setValue={priceTo => setNewJob({ ...newJob, priceTo })} />
            <CategoryItem title="Категория" value={categories[newJob.categoryId].title} onPress={Actions.createOrderCategory}/>
            <SelectDateTime
              isAllDay={newJob.allDay}
              dateFrom={moment.unix(newJob.startWork)}
              dateTo={moment.unix(newJob.endWork)}
              setAllDay={(allDay) => setNewJob({ ...newJob, allDay })}
              onPress={(type, mode) => this.showDateTimePicker(type, mode) }
            />
            <InputItem title="Адрес" value={newJob.address} setValue={address => setNewJob({ ...newJob, address })} />
          </CreateOrderScrollView>
          <DateTimePicker
            isVisible={isDateTimePickerVisible}
            mode={(newJob.allDay && dateTimePickerMode === 'datetime') ? 'date' : dateTimePickerMode}
            date={moment.unix(dateTimePickerInitDate).toDate()}
            minimumDate={dateTimePickerType === 'from' ? new Date() : moment.unix(newJob.startWork).toDate()}
            onConfirm={(date) => this.handleDatePicked(date)}
            onCancel={() => this.hideDateTimePicker()}
          />
        </MyOrdersView>
        <LoadingIndiactor visible={this.props.isLoading} />
      </Container>
    );
  }
}

export default connect(
  state => ({
    isLoading: state.myorders.isLoading,
    newJob: state.myorders.newJob,
    categories: state.common.categories,
  }),
  { setNewJob, saveJob }
)(CreateOrder);
