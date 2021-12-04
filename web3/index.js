import { ethers } from 'ethers';
import axios from 'axios';
import consola from 'consola';
import { onBoardInitialize } from '../utils/onboard';
import { setObjectiveName } from '../utils/ObjectiveNames';
import FamepayFactoryAbi from '../contracts/FamepayFactory.json';
import FamepayAbi from '../contracts/Famepay.json';
import { CONTRACT_RESPONSE_STATUS, NETWORK_ID } from '../constants/Blockchain';

import web3 from 'web3';

let onboard;
let currentOnboardState;
let provider;

/**
 * Response handler for successful contract interactions
 * @function handleResponse
 * @param functionName name of function calling this handler
 * @param res response object
 * @return
 */
export const handleResponse = (functionName, res) => {
  consola.info(`[${functionName}]`, res);
  return {
    status: CONTRACT_RESPONSE_STATUS,
    response: res.hash,
  };
};

/**
 * Error handler for common contract issues
 * @function handleError
 * @param functionName name of function calling this handler
 * @param error error object
 * @return
 */
export const handleError = (functionName, error) => {
  if (error.message.includes('insufficient funds') || error?.data?.messages.includes('insufficient funds')) {
    consola.error(`[${functionName}]`, error);
    return {
      status: CONTRACT_RESPONSE_STATUS.INSUFFICIENT_FUNDS,
      response: error.message,
    };
  }
  if (error.message.includes('denied transaction signature')) {
    consola.error(`[${functionName}]`, error);
    return {
      status: CONTRACT_RESPONSE_STATUS.USER_REJECTED,
      response: error.message,
    };
  }
  consola.error(`[${functionName}]`, error);
  return {
    status: CONTRACT_RESPONSE_STATUS.UNCLASSIFIED_FAILURE,
    response: error.message,
  };
};

/**
 * Get contract address from abi
 * @function getContractAddress
 * @param abi contract abi
 * @param chainId the network id
 * @returns address of contract
 */
export const getContractAddress = (abi, chainId) => {
  if (!abi || !chainId) return '';
  const { networks } = abi;
  if (networks[chainId.toString()]) {
    const address = networks[chainId.toString()].address;

    return address || '';
  }
  return '';
};

/**
 * Bootstrap web3
 * @function bootstrapFactory
 * @returns the full contract objects with their addresses
 */

export const bootstrapFactory = async () => {
  try {
    currentOnboardState = onboard.getState();
    const provider = new ethers.providers.Web3Provider(currentOnboardState.wallet.provider);
    const signer = provider.getSigner();
    const network = await provider.getNetwork();
    if (network.chainId != NETWORK_ID) {
      return false;
    } else {
      const famepayFactoryAddress = getContractAddress(FamepayFactoryAbi, network.chainId);
      const famepayFactory = new ethers.Contract(famepayFactoryAddress, FamepayFactoryAbi.abi, signer);
      return { famepayFactory };
    }
  } catch (error) {
    consola.error('Web3: bootstrapFactory() error:', error);
    return null;
  }
};

/**
 ********************************
 * Wallet
 ********************************
 */

/**
 * Get eth wallet info
 * @function signInWalletWeb3
 * @returns wallet and wallet related info
 */
export const signInWalletWeb3 = async previousWallet => {
  try {
    onboard = onBoardInitialize(previousWallet);
    await onboard.walletSelect(previousWallet);
    await onboard.walletCheck();

    currentOnboardState = onboard.getState();
    const account = currentOnboardState.address;

    provider = new ethers.providers.Web3Provider(currentOnboardState.wallet.provider);

    const balanceRaw = await provider.getBalance(account);
    const balance = balanceRaw.toString();
    const signer = provider.getSigner();
    const chain = await provider.getNetwork();
    return { account, balance, signer /*, isAdmin*/ };
  } catch (error) {
    consola.error('Web3: getWalletInfo() error message:', error);
    return null;
  }
};

export const getWalletProvider = async () => {
  return provider;
};

export const clearWalletOnboard = async () => {
  try {
    await onboard.walletReset();
  } catch (error) {
    consola.error('Web3: clearWalletOnboard() error message:', error);
    return null;
  }
};

