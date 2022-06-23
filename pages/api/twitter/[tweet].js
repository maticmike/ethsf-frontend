// const { TwitterApi } = require('twitter-api-v2');
// import { TwitterApi } from 'twitter-api-v2';

// var client = new Twitter({
//   consumer_key: process.env.CONSUMER_KEY,
//   consumer_secret: process.env.CONSUMER_SECRET,
//   access_token_key: process.env.ACCESS_TOKEN_KEY,
//   access_token_secret: process.env.ACCESS_TOKEN_SECRET,
// });

// Instanciate with desired auth type (here's Bearer v2 auth)
// const twitterClient = new TwitterApi(process.env.TWITTER_BEARER);

// Tell typescript it's a readonly app
// const roClient = twitterClient.readOnly;

export const twitterApiGetTweetInfo = async (req, res) => {
  try {
    // const tweetData = await roClient.v2.singleTweet(req, {
    //   expansions: ['public_metrics'],
    // });

    // const tweetData = await client.get('tweets', {
    //   ids: req,
    //   tweet: {
    //     fields: [
    //       'created_at',
    //       'entities',
    //       'public_metrics',
    //       'author_id',
    //       'geo',
    //       'lang',
    //       'source',
    //       'non_public_metrics', // NOT WORKING FOR TWEETS OLDER THAN 30 DAYS
    //     ],
    //   },
    // });
    console.log(tweetData, 'the weeet');
    return res.status(200).json(tweetData);
  } catch (error) {
    console.log('Error On twitterApiGetTweetInfo():', error);
    return error.statusCode;
  }
};
