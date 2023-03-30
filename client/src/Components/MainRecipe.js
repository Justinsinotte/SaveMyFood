import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
const MainRecipe = ({ recipes }) => {
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
