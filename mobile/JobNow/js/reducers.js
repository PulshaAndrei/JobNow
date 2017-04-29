import { combineReducers } from 'redux';

import { reducer as user } from './modules/user';
import { reducer as myorders } from './modules/myorders';
import { reducer as common } from './modules/common';

export default combineReducers({
  user,
  myorders,
  common,
});
