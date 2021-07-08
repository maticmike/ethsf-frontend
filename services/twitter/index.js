// try this out for the twitter requests
const Twitter = require('twitter-v2');

var client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
});

//Link Clicked, Tweet Viewed, and Profile Clicks --> private

module.exports.getTweetInfo = async tweetId => {
  try {
    return await client.get('tweets', {
      ids: tweetId,
      tweet: {
        fields: ['created_at', 'entities', 'public_metrics', 'author_id', 'geo', 'lang', 'source'],
      },
    });
    // return JSON.stringify(data);
  } catch (error) {
    console.log('Error On getTweetInfo():', error);
  }
};
