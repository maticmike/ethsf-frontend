import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useQuery } from '@apollo/client';
import { useSelector, useDispatch } from 'react-redux';
import { GridList, GridListTile } from '@material-ui/core';
import consola from 'consola';
import { getAllCampaignsForUser } from '../../apollo/campaign.gql';
import { APOLLO_POLL_INTERVAL_MS } from '../../constants/Blockchain';
import { useStyles } from './styles';

const ProfileHeader = dynamic(() => import('../../components/profile/ProfileHeader'), {
  loading: () => <p>Profile Header Loading....</p>,
});
const ProfileCampaigns = dynamic(() => import('../../components/profile/ProfileCampaigns'), {
  loading: () => <p>Profile Campaigns Loading....</p>,
});

const Profile = () => {
  const account = useSelector(state => state.account);
  const [campaigns, setCampaigns] = useState([]);

  const getAllCampaignsQueryRes = useQuery(getAllCampaignsForUser);
  useEffect(() => {
    consola.success(getAllCampaignsQueryRes, 'getAllCampaignsQueryRes');
    // setCampaigns(getAllCampaignsQueryRes?.data)
    return () => {
      consola.success('cleaning up profile page');
    };
  }, []);

  const [dummyDatas, setDummyDatas] = useState([1, 2, 3, 4, 5, 6]);
  const classes = useStyles();
  // const hit = () => {
  //   consola.success(getAllCampaignsQueryRes, 'getAllCampaignsQueryRes');
  // };
  return (
    <>
      <div className={classes.Profile_header_container}>
        {/* <button onClick={() => hit()}>check graph</button> */}
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
          {dummyDatas.map((dummyData, index) => {
            return (
              <GridListTile cols={1} key={index}>
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
