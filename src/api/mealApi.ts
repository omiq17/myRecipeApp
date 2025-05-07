import { Meal, MealResponse } from '../models/Meal';

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export const fetchMealsByCategory = async (category: string): Promise<Meal[]> => {
  try {
    const response = await fetch(`${BASE_URL}/filter.php?c=${category}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data: MealResponse = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error('Error fetching meals by category:', error);
    throw error;
  }
};

export const fetchMealDetails = async (id: string): Promise<Meal | null> => {
  try {
    const response = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data: MealResponse = await response.json();
    return data.meals && data.meals.length > 0 ? data.meals[0] : null;
  } catch (error) {
    console.error('Error fetching meal details:', error);
    throw error;
  }
};

export const fetchCategories = async (): Promise<string[]> => {
  try {
    const response = await fetch(`${BASE_URL}/list.php?c=list`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data.meals ? data.meals.map((item: any) => item.strCategory) : [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};
