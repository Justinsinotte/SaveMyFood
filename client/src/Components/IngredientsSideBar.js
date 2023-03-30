import { useState, useEffect, useRef } from "react";
import React from "react";
import styled from "styled-components";
import DeleteButton from "./DeleteButton";
import ClearAllButton from "./ClearAllButton";
const IngredientsSideBar = ({
  refresh,
  setRefresh,
  items,
  setItems,
  selectedIds,
  setSelectedIds,
}) => {
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
    // console.log(refresh);
  }, [refresh]);

  //   console.log(items);

  return (
    <ItemListWrapper>
      <ClearAllButton
        setRefresh={setRefresh}
        selectedIds={selectedIds}
        setSelectedIds={setSelectedIds}
      />
      <ItemsWrapper>
        {items.map((item, index) => (
          <SingleItem key={index}>
            <div>{item.name}</div>
            <DeleteButton
              itemId={item.id}
              refresh={refresh}
              setRefresh={setRefresh}
              selectedIds={selectedIds}
              setSelectedIds={setSelectedIds}
            />
          </SingleItem>
        ))}
      </ItemsWrapper>
    </ItemListWrapper>
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

const ItemListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 90em;
  width: 100%;
  color: black;
  align-items: center;
  /* border: 1px solid black; */
  background-color: lightsalmon;
`;

export default IngredientsSideBar;
