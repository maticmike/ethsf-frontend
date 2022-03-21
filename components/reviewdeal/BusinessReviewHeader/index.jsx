import React, { useState } from 'react';
import Image from 'next/image';
import { utils } from 'web3';
import consola from 'consola';
import { SIMPLE_POST } from '../../../constants/CampaignObjectives';
import { useStyles } from './styles';
const BusinessReviewHeader = ({ potentialPayout, objective, username, website, ethAddress }) => {
  const classes = useStyles();

  const payoutInEth = () => {
    if (potentialPayout != undefined) {
      return utils.fromWei(potentialPayout?.toString(), 'ether');
    }
  };

  return (
    <div className={classes.BusinessReview_component_outline}>
      <div>
        <Image
          className={classes.BusinessReview_round_header}
          src="/TestBusiness.png"
          alt="Change Me"
          width="125"
          height="125"
        />
      </div>
      <div>
        <h1 className={classes.BusinessReview_margin_bottom_h1}>{username}</h1>

        <a href={website} target="_blank">
          {website}
        </a>
        <h2>{payoutInEth()} eth</h2>
        {objective != SIMPLE_POST ? <strong>Potential Earnings</strong> : <strong>To Be Paid</strong>}
        {objective != SIMPLE_POST ? (
          <>
            <p>$700 on 1,000,000 views</p>
            <p>$50 for each 50,000 views</p>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default BusinessReviewHeader;
