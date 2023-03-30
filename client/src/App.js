import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";

import IngredientSearchBar from "./Components/SearchBar";
import IngredientsSideBar from "./Components/IngredientsSideBar";
import Title from "./Components/Title";
import MainRecipe from "./Components/MainRecipe";
import DietBar from "./Components/DietBar";
import SignInProfile from "./Components/SignInProfile";
import RecipeBar from "./Components/RecipeBar";

function App() {
  const [userIngredients, setUserIngredients] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const [items, setItems] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [recipes, setRecipes] = useState([]);

  return (
    <BrowserRouter>
      <GlobalStyles />
      <MasterWrapper>
        <LeftWrapper>
          <Title />
          <IngredientsSideBar
            userIngredients={userIngredients}
            setRefresh={setRefresh}
            refresh={refresh}
            items={items}
            setItems={setItems}
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
          />
        </LeftWrapper>

        <CenterWrapper>
          <IngredientSearchBar
            setUserIngredients={setUserIngredients}
            userIngredients={userIngredients}
            setRefresh={setRefresh}
            resfresh={refresh}
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
            recipes={recipes}
            setRecipes={setRecipes}
          />
          <DietBar />
          <MainRecipe recipes={recipes} setRecipes={setRecipes} />
        </CenterWrapper>
        <RightWrapper>
          <SignInProfile />
          <RecipeBar />
        </RightWrapper>
      </MasterWrapper>
    </BrowserRouter>
  );
}

const RightWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 10%;
  background-color: antiquewhite;
`;

const LeftWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 20.2%;
`;

const CenterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 69.8%;
`;

const MasterWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;
export default App;
