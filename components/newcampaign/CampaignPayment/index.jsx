import React, { useState } from 'react';
import NumberFormat from 'react-number-format';
import { FormHelperText } from '@material-ui/core';
import { setObjectiveName } from '../../../utils/objectiveNames';
import { useStyles } from './styles.js';

const CampaignPayment = ({ objective, objectiveAmount }) => {
  const classes = useStyles();
  const [jackpot, setJackpot] = useState(false);

  const getHeading = () => (objective === 'jackpot' ? 'Jackpot' : 'Incremental');

  return (
    <div className={classes.font}>
      <h1>{setObjectiveName(objective)} Objective</h1>
      <p className={classes.p_heading}>5. {getHeading()} Payment</p>
      <FormHelperText>Enter the amount of money you want to be available for the influencer to earn</FormHelperText>
      <div className={classes.align_inputs}>
        <div>
          {jackpot ? (
            <p>{objective.charAt(0).toUpperCase() + objective.slice(1)} Jackpot Objective:</p>
          ) : (
            <p>{objective.charAt(0).toUpperCase() + objective.slice(1)} Incremental Objective:</p>
          )}

          <NumberFormat className={classes.input} thousandSeparator={true} />
        </div>
        <div>
          {jackpot ? <p>Jackpot Payment:</p> : <p>Incremental Payment: </p>}
          <NumberFormat className={classes.input} thousandSeparator={true} prefix={'$'} />
        </div>
      </div>
    </div>
  );
};

export default CampaignPayment;
