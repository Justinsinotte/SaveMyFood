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
}) => {
  console.log(refresh);
  const [faves, setFaves] = useState([]);
  const [item, setItem] = useState(null);
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("/api/favRecipes");
        const data = await response.json();

        if (response.status === 200) {
          // console.log(data.data[0]);
          setFaves(data.data);
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
  // console.log(faves);

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
  border: 1px solid black;
  width: 20%;
  height: 20%;
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

  width: 100%;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
`;

export default Profile;
