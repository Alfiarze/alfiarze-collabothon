import React, { useState, useEffect } from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
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

const CardsList = () => {
    const [cards, setCards] = useState([
        { id: 1, card_name: 'Visa Rewards', lastFour: '1234', date_of_expiry: '12/25', card_type: 'Visa', cvv: '123' },
        { id: 2, card_name: 'Mastercard Gold', lastFour: '5678', date_of_expiry: '06/24', card_type: 'Mastercard', cvv: '456' },
        { id: 3, card_name: 'Amex Platinum', lastFour: '9012', date_of_expiry: '09/26', card_type: 'American Express', cvv: '789' },
    ]);

    // ... existing imports ...

useEffect(() => {
    axiosPrivate.get<CardData[]>('api/credit-cards/').then((res) => {
        console.log(res.data);
        setCards(res.data.map((card) => ({
            id: card.id,
            card_type: card.card_type,
            card_name: card.card_name,
            lastFour: card.card_number.slice(-4),
            cvv: card.cvv,
            date_of_expiry: card.date_of_expiry,
        })));
    });
}, []);

// ... rest of the component ...

    return (
        <div>
            <h1>Your Credit Cards</h1>
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
                                        {`${card.cvv}`}
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
    )
}

export default CardsList;
