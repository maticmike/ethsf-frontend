import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { utils } from 'web3';
import consola from 'consola';
import { SIMPLE_POST } from '../../../constants/CampaignObjectives';
import { useStyles } from './styles';
const BusinessBountyHeader = ({
  potentialPayout,
  objective,
  deposited,
  target,
  bountyType,
  maxReward,
  maxWinners,
  maxParticipants,
  username,
  website,
  ethAddress,
}) => {
  const classes = useStyles();

  const depositedInEth = wei => {
    if (wei != undefined) {
      return utils.fromWei(wei?.toString(), 'ether');
    }
  };

  return (
    <div className={classes.BusinessMake_component_outline}>
      <div>
        <Image
          className={classes.BusinessMake_round_header}
          src="/TestBusiness.png"
          alt="Change Me"
          width="225"
          height="225"
        />
      </div>
      <div>
        <Link href="/profile/[id]" as={`/profile/${username}`}>
          <h1 className={classes.BusinessMake_margin_bottom_h1}>{username}</h1>
        </Link>
        <a href={website} target="_blank">
          {website}
        </a>
        <h2>{`${depositedInEth(deposited)} eth`}</h2>
        {objective != SIMPLE_POST ? (
          <p>
            {target} {objective}
          </p>
        ) : (
          <p>6 hour simple post</p>
        )}
        <p>{`${depositedInEth(maxReward)} eth ${bountyType} per winner`}</p>
        <p>{maxWinners} max winners</p>
        <p>{maxParticipants} max participants</p>
      </div>
    </div>
  );
};

export default BusinessBountyHeader;
