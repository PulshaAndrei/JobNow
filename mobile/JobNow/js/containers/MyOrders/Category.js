import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import { Container } from '../../components/Common';
import { HeaderWithSave } from '../../components/Header';
import { SettingsView } from '../../components/Settings';
import { CategoriesScrollView, CategoryRow, Category } from '../../components/Main';
import { setNewJob } from '../../modules/myorders';

class NewJobCategory extends Component {
  state = {
    categoryId: this.props.newJob.categoryId,
  }
  render() {
    const { newJob, categories, setNewJob } = this.props;
    return (
      <Container>
        <SettingsView>
          <HeaderWithSave
            imageSource={require('../../resourses/home_background.png')}
            title="Выбрать категорию"
            onBack={Actions.pop}
            onSave={() => {
              setNewJob({ ...newJob, categoryId: this.state.categoryId });
              Actions.pop();
            }}
            isSaveEnabled={true}
          />
          <CategoriesScrollView>
            {categories.map((item, i) =>
              i % 2 ? null :
                <CategoryRow key={"row" + i}>
                  <Category
                    key={i}
                    isLeft
                    selected={i === this.state.categoryId}
                    title={item.title}
                    color={item.color}
                    icon={item.image}
                    onPress={() => this.setState({ categoryId: i })}
                  />
                  {categories[i + 1] && <Category
                    key={i+1}
                    selected={i + 1 === this.state.categoryId}
                    title={categories[i + 1].title}
                    color={categories[i + 1].color}
                    icon={categories[i + 1].image}
                    onPress={() => this.setState({ categoryId: i + 1 })}
                  />}
                </CategoryRow>
            )}
          </CategoriesScrollView>
        </SettingsView>
      </Container>
    );
  }
}

export default connect(
  state => ({
    newJob: state.myorders.newJob,
    categories: state.common.categories,
  }),
  { setNewJob }
)(NewJobCategory);
