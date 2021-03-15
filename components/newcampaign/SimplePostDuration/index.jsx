import React, { useState } from 'react';
import { Grid, FormControl, FormLabel, FormControlLabel, FormHelperText, Radio, RadioGroup } from '@material-ui/core';
import { setObjectiveName } from '../../../utils/objectiveNames';
import styles from './index.module.css';

const SimplePostDuration = props => {
  const getHeading = () => (props.objective === 'singlePost' ? 'Post Date And Time' : 'Campaign Length');

  const [selectedDuration, setSelectedDuration] = useState('');

  return (
    <>
      <Grid container direction="row" className={styles.CampaignDuration_custom_font}>
        <Grid item xs={6}>
          <h2>{setObjectiveName(props.objective)} Objective</h2>
          <p>2. {getHeading()}</p>
          <FormHelperText className={styles.CampaignDuration_helper_font}>
            Select the range of dates which you want the campaign to last for
          </FormHelperText>
        </Grid>
        <Grid item xs={6}>
          <FormControl component="fieldset">
            <FormLabel className={styles.CampaignDuration_label_center}>Post Duration</FormLabel>
            <RadioGroup
              component="select-campaign-checkboxes"
              className={styles.CampaignDuration_checkbox_center}
              name="gender1"
              value={selectedDuration}
              onChange={e => setSelectedDuration(e.target.value)}
            >
              <FormControlLabel value="twelve" control={<Radio color="primary" />} label="Twelve Hours" />
              <FormControlLabel value="oneDay" control={<Radio color="primary" />} label="One Day" />
              <FormControlLabel value="twoDays" control={<Radio color="primary" />} label="Two Days" />
              <FormControlLabel value="permanent" control={<Radio color="primary" />} label="Permanent" />
              <FormControlLabel value="other" control={<Radio color="primary" />} label="Other" />
            </RadioGroup>
            <FormHelperText className={styles.CampaignDuration_text_center}>
              Payment will be made after the selected time period has passed
            </FormHelperText>
          </FormControl>
        </Grid>
      </Grid>
    </>
  );
};

export default SimplePostDuration;
