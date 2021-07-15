import { CREATE_CAMPAIGN } from '../actions/campaign';

const initialState = {
  campaignId: null,
};

const campaign = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_CAMPAIGN: {
      return {
        campaign: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
export default campaign;
