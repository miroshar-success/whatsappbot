import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import post from './post';
import user from './user';
import data from './data';
import instance from './instance';

export default combineReducers({
  alert,
  auth,
  profile,
  post,
  user,
  data,
  instance
});
