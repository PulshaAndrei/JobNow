import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import moment from 'moment';
require('moment/locale/ru');

import { Container } from '../../components/Common';
import { MainView, MainHeader, JobList, JobItem, SectionHeader } from '../../components/Main';

class MyProposals extends Component {
  state = {
    currentDate: moment()
  }

  prev = () => {
    const newDate = this.state.currentDate.subtract(1, 'months');
    if (!newDate.isSameOrAfter(moment(), 'month')) {
      return;
    }
    //this.props.prev(newDate);
    this.setState({ currentDate: newDate });
  }
  next = () => {
    const newDate = this.state.currentDate.add(1, 'months');
    //this.props.next(newDate);
    this.setState({ currentDate: newDate });
  }

  render() {
    const jobs = [
      {
        date: moment(),
        title: "123 dsajf jas fdjsadgh fgasd fhasd gfhsag fhkgasd",
        address: "Октябрьская 10а",
        price: 15.5,
        category: {
          color: "rgb(84, 132, 237)",
          icon: "account-balance",
        },
      },
      {
        date: moment(),
        title: "123",
        category: {
          color: "rgb(84, 132, 237)",
          icon: "account-balance",
        },
      },
      {
        date: moment().add(1, 'day'),
        title: "245",
        category: {
          color: "rgb(84, 132, 237)",
          icon: "account-balance",
        },
      }
    ];
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
          <JobList>
            {jobs.map((item, i) => (
              <JobItem
                key={`item-${i}`}
                item={item}
                prevItem={jobs[i-1]}
              />
            ))}
          </JobList>
        </MainView>
      </Container>
    );
  }
}

export default connect(
  state => ({},
    { /*login*/ }
  )
)(MyProposals);
