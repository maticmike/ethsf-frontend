import React from 'react';
import Image from 'next/image';
import { getUserFromEthAddressDb } from '../../../services/api/userService';
import { campaignState } from '../../../utils/helpers';
import { useStyles } from './styles';

//check isBusiness to know if populate cards with influencer or business data
const ProfileCampaigns = ({ campaign, influencerData, isBusiness }) => {
  const classes = useStyles();

  return (
    <div className={classes.ProfileCampaigns_container}>
      <div>
        <Image
          className={classes.Profile_round_img}
          src="/TestInfluencer.jpeg"
          // src={isBusiness ? campaign.business.profileImageUrl : campaign.influencer.profileImageUrl}
          alt={influencerData}
          width="95"
          height="95"
        />
      </div>
      <div>
        <br />
        <strong>
          {typeof influencerData != 'string'
            ? influencerData > 2 || influencerData == 0
              ? `${influencerData} Influencers Registered`
              : `${influencerData} Influencer Registered`
            : `@${influencerData}`}
        </strong>
        <p>{campaignState(campaign.ongoing, campaign.deadline, campaign.outstandingPayments)}</p>
      </div>
    </div>
  );
};

export default ProfileCampaigns;
