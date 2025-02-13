import React, { useState, useEffect } from 'react';
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
import { collection, getDocs, setDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { Dish, DailyMenu, Category } from '../types';

export const AdminPanel: React.FC = () => {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [dailyMenu, setDailyMenu] = useState<DailyMenu | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch dishes
      const dishesSnapshot = await getDocs(collection(db, 'dishes'));
      const dishesData = dishesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Dish));
      setDishes(dishesData);

      // Fetch today's menu
      const today = new Date().toISOString().split('T')[0];
      const menuDoc = await getDocs(collection(db, 'dailyMenus'));
      const todayMenu = menuDoc.docs.find(doc => doc.data().date === today);
      
      if (todayMenu) {
        setDailyMenu(todayMenu.data() as DailyMenu);
      }
    };

    fetchData();
  }, []);

  const toggleDishAvailability = async (dishId: string) => {
    if (!dailyMenu) return;

    const updatedItems = dailyMenu.items.map(item =>
      item.dishId === dishId ? { ...item, available: !item.available } : item
    );

    const updatedMenu = {
      ...dailyMenu,
      items: updatedItems,
    };

    await setDoc(doc(db, 'dailyMenus', dailyMenu.id), updatedMenu);
    setDailyMenu(updatedMenu);
  };

  const addToMenu = async (dish: Dish) => {
    if (!dailyMenu) {
      const today = new Date().toISOString().split('T')[0];
      const newMenu: DailyMenu = {
        id: today,
        date: today,
        items: [{ dishId: dish.id, available: true }],
      };
      await setDoc(doc(db, 'dailyMenus', today), newMenu);
      setDailyMenu(newMenu);
    } else {
      const updatedItems = [
        ...dailyMenu.items,
        { dishId: dish.id, available: true },
      ];
      const updatedMenu = {
        ...dailyMenu,
        items: updatedItems,
      };
      await setDoc(doc(db, 'dailyMenus', dailyMenu.id), updatedMenu);
      setDailyMenu(updatedMenu);
    }
  };

  const renderDishesbyCategory = (category: Category) => {
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
                    onClick={() => addToMenu(dish)}
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

  return (
    <Container>
      <Typography variant="h4" sx={{ my: 4 }}>
        Dienos meniu valdymas
      </Typography>
      
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
                    <Switch
                      checked={item.available}
                      onChange={() => toggleDishAvailability(item.dishId)}
                    />
                    <Typography>
                      {item.available ? 'Galima' : 'Negalima'}
                    </Typography>
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
      {Object.values(Category).map(category => renderDishesbyCategory(category))}
    </Container>
  );
}; 