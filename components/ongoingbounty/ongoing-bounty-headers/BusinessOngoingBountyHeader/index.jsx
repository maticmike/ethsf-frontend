import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { utils } from 'web3';
import consola from 'consola';
import { SIMPLE_POST } from '../../../../constants/CampaignObjectives';
import { useStyles } from './styles';
const BusinessOngoingBountyHeader = ({
  potentialPayout,
  objective,
  username,
  website,
  ethAddress,
  isInfluencer,
  influencersLength,
}) => {
  const classes = useStyles();

  // const payoutInEth = () => {
  //   if (potentialPayout != undefined) {
  //     if (isInfluencer) {
  //       const payoutEth = utils.fromWei(potentialPayout?.toString(), 'ether');
  //       return parseFloat(payoutEth) / parseFloat(influencersLength);
  //     } else {
  //       return utils.fromWei(potentialPayout?.toString(), 'ether');
  //     }
  //   }
  // };
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
        <h2>1 eth</h2>
        {objective != SIMPLE_POST ? <p>1,000,000 views </p> : <p>6 hour simple post</p>}
        <p>0.2 eth fixed pot per winner</p>
        <p>4 max winners</p>
        <p>50 max participants</p>
      </div>
    </div>
  );
};

export default BusinessOngoingBountyHeader;
