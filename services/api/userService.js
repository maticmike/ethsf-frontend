import axios from 'axios';
import consola from 'consola';

let api = process.env.BASE_API_URL;

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
