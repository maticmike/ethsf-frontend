import React, { useState } from 'react';
import {
  Grid,
  FormControl,
  FormLabel,
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
  Select,
  MenuItem,
} from '@material-ui/core';
import { setObjectiveName } from '../../../utils/objectiveNames';
import styles from './index.module.css';
import { CalendarViewDaySharp } from '@material-ui/icons';

const SimplePostDuration = props => {
  const getHeading = () => (props.objective === 'singlePost' ? 'Post Date And Time' : 'Campaign Length');

  const [selectedDuration, setSelectedDuration] = useState('');
  const [showOtherOptions, setShowOtherOptions] = useState(false);
  const [alternativeDuration, setAlternativeDuration] = useState('');
  const [alternativeDurationUnit, setAlternativeDurationUnit] = useState('');

  const alternativeDurationOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
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
              //   className={styles.CampaignDuration_checkbox_center}
              value={selectedDuration}
              onChange={e => setSelectedDuration(e.target.value)}
            >
              <FormControlLabel value="twelve" control={<Radio color="primary" />} label="Twelve Hours" />
              <FormControlLabel value="oneDay" control={<Radio color="primary" />} label="One Day" />
              <FormControlLabel value="twoDays" control={<Radio color="primary" />} label="Two Days" />
              <FormControlLabel value="permanent" control={<Radio color="primary" />} label="Permanent" />
              <FormControlLabel
                value="other"
                control={<Radio color="primary" onClick={() => setShowOtherOptions(true)} />}
                label="Other"
              />
            </RadioGroup>
          </FormControl>
          {showOtherOptions ? (
            <>
              <Select
                labelId="alternative-duration-options"
                id="alternative-duration-options"
                value={alternativeDuration}
                onChange={e => setAlternativeDuration(e.target.value)}
                className={styles.CampaignDuration_custom_selector}
              >
                {alternativeDurationOptions.map((durationOption, index) => {
                  return (
                    <MenuItem key={index} value={durationOption}>
                      {durationOption}
                    </MenuItem>
                  );
                })}
              </Select>
              &nbsp; &nbsp;
              <Select
                labelId="alternative-duration-units"
                id="alternative-duration-units"
                value={alternativeDurationUnit}
                onChange={e => setAlternativeDurationUnit(e.target.value)}
                className={styles.CampaignDuration_custom_selector}
              >
                <MenuItem key="hours" value={'hours'}>
                  Hours
                </MenuItem>
                <MenuItem key="days" value={'days'}>
                  Days
                </MenuItem>
                <MenuItem key="weeks" value={'weeks'}>
                  Weeks
                </MenuItem>
              </Select>
            </>
          ) : null}
          <FormHelperText>Payment will be made after the selected time period has passed</FormHelperText>
        </Grid>
      </Grid>
    </>
  );
};

export default SimplePostDuration;
