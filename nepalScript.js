const homePage = document.getElementById("homePage");// Get references to all necessary DOM elements
const cards = document.querySelectorAll(".nepal-card");// Get all the cards
const closeButtons = document.querySelectorAll(".close-card");//Get all the close buttons within the cards
const anthemButton = document.getElementById("anthemButton");// Get the national anthem button
const anthemAudio = document.getElementById("anthemAudio");// Get the audio element for the national anthem
const menuButton = document.getElementById("menuButton");// Get the menu button
const sideMenu = document.getElementById("sideMenu");// Get the side menu element
const aboutLink = document.getElementById("aboutLink");// Get the "About Nepal" link in the menu
const aboutPopup = document.getElementById("aboutPopup");// Get the "About Nepal" popup element
const aboutClose = document.getElementById("aboutClose");// Get the close button for the "About Nepal" popup
const inquiryForm = document.getElementById("inquiryForm");// Get the inquiry form element
const thankYouDialog = document.getElementById("thankYouDialog");// Get the thank you dialog element
const dialogClose = document.getElementById("dialogClose");// Get the close button for the thank you dialog
const dialogOk = document.getElementById("dialogOk");// Get the OK button for the thank you dialog
let openCard = null;// Variable to keep track of the currently open card
function openSelectedCard(card) { // Function to open a selected card
  if (openCard) {// If there is already an open card, close it first
    openCard.classList.remove("active");
  }
  closeMenu();// Close the side menu if it's open
  closeAboutPopup();// Close the about popup if it's open
  openCard = card;
  card.classList.add("active");// Add the "active" class to the selected card
  if (homePage) {
    homePage.classList.add("card-open");// Add the "card-open" class to the home
  }
}
function closeSelectedCard() {// Function to close the currently open card
  if (openCard) {
    openCard.classList.remove("active");// Remove the "active" class from the open card
    openCard = null;
  }
  if (homePage && !aboutPopup?.classList.contains("open")) {
    homePage.classList.remove("card-open");// Remove the "card-open" class from the home page if no card is open and the about popup is not open
  }
}
function openMenu() {// Function to open the side menu
  if (sideMenu && menuButton) {// Check if the side menu and menu button exist
    sideMenu.classList.add("open");
    menuButton.classList.add("active");
  }
}
function closeMenu() {
  if (sideMenu && menuButton) {// Check if the side menu and menu button exist
    sideMenu.classList.remove("open");
    menuButton.classList.remove("active");
  }
}
function toggleMenu() {// Function to toggle the side menu open/close state
  if (!sideMenu) {//If the side menu element doesn't exist, do nothing
    return;
  }
  if (sideMenu.classList.contains("open")) {// If the side menu is currently open, close it
    closeMenu();
  } else {// If the side menu is currently closed, open it
    openMenu();
  }
}
function openAboutPopup() {// Function to open the "About Nepal" popup
  closeSelectedCard();
  closeMenu();
  if (aboutPopup) {// Check if the about popup element exists
    aboutPopup.classList.add("open");
  }
  if (homePage) {// If the home page element exists, add the "card-open" class to it
    homePage.classList.add("card-open");
  }
}
function closeAboutPopup() {// Function to close the "About Nepal" popup
  if (aboutPopup) {// Check if the about popup element exists
    aboutPopup.classList.remove("open");
  }
  if (homePage && !openCard) {// If the home page element exists and there is no open card, remove the "card-open" class from it
    homePage.classList.remove("card-open");
  }
}
cards.forEach(function (card) {// Add click and keydown event listeners to each card
  card.addEventListener("click", function (event) {// When a card is clicked, check if the click was on the close button
    if (event.target.classList.contains("close-card")) {
      return;// If the click was on the close button, do nothing
    }
    if (!card.classList.contains("active")) {// If the card is not already active, open it
      openSelectedCard(card);
    }
  });
  card.addEventListener("keydown", function (event) {// When a key is pressed while a card is focused, check if it's the Enter key
    if (event.key === "Enter" && !card.classList.contains("active")) {// If the Enter key is pressed and the card is not already active, open it
      openSelectedCard(card);
    }
  });
});
closeButtons.forEach(function (button) { // Add click event listeners to each close button within the cards
  button.addEventListener("click", function (event) {// When a close button is clicked, prevent the default action and stop the click from propagating to the card
    event.preventDefault();
    event.stopPropagation();
    closeSelectedCard();
  });
});
if (menuButton) {// Add click event listener to the menu button
  menuButton.addEventListener("click", function (event) {// When the menu button is clicked, prevent the default action and stop the click from propagating
    event.stopPropagation();
    toggleMenu();
  });
}
if (aboutLink) {// Add click event listener to the "About Nepal" link in the menu
  aboutLink.addEventListener("click", function (event) {
    event.preventDefault();
    openAboutPopup();
  });
}
if (aboutClose) {// Add click event listener to the close button for the "About Nepal" popup
  aboutClose.addEventListener("click", function (event) {// When the close button is clicked, prevent the default action and stop the click from propagating
    event.preventDefault();
    event.stopPropagation();
    closeAboutPopup();
  });
}
document.addEventListener("click", function (event) {// Add a click event listener to the entire document to close the side menu when clicking outside of it
  if (// If the side menu and menu button exist, and the side menu is currently open, and the click target is not within the side menu or the menu button, close the side menu
    sideMenu &&
    menuButton &&
    sideMenu.classList.contains("open") &&
    !sideMenu.contains(event.target) &&
    !menuButton.contains(event.target)
  ) {
    closeMenu();// Close the side menu
  }
});
document.addEventListener("keydown", function (event) {// Add a keydown event listener to the entire document to close the open card, side menu, about popup, and thank you dialog when the Escape key is pressed
  if (event.key === "Escape") {// If the Escape key is pressed, close the open card, side menu, about popup, and thank you dialog
    closeSelectedCard();
    closeMenu();
    closeAboutPopup();
    closeThankYouDialog();
  }
});
if (anthemButton && anthemAudio) {// Add click event listener to the national anthem button
  anthemButton.addEventListener("click", function () {// When the anthem button is clicked, check if the anthem audio is currently paused
    if (anthemAudio.paused) {// If the anthem audio is currently paused, play it
      anthemAudio.currentTime = 0;
      anthemAudio.play()
        .then(function () {// If the anthem audio starts playing successfully, update the button text and style to indicate that the anthem is playing
          anthemButton.textContent = "PAUSE ANTHEM";
          anthemButton.classList.add("playing");
        })
        .catch(function () {// If there is an error playing the anthem audio, reset the button text and style, and show an alert to the user
          anthemButton.textContent = "NATIONAL ANTHEM";
          anthemButton.classList.remove("playing");
          alert("The anthem audio could not be played. Please check that nationalAnthem.mp3 is uploaded with the correct file name.");
        });
    } else {// If the anthem audio is currently playing, pause it and reset the button text and style
      anthemAudio.pause();
      anthemButton.textContent = "NATIONAL ANTHEM";
      anthemButton.classList.remove("playing");
    }
  });
  anthemAudio.addEventListener("ended", function () {// Add an event listener to the anthem audio to reset the button text and style when the anthem finishes playing
    anthemButton.textContent = "NATIONAL ANTHEM";
    anthemButton.classList.remove("playing");
  });
}
function openThankYouDialog() {// Function to open the thank you dialog
  if (thankYouDialog) {// Check if the thank you dialog element exists
    thankYouDialog.classList.add("show");
  }
}
function closeThankYouDialog() {// Function to close the thank you dialog
  if (thankYouDialog) {// Check if the thank you dialog element exists
    thankYouDialog.classList.remove("show");
  }
}
if (inquiryForm) {// Add submit event listener to the inquiry form
  inquiryForm.addEventListener("submit", function (event) {// When the inquiry form is submitted, prevent the default form submission behavior, open the thank you dialog, and reset the form
    event.preventDefault();
    openThankYouDialog();
    inquiryForm.reset();
  });
}
if (dialogClose) {// Add click event listener to the close button for the thank you dialog
  dialogClose.addEventListener("click", function () {// When the close button is clicked, close the thank you dialog
    closeThankYouDialog();
  });
}
if (dialogOk) {// Add click event listener to the OK button for the thank you dialog
  dialogOk.addEventListener("click", function () {// When the OK button is clicked, close the thank you dialog
    closeThankYouDialog();
  });
}
if (thankYouDialog) {// Add click event listener to the thank you dialog to close it when clicking outside of the dialog content
  thankYouDialog.addEventListener("click", function (event) {// When the thank you dialog is clicked, check if the click target is the thank you dialog itself (i.e., outside of the dialog content), and if so, close the thank you dialog
    if (event.target === thankYouDialog) {// If the click target is the thank you dialog itself, close the thank you dialog
      closeThankYouDialog();
    }
  });
}