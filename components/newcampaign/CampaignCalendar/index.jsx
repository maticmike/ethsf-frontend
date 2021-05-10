import React, { useState } from 'react';
import { Grid, Button } from '@material-ui/core';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { setObjectiveName } from '../../../utils/ObjectiveNames';
import { useStyles } from './styles';

const CampaignCalendar = ({
  objective,
  setParentSimplePostDate,
  setParentCampaignDuration,
  setParentCampaignSetupStep,
}) => {
  const classes = useStyles();
  const [simplePostDate, setSimplePostDate] = useState(null);
  const [campaignDuration, setCampaignDuration] = useState(null);

  const getHeading = () => (objective === 'singlePost' ? 'Post Date And Time' : 'Campaign Length');
  const handlePostDate = postDate => {
    objective === 'singlePost' ? setSimplePostDate(postDate) : setCampaignDuration(postDate);
  };
  const selectPostDate = () => {
    let endOfDaySimplePost;
    let startCampaignDate;
    let endCampaignDate;
    if (objective === 'singlePost') {
      endOfDaySimplePost = new Date(simplePostDate).getTime() / 1000 + 86340;
    } else {
      startCampaignDate = new Date(campaignDuration[0]).getTime() / 1000 + 86340;
      endCampaignDate = new Date(campaignDuration[1]).getTime() / 1000;
    }
    setParentSimplePostDate(endOfDaySimplePost);
    setParentCampaignDuration([startCampaignDate, parseInt(endCampaignDate)]);
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
            onChange={handlePostDate}
            minDate={new Date()}
            selectRange={objective != 'singlePost' ? true : false}
            value={objective === 'singlePost' ? simplePostDate : campaignDuration}
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
