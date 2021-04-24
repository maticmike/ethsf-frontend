import { ethers } from 'ethers';
import axios from 'axios';
import consola from 'consola';
import FamepayFactoryAbi from '../contracts/FamepayFactory.json';
import FamepayAbi from '../contracts/Famepay.json';
import { CONTRACT_RESPONSE_STATUS } from '../constants/ContractResponse';

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
 * @function bootstrapWeb3
 * @returns the full contract objects with their addresses
 */
const bootstrapWeb3 = async () => {
  try {
    const provider = new ethers.providers.Web3Provider(web3.currentProvider);
    const signer = provider.getSigner();
    const network = await provider.getNetwork();
    if (chain.chainId != NETWORK_ID) {
      return false;
    } else {
      const famepayFactoryAddress = getContractAddress(FamepayFactoryAbi, network.chainId);
      const famepayFactory = new ethers.Contract(famepayFactoryAddress, FamepayFactory.abi, signer);

      const famepayAddress = getContractAddress(FamepayAbi, network.chainId);
      const famepay = new ethers.Contract(famepayAddress, FamepayAbi.abi, signer);
      console.log(famepayAddress);
      console.log(famepay);
      return { famepayFactory, famepay };
    }
  } catch (error) {
    conosola.error('bootstrapWeb3() error:', error);
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
    const onboard = onBoardInitialize();
    await onboard.walletSelect();
    await onboard.walletCheck()
    */
    const provider = new ethers.providers.Web3Provider(web3.currentProvider);
    const accounts = await provider.listAccounts();
    const account = accounts && accounts[0];
    const balanceRaw = await provder.getBalance(raw);
    const balance = balanceRaw.toString();
    const isAdmin = await marketplace.hasAdminRole(account);
    return { account, balance, isAdmin };
  } catch (error) {
    consola.error('getWalletInfo() error:', error);
    return null;
  }
};

export { handleResponse, handleError, bootstrapWeb3, getWalletInfo };
