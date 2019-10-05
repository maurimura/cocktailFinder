// Actions types

export const REQUEST_DRINKS = "REQUEST_DRINKS";

export interface RequestDrinksAction {
  type: typeof REQUEST_DRINKS;
  query: string;
}

export const RECIEVE_DRINKS = "RECIEVE_DRINKS";

export interface RecieveDrinksAction {
  type: typeof RECIEVE_DRINKS;
  payload: Drink[];
}

export const CLEAR = "CLEAR";

export interface ClearAction {
  type: typeof CLEAR;
}

export type DrinksActionTypes =
  | RequestDrinksAction
  | RecieveDrinksAction
  | ClearAction;

// State types
export interface Drink {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
  strInstructions: string;
  strIngredients: [string, string][];
}

export interface AppState {
  drinks: Drink[];
  isLoading: boolean;
}
