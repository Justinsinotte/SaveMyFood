import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import React from "react";
import { newDataArray } from "../Functions/objectArray";

const SearchBar = ({
  userIngredients,
  setUserIngredients,
  setRefresh,
  resfresh,
}) => {
  const suggestionBoxRef = useRef(null);
  const [inputValue, setInputValue] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const handleClear = () => {
    setInputValue("");
  };

  const filteredSuggestions = ingredients.filter((ingredient) => {
    const ingredientLowerCase = ingredient.name.toLowerCase();
    const userInputLowerCase = inputValue.toLowerCase();

    return (
      ingredientLowerCase.includes(userInputLowerCase) &&
      userInputLowerCase.length > 1
    );
  });

  const handleClick = (name, id) => {
    setUserIngredients([...userIngredients, { name, id }]);
    setSelectedIds([...selectedIds, id]);
    setInputValue(inputValue);

    // setShowSuggestions(false);
    const addUserIngredient = async () => {
      try {
        setRefresh(!resfresh);
        const response = await fetch("/api/userIngredients", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            id: id,
          }),
        });
      } catch (error) {
        console.log("There was an error:", error);
      }
    };

    addUserIngredient();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest("#suggestion-box")) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [suggestionBoxRef]);

  useEffect(() => {
    const fetchData = async () => {
      setIngredients(newDataArray);
    };

    fetchData();
  }, []);

  return (
    <React.Fragment>
      <InputWrapper>
        <Input
          placeholder="Search for ingredients..."
          type="text"
          value={inputValue}
          onChange={(ev) => {
            setInputValue(ev.target.value);
            setShowSuggestions(true);
          }}
        />
        <Button onClick={handleClear}>Clear</Button>
      </InputWrapper>
      {inputValue.length >= 1 &&
        filteredSuggestions.length > 0 &&
        showSuggestions && (
          <Suggestions id="suggestion-box" ref={suggestionBoxRef}>
            <ul>
              {filteredSuggestions.map((ingredient) => {
                const isDisabled = selectedIds.includes(ingredient.id);
                const className = isDisabled ? "disabled" : "";
                return (
                  <SuggestionItem
                    key={ingredient.id}
                    value={ingredient.name}
                    onClick={() => handleClick(ingredient.name, ingredient.id)}
                    className={className}
                  >
                    {ingredient.name.toUpperCase()}
                  </SuggestionItem>
                );
              })}
            </ul>
          </Suggestions>
        )}
      {/* <UL>
        {userIngredients.map((ingredient) => (
          <li key={ingredient.id}>
            {ingredient.name}({ingredient.id})
          </li>
        ))}
      </UL> */}
    </React.Fragment>
  );
};

const UL = styled.ul`
  margin-left: 700px;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
`;
const Suggestions = styled.div`
  width: 25em;
  margin-top: 0.5em;
  padding: 0;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
  background-color: white;
  border: 1px solid lightgray;
  border-radius: 3px;
  z-index: 1;
`;

const SuggestionItem = styled.div`
  padding: 0.4em;
  cursor: pointer;
  &:hover {
    background-color: lightgoldenrodyellow;
  }

  &.disabled {
    color: gray;
    cursor: default;
    pointer-events: none;
  }
`;

const Input = styled.input`
  padding: 1.4em;
  width: 80%;
  border: 1px solid lightgray;
  border-radius: 15px;
`;

const Button = styled.button`
  height: 4em;
  padding: 1.2em;
  width: 7em;
  margin-left: 0.7em;
  color: white;
  background-color: rgb(0 106 200 / 74%);
  border-radius: 15px;
  border: none;
`;

export default SearchBar;