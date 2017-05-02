import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Dimensions } from 'react-native';
import PopupDialog, { SlideAnimation, DialogTitle } from 'react-native-popup-dialog';
import moment from 'moment';
require('moment/locale/ru');

import { Container, InputItem, InputDescriptionItem, ProfileItem, ApplyButton, LoadingIndiactor } from '../../components/Common';
import { HeaderWithBack } from '../../components/Header';
import PopupView, { MyOrdersView, SelectDateTime, InputPrice, CreateOrderScrollView, DateRange, Proposals, MyProposal } from '../../components/MyOrders';
import { sendProposal, changeProposal, removeProposal } from '../../modules/searchorders';

class OrderDetails extends Component {
  componentDidMount() {
    // this.props.loadCurrentJob();
  }
  render() {
    const { job, proposePrice, isLoading, categories, sendProposal, currentUser, changeProposal, removeProposal } = this.props;
    var myProposal = job.bets.find(item => item.userId === currentUser.id);
    myProposal = myProposal ? myProposal.price : null;
    return (
      <Container>
        <MyOrdersView>
          <HeaderWithBack
            imageSource={require('../../resourses/home_background.png')}
            title={job.name}
            onBack={Actions.pop}
          />
          <CreateOrderScrollView>
            <ProfileItem name={job.userId} rating={4.5} />
            {myProposal && <MyProposal title="Мой отклик" value={myProposal} onPress={() => this.popupDialog.show()} />}
            <InputDescriptionItem disabled title="Описание" value={job.description} />
            <InputPrice disabled title="Максимальная цена" value={job.priceTo} />
            <Proposals title="Отклики" proposals={job.bets} disabled />
            <DateRange dateFrom={moment.unix(job.startWork)} dateTo={moment(job.endWork)} isAllDay={job.allDay} />
            <InputItem disabled title="Адрес" value={job.address} />
          </CreateOrderScrollView>
          <PopupDialog
            ref={(popupDialog) => { this.popupDialog = popupDialog; }}
            width={Dimensions.get('window').width - 40}
            dialogAnimation = { new SlideAnimation({ slideFrom: 'bottom' }) }
            dialogStyle={{ zIndex: 10}}
          >
            <PopupView
              maxPrice={job.priceTo}
              currentPrice={myProposal || job.priceTo}
              isChange={!!myProposal}
              onClose={() => this.popupDialog.dismiss()}
              onDelete={() => removeProposal()}
              onSend={(value) => {
                this.popupDialog.dismiss();
                sendProposal(value);
              }}
              onChange={(value) => {
                this.popupDialog.dismiss();
                changeProposal(value);
              }}/>
          </PopupDialog>
          {!myProposal && <ApplyButton onPress={() => this.popupDialog.show()} />}
        </MyOrdersView>
        <LoadingIndiactor visible={isLoading} />
      </Container>
    );
  }
}


export default connect(
  state => ({
    isLoading: state.searchorders.isLoading,
    job: state.searchorders.currentJob,
    categories: state.common.categories,
    currentUser: state.user.user,
  }),
  { sendProposal, changeProposal, removeProposal }
)(OrderDetails);