const form = document.querySelector("#login-form");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const userName = formData.get("userName");
  const password = formData.get("password");
  const body = { userName, password };
  const res = await fetch("/routes/api/users/token", {
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

  window.location.href = "/";
});
