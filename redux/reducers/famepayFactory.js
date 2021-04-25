import { CONNECT_FAMEPAY_FACTORY } from '../actions/famepayFactory';
const initialState = {
  provider: null,
};

const famepayFactory = (state = initialState, action) => {
  switch (action.type) {
    case CONNECT_FAMEPAY_FACTORY: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};
export default famepayFactory;
