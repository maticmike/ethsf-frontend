import React, { useState } from 'react';
import { FormHelperText, InputBase } from '@material-ui/core';
import { setObjectiveName } from '../../../utils/objectiveNames';
import { useStyles } from './styles.js';

const CampaignPayment = ({ objective }) => {
  const classes = useStyles();

  const getHeading = () => (objective === 'jackpot' ? 'Jackpot' : 'Incremental');

  return (
    <div className={classes.font}>
      <h1>{setObjectiveName(objective)} Objective</h1>
      <p className={classes.pHeading}>5. {getHeading()} Payment</p>
      <FormHelperText>
        Enter the amount of money which you want to be paid to the influencer for every incremental achievement
      </FormHelperText>
      <p>Amount Influencer Will Get Paid</p>

      <InputBase
        className={classes.input}
        startAdornment="$"
        placeholder="Reward"
        size="large"
        inputProps={{ 'aria-label': 'naked' }}
      ></InputBase>
    </div>
  );
};

export default CampaignPayment;
