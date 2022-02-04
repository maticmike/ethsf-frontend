import React, { useState } from 'react';
import NumberFormat from 'react-number-format';
import { FormHelperText, Button } from '@material-ui/core';
import { utils } from 'web3';
import { setObjectiveName } from '../../../utils/ObjectiveNames';
import { useStyles } from './styles.js';
const CampaignReward = ({
  objective,
  stakedAmount,
  setParentJackpotReward,
  setParentIncrementalReward,
  setParentJackpotTarget,
  setParentIncrementalTarget,
  setParentCampaignSetupStep,
  setParentFinishCampaign,
  parentJackpotReward,
  parentIncrementalReward,
  parentJackpotTarget,
  parentIncrementalTarget,
  isBounty,
  bountyType,
  bountyParticipants,
  fixedPotReward,
}) => {
  const classes = useStyles();
  const [isJackpot, setIsJackpot] = useState(true);

  const getHeading = () => (isJackpot ? 'Jackpot' : 'Incremental');

  const handlePrevious = () => {
    if (!isJackpot) {
      setIsJackpot(true);
    } else {
      setParentCampaignSetupStep(4);
    }
  };

  const maxJackpotRewardInput = jackpotReward => {
    const { value } = jackpotReward;
    if (value <= stakedAmount) return true;
    return false;
  };

  const handleFinish = () => {
    if (!isJackpot) {
      setParentJackpotReward(jackpotReward);
      setParentIncrementalReward(incrementalReward);
      setParentJackpotTarget(jackpotTarget);
      setParentIncrementalTarget(incrementalTarget);
      setParentFinishCampaign();
    } else {
      setIsJackpot(false);
    }
  };

  const handleBountyRewardCalc = () => (bountyType == 'var' ? bountyParticipants / stakedAmount : fixedPotReward);

  const handleRewardPlaceholder = () => {
    if (isBounty) {
      const bountyReward = handleBountyRewardCalc();
      return `${bountyReward.toString().slice(0, 6)} eth`;
    } else {
      return `${utils.fromWei(stakedAmount.toString())} eth`;
    }
  };

  return (
    <div className={classes.CampaignReward_font}>
      <h1>{objective} Objective</h1>
      <p className={classes.CampaignReward_p_heading}>{getHeading()} Reward</p>
      <FormHelperText>
        Enter the conditions for the influencer to earn a reward as well as the reward for completing the objective
      </FormHelperText>
      <div className={classes.CampaignReward_align_inputs}>
        <div>
          {isBounty ? (
            <p>{bountyType == 'var' ? 'Minimum ' : null}Bounty Reward Per Influencer</p>
          ) : isJackpot ? (
            <p>Jackpot Reward:</p>
          ) : (
            <p>Incremental Reward: </p>
          )}
          {isJackpot ? (
            <NumberFormat
              className={classes.CampaignReward_input}
              placeholder={handleRewardPlaceholder()}
              thousandSeparator={true}
              value={parentJackpotReward}
              prefix={'$'}
              onChange={e => setParentJackpotReward(e.target.value.slice(1))}
              isAllowed={maxJackpotRewardInput}
            />
          ) : (
            <NumberFormat
              className={classes.CampaignReward_input}
              placeholder={`$${parseInt(stakedAmount) * 0.2}`}
              thousandSeparator={true}
              value={parentIncrementalReward}
              prefix={'$'}
              onChange={e => setParentIncrementalReward(e.target.value.slice(1))}
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
              value={parentJackpotTarget}
              onChange={e => setParentJackpotTarget(e.target.value)}
            />
          ) : (
            <NumberFormat
              className={classes.CampaignReward_input}
              placeholder={`5000 ${objective}`}
              thousandSeparator={true}
              value={parentIncrementalTarget}
              onChange={e => setParentIncrementalTarget(e.target.value)}
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
          {isJackpot ? 'Next' : 'Finish'}
        </Button>
      </div>
    </div>
  );
};

export default CampaignReward;
