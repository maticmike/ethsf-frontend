import React, { useEffect } from 'react';
import axios from 'axios';
// import { useQuery } from '@apollo/client';
// import { APOLLO_POLL_INTERVAL_MS } from '../../constants/Blockchain';
// import { campaignQuery } from '../../apollo/campaign.gql';

const OngoingCampaign = () => {
  // let listingVariables = {
  //   first: 1,
  //   where: { id: TOKEN_STATUS.LISTED },
  // };
  // const campaignQueryRes = useQuery(campaignQuery, {
  //   pollInterval: APOLLO_POLL_INTERVAL_MS,
  //   variables: listingsVariables,
  // });

  const getApiService = async () => {
    const data = await axios.get(`http://localhost:3000/api/twitter/1383842980973277186`);
    console.log(data);
  };
  return (
    <div>
      <button onClick={() => getApiService()}>get twitter data</button>
      {/* <button onClick={getApiService}>get axios</button> */}
    </div>
  );
};

export default OngoingCampaign;
