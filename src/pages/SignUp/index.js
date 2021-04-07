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

function SignUp() {
  // + react dom
  const history = useHistory();

  // +

  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // + handles functions components

  function handleChangeEmail(value) {
    setEmail(value.target.value);
  }

  function handleChangePassword(value) {
    setPassword(value.target.value);
  }

  function handleChangeName(value) {
    setFullName(value.target.value);
  }

  function handlePageSignIn() {
    history.push("/login");
  }

  // + handles function utils

  function handleSignUpUser() {
    // ! make verification with email and password

    if (!email || !password) return;

    if (
      email &&
      email.includes("@") &&
      email.includes(".") &&
      fullName &&
      fullName.length > 10 &&
      password &&
      password.length > 5
    ) {
      makeUser();
    } else if (fullName && fullName.length <= 10) {
      alert("Name too short!");
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

  async function makeUser() {
    setLoading(true);

    try {
      // ! make user with firebase and to put to firestore

      const results = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);

      if (results) {
        let userRef = firebase.firestore().collection("users");
        let createUserNewRef = userRef.doc(results.user.uid);

        await createUserNewRef.set({
          email,
          fullName,
        });

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
        <h1 className="authInputsTitle">CREATE ACCOUNT</h1>
        <span className="authInputsSubTitle">
          Already have na account?{" "}
          <button onClick={handlePageSignIn}>Sign In</button>
        </span>

        <InputAuth
          placeholder="Your e-mail"
          value={email}
          handleFunction={handleChangeEmail}
        />

        <InputAuth
          placeholder="Your name"
          value={fullName}
          handleFunction={handleChangeName}
        />
        <InputAuth
          placeholder="Your password"
          value={password}
          handleFunction={handleChangePassword}
          type={"password"}
        />

        {!loading ? (
          <ButtonAuth handleFunction={handleSignUpUser}>Sign Up</ButtonAuth>
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

export default SignUp;
