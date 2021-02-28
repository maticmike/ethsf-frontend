import React, { useState } from 'react';
import { Grid, FormControl, FormControlLabel, RadioGroup, Radio, Tooltip, Button } from '@material-ui/core';
import styles from './index.module.css';

const CampaignObjective = () => {
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);

  const handleRadioChange = event => {
    setValue(event.target.value);
    setError(false);
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(e, 'event was ran');
  };

  return (
    <div>
      <p className={styles.CampaignObjective_custom_font}>
        <strong>Choose Campaign Objective</strong>
      </p>
      <Grid container direction="row" spacing={1}>
        <Grid item xs={4}>
          <p>
            <strong className={styles.CampaignObjective_custom_font_colour}>Awareness</strong>
          </p>
          <form onSubmit={handleSubmit}>
            <FormControl component="awareness-objective-root" error={error}>
              <RadioGroup
                aria-label="quiz"
                name="campaign-objective-radio-group"
                value={value}
                onChange={handleRadioChange}
              >
                <FormControlLabel value="singlePost" control={<Radio />} label="Single Post" />
                <FormControlLabel value="postViews" control={<Radio />} label="Views" />
              </RadioGroup>
            </FormControl>
          </form>
        </Grid>
        <Grid item xs={4}>
          <p>
            <strong className={styles.CampaignObjective_custom_font_colour}>Engagement</strong>
          </p>
          <form onSubmit={handleSubmit}>
            <FormControl component="engagement-objective-root" error={error}>
              <RadioGroup
                aria-label="quiz"
                name="campaign-objective-radio-group"
                value={value}
                onChange={handleRadioChange}
              >
                <FormControlLabel value="profileGrowth" control={<Radio />} label="Profile Growth" />
                <FormControlLabel value="likes" control={<Radio />} label="Likes" />
                <FormControlLabel value="comments" control={<Radio />} label="Comments" />
                <FormControlLabel value="shares" control={<Radio />} label="Shares" />
              </RadioGroup>
            </FormControl>
          </form>
        </Grid>
        <Grid item xs={4}>
          <p>
            <strong className={styles.CampaignObjective_custom_font_colour}>Conversion</strong>
          </p>
          <form onSubmit={handleSubmit}>
            <FormControl component="campaign-objective-root" error={error}>
              <RadioGroup
                aria-label="quiz"
                name="conversion-objective-radio-group"
                value={value}
                onChange={handleRadioChange}
              >
                <FormControlLabel value="webVisits" control={<Radio />} label="Website Visits" />
                <FormControlLabel value="atc" control={<Radio />} label="Add To Carts" />
                <FormControlLabel value="sales" control={<Radio />} label="Sales" />
              </RadioGroup>
            </FormControl>
          </form>
        </Grid>
      </Grid>
      <Grid container direction="row" spacing={1} justify="flex-end">
        <Grid item xs={6}>
          <Button type="submit" variant="outlined" color="primary" size="small">
            Previous
          </Button>
        </Grid>
        <Grid item xs={6} className={styles.CampaignObjective_align_right}>
          <Button type="submit" variant="contained" color="primary" size="small">
            Next
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default CampaignObjective;
