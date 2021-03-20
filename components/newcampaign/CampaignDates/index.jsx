import React, { useState } from 'react';
import MomentUtils from '@date-io/moment';
import { Grid, Button } from '@material-ui/core';
import { setObjectiveName } from '../../../utils/objectiveNames';
import { useStyles } from './styles';
import Calendar from 'react-calendar';
import moment from 'moment';
import 'react-calendar/dist/Calendar.css';

const CampaignDates = ({ objective, setRootSimpleDate, setCampaignSetupStep }) => {
  const classes = useStyles();
  const [simpleDate, setSimpleDate] = useState(new Date());

  const getHeading = () => (objective === 'singlePost' ? 'Post Date And Time' : 'Campaign Length');
  const handleDateChange = date => setSimpleDate(date);
  const selectDate = () => {
    setRootSimpleDate(date);
    setCampaignSetupStep(2);
  };
  return (
    <div className={classes.CampaignDates_layout}>
      <Grid container direction="row">
        <Grid item xs={6}>
          <h2 className={classes.CampaignDates_custom_font}>{setObjectiveName(objective)} Objective</h2>
          <p className={classes.CampaignDates_heading_font_size}>1. {getHeading()}</p>
          <p className={classes.CampaignDates_helper_font}>
            Select the range of dates which you want the campaign to last for
          </p>
        </Grid>
        <Grid item xs={6} className={classes.CampaignDates_calendar_right}>
          <Calendar
            onChange={handleDateChange}
            minDate={new Date()}
            selectRange={objective != 'ppp' ? true : false}
            value={simpleDate}
          />
        </Grid>
      </Grid>
      <br />
      <div className={classes.CampaignDates_align_buttons}>
        <Button onClick={() => setCampaignSetupStep(1)} variant="outlined" color="primary" size="small">
          Previous
        </Button>
        <Button type="submit" variant="contained" color="primary" size="small" onClick={selectDate}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default CampaignDates;
