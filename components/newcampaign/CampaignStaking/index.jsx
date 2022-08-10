import React, { useState } from 'react';
import { utils } from 'web3';
import NumberFormat from 'react-number-format';
import { FormHelperText, Button } from '@material-ui/core';

import { useStyles } from './styles.js';

const CampaignStaking = ({
  objective,
  setParentDepositToEscrow,
  setParentCampaignSetupStep,
  setParentFinishCampaign,
  isBounty,
}) => {
  const classes = useStyles();

  const [inputEntered, setInputEntered] = useState(null);

  const getHeading = () => 'Post Staking';

  let parsedEth;

  const parseDeposit = e => {
    e.target.value.length ? setInputEntered(true) : setInputEntered(false);
    let deposit;
    deposit = e.target.value.replace(/,/g, '').replace(/ eth/g, '');
    deposit === '.' ? (deposit = 0 + deposit) : deposit;
    deposit.length > 0 ? (parsedEth = utils.toWei(deposit)) : (parsedEth = '0');
    setParentDepositToEscrow(parsedEth);
  };

  const stakeDeposit = () => setParentCampaignSetupStep(2);

  return (
    <div className={classes.CampaignStaking_font}>
      <h1>Deposit Funds</h1>
      <FormHelperText>Enter the amount of money you want to be available for the beneficiary to earn.</FormHelperText>
      <p>Amount to deposit in trust</p>
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
        <Button variant="outlined" color="primary" size="small" onClick={() => setParentCampaignSetupStep(0)}>
          Previous
        </Button>
        {inputEntered || isBounty ? (
          <Button variant="contained" color="primary" size="small" onClick={stakeDeposit}>
            Next
          </Button>
        ) : null}
      </div>
    </div>
  );
};

export default CampaignStaking;
