import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Item = ({ data, isDisabled, setIsDisabled, isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  // console.log(data.id);
  const addItemToCard = (event) => {
    event.preventDefault();
    setIsDisabled(true);

    fetch("/api/favRecipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: data,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const newArray = { ...isDisabled, [data.id]: true };
        console.log(newArray);
        setIsDisabled(newArray);
        window.localStorage.setItem("isDisabled", JSON.stringify(newArray));
        // setIsDisabled(true);
      })
      .catch((error) => console.log(error));
  };
  // console.log(isDisabled.data.id);

  const handleClick = () => {
    navigate(`/recipeDetail/${data.id}`);
    console.log(isOpen);
    setIsOpen((isOpen) => !isOpen);
  };
  return (
    <Wrapper>
      <LeftWrapper>
        <img
          src={data.image}
          alt={data.title}
          onClick={(event) => handleClick(event)}
        />
      </LeftWrapper>
      <RightWrapper>
        <h2>{data.title}</h2>
        <P>Servings: {data.servings}</P>
        <P>Likes: {data.aggregateLikes}</P>
        <button
          onClick={(event) => addItemToCard(event)}
          disabled={isDisabled[data.id]}
        >
          {isDisabled[data.id] ? "Added" : "Add"}
        </button>
      </RightWrapper>
    </Wrapper>
  );
};

const P = styled.p`
  font-family: Georgia, "Times New Roman", Times, serif;
  font-size: 8px;
  font-weight: normal;
  font-style: normal;
`;
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
export default Item;
