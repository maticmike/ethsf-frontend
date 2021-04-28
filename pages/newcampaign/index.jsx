import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import consola from 'consola';
import { useSelector, useDispatch } from 'react-redux';
import { Paper } from '@material-ui/core';
import { storeFamepayFactoryThunk } from '../../redux/actions/famepayFactory';
import { createNewCampaignOnContract } from '../../web3';
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

  const dispatch = useDispatch();
  const account = useSelector(state => state.account);

  const famepayFactory = useSelector(state => state.famepayFactory);

  const [registrationStep, setRegistrationStep] = useState(0);

  const [influencer, setInfluencer] = useState('');
  const [objective, setObjective] = useState(''); //views
  const [simpleDate, setSimpleDate] = useState(null);
  const [campaignPostDuration, setCampaignPostDuration] = useState(null);
  const [stakedAmount, setStakedAmount] = useState(null);
  const [jackpotTarget, setJackpotTarget] = useState(0);
  const [incrementalTarget, setIncrementalTarget] = useState(0);
  const [jackpotReward, setJackpotReward] = useState(0);
  const [incrementalReward, setIncrementalReward] = useState(null);

  const findInfluencer = async influencer => {
    try {
      //search for influencer from api or db
      setInfluencer(influencer);
    } catch (error) {
      consola.error('NewCampaign.findInfluencer():', error);
    }
  };

  const setAccount = () => {
    dispatch(storeFamepayFactoryThunk());
  };
  const factory = useSelector(state => state.factory);
  const checkAccount = () => {
    console.log(factory, 'the logged account in useEffect');
  };

  const createNewCampaign = async () => {
    try {
      //for simple post
      createNewCampaignOnContract(
        famepayFactory,
        account.address, //business
        influencer,
        123, //campaignId
        simpleDate, //startDate campaignPostDuration, //date,
        jackpotReward,
        incrementalReward,
        jackpotTarget,
        incrementalTarget,
        stakedAmount,
        objective,
      );
    } catch (error) {
      consola.error('NewCampaign.createCampaign():', error);
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
              setParentSimpleDate={date => setSimpleDate(date)} //one date for simple post
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
              setParentPostDuration={duration => setCampaignPostDuration(duration)} //range for campaign
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
              setParentFinishCampaign={createNewCampaign}
            />
          </Paper>
        );
      case 5:
        return (
          <Paper className={classes.NewCampaign_layout_staking} elevation={3}>
            <CampaignReward
              objective={objective}
              stakedAmount={stakedAmount}
              setParentJackpotReward={jackpotReward => setJackpotReward(jackpotReward)}
              setParentIncrementalReward={incrementalReward => setIncrementalReward(incrementalReward)}
              setParentJackpotTarget={jackpotTarget => setJackpotTarget(jackpotTarget)}
              setParentIncrementalTarget={incrementalTarget => setIncrementalTarget(incrementalTarget)}
              setParentCampaignSetupStep={registrationStep => setRegistrationStep(registrationStep)}
              setParentFinishCampaign={createNewCampaign}
            ></CampaignReward>
          </Paper>
        );
    }
  };
  return (
    <div className={classes.NewCampaign_box_positioning}>
      {renderSingleRegistrationComponent()} <button onClick={checkAccount}>Get Account</button>
      <button onClick={setAccount}>set account</button>
    </div>
  );
};

export default NewCampaign;
