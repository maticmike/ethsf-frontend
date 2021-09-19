import consola from 'consola';
import { getCampaignFromContract } from '../../web3';
/* Action Types */
export const CREATE_CAMPAIGN = 'CREATE_CAMPAIGN';

export const createCampaign = campaign => ({
  type: CREATE_CAMPAIGN,
  payload: campaign,
});

export const createCampaignThunk = id => {
  return async (dispatch, getState) => {
    if (window.ethereum) {
      getCampaignFromContract()
        .then(res => dispatch(res.famepayCampaign))
        .catch(error => consola.error('error in createCampaignThunk action', error));
    }
  };
};
