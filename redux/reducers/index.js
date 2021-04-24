import { combineReducers } from 'redux';
import account from './account';
/*
 * Combine all reducers to be consumed by the store
 */
export const reducers = { account };

export default combineReducers({
  ...reducers,
});
