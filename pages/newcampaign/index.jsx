import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import consola from 'consola';
import { useSelector, useDispatch } from 'react-redux';
import { Paper } from '@material-ui/core';
import { storeFamepayFactoryThunk } from '../../redux/actions/famepayFactory';
import { createNewCampaignOnContract } from '../../web3';
import { onlyNumeric, setSimplePostMinimumDuration } from '../../utils/helpers';
import { useStyles } from './styles';

const FindInfluencer = dynamic(() => import('../../components/newcampaign/FindInfluencer'), {
  loading: () => <p>Find Influencer Loading....</p>,
});
const CampaignObjective = dynamic(() => import('../../components/newcampaign/CampaignObjective'), {
  loading: () => <p>Select Campaign Objective Loading....</p>,
});
const CampaignCalendar = dynamic(() => import('../../components/newcampaign/CampaignCalendar'), {
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
  const [objective, setObjective] = useState('');

  const [simplePostDate, setSimplePostDate] = useState(0); //postDate to create post
  const [simplePostMinimumDuration, setSimplePostMinimumDuration] = useState(0); //duration to keep post up (7hr post)
  const [campaignDuration, setCampaignDuration] = useState([]); //sept 1 - oct 1

  const [stakedAmount, setStakedAmount] = useState(0);
  const [jackpotTarget, setJackpotTarget] = useState(0);
  const [incrementalTarget, setIncrementalTarget] = useState(1);
  const [jackpotReward, setJackpotReward] = useState(0);
  const [incrementalReward, setIncrementalReward] = useState(0);

  useEffect(() => {
    dispatch(storeFamepayFactoryThunk());
    return () => {
      consola.success('NewCampaign page: cleanup');
    };
  }, []);

  const findInfluencer = async influencer => {
    try {
      //search for influencer from api or db
      setInfluencer(influencer);
    } catch (error) {
      consola.error('NewCampaign.findInfluencer():', error);
    }
  };
  const createNewCampaign = async () => {
    console.log(simplePostMinimumDuration, 'the duration in newCampaign');
    try {
      await createNewCampaignOnContract(
        famepayFactory,
        account.address, //business
        influencer,
        campaignDuration[0] ? campaignDuration[0] : Date.now(), //startDate
        campaignDuration[1] ? campaignDuration[1] : simplePostDate + simplePostMinimumDuration, //postDate
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
            <CampaignCalendar
              objective={objective}
              setParentSimplePostDate={simplePostDate => setSimplePostDate(simplePostDate)} //one date for simple post
              setParentCampaignDuration={campaignDuration => setCampaignDuration(campaignDuration)}
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
              setParentSimplePostMinimumDuration={duration => setSimplePostMinimumDuration(duration)}
              setParentCampaignSetupStep={registrationStep => setRegistrationStep(registrationStep)}
            />
          </Paper>
        );
      case 4:
        return (
          <Paper className={classes.NewCampaign_layout_staking} elevation={3}>
            <CampaignStaking
              objective={objective}
              setParentDepositToEscrow={deposit => setStakedAmount(onlyNumeric(deposit))}
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
              setParentJackpotReward={jackpotReward => setJackpotReward(onlyNumeric(jackpotReward))}
              setParentIncrementalReward={incrementalReward => setIncrementalReward(onlyNumeric(incrementalReward))}
              setParentJackpotTarget={jackpotTarget => setJackpotTarget(onlyNumeric(jackpotTarget))}
              setParentIncrementalTarget={incrementalTarget => setIncrementalTarget(onlyNumeric(incrementalTarget))}
              setParentCampaignSetupStep={registrationStep => setRegistrationStep(registrationStep)}
              parentJackpotReward={jackpotReward}
              parentIncrementalReward={incrementalReward}
              parentJackpotTarget={jackpotTarget}
              parentIncrementalTarget={incrementalTarget}
              setParentFinishCampaign={createNewCampaign}
            ></CampaignReward>
          </Paper>
        );
    }
  };
  return <div className={classes.NewCampaign_box_positioning}>{renderSingleRegistrationComponent()}</div>;
};

export default NewCampaign;
