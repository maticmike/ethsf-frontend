import { generateChallengeDb } from '../../services/api/userService';
import consola from 'consola';

/* Action Types */
export const SET_JWT = 'SET_JWT';

export const setJwt = jwt => ({
  type: SET_JWT,
  payload: jwt,
});

export const setJwtThunk = jwt => {
  return async dispatch => {
    if (typeof window.ethereum !== 'undefined') {
      dispatch(setJwt(jwt));
    }
  };
};
