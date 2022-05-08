import axios from 'axios';
import consola from 'consola';
import { ethers } from 'ethers';
let api = process.env.BASE_API_URL;

export const getTweetDataFromDB = async tweet => {
  try {
    const data = await axios.get(`${process.env.BASE_API_URL}/getTweet/${tweet}`);
    console.log(data, ' the data');
  } catch (error) {
    console.log('ApiService: getTweetData()', error);
  }
};

export const createNewDealProposalDb = async (
  business,
  influencer,
  agreedStartDate,
  agreedDeadline,
  simplePostDuration,
  jackpotReward,
  incrementalReward,
  jackpotTarget,
  incrementalTarget,
  potentialPayout,
  objective,
  // niche,
) => {
  try {
    const campaign = await axios.post(`${api}/campaignProposal/create`, {
      business,
      influencer,
      agreedStartDate,
      agreedDeadline,
      simplePostDuration,
      jackpotReward,
      incrementalReward,
      jackpotTarget,
      incrementalTarget,
      potentialPayout,
      objective,
      // niche,
      // potentialPayoutBN
    });
    return campaign;
  } catch (error) {
    consola.error('ApiService: createNewCampaignOnProposalDb():', error);
    throw error;
  }
};

export const getCampaignProposalDb = async id => {
  try {
    const campaign = await axios.get(`${api}/campaignProposal/campaign/${id}`);
    return campaign;
  } catch (error) {
    consola.error('ApiService: getCampaignProposal():', error);
  }
};
