const buttons = document.querySelectorAll(".info-button");

const expandedBox = document.getElementById("expandedBox");
const expandedTitle = document.getElementById("expandedTitle");
const expandedContent = document.getElementById("expandedContent");

const closeBtn = document.getElementById("closeBtn");
const homePage = document.querySelector(".home-page");

function openExpandedBox(button) {
  const title = button.textContent.trim();
  const content = button.getAttribute("data-content");

  expandedTitle.textContent = title;
  expandedContent.textContent = content;

  expandedBox.classList.add("active");
  homePage.classList.add("modal-open");
}

function closeExpandedBox() {
  expandedBox.classList.remove("active");
  homePage.classList.remove("modal-open");
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    openExpandedBox(button);
  });
});

closeBtn.addEventListener("click", closeExpandedBox);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeExpandedBox();
  }
});