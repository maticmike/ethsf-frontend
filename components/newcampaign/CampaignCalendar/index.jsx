import React, { useState } from 'react';
import { Grid, Button } from '@material-ui/core';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useStyles } from './styles';

const CampaignCalendar = ({
  objective,
  setParentSimplePostDateStart,
  setParentSimplePostDateEnd,
  setParentCampaignDuration,
  setParentCampaignSetupStep,
}) => {
  const classes = useStyles();
  const [simplePostDate, setSimplePostDate] = useState(null);
  const [campaignDuration, setCampaignDuration] = useState(null);

  const getHeading = () => 'Post Date And Time';
  const handlePostDate = postDate => setSimplePostDate(postDate);

  const selectPostDate = () => {
    let startOfDaySimplePost;
    let endOfDaySimplePost;
    let startCampaignDate;
    let endCampaignDate;

    startOfDaySimplePost = new Date(simplePostDate).getTime() / 1000;
    endOfDaySimplePost = new Date(simplePostDate).getTime() / 1000 + 86340;
    //If decimal then post is today
    if (endOfDaySimplePost % 1 != 0) {
      const endOfDaySimplePostDate = new Date();
      endOfDaySimplePostDate.setHours(0, 0, 0, 0);
      endOfDaySimplePost = new Date(endOfDaySimplePostDate).getTime() / 1000 + 86340;
    }

    //TODO specify timezone right now its eastern
    setParentSimplePostDateStart(startOfDaySimplePost);
    setParentSimplePostDateEnd(endOfDaySimplePost);
    setParentCampaignDuration([startCampaignDate, parseInt(endCampaignDate)]);
    setParentCampaignSetupStep(3);
  };
  return (
    <div className={classes.CampaignDates_layout}>
      <Grid container direction="row">
        <Grid item xs={6}>
          <h2 className={classes.CampaignDates_custom_font}> Objective</h2>
          <p className={classes.CampaignDates_heading_font_size}>{getHeading()}</p>
          <p className={classes.CampaignDates_helper_font}>
            Select the range of dates which you want the campaign to last for
          </p>
        </Grid>
        <Grid item xs={6} className={classes.CampaignDates_calendar_right}>
          <Calendar
            onChange={handlePostDate}
            minDate={new Date()}
            selectRange={objective != SIMPLE_POST ? true : false}
            value={objective === SIMPLE_POST ? simplePostDate : campaignDuration}
          />
        </Grid>
      </Grid>
      <br />
      <div className={classes.CampaignDates_align_buttons}>
        <Button onClick={() => setParentCampaignSetupStep(1)} variant="outlined" color="primary" size="small">
          Previous
        </Button>
        {simplePostDate || campaignDuration ? (
          <Button type="submit" variant="contained" color="primary" size="small" onClick={selectPostDate}>
            Next
          </Button>
        ) : null}
      </div>
    </div>
  );
};

export default CampaignCalendar;
