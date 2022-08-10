import React, { useState } from 'react';
import NumberFormat from 'react-number-format';
import { FormHelperText, Button } from '@material-ui/core';
import { utils } from 'web3';

import { useStyles } from './styles.js';
const CampaignReward = ({
  objective,
  maxWinners,
  stakedAmount,
  setParentCampaignSetupStep,
  setParentFinishCampaign,
  isBounty,
  bountyType,
}) => {
  const classes = useStyles();
  const [meritTarget, setmeritTarget] = useState(null);
  const [meritReward, setmeritReward] = useState(null);

  const handlePrevious = () => setParentCampaignSetupStep(2);

  const handlemeritTarget = meritTarget => setmeritTarget(meritTarget.replace(/,/g, ''));

  const handleFinish = () => {
    setParentFinishCampaign(utils.toWei(meritReward), meritTarget);
  };

  return (
    <div className={classes.CampaignReward_font}>
      <h1>Merit Reward</h1>

      <FormHelperText>
        Enter the conditions for the beneficiary to earn a merit reward as well as the NFTs required to earn the reward
      </FormHelperText>

      <div className={classes.CampaignReward_align_inputs}>
        <div>
          <p>Merit Reward: </p>
          <NumberFormat
            className={classes.CampaignReward_input}
            placeholder={'0.1 eth'}
            thousandSeparator={true}
            value={meritReward}
            suffix=" eth"
            onChange={e => setmeritReward(e.target.value.slice(0, e.target.value.length - 4))}
          />
          &nbsp;&nbsp;&nbsp;&nbsp;For Each
        </div>
        <div className={classes.CampaignReward_shift_objective_input}>
          <p>Merit Tokens Acquired</p>
          <NumberFormat
            className={classes.CampaignReward_input}
            placeholder="1 Merit Token"
            thousandSeparator={true}
            value={meritTarget}
            onChange={e => handlemeritTarget(e.target.value)}
          />
        </div>
      </div>
      <br />
      <div className={classes.CampaignReward_button_alignment}>
        <Button variant="outlined" color="primary" size="small" onClick={handlePrevious}>
          Previous
        </Button>
        <Button variant="contained" color="primary" size="small" onClick={handleFinish}>
          {'Finish'}
        </Button>
      </div>
    </div>
  );
};

export default CampaignReward;
