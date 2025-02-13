import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
} from '@mui/material';
import { Dish, DailyMenu } from '../types';
import { getAllDishes, getDailyMenu } from '../utils/menuService';

export const TVDisplay: React.FC = () => {
  const [dishes] = useState<Dish[]>(getAllDishes());
  const [dailyMenu, setDailyMenu] = useState<DailyMenu | null>(getDailyMenu());

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedMenu = getDailyMenu();
      setDailyMenu(updatedMenu);
    }, 5000); // Check for updates every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const renderCategoryDishes = (category: string) => {
    const menuItems = dailyMenu?.items || [];
    const categoryDishes = dishes
      .filter(dish => dish.category === category)
      .filter(dish => menuItems.some(item => item.dishId === dish.id));

    if (categoryDishes.length === 0) return null;

    return (
      <Box key={category} sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ mb: 2, color: 'primary.main' }}>
          {category}
        </Typography>
        <Grid container spacing={2}>
          {categoryDishes.map(dish => {
            const menuItem = menuItems.find(item => item.dishId === dish.id);
            const isAvailable = menuItem?.available ?? false;

            return (
              <Grid item xs={12} sm={6} key={dish.id}>
                <Paper
                  sx={{
                    p: 2,
                    opacity: isAvailable ? 1 : 0.5,
                    textDecoration: isAvailable ? 'none' : 'line-through',
                  }}
                >
                  <Typography variant="h6" component="div">
                    {dish.name}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {dish.price} €
                  </Typography>
                  {!isAvailable && (
                    <Typography color="error">
                      Šiuo metu negalima
                    </Typography>
                  )}
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    );
  };

  const categories = [...new Set(dishes.map(dish => dish.category))];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" align="center" sx={{ mb: 6 }}>
        Dienos meniu
      </Typography>
      {categories.map(category => renderCategoryDishes(category))}
    </Container>
  );
}; 