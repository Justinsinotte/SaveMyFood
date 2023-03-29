import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";
import RecipeTest from "./Components/RecipeTest";

import IngredientSearchBar from "./Components/SearchBar";
import IngredientsSideBar from "./Components/IngredientsSideBar";

function App() {
  const [userIngredients, setUserIngredients] = useState([]);
  const [refresh, setRefresh] = useState(true);
  return (
    <BrowserRouter>
      <GlobalStyles />
      <IngredientsSideBar
        userIngredients={userIngredients}
        setRefresh={setRefresh}
        refresh={refresh}
      />
      <IngredientSearchBar
        setUserIngredients={setUserIngredients}
        userIngredients={userIngredients}
        setRefresh={setRefresh}
        resfresh={refresh}
      />
    </BrowserRouter>
  );
}

export default App;
