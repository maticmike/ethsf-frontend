import React, { useState, useEffect } from 'react';
import { utils } from 'web3';
import { Button } from '@material-ui/core';
import { outstandingIncrementalOwed, outstandingJackpotOwed } from '../../../utils/helpers';
import { useStyles } from './styles';

const ClaimPrize = ({ outstandingIncrementals, incrementalAmount, outstandingJackpot, jackpotAmount }) => {
  const classes = useStyles();

  const [totalAmountOwed, setTotalAmountOwed] = useState(0);

  useEffect(() => {
    const totalIncrementalOwed = outstandingIncrementalOwed(outstandingIncrementals, incrementalAmount);
    const totalJackpotOwed = outstandingJackpotOwed(outstandingJackpot, jackpotAmount);

    setTotalAmountOwed(totalIncrementalOwed + totalJackpotOwed);
    return () => console.log('cleanup claim prize');
  }, []);

  const claimReward = () => {};

  return (
    <>
      <p>
        Prize money available to claim <strong>{utils.fromWei(totalAmountOwed.toString())} Eth</strong>
      </p>
      <Button
        onClick={() => claimReward}
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
