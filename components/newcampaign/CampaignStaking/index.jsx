import React, { useState } from 'react';
import NumberFormat from 'react-number-format';
import { FormHelperText, Button } from '@material-ui/core';
import { setObjectiveName } from '../../../utils/ObjectiveNames';
import { useStyles } from './styles.js';

const CampaignStaking = ({
  objective,
  setParentDepositToEscrow,
  setParentCampaignSetupStep,
  setParentFinishCampaign,
}) => {
  const classes = useStyles();

  const [inputEntered, setInputEntered] = useState(null);

  const getHeading = () => (objective === 'singlePost' ? 'Post Staking' : 'Campaign Staking');

  const stakeDeposit = () => setParentCampaignSetupStep(5);
  // only for single post
  const finishAndDeposit = () => setParentFinishCampaign();

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
        onChange={e => {
          e.target.value.length ? setInputEntered(true) : setInputEntered(false);
          setParentDepositToEscrow(e.target.value.slice(1));
        }}
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
        {inputEntered && objective != 'singlePost' ? (
          <Button variant="contained" color="primary" size="small" onClick={stakeDeposit}>
            Next
          </Button>
        ) : null}
        {inputEntered && objective === 'singlePost' ? (
          <Button variant="contained" color="primary" size="small" onClick={finishAndDeposit}>
            Finish
          </Button>
        ) : null}
      </div>
    </div>
  );
};

export default CampaignStaking;
