import React, { useState } from 'react';
import { FormHelperText, InputBase, Button } from '@material-ui/core';
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
        placeholder="Total Staked"
        size="large"
        inputProps={{ 'aria-label': 'naked' }}
      />
      <br />
      <div className={classes.CampaignStaking_button_alignment}>
        <Button variant="outlined" color="primary" size="small">
          Previous
        </Button>
        <Button variant="contained" color="primary" size="small">
          Next
        </Button>
      </div>
    </div>
  );
};

export default CampaignStaking;
