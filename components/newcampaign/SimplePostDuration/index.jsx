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
  Button,
  MenuItem,
} from '@material-ui/core';
import { setObjectiveName } from '../../../utils/ObjectiveNames';
import { SIMPLE_POST } from '../../../constants/CampaignObjectives';
import { useStyles } from './styles';

const SimplePostDuration = ({ objective, setParentSimplePostMinimumDuration, setParentCampaignSetupStep }) => {
  const classes = useStyles();

  const [selectedDuration, setSelectedDuration] = useState(''); //radio button
  const [alternativeDuration, setAlternativeDuration] = useState(1);
  const [alternativeDurationUnit, setAlternativeDurationUnit] = useState('hours');
  const [showOtherOptions, setShowOtherOptions] = useState(false);

  const alternativeDurationOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  const selectAlternativeDurationTimestamp = () => {
    if (alternativeDurationUnit === 'hours') return alternativeDuration * 3600;
    if (alternativeDurationUnit === 'days') return alternativeDuration * 86400;
    if (alternativeDurationUnit === 'weeks') return alternativeDuration * 604800;
  };

  const handlePostDuration = () => {
    let radioOptionDuration;
    if (selectedDuration === 'twelve') radioOptionDuration = 43200;
    if (selectedDuration === 'oneDay') radioOptionDuration = 86400;
    if (selectedDuration === 'twoDays') radioOptionDuration = 172800;

    if (selectedDuration === 'other' && alternativeDuration === '') {
      alert('Please select post duration from dropdown');
    } else {
      setParentSimplePostMinimumDuration(
        selectedDuration === 'other' ? selectAlternativeDurationTimestamp() : radioOptionDuration,
      );
      objective === SIMPLE_POST ? setParentCampaignSetupStep(4) : setParentCampaignSetupStep(5);
    }
  };

  return (
    <>
      <Grid container direction="row" className={classes.SimplePostDuration_custom_font}>
        <Grid item xs={6}>
          <h2>{setObjectiveName(objective)} Objective</h2>
          <p>3. Post Duration</p>
          <FormHelperText className={classes.SimplePostDuration_helper_font}>
            Select the range of dates which you want the campaign to last for
          </FormHelperText>
        </Grid>
        <Grid item xs={6}>
          <FormControl component="fieldset">
            <FormLabel className={classes.SimplePostDuration_label_center}>Post Duration</FormLabel>
            <RadioGroup
              component="select-campaign-checkboxes"
              value={selectedDuration}
              onChange={e => setSelectedDuration(e.target.value)}
            >
              <FormControlLabel
                value="twelve"
                control={<Radio color="primary" onClick={() => setShowOtherOptions(false)} />}
                label="Twelve Hours"
              />
              <FormControlLabel
                value="oneDay"
                control={<Radio color="primary" onClick={() => setShowOtherOptions(false)} />}
                label="One Day"
              />
              <FormControlLabel
                value="twoDays"
                control={<Radio color="primary" onClick={() => setShowOtherOptions(false)} />}
                label="Two Days"
              />
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
                className={classes.SimplePostDuration_custom_selector}
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
                className={classes.SimplePostDuration_custom_selector}
              >
                <MenuItem key="hours" value={'hours'}>
                  {alternativeDuration === 1 ? 'Hour' : 'Hours'}
                </MenuItem>
                <MenuItem key="days" value={'days'}>
                  {alternativeDuration === 1 ? 'Day' : 'Days'}
                </MenuItem>
                <MenuItem key="weeks" value={'weeks'}>
                  {alternativeDuration === 1 ? 'Week' : 'Weeks'}
                </MenuItem>
              </Select>
            </>
          ) : null}
          <FormHelperText>Payment will be made after the selected time period has passed</FormHelperText>
        </Grid>
      </Grid>
      <div className={classes.SimplePostDuration_button_alignment}>
        <Button variant="outlined" color="primary" size="small" onClick={() => setParentCampaignSetupStep(2)}>
          Previous
        </Button>
        {selectedDuration ? (
          <Button variant="contained" color="primary" size="small" onClick={handlePostDuration}>
            Next
          </Button>
        ) : null}
      </div>
    </>
  );
};

export default SimplePostDuration;
