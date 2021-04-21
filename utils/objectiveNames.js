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
    case 'singlePost':
      return SIMPLE_POST;
    case 'postViews':
      return PAY_PER_VIEW;
    case 'profileGrowth':
      return PROFILE_GROWTH;
    case 'likes':
      return LIKES;
    case 'comments':
      return COMMENTS;
    case 'shares':
      return SHARES;
    case 'webVisits':
      return WEB_VISITS;
    case 'atc':
      return ADD_TO_CART;
    case 'sales':
      return SALES;
    default:
      break;
  }
};
