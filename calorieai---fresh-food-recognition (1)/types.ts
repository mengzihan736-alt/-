
export type View = 'splash' | 'home' | 'scan' | 'result' | 'profile' | 'history' | 'recipes';

export interface Nutrients {
  protein: number;
  carbs: number;
  fat: number;
}

export interface FoodAnalysis {
  dishName: string;
  totalCalories: number;
  accuracy: number;
  nutrients: Nutrients;
  ingredients: string[];
  mealType: string;
  timestamp: string;
  imageUrl?: string;
}

export interface UserStats {
  goal: number;
  eaten: number;
  burned: number;
}

export interface MacroGoal {
  current: number;
  goal: number;
  color: string;
  label: string;
}
