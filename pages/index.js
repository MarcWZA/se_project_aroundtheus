import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

// Templates
const cardTemplate = "#card-template";

// Wrappers
const cardListEl = document.querySelector("#card-list");
const profileEditModal = document.querySelector("#profile-edit-modal");
const addCardModal = document.querySelector("#add-card-modal");
const profileEditForm = profileEditModal.querySelector("#profile-edit-form");
const addCardForm = addCardModal.querySelector("#add-card-form");
const previewImageModal = document.querySelector("#image-modal");
const previewImageImageEl = previewImageModal.querySelector(".modal__image");
const previewImageTextEl = previewImageModal.querySelector(".modal__caption");

// Buttons and other DOM nodes
const profileEditBtn = document.querySelector("#profile-edit-button");
const addNewCardButton = document.querySelector("#profile-add-button");
const profileName = document.querySelector("#profile-name");
const profileDescription = document.querySelector("#profile-description");

// Form data
const profileNameInput = document.querySelector("#profile-name-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

const cardTitleInput = addCardForm.querySelector("#card-title-input");
const cardImageInput = addCardForm.querySelector("#card-image-input");

// Validation
const validationSettings = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};
const editFormValidator = new FormValidator(
  validationSettings,
  profileEditForm
);
const addFormValidator = new FormValidator(validationSettings, addCardForm);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

// Functions
function openPopup(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscKeyPress);
  modal.addEventListener("click", handleClickOutside);
}

function closePopup(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscKeyPress);
  modal.removeEventListener("click", handleClickOutside);
}

function handleEscKeyPress(e) {
  if (e.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    if (openedModal) {
      closePopup(openedModal);
    }
  }
}

function handleClickOutside(e) {
  const modal = e.currentTarget;
  if (modal === e.target) {
    closePopup(modal);
  }
}

function handleImageClick({ name, link }) {
  previewImageImageEl.src = link;
  previewImageTextEl.textContent = name;
  previewImageImageEl.alt = name;
  openPopup(previewImageModal);
}

function renderCard(cardData, wrapper) {
  const card = new Card(cardData, cardTemplate, handleImageClick);
  const cardElement = card.getView();
  if (cardElement) {
    wrapper.prepend(cardElement);
  } else {
    console.error("Failed to create card element");
  }
}

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.innerText = profileDescriptionInput.value;
  closePopup(profileEditModal);
  const submitButton = profileEditForm.querySelector(
    validationSettings.submitButtonSelector
  );
  submitButton.classList.add(validationSettings.inactiveButtonClass);
  submitButton.disabled = true;
}

function handleAddCardSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardImageInput.value;
  renderCard({ name, link }, cardListEl);
  closePopup(addCardModal);
  addCardForm.reset();
  addFormValidator.resetValidation();
}

// Form listeners
profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardForm.addEventListener("submit", handleAddCardSubmit);
profileEditBtn.addEventListener("click", () => {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.innerText;
  editFormValidator.resetValidation();
  openPopup(profileEditModal);
});

addNewCardButton.addEventListener("click", () => {
  addFormValidator.resetValidation();
  openPopup(addCardModal);
});

const closeButtons = document.querySelectorAll(".modal__close");

closeButtons.forEach((button) => {
  const modal = button.closest(".modal");
  button.addEventListener("click", () => closePopup(modal));
});

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));
