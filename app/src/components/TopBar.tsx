import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';

interface TopBarProps {
  editMode: boolean;
  toggleEditMode: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ editMode, toggleEditMode }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Dashboard
        </Typography>
        <Button
          color="inherit"
          onClick={toggleEditMode}
          startIcon={editMode ? <DoneIcon /> : <EditIcon />}
        >
          {editMode ? 'Done' : 'Customize'}
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
