import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import moment from 'moment';
require('moment/locale/ru');

import { Container, SwitchItem } from '../../components/Common';
import { MyOrdersView, MyOrdersHeader, JobItemWithProposals, CreateButton } from '../../components/MyOrders';
import { JobList, SectionHeader } from '../../components/Main';

class MyOrders extends Component {
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
        <MyOrdersView>
          <MyOrdersHeader onMenu={() => Actions.refresh({key: 'drawer', open: true })}/>
          <CreateButton onCreate={Actions.createJob} />
          <JobList>
            <SectionHeader title="Активные" />
            {jobs.map((item, i) => (
              <JobItemWithProposals
                key={`item-${i}`}
                item={item}
                prevItem={jobs[i-1]}
              />
            ))}
            <SectionHeader title="Завершенные" />
            {jobs.map((item, i) => (
              <JobItemWithProposals
                key={`item-${i}`}
                item={item}
                prevItem={jobs[i-1]}
              />
            ))}
          </JobList>
        </MyOrdersView>
      </Container>
    );
  }
}

export default connect(
  state => ({},
    { /*login*/ }
  )
)(MyOrders);
