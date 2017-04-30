import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import moment from 'moment';
require('moment/locale/ru');

import { Container, NoJobs } from '../../components/Common';
import { HeaderWithMenu } from '../../components/Header';
import { MyOrdersView, JobItemWithProposals, CreateButton } from '../../components/MyOrders';
import { JobList, SectionHeader } from '../../components/Main';
import { loadJobs, setCurrentJob } from '../../modules/myorders';

class MyOrders extends Component {
  componentDidMount() {
    this.props.loadJobs();
  }
  goToJob(job, closed) {
    this.props.setCurrentJob({ ...job, isClosed: closed});
    Actions.myOrderDetails();
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
            {(jobs.filter((item) => moment().unix() <= item.endWork).length === 0 && !isLoading) && <NoJobs title="Нет активных заказов" />}
            {jobs.map((item, i) => (moment().unix() <= item.endWork &&
              <JobItemWithProposals
                key={`item-${i}`}
                item={item}
                category={categories[item.categoryId]}
                onPress={() => this.goToJob(item)}
                prevItem={jobs[i-1]}
              />
            ))}
            <SectionHeader title="ЗАВЕРШЕННЫЕ" />
            {(jobs.filter((item) => moment().unix() > item.endWork).length === 0 && !isLoading) && <NoJobs title="Нет завершенных заказов" />}
            {jobs.map((item, i) => (moment().unix() > item.endWork &&
              <JobItemWithProposals
                key={`item-${i}`}
                item={item}
                category={categories[item.categoryId]}
                prevItem={jobs[i-1]}
                onPress={() => this.goToJob(item, true)}
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
  { loadJobs, setCurrentJob }
)(MyOrders);
