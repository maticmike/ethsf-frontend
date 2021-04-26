import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import NumberFormat from 'react-number-format';
import { FormHelperText, Button } from '@material-ui/core';
import { setObjectiveName } from '../../../utils/ObjectiveNames';
import { useStyles } from './styles.js';

const CampaignStaking = ({ objective, setParentDepositToEscrow, setParentCampaignSetupStep }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [stakedAmount, setStakedAmount] = useState(null);

  useEffect(() => {
    dispatch(storeFamepayFactoryThunk());
  }, []);

  const getHeading = () => (objective === 'singlePost' ? 'Post Staking' : 'Campaign Staking');

  const stakeDeposit = () => {
    setParentDepositToEscrow(stakedAmount.slice(1));
    setParentCampaignSetupStep(5);
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
        placeholder="$1000"
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
          onClick={() => setParentCampaignSetupStep(objective === 'singlePost' ? 3 : 2)}
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
