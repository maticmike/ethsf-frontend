import { SET_JWT } from '../actions/famepayFactory';
const initialState = {
  jwt: null,
};

const setJwt = (state = initialState, action) => {
  switch (action.type) {
    case SET_JWT: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};
export default setJwt;
