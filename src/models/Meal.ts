export interface Meal {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
    strCategory?: string;
    strArea?: string;
    strInstructions?: string;
    strTags?: string;
    strYoutube?: string;
  }
  
  export interface MealResponse {
    meals: Meal[] | null;
  }

  export interface MealsByCategory {
    category: string;
    meals: Meal[];
  }
  