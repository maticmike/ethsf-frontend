import consola from 'consola';
import { CREATE_CAMPAIGN } from '../actions/campaign';

const initialState = {
  campaignId: null,
};

const campaign = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_CAMPAIGN: {
      const { account, balance } = action.payload;
      consola.success(`Connect wallet reducer ${account} ${balance}`);
      return {
        campaignId: account,
      };
    }
    default: {
      return state;
    }
  }
};
export default campaign;
