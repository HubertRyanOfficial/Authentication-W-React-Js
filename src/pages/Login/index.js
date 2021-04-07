import React, { useState } from "react";
import "../../config/styles/authStyle.css";

// * modules

import { useHistory } from "react-router-dom";
import firebase from "firebase";

// *

import LogoImg from "../../assets/logo.png";
import LinesBackground from "../../assets/lines-background.png";

// * components

import InputAuth from "../../components/InputAuth";
import ButtonAuth from "../../components/ButtonAuth";
import Loader from "react-loader-spinner";

function Login() {
  // + react dom
  const history = useHistory();

  // +

  const [email, setEmail] = useState("hubertryanofficial@gmail.com");
  const [password, setPassword] = useState("123456");
  const [loading, setLoading] = useState(false);

  // + handles functions components

  function handleChangeEmail(value) {
    setEmail(value.target.value);
  }

  function handleChangePassword(value) {
    setPassword(value.target.value);
  }

  function handlePageCreateAccount() {
    history.push("/signup");
  }

  // + handles function utils

  function handleSignInUser() {
    // ! make verification with email and password

    if (!email || !password) return;

    if (
      email &&
      email.includes("@") &&
      email.includes(".") &&
      password &&
      password.length > 5
    ) {
      makeLoginWithUser();
    } else if (
      (email && !email.includes("@")) ||
      (email && !email.includes("."))
    ) {
      alert("This email is invalid!");
    } else if (password && password.length <= 5) {
      alert("Password too short!");
    } else {
      alert("Missing data to your connection!");
    }
  }

  async function makeLoginWithUser() {
    setLoading(true);

    try {
      // ! make login with firebase

      const results = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);

      if (results) {
        setLoading(false);
        history.push("/user");
      }
    } catch (error) {
      setLoading(false);

      if (error && error.code) {
        alert(error.code);
      } else {
        alert("Unknown error!");
      }
    }
  }

  return (
    <div className="authContainer">
      <img className="imgBackground" src={LinesBackground} />
      <img className="authLogo" src={LogoImg} />

      <div className="authInputsContainer">
        <h1 className="authInputsTitle">LOGIN</h1>
        <span className="authInputsSubTitle">
          Create account now?{" "}
          <button onClick={handlePageCreateAccount}>Create</button>
        </span>

        <InputAuth
          placeholder="Your e-mail"
          value={email}
          handleFunction={handleChangeEmail}
        />
        <InputAuth
          placeholder="Your password"
          value={password}
          handleFunction={handleChangePassword}
          type={"password"}
        />

        {!loading ? (
          <ButtonAuth handleFunction={handleSignInUser}>Sign In</ButtonAuth>
        ) : (
          <Loader
            className="loadingAuthContainer"
            type="TailSpin"
            color="var(--red)"
            height={40}
            width={40}
          />
        )}
      </div>
    </div>
  );
}

export default Login;
