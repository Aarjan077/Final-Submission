const homePage = document.getElementById("homePage");
const cards = document.querySelectorAll(".nepal-card");
const closeButtons = document.querySelectorAll(".close-card");

const anthemButton = document.getElementById("anthemButton");
const anthemAudio = document.getElementById("anthemAudio");

const menuButton = document.getElementById("menuButton");
const sideMenu = document.getElementById("sideMenu");

const aboutLink = document.getElementById("aboutLink");
const aboutPopup = document.getElementById("aboutPopup");
const aboutClose = document.getElementById("aboutClose");

const inquiryForm = document.getElementById("inquiryForm");
const thankYouDialog = document.getElementById("thankYouDialog");
const dialogClose = document.getElementById("dialogClose");
const dialogOk = document.getElementById("dialogOk");

let openCard = null;

function openSelectedCard(card) {
  if (openCard) {
    openCard.classList.remove("active");
  }

  closeMenu();
  closeAboutPopup();

  openCard = card;
  card.classList.add("active");

  if (homePage) {
    homePage.classList.add("card-open");
  }
}

function closeSelectedCard() {
  if (openCard) {
    openCard.classList.remove("active");
    openCard = null;
  }

  if (homePage && !aboutPopup?.classList.contains("open")) {
    homePage.classList.remove("card-open");
  }
}

function openMenu() {
  if (sideMenu && menuButton) {
    sideMenu.classList.add("open");
    menuButton.classList.add("active");
  }
}

function closeMenu() {
  if (sideMenu && menuButton) {
    sideMenu.classList.remove("open");
    menuButton.classList.remove("active");
  }
}

function toggleMenu() {
  if (!sideMenu) {
    return;
  }

  if (sideMenu.classList.contains("open")) {
    closeMenu();
  } else {
    openMenu();
  }
}

function openAboutPopup() {
  closeSelectedCard();
  closeMenu();

  if (aboutPopup) {
    aboutPopup.classList.add("open");
  }

  if (homePage) {
    homePage.classList.add("card-open");
  }
}

function closeAboutPopup() {
  if (aboutPopup) {
    aboutPopup.classList.remove("open");
  }

  if (homePage && !openCard) {
    homePage.classList.remove("card-open");
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

if (menuButton) {
  menuButton.addEventListener("click", function (event) {
    event.stopPropagation();
    toggleMenu();
  });
}

if (aboutLink) {
  aboutLink.addEventListener("click", function (event) {
    event.preventDefault();
    openAboutPopup();
  });
}

if (aboutClose) {
  aboutClose.addEventListener("click", function (event) {
    event.preventDefault();
    event.stopPropagation();
    closeAboutPopup();
  });
}

document.addEventListener("click", function (event) {
  if (
    sideMenu &&
    menuButton &&
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
    closeAboutPopup();
    closeThankYouDialog();
  }
});

if (anthemButton && anthemAudio) {
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
}

function openThankYouDialog() {
  if (thankYouDialog) {
    thankYouDialog.classList.add("show");
  }
}

function closeThankYouDialog() {
  if (thankYouDialog) {
    thankYouDialog.classList.remove("show");
  }
}

if (inquiryForm) {
  inquiryForm.addEventListener("submit", function (event) {
    event.preventDefault();

    openThankYouDialog();

    inquiryForm.reset();
  });
}

if (dialogClose) {
  dialogClose.addEventListener("click", function () {
    closeThankYouDialog();
  });
}

if (dialogOk) {
  dialogOk.addEventListener("click", function () {
    closeThankYouDialog();
  });
}

if (thankYouDialog) {
  thankYouDialog.addEventListener("click", function (event) {
    if (event.target === thankYouDialog) {
      closeThankYouDialog();
    }
  });
}