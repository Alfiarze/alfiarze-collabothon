import React, { useState, useEffect } from "react";
import {
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
} from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import axiosPrivate from '../../ctx/axiosPrivate';

interface CardData {
  id: number;
  card_type: string;
  card_name: string;
  card_number: string;
  cvv: string;
  date_of_expiry: string;
}

interface FormattedCardData {
  id: number;
  card_type: string;
  card_name: string;
  lastFour: string;
  cvv: string;
  date_of_expiry: string;
}

const CardsList: React.FC = () => {
  const [cards, setCards] = useState<FormattedCardData[]>([]);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axiosPrivate.get<CardData[]>('api/credit-cards/');
        const formattedCards = response.data.map((card) => ({
          id: card.id,
          card_type: card.card_type,
          card_name: card.card_name,
          lastFour: card.card_number.slice(-4),
          cvv: card.cvv,
          date_of_expiry: card.date_of_expiry,
        }));
        setCards(formattedCards);
      } catch (error) {
        console.error('Error fetching credit cards:', error);
      }
    };

    fetchCards();
  }, []);

  return (
    <div>
      <Typography variant="h5" component="h2" gutterBottom>
        Your Credit Cards
      </Typography>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {cards.map((card, index) => (
          <React.Fragment key={card.id}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar>
                  <CreditCardIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={card.card_name}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      sx={{ color: 'text.primary', display: 'block' }}
                    >
                      {card.card_type}
                    </Typography>
                    {`**** **** **** ${card.lastFour}`}
                    <br />
                    {`CVV: ${card.cvv}`}
                    <br />
                    {`Expires: ${card.date_of_expiry}`}
                  </React.Fragment>
                }
              />
            </ListItem>
            {index < cards.length - 1 && <Divider variant="inset" component="li" />}
          </React.Fragment>
        ))}
      </List>
    </div>
  );
};

export default CardsList;
