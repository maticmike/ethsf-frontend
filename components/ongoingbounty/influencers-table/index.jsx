//Username Email Followers Top Platform Completed

import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import { getUserFromEthAddressDb } from '../../../services/api/userService';

const InfluencersTable = ({ influencers }) => {
  // function createData(name, calories, fat, carbs, protein) {
  //   return { name, calories, fat, carbs, protein };
  // }

  const [influencersAll, setInfluencersAll] = useState([]);

  useEffect(() => {
    async function getInfluencersDb() {
      influencers.map(async influencer => {
        const influencerRes = await getUserFromEthAddressDb(influencer?.id);

        const influencerMappedData = {
          id: influencer?.id,
          username: influencerRes?.data?.payload?.username,
          email: influencerRes?.data?.payload?.email,
          followers: 'influencerRes?.data?.payload?.followers',
          topPlatform: 'n/a',
          completed: influencer?.bountiesCompleted,
        };
        setInfluencersAll(oldArray => [influencerMappedData, ...oldArray]);
      });
    }
    getInfluencersDb();
    return () => console.log('cleanup influencer table');
  }, []);

  console.log(influencersAll, 'all');
  // const rows = async influencer => {
  //   const influencerRes = await getUserFromEthAddressDb(influencer?.id);
  //   return {
  //     username: influencerRes?.data?.payload?.username,
  //     email: influencerRes?.data?.payload?.email,
  //     followers: influencerRes?.data?.payload?.followers,
  //     topPlatform: 'n/a',
  //   };
  // };

  // rows();
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Influencer</TableCell>
            <TableCell align="right">Username</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Followers</TableCell>
            <TableCell align="right">Top Platform</TableCell>
            <TableCell align="right">Campaigns Completed</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {influencersAll.map(influencer => {
            // TODO no async data allowed here including promises
            console.log(influencer, 'influencer');
            return (
              <TableRow key={influencer.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  testing
                </TableCell>
                <TableCell component="th" scope="row">
                  {influencer?.username}
                </TableCell>
                <TableCell align="right">{influencer?.email}</TableCell>
                <TableCell align="right">belzy</TableCell>
                <TableCell align="right">petruska</TableCell>
                <TableCell align="right">dingles</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default InfluencersTable;
