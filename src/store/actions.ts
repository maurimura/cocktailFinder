import {
  Drink,
  RecieveDrinksAction,
  RequestDrinksAction,
  RECIEVE_DRINKS,
  REQUEST_DRINKS,
  AppState,
  ClearAction,
  CLEAR
} from "./types";
import { Action } from "redux";

import { ThunkAction } from "redux-thunk";

export const setDrinks = (payload: Drink[]): RecieveDrinksAction => {
  return {
    type: RECIEVE_DRINKS,
    payload
  };
};

export const requestDrinks = (query: string): RequestDrinksAction => {
  return {
    type: REQUEST_DRINKS,
    query
  };
};

export const fetchDrinks = (
  query: string
): ThunkAction<void, AppState, null, Action<string>> => async dispatch => {
  if (query.length >= 3) {
    dispatch(requestDrinks(query));

    try {
      const res = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`
      );
      const { drinks }: { drinks: Drink[] } = await res.json();

      const normalizeData = drinks.map(
        ({ idDrink, strDrink, strDrinkThumb, strInstructions, ...rest }) => ({
          idDrink,
          strDrink,
          strDrinkThumb,
          strInstructions,
          strIngredients: ingredientsBuilder(rest)
        })
      );

      dispatch(setDrinks(normalizeData));
      
    } catch (error) {
      console.error(error);
      dispatch(setDrinks([]));
    }
  } else {
    dispatch(setDrinks([]));
  }
};

export const clear = (): ClearAction => {
  return {
    type: CLEAR
  };
};

const ingredientsBuilder = (data: any): [string, string][] => {
  const ingredients: [string, string][] = [...Array<[string, string]>(15)]
    .map(
      (_, i) =>
        [
          data[`strIngredient${i + 1}`] || "",
          data[`strMeasure${i + 1}`] || ""
        ] as [string, string]
    )
    .filter(ingredient => Boolean(ingredient[1]));

  return ingredients;
};
