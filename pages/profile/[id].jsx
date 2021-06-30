import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { useStyles } from './styles';
import Image from 'next/image';
import { GridList, GridListTile } from '@material-ui/core';

const ProfileHeader = dynamic(() => import('../../components/profile/ProfileHeader'), {
  loading: () => <p>Profile Header Loading....</p>,
});
const ProfileCampaigns = dynamic(() => import('../../components/profile/ProfileCampaigns'), {
  loading: () => <p>Profile Campaigns Loading....</p>,
});

const Profile = () => {
  const [dummyDatas, setDummyDatas] = useState([1, 2, 3, 4, 5, 6]);
  const classes = useStyles();
  return (
    <>
      <div className={classes.Profile_header_container}>
        <img
          className={classes.Profile_cover_photo}
          src="https://mir-s3-cdn-cf.behance.net/projects/max_808/f7189086626231.Y3JvcCwxMDgwLDg0NCwwLDExNw.png"
        />
        <br />
        <br />
        <div className={classes.Profie_cover_flex}>
          <Image
            className={classes.Profile_round_img}
            src="/TestBusiness.png"
            alt="Change Me"
            width="195"
            height="195"
          />
          <ProfileHeader />
        </div>
      </div>
      <br />
      <br />
      <br />
      <div className={classes.Profile_content_container}>
        <GridList cellHeight={200} className={classes.gridList} cols={3}>
          {dummyDatas.map(dummyData => {
            return (
              <GridListTile cols={1}>
                <ProfileCampaigns />
              </GridListTile>
            );
          })}
        </GridList>
      </div>
    </>
  );
};

export default Profile;
