import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Paper, FormControl, RadioGroup, Radio, FormLabel, FormControlLabel } from '@material-ui/core';
import styles from './index.module.css';
import { useStyles } from './styles';
const FindInfluencer = dynamic(() => import('../../components/newcampaign/FindInfluencer'), {
  loading: () => <p>Find Influencer Loading....</p>,
});
const CampaignObjective = dynamic(() => import('../../components/newcampaign/CampaignObjective'), {
  loading: () => <p>Select Campaign Objective Loading....</p>,
});
const CampaignDates = dynamic(() => import('../../components/newcampaign/CampaignDates'), {
  loading: () => <p>Set Campaign Dates Loading....</p>,
});
const SimplePostDuration = dynamic(() => import('../../components/newcampaign/SimplePostDuration'), {
  loading: () => <p>Post Duration Loading....</p>,
});
const CampaignStaking = dynamic(() => import('../../components/newcampaign/CampaignStaking'), {
  loading: () => <p>Campaign Staking Loading...</p>,
});

const NewCampaign = () => {
  const classes = useStyles();
  const [registrationStep, setRegistrationStep] = useState(4);
  const [influencer, setInfluencer] = useState('');
  const [objective, setObjective] = useState('');

  const findInfluencer = influencer => {
    try {
      //search for influencer from api or db
      setInfluencer(influencer);
    } catch (error) {
      console.log(error);
    }
  };

  const setCampaignSetupStep = registrationStep => setRegistrationStep(registrationStep);

  const renderSingleRegistrationComponent = () => {
    switch (registrationStep) {
      case 0:
        return (
          <Paper className={classes.NewCampaign_layout_find} elevation={3}>
            <FindInfluencer
              influencer={influencer}
              findInfluencer={findInfluencer}
              incrementCampaignSetup={setCampaignSetupStep}
            />
          </Paper>
        );
      case 1:
        return (
          <Paper className={classes.NewCampaign_layout_objective} elevation={3}>
            <CampaignObjective
              objective={objective => setObjective(objective)}
              setCampaignSetupStep={setCampaignSetupStep}
            />
          </Paper>
        );
      case 2:
        return (
          <Paper className={classes.NewCampaign_layout_dates} elevation={3}>
            <CampaignDates objective={objective} />
          </Paper>
        );
      case 3:
        return (
          <Paper className={classes.NewCampaign_layout_duration} elevation={3}>
            <SimplePostDuration objective={objective} />
          </Paper>
        );
      case 4:
        return (
          <Paper className={classes.NewCampaign_layout_dates} elevation={3}>
            <CampaignStaking objective={objective} />
          </Paper>
        );
    }
  };
  return <div className={classes.NewCampaign_box_positioning}>{renderSingleRegistrationComponent()}</div>;
};

export default NewCampaign;
