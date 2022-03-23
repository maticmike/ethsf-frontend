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
export const parseTwitterPostData = (objective, tweetStats, business) => {
  let isValidPost;

  //TWEET STATS
  const objectiveString = objectiveToString(objective);
  const tweetData = tweetStats.data[0];
  const postTimestamp = Math.round(new Date(tweetData.created_at).getTime() / 1000);
  const taggedBusiness = tweetData.entities.mentions[0].username;
  const views = tweetData.non_public_metrics.impression_count;
  const profileClicks = tweetData.non_public_metrics.user_profile_clicks;

  //CHECK VALID TWEET
  //leaving commented till .username matches registed username in db
  /*
  if (taggedBusiness == business* && tweetData.author_id == correctAuthorId ) {
    isValidPost = true;
  } else {
    isValidPost = false;
  }
  */
  console.log(tweetData, 'tweet data');
  isValidPost = true;
  switch (objectiveString) {
    case SIMPLE_POST:
      return [1, isValidPost, postTimestamp];
    case PAY_PER_VIEW:
      return [views, isValidPost, postTimestamp];
    case PROFILE_GROWTH:
      return [profileClicks, isValidPost, postTimestamp];
    case LIKES:
      return [tweetData.like_count, isValidPost, postTimestamp];
    case COMMENTS:
      return [tweetData.reply_count, isValidPost, postTimestamp];
    case SHARES:
      return [tweetData.retweet_count, isValidPost, postTimestamp];
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
