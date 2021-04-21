import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Paper } from '@material-ui/core';
import { useStyles } from './stylesNewCampaign';
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
const CampaignReward = dynamic(() => import('../../components/newcampaign/CampaignReward'), {
  loading: () => <p>Campaign Payment Loading...</p>,
});

const NewCampaign = () => {
  const classes = useStyles();
  const [registrationStep, setRegistrationStep] = useState(0);
  const [influencer, setInfluencer] = useState('');
  const [objective, setObjective] = useState(''); //views
  const [date, setDate] = useState(null);
  const [objectiveAmount, setObjectiveAmount] = useState(null); //5000 views
  const [simplePostDuration, setSimplePostDuration] = useState(null);
  const [stakedMoney, setStakedMoney] = useState(null);
  const findInfluencer = influencer => {
    try {
      //search for influencer from api or db
      setInfluencer(influencer);
    } catch (error) {
      console.log(error);
    }
  };

  const campaignSetupStep = registrationStep => setRegistrationStep(registrationStep);
  const campaignSimpleDate = date => setDate(date);
  const depositToEscrow = deposit => setStakedMoney(deposit);

  const renderSingleRegistrationComponent = () => {
    switch (registrationStep) {
      case 0:
        return (
          <Paper className={classes.NewCampaign_layout_find} elevation={3}>
            <FindInfluencer
              influencer={influencer}
              findInfluencer={findInfluencer}
              incrementCampaignSetup={campaignSetupStep}
            />
          </Paper>
        );
      case 1:
        return (
          <Paper className={classes.NewCampaign_layout_objective} elevation={3}>
            <CampaignObjective
              objective={objective => setObjective(objective)}
              setCampaignSetupStep={campaignSetupStep}
            />
          </Paper>
        );
      case 2:
        return (
          <Paper className={classes.NewCampaign_layout_dates} elevation={3}>
            <CampaignDates
              objective={objective}
              setRootSimpleDate={campaignSimpleDate}
              setCampaignSetupStep={campaignSetupStep}
            />
          </Paper>
        );
      //Duration of post on page only for simple posts
      case 3:
        return (
          <Paper className={classes.NewCampaign_layout_duration} elevation={3}>
            <SimplePostDuration
              objective={objective}
              setPostDuration={duration => setSimplePostDuration(duration)}
              setCampaignSetupStep={campaignSetupStep}
            />
          </Paper>
        );
      case 4:
        return (
          <Paper className={classes.NewCampaign_layout_staking} elevation={3}>
            <CampaignStaking
              objective={objective}
              setCampaignSetupStep={campaignSetupStep}
              depositToEscrow={depositToEscrow}
            />
          </Paper>
        );
      case 5:
        return (
          <Paper className={classes.NewCampaign_layout_staking} elevation={3}>
            <CampaignReward
              objective="views"
              objectiveAmount={objectiveAmount}
              setCampaignSetupStep={campaignSetupStep}
            ></CampaignReward>
          </Paper>
        );
    }
  };
  return <div className={classes.NewCampaign_box_positioning}>{renderSingleRegistrationComponent()}</div>;
};

export default NewCampaign;
