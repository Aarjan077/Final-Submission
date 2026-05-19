function startSite() {
  const username = document.getElementById("username").value.trim();

  if (username === "") {
    alert("Please enter your name!");
  } else {
    alert("Welcome to Nepal, " + username + "!");
  }
}

function toggleAnthem() {
  const anthem = document.getElementById("anthemAudio");
  const button = document.querySelector(".anthem-btn");

  if (anthem.paused) {
    anthem.play();
    button.textContent = "PAUSE ANTHEM";
  } else {
    anthem.pause();
    button.textContent = "NATIONAL ANTHEM";
  }
}

function goBackToNormal() {
  const mainBox = document.getElementById("mainBox");
  const anthem = document.getElementById("anthemAudio");
  const anthemButton = document.querySelector(".anthem-btn");

  mainBox.classList.remove("hide-box");

  anthem.pause();
  anthem.currentTime = 0;
  anthemButton.textContent = "NATIONAL ANTHEM";
}

document.addEventListener("keydown", function(event) {
  if (event.key === "Escape") {
    goBackToNormal();
  }
});