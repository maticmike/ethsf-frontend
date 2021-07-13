const Twitter = require('twitter-v2');

var client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
});

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
    return error.statusCode;
  }
};
