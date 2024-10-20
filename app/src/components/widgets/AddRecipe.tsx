import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  Typography, 
  Paper, 
  Grid,
  CircularProgress,
  Snackbar,
  IconButton
} from '@mui/material';
import { PhotoCamera, Close } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import axiosPrivate from '../../ctx/axiosPrivate';

const Input = styled('input')({
  display: 'none',
});

const AddRecipe: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file) {
      setSnackbar({ open: true, message: 'Please select a photo' });
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('photo', file);

    try {
      const response = await axiosPrivate.post('api/recipes/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setSnackbar({ open: true, message: 'Recipe added successfully!' });
      console.log(response.data);
      // You might want to do something with the response data here
    } catch (error) {
      setSnackbar({ open: true, message: 'Error adding recipe. Please try again.' });
      console.error('Error adding recipe:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Add New Receipt
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <label htmlFor="icon-button-file">
                <Input accept="image/*" id="icon-button-file" type="file" onChange={handleFileChange} />
                <IconButton color="primary" aria-label="upload picture" component="span">
                  <PhotoCamera />
                </IconButton>
              </label>
              {file && (
                <Typography variant="body2" color="textSecondary">
                  {file.name}
                </Typography>
              )}
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              type="submit"
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : null}
            >
              {loading ? 'Processing...' : 'Add Receipt'}
            </Button>
          </Grid>
        </Grid>
      </form>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={() => setSnackbar({ ...snackbar, open: false })}
          >
            <Close fontSize="small" />
          </IconButton>
        }
      />
    </Paper>
  );
};

export default AddRecipe;
