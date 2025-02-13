import { sampleDishes } from '../sampleData';
import { Dish, DailyMenu, DailyMenuItem } from '../types';

const DAILY_MENU_KEY = 'dailyMenu';

export const getAllDishes = (): Dish[] => {
  return sampleDishes;
};

export const getDailyMenu = (): DailyMenu | null => {
  const stored = localStorage.getItem(DAILY_MENU_KEY);
  if (!stored) return null;
  
  try {
    return JSON.parse(stored) as DailyMenu;
  } catch {
    return null;
  }
};

export const saveDailyMenu = (menu: DailyMenu): void => {
  localStorage.setItem(DAILY_MENU_KEY, JSON.stringify(menu));
};

export const createDailyMenu = (): DailyMenu => {
  const today = new Date().toISOString().split('T')[0];
  return {
    id: today,
    date: today,
    items: []
  };
};

export const addDishToMenu = (dish: Dish): void => {
  let menu = getDailyMenu();
  if (!menu) {
    menu = createDailyMenu();
  }

  if (!menu.items.some(item => item.dishId === dish.id)) {
    menu.items.push({
      dishId: dish.id,
      available: true
    });
    saveDailyMenu(menu);
  }
};

export const toggleDishAvailability = (dishId: string): void => {
  const menu = getDailyMenu();
  if (!menu) return;

  const updatedItems = menu.items.map(item =>
    item.dishId === dishId ? { ...item, available: !item.available } : item
  );

  saveDailyMenu({
    ...menu,
    items: updatedItems
  });
};

export const removeDishFromMenu = (dishId: string): void => {
  const menu = getDailyMenu();
  if (!menu) return;

  const updatedItems = menu.items.filter(item => item.dishId !== dishId);
  saveDailyMenu({
    ...menu,
    items: updatedItems
  });
}; 