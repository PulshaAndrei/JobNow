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
import { sendProposal, changeProposal, removeProposal } from '../../modules/orderdetails';
import { loadUser } from '../../modules/userprofile';

class OrderDetails extends Component {
  state = {
    isOpenPopup: false,
  }
  goToUserProfile(userId) {
    if (this.props.fromScreen === 'main') {
      this.props.loadUser(userId, 'userReviewByMain');
      Actions.userDetailsByMain();
    }
    else if (this.props.fromScreen === 'myproposals') {
      this.props.loadUser(userId, 'userReviewByMyApplication');
      Actions.userDetailsByMyApplication();
    }
  }
  render() {
    const { job, proposePrice, isLoading, categories, sendProposal, currentUser, changeProposal, removeProposal } = this.props;
    var myProposal = job.bets.find(item => item.userId === currentUser.id);
    myProposal = myProposal ? myProposal.price : null;
    console.warn('', job.user);
    return (
      <Container>
        <MyOrdersView>
          <HeaderWithBack
            imageSource={require('../../resourses/home_background.png')}
            title={job.name}
            onBack={Actions.pop}
          />
          <CreateOrderScrollView>
            <ProfileItem
              name={job.user.givenName + " " + job.user.familyName}
              rating={job.user.rate}
              reviewCount={job.user.reviewCount}
              onPress={() => this.goToUserProfile(job.user.id)}
            />
            {myProposal && <MyProposal title="Мой отклик" value={myProposal} onPress={() => this.popupDialog.show()} />}
            <InputDescriptionItem disabled title="Описание" value={job.description} />
            <InputPrice disabled title="Максимальная цена" value={job.priceTo} />
            <Proposals title="Отклики" proposals={job.bets} disabled />
            <DateRange dateFrom={moment.unix(job.startWork)} dateTo={moment(job.endWork)} isAllDay={job.allDay} />
            <InputItem disabled title="Адрес" value={job.address} />
          </CreateOrderScrollView>
          <PopupDialog
            ref={(popupDialog) => { this.popupDialog = popupDialog; }}
            onShowed={() => this.setState({ isOpenPopup: true })}
            onDismissed={() => this.setState({ isOpenPopup: false })}
            width={Dimensions.get('window').width - 40}
          >
            <PopupView
              maxPrice={job.priceTo}
              currentPrice={myProposal || job.priceTo}
              isChange={!!myProposal}
              onClose={() => {
                this.popupDialog.dismiss();
                this.setState({ isOpenPopup: false });
              }}
              onDelete={() => {
                this.popupDialog.dismiss();
                this.setState({ isOpenPopup: false });
                removeProposal();
              }}
              onSend={(value) => {
                this.popupDialog.dismiss();
                this.setState({ isOpenPopup: false });
                sendProposal(value);
              }}
              onChange={(value) => {
                this.popupDialog.dismiss();
                this.setState({ isOpenPopup: false });
                changeProposal(value);
              }}/>
          </PopupDialog>
          {(!myProposal && !this.state.isOpenPopup) && <ApplyButton onPress={() => {
            this.setState({ isOpenPopup: true });
            this.popupDialog.show();
          }} />}
        </MyOrdersView>
        <LoadingIndiactor visible={isLoading} />
      </Container>
    );
  }
}


export default connect(
  state => ({
    isLoading: state.orderdetails.isLoading,
    job: state.orderdetails.job,
    fromScreen: state.orderdetails.fromScreen,
    categories: state.common.categories,
    currentUser: state.user.user,
  }),
  { sendProposal, changeProposal, removeProposal, loadUser }
)(OrderDetails);
