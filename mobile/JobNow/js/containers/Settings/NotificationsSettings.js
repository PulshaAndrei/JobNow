import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import { Container, Category, LoadingIndiactor } from '../../components/Common';
import { HeaderWithSave } from '../../components/Header';
import { SettingsView, SettingsSwitcher } from '../../components/Settings';
import { CategoriesScrollView } from '../../components/Main';
import { updateSubscribedCategories } from '../../modules/settings';

class NotificationsSettings extends Component {
  state = {
    isEnabled: this.props.subscribedCategories.length !== 0,
    selected: this.props.subscribedCategories,
  }
  setCategories(value) {
    const selected = this.state.selected.slice();
    const index = selected.indexOf(value);
    if (index !== -1) {
      selected.splice(index, 1);
    } else {
      selected.push(value);
    }
    this.setState({ isEnabled: selected.length !== 0, selected });
  }
  render() {
    const { categories, subscribedCategories, updateSubscribedCategories } = this.props;
    return (
      <Container>
        <SettingsView>
          <HeaderWithSave
            imageSource={require('../../resourses/background_settings.png')}
            title="Настройки уведомлений"
            onBack={Actions.pop}
            onSave={() => updateSubscribedCategories(this.state.selected)}
            isSaveEnabled={true}
          />
          <SettingsSwitcher
            title="Уведомления для категорий"
            value={this.state.isEnabled}
            setValue={(value) => {
              if (value) this.setState({ isEnabled: value, selected: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]});
              else this.setState({ isEnabled: value, selected: []});
            }}
          />
          <CategoriesScrollView>
            {categories.map((item, i) =>
              <Category
                key={i}
                selected={this.state.selected.indexOf(i) !== -1}
                title={item.title}
                color={item.color}
                onPress={() => this.setCategories(i)}
              />
            )}
          </CategoriesScrollView>
        </SettingsView>
        <LoadingIndiactor visible={this.props.isLoading} />
      </Container>
    );
  }
}

export default connect(
  state => ({
    isLoading: state.settings.isLoading,
    subscribedCategories: state.settings.subscribedCategories,
    categories: state.common.categories,
  }),
  { updateSubscribedCategories }
)(NotificationsSettings);
