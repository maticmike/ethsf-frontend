import React from 'react';
import Image from 'next/image';
import { campaignState } from '../../../utils/helpers';
import { useStyles } from './styles';

//check isBusiness to know if populate cards with influencer or business data
const ProfileCampaigns = ({ fund, beneficiaryData, isBeneficiary }) => {
  const classes = useStyles();

  return (
    <div className={classes.ProfileCampaigns_container}>
      <div>
        <Image
          className={classes.Profile_round_img}
          src="/avatar.png"
          // src={isBusiness ? campaign.business.profileImageUrl : campaign.influencer.profileImageUrl}
          width="95"
          height="95"
        />
      </div>
      <div>
        <br />
        <strong>{fund.fundName}</strong>
        <p>{fund.depositedAmount}</p>
        <p>{fund.vestingDate}</p>
        <p></p>
      </div>
    </div>
  );
};

export default ProfileCampaigns;
