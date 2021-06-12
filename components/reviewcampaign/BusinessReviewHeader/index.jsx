import React from 'react';
import Image from 'next/image';
import { shortenedEthAddress } from '../../../web3/helpers';
import { useStyles } from './styles';
const BusinessReviewHeader = ({ potentialPayout, objective, username }) => {
  const classes = useStyles();

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
        {/* <p>{shortenedEthAddress()}</p> */}
        <a href="https://gymshark.com" target="_blank">
          https://gymshark.com
        </a>
        <h2>${potentialPayout}</h2>
        {objective != 'singlePost' ? <strong>Potential Earnings</strong> : <strong>To Be Paid</strong>}
        {objective != 'singlePost' ? (
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
