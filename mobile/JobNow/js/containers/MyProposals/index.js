import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import moment from 'moment';
import haversine from 'haversine';
require('moment/locale/ru');

import { Container, SwitchItem, NoJobs } from '../../components/Common';
import { HeaderWithMenu } from '../../components/Header';
import { MyProposalsView } from '../../components/MyProposals';
import { JobList, JobItem, SectionHeader } from '../../components/Main';
import { loadJobs } from '../../modules/myproposals';
import { setJob, setFromScreen } from '../../modules/orderdetails';

class MyProposals extends Component {
  state = {
    showClosed: false,
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
    this.props.setFromScreen('myproposals');
    Actions.orderDetailsByProposal();
  }
  render() {
    const { showClosed } = this.state;
    const { jobs, categories, isLoading, loadJobs, currentUser } = this.props;
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
                onPress={() => this.goToJob(item)}
                myProposal={item.bets.find(el => el.userId === currentUser.id).price}
                distance={!!(item.locationCoordX && item.locationCoordY && this.state.currentLocation)
                  ? haversine(this.state.currentLocation, { latitude: item.locationCoordX, longitude: item.locationCoordY}).toFixed(1)
                  : null}
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
    currentUser: state.user.user,
  }),
  { loadJobs, setJob, setFromScreen }
)(MyProposals);
