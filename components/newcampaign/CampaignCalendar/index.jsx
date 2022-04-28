import React, { useState } from 'react';
import { Grid, Button } from '@material-ui/core';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useStyles } from './styles';
import { setObjectiveName } from '../../../utils/ObjectiveNames';
import { SIMPLE_POST } from '../../../constants/CampaignObjectives';

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

  const getHeading = () => (objective === SIMPLE_POST ? 'Post Date And Time' : 'Campaign Length');
  const handlePostDate = postDate => {
    objective === SIMPLE_POST ? setSimplePostDate(postDate) : setCampaignDuration(postDate);
  };
  const selectPostDate = () => {
    let startOfDaySimplePost;
    let endOfDaySimplePost;
    let startCampaignDate;
    let endCampaignDate;
    if (objective === SIMPLE_POST) {
      startOfDaySimplePost = new Date(simplePostDate).getTime() / 1000;
      endOfDaySimplePost = new Date(simplePostDate).getTime() / 1000 + 86340;
      //If decimal then post is today
      if (endOfDaySimplePost % 1 != 0) {
        const endOfDaySimplePostDate = new Date();
        endOfDaySimplePostDate.setHours(0, 0, 0, 0);
        endOfDaySimplePost = new Date(endOfDaySimplePostDate).getTime() / 1000 + 86340;
      }
    } else {
      startCampaignDate = new Date(campaignDuration[0]).getTime() / 1000 + 86340;
      endCampaignDate = new Date(campaignDuration[1]).getTime() / 1000;
    }
    //TODO specify timezone right now its eastern
    setParentSimplePostDateStart(startOfDaySimplePost);
    setParentSimplePostDateEnd(endOfDaySimplePost);
    setParentCampaignDuration([startCampaignDate, parseInt(endCampaignDate)]);
    objective === SIMPLE_POST ? setParentCampaignSetupStep(3) : setParentCampaignSetupStep(4);
  };
  return (
    <div className={classes.CampaignDates_layout}>
      <Grid container direction="row">
        <Grid item xs={6}>
          <h2 className={classes.CampaignDates_custom_font}>{setObjectiveName(objective)} Objective</h2>
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
