const express = require("express");
const router = express.Router();
const db = require("../../db/models");
const { routeHandler } = require("../utils");
const { User, Relationship, Comment, Like, Picture, Status } = db;
const { getUserToken, requireAuth } = require("../utils/auth");


// const getPhotos = async () => {
//   const res = await fetch("/api/pictures/");
//   const data = await res.json();
//   return data;
// };

const populatePhotoFeed = async () => {
  const photoFeed = document.querySelector(".photo-feed");
  const { pictures } = await getPhotos();
  // const { likes, userLike } = await getLikesForPic();
  // const { comments } = await getCommentsForPic();
  for (let photo of pictures) {
    // const { likes, userLike } = await getLikesForPic();
    // const { comments } = await getCommentsForPic();
    const photoLi = `
      <li>
        <div class="user-icon">
          <i class="fas fa-user"></i>
        </div>
        <div class="photo">
          <div class="photo-header">
            ${photo.User.userName}
          </div>
            <i class="photo></i>
        </div>
      </li>
    `;
    photoFeed.innerHTML += photoLi;
  }
};

populatePhotoFeed();
