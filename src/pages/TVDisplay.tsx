import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { format } from 'date-fns';

interface Category {
  id: string;
  name: string;
  display_order: number;
}

interface MenuItem {
  id: string;
  dish: {
    id: string;
    name: string;
    description: string | null;
    price: number;
    category_id: string;
  };
  is_available: boolean;
}

export function TVDisplay() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    loadData();

    // Set up real-time subscription
    const menuSubscription = supabase
      .channel('daily-menu-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'daily_menu'
        },
        () => {
          loadData();
        }
      )
      .subscribe();

    // Update time every minute
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => {
      supabase.removeChannel(menuSubscription);
      clearInterval(timeInterval);
    };
  }, []);

  async function loadData() {
    try {
      // Load categories
      const { data: categoriesData } = await supabase
        .from('categories')
        .select('*')
        .order('display_order');

      if (categoriesData) {
        setCategories(categoriesData);
      }

      // Load daily menu with available items
      const { data: menuData } = await supabase
        .from('daily_menu')
        .select('*, dish:dishes(*)')
        .eq('date', new Date().toISOString().split('T')[0]);

      if (menuData) {
        setMenuItems(menuData);
      }
    } catch (error) {
      console.error('Error loading menu data:', error);
    }
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Today's Menu</h1>
          <p className="text-xl text-gray-400">
            {format(currentTime, 'EEEE, MMMM d, yyyy')}
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {categories.map(category => {
            const items = menuItems.filter(
              item => item.dish.category_id === category.id && item.is_available
            );
            if (items.length === 0) return null;

            return (
              <div key={category.id} className="space-y-6">
                <h2 className="text-2xl font-semibold border-b border-gray-700 pb-2">
                  {category.name}
                </h2>
                <div className="space-y-6">
                  {items.map(item => (
                    <div key={item.id} className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-xl font-medium">{item.dish.name}</h3>
                        {item.dish.description && (
                          <p className="text-gray-400 mt-1">{item.dish.description}</p>
                        )}
                      </div>
                      <div className="text-xl font-semibold ml-4">
                        ${item.dish.price.toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}