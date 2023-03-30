import React from "react";
import styled from "styled-components";

const DeleteButton = ({ itemId, setRefresh, selectedIds, setSelectedIds }) => {
  const handleDelete = async () => {
    try {
      await fetch(`/api/userIngredients`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: itemId,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          const array = [...selectedIds];
          const index = array.indexOf(itemId);
          delete array[index];
          setSelectedIds(array);
          setRefresh((refresh) => !refresh);
        });
    } catch (error) {
      setRefresh((refresh) => !refresh);
      console.error(error);
    }
  };

  return <Button onClick={handleDelete}>X</Button>;
};

const Button = styled.div`
  height: 1.5em;
  padding: 0px;
  width: 1.5em;
  margin-left: 0.7em;
  color: white;
  background-color: rgb(0 106 200 / 74%);
  border: none;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: rgba(0, 106, 200, 0.9);
  }

  &:active {
    background-color: rgba(0, 106, 200, 1);
  }
`;

export default DeleteButton;
