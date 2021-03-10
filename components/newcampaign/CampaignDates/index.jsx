import React from 'react';
import styles from './index.module.css';
import { setObjectiveName } from '../../../utils/objectiveNames';

const CampaignDates = props => {
  return (
    <div>
      <h2 className={styles.CampaignDates_custom_font}>{setObjectiveName(props.objective)} Objective</h2>
    </div>
  );
};

export default CampaignDates;
