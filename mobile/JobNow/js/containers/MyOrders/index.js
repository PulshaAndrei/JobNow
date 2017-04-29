import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import moment from 'moment';
require('moment/locale/ru');

import { Container } from '../../components/Common';
import { HeaderWithMenu } from '../../components/Header';
import { MyOrdersView, JobItemWithProposals, CreateButton } from '../../components/MyOrders';
import { JobList, SectionHeader } from '../../components/Main';
import { loadJobs } from '../../modules/myorders';

class MyOrders extends Component {
  componentDidMount() {
    this.props.loadJobs();
  }
  render() {
    const { jobs, categories, isLoading, loadJobs } = this.props;
    return (
      <Container>
        <MyOrdersView>
          <HeaderWithMenu
            imageSource={require('../../resourses/home_background.png')}
            title="Мои заказы"
            onMenu={() => Actions.refresh({key: 'drawer', open: true })}
          />
          <CreateButton onCreate={Actions.createOrder} />
          <JobList onRefresh={loadJobs} refreshing={isLoading}>
            <SectionHeader title="АКТИВНЫЕ" />
            {jobs.map((item, i) => (moment().unix() <= item.endWork &&
              <JobItemWithProposals
                key={`item-${i}`}
                item={item}
                category={categories[item.categoryId]}
                onPress={Actions.myOrderDetails}
                prevItem={jobs[i-1]}
              />
            ))}
            <SectionHeader title="ЗАВЕРШЕННЫЕ" />
            {jobs.map((item, i) => (moment().unix() > item.endWork &&
              <JobItemWithProposals
                key={`item-${i}`}
                item={item}
                category={categories[item.categoryId]}
                prevItem={jobs[i-1]}
                isEnded={true}
              />
            ))}
          </JobList>
        </MyOrdersView>
      </Container>
    );
  }
}

export default connect(
  state => ({
    isLoading: state.myorders.isLoading,
    jobs: state.myorders.jobs,
    categories: state.common.categories,
  }),
  { loadJobs }
)(MyOrders);
