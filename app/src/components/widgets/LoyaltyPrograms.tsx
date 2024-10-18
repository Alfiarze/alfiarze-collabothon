import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Paper, Chip } from '@mui/material';

interface LoyaltyBenefit {
  id: number;
  name: string;
  description: string;
  type: 'cashback' | 'points' | 'travel' | 'lifestyle';
}

const loyaltyBenefits: LoyaltyBenefit[] = [
  { id: 1, name: "Cash Back Rewards", description: "Earn 2% cash back on all purchases", type: 'cashback' },
  { id: 2, name: "Travel Miles", description: "Earn 1.5x miles on every dollar spent", type: 'travel' },
  { id: 3, name: "Reward Points", description: "Collect points for exclusive discounts and offers", type: 'points' },
  { id: 4, name: "Lifestyle Perks", description: "Access to exclusive events and experiences", type: 'lifestyle' },
];

const LoyaltyPrograms: React.FC = () => {
  const getBenefitTypeColor = (type: LoyaltyBenefit['type']): string => {
    switch (type) {
      case 'cashback': return '#4caf50';
      case 'travel': return '#2196f3';
      case 'points': return '#ff9800';
      case 'lifestyle': return '#9c27b0';
      default: return '#9e9e9e';
    }
  };

  return (
    <Paper elevation={3}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" component="h2" mb={2}>
          Loyalty Program Benefits
        </Typography>
        <List>
          {loyaltyBenefits.map((benefit) => (
            <ListItem key={benefit.id}>
              <ListItemText
                primary={
                  <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Box display="flex" alignItems="center">
                      <Typography variant="subtitle1" component="span" mr={1}>
                        {benefit.name}
                      </Typography>
                      <Chip
                        label={benefit.type}
                        size="small"
                        sx={{ backgroundColor: getBenefitTypeColor(benefit.type), color: 'white' }}
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

export default LoyaltyPrograms;
