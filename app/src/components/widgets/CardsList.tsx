import React, { useState } from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import CreditCardIcon from '@mui/icons-material/CreditCard';

const CardsList = () => {
    const [cards, setCards] = useState([
        { id: 1, name: 'Visa Rewards', lastFour: '1234', expiryDate: '12/25', cardType: 'Visa' },
        { id: 2, name: 'Mastercard Gold', lastFour: '5678', expiryDate: '06/24', cardType: 'Mastercard' },
        { id: 3, name: 'Amex Platinum', lastFour: '9012', expiryDate: '09/26', cardType: 'American Express' },
    ]);

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
                                primary={card.name}
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            sx={{ color: 'text.primary', display: 'block' }}
                                        >
                                            {card.cardType}
                                        </Typography>
                                        {`**** **** **** ${card.lastFour}`}
                                        <br />
                                        {`Expires: ${card.expiryDate}`}
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
