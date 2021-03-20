import React, { useState, useEffect } from 'react';
import MomentUtils from '@date-io/moment';
// import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { Grid, Button } from '@material-ui/core';
import { setObjectiveName } from '../../../utils/objectiveNames';
import { useStyles } from './styles';
import Calendar from 'react-calendar';
import moment from 'moment';
import 'react-calendar/dist/Calendar.css';

const CampaignDates = ({ objective }) => {
  const classes = useStyles();
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setOpen(true);
  }, []);
  const getHeading = () => (objective === 'singlePost' ? 'Post Date And Time' : 'Campaign Length');
  const handleDateChange = date => setDate(date);
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
          {/* <MuiPickersUtilsProvider utils={MomentUtils} className={classes.CampaignDates_calendar_right}>
            <KeyboardDatePicker
              open={open}
              disableToolbar
              variant="inline"
              margin="normal"
              id="date-picker-inline"
              value={date}
              onChange={handleDateChange}
              onClose={() => setOpen(false)}
              onOpen={() => setOpen(true)}
            />
          </MuiPickersUtilsProvider> */}
          <Calendar
            // className={classes.CampaignDates_font_size}
            onChange={handleDateChange}
            minDate={new Date()}
            selectRange={objective != 'ppp' ? true : false}
            value={date}
          />
        </Grid>
      </Grid>
      <br />
      <div className={classes.CampaignDates_align_buttons}>
        <Button onClick={() => setCampaignSetupStep(0)} variant="outlined" color="primary" size="small">
          Previous
        </Button>
        <Button type="submit" variant="contained" color="primary" size="small" onClick>
          Next
        </Button>
      </div>
    </div>
  );
};

export default CampaignDates;
