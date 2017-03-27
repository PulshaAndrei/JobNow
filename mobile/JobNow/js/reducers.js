import { combineReducers } from 'redux';

//import { reducer as login } from './containers/Login/state';
//import { reducer as registration } from './containers/Registration/state';

import { reducer as user } from './modules/user';

export default combineReducers({
  //login,
  //registration,
  user,
});
