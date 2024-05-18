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
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

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
const profileEditClose = profileEditModal.querySelector(
  "#profile-edit-modal-close"
);
const addNewCardButton = document.querySelector("#profile-add-button");
const addCardClose = addCardModal.querySelector("#add-card-modal-close");
const profileName = document.querySelector("#profile-name");
const profileDescription = document.querySelector("#profile-description");
const closeImageModal = previewImageModal.querySelector(".modal__close");

// Form data
const profileNameInput = document.querySelector("#profile-name-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

const cardTitleInput = addCardForm.querySelector("#card-title-input");
const cardImageInput = addCardForm.querySelector("#card-image-input");

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

function renderCard(cardData, wrapper) {
  const cardElement = getCardElement(cardData);
  wrapper.prepend(cardElement);
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageEl.addEventListener("click", () => {
    previewImageImageEl.src = cardData.link;
    previewImageTextEl.textContent = cardData.name;
    previewImageImageEl.alt = cardData.name;
    openPopup(previewImageModal);
  });

  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  cardTitleEl.textContent = cardData.name;

  return cardElement;
}

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.innerText = profileDescriptionInput.value;
  closePopup(profileEditModal);
}

function handleAddCardSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardImageInput.value;
  renderCard({ name, link }, cardListEl);
  e.target.reset();
  closePopup(addCardModal);
}

// Form listeners
profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardForm.addEventListener("submit", handleAddCardSubmit);
profileEditBtn.addEventListener("click", () => {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.innerText;
  openPopup(profileEditModal);
});

addNewCardButton.addEventListener("click", () => openPopup(addCardModal));

const closeButtons = document.querySelectorAll(".modal__close");

closeButtons.forEach((button) => {
  const modal = button.closest(".modal");
  button.addEventListener("click", () => closePopup(modal));
});

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));
