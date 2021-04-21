import React, { useEffect } from 'react';
import { getTweetData } from '../../services/apiService';
const OngoingCampaign = () => {
  // const getData = async () => {
  //   const data = await axios.get(`http://localhost:4000/dev/getTweet/1383842980973277186`, {
  //     tweetId: 1383842980973277186,
  //   });
  //   console.log(data);
  // };
  const getApiService = () => {
    // const apiService = new ApiService();
    getTweetData();
  };
  return (
    <div>
      {/* <button onClick={getData}>get twitter data</button> */}
      <button onClick={getApiService}>get axios</button>
    </div>
  );
};

export default OngoingCampaign;
