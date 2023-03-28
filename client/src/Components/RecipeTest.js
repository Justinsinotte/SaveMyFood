import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

const RecipeTest = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(`/test`)
      .then((res) => res.json())
      .then((data) => {
        setItems(data.results);
      })
      .catch((error) => console.error(error));
  }, []);
  console.log(items);
  if (items.length === 0) {
    return <h2>Loading</h2>;
  }

  return (
    <div>
      <ItemListHeader>
        <Title>Discover the Latest and Greatest</Title>
        <Subtitle>Tech at Unbeatable Prices!</Subtitle>
      </ItemListHeader>
      <ItemListWrapper>
        {items.map((item, index) => (
          <li key={index}></li>
        ))}
      </ItemListWrapper>
    </div>
  );
};

const Title = styled.h3`
  font-size: 30px;
  font-weight: bold;
  margin-right: 5px;
`;

const Subtitle = styled.h3`
  font-size: 30px;
  font-weight: normal;
`;
const ItemListHeader = styled.div`
  margin-top: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  font-family: "Lato", sans-serif;
  font-size: 36px;
  text-align: center;
  color: black;
  background-color: white;
  height: 250px;
`;

const ItemListWrapper = styled.ul`
  margin-top: 30px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  color: white;
`;
export default RecipeTest;
