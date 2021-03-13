import React, { useState } from 'react';
import Slider from '@material-ui/core/Slider';
import { setObjectiveName } from '../../../utils/objectiveNames';

import styles from './index.module.css';

const SimplePostDuration = props => {
  const getHeading = () => (props.objective === 'singlePost' ? 'Post Date And Time' : 'Campaign Length');
  const handleDateChange = date => setDate(date);
  return (
    <>
      <div className={styles.CampaignDuration_custom_font}>
        <h2>{setObjectiveName(props.objective)} Objective</h2>
        <p className={styles.CampaignObjective_custom_font_heading}>1. {getHeading()}</p>
        <p className={styles.CampaignDuration_helper_font}>
          Select the range of dates which you want the campaign to last for
        </p>
        <br />
        <br />
      </div>
      <div className={styles.CampaignDuration_slider}>
        <Slider
          defaultValue={30}
          // getAriaValueText="cassidy!"
          aria-labelledby="discrete-slider"
          valueLabelDisplay="auto"
          step={10}
          marks
          min={10}
          max={110}
        />
      </div>
    </>
  );
};

export default SimplePostDuration;
