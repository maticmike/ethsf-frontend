import React, { useState, useEffect } from 'react';
import { utils } from 'web3';
import { Button } from '@material-ui/core';
import { outstandingIncrementalOwed, outstandingJackpotOwed } from '../../../utils/helpers';
import { payInfluencer } from '../../../web3';
import { useStyles } from './styles';

const ClaimRefund = ({ campaign, claimRefund, campaignBalance }) => {
  const classes = useStyles();

  return (
    <>
      {campaign?.endedWithRefund ? (
        <h3>
          Refund Claimed:
          <strong>{utils.fromWei(campaign.businessRefundAmount)} Eth</strong>
        </h3>
      ) : (
        <>
          <p>
            Campaign period has ended. Refund available to claim:
            <strong>{utils.fromWei(campaignBalance.toString())} Eth</strong>
          </p>
          <Button
            onClick={claimRefund}
            className={classes.ClaimRefund_claimButton}
            variant="contained"
            size="large"
            color="secondary"
          >
            Claim Refund
          </Button>
        </>
      )}
    </>
  );
};

export default ClaimRefund;
