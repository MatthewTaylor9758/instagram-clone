// import User from "../../db/models";
window.addEventListener("click", async (e) => {
  let regex = /delete-button-\d+/;
  // console.log(User.id);
  if (regex.test(e.target.id)) {
    console.log(e.target.id);
    let photoId = e.target.id.slice(14, e.target.id.length);
    console.log(photoId);
    const res = await fetch(`/api/pictures/${photoId}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    });
    window.location.href = window.location.pathname;
    const pic = await res.text();
    // console.log(pic);
  }
  // console.log(e.target.id);
});
// console.log(window);
