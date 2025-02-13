import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Utensils, AlertCircle } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  display_order: number;
}

interface Dish {
  id: string;
  name: string;
  description: string | null;
  price: number;
  category_id: string;
  is_available: boolean;
  is_active: boolean;
}

interface DailyMenuItem {
  id: string;
  dish_id: string;
  is_available: boolean;
  dish: Dish;
}

export function AdminDashboard() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [dailyMenu, setDailyMenu] = useState<DailyMenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      setLoading(true);
      setError(null);

      // Load categories
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('categories')
        .select('*')
        .order('display_order');

      if (categoriesError) throw categoriesError;
      setCategories(categoriesData);

      // Load dishes
      const { data: dishesData, error: dishesError } = await supabase
        .from('dishes')
        .select('*')
        .order('name');

      if (dishesError) throw dishesError;
      setDishes(dishesData);

      // Load daily menu
      const { data: menuData, error: menuError } = await supabase
        .from('daily_menu')
        .select('*, dish:dishes(*)')
        .eq('date', new Date().toISOString().split('T')[0]);

      if (menuError) throw menuError;
      setDailyMenu(menuData);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }

  async function toggleDishAvailability(dishId: string, currentStatus: boolean) {
    try {
      const { error } = await supabase
        .from('daily_menu')
        .update({ is_available: !currentStatus })
        .eq('dish_id', dishId)
        .eq('date', new Date().toISOString().split('T')[0]);

      if (error) throw error;
      await loadData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  }

  async function addDishToMenu(dishId: string) {
    try {
      const { error } = await supabase
        .from('daily_menu')
        .insert([
          {
            dish_id: dishId,
            date: new Date().toISOString().split('T')[0],
            is_available: true
          }
        ]);

      if (error) throw error;
      await loadData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Menu Dashboard</h1>
        <button
          onClick={() => loadData()}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Refresh
        </button>
      </div>

      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <AlertCircle className="h-5 w-5 text-red-400" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <div className="mt-2 text-sm text-red-700">{error}</div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Available Dishes */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Available Dishes</h2>
          <div className="space-y-4">
            {categories.map(category => (
              <div key={category.id}>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                  {category.name}
                </h3>
                <div className="space-y-2">
                  {dishes
                    .filter(dish => dish.category_id === category.id && dish.is_active)
                    .map(dish => {
                      const isInMenu = dailyMenu.some(item => item.dish_id === dish.id);
                      return (
                        <div
                          key={dish.id}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
                        >
                          <div>
                            <div className="font-medium">{dish.name}</div>
                            <div className="text-sm text-gray-500">
                              ${dish.price.toFixed(2)}
                            </div>
                          </div>
                          <button
                            onClick={() => !isInMenu && addDishToMenu(dish.id)}
                            className={`px-3 py-1 rounded-md text-sm font-medium ${
                              isInMenu
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                            }`}
                            disabled={isInMenu}
                          >
                            {isInMenu ? 'Added to Menu' : 'Add to Menu'}
                          </button>
                        </div>
                      );
                    })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Daily Menu */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Today's Menu</h2>
          <div className="space-y-4">
            {categories.map(category => {
              const menuItems = dailyMenu.filter(
                item => item.dish.category_id === category.id
              );
              if (menuItems.length === 0) return null;
              return (
                <div key={category.id}>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                    {category.name}
                  </h3>
                  <div className="space-y-2">
                    {menuItems.map(item => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
                      >
                        <div>
                          <div className="font-medium">{item.dish.name}</div>
                          <div className="text-sm text-gray-500">
                            ${item.dish.price.toFixed(2)}
                          </div>
                        </div>
                        <button
                          onClick={() =>
                            toggleDishAvailability(item.dish_id, item.is_available)
                          }
                          className={`px-3 py-1 rounded-md text-sm font-medium ${
                            item.is_available
                              ? 'bg-green-50 text-green-700 hover:bg-green-100'
                              : 'bg-red-50 text-red-700 hover:bg-red-100'
                          }`}
                        >
                          {item.is_available ? 'Available' : 'Unavailable'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}