import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import consola from 'consola';
import { useSelector, useDispatch } from 'react-redux';
import { utils } from 'web3';
import { Paper } from '@material-ui/core';
import { onlyNumeric } from '../../utils/helpers';
import { SIMPLE_POST } from '../../constants/CampaignObjectives';
import { createNewBountyOnContract } from '../../web3';
import { useStyles } from './styles';

const BountyType = dynamic(() => import('../../components/newcampaign/Bounty/BountyType'), {
  loading: () => <p>Bounty Type Loading....</p>,
});
const CampaignCalendar = dynamic(() => import('../../components/newcampaign/CampaignCalendar'), {
  loading: () => <p>Set Bounty Dates Loading....</p>,
});
const SimplePostDuration = dynamic(() => import('../../components/newcampaign/SimplePostDuration'), {
  loading: () => <p>Post Duration Loading....</p>,
});
const CampaignObjective = dynamic(() => import('../../components/newcampaign/CampaignObjective'), {
  loading: () => <p>Select Bounty Objective Loading....</p>,
});
const BountyParticipants = dynamic(() => import('../../components/newcampaign/Bounty/BountyParticipants'), {
  loading: () => <p>Bounty Participants Loading....</p>,
});
const CampaignStaking = dynamic(() => import('../../components/newcampaign/CampaignStaking'), {
  loading: () => <p>Campaign Staking Loading.....</p>,
});
const CampaignReward = dynamic(() => import('../../components/newcampaign/CampaignReward'), {
  loading: () => <p>Campaign Reward Loading....</p>,
});

const NewBounty = () => {
  const classes = useStyles();

  const account = useSelector(state => state.account);
  const famepayFactory = useSelector(state => state.famepayFactory);
  const router = useRouter();

  const [registrationStep, setRegistrationStep] = useState(0);

  //Bounty Objecitve
  const [objective, setObjective] = useState('');

  //Bounty Participants & Winners
  const [bountyParticipants, setBountyParticipants] = useState(null);
  const [bountyMaxWinners, setBountyMaxWinners] = useState(null);

  //Bounty Type
  const [bountyType, setBountyType] = useState('');

  //Bounty Dates
  const [simplePostDateStart, setSimplePostDateStart] = useState(0); //postDate to create post
  const [simplePostDateEnd, setSimplePostDateEnd] = useState(0); //postDate to create post
  const [simplePostMinimumDuration, setSimplePostMinimumDuration] = useState(0); //duration to keep post up (7hr post)
  const [campaignDuration, setCampaignDuration] = useState([]); //sept 1 - oct 1

  //Bounty $$$
  const [stakedAmount, setStakedAmount] = useState(0);
  const [jackpotReward, setJackpotReward] = useState(null);
  const [jackpotTarget, setJackpotTarget] = useState(null);

  // let jackpotRewardAmount;

  const createNewBounty = async () => {
    // setJackpotReward(stakedAmount); //REVIEW ME LATER<<<
    // objective === SIMPLE_POST ? (jackpotRewardAmount = stakedAmount) : (jackpotRewardAmount = jackpotReward);
    try {
      //CALL CONTRACT
      await createNewBountyOnContract(
        famepayFactory,
        account,
        campaignDuration[0] ? campaignDuration[0] : simplePostDateStart, //agreedStartDate
        campaignDuration[1] ? campaignDuration[1] : simplePostDateEnd, //agreedDeadline/postDate,
        simplePostMinimumDuration,
        jackpotReward,
        jackpotTarget,
        bountyMaxWinners,
        objective,
        bountyType,
        stakedAmount,
      );
      // router.push(`/reviewcampaign/${campaignDb.data.payload.data._id}`);
    } catch (error) {
      consola.error('NewBounty.createNewBounty():', error);
    }
  };

  const renderSingleRegistrationComponent = () => {
    switch (registrationStep) {
      case 0:
        return (
          <Paper className={classes.NewBounty_layout_find}>
            <BountyType
              setParentBountyType={bountyType => setBountyType(bountyType)}
              setParentCampaignSetupStep={registrationStep => setRegistrationStep(registrationStep)}
            />
          </Paper>
        );
      case 1:
        return (
          <Paper className={classes.NewBounty_layout_objective} elevation={3}>
            <CampaignObjective
              setParentObjective={objective => setObjective(objective)}
              setParentCampaignSetupStep={registrationStep => setRegistrationStep(registrationStep)}
            />
          </Paper>
        );
      case 2:
        return (
          <Paper className={classes.NewBounty_layout_dates} elevation={3}>
            <CampaignCalendar
              objective={objective}
              setParentSimplePostDateStart={simplePostDateStart => setSimplePostDateStart(simplePostDateStart)} //one date for simple post
              setParentSimplePostDateEnd={simplePostDateEnd => setSimplePostDateEnd(simplePostDateEnd)} //one date for simple post
              setParentCampaignDuration={campaignDuration => setCampaignDuration(campaignDuration)}
              setParentCampaignSetupStep={registrationStep => setRegistrationStep(registrationStep)}
            />
          </Paper>
        );
      case 3:
        return (
          <Paper className={classes.NewBounty_layout_duration} elevation={3}>
            <SimplePostDuration
              objective={objective}
              setParentSimplePostMinimumDuration={duration => setSimplePostMinimumDuration(duration)}
              setParentCampaignSetupStep={registrationStep => setRegistrationStep(registrationStep)}
            />
          </Paper>
        );
      // //max participants & max reward
      case 4:
        return (
          <Paper className={classes.NewBounty_layout_objective} elevation={3}>
            <BountyParticipants
              objective={objective}
              setParentMaxParticipants={bountyParticipants => setBountyParticipants(bountyParticipants)}
              setParentMaxWinners={maxWiners => setBountyMaxWinners(maxWiners)}
              setParentCampaignSetupStep={registrationStep => setRegistrationStep(registrationStep)}
            />
          </Paper>
        );
      // //Staking: Reuse from campaign
      case 5:
        return (
          <Paper className={classes.NewBounty_layout_objective} elevation={3}>
            <CampaignStaking
              objective={objective}
              setParentDepositToEscrow={deposit => setStakedAmount(onlyNumeric(deposit))}
              setParentCampaignSetupStep={registrationStep => setRegistrationStep(registrationStep)}
              setParentFinishCampaign={createNewBounty} //finish on simple
              isBounty={true}
            />
          </Paper>
        );
      //objective amount & calculate payout -> create new
      case 6:
        return (
          <Paper className={classes.NewBounty_layout_staking} elevation={3}>
            <CampaignReward
              objective={objective}
              maxWinners={bountyMaxWinners}
              stakedAmount={utils.fromWei(stakedAmount.toString())}
              setParentJackpotReward={jackpotReward => setJackpotReward(jackpotReward)}
              setParentIncrementalReward={() => {}}
              setParentJackpotTarget={jackpotTarget => setJackpotTarget(onlyNumeric(jackpotTarget))}
              setParentIncrementalTarget={() => {}}
              setParentCampaignSetupStep={registrationStep => setRegistrationStep(registrationStep)}
              setParentFinishCampaign={createNewBounty}
              isBounty={true}
              bountyType={bountyType}
            ></CampaignReward>
          </Paper>
        );
    }
  };
  return <div className={classes.NewBounty_box_positioning}>{renderSingleRegistrationComponent()}</div>;
};

export default NewBounty;
