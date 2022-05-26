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

  const payoutInWei = () => {
    if (potentialPayout != undefined) {
      return utils.fromWei(potentialPayout?.toString(), 'ether');
    }
  };
  return (
    <div className={classes.BusinessMake_component_outline}>
      <div>
        <Image
          className={classes.BusinessMake_round_header}
          src="/TestBusiness.png"
          alt="Change Me"
          width="125"
          height="125"
        />
      </div>
      <div>
        <Link href="/profile/[id]" as={`/profile/${username}`}>
          <h1 className={classes.BusinessMake_margin_bottom_h1}>{username}</h1>
        </Link>
        <a href={website} target="_blank">
          {website}
        </a>
        <h2>{isInfluencer ? payoutInWei() / influencersLength : payoutInWei()} eth</h2>
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

export default BusinessOngoingBountyHeader;
