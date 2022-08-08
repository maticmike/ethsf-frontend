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
  let isValidPost;

  //TWEET STATS
  const objectiveString = objectiveToString(objective);
  const postTimestamp = Math.round(new Date(tweetStats.created_at).getTime() / 1000);
  const views = tweetStats.non_public_metrics.impression_count;
  const profileClicks = tweetStats.non_public_metrics.user_profile_clicks;

  //CHECK VALID TWEET
  //leaving commented till .username matches registed username in db
  // const taggedBusiness = tweetStats.entities.mentions[0].username;
  /*
  if (taggedBusiness == business* && tweetStats.author_id == correctAuthorId ) {
    isValidPost = true;
  } else {
    isValidPost = false;
  }
  */

  // temporary
  isValidPost = true;

  switch (objectiveString) {
    case SIMPLE_POST:
      return [1, isValidPost, postTimestamp];
    case PAY_PER_VIEW:
      return [views, isValidPost, postTimestamp];
    case PROFILE_GROWTH:
      return [profileClicks, isValidPost, postTimestamp];
    case LIKES:
      return [tweetStats.public_metrics.like_count, isValidPost, postTimestamp];
    case COMMENTS:
      return [tweetStats.public_metrics.reply_count, isValidPost, postTimestamp];
    case SHARES:
      return [tweetStats.public_metrics.retweet_count, isValidPost, postTimestamp];
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
