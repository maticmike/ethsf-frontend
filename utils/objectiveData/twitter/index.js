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
} from '../../../constants/CampaignObjectives';
import { objectiveToString } from '../../../web3/helpers';
export const parseTwitterPostData = (objective, tweetStats) => {
  const objectiveString = objectiveToString(objective);
  const tweetData = tweetStats.data[0];
  switch (objectiveString) {
    case SIMPLE_POST:
      return true;
    case PAY_PER_VIEW:
      return;
    case PROFILE_GROWTH:
      return;
    case LIKES:
      return tweetData.like_count;
    case COMMENTS:
      return tweetData.reply_count;
    case SHARES:
      return tweetData.retweet_count;
    case WEB_VISITS:
      return;
    case ADD_TO_CART:
      return;
    case SALES:
      return;
    default:
      break;
  }
};
