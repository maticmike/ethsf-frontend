import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Paper } from '@material-ui/core';
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
const CampaignReward = dynamic(() => import('../../components/newcampaign/CampaignReward'), {
  loading: () => <p>Campaign Payment Loading...</p>,
});

const NewCampaign = () => {
  const classes = useStyles();
  const [registrationStep, setRegistrationStep] = useState(0);

  const [influencer, setInfluencer] = useState('');
  const [objective, setObjective] = useState(''); //views
  const [date, setDate] = useState(null);
  const [simplePostDuration, setSimplePostDuration] = useState(null);
  const [objectiveAmount, setObjectiveAmount] = useState(null); //5000 views
  const [stakedAmount, setStakedAmount] = useState(null);
  const [jackpotRewardAmount, setJackpotRewardAmount] = useState(0);
  const [incrementalRewardAmount, setIncrementalRewardAmount] = useState(null);

  const findInfluencer = async influencer => {
    try {
      //search for influencer from api or db
      setInfluencer(influencer);
    } catch (error) {
      console.log(error);
    }
  };

  const renderSingleRegistrationComponent = () => {
    switch (registrationStep) {
      case 0:
        return (
          <Paper className={classes.NewCampaign_layout_find} elevation={3}>
            <FindInfluencer
              foundInfluencer={influencer}
              parentFindInfluencer={findInfluencer}
              setParentCampaignSetupStep={registrationStep => setRegistrationStep(registrationStep)}
            />
          </Paper>
        );
      case 1:
        return (
          <Paper className={classes.NewCampaign_layout_objective} elevation={3}>
            <CampaignObjective
              objective={objective => setObjective(objective)}
              setParentCampaignSetupStep={registrationStep => setRegistrationStep(registrationStep)}
            />
          </Paper>
        );
      case 2:
        return (
          <Paper className={classes.NewCampaign_layout_dates} elevation={3}>
            <CampaignDates
              objective={objective}
              setParentSimpleDate={date => setDate(date)} //one date for simple post
              setParentCampaignSetupStep={registrationStep => setRegistrationStep(registrationStep)}
            />
          </Paper>
        );
      //Duration of post on page only for simple posts
      case 3:
        return (
          <Paper className={classes.NewCampaign_layout_duration} elevation={3}>
            <SimplePostDuration
              objective={objective}
              setParentPostDuration={duration => setSimplePostDuration(duration)} //range for campaign
              setParentCampaignSetupStep={registrationStep => setRegistrationStep(registrationStep)}
            />
          </Paper>
        );
      case 4:
        return (
          <Paper className={classes.NewCampaign_layout_staking} elevation={3}>
            <CampaignStaking
              objective={objective}
              setParentDepositToEscrow={deposit => setStakedAmount(deposit)}
              setParentCampaignSetupStep={registrationStep => setRegistrationStep(registrationStep)}
            />
          </Paper>
        );
      case 5:
        return (
          <Paper className={classes.NewCampaign_layout_staking} elevation={3}>
            <CampaignReward
              objective={objective}
              stakedAmount={stakedAmount}
              setParentJackpotReward={jackpotReward => setJackpotRewardAmount(jackpotReward)}
              setParentIncrementalReward={incrementalReward => setIncrementalRewardAmount(incrementalReward)}
              setParentCampaignSetupStep={registrationStep => setRegistrationStep(registrationStep)}
            ></CampaignReward>
          </Paper>
        );
    }
  };
  return <div className={classes.NewCampaign_box_positioning}>{renderSingleRegistrationComponent()}</div>;
};

export default NewCampaign;