/**
 ********************************
 * Famepay Factory Functions
 ********************************
 */

/**
 * @param {contract} famepayFactory
 * @param {address} business participating business
 * @param {address} influencer participating influencer
 * @param {uint256} startDate beginning of campaign
 * @param {uint256} deadline end date of campaign
 * @param {uint256} simplePostDuration duration of post (24 hrs) only for simple post
 * @param {uint256} jackpotReward  payment for jackpot target
 * @param {uint256} incrementalReward  payment per incremental target
 * @param {uint256} jackpotTarget target amount for jackpot objective
 * @param {uint256} incrementalTarget  target amount for incremental objective
 * @param {uint256} potentialPayout total staked in contradct
 * @param {string} objective objective of the campaign
 * @returns {object} campaign object
 */
export const createNewCampaignOnContract = async (
  famepayFactory,
  influencer,
  business,
  startDate,
  deadline,
  simplePostDuration,
  jackpotReward,
  incrementalReward,
  jackpotTarget,
  incrementalTarget,
  potentialPayout,
  objective,
) => {
  try {
    // const objectiveBytes = ethers.utils.hexlify(setObjectiveName(objective));' //<--- Preferable to web3
    const objectiveBytes = web3.utils.toHex(setObjectiveName(objective));
    const campaign = await famepayFactory.newFamepayCampaign(
      influencer,
      business,
      startDate,
      deadline,
      simplePostDuration,
      jackpotReward,
      incrementalReward,
      jackpotTarget,
      incrementalTarget,
      potentialPayout,
      objectiveBytes,
      { value: potentialPayout, gasLimit: 3000000 },
    );
    return campaign;
  } catch (error) {
    consola.error('Web3: createNewCampaignOnContract():', error);
  }
};

/**
 * @param {contract}  amepayFactory
 * @param {uint256} campaignId
 * @returns {object}
 */
export const getCampaignFromContract = async (famepayFactory, campaignId) => {
  try {
    // const provider = new ethers.providers.Web3Provider(web3.currentProvider);
    const provider = new ethers.providers.Web3Provider(currentOnboardState.wallet.provider); //Untested<<---
    const signer = provider.getSigner();
    const famepayCampaignAddress = await famepayFactory.getCampaign(campaignId, { gasLimit: 3000000 });
    const famepayCampaign = new ethers.Contract(famepayCampaignAddress, FamepayAbi.abi, signer);
    return { famepayCampaign };
  } catch (error) {
    consola.error('Web3: getCampaignFromContract():', error);
  }
};

/**
 ********************************
 * Famepay Functions
 ********************************
 */

/**
 * @param {number} postStat measures post performance
 * @param {boolean} postPosted measures is post was posted or not
 */
export const setPaymentTargetReachedWeb3 = async (campaignAddress, postStat, postPosted, postTimestamp) => {
  try {
    const provider = new ethers.providers.Web3Provider(currentOnboardState.wallet.provider);
    const signer = provider.getSigner();
    const famepayCampaign = new ethers.Contract(campaignAddress, FamepayAbi.abi, signer);
    await famepayCampaign.checkCampaignObjectiveReached(postStat, postPosted, postTimestamp);
  } catch (error) {
    consola.error('Web3: setPaymentTargetReachedWeb3():', error);
  }
};

/**
 *
 * @param {address} campaignAddress
 * @param {boolean} businessConfirmed
 * @param {boolean} influencerConfirmed
 * @param {number} confirmedAmount
 */
export const payInfluencerWeb3 = async (campaignAddress, businessConfirmed, influencerConfirmed, confirmedAmount) => {
  try {
    const provider = new ethers.providers.Web3Provider(currentOnboardState.wallet.provider);
    const signer = provider.getSigner();
    const famepayCampaign = new ethers.Contract(campaignAddress, FamepayAbi.abi, signer);
    await famepayCampaign?.payInfluencer(businessConfirmed, influencerConfirmed);
  } catch (error) {
    consola.error('Web3: payInfluencer():', error);
  }
};
