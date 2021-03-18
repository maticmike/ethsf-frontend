import React, { useState } from 'react';
import { FormHelperText, InputBase } from '@material-ui/core';
import { setObjectiveName } from '../../../utils/objectiveNames';
import { useStyles } from './styles.js';

const CampaignStaking = props => {
  const getHeading = () => (props.objective === 'singlePost' ? 'Post Staking' : 'Campaign Staking');
  const classes = useStyles();

  return (
    <div className={classes.p}>
      <h2>{setObjectiveName(props.objective)} Objective</h2>
      <p className={classes.psize}>2. {getHeading()}</p>
      <FormHelperText>Enter the amount of money you want to be available for the influencer to earn.</FormHelperText>
      <p>Amount to deposit for influencer</p>
      <InputBase className={classes.input} placeholder="$" size="large" inputProps={{ 'aria-label': 'naked' }} />
    </div>
  );
};

export default CampaignStaking;
