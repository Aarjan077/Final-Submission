const homePage = document.getElementById("homePage");
const cards = document.querySelectorAll(".nepal-card");

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
  card.addEventListener("click", function () {
    if (!card.classList.contains("active")) {
      openSelectedCard(card);
    }
  });

  card.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      openSelectedCard(card);
    }
  });
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeSelectedCard();
  }
});