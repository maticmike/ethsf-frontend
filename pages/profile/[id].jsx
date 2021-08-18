import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Error from 'next/error';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { GridList, GridListTile } from '@material-ui/core';
import consola from 'consola';
import { getUserFromUsernameDb } from '../../services/api/userService';
import { GET_ALL_CAMPAIGNS_FOR_BUSINESS_QUERY, GET_ALL_CAMPAIGNS_FOR_INFLUENCER_QUERY } from '../../apollo/user.gql';
import { APOLLO_POLL_INTERVAL_MS } from '../../constants/Blockchain';
import { useStyles } from './styles';

const ProfileHeader = dynamic(() => import('../../components/profile/ProfileHeader'), {
  loading: () => <p>Profile Header Loading....</p>,
});
const ProfileCampaigns = dynamic(() => import('../../components/profile/ProfileCampaigns'), {
  loading: () => <p>Profile Campaigns Loading....</p>,
});

const Profile = () => {
  const router = useRouter();

  const { id } = router.query;

  const [user, setUser] = useState('');
  const [profileIsBusiness, setProfileIsBusiness] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    async function getUsernameEthAddress() {
      if (!router.isReady) return;
      const userDb = await getUserFromUsernameDb(id);
      if (userDb === undefined) {
        return <Error statusCode={404} />;
      } else {
        setUser(userDb.data.payload);
        if (userDb.data.payload.type === 'BUSINESS') setProfileIsBusiness(true);
      }
    }
    getUsernameEthAddress();
    return () => {
      consola.success('Cleanup profile page');
    };
  }, [router.isReady]);

  let campaigns;

  if (profileIsBusiness) {
    const { loading, error, data } = useQuery(getProjectsQuery, {
      variables: { id: user.userEthAddress },
      pollInterval: APOLLO_POLL_INTERVAL_MS,
    });
    if (loading) return null;
    if (error) return <Error statusCode={404} />;
    campaigns = data?.campaigns;

    //if influencer
  } else {
    const { loading, error, data } = useQuery(GET_ALL_CAMPAIGNS_FOR_INFLUENCER_QUERY, {
      variables: { id: user.userEthAddress },
      pollInterval: APOLLO_POLL_INTERVAL_MS,
    });
    if (loading) return null;
    if (error) return <Error statusCode={404} />;
    campaigns = data?.influencers[0]?.campaigns;
    console.log(campaigns, 'this is the data');
  }
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
          <ProfileHeader user={user} />
        </div>
      </div>
      <br />
      <br />
      <br />
      <div className={classes.Profile_content_container}>
        <GridList cellHeight={200} className={classes.gridList} cols={3}>
          {campaigns?.map((campaign, index) => {
            return (
              <GridListTile cols={1} key={index}>
                <a href={'/ongoingcampaign/' + campaign.id}>
                  <ProfileCampaigns campaign={campaign} isBusiness={profileIsBusiness} />
                </a>
              </GridListTile>
            );
          })}
        </GridList>
      </div>
    </>
  );
};

export default Profile;
