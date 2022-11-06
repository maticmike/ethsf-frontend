import React from 'react';
import Image from 'next/image';
import { campaignState } from '../../../utils/helpers';
import { useStyles } from './styles';
import { Grid, 
  Card, 
  CardActions, 
  CardMedia, 
  CardContent, 
  Button, 
  Typography
} from '@material-ui/core';

//check isBusiness to know if populate cards with influencer or business data
const ProfileCampaigns = ({ fund, beneficiaryData, isBeneficiary }) => {
  return (
    <div>
      <Card sx={{maxWidth: 200 }}>
        <CardMedia
            component="img"
            image="/avatar.png"
            height={200}
            // src={isBusiness ? campaign.business.profileImageUrl : campaign.influencer.profileImageUrl}
          />
        <CardContent>
          <Typography component="div" gutterBottom> {fund.fundName} </Typography>
          <Typography variant="body2"> {fund.depositedAmount} </Typography>
          <Typography variant="body2"> {fund.vestingDate} </Typography>
        </CardContent>
        <CardActions>
          < Button variant="contained" color="success" size="small"> View Fund </Button>
        </CardActions>
      </Card>

    </div>
  );
};

export default ProfileCampaigns;
