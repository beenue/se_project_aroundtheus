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

/*Elements  */
/* Note to code reviewer ~~ is there a shortcut to have these comments become banners to better organize the code? I saw something like that in the video walkthroughs and was curious */

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileModalCloseButton = profileEditModal.querySelector(
  "#modal-close-button"
);
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profileNameInput = document.querySelector("#profile-name-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = profileEditModal.querySelector(".modal__form");

const cardAddModal = document.querySelector("#card-add-modal");
const cardAddForm = cardAddModal.querySelector(".modal__form");
const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardAddButton = document.querySelector("#card-add-button");
const modal = document.querySelector(".modal");
const cardAddModalCloseButton = cardAddModal.querySelector(
  "#modal-close-button"
);
const cardTitleInput = cardAddForm.querySelector("#card-title-input");
const cardLinkInput = cardAddForm.querySelector("#card-link-input");

const cardModal = document.querySelector("#cardModal");
const cardModalTitle = document.querySelector("#card-modal__input-title");
const cardModalLink = document.querySelector("#card-modal__input-imagelink");
const cardModalClose = document.querySelector("#card-modal__close");
const cardModalSave = document.querySelector("#cardModal__button");
const cardModalForm = document.forms["cardModalForm"];
const cardModalImage = document.querySelector(".cardImage__modal-image");
const imageModaltext = document.querySelector(".card__imageModal-text");

const previewImageModal = document.querySelector("#preview-image-modal");
const previewImage = previewImageModal.querySelector("#preview-card-image");
const previewModalCaption = previewImageModal.querySelector(
  ".modal__image-caption"
);
const previewImageClose = previewImageModal.querySelector(
  "#modal-close-button"
);
/* Functions */

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");

  const likeButton = cardElement.querySelector(".card__button");
  likeButton.addEventListener("click", () =>
    likeButton.classList.toggle("card__button_active")
  );

  cardTitleEl.textContent = cardData.name;
  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;

  //---preview image code ---//
  cardImageEl.addEventListener("click", () => {
    previewImage.src = cardData.link;
    previewImage.alt = cardData.name;
    previewModalCaption.textContent = cardData.name;
    openPopup(previewImageModal);
  });

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => cardElement.remove());

  return cardElement;
}

function openPopup(modal) {
  modal.classList.add("modal_opened");
}

function closePopup(modal) {
  modal.classList.remove("modal_opened");
}

function renderCard(cardData) {
  const cardElement = getCardElement(cardData);
  cardListEl.prepend(cardElement);
}

/* Event Handlers */

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileDescription.textContent = profileDescriptionInput.value;
  profileName.textContent = profileNameInput.value;
  closePopup(profileEditModal);
}

function handlecCardAddSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardLinkInput.value;
  renderCard({ name, link }, cardListEl);
  closePopup(cardAddModal);
}

function handleImageClick(imageData) {
  openModal(cardImageModal);
  cardModalImage.src = imageData.link;
  imageModaltext.textContent = imageData.name;
  cardModalImage.alt = imageData.alt;
}

/* Event Listeners */
profileEditButton.addEventListener("click", () => {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopup(profileEditModal);
});

profileModalCloseButton.addEventListener("click", () =>
  closePopup(profileEditModal)
);

cardAddButton.addEventListener("click", () => {
  cardTitleInput.value = "";
  cardLinkInput.value = "";
  openPopup(cardAddModal);
});

cardAddModalCloseButton.addEventListener("click", () =>
  closePopup(cardAddModal)
);

previewImageClose.addEventListener("click", () =>
  closePopup(previewImageModal)
);

//escape key close
function handleEscape(evt) {
  if (evt.key === "Escape") {
    const modalOpened = document.querySelectorAll(".modal_opened");
    closePopup(modalOpened);
  }
}

//overlay close
const modals = document.querySelectorAll(".modal");
modals.forEach((modal) => {
  modal.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("modal_opened")) {
      closePopup(modal);
    }
    if (evt.target.classList.contains("modal__close")) {
      closePopup(modal);
    }
  });
});

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

cardAddForm.addEventListener("submit", handlecCardAddSubmit);

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));
