import React, { useState } from 'react';
import NumberFormat from 'react-number-format';
import { FormHelperText, Button } from '@material-ui/core';
import { setObjectiveName } from '../../../utils/ObjectiveNames';
import { useStyles } from './styles.js';
const CampaignReward = ({
  objective,
  stakedAmount,
  setParentJackpotReward,
  setParentIncrementalReward,
  setParentCampaignSetupStep,
  setParentFinishCampaign,
}) => {
  const classes = useStyles();
  const [isJackpot, setIsJackpot] = useState(true);
  const [jackpotReward, setJackpotReward] = useState(0);
  const [incrementalReward, setIncrementalReward] = useState(0);
  const [jackpotTarget, setJackpotTarget] = useState(0);
  const [incrementalTarget, setIncrementalTarget] = useState(0);

  const getHeading = () => (isJackpot ? 'Jackpot' : 'Incremental');

  const handlePrevious = () => {
    if (!isJackpot) {
      setIsJackpot(true);
    } else {
      setParentCampaignSetupStep(4);
    }
  };

  const handleFinish = () => {
    if (!isJackpot) {
      setParentJackpotReward(jackpotReward);
      setParentIncrementalReward(incrementalReward);
      setParentFinishCampaign();
    } else {
      setIsJackpot(false);
    }
  };

  return (
    <div className={classes.CampaignReward_font}>
      <h1>{setObjectiveName(objective)} Objective</h1>
      <p className={classes.CampaignReward_p_heading}>5. {getHeading()} Payment</p>
      <FormHelperText>
        Enter the conditions for influencer to earn an incremental payment as well as the reward for completing the
        objective
      </FormHelperText>
      <div className={classes.CampaignReward_align_inputs}>
        <div>
          {isJackpot ? <p>Jackpot Payment:</p> : <p>Incremental Payment: </p>}
          <NumberFormat
            className={classes.CampaignReward_input}
            placeholder={`$${isJackpot ? parseInt(stakedAmount) * 0.8 : parseInt(stakedAmount) * 0.2}`}
            thousandSeparator={true}
            value={isJackpot ? jackpotReward : incrementalReward}
            prefix={'$'}
            onChange={e => (isJackpot ? setJackpotReward(e.target.value) : setIncrementalReward(e.target.value))}
          />
          &nbsp;&nbsp;&nbsp;&nbsp;For Each
        </div>
        <div className={classes.CampaignReward_shift_objective_input}>
          {isJackpot ? (
            <p>{setObjectiveName(objective)} Jackpot Objective:</p>
          ) : (
            <p>{setObjectiveName(objective)} Incremental Objective:</p>
          )}
          <NumberFormat
            className={classes.CampaignReward_input}
            placeholder={`${isJackpot ? '800,000' : '50,000'} ${setObjectiveName(objective)}`}
            thousandSeparator={true}
            value={isJackpot ? jackpotTarget : incrementalTarget}
            onChange={e => (isJackpot ? setJackpotTarget(e.target.value) : setIncrementalTarget(e.target.value))}
          />
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
