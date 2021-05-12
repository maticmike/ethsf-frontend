import consola from 'consola';
/* Action Types */
export const CREATE_CAMPAIGN = 'CREATE_CAMPAIGN';

export const createCampaign = campaign => ({
  type: CREATE_CAMPAIGN,
  payload: campaign,
});

// TODO Set the ID in redux
export const createCampaignThunk = id => {
  return async (dispatch, getState) => {};
};
