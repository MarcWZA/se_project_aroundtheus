import Section from "../components/Section.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImages from "../components/PopupWithImages.js";
import UserInfo from "../components/UserInfo.js";
import "./index.css";
import { initialCards, validationSettings } from "../utils/constants.js";

// Templates
const cardTemplate = "#card-template";

// Wrappers
const cardListEl = document.querySelector("#card-list");

//Form elements
const profileNameInput = document.querySelector("#profile-name-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

// Buttons and other DOM nodes
const profileEditBtn = document.querySelector("#profile-edit-button");
const addNewCardButton = document.querySelector("#profile-add-button");

// Initialize UserInfo instance
const userInfo = new UserInfo({
  nameSelector: "#profile-name",
  jobSelector: "#profile-description",
});

// Function to create and render a card
function createCard(cardData) {
  const card = new Card(cardData, cardTemplate, handleImageClick);
  return card.getView();
}

// Renderer function
function renderer(cardData) {
  const cardElement = createCard(cardData);
  cardListEl.prepend(cardElement);
}

// Initialize the Section class with the initial cards and renderer function
const section = new Section(
  {
    items: initialCards,
    renderer: renderer,
  },
  "#card-list"
);

// Initialize form validators
const profileEditForm = document.forms["profile-edit-form"];
const addCardForm = document.forms["add-card-form"];
const editFormValidator = new FormValidator(
  validationSettings,
  profileEditForm
);
const addFormValidator = new FormValidator(validationSettings, addCardForm);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

// Initialize PopupWithForm instances
const profileEditModal = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);
profileEditModal.setEventListeners();
const addCardModal = new PopupWithForm("#add-card-modal", handleAddCardSubmit);
addCardModal.setEventListeners();

// Initialize PopupWithImage instance
const previewImageModal = new PopupWithImages("#image-modal");
previewImageModal.setEventListeners();

// Functions to handle opening and closing of modals
function handleProfileEditSubmit(data) {
  userInfo.setUserInfo({ name: data.name, job: data.description });
  profileEditModal.close();
}

function handleAddCardSubmit(data) {
  const name = data.title;
  const link = data.url;
  renderer({ name, link });
  addCardModal.close();
  addFormValidator.disableButton();
}

// Form listeners
profileEditBtn.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  profileNameInput.value = userData.name.trim();
  profileDescriptionInput.value = userData.job.trim();
  editFormValidator.resetValidation();
  profileEditModal.open();
});

addNewCardButton.addEventListener("click", () => {
  addFormValidator.resetValidation();
  addCardModal.open();
});

// Close buttons for modals
const closeButtons = document.querySelectorAll(".modal__close");

closeButtons.forEach((button) => {
  const modal = button.closest(".modal");
  button.addEventListener("click", () => {
    if (modal.id === "profile-edit-modal") {
      profileEditModal.close();
    } else if (modal.id === "add-card-modal") {
      addCardModal.close();
    } else if (modal.id === "image-modal") {
      previewImageModal.close();
    }
  });
});

// Function to handle image click
function handleImageClick({ name, link }) {
  previewImageModal.open({ name, link });
}
