import { ethers } from 'ethers';
import axios from 'axios';
import consola from 'consola';
import detectEthereumProvider from '@metamask/detect-provider';
import FamepayFactoryAbi from '../contracts/FamepayFactory.json';
import FamepayAbi from '../contracts/Famepay.json';
import { CONTRACT_RESPONSE_STATUS } from '../constants/Blockchain';
import { NETWORK_ID } from '../constants/Blockchain';

/**
 * Response handler for successful contract interactions
 * @function handleResponse
 * @param functionName name of function calling this handler
 * @param res response object
 * @return
 */
const handleResponse = (functionName, res) => {
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
const handleError = (functionName, error) => {
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
const getContractAddress = (abi, chainId) => {
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
const bootstrapFactory = async () => {
  try {
    const provider = new ethers.providers.Web3Provider(web3.currentProvider);
    const signer = provider.getSigner();
    const network = await provider.getNetwork();
    if (network.chainId != NETWORK_ID) {
      return false;
    } else {
      const famepayFactoryAddress = getContractAddress(FamepayFactoryAbi, network.chainId);
      const famepayFactory = new ethers.Contract(famepayFactoryAddress, FamepayFactoryAbi.abi, signer);
      return { famepayFactory /*, famepay */ };
    }
  } catch (error) {
    consola.error('Web3: bootstrapFactory() error:', error);
    return null;
  }
};

/**
 * Get eth wallet info
 * @function getEthWallet
 * @returns wallet and wallet related info
 */
const getWalletInfo = async () => {
  try {
    /*
    const provider2 = await detectEthereumProvider();
    const onboard = onBoardInitialize();
    await onboard.walletSelect();
    await onboard.walletCheck()
    */
    const provider = new ethers.providers.Web3Provider(web3.currentProvider);

    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts && accounts[0];
    const balanceRaw = await provider.getBalance(account);
    const balance = balanceRaw.toString();
    return { account, balance /*, isAdmin*/ };
  } catch (error) {
    consola.error('Web3: getWalletInfo() error message:', error);
    return null;
  }
};

/**
 ********************************
 * ERC20
 ********************************
 */

/**
 ********************************
 * Famepay Factory Functions
 ********************************
 */

const createNewCampaignOnContract = async (
  famepayFactory,
  business,
  influencer,
  startDate,
  deadline,
  singlePostDuration,
  jackpotReward,
  incrementalReward,
  jackpotTarget,
  incrementalTarget,
  potentialPayout,
  objective,
) => {
  consola.info('web3: createNewCampaign() started');
  try {
    console.log(famepayFactory, 'factory');
    console.log(business, 'business');
    console.log(influencer, 'influencer');
    console.log(startDate, 'startDate');
    console.log(deadline, 'deadline');
    console.log(singlePostDuration, 'singlePostDuration'); //fix me
    console.log(jackpotReward, 'jackpotReward');
    console.log(incrementalReward, 'incrementalReward');
    console.log(jackpotTarget, 'jackpotTarget');
    console.log(incrementalTarget, 'incrementalTarget');
    console.log(potentialPayout, 'potentialPayout');
    console.log(objective, 'objective');
    const campaign = await famepayFactory.newFamepayCampaign(
      business,
      influencer,
      startDate,
      deadline,
      singlePostDuration,
      jackpotReward,
      incrementalReward,
      jackpotTarget,
      incrementalTarget,
      potentialPayout, //potentialPayout
      objective,
      { value: potentialPayout, gasLimit: 3000000 },
    );
    console.log(campaign, 'the campaign in web3');
    return campaign;
  } catch (error) {
    consola.error('Web3: createNewCampaignOnContract():', error);
  }
};

/**
 ********************************
 * Famepay Functions
 ********************************
 */

export { handleResponse, handleError, bootstrapFactory, getWalletInfo, createNewCampaignOnContract };
