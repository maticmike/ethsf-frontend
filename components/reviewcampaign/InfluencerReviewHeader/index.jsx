import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { utils } from 'web3';
import { shortenedEthAddress } from '../../../web3/helpers';
import { useStyles } from './styles';
const InfluencerReviewHeader = ({ username, email, campaignsCompleted, ethAddress }) => {
  const classes = useStyles();

  const copyToClipboard = async copyMe => {
    try {
      await navigator.clipboard.writeText(copyMe);
    } catch (err) {
      consola.error('copyToClipboard:', err);
    }
  };

  return (
    <div className={classes.InfluencerReview_component_outline}>
      <div>
        <h1 className={classes.InfluencerReview_margin_bottom_h1}>{username}</h1>
        <p className={classes.InfluencerReview_pointer} onClick={() => copyToClipboard(ethAddress)}>
          {shortenedEthAddress(ethAddress)}
        </p>
        <a href="https://google.com" target="_blank">
          {email}
        </a>

        <p>
          <strong>1.2M Followers</strong>
        </p>
        <p>
          <strong>480K Subscribers</strong>
        </p>
        <p>
          <strong>700K Followers</strong>
        </p>
        <p>
          <i>Campaigns Completed: {campaignsCompleted}</i>
        </p>
      </div>
      <div>
        <Image
          className={classes.InfluencerReview_round_header}
          src="/TestInfluencer.jpeg"
          alt="Change Me"
          width="125"
          height="125"
        />
      </div>
    </div>
  );
};

export default InfluencerReviewHeader;
