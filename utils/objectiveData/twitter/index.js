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
  // const taggedBusiness = tweetData.entities.mentions[0].username;

  //CHECK VALID TWEET
  /*
  if (taggedBusiness == business* && tweetData.author_id == correctAuthorId ) {
    isValidPost = true;
  } else {
    isValidPost = false;
  }
  */
  isValidPost = true;
  switch (objectiveString) {
    case SIMPLE_POST:
      //correct influencer
      //tagged the business
      return [1, isValidPost, postTimestamp];
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
