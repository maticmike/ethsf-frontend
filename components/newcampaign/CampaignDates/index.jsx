import React, { useState } from 'react';
import styles from './index.module.css';
import { setObjectiveName } from '../../../utils/objectiveNames';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { Grid } from '@material-ui/core';
const CampaignDates = props => {
  const [date, setDate] = useState(new Date());
  const getHeading = () => (props.objective === 'singlePost' ? 'Post Date And Time' : 'Campaign Length');

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
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Date picker inline"
              value={date}
              // onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>
        </Grid>
      </Grid>
    </div>
  );
};

export default CampaignDates;
