import { utils } from 'web3';
import axios from 'axios';
import Web3 from 'web3';
const axiosSetting = {
  method: 'HEAD',
  mode: 'no-cors',
  headers: {
    'Access-Control-Allow-Origin': '*',
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

/**
 * Convert ETH to USD at current rate
 * @function ethToUsd
 * @returns HT value based on current HT/USD
 */
export const ethToUsd = async symbol => {
  const response = await axios.get(
    `https://api.coingecko.com/api/v3/simple/price?ids=${symbol}-token&vs_currencies=usd`,
    axiosSetting,
  );
  // console.log('RES DATA', response.data);
  const isEmptyObj = JSON.stringify({}) === JSON.stringify(response.data);
  const price = !isEmptyObj ? response.data[`${symbol}-token`]['usd'] : '';
  return price;
};

/**
 * Cuts full eth addresses to shortened cleaner address
 * @function shortenedEthAddress
 * @param {adddress} address
 * @returns shortened address
 */
export const shortenedEthAddress = address => {
  return address && address.startsWith('0x')
    ? address.substr(0, 6) + '...' + address.substr(address.length - 6, address.length)
    : address;
};

export const objectiveToString = objective => utils.hexToAscii(objective);
