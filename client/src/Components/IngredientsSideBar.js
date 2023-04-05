import { useState, useEffect, useRef } from "react";
import React from "react";
import styled from "styled-components";
import DeleteButton from "./DeleteButton";
import ClearAllButton from "./ClearAllButton";
import { useAuth0 } from "@auth0/auth0-react";
import { FiDelete } from "react-icons/fi";

const IngredientsSideBar = ({
  refresh,
  setRefresh,
  items,
  setItems,
  selectedIds,
  setSelectedIds,
}) => {
  const { user } = useAuth0();

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

  if (!user) {
    return <></>;
  }

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
  align-items: flex-end;
  font-family: Georgia, "Times New Roman", Times, serif;
  font-size: 18px;
  /* border: 2px solid black; */
  width: 100%;
  padding: 2px;
  overflow: hidden;
`;

const ItemsWrapper = styled.div`
  display: inline-flex;
  flex-direction: column; */
`;

const ItemListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  color: black;
  align-items: center;
  /* border: 1px solid black; */
  background-color: rgb(242, 225, 182);
  overflow-y: scroll;
  overflow-x: hidden;
`;

export default IngredientsSideBar;
