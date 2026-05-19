const homePage = document.getElementById("homePage");
const cards = document.querySelectorAll(".nepal-card");
const closeButtons = document.querySelectorAll(".close-card");

const anthemButton = document.getElementById("anthemButton");
const anthemAudio = document.getElementById("anthemAudio");

let openCard = null;

function openSelectedCard(card) {
  if (openCard) {
    openCard.classList.remove("active");
  }

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

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeSelectedCard();
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
        alert("The anthem audio could not be played. The online audio link may be blocked or unavailable.");
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