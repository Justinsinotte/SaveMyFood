import React from "react";
import styled from "styled-components";

const handleClick = async (recipes, setRecipes) => {
  try {
    const response = await fetch("/api/ingredientsQuery");
    const data = await response.json();
    if (response.status === 200) {
      setRecipes(data.data);
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
  height: 2em;
  padding: 0.2em;
  width: 21em;

  color: white;
  background-color: rgba(0, 106, 200, 0.74);
  border-radius: 15px;
  border: none;

  &:active {
    background-color: rgba(0, 106, 200, 0.9);
  }
`;

export default SearchButton;
