const Twitter = require('twitter-v2');

var client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
});

export const twitterApiGetTweetInfo = async (req, res) => {
  try {
    console.log(req, ' the req');
    const tweetData = await client.get('tweets', {
      // ids: req.query.tweet,
      ids: req,
      tweet: {
        fields: [
          'created_at',
          'entities',
          'public_metrics',
          'author_id',
          'geo',
          'lang',
          'source',
          'non_public_metrics', // NOT WORKING FOR TWEETS OLDER THAN 30 DAYS
        ],
      },
    });
    console.log(tweetData, 'the weeet');
    return res.status(200).json(tweetData);
  } catch (error) {
    console.log('Error On getTweetInfo():', error);
    return error.statusCode;
  }
};
