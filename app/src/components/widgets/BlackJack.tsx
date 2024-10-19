import React, { useState, useEffect } from 'react';
import { Button, Box, Typography, Paper, Grid, Chip, Divider, Card, CardContent, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import CasinoIcon from '@mui/icons-material/Casino';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

// Define card suits and values
const suits = ['♠', '♥', '♦', '♣'];
const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

// Custom styled components
interface PlayingCardProps {
  suit: string;
}

const PlayingCard = styled(Paper)<PlayingCardProps>(({ theme, suit }) => ({
  width: 60,
  height: 90,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '1.5rem',
  fontWeight: 'bold',
  margin: theme.spacing(0.5),
  color: ['♥', '♦'].includes(suit) ? 'red' : 'black',
}));

const Blackjack: React.FC = () => {
  const [deck, setDeck] = useState<string[]>([]);
  const [playerHand, setPlayerHand] = useState<string[]>([]);
  const [dealerHand, setDealerHand] = useState<string[]>([]);
  const [gameState, setGameState] = useState<'betting' | 'playing' | 'dealerTurn' | 'gameOver'>('betting');
  const [bet, setBet] = useState(10);
  const [balance, setBalance] = useState(1000);
  const [message, setMessage] = useState('Place your bet!');

  // Initialize and shuffle deck
  useEffect(() => {
    const newDeck = suits.flatMap(suit => values.map(value => `${value}${suit}`));
    setDeck(shuffleDeck(newDeck));
  }, []);

  const shuffleDeck = (deck: string[]) => {
    return deck.sort(() => Math.random() - 0.5);
  };

  const drawCard = () => {
    const card = deck.pop();
    setDeck([...deck]);
    return card!;
  };

  const startGame = () => {
    if (balance < bet) {
      setMessage("Not enough balance!");
      return;
    }
    setBalance(balance - bet);
    setPlayerHand([drawCard(), drawCard()]);
    setDealerHand([drawCard()]);
    setGameState('playing');
    setMessage('Hit or Stand?');
  };

  const hit = () => {
    const newHand = [...playerHand, drawCard()];
    setPlayerHand(newHand);
    if (calculateHandValue(newHand) > 21) {
      setGameState('gameOver');
      setMessage('Bust! You lose!');
    }
  };

  const stand = () => {
    setGameState('dealerTurn');
    dealerPlay();
  };

  const dealerPlay = () => {
    let newDealerHand = [...dealerHand];
    while (calculateHandValue(newDealerHand) < 17) {
      newDealerHand.push(drawCard());
    }
    setDealerHand(newDealerHand);
    determineWinner(newDealerHand);
  };

  const determineWinner = (finalDealerHand: string[]) => {
    const playerValue = calculateHandValue(playerHand);
    const dealerValue = calculateHandValue(finalDealerHand);

    if (dealerValue > 21 || playerValue > dealerValue) {
      setBalance(balance + bet * 2);
      setMessage('You win!');
    } else if (dealerValue > playerValue) {
      setMessage('Dealer wins!');
    } else {
      setBalance(balance + bet);
      setMessage('Push!');
    }
    setGameState('gameOver');
  };

  const calculateHandValue = (hand: string[]) => {
    let value = 0;
    let aces = 0;
    for (let card of hand) {
      const cardValue = card[0];
      if (cardValue === 'A') {
        aces += 1;
        value += 11;
      } else if (['K', 'Q', 'J'].includes(cardValue)) {
        value += 10;
      } else {
        value += parseInt(cardValue);
      }
    }
    while (value > 21 && aces > 0) {
      value -= 10;
      aces -= 1;
    }
    return value;
  };

  const resetGame = () => {
    setPlayerHand([]);
    setDealerHand([]);
    setGameState('betting');
    setMessage('Place your bet!');
    if (deck.length < 20) {
      setDeck(shuffleDeck(suits.flatMap(suit => values.map(value => `${value}${suit}`))));
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 4, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CasinoIcon sx={{ mr: 1 }} /> Blackjack
      </Typography>

      <Box sx={{ mb: 2 }}>
        <Typography variant="h6">Balance: ${balance}</Typography>
        {gameState === 'betting' && (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', my: 2 }}>
            <IconButton onClick={() => setBet(Math.max(5, bet - 5))} disabled={gameState !== 'betting'}>
              <RemoveIcon />
            </IconButton>
            <Typography variant="h6" sx={{ mx: 2 }}>Bet: ${bet}</Typography>
            <IconButton onClick={() => setBet(Math.min(100, bet + 5))} disabled={gameState !== 'betting'}>
              <AddIcon />
            </IconButton>
          </Box>
        )}
      </Box>

      <Divider sx={{ my: 2 }} />

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6">Your Hand ({calculateHandValue(playerHand)})</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
            {playerHand.map((card, index) => (
              <PlayingCard key={index} suit={card.slice(-1)}>{card}</PlayingCard>
            ))}
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6">Dealer's Hand ({calculateHandValue(dealerHand)})</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
            {dealerHand.map((card, index) => (
              <PlayingCard key={index} suit={card.slice(-1)}>{card}</PlayingCard>
            ))}
            {gameState !== 'dealerTurn' && gameState !== 'gameOver' && dealerHand.length === 1 && (
              <PlayingCard suit="?">?</PlayingCard>
            )}
          </Box>
        </Grid>
      </Grid>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        {gameState === 'betting' && (
          <Button variant="contained" color="primary" onClick={startGame}>Deal</Button>
        )}
        {gameState === 'playing' && (
          <>
            <Button variant="contained" color="primary" onClick={hit} sx={{ mr: 1 }}>Hit</Button>
            <Button variant="contained" color="secondary" onClick={stand}>Stand</Button>
          </>
        )}
        {gameState === 'gameOver' && (
          <Button variant="contained" color="primary" onClick={resetGame}>New Game</Button>
        )}
      </Box>

      <Typography variant="h6" align="center" sx={{ mt: 2 }}>{message}</Typography>
    </Paper>
  );
};

export default Blackjack;

