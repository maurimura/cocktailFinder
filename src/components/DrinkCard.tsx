import React from "react";
import { Drink } from "../store/types";
import "./DrinkCard.scss";

const DrinkCard: React.FC<Drink> = ({ idDrink, strDrink, strDrinkThumb }) => {
  return (
    <li key={idDrink}>
      <div className="card">
        <div className="card-image-wrapper">

          <img
            className="card-image"
            alt="strDrink"
            src={strDrinkThumb}
          />
        </div>
        <p className="card-text">{strDrink}</p>
      </div>
    </li>
  );
};

export default DrinkCard;
