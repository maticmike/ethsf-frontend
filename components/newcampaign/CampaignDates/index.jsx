import React, { useState } from 'react';
import styles from './index.module.css';
import { setObjectiveName } from '../../../utils/objectiveNames';
import DateFnsUtils from '@date-io/date-fns';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import { Grid } from '@material-ui/core';
const CampaignDates = props => {
  const [date, setDate] = useState(new Date());
  const getHeading = () => (props.objective === 'singlePost' ? 'Post Date And Time' : 'Campaign Length');
  const handleDateChange = e => console.log(e.target.value);
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
          <Datetime open />
          {/* <MuiPickersUtilsProvider utils={DateFnsUtils} className={styles.CampaignDates_calendar_right}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              value={date}
              onChange={handleDateChange}
            />
          </MuiPickersUtilsProvider> */}
        </Grid>
      </Grid>
    </div>
  );
};

export default CampaignDates;
