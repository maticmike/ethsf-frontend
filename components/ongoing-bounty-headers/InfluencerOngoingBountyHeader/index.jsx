import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { utils } from 'web3';
import { Snackbar } from '@material-ui/core';
import { shortenedEthAddress } from '../../../web3/helpers';
import { useStyles } from './styles';
const InfluencerOngoingBountyHeader = ({ bounty, username, email, campaignsCompleted, ethAddress }) => {
  const classes = useStyles();

  const [influencerRegisted, setInfluencerRegisted] = useState(false);

  const influencerRegistered = () => {
    return (
      <>
        <div>
          <Link href="/profile/[id]" as={`/profile/${username}`}>
            <h1 className={classes.InfluencerReview_margin_bottom_h1}>{username}</h1>
          </Link>

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
      </>
    );
  };
  const influencerUnregistered = () => {
    return (
      <>
        <div>
          <p>
            <strong>1.2M Followers</strong>
          </p>
          <p>
            <strong>480K Subscribers</strong>
          </p>
          <p>
            <strong>700K Followers</strong>
          </p>
        </div>
      </>
    );
  };

  return (
    <div className={classes.InfluencerReview_component_outline}>
      {influencerRegisted ? influencerRegistered() : influencerUnregistered()}
    </div>
  );
};

export default InfluencerOngoingBountyHeader;
