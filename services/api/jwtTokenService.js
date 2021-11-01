import consola from 'consola';
import axios from 'axios';
let api = process.env.BASE_API_URL;

let JWT_TOKEN = 'famepay_jwt';

//used for generating signed jwt WRONG <<use to validate not generate
export const generateJwtDb = async (ethAddress, challenge, signature) => {
  try {
    const jwt = await axios.post(`${api}/user/${ethAddress}/auth/generate-jwt`, {
      challenge,
      signature,
    });
    return jwt;
  } catch (error) {
    consola.error('ApiService generateJwt():', error);
  }
};

export const validateJwtFromDb = async ethAddress => {
  try {
    const currentJwt = getJwtLocalStorage();
    if (!currentJwt) return false;
    if (currentJwt) {
      await axios.post(
        `${api}/user/${ethAddress}/auth/jwt/validate`,
        {},
        {
          headers: {
            Authorization: `Bearer ${currentJwt}`,
          },
        },
      );
    }
    setJwtLocalStorage(currentJwt);
    return true;
  } catch (error) {
    consola.error('JWTTokenService.validateJwt() error: ', error);
    clearJwtLocalStorage();
    return false;
  }
};

export const setJwtLocalStorage = token => {
  localStorage.setItem(JWT_TOKEN, token);
  // this.httpClient.defaults.headers.common.Authorization = `Bearer ${authToken}`;
};
export const getJwtLocalStorage = () => localStorage.getItem(JWT_TOKEN);
export const clearJwtLocalStorage = () => {
  localStorage.removeItem(JWT_TOKEN);
  // delete this.httpClient.defaults.headers.common.Authorization;
};
