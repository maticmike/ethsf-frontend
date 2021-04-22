import React, { useState } from 'react';
import NumberFormat from 'react-number-format';
import { FormHelperText, Button } from '@material-ui/core';
import { setObjectiveName } from '../../../utils/ObjectiveNames';
import { useStyles } from './styles.js';

const CampaignReward = ({ objective, objectiveAmount, setCampaignSetupStep, stakedAmount }) => {
  const classes = useStyles();
  const [jackpot, setJackpot] = useState(true);
  const [jackpotAmount, setJackpotAmount] = useState(0);
  const [incrementalAmount, setIncrementalAmount] = useState(0);

  const getHeading = () => (jackpot ? 'Jackpot' : 'Incremental');

  const handlePrevious = () => {
    if (!jackpot) {
      setJackpot(true);
    } else {
      setCampaignSetupStep(4);
    }
  };

  const handleDeposit = () => {
    console.log(jackpotAmount, 'jAmount');
    console.log(incrementalAmount, 'iAmount');
    if (!jackpot) {
      console.log('incremental value');
    } else {
      console.log('jackpot value');
      setJackpot(false);
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
          {jackpot ? <p>Jackpot Payment:</p> : <p>Incremental Payment: </p>}
          <NumberFormat
            className={classes.CampaignReward_input}
            placeholder={`$${jackpot ? parseInt(stakedAmount) * 0.8 : parseInt(stakedAmount) * 0.2}`}
            thousandSeparator={true}
            value={jackpot ? jackpotAmount : incrementalAmount}
            prefix={'$'}
            onChange={e => (jackpot ? setJackpotAmount(e.target.value) : setIncrementalAmount(e.target.value))}
          />
          &nbsp;&nbsp;&nbsp;&nbsp;For Each
        </div>
        <div className={classes.CampaignReward_shift_objective_input}>
          {jackpot ? (
            <p>{objective.charAt(0).toUpperCase() + objective.slice(1)} Jackpot Objective:</p>
          ) : (
            <p>{objective.charAt(0).toUpperCase() + objective.slice(1)} Incremental Objective:</p>
          )}

          <NumberFormat
            className={classes.CampaignReward_input}
            placeholder={`${jackpot ? '800,000' : '50,000'} ${objective.charAt(0).toUpperCase() + objective.slice(1)}`}
            thousandSeparator={true}
          />
        </div>
      </div>
      <br />
      <div className={classes.CampaignReward_button_alignment}>
        <Button variant="outlined" color="primary" size="small" onClick={handlePrevious}>
          Previous
        </Button>
        <Button variant="contained" color="primary" size="small" onClick={handleDeposit}>
          {jackpot ? 'Next' : 'Finish'}
        </Button>
      </div>
    </div>
  );
};

export default CampaignReward;
