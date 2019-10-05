import React, { useState } from "react";
import { Drink } from "../store/types";
import "./DrinkCard.scss";

const DrinkCard: React.FC<Drink> = ({
  idDrink,
  strDrink,
  strDrinkThumb,
  strInstructions,
  strIngredients
}) => {
  const [showInstructions, setShowInstructions] = useState(false);
  const toggleInstructions = () => setShowInstructions(c => !c);
  return (
    <li key={idDrink} onClick={toggleInstructions}>
      <div className="card">
        <div className="card-image-wrapper">
          <img className="card-image" alt="strDrink" src={strDrinkThumb} />
        </div>
        <div className="card-text-container">
          <p className="card-text">{strDrink}</p>

          {showInstructions && (
            <>
              <h4>Ingredients:</h4>
              <ul>
                {strIngredients.map(ingredient => (
                  <li>{`${ingredient[0]} - ${ingredient[1]}`}</li>
                ))}
              </ul>
              <p>{strInstructions}</p>
            </>
          )}
        </div>
      </div>
    </li>
  );
};

export default DrinkCard;
