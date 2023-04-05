import React from "react";
import styled from "styled-components";
import { FiDelete } from "react-icons/fi";
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

  return (
    <Button onClick={handleDelete}>
      <FiDelete />
    </Button>
  );
};

const Button = styled(FiDelete)`
  font-size: 15px;
  margin-left: 2px;
  color: slategray;
  &:hover {
    color: rgb(237, 193, 152);
  }
`;
export default DeleteButton;
