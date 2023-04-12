import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import FaveItem from "./FaveItem";

const Profile = ({
  recipes,
  setRecipes,
  refresh,
  setRefresh,
  isDisabled,
  setIsDisabled,
  buttonText,
  setButtonText,
  isOpen,
  setIsOpen,
  item,
  setItem,
}) => {
  const [faves, setFaves] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("/api/favRecipes");
        const data = await response.json();

        if (response.status === 200) {
          setFaves(data.data);
        } else {
          console.error("Error: The items were not found.", data);
        }
      } catch (error) {
        console.error("The was an error fetching the items:", error);
      }
    };
    fetchItems();
  }, [refresh]);

  return (
    <MainDiv>
      <ItemsWrapper>
        {faves.map((recipe) => (
          <ItemWrapper key={recipe.data.id}>
            <FaveItem
              item={item}
              setItem={setItem}
              data={recipe}
              refresh={refresh}
              setRefresh={setRefresh}
              buttonText={buttonText}
              setButtonText={setButtonText}
              isDisabled={isDisabled}
              setIsDisabled={setIsDisabled}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            />
          </ItemWrapper>
        ))}
      </ItemsWrapper>
    </MainDiv>
  );
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

export default Profile;
