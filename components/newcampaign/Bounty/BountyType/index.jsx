import React from 'react';
import { Button } from '@material-ui/core';
import { useStyles } from './styles.js';

const BountyType = ({ setParentBountyType, setParentCampaignSetupStep }) => {
  const classes = useStyles();

  const setBountyType = bountyType => {
    setParentBountyType(bountyType);
    setParentCampaignSetupStep(1);
  };

  return (
    <>
      <div className={classes.BountType_heading_center}>
        <h3>New Famepay Bounty</h3>
      </div>
      <div className={classes.BountyType_buttons_spacing}>
        <Button variant="contained" color="primary" onClick={() => setBountyType('var')}>
          Variable Pot
        </Button>

        <Button variant="contained" color="secondary" onClick={() => setBountyType('fixed')}>
          Fixed Pot
        </Button>
      </div>
    </>
  );
};

export default BountyType;
