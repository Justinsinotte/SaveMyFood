import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import styled from "styled-components";
import SingleItem from "./SingleItem";
import { FiXCircle, FiHeart } from "react-icons/fi";

const RecipeDetail = ({ isOpen, setIsOpen, recItemId, setRecItemId }) => {
  const { state } = useLocation();
  const [item, setItem] = useState(null);

  const { itemId } = useParams();
  const numberItemId = Number(itemId);
  setRecItemId(numberItemId);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(`/api/userBulkRecipes/${numberItemId}`);

        const data = await response.json();

        if (response.status === 200) {
          setItem(data.data);
        } else {
          console.error("Error: The item was not found.", data);
        }
      } catch (error) {
        console.error("The was an error fetching the item:", error);
      }
    };
    fetchItem();
  }, [numberItemId]);

  if (item && item.image) {
    return (
      <Wrapper>
        <SingleItemWrapper isOpen={isOpen}>
          <Img src={item.image} />
          <ButtonWrapper>
            <XCircle onClick={() => setIsOpen((isOpen) => !isOpen)}>X</XCircle>
          </ButtonWrapper>

          <TitleWrapper>
            <TitleUpper>{item.title}</TitleUpper>
            <TitleBottom>
              {`Cook time: ${item.readyInMinutes} minute(s)`}|
              {`Servings: ${item.servings}`}
            </TitleBottom>
          </TitleWrapper>
          <MiddleWrapper>
            <IngredientsWrapper>
              {item.extendedIngredients.map((recipe) => (
                <IngredientsList>
                  {recipe.name.charAt(0).toUpperCase() + recipe.name.slice(1)}
                </IngredientsList>
              ))}
            </IngredientsWrapper>
            <InstructionsWrapper>
              {" "}
              {item.analyzedInstructions[0].steps.map((step, index) => (
                <IngredientsList key={index}>{step.step}</IngredientsList>
              ))}
            </InstructionsWrapper>
          </MiddleWrapper>
          <WebsiteDiv href={item.spoonacularSourceUrl} target="_blank">
            Click here to go the website!
          </WebsiteDiv>
        </SingleItemWrapper>
      </Wrapper>
    );
  }
};
const XCircle = styled(FiXCircle)`
  font-size: 50px;
  color: whitesmoke;
  &:hover {
    color: lightgray;
  }
`;

const WebsiteDiv = styled.a`
  font-family: Georgia, "Times New Roman", Times, serif;
  font-size: 20px;
  background-color: aliceblue;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 3%;
  height: 50px;
  border: 1px solid black;
  color: white;
  background-color: rgba(0, 106, 200, 0.74);
  border-radius: 4px;
  border: none;

  &:hover {
    background-color: rgba(0, 106, 200, 0.9);
  }

  &:active {
    background-color: rgba(0, 106, 200, 1);
  }
`;

const MiddleWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const IngredientsWrapper = styled.div`
  /* position: absolute;
  top: 436px;
  left: 32px; */
  margin-top: 7%;
  margin-left: 5%;
`;

const IngredientsList = styled.li`
  font-family: Georgia, "Times New Roman", Times, serif;
  padding: 2px;
  font-size: 14px;
  font-weight: 500;
`;

const InstructionsWrapper = styled.div`
  font-family: Georgia, "Times New Roman", Times, serif;
  padding: 2px;
  font-size: 13px;
  width: 80%;
  margin-top: 7%;
  margin-right: 5%;
  margin-bottom: 10px;
  /* position: absolute;
  top: 688px;
  left: 32px; */
`;
const TitleBottom = styled.div`
  display: flex;
`;

const TitleUpper = styled.div`
  border-bottom: 0.2px solid slategray;
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const TitleWrapper = styled.div`
  font-family: Georgia, "Times New Roman", Times, serif;
  font-size: 14px;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-color: white;
  background-color: whitesmoke;
  width: 70%;
  height: 60px;
  top: 366px;
  left: 100px;
  border-radius: 4px;
`;
const Img = styled.img`
  height: 70%;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
`;

const Wrapper = styled.div`
  /* background-color: white;
  margin-top: 100px; */
`;

const SingleItemWrapper = styled.div`
  color: black;
  position: fixed;
  top: 80px;
  right: ${({ isOpen }) => (isOpen ? "0" : "-700px")};
  width: 700px;
  height: 80vh;
  background-color: white;
  z-index: 999;
  transition: right 0.5s ease-in-out;
  border-radius: 15px;
  overflow-y: scroll;
  overflow-x: hidden;
`;

export default RecipeDetail;
