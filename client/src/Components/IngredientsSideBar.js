import { useState, useEffect, useRef } from "react";
import React from "react";
import styled from "styled-components";
const IngredientsSideBar = ({ userIngredients, refresh, setRefresh }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("/api/userIngredients");
        const data = await response.json();

        if (response.status === 200) {
          //   console.log(data.data);
          setItems(data.data);

          //   console.log(items);
        } else {
          console.error("Error: The items were not found.", data);
        }
      } catch (error) {
        console.error("The was an error fetching the items:", error);
      }
    };
    fetchItems();
    console.log(refresh);
  }, [refresh]);

  console.log(items);
  if (items.length === 0) {
    return <h1>loading</h1>;
  }

  return (
    <ItemListWrapper>
      {items.map((item, index) => (
        <li key={index}>
          <div>{item.name}</div>
        </li>
      ))}
    </ItemListWrapper>
  );
};

const ItemListWrapper = styled.ul`
  margin-top: 30px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  color: black;
`;

export default IngredientsSideBar;
