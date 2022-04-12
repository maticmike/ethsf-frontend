import { useEffect } from 'react';
import { getUserFromUsernameDb } from '../services/api/userService';

const useEthAddress = async username => {
  const ethAddress = await getUserFromUsernameDb(username);
  return ethAddress.data.payload.userEthAddress;
};

export default useEthAddress;
