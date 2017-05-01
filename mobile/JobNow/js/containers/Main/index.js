import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import moment from 'moment';
require('moment/locale/ru');

import { Container, NoJobs } from '../../components/Common';
import { MainView, MainHeader, JobList, JobItem, SectionHeader } from '../../components/Main';
import { loadJobs, setCurrentJob, jobsByMonth } from '../../modules/searchorders';

class Main extends Component {
  state = {
    currentDate: moment()
  }

  prev = () => {
    const newDate = this.state.currentDate.subtract(1, 'months');
    if (!newDate.isSameOrAfter(moment(), 'month')) return;
    this.setState({ currentDate: newDate });
  }
  next = () => {
    const newDate = this.state.currentDate.add(1, 'months');
    this.setState({ currentDate: newDate });
  }

  componentDidMount() {
    this.props.loadJobs();
  }
  goToJob(job) {
    this.props.setCurrentJob(job);
    Actions.orderDetails();
  }

  render() {
    const { categories, isLoading, loadJobs, jobsByMonth } = this.props;
    const jobs = jobsByMonth(this.state.currentDate);
    return (
      <Container>
        <MainView>
          <MainHeader
            onMenu={() => Actions.refresh({key: 'drawer', open: true })}
            onFilter={Actions.mainFilter}
            onPrevMonth={this.prev}
            onNextMonth={this.next}
            currentMonth={this.state.currentDate.format('MMMM').toUpperCase()}
          />
          <JobList onRefresh={loadJobs} refreshing={isLoading}>
            {(jobs.length === 0 && !isLoading) && <NoJobs title="Ничего не найдено" />}
            {jobs.map((item, i) => (
              <JobItem
                key={`item-${i}`}
                item={item}
                category={categories[item.categoryId]}
                prevItem={jobs[i-1]}
                onPress={() => this.goToJob(item)}
              />
            ))}
          </JobList>
        </MainView>
      </Container>
    );
  }
}

export default connect(
  state => ({
    isLoading: state.searchorders.isLoading,
    jobs: state.searchorders.jobs,
    categories: state.common.categories,
  }),
  { loadJobs, setCurrentJob, jobsByMonth }
)(Main);
