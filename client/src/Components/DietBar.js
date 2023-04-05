import React from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
const DietBar = ({
  isGluten,
  setIsGluten,
  isDairy,
  setIsDairy,
  isVegan,
  setIsVegan,
  isVegetarian,
  setIsVegetarian,
}) => {
  const { user } = useAuth0();
  const location = useLocation();
  const hideOnSavedRecipesPage = location.pathname === "/savedrecipes";

  const handleGlutenClick = () => {
    setIsGluten(!isGluten);
    setIsDairy(false);
    setIsVegan(false);
    setIsVegetarian(false);
  };

  const handleDairyClick = () => {
    setIsGluten(false);
    setIsDairy(!isDairy);
    setIsVegan(false);
    setIsVegetarian(false);
  };

  const handleVeganClick = () => {
    setIsGluten(false);
    setIsDairy(false);
    setIsVegan(!isVegan);
    setIsVegetarian(false);
  };

  const handleVegetarianClick = () => {
    setIsGluten(false);
    setIsDairy(false);
    setIsVegan(false);
    setIsVegetarian(!isVegetarian);
  };

  if (hideOnSavedRecipesPage || !user) {
    return <Div></Div>;
  }

  return (
    <Div>
      <Button active={isGluten} onClick={handleGlutenClick}>
        Gluten-Free
      </Button>
      <Button active={isDairy} onClick={handleDairyClick}>
        Dairy-Free
      </Button>
      <Button active={isVegan} onClick={handleVeganClick}>
        Vegan
      </Button>
      <Button active={isVegetarian} onClick={handleVegetarianClick}>
        Vegetarian
      </Button>
    </Div>
  );
};

const Button = styled.button`
  align-items: center;
  background-color: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 0.25rem;
  box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
  box-sizing: border-box;
  color: rgba(0, 0, 0, 0.85);
  cursor: pointer;
  display: inline-flex;
  font-family: system-ui, -apple-system, system-ui, "Helvetica Neue", Helvetica,
    Arial, sans-serif;
  font-size: 16px;
  font-weight: 600;
  justify-content: center;
  line-height: 1.25;
  margin: 0;
  min-height: 3rem;
  padding: calc(0.875rem - 1px) calc(1.5rem - 1px);
  position: relative;
  text-decoration: none;
  transition: all 250ms;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: baseline;
  width: auto;

  :hover,
  :focus {
    border-color: rgba(0, 0, 0, 0.15);
    box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
    color: rgba(0, 0, 0, 0.65);
  }

  :hover {
    transform: translateY(-1px);
  }

  :active {
    background-color: rgb(255, 242, 230);
    border-color: rgba(0, 0, 0, 0.15);
    box-shadow: rgba(0, 0, 0, 0.06) 0 2px 4px;
    color: blueviolet;
    transform: translateY(0);
  }

  ${({ active }) =>
    active &&
    `
    background-color: rgb(255, 242, 230);
    border-color: rgba(0, 0, 0, 0.15);
    box-shadow: rgba(0, 0, 0, 0.06) 0 2px 4px;
    color: blueviolet;
  `}
`;

const Div = styled.div`
  display: flex;
  flex-direction: Row;
  height: 48px;
`;

export default DietBar;
