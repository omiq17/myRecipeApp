import { useState, useEffect } from 'react';
import { Meal, MealsByCategory } from '../models/Meal';
import { fetchMealsByCategory, fetchCategories } from '../api/mealApi';
import { 
  storeMeals, 
  getStoredMeals, 
} from '../services/storageService';
import { useNetwork } from '../contexts/NetworkContext';

export const useMeals = () => {
  const [allMealsByCategory, setAllMealsByCategory] = useState<MealsByCategory[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [currentMeals, setCurrentMeals] = useState<Meal[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { isConnected } = useNetwork();
  // console.log('allMealsByCategory', allMealsByCategory);

  // Load categories and meals from storage or API
  useEffect(() => {
    // Avoid re-fetching if already loaded
    if (allMealsByCategory.length > 0) return; 
    
    const loadData = async () => {
      try {
        setIsLoading(true);
        
        // First try to get meals and categories from storage
        const storedMeals = await getStoredMeals();
        if (storedMeals.length > 0) {
          const allCategories = storedMeals.map(item => item.category);
          setAllMealsByCategory(storedMeals);
          setCategories(allCategories);
          setSelectedCategory(allCategories[0]);
        } else {
          // If no data in storage, fetch from API for the first time
            if (isConnected) {
                const freshCategories = await fetchCategories();
                
                // Fetch meals for all the categories and store them by category
                const allMeals = await Promise.all(
                  freshCategories.map(async (category) => {
                    const meals = await fetchMealsByCategory(category);
                    return { category, meals };
                  }
                ));
                
                setCategories(freshCategories);
                setAllMealsByCategory(allMeals);
                setSelectedCategory(freshCategories[0]); 
                await storeMeals(allMeals);
            } else {
                setError('No categories available and offline mode is enabled');
            }
        }
      } catch (err) {
        console.error('Error loading data:', err);
        setError('Failed to load data');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, [isConnected]);

  // Load meals based on selected category
  useEffect(() => {
    if (!selectedCategory) return;

    const mealsByCategory = allMealsByCategory.find(item => item.category === selectedCategory);
    // console.log('Selected category:', selectedCategory, 'Meals:', mealsByCategory);
    setCurrentMeals(mealsByCategory?.meals ?? []);
  }, [selectedCategory]);

  const changeCategory = async (category: string) => {
    setSelectedCategory(category);
  };

  return {
    meals: currentMeals,
    categories,
    selectedCategory,
    isLoading,
    error,
    isConnected,
    changeCategory
  };
};
