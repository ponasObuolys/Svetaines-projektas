import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Switch,
  Button,
} from '@mui/material';
import { Dish, DailyMenu } from '../types';
import { isAuthenticated, logout } from '../utils/auth';
import {
  getAllDishes,
  getDailyMenu,
  addDishToMenu,
  toggleDishAvailability,
  removeDishFromMenu
} from '../utils/menuService';

export const AdminPanel: React.FC = () => {
  const navigate = useNavigate();
  const [dishes] = useState<Dish[]>(getAllDishes());
  const [dailyMenu, setDailyMenu] = useState<DailyMenu | null>(getDailyMenu());

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleAddToMenu = (dish: Dish) => {
    addDishToMenu(dish);
    setDailyMenu(getDailyMenu());
  };

  const handleToggleAvailability = (dishId: string) => {
    toggleDishAvailability(dishId);
    setDailyMenu(getDailyMenu());
  };

  const handleRemoveFromMenu = (dishId: string) => {
    removeDishFromMenu(dishId);
    setDailyMenu(getDailyMenu());
  };

  const renderDishesbyCategory = (category: string) => {
    const categoryDishes = dishes.filter(dish => dish.category === category);
    
    return (
      <Box key={category} sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          {category}
        </Typography>
        <Grid container spacing={2}>
          {categoryDishes.map(dish => (
            <Grid item xs={12} sm={6} md={4} key={dish.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{dish.name}</Typography>
                  <Typography color="textSecondary">
                    {dish.price} €
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={() => handleAddToMenu(dish)}
                    disabled={dailyMenu?.items.some(item => item.dishId === dish.id)}
                  >
                    Pridėti į dienos meniu
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };

  const categories = [...new Set(dishes.map(dish => dish.category))];

  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 4 }}>
        <Typography variant="h4">
          Dienos meniu valdymas
        </Typography>
        <Button variant="outlined" onClick={handleLogout}>
          Atsijungti
        </Button>
      </Box>
      
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Dienos meniu
        </Typography>
        <Grid container spacing={2}>
          {dailyMenu?.items.map(item => {
            const dish = dishes.find(d => d.id === item.dishId);
            return dish ? (
              <Grid item xs={12} sm={6} md={4} key={item.dishId}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{dish.name}</Typography>
                    <Typography color="textSecondary">
                      {dish.price} €
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                      <Switch
                        checked={item.available}
                        onChange={() => handleToggleAvailability(item.dishId)}
                      />
                      <Typography>
                        {item.available ? 'Galima' : 'Negalima'}
                      </Typography>
                    </Box>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleRemoveFromMenu(item.dishId)}
                      sx={{ mt: 1 }}
                    >
                      Pašalinti
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ) : null;
          })}
        </Grid>
      </Box>

      <Typography variant="h5" sx={{ mb: 2 }}>
        Visi patiekalai
      </Typography>
      {categories.map(category => renderDishesbyCategory(category))}
    </Container>
  );
}; 