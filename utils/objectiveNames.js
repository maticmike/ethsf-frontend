import {
  SIMPLE_POST,
  PAY_PER_VIEW,
  PROFILE_GROWTH,
  LIKES,
  COMMENTS,
  SHARES,
  WEB_VISITS,
  ADD_TO_CART,
  SALES,
} from '../constants/CampaignObjectives';

export const setObjectiveName = name => {
  switch (name) {
    case 'post':
      return SIMPLE_POST;
    case 'view':
      return PAY_PER_VIEW;
    case 'grow':
      return PROFILE_GROWTH;
    case 'like':
      return LIKES;
    case 'comm':
      return COMMENTS;
    case 'shar':
      return SHARES;
    case 'webv':
      return WEB_VISITS;
    case 'cart':
      return ADD_TO_CART;
    case 'sale':
      return SALES;
    default:
      break;
  }
};
