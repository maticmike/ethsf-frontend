module.exports = {
  webpack: (config, options) => {
    /*
    TODO  i added this first conflict.resolve to try fix the twitter lib bug 
    consider switching to new twitter lib
    */

    // config.resolve = {
    //   ...config.resolve,
    //   fallback: {
    //     fs: false,
    //     path: false,
    //     os: false,
    //     crypto: false,
    //     http: false,
    //     https: false,
    //     zlib: false,
    //     events: false,
    //   },
    // };
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      use: [options.defaultLoaders.babel, { loader: 'graphql-tag/loader' }],
    });
    return config;
  },
  env: {
    BASE_API_URL: 'http://localhost:4000/dev',
    ONBOARD_KEY: '7e738cae-8bad-4605-bded-fe6e7fa287ea',
    FORMATIC_PROD: 'pk_live_2EC8406A0F66CF05',
    FORMATIC_DEV: 'pk_test_EE7506631DF70308',
    CONSUMER_KEY: 'acbapn62E25iYIh1w3ZqtLEnH',
    CONSUMER_SECRET: 'b6jaRYQGvHEdxbB5bb1BylSuf3VQxJmDuuidzAcInrShPArW6P',
    ACCESS_TOKEN_KEY: '464103620-b7mh093ZLkq2KsPAu1ekFFZivLXuZhDGi2yuyFjF',
    ACCESS_TOKEN_SECRET: 'cgZZLfc7WsGKklsD2MPbOYKsL3j8cLY9izF1lwBuiXAtg',
    TWITTER_BEARER:
      'AAAAAAAAAAAAAAAAAAAAAAADKAEAAAAA6AuuGHwQkKUZL8aCUtlrX2beB3E%3DQSLGoGq7XChF79kHhF9unpkjKsm3ltmHvhaF5JzAv1eCKwifqn',
  },
};
