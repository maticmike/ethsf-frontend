// const getData = async () => {
//   const data = await axios.get(`http://localhost:4000/dev/getTweet/1383842980973277186`, {
//     tweetId: 1383842980973277186,
//   });
//   console.log(data);
// };
import axios from 'axios';
import { parseTwitterPostData } from '../../utils/objectiveData/twitter';

// const cors = Cors({
//   methods: ['GET', 'HEAD'],
// });

const getTweetData = async tweetId => {
  try {
    // const getTweetData = await twitterApiGetTweetInfo(tweetId);
    const id = 'fillion';
    // const getTweetData = await fetch(`/api/twitter/${id}`);
    // const getTweetData = await fetch('/api/twitter');
    const getTweetData = await axios.post('/api/twitter', { testme: { working: id } });
    console.log(getTweetData, 'the data');

    // const response = {
    //   statusCode: 200,
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(getTweetData),
    // };
    // return response;
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

    await getTweetData(tweetId);

    // const parsedTweetData = parseTwitterPostData(campaignObjective, tweetData);
    // return parsedTweetData;
  }
};
