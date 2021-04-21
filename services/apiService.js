import axios from 'axios';

// export default class ApiService {
//   constructor() {
//     this.httpClient = axios.create({
//       baseURL: process.env.BASE_API_URL,
//       timeout: 1000,
//       //   headers: { 'X-Custom-Header': 'foobar' },
//     });
//   }

export const getTweetData = async tweet => {
  //   console.log(this.httpClient);
  try {
    console.log(tweet, 'the tweet');
    const data = await axios.get(`${process.env.BASE_API_URL}/getTweet/${tweet}`);
    console.log(data, ' the data');
  } catch (error) {
    console.log('ApiService: getTweetData()', error);
  }
};
// }
