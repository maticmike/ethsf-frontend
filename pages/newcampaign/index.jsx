import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Paper } from '@material-ui/core';
import styles from './index.module.css';
const FindInfluencer = dynamic(() => import('../../components/newcampaign/FindInfluencer'), {
  loading: () => <p>Find Influencer Loading....</p>,
});
const CampaignObjective = dynamic(() => import('../../components/newcampaign/CampaignObjective'), {
  loading: () => <p>Select Campaign Objective Loading....</p>,
});

// import CampaignType from
const NewCampaign = () => {
  const [influencer, setInfluencer] = useState('');
  const [registrationStep, setRegistrationStep] = useState(0);

  const findInfluencer = influencer => {
    try {
      //search for influencer from api or db
      setInfluencer(influencer);
    } catch (error) {
      console.log(error);
    }
  };

  const incrementCampaignSetup = registrationStep => setRegistrationStep(registrationStep);

  const renderSingleRegistrationComponent = () => {
    switch (registrationStep) {
      case 0:
        return (
          <FindInfluencer
            influencer={influencer}
            findInfluencer={findInfluencer}
            incrementCampaignSetup={incrementCampaignSetup}
          />
        );
      case 1:
        return <CampaignObjective />;
    }
  };

  return <div className={styles.NewCampaign_box_positioning}>{renderSingleRegistrationComponent()}</div>;
};

export default NewCampaign;
