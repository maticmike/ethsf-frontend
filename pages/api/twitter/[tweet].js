import { TwitterClient } from 'twitter-api-client';

var client = new TwitterClient({
  apiKey: process.env.CONSUMER_KEY,
  apiSecret: process.env.CONSUMER_SECRET,
  accessToken: process.env.ACCESS_TOKEN_KEY,
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
});

// Instanciate with desired auth type (here's Bearer v2 auth)
// const twitterClient = new TwitterApi(process.env.TWITTER_BEARER);

// Tell typescript it's a readonly app
// const roClient = twitterClient.readOnly;

export const twitterApiGetTweetInfo = async (req, res) => {
  try {
    const data = await client.tweets.statusesRetweetsById({ id: req });

    console.log(data, 'the data');

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
