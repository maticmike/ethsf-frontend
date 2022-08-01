import axios from 'axios';
import { parseTwitterPostData } from '../../utils/objectiveData/twitter';

const getTweetData = async tweetId => {
  try {
    const tweet = await axios.post('/api/twitter', { tweet: tweetId });
    return tweet.data.tweetData.data[0];
  } catch (err) {
    const response = {
      statusCode: err.statusCode || 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        error: err.name,
        message: err.message,
      }),
    };
    return response;
  }
};

export const getPostData = async (post, campaignObjective) => {
  if (post.includes('twitter.com' && '/status/')) {
    let tweetId;
    if (post.substr(post.length - 4) === 's=20') {
      const tweet = post.slice(0, -5);
      tweetId = tweet.substr(post.length - 19);
    } else {
      tweetId = post.substr(post.length - 19);
    }

    const tweetData = await getTweetData(tweetId);

    const parsedTweetData = parseTwitterPostData(campaignObjective, tweetData);
    return parsedTweetData;
  }
};
