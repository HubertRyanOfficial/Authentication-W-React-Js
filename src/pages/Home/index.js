import React, { useEffect } from "react";
import "./styles.css";

// * modules

import { useHistory } from "react-router-dom";
import firebase from "firebase";

// * components

import Loader from "react-loader-spinner";

function Home() {
  const history = useHistory();

  useEffect(() => {
    // firebase.auth().signOut();
    checkUser();
  }, []);

  async function checkUser() {
    try {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          history.push("/user");
        } else {
          history.push("/login");
        }
      });
    } catch (error) {
      history.push("/error");
    }
  }

  return (
    <div className="homeContainer">
      <Loader type="ThreeDots" color="var(--red)" height={100} width={100} />
    </div>
  );
}

export default Home;
