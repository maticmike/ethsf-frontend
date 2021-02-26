import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Paper, OutlinedInput, Grid, Button } from '@material-ui/core';
import CheckCircle from '@material-ui/icons/Done';
import Image from 'next/image';
import styles from './index.module.css';
// import FindInfluencer from '@/components/newcampaign/FindInfluencer';
const FindInfluencer = dynamic(() => import('../../components/newcampaign/FindInfluencer'), {
  loading: () => <p>Find Influencer Loading....</p>,
});

// import CampaignType from
const NewCampaign = () => {
  const [influencer, setInfluencer] = useState('');

  const findInfluencer = influencer => setInfluencer(influencer);

  useEffect(() => {
    console.log(influencer, 'was hit');
  }, [influencer]);
  return (
    <div className={styles.NewCampaign_box_positioning}>
      <Paper className={styles.NewCampaign_layout} elevation={3}>
        <FindInfluencer influencer={influencer} findInfluencer={findInfluencer} />
      </Paper>
    </div>
  );
};

export default NewCampaign;
