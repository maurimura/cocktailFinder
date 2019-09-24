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
  if(query.length >= 3) {

    dispatch(requestDrinks(query));
  
    try {
        const res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`)
        const {drinks}: {drinks: Drink[]} = await res.json()
        const normalizeData = drinks.map(
          ({ idDrink, strDrink, strDrinkThumb, ...rest }) => ({
            idDrink,
            strDrink,
            strDrinkThumb
          })
        );
        return dispatch(setDrinks(normalizeData));
    } catch (error) {
        console.error(error)
        // This could be a good place for return an error message
        return dispatch(setDrinks([]));
    }
  }else{
    return dispatch(setDrinks([]))
  }
  
};

export const clear = (): ClearAction => {
  return {
    type: CLEAR
  }
}
