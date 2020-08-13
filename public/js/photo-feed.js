const getPhotos = async () => {
  const res = await fetch("/api/pictures");
  const data = await res.json();
  return data;
};
const getLikes = async () => {
  const res = await fetch("/api/likes");
  const data = await res.json();
  return data;
};
const getComments = async () => {
  const res = await fetch("/api/comments");
  const data = await res.json();
  return data;
};
const getLikesForPic = async (photoId) => {
  const res = await fetch(`/api/likes/${photoId}`);
  const data = await res.json();
  return data;
};
const getCommentsForPic = async (photoId) => {
  const res = await fetch(`/api/comments/${photoId}`);
  const data = await res.json();
  return data;
};

const populateCommentList = async (photoId) => {
  const { comments } = await getCommentsForPic(photoId);
  let commentList = document.querySelector(".comment-list");
  commentList.innerHTML = "";
  for (let i = 0; i < comments.length; ++i) {
    let comment = comments[i];
    let commentLi = document.createElement("li");
    commentLi.innerHTML = `${comment.User.userName} ${comment.content}`;
    commentList.appendChild(commentLi);
  }
  return commentList;
};

const populatePhotoFeed = async () => {
  const photoFeed = document.querySelector(".photo-feed");
  const { pictures } = await getPhotos();
  for (let photo of pictures) {
    let { likes, userLike, totalLikes } = await getLikesForPic(photo.id);
    if (totalLikes === null) {
      totalLikes = 0;
    }
    const photoLi = `
      <li>
        <div class="photo">
          <div class="photo-header">
            <div class="user-icon">
            <img id="user-icon" src=${photo.fileLocation}>
            </div>
            <a href="/api/users/${photo.userId}">${photo.User.userName}</a>
          </div>
          <div class="photo-contents">
            <img src=${photo.fileLocation}>
          </div>
          <div class="likes">
            <div id="like-form-div">
              <form class="like-form" method="post" action="/api/likes">
              <input type="hidden" name="pictureId" value=${photo.id}>
              <input type="hidden" name="userId" value=${photo.User.id}>
              <button #like-button type="submit"> Like!
              </form>
            </div>
            <div class="unlike" hidden>
              <div id="unlike-form-div">
               <form class="unlike-form" method="delete" action="/api/likes/${userLike.id}">
                <input type="hidden" name="pictureId" value=${photo.id}>
                <input type="hidden" name="userId" value=${photo.User.id}>
                <input type="hidden" name="likeId" value=${userLike.id}>
                <button #unlike-button type="submit"> unlike
                </form>
              </div>
            </div>
            <div class="totalLikes">
             ${totalLikes} likes
            </div>
          </div>
          <div class="comments">
            <ul class="comment-list">
            </ul>
            <div class="add-comment">
            <form class="comment-form" method="post" action="/api/comments">
            <input #comment-space type='text' name='content' placeholder="comment">
            <input type="hidden" name="pictureId" value=${photo.id}>
            <input type="hidden" name="userId" value=${photo.User.id}>
            <button #comment-button type="submit" > Submit Comment
            </form>
            </div>
          </div>
      </div>
        </div>
        </div>
      </li>
    `;
    photoFeed.innerHTML += photoLi;
    await populateCommentList(photo.id);
    await likeButton(totalLikes);
    await commentButton();
  }
};

populatePhotoFeed();

let likeButton = (totalLikes) => {
  let likeForm = document.querySelector(".like-form");
  let pictureId;
  likeForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(likeForm);
    const userId = formData.get("userId");
    pictureId = formData.get("pictureId");
    const body = { userId, pictureId };
    const res = await fetch("/api/likes", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json",
      },
    });
    const data = await res.json();
    if (!res.ok) {
      const { message } = data;
      const errorsContainer = document.querySelector("#errors-container");
      errorsContainer.innerHTML = message;
      return;
    }
    let likeEle = document.querySelector(".totalLikes");
    let likes = await getLikesForPic(pictureId);
    let totalLikes = 0;
    for (let i = 0; i < likes.likes.length; ++i) {
      totalLikes++;
    }
    likeEle.innerHTML = `${totalLikes} likes`;
  });
};

let commentButton = () => {
  let commentForm = document.querySelector(".comment-form");
  let pictureId;
  commentForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(commentForm);
    const userId = formData.get("userId");
    pictureId = formData.get("pictureId");
    const content = formData.get("content");
    const body = { userId, pictureId, content };
    const res = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json",
      },
    });
    const data = await res.json();
    if (!res.ok) {
      const { message } = data;
      const errorsContainer = document.querySelector("#errors-container");
      errorsContainer.innerHTML = message;
      return;
    }
    await populateCommentList(pictureId);
  });
};

let unlikeButton = (totalLikes) => {
  let unlikeForm = document.querySelector(".unlike-form");
  let pictureId;
  unlikeForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(likeForm);
    const userId = formData.get("userId");
    pictureId = formData.get("pictureId");
    likeId = formData.get("likeId");
    const body = { userId, pictureId };
    const res = await fetch(`/api/likes/${likeId}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    });
    const data = await res.json();
    if (!res.ok) {
      const { message } = data;
      const errorsContainer = document.querySelector("#errors-container");
      errorsContainer.innerHTML = message;
      return;
    }
    let likeEle = document.querySelector(".totalLikes");
    let likes = await getLikesForPic(pictureId);
    let totalLikes = 0;
    for (let i = 0; i < likes.likes.length; ++i) {
      totalLikes++;
    }
    likeEle.innerHTML = `${totalLikes} likes`;
  });
};
