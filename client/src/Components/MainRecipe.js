import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import SingleItem from "./SingleItem";
import { useAuth0 } from "@auth0/auth0-react";
const MainRecipe = ({
  recipes,
  setRecipes,
  refresh,
  isDisabled,
  setIsDisabled,
  buttonText,
  setButtonText,
  isOpen,
  setIsOpen,
  isGluten,
  setIsGluten,
  isDairy,
  setIsDairy,
  isVegan,
  setIsVegan,
  isVegetarian,
  setIsVegetarian,
}) => {
  const { user } = useAuth0();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("/api/userBulkRecipes");
        const data = await response.json();

        if (response.status === 200) {
          // console.log(data.data);
          setRecipes(data.data);
          // console.log(recipes);
        } else {
          console.error("Error: The items were not found.", data);
        }
      } catch (error) {
        console.error("The was an error fetching the items:", error);
      }
    };
    fetchItems();
  }, [refresh]);

  // console.log(recipes);
  // console.log(`isVegetarian is: ${isVegetarian}`);
  if (!user) {
    return <></>;
  } else if (isGluten) {
    return (
      <MainDiv>
        <ItemsWrapper>
          {recipes
            .filter((recipe) => recipe.glutenFree === true)
            .map((recipe) => (
              <ItemWrapper key={recipe.id}>
                <SingleItem
                  data={recipe}
                  isDisabled={isDisabled}
                  setIsDisabled={setIsDisabled}
                  buttonText={buttonText}
                  setButtonText={setButtonText}
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                />
              </ItemWrapper>
            ))}
        </ItemsWrapper>
      </MainDiv>
    );
  } else if (isDairy) {
    return (
      <MainDiv>
        <ItemsWrapper>
          {recipes
            .filter((recipe) => recipe.dairyFree === true)
            .map((recipe) => (
              <ItemWrapper key={recipe.id}>
                <SingleItem
                  data={recipe}
                  isDisabled={isDisabled}
                  setIsDisabled={setIsDisabled}
                  buttonText={buttonText}
                  setButtonText={setButtonText}
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                />
              </ItemWrapper>
            ))}
        </ItemsWrapper>
      </MainDiv>
    );
  } else if (isVegan) {
    return (
      <MainDiv>
        <ItemsWrapper>
          {recipes
            .filter((recipe) => recipe.vegan === true)
            .map((recipe) => (
              <ItemWrapper key={recipe.id}>
                <SingleItem
                  data={recipe}
                  isDisabled={isDisabled}
                  setIsDisabled={setIsDisabled}
                  buttonText={buttonText}
                  setButtonText={setButtonText}
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                />
              </ItemWrapper>
            ))}
        </ItemsWrapper>
      </MainDiv>
    );
  } else if (isVegetarian) {
    return (
      <MainDiv>
        <ItemsWrapper>
          {recipes
            .filter((recipe) => recipe.vegetarian === true)
            .map((recipe) => (
              <ItemWrapper key={recipe.id}>
                <SingleItem
                  data={recipe}
                  isDisabled={isDisabled}
                  setIsDisabled={setIsDisabled}
                  buttonText={buttonText}
                  setButtonText={setButtonText}
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                />
              </ItemWrapper>
            ))}
        </ItemsWrapper>
      </MainDiv>
    );
  } else {
    return (
      <MainDiv>
        <ItemsWrapper>
          {recipes.map((recipe) => (
            <ItemWrapper key={recipe.id}>
              <SingleItem
                data={recipe}
                isDisabled={isDisabled}
                setIsDisabled={setIsDisabled}
                buttonText={buttonText}
                setButtonText={setButtonText}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
              />
            </ItemWrapper>
          ))}
        </ItemsWrapper>
      </MainDiv>
    );
  }
};

const Img = styled.img`
  width: 100%;
`;

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: row;

  justify-content: flex-start;
  margin-right: 10px;
  align-items: center;
  /* border: 1px solid black; */
  width: 440px;
  height: 100px;
  margin-bottom: 10px;
`;

const ItemsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const MainDiv = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  background-color: rgb(255, 255, 245);
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  margin-left: 60px;
`;

export default MainRecipe;
