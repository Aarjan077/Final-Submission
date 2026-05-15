const homePage = document.getElementById("homePage");
const buttons = document.querySelectorAll(".info-button");

let activeButton = null;

function openButton(button) {
  if (activeButton !== null) {
    activeButton.classList.remove("active");
  }

  activeButton = button;

  button.classList.add("active");
  homePage.classList.add("expanded");
}

function closeButton() {
  if (activeButton !== null) {
    activeButton.classList.remove("active");
    activeButton = null;
  }

  homePage.classList.remove("expanded");
}

buttons.forEach(function (button) {
  button.addEventListener("click", function () {
    if (!button.classList.contains("active")) {
      openButton(button);
    }
  });

  button.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      openButton(button);
    }
  });
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeButton();
  }
});