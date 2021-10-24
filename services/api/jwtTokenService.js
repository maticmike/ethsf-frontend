import consola from 'consola';
import axios from 'axios';
let api = process.env.BASE_API_URL;

let JWT_TOKEN = 'famepay_jwt';

//used for generating signed jwt
export const generateJwtDb = async (ethAddress, challenge, signature) => {
  try {
    const jwt = await axios.post(
      `${api}/user/${ethAddress}/auth/generate-jwt`,
      {
        challenge,
        signature,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(JWT_TOKEN)}`,
        },
      },
    );
    return jwt;
  } catch (error) {
    consola.error('ApiService generateJwt():', error);
  }
};
export const setJwt = token => localStorage.setItem(JWT_TOKEN, token);
export const getJwt = () => localStorage.getItem(JWT_TOKEN);
export const clearJwt = () => localStorage.removeItem(JWT_TOKEN);
