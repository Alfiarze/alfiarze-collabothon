import React from 'react';
import { useEffect, useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Paper, Chip } from '@mui/material';
import axiosPrivate from '../../ctx/axiosPrivate';

interface LoyaltyProgram {
  id: number;
  name: string;
  description: string;
  points: number;
}


const LoyaltyProgram = () => {
  const [loyaltyPrograms, setLoyaltyPrograms] = useState<LoyaltyProgram[]>([
  { id: 1, name: "Cash Back Rewards", description: "Earn 2% cash back on all purchases", type: 'cashback' },
  { id: 2, name: "Travel Miles", description: "Earn 1.5x miles on every dollar spent", type: 'travel' },
  { id: 3, name: "Reward Points", description: "Collect points for exclusive discounts and offers", type: 'points' },
  { id: 4, name: "Lifestyle Perks", description: "Access to exclusive events and experiences", type: 'lifestyle' },
]);


useEffect(() => {
  axiosPrivate.get('api/loyal-programs/').then((res) => {
      console.log(res.data);
      if (Array.isArray(res.data)) {
        setLoyaltyPrograms(res.data.map((loyaltyProgram: LoyaltyProgram) => ({
            id: loyaltyProgram.id,
            name: loyaltyProgram.name,
            description: loyaltyProgram.description,
            points: loyaltyProgram.points
        })));
    }
  });
}, []);

  return (
    <Paper elevation={3}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" component="h2" mb={2}>
          Loyalty Program Benefits
        </Typography>
        <List>
          {loyaltyPrograms.map((benefit) => (
            <ListItem key={benefit.id}>
              <ListItemText
                primary={
                  <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Box display="flex" alignItems="center">
                      <Typography variant="subtitle1" component="span" mr={1}>
                        {benefit.name}
                      </Typography>
                      <Chip
                        label={benefit.points}
                        size="small"
                        sx={{ backgroundColor: '#4caf50', color: 'white' }}
                      />
                    </Box>
                  </Box>
                }
                secondary={
                  <Box>
                    <Typography component="span" variant="body2" color="text.primary">
                      {benefit.description}
                    </Typography>
                  </Box>
                }
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Paper>
  );
};

export default LoyaltyProgram;
