import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import consola from 'consola';
import { utils } from 'web3';
import { Paper } from '@material-ui/core';
import { onlyNumeric } from '../../utils/helpers';

import { useStyles } from './styles';

const CampaignCalendar = dynamic(() => import('../../components/newcampaign/CampaignCalendar'), {
  loading: () => <p>Set Campaign Dates Loading....</p>,
});
const CampaignStaking = dynamic(() => import('../../components/newcampaign/CampaignStaking'), {
  loading: () => <p>Campaign Staking Loading...</p>,
});
const CampaignReward = dynamic(() => import('../../components/newcampaign/CampaignReward'), {
  loading: () => <p>Campaign Payment Loading...</p>,
});

const NewFund = () => {
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
      consola.error('NewFund.findInfluencer():', error);
    }
  };

  const createNewFundProposal = async (jackpotReward, incrementalReward, jackpotTarget, incrementalTarget) => {
    jackpotRewardAmount = stakedAmount;

    try {
      router.push(`/reviewfund/${campaignDb.data.payload.data._id}`);
    } catch (error) {
      consola.error('NewFund.createNewFundProposal():', error);
    }
  };

  const renderSingleRegistrationComponent = () => {
    switch (registrationStep) {
      case 0:
        return (
          <Paper className={classes.NewFund_layout_dates} elevation={3}>
            <CampaignCalendar
              objective={objective}
              setParentSimplePostDateStart={simplePostDateStart => setSimplePostDateStart(simplePostDateStart)} //one date for simple post
              setParentSimplePostDateEnd={simplePostDateEnd => setSimplePostDateEnd(simplePostDateEnd)} //one date for simple post
              setParentCampaignDuration={campaignDuration => setCampaignDuration(campaignDuration)}
              setParentCampaignSetupStep={registrationStep => setRegistrationStep(registrationStep)}
            />
          </Paper>
        );
      case 1:
        return (
          <Paper className={classes.NewFund_layout_staking} elevation={3}>
            <CampaignStaking
              objective={objective}
              setParentDepositToEscrow={deposit => setStakedAmount(onlyNumeric(deposit))}
              setParentCampaignSetupStep={registrationStep => setRegistrationStep(registrationStep)}
              setParentFinishCampaign={(jackpotReward, incrementalReward, jackpotTarget, incrementalTarget) =>
                createNewFundProposal(jackpotReward, incrementalReward, jackpotTarget, incrementalTarget)
              }
              isBounty={false}
            />
          </Paper>
        );
      case 2:
        return (
          <Paper className={classes.NewFund_layout_staking} elevation={3}>
            <CampaignReward
              objective={objective}
              maxWinners={1}
              stakedAmount={stakedAmount}
              setParentCampaignSetupStep={registrationStep => setRegistrationStep(registrationStep)}
              setParentFinishCampaign={(meritReward, meritTarget) => createNewFundProposal(meritReward, meritTarget)}
              isBounty={false}
              bountyType={null}
            ></CampaignReward>
          </Paper>
        );
    }
  };
  return <div className={classes.NewFund_box_positioning}>{renderSingleRegistrationComponent()}</div>;
};

export default NewFund;
