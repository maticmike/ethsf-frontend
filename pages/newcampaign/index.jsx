import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import consola from 'consola';
import { useSelector, useDispatch } from 'react-redux';
import { formatEther } from 'ethers';
import { Paper } from '@material-ui/core';
import { storeFamepayFactoryThunk } from '../../redux/actions/famepayFactory';
import { connectAccountThunk } from '../../redux/actions/account';
import { createCampaignThunk } from '../../redux/actions/campaign';
import { createNewCampaignProposalDb } from '../../services/api/campaignService';
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
  const router = useRouter();

  // const famepayFactory = useSelector(state => state.famepayFactory);

  const [registrationStep, setRegistrationStep] = useState(0);

  // Campaign Participants
  const [influencer, setInfluencer] = useState('');

  //Campaign Objective
  const [objective, setObjective] = useState('');

  //Campaign Dates
  const [simplePostDate, setSimplePostDate] = useState(0); //postDate to create post
  const [simplePostMinimumDuration, setSimplePostMinimumDuration] = useState(0); //duration to keep post up (7hr post)
  const [campaignDuration, setCampaignDuration] = useState([]); //sept 1 - oct 1

  //Campaign $$$$
  const [stakedAmount, setStakedAmount] = useState(0);
  const [jackpotTarget, setJackpotTarget] = useState(1);
  const [incrementalTarget, setIncrementalTarget] = useState(0);
  const [jackpotReward, setJackpotReward] = useState(0);
  const [incrementalReward, setIncrementalReward] = useState(0);

  useEffect(() => {
    dispatch(connectAccountThunk());
    return () => {
      consola.success('NewCampaign page: cleanup');
    };
  }, []);

  useEffect(() => {
    if (account.address != null) {
      dispatch(storeFamepayFactoryThunk());
    }
    return () => {
      consola.success('NewCampaign page: cleanup');
    };
  }, [account]);

  const findInfluencer = async influencer => {
    try {
      //search for influencer from api or db
      setInfluencer(influencer);
    } catch (error) {
      consola.error('NewCampaign.findInfluencer():', error);
    }
  };

  const createNewCampaignProposal = async () => {
    if (objective === 'simplePost') setJackpotReward(stakedAmount);
    try {
      const campaignDb = await createNewCampaignProposalDb(
        account.address, //business
        influencer.toLowerCase(),
        campaignDuration[0] ? campaignDuration[0] : Math.round(Date.now() / 1000), //agreedStartDate
        campaignDuration[1] ? campaignDuration[1] : simplePostDate, //agreedDeadline/postDate
        simplePostMinimumDuration,
        jackpotReward,
        incrementalReward,
        jackpotTarget,
        incrementalTarget,
        stakedAmount, //potentialPayout
        objective,
        // 'niche',
      );
      router.push(`/reviewcampaign/${campaignDb.data.payload.data._id}`);
    } catch (error) {
      consola.error('NewCampaign.createNewCampaignProposal():', error);
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
              setParentFinishCampaign={createNewCampaignProposal}
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
              setParentFinishCampaign={createNewCampaignProposal}
            ></CampaignReward>
          </Paper>
        );
    }
  };
  return <div className={classes.NewCampaign_box_positioning}>{renderSingleRegistrationComponent()}</div>;
};

export default NewCampaign;
