import { ethers } from 'ethers';
import axios from 'axios';
import consola from 'consola';
import { onBoardInitialize } from '../utils/onboard';
import SoulFundFactoryAbi from '../contracts/soulfundFactory.json';
// import FamepayAbi from '../contracts/Famepay.json';
// import FamepayBounty from '../contracts/FamepayBounty.json';
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
    console.log(address, ' insde address');
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
    if (currentOnboardState.wallet.provider === null) {
      return;
    } else {
      const provider = new ethers.providers.Web3Provider(currentOnboardState.wallet.provider);
      const signer = provider.getSigner();
      const network = await provider.getNetwork();
      if (network.chainId != NETWORK_ID) {
        return false;
      } else {
        const soulFundFactoryAddress = getContractAddress(SoulFundFactoryAbi?.abi, network?.chainId);
        const soulFundFactory = new ethers.Contract(soulFundFactoryAddress, SoulFundFactoryAbi.abi, signer);
        return { soulFundFactory };
      }
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

export const getWalletProvider = () => {
  if (provider == null) {
    return null;
  } else {
    return provider;
  }
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
 * SoulFund Factory Functions
 ********************************
 */

/**
 * @param {contract} soulfundFactory
 * @param {address} beneficiary
 * @param {uint256} vestingDate
 * @returns {object} campaign object
 */
export const createNewFundOnContract = async (soulfundFactory, beneficiary, vestingDate, vestedFunds) => {
  try {
    const fund = await soulfundFactory.deployNewSoulFund(beneficiary, vestingDate, {
      value: vestedFunds,
      gasLimit: 3000000,
    });
    return fund;
  } catch (error) {
    consola.error('Web3: createNewFundOnContract():', error);
  }
};

/**
 ********************************
 * Soulfund Functions
 ********************************
 */

/**
 * @param {number} postStat measures post performance
 * @param {boolean} postPosted measures is post was posted or not
 */
export const setPaymentTargetReachedWeb3 = async (campaignAddress, postStat, postPosted, postTimestamp) => {
  try {
    console.log(campaignAddress, 'submitting post');
    const provider = new ethers.providers.Web3Provider(currentOnboardState.wallet.provider);
    const signer = provider.getSigner();
    const famepayCampaign = new ethers.Contract(campaignAddress, FamepayAbi.abi, signer);
    await famepayCampaign.checkCampaignObjectiveReached(postStat, postPosted, postTimestamp);
  } catch (error) {
    consola.error('Web3: setPaymentTargetReachedWeb3():', error);
  }
};

export const payBeneficiary = async () => {};
