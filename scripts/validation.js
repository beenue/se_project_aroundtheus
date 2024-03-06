// enabling validation by calling enableValidation()
// pass all the settings on call

function showInputError (formEls, inputEls, { inputErrorClass, errorClass}) {
        const errorMessageEls = formEls.querySelector(`#${inputEls.id}-error`);
        inputEls.classList.add(inputErrorClass);
        errorMessageEls.textContent = inputEls.validationMessage;
        errorMessageEls.classList.add(errorClass);
}

function hideInputError (formEls, inputEls, { inputErrorClass, errorClass}) {
    const errorMessageEls = formEls.querySelector(`#${inputEls.id}-error`);
    inputEls.classList.remove(inputErrorClass);
    errorMessageEls.textContent = '';
    errorMessageEls.classList.remove(errorClass);
}

function checkInputValidity (formEls, inputEls, options) {
    if (!inputEls.validity.valid) {
        showInputError(formEls, inputEls, options);
    } else {
        hideInputError (formEls, inputEls, options);
    }
}

function toggleButtonState (inputEls, submitButton, { inactiveButtonClass}) {
    let foundInvalid = false;
   
  inputEls.forEach((inputEl) => {
    inputEl.addEventListener ('input', (e) => {
        checkInputValidity (formEls, inputEl, options);
        toggleButtonState (inputEls, submitButton, options);
    });
  })
  const checkFormValidity  = inputs => inputs.every(input => input.validity.valid);

  const toggleButtonState = (inputEls, submitButton, option) => { 
    const isFormValid = checkFormValidity(inputEls);
  }
/*if (!inputEl.validity.valid) {
        foundInvalid = true;
    }
  });

    if(foundInvalid) {
        submitButton.classList.add (inactiveButtonClass);
        submitButton.disabled = true;
    } else {
        submitButton.classList.remove (inactiveButtonClass);
        submitButton.disabled = false;
    }
    */
}

function setEventListeners (formEls, options) {
    const {inputSelector} = options;
    const {submitButtonSelector} = options;
    const inputEls = [...formEls.querySelectorAll(inputSelector)];
    const submitButton = formEls.querySelector(submitButtonSelector);

    inputEls.forEach ((inputEls) => {
        inputEls.addEventListener ('input', (e) => {
            checkInputValidity (formEls, inputEls, options);
            toggleButtonState(inputEls, submitButton, options);
        });
    })
}

function enableValidation (options) {
    const formEls = [...document.querySelectorAll(options.formSelector)];
    formEls.forEach((formEls) => {
        formEls.addEventListener("submit", (e) => {
            e.preventDefault();
        });

        setEventListeners(formEls, options);
//look for inputs inside of form
//loop through to see if valid
    //if not valid
        //get validation message
        //add error class to input
        //display error message
        //disable button
    //if valid
        //enable button
        //reset error message

    });
}





const config ={
    formSelector: ".modal__form",
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__button",
    inactiveButtonClass: "modal__button_disabled",
    inputErrorClass: "modal__input_type_error",
    errorClass: "modal__error_visible"
  };


enableValidation(config);