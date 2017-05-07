import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import moment from 'moment';
import haversine from 'haversine';
require('moment/locale/ru');

import { Container, NoJobs } from '../../components/Common';
import { MainView, MainHeader, JobList, JobItem, SectionHeader } from '../../components/Main';
import { loadJobs, jobsByMonth } from '../../modules/searchorders';
import { setJob, setFromScreen } from '../../modules/orderdetails';

class Main extends Component {
  state = {
    currentDate: moment(),
    currentLocation: null,
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
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.warn('current position: ', position);
        this.setState({ currentLocation: position.coords });
      },
      (error) => console.warn(JSON.stringify(error)),
      {enableHighAccuracy: true/*, timeout: 20000, maximumAge: 1000 */}
    );
  }
  goToJob(job) {
    this.props.setJob(job);
    this.props.setFromScreen('main');
    Actions.orderDetails();
  }

  render() {
    const { categories, isLoading, loadJobs, jobsByMonth } = this.props;
    const jobs = jobsByMonth(this.state.currentDate);
    const start = {
  latitude: 30.849635,
  longitude: -83.24559
}

const end = {
  latitude: 27.950575,
  longitude: -82.457178
}
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
                distance={!!(item.locationCoordX && item.locationCoordY && this.state.currentLocation)
                  ? haversine(this.state.currentLocation, { latitude: item.locationCoordX, longitude: item.locationCoordY}).toFixed(1)
                  : null}
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
  { loadJobs, setJob, setFromScreen, jobsByMonth }
)(Main);
