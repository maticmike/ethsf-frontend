import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { utils } from 'web3';
import consola from 'consola';
import { useStyles } from './styles';
const BusinessReviewHeader = ({ potentialPayout, username, website, ethAddress }) => {
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
          src="/avatar.png"
          alt="Change Me"
          width="125"
          height="125"
        />
      </div>
      <div>
        <Link href="/profile/[id]" as={`/profile/${username}`}>
          <h1 className={classes.BusinessReview_margin_bottom_h1}>{username}</h1>
        </Link>
        <h2>{payoutInEth()} eth</h2>
        <strong>To Be Paid</strong>

        <>
          <p>15 Eth On Aug 2032</p>
          <p>0.2 Eth For Each Merit Token</p>
        </>
      </div>
    </div>
  );
};

export default BusinessReviewHeader;
