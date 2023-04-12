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

import Profile from "./Components/Profile";
import RecipeDetails from "./Components/RecipeDetail";

function App() {
  const [isGluten, setIsGluten] = useState(false);
  const [isDairy, setIsDairy] = useState(false);
  const [isVegan, setIsVegan] = useState(false);
  const [isVegetarian, setIsVegetarian] = useState(false);
  const [item, setItem] = useState(null);
  const [recItemId, setRecItemId] = useState(null);
  const [userIngredients, setUserIngredients] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const [items, setItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [bulkRecipes, setBulkRecipes] = useState([]);
  const [isDisabled, setIsDisabled] = useState(() => {
    const disabledObject = window.localStorage.getItem("isDisabled");
  
    if (JSON.parse(disabledObject)) {
      return JSON.parse(disabledObject);
    } else {
      return {};
    }
  });

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
            bulkRecipes={bulkRecipes}
            setBulkRecipes={setBulkRecipes}
          />
          <DietBar
            isGluten={isGluten}
            setIsGluten={setIsGluten}
            isDairy={isDairy}
            setIsDairy={setIsDairy}
            isVegan={isVegan}
            setIsVegan={setIsVegan}
            isVegetarian={isVegetarian}
            setIsVegetarian={setIsVegetarian}
            recItemId={recItemId}
            setRecItemId={setRecItemId}
          />
          <Routes>
            <Route
              path="/recipeDetail/:itemId"
              element={
                <MainRecipe
                  recipes={recipes}
                  setRecipes={setRecipes}
                  refresh={refresh}
                  isDisabled={isDisabled}
                  setIsDisabled={setIsDisabled}
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                  isGluten={isGluten}
                  setIsGluten={setIsGluten}
                  isDairy={isDairy}
                  setIsDairy={setIsDairy}
                  isVegan={isVegan}
                  setIsVegan={setIsVegan}
                  isVegetarian={isVegetarian}
                  setIsVegetarian={setIsVegetarian}
                />
              }
            />
            <Route
              path="/"
              element={
                <MainRecipe
                  recipes={recipes}
                  setRecipes={setRecipes}
                  refresh={refresh}
                  isDisabled={isDisabled}
                  setIsDisabled={setIsDisabled}
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                  isGluten={isGluten}
                  setIsGluten={setIsGluten}
                  isDairy={isDairy}
                  setIsDairy={setIsDairy}
                  isVegan={isVegan}
                  setIsVegan={setIsVegan}
                  isVegetarian={isVegetarian}
                  setIsVegetarian={setIsVegetarian}
                />
              }
            />
            <Route
              path="/savedrecipes"
              element={
                <Profile
                  setRefresh={setRefresh}
                  refresh={refresh}
                  isDisabled={isDisabled}
                  setIsDisabled={setIsDisabled}
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                  item={item}
                  setItem={setItem}
                />
              }
            />
            <Route
              path="/recipeDetails/:itemId"
              element={
                <Profile
                  setRefresh={setRefresh}
                  refresh={refresh}
                  isDisabled={isDisabled}
                  setIsDisabled={setIsDisabled}
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                  item={item}
                  setItem={setItem}
                  recItemId={recItemId}
                  setRecItemId={setRecItemId}
                />
              }
            />
          </Routes>
        </CenterWrapper>
        <SignInProfile />
        <RightWrapper>
          <Routes>
            {/* <Route path="/" element={<RecipeBar />} /> */}
            <Route
              path="/savedrecipes"
              element={
                <RecipeDetails
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                  setIsDisabled={setIsDisabled}
                  recItemId={recItemId}
                  setRecItemId={setRecItemId}
                />
              }
            />
            <Route
              path="/recipeDetail/:itemId"
              element={
                <RecipeDetails
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                  setIsDisabled={setIsDisabled}
                  recItemId={recItemId}
                  setRecItemId={setRecItemId}
                />
              }
            />
            <Route
              path="/recipeDetails/:itemId"
              element={
                <RecipeDetails
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                  isDisabled={isDisabled}
                  setIsDisabled={setIsDisabled}
                  recItemId={recItemId}
                  setRecItemId={setRecItemId}
                />
              }
            />
          </Routes>
        </RightWrapper>
      </MasterWrapper>
    </BrowserRouter>
  );
}

const RightWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 0%;
  background-color: pink;
  height: 100%;
`;

const LeftWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 20.2%;
  height: 100%;
`;

const CenterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 80.8%;
  height: 100%;
  /* background-color: red; */
`;

const MasterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  /* background-color: blue; */
  height: 100%;
`;
export default App;
