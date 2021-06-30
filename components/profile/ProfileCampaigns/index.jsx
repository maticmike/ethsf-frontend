import React from 'react';
import Image from 'next/image';
import { useStyles } from './styles';

const ProfileCampaigns = () => {
  const classes = useStyles();

  return (
    <div className={classes.ProfileCampaigns_container}>
      <div>
        <Image
          className={classes.Profile_round_img}
          src="/TestInfluencer.jpeg"
          alt="Change Me"
          width="95"
          height="95"
        />
      </div>
      <div>
        <br />
        <strong>@trackTracy</strong>
        <p>Ongoing Campaign</p>
      </div>
    </div>
  );
};

export default ProfileCampaigns;
