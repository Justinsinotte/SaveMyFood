import React from "react";
import styled from "styled-components";

const handleClick = async (
  recipes,
  setRecipes,
  bulkRecipes,
  setBulkRecipes
) => {
  try {
    const response = await fetch("/api/ingredientsQuery");
    const data = await response.json();
    if (response.status === 200) {
      setRecipes(data.data);
      const response2 = await fetch("/api/userRecipesIdQuery");
      const data2 = await response.json();
      setBulkRecipes(data.data);
    } else {
      console.error("Error: The items were not found.", data);
    }
  } catch (error) {
    console.error("The was an error fetching the items:", error);
  }
};

const SearchButton = ({ recipes, setRecipes }) => {
  return (
    <Button onClick={() => handleClick(recipes, setRecipes)}>
      Search for Recipes!
    </Button>
  );
};

const Button = styled.button`
  height: 32px;
  padding: 3.2px;
  width: 270px;

  background-color: white;

  border-radius: 15px;
  border: none;

  &:hover {
    background-color: rgb(237, 193, 152);
  }

  &:active {
    background-color: rgba(0, 106, 200, 1);
  }
`;

export default SearchButton;
