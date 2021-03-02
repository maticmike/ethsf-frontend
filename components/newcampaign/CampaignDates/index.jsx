import React from 'react';
import styles from './index.module.css';
import { THORNTON } from '../../../constants/FamepayConstants';

const CampaignDates = props => {
  return (
    <div>
      <h2 className={styles.CampaignDates_custom_font}>{THORNTON}Traffic Objective</h2>
    </div>
  );
};

export default CampaignDates;
