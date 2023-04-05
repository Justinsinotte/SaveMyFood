import React from "react";
import styled from "styled-components";

const ClearAllButton = ({ setRefresh, setSelectedIds }) => {
  const handleDelete = async () => {
    try {
      await fetch(`/api/allUserIngredients`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      })
        .then((res) => res.json())
        .then((data) => {
          setSelectedIds("");
          setRefresh((refresh) => !refresh);
        });
    } catch (error) {
      setRefresh((refresh) => !refresh);
      console.error(error);
    }
  };

  return <Button onClick={handleDelete}>Clear Ingredients</Button>;
};

const Button = styled.button`
  /* height: 40px; */
  padding: 0.2em;
  width: 180px;
  margin-top: 10px;
  margin-bottom: 20px;
  color: black;
  background-color: white;
  border-radius: 15px;
  border: none;
  &:hover {
    background-color: rgb(237, 193, 152);
  }

  &:active {
    background-color: rgba(237, 193, 152);
  }
`;

export default ClearAllButton;
