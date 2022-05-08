import axios from 'axios';
import consola from 'consola';

let api = process.env.BASE_API_URL;

export const createNewBountyDb = async (
  business,
  agreedStartDate,
  agreedDeadline,
  totalDeposited,
  simplePostDuration,
  maxJackpotReward,
  jackpotTarget,
  maxParticipants,
  maxWinners,
  objective,
  bountyType,
  // niche,
) => {
  try {
    const bounty = await axios.post(`${api}/bounty/create`, {
      business,
      agreedStartDate,
      agreedDeadline,
      totalDeposited,
      simplePostDuration,
      maxJackpotReward,
      jackpotTarget,
      maxParticipants,
      maxWinners,
      objective,
      bountyType,
      // niche,
    });
    return bounty;
  } catch (error) {
    consola.error('ApiService: createNewBountyDb():', error);
    throw error;
  }
};

export const getBountyDb = async id => {
  try {
    const bounty = await axios.get(`${api}/bounty/${id}`);
    consola.success('ApiService: getBountyDb():', bounty);
    return bounty;
  } catch (error) {
    consola.error('ApiService: getBountyDb():', error);
  }
};
