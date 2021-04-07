import React, { memo } from "react";
import "./styles.css";

// * utils

import RefreshIcon from "../../assets/i-refresh.png";
import CoffeIcon from "../../assets/i-coffe.png";
import UploadPhotoIcon from "../../assets/i-upload.png";

// * components

import Loader from "react-loader-spinner";

function UserInfo({
  data,
  signOutUser,
  randomText,
  getRandomText,
  getImageFile,
  loadingPhotoUpload,
}) {
  if (!data) return null;

  return (
    <main className="userInfoContainer">
      <div className="uploadImageContainer">
        {/* profile photo */}

        <div className="uploadImage">
          {!data.photo ? (
            <img className="uploadImageIcon" src={UploadPhotoIcon} />
          ) : (
            <img className="uploadImagePhoto" src={data.photo} />
          )}
        </div>

        {/* profile upload */}

        <div className="uploadImageInfo">
          <span>Change profile?</span>
          {!loadingPhotoUpload ? (
            <input
              type="file"
              accept="image/png, image/jpeg"
              onChange={getImageFile}
            />
          ) : (
            <Loader
              type="Bars"
              color="var(--red)"
              height={20}
              width={100}
              style={{ marginTop: 10 }}
            />
          )}
        </div>
      </div>

      <div className="infoAndTexts">
        {/* info users container */}

        <div className="info">
          <div className="userInfo">
            <span>Name</span>
            <strong>{data.fullName}</strong>
          </div>

          <span>_____________________________________________________</span>

          <div className="userInfo">
            <span>E-mail</span>
            <strong>{data.email}</strong>
          </div>
        </div>

        {/* quote container */}

        <div className="textOfDayContainer">
          <div className="textOfDayHeader">
            <span>Quote of the day</span>
            <button onClick={getRandomText}>
              <img src={RefreshIcon} />
            </button>
          </div>
          <div className="randomTextContainer">
            <span>______</span>
            <p>{randomText}</p>
          </div>
          <img src={CoffeIcon} />
        </div>
      </div>

      <button onClick={signOutUser}>Sign Out</button>
    </main>
  );
}

export default memo(UserInfo);
