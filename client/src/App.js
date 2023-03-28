import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";
import RecipeTest from "./Components/RecipeTest";

import IngredientSearchBar from "./Components/SearchBar";

function App() {
  const [userIngredients, setUserIngredients] = useState([]);

  return (
    <BrowserRouter>
      <GlobalStyles />
      <IngredientSearchBar
        setUserIngredients={setUserIngredients}
        userIngredients={userIngredients}
      />
    </BrowserRouter>
  );
}

export default App;
