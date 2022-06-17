import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Error from 'next/error';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { Button, GridList, GridListTile } from '@material-ui/core';
import {
  GET_ALL_CAMPAIGNS_FOR_BUSINESS_QUERY,
  GET_ALL_CAMPAIGNS_FOR_INFLUENCER_QUERY,
  GET_ALL_BOUNTIES_FOR_INFLUENCER,
  GET_ALL_BOUNTIES_FOR_BUSINESS,
} from '../../apollo/user.gql';
import { getUserFromUsernameDb } from '../../services/api/userService';
import { APOLLO_POLL_INTERVAL_MS } from '../../constants/Blockchain';
import useEthAddress from '../../hooks/useUsername';
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

  const mountedRef = useRef(true);

  const [user, setUser] = useState({});
  const [profileIsBusiness, setProfileIsBusiness] = useState(false);
  const [isBounty, setIsBounty] = useState(true);

  const classes = useStyles();

  let deals;
  let bounties;

  useEffect(() => {
    async function getUsernameEthAddress() {
      if (!router.isReady) return;
      const userDbRes = await getUserFromUsernameDb(id);
      if (userDbRes?.data?.payload?.userEthAddress === undefined) {
        return <Error statusCode={404} />;
      } else {
        setUser(userDbRes?.data?.payload);
        if (userDbRes?.data?.payload?.type === 'BUSINESS') setProfileIsBusiness(true);
      }
    }
    getUsernameEthAddress();
    return () => (mountedRef.current = false);
  }, [router.isReady]);

  //DEAL QUERIES

  const {
    error: errorInfluencer,
    data: dataInfluencer,
    refetch: refetchInfluencer,
  } = useQuery(GET_ALL_CAMPAIGNS_FOR_INFLUENCER_QUERY, {
    variables: { id: user?.userEthAddress },
  });
  // if (errorInfluencer) refetchInfluencer();
  // if (errorInfluencer) console.log('error2!!!');

  const {
    error: errorBusiness,
    data: dataBusiness,
    refetch: refetchBusiness,
  } = useQuery(GET_ALL_CAMPAIGNS_FOR_BUSINESS_QUERY, {
    variables: { id: user?.userEthAddress },
  });

  if (dataInfluencer?.campaigns?.length != 0) deals = dataInfluencer?.campaigns;
  if (dataBusiness?.campaigns?.length != 0) deals = dataBusiness?.campaigns;

  //BOUNTY QUERIES

  const {
    error: errorBountyInfluencer,
    data: dataBountyInfluencer,
    refetch: refetchBountyInfluencer,
  } = useQuery(GET_ALL_BOUNTIES_FOR_INFLUENCER, {
    variables: { id: user?.userEthAddress },
  });

  const {
    error: errorBountyBusiness,
    data: dataBountyBusiness,
    refetch: refetchBountyBusiness,
  } = useQuery(GET_ALL_BOUNTIES_FOR_BUSINESS, {
    variables: { id: user?.userEthAddress },
  });

  if (dataBountyInfluencer?.bounties?.length != 0) bounties = dataBountyInfluencer?.bounties;
  if (dataBountyBusiness?.bounties?.length != 0) bounties = dataBountyBusiness?.bounties;

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
      <Button color="primary" variant="contained" onClick={() => setIsBounty(true)}>
        Bounties
      </Button>
      &nbsp;
      <Button color="primary" variant="contained" onClick={() => setIsBounty(false)}>
        Deals
      </Button>
      <br />
      <br />
      {!isBounty ? (
        <div className={classes.Profile_content_container}>
          {deals?.length == 0 ? (
            <h1>No deals</h1>
          ) : (
            <GridList cellHeight={100} className={classes.Profile_gridList} cols={3}>
              {deals?.map((campaign, index) => {
                return (
                  <GridListTile cols={1} key={index} component={Link} href={`/ongoingcampaign/${campaign?.id}`}>
                    <ProfileCampaigns
                      campaign={campaign}
                      influencerData={user?.username}
                      isBusiness={profileIsBusiness}
                    />
                  </GridListTile>
                );
              })}
            </GridList>
          )}
        </div>
      ) : (
        <div className={classes.Profile_content_container}>
          {bounties?.length == 0 ? (
            <h1>No bounties</h1>
          ) : (
            <GridList cellHeight={100} className={classes.Profile_gridList} cols={3}>
              {bounties?.map((bounty, index) => {
                return (
                  <GridListTile cols={1} key={index} component={Link} href={`/ongoingbounty/${bounty?.id}`}>
                    <ProfileCampaigns
                      campaign={bounty}
                      influencerData={bounty?.influencers?.length}
                      isBusiness={profileIsBusiness}
                    />
                  </GridListTile>
                );
              })}
            </GridList>
          )}
        </div>
      )}
    </>
  );
};

export default Profile;
