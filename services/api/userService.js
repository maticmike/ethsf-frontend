import axios from 'axios';
import consola from 'consola';

let api = process.env.BASE_API_URL;

//****TOKEN LOGIC *****/
// 1. setToken
// 2. getToken
// 3. clearToken
// 4. validate token
// 5. create new token

/**** DB LOGIC  *****/
// 1. is username taken
// 2. get user by username
// 3. authenticate user (in web3ethers ephimera)

export const registerNewUserDb = async (ethAddress, username, firstName, lastName, signature, email, type) => {
  try {
    const registeredUser = await axios.post(`${api}/user/register`, {
      ethAddress,
      username,
      firstName,
      lastName,
      signature,
      email,
      type,
    });
    consola.success('ApiService: registerNewUserDB() new user has been registered:', registeredUser);
    return registeredUser;
  } catch (error) {
    consola.error('ApiService: registerNewUserDB():', error);
    throw error;
  }
};

export const getUserFromEthAddress = async ethAddress => {
  try {
    const user = await axios.get(`${api}/${ethAddress}/account`);
    consola.success('ApiService: getUserFromEthAddress:'.user);
    return user;
  } catch (error) {
    consola.error('Api Service getUserFromEthAddress:', error);
    throw error;
  }
};
