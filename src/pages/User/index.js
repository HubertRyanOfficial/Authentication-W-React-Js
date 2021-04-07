import React, { useEffect, useState, useRef } from "react";
import "./styles.css";

// * modules

import { useHistory } from "react-router-dom";
import firebase from "firebase";

// *

import LogoImg from "../../assets/logo.png";

// * components

import Loader from "react-loader-spinner";
import UserInfo from "./UserInfo";

import { allTexts } from "../../utils/texts";

function User() {
  const history = useHistory();

  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [randomText, setRandomText] = useState("");
  const [loadingPhotoUpload, setLoadingPhotoUpload] = useState(false);

  useEffect(() => {
    getUserData();
  }, []);

  function getRandomText() {
    const randomNumber = Math.floor(Math.random() * 5);
    setRandomText(allTexts[randomNumber].text);
  }

  // * get user data

  async function getUserData() {
    try {
      const user = await firebase.auth().currentUser;

      if (user) {
        const userConnectedRef = await firebase
          .firestore()
          .collection("users")
          .doc(user.uid)
          .get();

        if (userConnectedRef.exists) {
          getRandomText();
          setUserData({ id: userConnectedRef.id, ...userConnectedRef.data() });
        } else {
          await firebase.auth().signOut();
          history.push("/");
        }
      } else {
        history.push("/");
      }

      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);

      if (error && error.code) {
        alert(error.code);
      } else {
        history.push("/error");
      }
    }
  }

  // * sign out user (disconnect user)

  async function signOutUser() {
    try {
      setLoading(true);
      await firebase.auth().signOut();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  // * verification file

  function getImageFile(event) {
    let fileToUpload = event.target.files[0];

    if (!fileToUpload) return;

    const photoProfileStorageRef = firebase
      .storage()
      .ref(`users/${userData.id}/profile`);

    setLoadingPhotoUpload(true);

    photoProfileStorageRef.put(fileToUpload).on(
      "state_changed",
      () => {},
      () => {
        setLoadingPhotoUpload(false);
        alert("Error uploaded profile photo!");
      },
      () => getUrlUploadedFromStorage(photoProfileStorageRef)
    );
  }

  async function getUrlUploadedFromStorage(photoProfileStorageRef) {
    try {
      const urlPhoto = await photoProfileStorageRef.getDownloadURL();
      const userRef = firebase.firestore().collection("users").doc(userData.id);

      await userRef.update({
        photo: urlPhoto,
      });

      setUserData({
        ...userData,
        photo: urlPhoto,
      });

      setLoadingPhotoUpload(false);
    } catch (error) {
      setLoadingPhotoUpload(false);

      if (error & error.code) {
        alert(error.code);
      }
    }
  }

  return (
    <div className="userContainer">
      <img className="authLogo" src={LogoImg} />
      {loading && !userData ? (
        <Loader type="ThreeDots" color="var(--red)" height={100} width={100} />
      ) : (
        <UserInfo
          data={userData}
          signOutUser={signOutUser}
          randomText={randomText}
          getRandomText={getRandomText}
          getImageFile={getImageFile}
          loadingPhotoUpload={loadingPhotoUpload}
        />
      )}
    </div>
  );
}

export default User;
