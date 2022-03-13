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
  const [jackpotReward, setJackpotReward] = useState(null);
  const [incrementalReward, setIncrementalReward] = useState(null);
  const [jackpotTarget, setJackpotTarget] = useState(null);
  const [incrementalTarget, setIncrementalTarget] = useState(null);

  const getHeading = () => (isJackpot ? 'Jackpot' : 'Incremental');

  const handlePrevious = () => (!isJackpot ? setIsJackpot(true) : setParentCampaignSetupStep(4));

  const maxJackpotRewardInput = reward => {
    const { value } = reward;
    if (isNaN(parseInt(value))) return true;
    if (parseInt(value) <= stakedAmount) return true;
    return false;
  };

  const handleBountyRewardPerInfluencerCalc = () =>
    bountyType == 'varPot' ? stakedAmount / maxWinners : jackpotReward;

  const handleDealRewardPerInfluencerCal = () => (objective != 'post' ? stakedAmount / 2 : stakedAmount);

  const handleRewardPlaceholder = () => {
    if (isBounty) {
      const bountyReward = handleBountyRewardPerInfluencerCalc();
      return `${bountyReward.toString().slice(0, 6)} eth`;
    } else {
      const dealReward = handleDealRewardPerInfluencerCal();
      return `${utils.fromWei(dealReward.toString())} eth`;
    }
  };

  const handleFinish = () => {
    if (isBounty) {
      setParentFinishCampaign(jackpotReward, jackpotTarget);
    } else {
      !isJackpot
        ? setParentFinishCampaign(jackpotReward, incrementalReward, jackpotTarget, incrementalTarget)
        : setIsJackpot(false);
    }
  };

  return (
    <div className={classes.CampaignReward_font}>
      <h1>{objective} Objective</h1>
      <p className={classes.CampaignReward_p_heading}>{getHeading()} Reward</p>
      {isBounty ? (
        <FormHelperText>
          {bountyType === 'varPot' ? 'Minimum' : 'Fixed'} amount which each influencer would earn if all influencers
          accomplish bounty
        </FormHelperText>
      ) : (
        <FormHelperText>
          Enter the conditions for the influencer to earn a reward as well as the reward for completing the objective
        </FormHelperText>
      )}
      <div className={classes.CampaignReward_align_inputs}>
        <div>
          {isBounty ? (
            <p>
              {bountyType == 'varPot' ? 'Minimum ' : 'Set fixed pot reward per influencer'}Bounty Reward Per Influencer
            </p>
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
              isAllowed={bountyType == 'varPot' ? () => false : maxJackpotRewardInput}
            />
          ) : (
            <NumberFormat
              className={classes.CampaignReward_input}
              placeholder={`$${parseInt(stakedAmount) * 0.2}`}
              thousandSeparator={true}
              value={incrementalReward}
              suffix=" eth"
              onChange={e => setIncrementalReward(e.target.value.slice(0, e.target.value.length - 4))}
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
              onChange={e => setJackpotTarget(e.target.value)}
            />
          ) : (
            <NumberFormat
              className={classes.CampaignReward_input}
              placeholder={`5000 ${objective}`}
              thousandSeparator={true}
              value={incrementalTarget}
              onChange={e => setIncrementalTarget(e.target.value)}
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
