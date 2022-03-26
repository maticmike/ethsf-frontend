import React, { useState } from 'react';
import NumberFormat from 'react-number-format';
import { FormHelperText, Button } from '@material-ui/core';
import { utils } from 'web3';
import { setObjectiveName } from '../../../utils/ObjectiveNames';
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
  const [isJackpot, setIsJackpot] = useState(true);
  const [jackpotTarget, setJackpotTarget] = useState(null);
  const [jackpotReward, setJackpotReward] = useState(null);
  const [incrementalReward, setIncrementalReward] = useState(0);
  const [incrementalTarget, setIncrementalTarget] = useState(0);

  const getHeading = () => (isJackpot ? 'Jackpot' : 'Incremental');

  const handlePrevious = () => (!isJackpot ? setIsJackpot(true) : setParentCampaignSetupStep(4));

  const handleBountyRewardPerInfluencerCalc = () => {
    const rewardWei = stakedAmount / maxWinners;
    return utils.fromWei(rewardWei.toString()); ///TODO breaks on bounties with lots of winners
  };

  const maxJackpotRewardInput = reward => {
    const { floatValue } = reward;
    const maxRewardPerInfluencer = handleBountyRewardPerInfluencerCalc();
    if (floatValue <= maxRewardPerInfluencer) return true;
    if (isBounty == 'varPot') return false;
    return false;
  };

  const maxIncrementalTargetInput = incrementalTargetAmount => {
    const { floatValue } = incrementalTargetAmount;
    if (floatValue < jackpotTarget) return true;
    return false;
  };

  const handleDealRewardPerInfluencerCal = () => (objective != 'post' ? stakedAmount / 2 : stakedAmount);

  const handleRewardPlaceholder = () => {
    if (isBounty) {
      const bountyReward = handleBountyRewardPerInfluencerCalc();
      return `${bountyReward?.toString().slice(0, 6)} eth`;
    } else {
      const dealReward = handleDealRewardPerInfluencerCal();
      return `${utils.fromWei(dealReward.toString())} eth`;
    }
  };

  const handleJackpotTarget = jackpotTarget => {
    setJackpotTarget(jackpotTarget.replace(/,/g, ''));
    if (bountyType == 'varPot') {
      const rewardInEth = handleRewardPlaceholder();
      setJackpotReward(rewardInEth.slice(0, rewardInEth.length - 4));
    }
  };

  //calculate incremental reward based on target
  const handleIncrementalRewardAndTarget = incrementalTargetAmount => {
    setIncrementalTarget(incrementalTargetAmount);
    const incrementalRewardAvailable = stakedAmount - utils.toWei(jackpotReward);
    const possibleIncrementalPayments = jackpotTarget / incrementalTargetAmount;
    const incrementalRewardDistributed = incrementalRewardAvailable / possibleIncrementalPayments;
    //parse int to remove decimals
    setIncrementalReward(parseInt(incrementalRewardDistributed));
  };

  const handleFinish = () => {
    if (isBounty) {
      setParentFinishCampaign(utils.toWei(jackpotReward), jackpotTarget);
    } else {
      !isJackpot
        ? setParentFinishCampaign(
            utils.toWei(jackpotReward),
            incrementalReward.toString(),
            jackpotTarget,
            incrementalTarget,
          )
        : setIsJackpot(false);
    }
  };

  return (
    <div className={classes.CampaignReward_font}>
      <h1>{objective} Objective</h1>
      <p className={classes.CampaignReward_p_heading}>{getHeading()} Reward</p>
      {isBounty ? (
        <FormHelperText>
          {bountyType === 'varPot' ? 'Minimum' : 'Fixed'} amount which each influencer would earn
          {bountyType === 'varPot' ? ' if all influencers accomplish bounty' : ' for achieving bounty objective'}
        </FormHelperText>
      ) : (
        <FormHelperText>
          Enter the conditions for the influencer to earn a reward as well as the reward for completing the objective
        </FormHelperText>
      )}
      <div className={classes.CampaignReward_align_inputs}>
        <div>
          {isBounty ? (
            <p>{bountyType == 'varPot' ? 'Minimum ' : 'Fixed '}Bounty Reward Per Influencer</p>
          ) : isJackpot ? (
            <p>Jackpot Reward:</p>
          ) : (
            <p>Incremental Reward: </p>
          )}
          {isJackpot ? (
            <NumberFormat
              className={classes.CampaignReward_input}
              placeholder={bountyType == 'varPot' ? null : handleRewardPlaceholder()}
              thousandSeparator={true}
              value={bountyType == 'varPot' ? handleRewardPlaceholder() : jackpotReward}
              suffix=" eth"
              onChange={e => setJackpotReward(e.target.value.slice(0, e.target.value.length - 4))}
              // isAllowed={bountyType == 'varPot' ? () => false : maxJackpotRewardInput}
              isAllowed={maxJackpotRewardInput}
            />
          ) : (
            <NumberFormat
              className={classes.CampaignReward_input}
              thousandSeparator={true}
              value={utils.fromWei(incrementalReward.toString())}
              suffix=" eth"
              // onChange={e => setIncrementalReward(e.target.value.slice(0, e.target.value.length - 4))}
              isAllowed={() => false}
            />
          )}
          &nbsp;&nbsp;&nbsp;&nbsp;For Each
        </div>
        <div className={classes.CampaignReward_shift_objective_input}>
          {isJackpot ? <p>{objective} Jackpot Objective:</p> : <p>{objective} Incremental Objective:</p>}
          {isJackpot ? (
            <NumberFormat
              className={classes.CampaignReward_input}
              placeholder={`90,000 ${objective}`}
              thousandSeparator={true}
              value={jackpotTarget}
              onChange={e => handleJackpotTarget(e.target.value)}
            />
          ) : (
            <NumberFormat
              className={classes.CampaignReward_input}
              thousandSeparator={true}
              value={incrementalTarget}
              onChange={e => handleIncrementalRewardAndTarget(e.target.value.replace(/,/g, ''))}
              isAllowed={maxIncrementalTargetInput}
            />
          )}
        </div>
      </div>
      <br />
      <div className={classes.CampaignReward_button_alignment}>
        <Button variant="outlined" color="primary" size="small" onClick={handlePrevious}>
          Previous
        </Button>
        <Button variant="contained" color="primary" size="small" onClick={handleFinish}>
          {isJackpot && !isBounty ? 'Next' : 'Finish'}
        </Button>
      </div>
    </div>
  );
};

export default CampaignReward;
