import AsyncStorage from '@react-native-async-storage/async-storage';
import { Meal, MealsByCategory } from '../models/Meal';

const MEALS_STORAGE_KEY = '@meals';
const MEAL_DETAILS_STORAGE_KEY = '@mealDetails';

export const storeMeals = async (mealsByCategory: MealsByCategory[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(MEALS_STORAGE_KEY, JSON.stringify(mealsByCategory));
  } catch (error) {
    console.error('Error storing meals:', error);
  }
};


export const getStoredMeals = async (): Promise<MealsByCategory[]> => {
  try {
    const mealsJson = await AsyncStorage.getItem(MEALS_STORAGE_KEY);
    return mealsJson ? JSON.parse(mealsJson) : [];
  } catch (error) {
    console.error('Error retrieving meals:', error);
    return [];
  }
};

export const storeMealDetail = async (meal: Meal): Promise<void> => {
  try {
    const mealsJson = await AsyncStorage.getItem(MEAL_DETAILS_STORAGE_KEY);
    const meals: Meal[] = mealsJson ? JSON.parse(mealsJson) : [];
    const existingMealIndex = meals.findIndex(m => m.idMeal === meal.idMeal);

    if (existingMealIndex !== -1) {
      meals[existingMealIndex] = meal; // Update existing meal
    } else {
      meals.push(meal); // Add new meal
    }

    await AsyncStorage.setItem(MEAL_DETAILS_STORAGE_KEY, JSON.stringify(meals));
  } catch (error) {
    console.error('Error storing meal detail:', error);
  }
};

export const getMealDetail = async (id: string): Promise<Meal | null> => {
  try {
    const mealsJson = await AsyncStorage.getItem(MEAL_DETAILS_STORAGE_KEY);
    const meals: Meal[] = mealsJson ? JSON.parse(mealsJson) : [];
    return meals.find(m => m.idMeal === id) || null;
  } catch (error) {
    console.error('Error retrieving meal detail:', error);
    return null;
  }
};
