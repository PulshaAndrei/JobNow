import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import { Container, Category } from '../../components/Common';
import { MainView, MainFilterHeader, CategoriesScrollView } from '../../components/Main';
import { setSelectedCategories, loadJobs } from '../../modules/searchorders';

class MainFilter extends Component {
  setCategories(value) {
    const selected = this.props.selectedCategories.slice();
    const index = selected.indexOf(value);
    if (index !== -1) {
      selected.splice(index, 1);
    } else {
      selected.push(value);
    }
    this.props.setSelectedCategories(selected);
  }
  render() {
    const { categories, selectedCategories, loadJobs } = this.props;
    return (
      <Container>
        <MainView>
          <MainFilterHeader onBack={() => {
            loadJobs();
            Actions.pop();
          }}/>
          <CategoriesScrollView>
            {categories.map((item, i) =>
              <Category
                key={i}
                selected={selectedCategories.indexOf(i) !== -1}
                title={item.title}
                color={item.color}
                onPress={() => this.setCategories(i)}
              />
            )}
          </CategoriesScrollView>
        </MainView>
      </Container>
    );
  }
}

export default connect(
  state => ({
    selectedCategories: state.searchorders.selectedCategories,
    categories: state.common.categories,
  }),
  { setSelectedCategories, loadJobs }
)(MainFilter);
