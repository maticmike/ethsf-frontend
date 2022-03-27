import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import consola from 'consola';
import { utils } from 'web3';
import { Paper } from '@material-ui/core';
import { onlyNumeric } from '../../utils/helpers';
import { SIMPLE_POST } from '../../constants/CampaignObjectives';
import { createNewDealProposalDb } from '../../services/api/campaignService';
import { useStyles } from './styles';

const FindInfluencer = dynamic(() => import('../../components/newcampaign/Deal/FindInfluencer'), {
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

const NewDeal = () => {
  const classes = useStyles();

  const account = useSelector(state => state.account);
  const router = useRouter();

  const [registrationStep, setRegistrationStep] = useState(0);

  // Campaign Participants
  const [influencer, setInfluencer] = useState('');

  //Campaign Objective
  const [objective, setObjective] = useState('');

  //Campaign Dates
  const [simplePostDateStart, setSimplePostDateStart] = useState(0); //postDate to create post
  const [simplePostDateEnd, setSimplePostDateEnd] = useState(0); //postDate to create post
  const [simplePostMinimumDuration, setSimplePostMinimumDuration] = useState(0); //duration to keep post up (7hr post)
  const [campaignDuration, setCampaignDuration] = useState([]); //sept 1 - oct 1

  //Campaign $$$$
  const [stakedAmount, setStakedAmount] = useState(0);

  let jackpotRewardAmount;

  const findInfluencer = async influencer => {
    try {
      //search for influencer from api or db
      setInfluencer(influencer);
    } catch (error) {
      consola.error('NewDeal.findInfluencer():', error);
    }
  };

  const createNewDealProposal = async (jackpotReward, incrementalReward, jackpotTarget, incrementalTarget) => {
    objective === SIMPLE_POST ? (jackpotRewardAmount = stakedAmount) : (jackpotRewardAmount = jackpotReward);
    try {
      const campaignDb = await createNewDealProposalDb(
        account.address, //business
        influencer.toLowerCase(),
        campaignDuration[0] ? campaignDuration[0] : simplePostDateStart, //agreedStartDate
        campaignDuration[1] ? campaignDuration[1] : simplePostDateEnd, //agreedDeadline/postDate
        simplePostMinimumDuration,
        jackpotRewardAmount,
        incrementalReward,
        jackpotTarget,
        incrementalTarget,
        stakedAmount, //potentialPayout
        objective,
        // 'niche',
      );

      router.push(`/reviewcampaign/${campaignDb.data.payload.data._id}`);
    } catch (error) {
      consola.error('NewDeal.createNewDealProposal():', error);
    }
  };

  const renderSingleRegistrationComponent = () => {
    switch (registrationStep) {
      case 0:
        return (
          <Paper className={classes.NewDeal_layout_find} elevation={3}>
            <FindInfluencer
              foundInfluencer={influencer}
              parentFindInfluencer={findInfluencer}
              setParentCampaignSetupStep={registrationStep => setRegistrationStep(registrationStep)}
            />
          </Paper>
        );
      case 1:
        return (
          <Paper className={classes.NewDeal_layout_objective} elevation={3}>
            <CampaignObjective
              setParentObjective={objective => setObjective(objective)}
              setParentCampaignSetupStep={registrationStep => setRegistrationStep(registrationStep)}
            />
          </Paper>
        );
      case 2:
        return (
          <Paper className={classes.NewDeal_layout_dates} elevation={3}>
            <CampaignCalendar
              objective={objective}
              setParentSimplePostDateStart={simplePostDateStart => setSimplePostDateStart(simplePostDateStart)} //one date for simple post
              setParentSimplePostDateEnd={simplePostDateEnd => setSimplePostDateEnd(simplePostDateEnd)} //one date for simple post
              setParentCampaignDuration={campaignDuration => setCampaignDuration(campaignDuration)}
              setParentCampaignSetupStep={registrationStep => setRegistrationStep(registrationStep)}
            />
          </Paper>
        );
      //Duration of post on page only for simple posts
      case 3:
        return (
          <Paper className={classes.NewDeal_layout_duration} elevation={3}>
            <SimplePostDuration
              objective={objective}
              setParentSimplePostMinimumDuration={duration => setSimplePostMinimumDuration(duration)}
              setParentCampaignSetupStep={registrationStep => setRegistrationStep(registrationStep)}
            />
          </Paper>
        );
      case 4:
        return (
          <Paper className={classes.NewDeal_layout_staking} elevation={3}>
            <CampaignStaking
              objective={objective}
              setParentDepositToEscrow={deposit => setStakedAmount(onlyNumeric(deposit))}
              setParentCampaignSetupStep={registrationStep => setRegistrationStep(registrationStep)}
              setParentFinishCampaign={(jackpotReward, incrementalReward, jackpotTarget, incrementalTarget) =>
                createNewDealProposal(jackpotReward, incrementalReward, jackpotTarget, incrementalTarget)
              }
              isBounty={false}
            />
          </Paper>
        );
      case 5:
        return (
          <Paper className={classes.NewDeal_layout_staking} elevation={3}>
            <CampaignReward
              objective={objective}
              maxWinners={1}
              stakedAmount={stakedAmount}
              setParentCampaignSetupStep={registrationStep => setRegistrationStep(registrationStep)}
              setParentFinishCampaign={(jackpotReward, incrementalReward, jackpotTarget, incrementalTarget) =>
                createNewDealProposal(jackpotReward, incrementalReward, jackpotTarget, incrementalTarget)
              }
              isBounty={false}
              bountyType={null}
            ></CampaignReward>
          </Paper>
        );
    }
  };
  return <div className={classes.NewDeal_box_positioning}>{renderSingleRegistrationComponent()}</div>;
};

export default NewDeal;
