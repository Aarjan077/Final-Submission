const himalayas = document.getElementById("himalayas-region");
const hills = document.getElementById("hills-region");
const terai = document.getElementById("terai-region");

himalayas.addEventListener("click", () => {
  document.getElementById("himalayas").scrollIntoView({
    behavior: "smooth"
  });
});

hills.addEventListener("click", () => {
  document.getElementById("hills").scrollIntoView({
    behavior: "smooth"
  });
});

terai.addEventListener("click", () => {
  document.getElementById("terai").scrollIntoView({
    behavior: "smooth"
  });
});