import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import consola from 'consola';
import { utils } from 'web3';
import { Paper } from '@material-ui/core';
import { onlyNumeric } from '../../utils/helpers';

import { createNewFundOnContract } from '../../web3';

import { useStyles } from './styles';

const RegisterBeneficiary = dynamic(() => import('../../components/newcampaign/Deal/FindInfluencer'), {
  loading: () => <p>Find Influencer Loading....</p>,
});
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
  const soulFundFactory = useSelector(state => state.soulFundFactory);
  const router = useRouter();

  const [registrationStep, setRegistrationStep] = useState(0);

  // Campaign Participants
  const [influencer, setInfluencer] = useState('');

  //Campaign Objective
  const [objective, setObjective] = useState('');

  const [beneficiary, setBeneficiary] = useState(null);
  const [vestingDate, setVestingDate] = useState(null);
  const [vestedFunds, setVestedFunds] = useState(null);

  //Campaign $$$$
  const [stakedAmount, setStakedAmount] = useState(0);

  const findInfluencer = async beneficiary => {
    try {
      //search for influencer from api or db
      setBeneficiary(beneficiary);
    } catch (error) {
      consola.error('NewFund.findInfluencer():', error);
    }
  };

  const createNewFund = async (meritReward, meritTarget) => {
    console.log(meritReward, 'merit reward');
    console.log(meritTarget, 'merit target');
    console.log(soulFundFactory, 'factory');
    // await createNewFundOnContract(soulFundFactory, beneficiary, vestingDate, vestingFunds);
    try {
      router.push(`/profile/${beneficiary}`);
    } catch (error) {
      consola.error('NewFund.createNewFundProposal():', error);
    }
  };

  const renderSingleRegistrationComponent = () => {
    switch (registrationStep) {
      case 0:
        return (
          <Paper className={classes.NewFund_layout_dates} elevation={3}>
            <RegisterBeneficiary
              foundInfluencer={influencer}
              parentFindInfluencer={findInfluencer}
              setParentCampaignSetupStep={registrationStep => setRegistrationStep(registrationStep)}
            />
          </Paper>
        );
      case 1:
        return (
          <Paper className={classes.NewFund_layout_dates} elevation={3}>
            <CampaignCalendar
              setParentVestingDate={simplePostDateEnd => setVestingDate(simplePostDateEnd)} //one date for simple post
              setParentCampaignSetupStep={registrationStep => setRegistrationStep(registrationStep)}
            />
          </Paper>
        );
      case 2:
        return (
          <Paper className={classes.NewFund_layout_staking} elevation={3}>
            <CampaignStaking
              objective={objective}
              setParentDepositToEscrow={deposit => setStakedAmount(onlyNumeric(deposit))}
              setParentCampaignSetupStep={registrationStep => setRegistrationStep(registrationStep)}
              isBounty={false}
            />
          </Paper>
        );
      case 3:
        return (
          <Paper className={classes.NewFund_layout_staking} elevation={3}>
            <CampaignReward
              objective={objective}
              maxWinners={1}
              stakedAmount={stakedAmount}
              setParentCampaignSetupStep={registrationStep => setRegistrationStep(registrationStep)}
              setParentFinishCampaign={(meritReward, meritTarget) => createNewFund(meritReward, meritTarget)}
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
