import { objectiveToString } from '../../../web3/helpers';
export const parseTwitterPostData = (objective, tweetStats) => {
  const objectiveString = objectiveToString(objective);
  switch (objectiveString) {
    case SIMPLE_POST:
      return;
    case PAY_PER_VIEW:
      return;
    case PROFILE_GROWTH:
      return;
    case LIKES:
      return;
    case COMMENTS:
      return;
    case SHARES:
      return;
    case WEB_VISITS:
      return;
    case ADD_TO_CART:
      return;
    case SALES:
      return;
    default:
      break;
  }
};
