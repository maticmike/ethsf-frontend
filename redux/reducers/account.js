import { CONNECT_ACCOUNT, LOGIN_ACCOUNT, DISCONNECT_ACCOUNT } from '../actions/account';
import { NATIVE_CURRENCY } from '../../constants/Blockchain';

const initialState = {
  address: null,
  balances: {},
  signer: null,
  //   isAdmin: false,
  isLoggedIn: false,
};

const account = (state = initialState, action) => {
  switch (action.type) {
    case CONNECT_ACCOUNT: {
      const { account, balance, signer } = action.payload;
      let balances = state.balances;
      balances[NATIVE_CURRENCY.symbol] = balance;
      return {
        ...state,
        address: account,
        balances: balance,
        signer: signer,
        isLoggedIn: false,
      };
    }
    case LOGIN_ACCOUNT: {
      const isLoggedIn = action.payload;
      return { ...state, isLoggedIn };
    }
    case DISCONNECT_ACCOUNT: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};
export default account;
