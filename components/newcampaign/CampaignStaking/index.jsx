import React, { useState } from 'react';
import { FormHelperText, Button } from '@material-ui/core';
import NumberFormat from 'react-number-format';
import { setObjectiveName } from '../../../utils/objectiveNames';
import { useStyles } from './styles.js';

const CampaignStaking = ({ objective, setCampaignSetupStep, depositToEscrow }) => {
  const classes = useStyles();

  const [stakedAmount, setStakedAmount] = useState(null);

  const getHeading = () => (objective === 'singlePost' ? 'Post Staking' : 'Campaign Staking');

  const stakeDeposit = () => {
    depositToEscrow(stakedAmount);
    setCampaignSetupStep(5);
  };

  // only for single post
  const finishAndDeposit = () => {
    console.log('Finished Single Post!!');
  };

  return (
    <div className={classes.CampaignStaking_font}>
      <h1>{setObjectiveName(objective)} Objective</h1>
      <p className={classes.CampaignStaking_heading}>3. {getHeading()}</p>
      <FormHelperText>Enter the amount of money you want to be available for the influencer to earn.</FormHelperText>
      <p>Amount to deposit for Influencer</p>
      <NumberFormat
        className={classes.CampaignStaking_input}
        placeholder="Total Staked"
        thousandSeparator={true}
        prefix={'$'}
        onChange={e => setStakedAmount(e.target.value)}
      />
      <br />
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
        {stakedAmount && objective != 'singlePost' ? (
          <Button variant="contained" color="primary" size="small" onClick={stakeDeposit}>
            Next
          </Button>
        ) : null}
        {stakedAmount && objective === 'singlePost' ? (
          <Button variant="contained" color="primary" size="small" onClick={finishAndDeposit}>
            Finish
          </Button>
        ) : null}
      </div>
    </div>
  );
};

export default CampaignStaking;
