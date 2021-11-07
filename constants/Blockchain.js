// Status of blockchain related functions
export const CONTRACT_RESPONSE_STATUS = {
  SUCCESS: 'txn_success',
  INSUFFICIENT_FUNDS: 'txn.error.insufficient_funds',
  USER_REJECTED: 'txn.error.user_rejected',
  UNCLASSIFIED_FAILURE: 'txn.error.unclassified_failure',
};

export const NATIVE_CURRENCY = {
  symbol: 'ETH',
  address: 'Native Currency',
  decimals: 18,
};

// List of all Currencies supported
// Key must match symbol of ERC20!
// PRICE_LOOKUP_KEY is the id of the currency on coingecko.com
export const ALL_SUPPORTED_CURRENCIES = {
  DAI: {
    NAME: 'DAI',
    PRICE_LOOKUP_KEY: 'dai-token',
    PRICE_LOOKUP_KEY: 'dai',
  },
};

export const GRAPH_API_URL = 'https://api.thegraph.com/subgraphs/name/benjamin852/famepay';

export const NETWORK_ID = 4;
// export const EXPLORER_URL = 'https://hecoinfo.com/';
// export const BASE_URL = 'https://opennft.io/';
// export const META_IMG = `${BASE_URL}logo-text-under-large.png`;
// export const CONTRACT_ADDRESS = '0x90aCBa94573634Ec6ABc07B34152A1da922bFa20';
// export const PROJECT_APPLICATION_FORM_URL = 'https://jinshuju.net/f/SBuz52';

export const APOLLO_POLL_INTERVAL_MS = 1000;
