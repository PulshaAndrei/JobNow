import { combineReducers } from 'redux';

import { reducer as user } from './modules/user';
import { reducer as myorders } from './modules/myorders';
import { reducer as myproposals } from './modules/myproposals';
import { reducer as searchorders } from './modules/searchorders';
import { reducer as userprofile } from './modules/userprofile';
import { reducer as settings } from './modules/settings';
import { reducer as common } from './modules/common';

export default combineReducers({
  user,
  myorders,
  myproposals,
  searchorders,
  userprofile,
  settings,
  common,
});
