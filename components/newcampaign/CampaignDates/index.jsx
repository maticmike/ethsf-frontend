import React, { useState } from 'react';
import { Grid, Button } from '@material-ui/core';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { setObjectiveName } from '../../../utils/ObjectiveNames';
import { useStyles } from './styles';

const CampaignDates = ({ objective, setParentSimpleDate, setParentCampaignSetupStep }) => {
  const classes = useStyles();
  const [simpleDate, setSimpleDate] = useState(null);

  const getHeading = () => (objective === 'singlePost' ? 'Post Date And Time' : 'Campaign Length');
  const handleDateChange = date => setSimpleDate(date);
  const selectDate = () => {
    setParentSimpleDate(simpleDate);
    objective === 'singlePost' ? setParentCampaignSetupStep(3) : setParentCampaignSetupStep(4);
  };
  return (
    <div className={classes.CampaignDates_layout}>
      <Grid container direction="row">
        <Grid item xs={6}>
          <h2 className={classes.CampaignDates_custom_font}>{setObjectiveName(objective)} Objective</h2>
          <p className={classes.CampaignDates_heading_font_size}>2. {getHeading()}</p>
          <p className={classes.CampaignDates_helper_font}>
            Select the range of dates which you want the campaign to last for
          </p>
        </Grid>
        <Grid item xs={6} className={classes.CampaignDates_calendar_right}>
          <Calendar
            onChange={handleDateChange}
            minDate={new Date()}
            selectRange={objective != 'singlePost' ? true : false}
            value={simpleDate}
          />
        </Grid>
      </Grid>
      <br />
      <div className={classes.CampaignDates_align_buttons}>
        <Button onClick={() => setParentCampaignSetupStep(1)} variant="outlined" color="primary" size="small">
          Previous
        </Button>
        {simpleDate ? (
          <Button type="submit" variant="contained" color="primary" size="small" onClick={selectDate}>
            Next
          </Button>
        ) : null}
      </div>
    </div>
  );
};

export default CampaignDates;
