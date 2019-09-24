import {
  AppState,
  DrinksActionTypes,
  RECIEVE_DRINKS,
  REQUEST_DRINKS,
  CLEAR
} from "./types";

export const initialState: AppState = {
  drinks: [],
  isLoading: false
};

const drinksReducer = (state = initialState, action: DrinksActionTypes) => {
  switch (action.type) {
    case REQUEST_DRINKS:
      return { ...state, isLoading: true };

    case RECIEVE_DRINKS:
      return { ...state, drinks: action.payload, isLoading: false };

    case CLEAR:
      return initialState;
      
    default:
      return state;
  }
};

export default drinksReducer;
