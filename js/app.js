//relocation on hexa.html if the session is loaded (if it has a saved cookie if the user is logged in)
let session = new Session();
session = session.getSession();

if (session !== "") {
  window.location.href = "hexa.html";
}

//open - close modal
//select items
const btnRegistration = document.querySelector("#btnRegistration");
const closeModal = document.querySelector("#closeModal");

btnRegistration.addEventListener("click", function openModal() {
  document.querySelector(".main-wrapper").style.display = "none";
  document.querySelector(".customModal").style.display = "block";
});

closeModal.addEventListener("click", function closeModal() {
  document.querySelector(".customModal").style.display = "none";
  document.querySelector(".main-wrapper").style.display = "block";
});
