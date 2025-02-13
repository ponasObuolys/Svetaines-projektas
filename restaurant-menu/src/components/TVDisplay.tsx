import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
} from '@mui/material';
import { collection, getDocs, onSnapshot, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { Dish, DailyMenu, Category } from '../types';

export const TVDisplay: React.FC = () => {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [dailyMenu, setDailyMenu] = useState<DailyMenu | null>(null);

  useEffect(() => {
    // Fetch all dishes once
    const fetchDishes = async () => {
      const dishesSnapshot = await getDocs(collection(db, 'dishes'));
      const dishesData = dishesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Dish));
      setDishes(dishesData);
    };

    fetchDishes();

    // Subscribe to daily menu changes
    const today = new Date().toISOString().split('T')[0];
    const unsubscribe = onSnapshot(doc(db, 'dailyMenus', today), (doc) => {
      if (doc.exists()) {
        setDailyMenu(doc.data() as DailyMenu);
      }
    });

    return () => unsubscribe();
  }, []);

  const renderCategoryDishes = (category: Category) => {
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

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" align="center" sx={{ mb: 6 }}>
        Dienos meniu
      </Typography>
      {Object.values(Category).map(category => renderCategoryDishes(category))}
    </Container>
  );
}; 