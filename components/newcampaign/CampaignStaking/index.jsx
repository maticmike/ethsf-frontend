import React, { useState } from 'react';
import { FormHelperText, InputBase, Button } from '@material-ui/core';
import { setObjectiveName } from '../../../utils/objectiveNames';
import { useStyles } from './styles.js';

const CampaignStaking = ({ objective, setCampaignSetupStep, depositToEscrow }) => {
  const classes = useStyles();

  const [stakedAmount, setStakedAmount] = useState(null);

  const getHeading = () => (objective === 'singlePost' ? 'Post Staking' : 'Campaign Staking');

  const stakeDeposit = () => {
    depositToEscrow(stakedAmount);
  };

  return (
    <div className={classes.font}>
      <h1>{setObjectiveName(objective)} Objective</h1>
      <p className={classes.pHeading}>3. {getHeading()}</p>
      <FormHelperText>Enter the amount of money you want to be available for the influencer to earn.</FormHelperText>
      <p>Amount to deposit for Influencer</p>
      <InputBase
        className={classes.input}
        startAdornment="$"
        placeholder="Total Staked"
        size="large"
        inputProps={{ 'aria-label': 'naked' }}
        onChange={e => setStakedAmount(e.target.value)}
      />
      <br />
      <div className={classes.CampaignStaking_button_alignment}>
        <Button
          variant="outlined"
          color="primary"
          size="small"
          onClick={() => setCampaignSetupStep(objective === 'singlePost' ? 3 : 2)}
        >
          Previous
        </Button>
        {stakedAmount ? (
          <Button variant="contained" color="primary" size="small" onClick={stakeDeposit}>
            Next
          </Button>
        ) : null}
      </div>
    </div>
  );
};

export default CampaignStaking;
