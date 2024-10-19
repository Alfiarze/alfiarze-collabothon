import React, { useEffect, useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Chip } from '@mui/material';
import axiosPrivate from '../../ctx/axiosPrivate';

interface LoyaltyProgram {
  id: number;
  name: string;
  description: string;
  points: number;
  type?: string;
}

const LoyaltyProgram: React.FC = () => {
  const [loyaltyPrograms, setLoyaltyPrograms] = useState<LoyaltyProgram[]>([
    { id: 1, name: "Cash Back Rewards", description: "Earn 2% cash back on all purchases", points: 0, type: 'cashback' },
    { id: 2, name: "Travel Miles", description: "Earn 1.5x miles on every dollar spent", points: 0, type: 'travel' },
    { id: 3, name: "Reward Points", description: "Collect points for exclusive discounts and offers", points: 0, type: 'points' },
    { id: 4, name: "Lifestyle Perks", description: "Access to exclusive events and experiences", points: 0, type: 'lifestyle' },
  ]);

  useEffect(() => {
    const fetchLoyaltyPrograms = async () => {
      try {
        const response = await axiosPrivate.get('api/loyal-programs/');
        if (Array.isArray(response.data)) {
          setLoyaltyPrograms(response.data.map((program: LoyaltyProgram) => ({
            id: program.id,
            name: program.name,
            description: program.description,
            points: program.points,
            type: program.type,
          })));
        }
      } catch (error) {
        console.error('Error fetching loyalty programs:', error);
      }
    };

    fetchLoyaltyPrograms();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" component="h2" gutterBottom>
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
                <Typography component="span" variant="body2" color="text.primary">
                  {benefit.description}
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default LoyaltyProgram;
