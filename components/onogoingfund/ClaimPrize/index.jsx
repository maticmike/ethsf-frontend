import React, { useEffect } from 'react';
import { utils } from 'web3';
import { Button } from '@material-ui/core';

import { useStyles } from './styles';

const ClaimPrize = ({ payBeneficiary, claimableAmount }) => {
  const classes = useStyles();

  return (
    <>
      <p>
        Prize money available to claim <strong>{utils.fromWei(claimableAmount.toString())} Eth</strong>
      </p>
      <Button
        onClick={payBeneficiary}
        className={classes.ClaimPrize_claimButton}
        variant="contained"
        size="large"
        color="secondary"
      >
        Claim Campaign Reward
      </Button>
    </>
  );
};

export default ClaimPrize;
