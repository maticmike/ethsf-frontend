import React from 'react';
import Image from 'next/image';
import { utils } from 'web3';
import consola from 'consola';
import { shortenedEthAddress } from '../../../web3/helpers';
import { useStyles } from './styles';
const BusinessReviewHeader = ({ potentialPayout, objective, username, website, ethAddress }) => {
  const classes = useStyles();

  const copyToClipboard = async copyMe => {
    try {
      await navigator.clipboard.writeText(copyMe);
    } catch (err) {
      consola.error('copyToClipboard:', err);
    }
  };

  const payoutInWei = () => {
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
        <p className={classes.BusinessReview_pointer} onClick={() => copyToClipboard(ethAddress)}>
          {shortenedEthAddress(ethAddress)}
        </p>
        <a href={website} target="_blank">
          {website}
        </a>
        {console.log(potentialPayout, 'pp payout')}
        <h2>{payoutInWei()} eth</h2>
        {objective != 'simplePost' ? <strong>Potential Earnings</strong> : <strong>To Be Paid</strong>}
        {objective != 'simplePost' ? (
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
