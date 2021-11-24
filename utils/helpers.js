export const onlyNumeric = number => {
  let parsedNum = number.replace(/\,/g, ''); //TODO replace $
  return parseInt(parsedNum);
};

export const outstandingIncrementalOwed = (outstandingIncrementals, incrementalAmount) =>
  outstandingIncrementals * incrementalAmount;

export const outstandingJackpotOwed = (outstandingJackpot, jackpotAmount) => outstandingJackpot * jackpotAmount;
