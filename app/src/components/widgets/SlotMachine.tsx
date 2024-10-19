import React, { useState } from 'react';
import { Button, Typography, Paper, Grid, Chip, LinearProgress, Fade } from '@mui/material';
import CasinoIcon from '@mui/icons-material/Casino';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const symbols = ['🍒', '🍋', '🍊', '🍇', '🔔', '💎'];

const SlotMachine: React.FC = () => {
  const [reels, setReels] = useState<string[]>(['?', '?', '?']);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState('');
  const [credits, setCredits] = useState(100);

  const spin = () => {
    if (credits < 10) return;
    setCredits(prev => prev - 10);
    setSpinning(true);
    setResult('');
    
    const spinDuration = 2000;
    const intervalDuration = 100;
    let spins = 0;
    
    const spinInterval = setInterval(() => {
      setReels(reels.map(() => symbols[Math.floor(Math.random() * symbols.length)]));
      spins++;
      
      if (spins * intervalDuration >= spinDuration) {
        clearInterval(spinInterval);
        setSpinning(false);
        checkResult();
      }
    }, intervalDuration);
  };

  const checkResult = () => {
    if (reels[0] === reels[1] && reels[1] === reels[2]) {
      setResult('Jackpot!');
      setCredits(prev => prev + 100);
    } else if (reels[0] === reels[1] || reels[1] === reels[2] || reels[0] === reels[2]) {
      setResult('Two of a kind!');
      setCredits(prev => prev + 20);
    } else {
      setResult('Try again!');
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 4, maxWidth: 400, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CasinoIcon sx={{ mr: 1 }} /> Slot Machine
      </Typography>
      
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {reels.map((symbol, index) => (
          <Grid item xs={4} key={index}>
            <Paper 
              elevation={2} 
              sx={{ 
                height: 100, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                fontSize: '3rem',
                backgroundColor: 'primary.light',
                color: 'primary.contrastText'
              }}
            >
              {symbol}
            </Paper>
          </Grid>
        ))}
      </Grid>
      
      <Button 
        variant="contained" 
        onClick={spin} 
        disabled={spinning || credits < 10}
        fullWidth
        size="large"
        sx={{ mb: 2 }}
      >
        {spinning ? 'Spinning...' : 'Spin (10 credits)'}
      </Button>
      
      {spinning && <LinearProgress sx={{ mb: 2 }} />}
      
      <Fade in={!!result}>
        <Chip 
          icon={<EmojiEventsIcon />} 
          label={result} 
          color={result === 'Jackpot!' ? 'success' : result === 'Two of a kind!' ? 'primary' : 'default'}
          sx={{ mb: 2, width: '100%', justifyContent: 'flex-start', py: 2, fontSize: '1.1rem' }}
        />
      </Fade>
      
      <Typography variant="h6" align="center">
        Credits: {credits}
      </Typography>
    </Paper>
  );
};

export default SlotMachine;
