import React, { useState } from 'react';
import { FormHelperText, InputBase } from '@material-ui/core';
import { setObjectiveName } from '../../../utils/objectiveNames';
import { useStyles } from './styles.js';

const CampaignPayment = ({ objective, objectiveAmount }) => {
  const classes = useStyles();
  const [jackpot, setJackpot] = useState(false);

  const getHeading = () => (objective === 'jackpot' ? 'Jackpot' : 'Incremental');

  return (
    <div className={classes.font}>
      <h1>{setObjectiveName(objective)} Objective</h1>
      <p className={classes.p_heading}>5. {getHeading()} Payment</p>
      <FormHelperText>Enter the amount of money you want to be available for the influencer to earn</FormHelperText>
      <div className={classes.align_inputs}>
        <div>
          {jackpot ? <p>{objective} For Jackpot</p> : <p>Payment Condition:</p>}
          <InputBase className={classes.input} startAdornment="$" placeholder=" Enter Target" size="large"></InputBase>
        </div>
        <div>
          {jackpot ? null : <p>Incremental Payment: </p>}
          <InputBase className={classes.input} startAdornment="$" placeholder=" Enter Reward" size="large"></InputBase>
        </div>
      </div>
    </div>
  );
};

export default CampaignPayment;
