import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import { Container } from '../../components/Common';
import { MainView, MainFilterHeader, CategoriesScrollView, CategoryRow, Category } from '../../components/Main';

const categories = [
  {
    title: "Торговля / Продажи",
    color: "rgb(84, 132, 237)",
    image: "shopping-cart",
    specialities: [],
    selected: true,
  },
  {
    title: "Строительство",
    color: "rgb(164, 189, 252)",
    image: "account-balance",
    specialities: [],
    selected: false,
  },
  {
    title: "Транспорт / Автосервис",
    color: "rgb(70, 214, 219)",
    image: "directions-car",
    specialities: [],
    selected: false,
  },
  {
    title: "Туризм / Гостиницы",
    color: "rgb(122, 231, 191)",
    image: "local-airport",
    specialities: [],
    selected: true,
  },
  {
    title: "Красота / Спорт",
    color: "rgb(81, 183, 73)",
    image: "color-lens",
    specialities: [],
    selected: true,
  },
  {
    title: "Маркетинг / PR",
    color: "rgb(251, 215, 91)",
    image: "people",
    specialities: [],
    selected: true,
  },
  {
    title: "Домашний персонал",
    color: "rgb(255, 184, 120)",
    image: "local-laundry-service",
    specialities: [],
    selected: false,
  },
  {
    title: "Жилищное куммунальное хозяйство",
    color: "rgb(255, 136, 124)",
    image: "build",
    specialities: [],
    selected: true,
  },
  {
    title: "ИТ",
    color: "rgb(220, 33, 39)",
    image: "devices",
    specialities: [],
    selected: true,
  },
  {
    title: "Бухгалтерия / Аудит",
    color: "rgb(219, 173, 255)",
    image: "account-balance-wallet",
    specialities: [],
    selected: true,
  },
];

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
