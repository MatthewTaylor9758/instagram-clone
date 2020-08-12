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
        <div class="user-icon">
          <i class="fas fa-user"></i>
        </div>
        <div class="photo">
          <div class="photo-header">
            ${photo.User.userName}
          </div>
          <div class="photo-contents>
            <img class="photo" src='picture.fileLocation'>
          </div>
          <div class="likes">
              <form id="like-form" method="post" action="/api/likes">
              <input type="hidden" name="pictureId" value=${photo.id}>
              <input type="hidden" name="userId" value=${photo.User.id}>
              <button #like-button type="submit"> Like!
              </form>
             <i class="totalLikes"></i>
              ${totalLikes} likes
            </div>
          <ul class="comment-list">
          </ul>
          <div class="add-comment">
          <form #comment-form method="post" action="/api/comments")>
          <input #comment-space type='text' name='content' placeholder="comment">
          <input type="hidden" name="pictureId" value=${photo.id}>
          <button #comment-button type="submit" > Submit Comment
          </form>
          </div>
      </div>
        </div>
      </li>
    `;
    photoFeed.innerHTML += photoLi;
    await populateCommentList(photo.id);
    await likeButton(totalLikes);
  }
};

populatePhotoFeed();

let likeButton = (totalLikes) => {
  let likeForm = document.querySelector("#like-form");
  likeForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(likeForm);
    const userId = formData.get("userId");
    const pictureId = formData.get("pictureId");
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
    // likes = document.getElementById("total-likes");
    window.location.href = "/";
  });
};
