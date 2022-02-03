import React, { useState } from 'react';
import NumberFormat from 'react-number-format';
import { FormHelperText, Button, TextField } from '@material-ui/core';
import { setObjectiveName } from '../../../../utils/ObjectiveNames';
import { useStyles } from './styles.js';
const BountyParticipants = ({
  objective,
  stakedAmount,
  setParentJackpotReward,
  setParentJackpotTarget,
  setParentCampaignSetupStep,
  parentJackpotReward,
  parentJackpotTarget,
}) => {
  const classes = useStyles();
  const [isJackpot, setIsJackpot] = useState(true);

  const handlePrevious = () => {
    console.log('previous');
  };

  const handleNext = () => {
    console.log('next');
  };

  return (
    <div className={classes.BountyReward_font}>
      <h1>{setObjectiveName(objective)} Objective</h1>
      <p className={classes.BountyReward_p_heading}>4. Bounty Participants</p>
      <FormHelperText>
        Enter the conditions for influencer to earn the bounty reward for completing the objective
      </FormHelperText>
      <div className={classes.BountyReward_align_inputs}>
        <div>
          <p>Max campaign participants</p>
          <TextField
            id="outlined-basic"
            // fullWidth
            size="small"
            label="50 participants (Optional)"
            // onChange={e => setPostUrl(e.target.value)}
            variant="outlined"
            // error={invalidPost}
          />
        </div>
        <div className={classes.BountyReward_shift_objective_input}>
          <p>Max payout per influencer</p>
          <TextField
            id="outlined-basic"
            // fullWidth
            size="small"
            label="10 winners (Optional)"
            // onChange={e => setPostUrl(e.target.value)}
            variant="outlined"
            // error={invalidPost}
          />
        </div>
      </div>
      <br />
      <div className={classes.BountyReward_button_alignment}>
        <Button variant="outlined" color="primary" size="small" onClick={handlePrevious}>
          Previous
        </Button>
        <Button variant="contained" color="primary" size="small" onClick={handleNext}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default BountyParticipants;
