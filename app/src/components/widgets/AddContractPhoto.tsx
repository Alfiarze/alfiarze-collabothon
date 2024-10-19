import React, { useState, ChangeEvent } from 'react';
import { 
  Box, 
  Button, 
  Typography, 
  Paper, 
  Grid,
  CircularProgress,
  Snackbar,
  IconButton,
  TextField
} from '@mui/material';
import { Close, CloudUpload } from '@mui/icons-material';
import axiosPrivate from '../../ctx/axiosPrivate';

const AddContract: React.FC = () => {
  const [contractData, setContractData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    photo: null as File | null
  });
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = event.target;
    if (name === 'photo' && files && files[0]) {
      setContractData(prevData => ({ ...prevData, [name]: files[0] }));
      setPreviewUrl(URL.createObjectURL(files[0]));
    } else {
      setContractData(prevData => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData();
    Object.entries(contractData).forEach(([key, value]) => {
      if (value !== null) formData.append(key, value);
    });

    try {
      const response = await axiosPrivate.post('api/contracts/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setSnackbar({ open: true, message: 'Contract added successfully!' });
      console.log(response.data);
      // Reset form after successful submission
      setContractData({ title: '', description: '', startDate: '', endDate: '', photo: null });
      setPreviewUrl(null);
    } catch (error) {
      setSnackbar({ open: true, message: 'Error adding contract. Please try again.' });
      console.error('Error adding contract:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Add New Contract
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Contract Title"
              name="title"
              value={contractData.title}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={contractData.description}
              onChange={handleInputChange}
              multiline
              rows={4}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Start Date"
              name="startDate"
              type="date"
              value={contractData.startDate}
              onChange={handleInputChange}
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="End Date"
              name="endDate"
              type="date"
              value={contractData.endDate}
              onChange={handleInputChange}
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="outlined"
              component="label"
              startIcon={<CloudUpload />}
              fullWidth
            >
              Upload Photo
              <input
                type="file"
                hidden
                name="photo"
                onChange={handleInputChange}
                accept="image/*"
              />
            </Button>
          </Grid>
          {previewUrl && (
            <Grid item xs={12}>
              <Box sx={{ mt: 2, textAlign: 'center' }}>
                <img src={previewUrl} alt="Contract Preview" style={{ maxWidth: '100%', maxHeight: '200px' }} />
              </Box>
            </Grid>
          )}
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              type="submit"
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : null}
            >
              {loading ? 'Processing...' : 'Add Contract'}
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

export default AddContract;
