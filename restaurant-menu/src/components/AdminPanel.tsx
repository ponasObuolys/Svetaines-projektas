import React, { useState, useEffect, useCallback } from 'react';
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
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  IconButton,
} from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import { Dish, DailyMenu } from '../types';
import { isAuthenticated, logout } from '../utils/auth';
import {
  getAllDishes,
  getDailyMenu,
  addDishToMenu,
  toggleDishAvailability,
  removeDishFromMenu,
  updateDishPrice,
} from '../utils/menuService';

export const AdminPanel: React.FC = () => {
  const navigate = useNavigate();
  const [dishes, setDishes] = useState<Dish[]>(getAllDishes());
  const [dailyMenu, setDailyMenu] = useState<DailyMenu | null>(getDailyMenu());
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [newPrice, setNewPrice] = useState<string>('');
  const [pinDialogOpen, setPinDialogOpen] = useState(false);
  const [priceDialogOpen, setPriceDialogOpen] = useState(false);
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

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

  const handlePriceUpdate = (dish: Dish) => {
    setSelectedDish(dish);
    setNewPrice(dish.price.toString());
    setPinDialogOpen(true);
    setPin('');
    setError('');
  };

  const handlePinSubmit = useCallback(() => {
    if (pin === '3438' && selectedDish) {
      setPinDialogOpen(false);
      setPriceDialogOpen(true);
    } else {
      setError('Neteisingas PIN kodas');
    }
  }, [pin, selectedDish]);

  const handlePriceSubmit = useCallback(() => {
    if (selectedDish) {
      const updatedPrice = parseFloat(newPrice);
      if (!isNaN(updatedPrice) && updatedPrice > 0) {
        updateDishPrice(selectedDish.id, updatedPrice);
        setDishes(getAllDishes());
        setDailyMenu(getDailyMenu());
        setPriceDialogOpen(false);
        setError('');
      } else {
        setError('Netinkama kaina');
      }
    }
  }, [selectedDish, newPrice]);

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
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, my: 1 }}>
                    <Typography color="textSecondary">
                      {dish.price} €
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={() => handlePriceUpdate(dish)}
                      sx={{ ml: 1 }}
                    >
                      <CreateIcon fontSize="small" />
                    </IconButton>
                  </Box>
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

      <Dialog open={pinDialogOpen} onClose={() => setPinDialogOpen(false)}>
        <DialogTitle>Įveskite PIN kodą</DialogTitle>
        <DialogContent>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <TextField
            autoFocus
            margin="dense"
            label="PIN kodas"
            type="password"
            fullWidth
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            inputProps={{ maxLength: 4 }}
            onKeyPress={(e) => e.key === 'Enter' && handlePinSubmit()}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPinDialogOpen(false)}>Atšaukti</Button>
          <Button onClick={handlePinSubmit}>Patvirtinti</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={priceDialogOpen} onClose={() => setPriceDialogOpen(false)}>
        <DialogTitle>Įveskite naują kainą</DialogTitle>
        <DialogContent>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <TextField
            autoFocus
            margin="dense"
            label="Nauja kaina"
            type="number"
            fullWidth
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
            inputProps={{ step: '0.10' }}
            onKeyPress={(e) => e.key === 'Enter' && handlePriceSubmit()}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPriceDialogOpen(false)}>Atšaukti</Button>
          <Button onClick={handlePriceSubmit}>Išsaugoti</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}; 