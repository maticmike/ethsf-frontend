import React, { useState } from 'react';
import { Grid, FormControl, FormControlLabel, RadioGroup, Radio, Button } from '@material-ui/core';
import { useStyles } from './styles.js';
import { setObjectiveName } from '../../../utils/ObjectiveNames';

const CampaignObjective = ({ setParentObjective, setParentCampaignSetupStep }) => {
  const classes = useStyles();

  const [selectedObjective, setSelectedObjective] = useState('');
  const [error, setError] = useState(false);

  const handleRadioChange = e => {
    setSelectedObjective(e.target.value);
    setError(false);
  };

  const submitCampaignObjective = () => {
    const parsedObjectiveName = setObjectiveName(selectedObjective);
    setParentObjective(parsedObjectiveName);
    setParentCampaignSetupStep(2);
  };

  return (
    <div className={classes.CampaignObjective_custom_font}>
      <h2>Choose Campaign Objective</h2>
      <p>Campaign Objective</p>
      <form onSubmit={submitCampaignObjective}>
        <Grid container direction="row" spacing={1}>
          <Grid item xs={4}>
            <p>
              <strong className={classes.CampaignObjective_custom_font_heading}>Awareness</strong>
            </p>
            <FormControl component="awareness-objective-root" error={error}>
              <RadioGroup
                aria-label="awareness-objective"
                name="awareness-objective-radio-group"
                value={selectedObjective}
                onChange={handleRadioChange}
              >
                <FormControlLabel value="post" control={<Radio color="primary" />} label="Single Post" />
                <FormControlLabel value="view" control={<Radio color="primary" />} label="Views" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <p>
              <strong className={classes.CampaignObjective_custom_font_heading}>Engagement</strong>
            </p>
            <FormControl component="engagement-objective-root" error={error}>
              <RadioGroup
                aria-label="engagement-objective"
                name="engagement-objective-radio-group"
                value={selectedObjective}
                onChange={handleRadioChange}
              >
                <FormControlLabel value="grow" control={<Radio color="primary" />} label="Profile Growth" />
                <FormControlLabel value="like" control={<Radio color="primary" />} label="Likes" />
                <FormControlLabel value="comm" control={<Radio color="primary" />} label="Comments" />
                <FormControlLabel value="shar" control={<Radio color="primary" />} label="Shares" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <p>
              <strong className={classes.CampaignObjective_custom_font_heading}>Conversion</strong>
            </p>
            <FormControl component="campaign-objective-root" error={error}>
              <RadioGroup
                aria-label="conversion-objective"
                name="conversion-objective-radio-group"
                value={selectedObjective}
                onChange={handleRadioChange}
              >
                <FormControlLabel value="webVisits" control={<Radio color="primary" />} label="Website Visits" />
                <FormControlLabel value="atc" control={<Radio color="primary" />} label="Add To Carts" />
                <FormControlLabel value="sales" control={<Radio color="primary" />} label="Sales" />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container direction="row" spacing={1}>
          <Grid item xs={6}>
            <Button onClick={() => setParentCampaignSetupStep(0)} variant="outlined" color="primary" size="small">
              Previous
            </Button>
          </Grid>
          <Grid item xs={6} className={classes.CampaignObjective_align_right}>
            {selectedObjective ? (
              <Button type="submit" variant="contained" color="primary" size="small">
                Next
              </Button>
            ) : null}
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default CampaignObjective;
