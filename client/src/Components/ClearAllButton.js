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
  height: 2em;
  padding: 0.2em;
  width: 15em;

  color: white;
  background-color: rgba(0, 106, 200, 0.74);
  border-radius: 15px;
  border: none;
`;

export default ClearAllButton;
