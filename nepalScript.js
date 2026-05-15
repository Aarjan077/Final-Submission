const buttons = document.querySelectorAll(".info-button");
const modalBox = document.getElementById("modalBox");
const modalTitle = document.getElementById("modalTitle");
const modalContent = document.getElementById("modalContent");
const closeBtn = document.getElementById("closeBtn");
const homePage = document.querySelector(".home-page");

function openModal(button) {
  const title = button.getAttribute("data-title");
  const content = button.getAttribute("data-content");

  modalTitle.textContent = title;
  modalContent.textContent = content;

  modalBox.classList.add("active");
  homePage.classList.add("modal-open");
}

function closeModal() {
  modalBox.classList.remove("active");
  homePage.classList.remove("modal-open");
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    openModal(button);
  });
});

closeBtn.addEventListener("click", closeModal);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal();
  }
});