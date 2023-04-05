import React from "react";
import styled from "styled-components";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import Profile from "./Profile";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { FiBookmark } from "react-icons/fi";

const SignInProfile = () => {
  // const { isLoading, error } = useAuth0();
  const navigate = useNavigate();
  const { user, logout, loginWithRedirect } = useAuth0();

  console.log(user);

  if (!user) {
    return (
      <SignedOutDiv>
        <></>
        <LogInButton onClick={() => loginWithRedirect()}>Log In</LogInButton>
      </SignedOutDiv>
    );
  }

  return (
    <Div>
      {user && (
        <Bookmark onClick={() => navigate("/savedrecipes")}>Profile</Bookmark>
      )}
      <>
        <LogOutButton
          picture={user.picture}
          onClick={() => logout({ returnTo: window.location.origin })}
        ></LogOutButton>
      </>
    </Div>
  );
};

const LogInButton = styled.button`
  border-radius: 50px;
  border: none;
`;

const LogOutButton = styled.button`
  border-radius: 25px;
  border: none;
  width: 35px;
  height: 35px;
  background-image: url(${({ picture }) => picture});
  background-size: cover;
  background-position: center;
`;

const Bookmark = styled(FiBookmark)`
  font-size: 38px;
  color: slategray;
  &:hover {
    color: rgb(237, 193, 152);
  }
`;

const SignedOutDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  /* background-color: lightseagreen; */
  width: 100%;
  height: 54.12px;
`;

const Div = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  /* background-color: lightseagreen; */
  width: 10%;
  height: 49.5px;
  background-color: rgb(242, 225, 182);
`;

export default SignInProfile;
