const Twitter = require('twitter-v2');

var client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
});

//Link Clicked, Tweet Viewed, and Profile Clicks --> private

// const getData = async () => {
//   const data = await axios.get(`http://localhost:4000/dev/getTweet/1383842980973277186`, {
//     tweetId: 1383842980973277186,
//   });
//   console.log(data);
// };

// const cors = Cors({
//   methods: ['GET', 'HEAD'],
// });

export default async (req, res) => {
  try {
    const tweetData = await client.get('tweets', {
      ids: req.query.tweet,
      tweet: {
        fields: ['created_at', 'entities', 'public_metrics', 'author_id', 'geo', 'lang', 'source'],
      },
    });
    return res.status(200).json(tweetData);
  } catch (error) {
    console.log('Error On getTweetInfo():', error);
  }
};

// const getTweetData = async tweetId => {
//   try {
//     const getTweetData = await getTweetInfo(tweetId);
//     const response = {
//       statusCode: 200,
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(getTweetData),
//     };
//     return response;
//   } catch (err) {
//     console.log('getTweetInfo error:', err);
//     const response = {
//       statusCode: err.statusCode || 500,
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         error: err.name,
//         message: err.message,
//       }),
//     };
//     return response;
//   }
// };

// export const getPostData = postId => {
//   if (postId.includes('twitter.com' && '/status/')) {
//     let tweetId;
//     if (postId.substr(postId.length - 4) === 's=20') {
//       const tweet = postId.slice(0, -5);
//       tweetId = tweet.substr(postId.length - 19);
//     } else {
//       tweetId = postId.substr(postId.length - 19);
//     }
//     getTweetData(tweetId);
//   }
// };
