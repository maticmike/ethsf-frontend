export const onlyNumeric = number => {
  let parsedNum = number.replace(/\,/g, ''); //TODO replace $
  return parseInt(parsedNum);
};
