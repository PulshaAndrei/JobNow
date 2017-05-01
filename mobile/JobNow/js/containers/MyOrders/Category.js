import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import { Container, Category } from '../../components/Common';
import { HeaderWithSave } from '../../components/Header';
import { SettingsView } from '../../components/Settings';
import { CategoriesScrollView, CategoryRow } from '../../components/Main';
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
              <Category
                key={i}
                selected={i === this.state.categoryId}
                title={item.title}
                color={item.color}
                onPress={() => this.setState({ categoryId: i })}
              />
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
