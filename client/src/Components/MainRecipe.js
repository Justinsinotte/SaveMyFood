import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
const MainRecipe = ({ recipes, setRecipes, refresh }) => {
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("/api/userRecipes");
        const data = await response.json();

        if (response.status === 200) {
          console.log(data.data);
          setRecipes(data.data);
          //   console.log(items);
        } else {
          console.error("Error: The items were not found.", data);
        }
      } catch (error) {
        console.error("The was an error fetching the items:", error);
      }
    };
    fetchItems();
    // console.log(refresh);
  }, [refresh]);

  return (
    <MainDiv>
      <ItemsWrapper>
        {recipes.map((recipe) => (
          <li key={recipe.id}>{recipe.title}</li>
        ))}
      </ItemsWrapper>
    </MainDiv>
  );
};

const SingleItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-right: 10px;
  align-items: center;
`;

const ItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const MainDiv = styled.div`
  background-color: lightpink;
  width: 100%;
  height: 100%;
`;

export default MainRecipe;
