import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import moment from 'moment';
require('moment/locale/ru');

import { Container, SwitchItem, NoJobs } from '../../components/Common';
import { HeaderWithMenu } from '../../components/Header';
import { MyProposalsView } from '../../components/MyProposals';
import { JobList, JobItem, SectionHeader } from '../../components/Main';
import { loadJobs, setCurrentJob } from '../../modules/myproposals';

class MyProposals extends Component {
  state = {
    showClosed: false,
  }
  componentDidMount() {
    this.props.loadJobs();
  }
  goToJob(job, closed) {
    this.props.setCurrentJob({ ...job, isClosed: closed});
    Actions.orderDetailsByProposal();
  }
  render() {
    const { showClosed } = this.state;
    const { jobs, categories, isLoading, loadJobs } = this.props;
    return (
      <Container>
        <MyProposalsView>
          <HeaderWithMenu
            imageSource={require('../../resourses/home_background.png')}
            title="Мои отклики"
            onMenu={() => Actions.refresh({key: 'drawer', open: true })}
          />
          <SwitchItem title="Показать завершенные" value={showClosed} setValue={showClosed => this.setState({ showClosed })} />
          <JobList onRefresh={loadJobs} refreshing={isLoading}>
            {(jobs.filter((item) => moment().unix() <= item.endWork).length === 0 && !isLoading) && <NoJobs title="Нет активных откликов" />}
            {jobs.map((item, i) => (
              <JobItem
                key={`item-${i}`}
                item={item}
                category={categories[item.categoryId]}
                onPress={() => this.goToJob(item, true)}
                prevItem={jobs[i-1]}
              />
            ))}
          </JobList>
        </MyProposalsView>
      </Container>
    );
  }
}

export default connect(
  state => ({
    isLoading: state.myproposals.isLoading,
    jobs: state.myproposals.jobs,
    categories: state.common.categories,
  }),
  { loadJobs, setCurrentJob }
)(MyProposals);
