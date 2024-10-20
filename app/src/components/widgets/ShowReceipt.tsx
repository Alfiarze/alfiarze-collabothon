import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Typography 
} from '@mui/material';

const ShowReceipt: React.FC = () => {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get<any[]>('/api/recipes/');
        console.log(response.data); // Log the response to check the data
        setRecipes(response.data);
      } catch (err) {
        setError('Failed to fetch recipes');
      }
    };

    fetchRecipes();
  }, []);

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Store</TableCell>
            <TableCell>Total Price</TableCell>
            <TableCell>NIP</TableCell>
            <TableCell>Ingredients</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(recipes) ? recipes.map((recipe, index) => (
            <TableRow key={index}>
              <TableCell>{recipe.date || 'N/A'}</TableCell>
              <TableCell>{recipe.sklep || 'N/A'}</TableCell>
              <TableCell>{recipe.cena_laczna || 'N/A'}</TableCell>
              <TableCell>{recipe.NIP || 'N/A'}</TableCell>
              <TableCell>
                {recipe.produkty.map((item: any, idx: number) => (
                  <div key={idx}>
                    {item.nazwa} - {item.cena_jednostkowa} x {item.ilosc}
                  </div>
                ))}
              </TableCell>
            </TableRow>
          )) : <TableRow><TableCell colSpan={5}>No data available</TableCell></TableRow>}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ShowReceipt;
