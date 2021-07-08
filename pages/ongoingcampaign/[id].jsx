import React, { useEffect } from 'react';
import { getTweetData } from '../api/twitter';
import { useQuery } from '@apollo/client';
import { APOLLO_POLL_INTERVAL_MS } from '../../constants/Blockchain';
import { campaignQuery } from '../../apollo/campaign.gql';
const OngoingCampaign = () => {
  let listingVariables = {
    first: 1,
    where: { id: TOKEN_STATUS.LISTED },
  };
  const campaignQueryRes = useQuery(campaignQuery, {
    pollInterval: APOLLO_POLL_INTERVAL_MS,
    variables: listingsVariables,
  });

  const getApiService = () => {
    // const apiService = new ApiService();
    getTweetData();
  };
  return (
    <div>
      <button onClick={getData}>get twitter data</button>
      {/* <button onClick={getApiService}>get axios</button> */}
    </div>
  );
};

export default OngoingCampaign;
