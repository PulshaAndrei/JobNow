import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import { Container } from '../../components/Common';
import { MainView, MainFilterHeader, CategoriesScrollView, CategoryRow, Category } from '../../components/Main';

class MainFilter extends Component {
  render() {
    return (
      <Container>
        <MainView>
          <MainFilterHeader onBack={Actions.pop}/>
          <CategoriesScrollView>
            {categories.map((item, i) =>
              i % 2 ? null :
                <CategoryRow key={"row" + i}>
                  <Category
                    key={i}
                    isLeft
                    selected={item.selected}
                    title={item.title}
                    color={item.color}
                    icon={item.image}
                    onPress={() => { Actions.mainFilterCategory(item.specialities); }}
                  />
                  {categories[i + 1] && <Category
                    key={i+1}
                    selected={categories[i + 1].selected}
                    title={categories[i + 1].title}
                    color={categories[i + 1].color}
                    icon={categories[i + 1].image}
                    onPress={() => { Actions.mainFilterCategory(categories[i + 1].specialities); }}
                  />}
                </CategoryRow>
            )}
          </CategoriesScrollView>
        </MainView>
      </Container>
    );
  }
}

export default connect(
  state => ({},
    { /*login*/ }
  )
)(MainFilter);
