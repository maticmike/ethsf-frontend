import { SIMPLE_POST } from '../constants/CampaignObjectives';

export const onlyNumeric = number => {
  let parsedNum = number.replace(/\,/g, ''); //TODO replace $
  return parseInt(parsedNum);
};

export const outstandingIncrementalOwed = (outstandingIncrementals, incrementalAmount) =>
  outstandingIncrementals * incrementalAmount;

export const outstandingJackpotOwed = (outstandingJackpot, jackpotAmount) => outstandingJackpot * jackpotAmount;

export const getDateFormat = (objective, startDate, deadline) => {
  const dateDeadline = new Date(parseInt(deadline * 1000));
  const yearDeadline = dateDeadline.getFullYear();
  const monthDeadline = dateDeadline.getMonth();
  const dayDeadline = dateDeadline.getDate();

  const formattedDateDeadline = new Date(yearDeadline, monthDeadline, dayDeadline);

  if (objective != SIMPLE_POST) {
    const dateStart = new Date(parseInt(startDate * 1000));
    const yearStart = dateStart.getFullYear();
    const monthStart = dateStart.getMonth();
    const dayStart = dateStart.getDate();
    const formattedDateStart = new Date(yearStart, monthStart, dayStart);

    return [formattedDateStart, formattedDateDeadline];
  } else {
    return formattedDateDeadline;
  }
};

export const campaignState = (campaignOngoing, deadline, outstandingPayments) => {
  if (campaignOngoing) {
    // console.log(deadline, 'deadline');
    // console.log(Math.round(Date.now() / 1000), 'now ');
    // console.log(outstandingPayments, 'outstanding payments');
    //campaign might be over but incomplete on contract
    return Math.round(Date.now() / 1000 > deadline) && outstandingPayments == 0 ? 'Pending Refund' : 'Campaign Ongoing';
  } else {
    return 'Campaign Completed';
  }
};
