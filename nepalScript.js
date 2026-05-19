const homePage = document.getElementById("homePage");
const cards = document.querySelectorAll(".nepal-card");
const closeButtons = document.querySelectorAll(".close-card");

const anthemButton = document.getElementById("anthemButton");

let openCard = null;
let anthemPlayer;
let anthemPlaying = false;

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

/* YouTube player for Nepal national anthem */
function onYouTubeIframeAPIReady() {
  anthemPlayer = new YT.Player("anthemPlayer", {
    height: "1",
    width: "1",
    videoId: "1_5j-xyH7vA",
    playerVars: {
      autoplay: 0,
      controls: 0
    },
    events: {
      onStateChange: onAnthemStateChange
    }
  });
}

function onAnthemStateChange(event) {
  if (event.data === YT.PlayerState.ENDED) {
    anthemPlaying = false;
    anthemButton.textContent = "NATIONAL ANTHEM";
    anthemButton.classList.remove("playing");
  }
}

anthemButton.addEventListener("click", function () {
  if (!anthemPlayer || typeof anthemPlayer.playVideo !== "function") {
    alert("The anthem player is still loading. Please click again in a moment.");
    return;
  }

  if (anthemPlaying === false) {
    anthemPlayer.seekTo(0);
    anthemPlayer.playVideo();

    anthemPlaying = true;
    anthemButton.textContent = "PAUSE ANTHEM";
    anthemButton.classList.add("playing");
  } else {
    anthemPlayer.pauseVideo();

    anthemPlaying = false;
    anthemButton.textContent = "NATIONAL ANTHEM";
    anthemButton.classList.remove("playing");
  }
}
);