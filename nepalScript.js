const homePage = document.getElementById("homePage");
const cards = document.querySelectorAll(".nepal-card");
const closeButtons = document.querySelectorAll(".close-card");

const anthemButton = document.getElementById("anthemButton");
const anthemAudio = document.getElementById("anthemAudio");

const menuButton = document.getElementById("menuButton");
const sideMenu = document.getElementById("sideMenu");
const menuClose = document.getElementById("menuClose");

let openCard = null;

function openSelectedCard(card) {
  if (openCard) {
    openCard.classList.remove("active");
  }

  closeMenu();

  openCard = card;
  card.classList.add("active");
  homePage.classList.add("card-open");
}

function closeSelectedCard() {
  if (openCard) {
    openCard.classList.remove("active");
    openCard = null;
  }

  homePage.classList.remove("card-open");
}

function openMenu() {
  sideMenu.classList.add("open");
  menuButton.classList.add("active");
}

function closeMenu() {
  sideMenu.classList.remove("open");
  menuButton.classList.remove("active");
}

function toggleMenu() {
  if (sideMenu.classList.contains("open")) {
    closeMenu();
  } else {
    closeMenu();
    openMenu();
  }
}

cards.forEach(function (card) {
  card.addEventListener("click", function (event) {
    if (event.target.classList.contains("close-card")) {
      return;
    }

    if (!card.classList.contains("active")) {
      openSelectedCard(card);
    }
  });

  card.addEventListener("keydown", function (event) {
    if (event.key === "Enter" && !card.classList.contains("active")) {
      openSelectedCard(card);
    }
  });
});

closeButtons.forEach(function (button) {
  button.addEventListener("click", function (event) {
    event.preventDefault();
    event.stopPropagation();
    closeSelectedCard();
  });
});

menuButton.addEventListener("click", function (event) {
  event.stopPropagation();
  toggleMenu();
});

menuClose.addEventListener("click", function (event) {
  event.preventDefault();
  event.stopPropagation();
  closeMenu();
});

document.addEventListener("click", function (event) {
  if (
    sideMenu.classList.contains("open") &&
    !sideMenu.contains(event.target) &&
    !menuButton.contains(event.target)
  ) {
    closeMenu();
  }
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeSelectedCard();
    closeMenu();
  }
});

anthemButton.addEventListener("click", function () {
  if (anthemAudio.paused) {
    anthemAudio.currentTime = 0;

    anthemAudio.play()
      .then(function () {
        anthemButton.textContent = "PAUSE ANTHEM";
        anthemButton.classList.add("playing");
      })
      .catch(function () {
        anthemButton.textContent = "NATIONAL ANTHEM";
        anthemButton.classList.remove("playing");
        alert("The anthem audio could not be played. Please check that nationalAnthem.mp3 is uploaded with the correct file name.");
      });

  } else {
    anthemAudio.pause();
    anthemButton.textContent = "NATIONAL ANTHEM";
    anthemButton.classList.remove("playing");
  }
});

anthemAudio.addEventListener("ended", function () {
  anthemButton.textContent = "NATIONAL ANTHEM";
  anthemButton.classList.remove("playing");
});