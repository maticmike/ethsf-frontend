import React, { useState } from 'react';
import NumberFormat from 'react-number-format';
import { FormHelperText, Button, TextField } from '@material-ui/core';
import { setObjectiveName } from '../../../../utils/ObjectiveNames';
import { useStyles } from './styles.js';
const BountyParticipants = ({
  objective,
  setParentMaxParticipants,
  setParentMaxWinners,
  setParentCampaignSetupStep,
}) => {
  const classes = useStyles();

  const handlePrevious = () => setParentCampaignSetupStep(3);
  const handleNext = () => setParentCampaignSetupStep(5);

  return (
    <div className={classes.BountyReward_font}>
      <h1>{setObjectiveName(objective)} Objective</h1>
      <p className={classes.BountyReward_p_heading}>Bounty Participants</p>
      <FormHelperText>
        Enter the maximum amount of influencers who can participate and the maximum amount of winners for this bounty
      </FormHelperText>
      <div className={classes.BountyReward_align_inputs}>
        <div>
          <p>Max campaign participants</p>
          <TextField
            id="outlined-basic"
            size="small"
            label="Bounty Participants"
            onChange={e => setParentMaxParticipants(e.target.value)}
            variant="outlined"
            // error={invalidPost}
          />
        </div>
        <div className={classes.BountyReward_shift_objective_input}>
          <p>Max winning influencers</p>
          <TextField
            id="outlined-basic"
            size="small"
            label="Bounty Winners"
            onChange={e => setParentMaxWinners(e.target.value)}
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
