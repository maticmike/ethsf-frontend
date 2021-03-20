import React, { useState } from 'react';
import { FormHelperText, InputBase } from '@material-ui/core';
import { setObjectiveName } from '../../../utils/objectiveNames';
import { useStyles } from './styles.js';

const CampaignStaking = ({ objective }) => {
  const classes = useStyles();

  const getHeading = () => (objective === 'singlePost' ? 'Post Staking' : 'Campaign Staking');

  return (
    <div className={classes.font}>
      <h1>{setObjectiveName(objective)} Objective</h1>
      <p className={classes.pHeading}>2. {getHeading()}</p>
      <FormHelperText>Enter the amount of money you want to be available for the influencer to earn.</FormHelperText>
      <p>Amount to deposit for Influencer</p>
      <InputBase
        className={classes.input}
        startAdornment="$"
        placeholder="Payment"
        size="large"
        inputProps={{ 'aria-label': 'naked' }}
      />
    </div>
  );
};

export default CampaignStaking;
