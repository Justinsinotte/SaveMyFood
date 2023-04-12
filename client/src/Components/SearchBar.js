import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import React from "react";
import { newDataArray } from "../Functions/objectArray";
import SearchButton from "./SearchButton";
import { useAuth0 } from "@auth0/auth0-react";
import { FaSearch } from "react-icons/fa";
const SearchBar = ({
  userIngredients,
  setUserIngredients,
  setRefresh,
  refresh,
  selectedIds,
  setSelectedIds,
  recipes,
  setRecipes,
  bulkRecipes,
  setBulkRecipes,
}) => {
  const { user } = useAuth0();
  const suggestionBoxRef = useRef(null);
  const [inputValue, setInputValue] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

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

    const addUserIngredient = async () => {
      try {
        const response = await fetch("/api/userIngredients", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            id: id,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            setRefresh((refresh) => !refresh);
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
  if (!user) {
    return <></>;
  }
  return (
    <MainDiv>
      <InputWrapper>
        <Input
          placeholder={`Search for ingredients...`}
          type="text"
          value={inputValue}
          onChange={(ev) => {
            setInputValue(ev.target.value);
            setShowSuggestions(true);
          }}
        />
      </InputWrapper>
      <SearchButton
        recipes={recipes}
        setRecipes={setRecipes}
        bulkRecipes={bulkRecipes}
        setBulkRecipes={setBulkRecipes}
      />

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
    </MainDiv>
  );
};

const MainDiv = styled.div`
  /* position: absolute;
  top: 0;
  left: 21%; */
  display: flex;
  flex-direction: row;
  height: 56px;
  justify-content: space-evenly;
  align-items: center;
  background-color: rgb(242, 225, 182);

  /* border: 1px solid black; */
  /* background-color: lightblue; */
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: em;
  width: 640px;
  align-items: center;
  flex-direction: row;
  border: none;
`;
const Suggestions = styled.div`
  font-size: 10px;
  font-family: Georgia, "Times New Roman", Times, serif;
  color: black;
  position: absolute;
  top: 48px;
  width: 400px;
  left: 350px;
  margin-top: 8px;
  padding: 0;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
  opacity: 0.95;
  background-color: white;
  border: 1px solid lightgray;
  border-radius: 3px;
  z-index: 1;
`;

const SuggestionItem = styled.div`
  padding: 6.4px;
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
  padding: 8.4px;
  width: 80%;
  height: 20px;
  border: 1px solid lightgray;
  border-radius: 15px;
  outline: none;
`;

export default SearchBar;
