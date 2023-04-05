import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

const Title = ({}) => {
  const { user } = useAuth0();
  const navigate = useNavigate();

  if (!user) {
    return <></>;
  }

  return <Div onClick={() => navigate("/")}>Save my Food!</Div>;
};

const Div = styled.div`
  display: flex;
  flex-direction: row;
  /* background-color: lightgoldenrodyellow; */
  color: rgb(207, 121, 41);
  width: 100%;
  height: 54px;
  font-size: 30px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: rgb(242, 225, 182);
`;

export default Title;
