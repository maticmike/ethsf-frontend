// const getData = async () => {
//   const data = await axios.get(`http://localhost:4000/dev/getTweet/1383842980973277186`, {
//     tweetId: 1383842980973277186,
//   });
//   console.log(data);
// };
import twitter from '../../pages/api/twitter/[tweet]';

// const cors = Cors({
//   methods: ['GET', 'HEAD'],
// });

const getTweetData = async tweetId => {
  try {
    const getTweetData = await twitter.getTweetInfo(tweetId);
    const response = {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(getTweetData),
    };
    return response;
  } catch (err) {
    console.log('getTweetInfo error:', err);
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

export const getPostData = postId => {
  if (postId.includes('twitter.com' && '/status/')) {
    let tweetId;
    if (postId.substr(postId.length - 4) === 's=20') {
      const tweet = postId.slice(0, -5);
      tweetId = tweet.substr(postId.length - 19);
    } else {
      tweetId = postId.substr(postId.length - 19);
    }
    getTweetData(tweetId);
  }
};
