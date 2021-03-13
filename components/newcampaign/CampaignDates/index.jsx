import React, { useState, useEffect } from 'react';
import MomentUtils from '@date-io/moment';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { Grid } from '@material-ui/core';
import { setObjectiveName } from '../../../utils/objectiveNames';
import styles from './index.module.css';
const CampaignDates = props => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setOpen(true);
  }, []);
  const getHeading = () => (props.objective === 'singlePost' ? 'Post Date And Time' : 'Campaign Length');
  const handleDateChange = date => setDate(date);
  return (
    <div className={styles.CampaignDates_layout}>
      <Grid container direction="row">
        <Grid item xs={6}>
          <h2 className={styles.CampaignDates_custom_font}>{setObjectiveName(props.objective)} Objective</h2>
          <p className={styles.CampaignDates_heading_font_size}>1. {getHeading()}</p>
          <p className={styles.CampaignDates_helper_font}>
            Select the range of dates which you want the campaign to last for
          </p>
        </Grid>
        <Grid item xs={6} className={styles.CampaignDates_calendar_right}>
          <MuiPickersUtilsProvider utils={MomentUtils} className={styles.CampaignDates_calendar_right}>
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
          </MuiPickersUtilsProvider>

          {/* TODO: Get Range Calendar For Campaign Registrations */}
        </Grid>
      </Grid>
    </div>
  );
};

export default CampaignDates;
