import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const FaveItem = ({
  data,
  refresh,
  setRefresh,
  setIsDisabled,
  isDisabled,
  setButtonText,
  item,
  setItem,
  isOpen,
  setIsOpen,
}) => {
  const navigate = useNavigate();
  const itemDelete = async () => {
    try {
      await fetch(`/api/favRecipes`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: data._id,
        }),
      })
        .then((res) => res.json())
        .then(() => {
          setRefresh(!refresh);
          const newArray = { ...isDisabled, [data.data.id]: false };

          setIsDisabled(newArray);
          window.localStorage.setItem("isDisabled", JSON.stringify(newArray));
          setItem(data.data.id);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = () => {
    navigate(`/recipeDetails/${data.data.id}`, { state: { isFaveItem: true } });
    setIsOpen((isOpen) => !isOpen);
  };

  return (
    <Wrapper>
      <LeftWrapper>
        <img
          src={data.data.image}
          alt={data.data.title}
          onClick={() => handleClick()}
        />
      </LeftWrapper>
      <RightWrapper>
        <h2>{data.data.title}</h2>
        <p>{data.data.description}</p>
        <p>Servings: {data.data.servings}</p>
        <p>Likes: {data.data.aggregateLikes}</p>
        <button onClick={itemDelete}>Remove</button>
      </RightWrapper>
    </Wrapper>
  );
};

const RightWrapper = styled.div`
  display: flex;
  /* border: 1px solid blue; */
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-left: 40px;
`;

const LeftWrapper = styled.div`
  display: flex;
  /* border: 1px solid red; */
`;

const Wrapper = styled.div`
  border: none;
  /* padding-bottom: 10px;
  padding-top: 10px;
  padding-left: 10px;
  padding-right: 10px; */
  /* height: 300px; */
  /* align-items: center;
  justify-content: center; */
  display: flex;
  flex-direction: row;
  /* flex-direction: column; */
  & img {
    border-radius: 10px;
    height: 80px;
    width: auto;
    display: block;
    margin: auto;
    /* margin-bottom: 10px; */
    box-shadow: 0px 0px 10px 5px rgba(128, 128, 128, 0.5);
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  }

  & img:hover {
    transform: scale(1.1);
    cursor: pointer;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.3);
  }

  & p {
    font-family: Georgia, "Times New Roman", Times, serif;
    font-size: 13px;
    color: slategray;

    /* margin-bottom: 10px; */
  }
  & button {
    height: 30px;
    /* margin-bottom: 35px;
    margin-top: 5px; */

    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-weight: bold;
    font-size: 10px;
    text-align: center;
    color: #fff;
    background-color: rgb(33, 33, 9);
    border: none;
    border-radius: 4px;
    /* padding: 10px 20px; */
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
  }
  & button[disabled] {
    background-color: gray;
    cursor: not-allowed;
  }
  & button:hover {
    background-color: #fff;
    color: #000;
  }
  & h2 {
    font-family: Haettenschweiler, "Arial Narrow Bold", sans-serif;
    font-size: 16px;
    color: black;
    /* margin-bottom: 10px; */
  }
  & h3 {
    font-family: Haettenschweiler, "Arial Narrow Bold", sans-serif;
    font-size: 20px;
    color: gray;

    /* margin-left: 200px; */
  }
`;
export default FaveItem;
