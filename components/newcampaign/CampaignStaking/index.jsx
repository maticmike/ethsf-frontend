import React, { useState } from 'react';
import { utils } from 'web3';
import NumberFormat from 'react-number-format';
import { FormHelperText, Button } from '@material-ui/core';
import { setObjectiveName } from '../../../utils/ObjectiveNames';
import { useStyles } from './styles.js';
import { SIMPLE_POST } from '../../../constants/CampaignObjectives';
const CampaignStaking = ({
  objective,
  setParentDepositToEscrow,
  setParentCampaignSetupStep,
  setParentFinishCampaign,
  isBounty,
}) => {
  const classes = useStyles();

  const [inputEntered, setInputEntered] = useState(null);

  const getHeading = () => (objective === SIMPLE_POST ? 'Post Staking' : 'Campaign Staking');

  let parsedEth;

  const parseDeposit = e => {
    e.target.value.length ? setInputEntered(true) : setInputEntered(false);
    let deposit;
    deposit = e.target.value.replace(/,/g, '').replace(/ eth/g, '');
    deposit === '.' ? (deposit = 0 + deposit) : deposit;
    deposit.length > 0 ? (parsedEth = utils.toWei(deposit)) : (parsedEth = '0');
    setParentDepositToEscrow(parsedEth);
  };

  const stakeDeposit = () => (isBounty ? setParentCampaignSetupStep(6) : setParentCampaignSetupStep(5));

  // only for single post
  const finishAndDeposit = () => setParentFinishCampaign();

  return (
    <div className={classes.CampaignStaking_font}>
      <h1>{setObjectiveName(objective)} Objective</h1>
      <p className={classes.CampaignStaking_heading}>{getHeading()}</p>
      <FormHelperText>Enter the amount of money you want to be available for the influencer to earn.</FormHelperText>
      <p>Amount to deposit for Influencer</p>
      <NumberFormat
        className={classes.CampaignStaking_input}
        placeholder="5 eth"
        thousandSeparator={true}
        suffix={' eth'}
        onChange={e => parseDeposit(e)}
      />
      <br />
      <br />
      <div className={classes.CampaignStaking_button_alignment}>
        <Button
          variant="outlined"
          color="primary"
          size="small"
          onClick={() => setParentCampaignSetupStep(objective === SIMPLE_POST ? 3 : 2)}
        >
          Previous
        </Button>
        {inputEntered && objective != SIMPLE_POST ? (
          <Button variant="contained" color="primary" size="small" onClick={stakeDeposit}>
            Next
          </Button>
        ) : null}
        {inputEntered && objective === SIMPLE_POST ? (
          <Button variant="contained" color="primary" size="small" onClick={finishAndDeposit}>
            Finish
          </Button>
        ) : null}
      </div>
    </div>
  );
};

export default CampaignStaking;
