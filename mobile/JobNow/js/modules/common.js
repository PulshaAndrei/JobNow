import store from 'react-native-simple-store';
import { Actions } from 'react-native-router-flux';
import { Alert } from 'react-native';
import moment from 'moment';

import http from '../utils/http';

const initState = {
  categories: [
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
  ],
};

export function reducer(state = initState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
