import React from "react";
import "./App.scss";
import { useSelector } from "react-redux";
import { AppState } from "./store/types";

import DrinkList from "./components/DrinksList";
import Search from "./components/Search";

const App: React.FC = props => {
  const { drinks, isLoading } = useSelector<AppState, AppState>(state => state);
  return (
    <main className="App">
      <Search hasContent={drinks.length > 0} isLoading={isLoading} />
      <DrinkList drinks={drinks} isLoading={isLoading} />
    </main>
  );
};

export default App;
