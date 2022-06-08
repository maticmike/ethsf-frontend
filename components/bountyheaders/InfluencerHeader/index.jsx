import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { utils } from 'web3';
import { Snackbar } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { shortenedEthAddress } from '../../../web3/helpers';

import { useStyles } from './styles';
const InfluencerBountyHeader = ({
  bounty,
  username,
  email,
  campaignsCompleted,
  ethAddress,
  bountyInfluencers,
  addInfluencerToBountyParent,
}) => {
  const classes = useStyles();

  const [influencerRegisted, setInfluencerRegisted] = useState(false);

  useEffect(() => {
    if (bountyInfluencers.some(influencer => influencer.id === ethAddress)) setInfluencerRegisted(true);
    return () => console.log('Cleanup: InfluencerOngoingBountyHeader component');
  }, []);

  return (
    <div className={classes.InfluencerOngoingBountyHeader_component_outline}>
      <>
        <div>
          <Link href="/profile/[id]" as={`/profile/${username}`}>
            <h1 className={classes.InfluencerOngoingBountyHeader_margin_bottom_h1}>{username}</h1>
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
            <i>Bounties Completed: {campaignsCompleted}</i>
          </p>
          {influencerRegisted ? null : (
            <Button variant="contained" color="primary" onClick={() => addInfluencerToBountyParent()}>
              Register for Bounty!
            </Button>
          )}
        </div>
        <div>
          <Image
            className={classes.InfluencerOngoingBountyHeader_round_header}
            src="/TestInfluencer.jpeg"
            alt="Change Me"
            width="125"
            height="125"
          />
        </div>
      </>
    </div>
  );
};

export default InfluencerBountyHeader;
