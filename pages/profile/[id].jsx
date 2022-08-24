import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Error from 'next/error';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { Button, GridList, GridListTile } from '@material-ui/core';
import { GET_ALL_CAMPAIGNS_FOR_GRANTOR_QUERY, GET_ALL_CAMPAIGNS_FOR_BENEFICIARY_QUERY } from '../../apollo/user.gql';
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

  const mountedRef = useRef(true);

  const [user, setUser] = useState({});
  const [profileIsGrantor, setProfileIsGrantor] = useState(false);

  const classes = useStyles();

  let funds;

  let threeFunds = [
    { fundName: 'Smith Family Fund', depositedAmount: '30 Eth', vestingDate: 'Feb 2030', fundId: 1 },
    { fundName: 'Apple RSU', depositedAmount: '15 Eth', vestingDate: 'Jan 2028', fundId: 2 },
    { fundName: 'TO Startup Grant', depositedAmount: '5 Eth', vestingDate: 'Sept 2025', fundId: 3 },
  ];

  useEffect(() => {
    async function getUsernameEthAddress() {
      if (!router.isReady) return;
      setUser(id);
    }
    getUsernameEthAddress();
    return () => (mountedRef.current = false);
  }, [router.isReady]);

  //FUND QUERIES

  const {
    error: errorBeneficiary,
    data: dataBeneficiary,
    refetch: refetchBeneficiary,
  } = useQuery(GET_ALL_CAMPAIGNS_FOR_BENEFICIARY_QUERY, {
    variables: { id: user?.userEthAddress },
  });

  const {
    error: errorGrantor,
    data: dataGrantor,
    refetch: refetchGrantor,
  } = useQuery(GET_ALL_CAMPAIGNS_FOR_GRANTOR_QUERY, {
    variables: { id: user?.userEthAddress },
  });

  if (dataBeneficiary?.campaigns?.length != 0) funds = dataBeneficiary?.campaigns;
  if (dataGrantor?.campaigns?.length != 0) funds = dataGrantor?.campaigns;

  return (
    <>
      <div className={classes.Profile_header_container}>
        <Image className={classes.Profile_cover_photo} src="/Toronto.jpg" width="1000" height="235" />
        <br />
        <br />
        <div className={classes.Profie_cover_flex}>
          <Image className={classes.Profile_round_img} src="/avatar.png" alt="Change Me" width="195" height="195" />
          <ProfileHeader user={user} />
        </div>
      </div>

      <div className={classes.Profile_content_container}>
        {funds?.length == 0 ? (
          <h1>No Funds</h1>
        ) : (
          <GridList cellHeight={100} className={classes.Profile_gridList} cols={3}>
            {threeFunds?.map((fund, index) => {
              return (
                <GridListTile cols={1} key={index} component={Link} href={`/ongoingfund/${fund?.fundId}`}>
                  <ProfileCampaigns fund={fund} influencerData={user?.username} isGrantor={profileIsGrantor} />
                </GridListTile>
              );
            })}
          </GridList>
        )}
      </div>
    </>
  );
};

export default Profile;
