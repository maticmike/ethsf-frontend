import React, { useState } from 'react';
import NumberFormat from 'react-number-format';
import { FormHelperText, Button } from '@material-ui/core';
import { utils } from 'web3';

import { useStyles } from './styles.js';
const CampaignReward = ({
  objective,
  maxWinners,
  stakedAmount,
  setParentCampaignSetupStep,
  setParentFinishCampaign,
  isBounty,
  bountyType,
}) => {
  const classes = useStyles();
  const [jackpotTarget, setJackpotTarget] = useState(null);
  const [jackpotReward, setJackpotReward] = useState(null);
  const [incrementalReward, setIncrementalReward] = useState(0);
  const [incrementalTarget, setIncrementalTarget] = useState(0);

  const handlePrevious = () => setParentCampaignSetupStep(2);

  const handleBountyRewardPerInfluencerCalc = () => {
    const rewardWei = stakedAmount / maxWinners;
    const weiRewardRounded = Math.round(rewardWei);
    return utils.fromWei(weiRewardRounded.toString()); ///TODO breaks on bounties with lots of winners
  };

  const maxJackpotRewardInput = reward => {
    const { floatValue } = reward;
    const maxRewardPerInfluencer = handleBountyRewardPerInfluencerCalc();
    if (floatValue <= maxRewardPerInfluencer) return true;
    if (isBounty == 'varPot') return false;
    return false;
  };

  const handleDealRewardPerInfluencerCal = () => (objective != 'post' ? stakedAmount / 2 : stakedAmount);

  const handleRewardPlaceholder = () => {
    const dealReward = handleDealRewardPerInfluencerCal();
    return `${utils.fromWei(dealReward.toString())} eth`;
  };

  const handleJackpotTarget = jackpotTarget => setJackpotTarget(jackpotTarget.replace(/,/g, ''));

  const handleFinish = () => {
    setParentFinishCampaign(utils.toWei(jackpotReward), incrementalReward.toString(), jackpotTarget, incrementalTarget);
  };

  return (
    <div className={classes.CampaignReward_font}>
      <h1>Merit Reward</h1>

      <FormHelperText>
        Enter the conditions for the beneficiary to earn a merit reward as well as the NFTs required to earn the reward
      </FormHelperText>

      <div className={classes.CampaignReward_align_inputs}>
        <div>
          <p>Merit Reward: </p>
          <NumberFormat
            className={classes.CampaignReward_input}
            placeholder={handleRewardPlaceholder()}
            thousandSeparator={true}
            value={jackpotReward}
            suffix=" eth"
            onChange={e => setJackpotReward(e.target.value.slice(0, e.target.value.length - 4))}
            isAllowed={maxJackpotRewardInput}
          />
          &nbsp;&nbsp;&nbsp;&nbsp;For Each
        </div>
        <div className={classes.CampaignReward_shift_objective_input}>
          <p>Merit Tokens Acquired</p>
          <NumberFormat
            className={classes.CampaignReward_input}
            placeholder="1 Merit Token"
            thousandSeparator={true}
            value={jackpotTarget}
            onChange={e => handleJackpotTarget(e.target.value)}
          />
        </div>
      </div>
      <br />
      <div className={classes.CampaignReward_button_alignment}>
        <Button variant="outlined" color="primary" size="small" onClick={handlePrevious}>
          Previous
        </Button>
        <Button variant="contained" color="primary" size="small" onClick={handleFinish}>
          {'Finish'}
        </Button>
      </div>
    </div>
  );
};

export default CampaignReward;
