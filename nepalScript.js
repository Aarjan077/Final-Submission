function startSite() {
  const username = document.getElementById("username").value.trim();

  if (username === "") {
    alert("Please enter your name!");
  } else {
    alert("Welcome to Nepal, " + username + "!");
  }
}