// Name input elements - cursor shows in name field on page load
let userName = document.getElementById("name");
userName.focus();

// Job roles drop-down menu elements
let role = document.getElementById("title");
let otherRole = document.getElementById("other-job-role");
otherRole.style.display = "none";

// When role is changed to other, the otherRole elements become visible
role.addEventListener("change", () => {
    if (role.value === "other") {
        otherRole.style.display = "block";
    } else {
        otherRole.style.display = "none";
    }
});

// T-shirt information elements
let shirtDesign = document.getElementById("design");
let shirtColor = document.getElementById("color");

// Color field disabled on page load
shirtColor.disabled = true;

// Allows design to change and when changed, the color field becomes visible and changeable
shirtDesign.addEventListener("change", (e) => {
    let color = shirtColor.children;
    let selectedColor = shirtColor.firstElementChild;

    shirtColor.disabled = false;
    selectedColor.removeAttribute("selected");

    
    for(let i=0; i < color.length; i++) {
         let design = e.target.value;
         let shirt = color[i].getAttribute("data-theme");

        if (shirt == design) {
            color[i].hidden = false;
            color[i].selected = true;
        } else {
            color[i].hidden = true;
            color[i].selected = false;
        }
    }
});

// Register for activities elements - total cost calculated and updated
let activityRegistration = document.getElementById("activities");
let cost = document.getElementById("activities-cost");
let total = 0;

activityRegistration.addEventListener("change", (e) => {
    let eachActivity =+ e.target.getAttribute("data-cost");
        if (e.target.checked) {
            total += eachActivity;
        } else {
            total -= eachActivity;
        }
    cost.innerHTML = `Total: $${total}`;
});

// Payment information elements - when one payment option is chosen, the others get hidden
let payment = document.getElementById("payment");
let creditCard = document.getElementById("credit-card");
let paypal = document.getElementById("paypal");
let bitcoin = document.getElementById("bitcoin");

paypal.style.display = "none";
bitcoin.style.display = "none";

payment.children[1].setAttribute("selected", true);

payment.addEventListener("change", (e) => {
    let selectedOption = e.target.value;

    if (selectedOption === "bitcoin") {
        bitcoin.style.display = "block";
        paypal.style.display = "none";
        creditCard.style.display = "none";
    } else if (selectedOption === "paypal") {
        bitcoin.style.display = "none";
        paypal.style.display = "block";
        creditCard.style.display = "none";
    } else {
        bitcoin.style.display = "none";
        paypal.style.display = "none";
        creditCard.style.display = "block";
    }
})

// Form validation elements - validation makes sure the inputted info is valid and accurate
let email = document.getElementById("email");
let cardNumber = document.getElementById("cc-num");
let zipCode = document.getElementById("zip");
let cvv = document.getElementById("cvv");
let form = document.querySelector("form");

// Name Validation
function isNameValid () {
    let nameRegex = /^[a-zA-Z]+\s?[a-zA-Z]*?\s?[a-zA-Z]*?$/.test(userName.value);
    if (nameRegex === true) {
        userName.parentNode.className = "valid";
        userName.parentNode.lastElementChild.style.display = "none";
        return nameRegex
    } else {
        userName.parentNode.className = "not-valid";
        userName.parentNode.lastElementChild.style.display = "block";
        userName.parentNode.lastElementChild.textContent = "Please don't leave this field blank. Input a valid name that only contains letters"
        return nameRegex
    }
}

// Email Validation
function isEmailValid () {
    let emailRegex = /^[^@]+@[^@.]+\.[a-z]+$/i.test(email.value);
    if (emailRegex === true) {
        email.parentNode.className = "valid";
        email.parentNode.lastElementChild.style.display = "none";
        return emailRegex
    } else {
        email.parentNode.className = "not-valid";
        email.parentNode.lastElementChild.style.display = "block";
        email.parentNode.lastElementChild.textContent = "Please don't leave this field blank. Input a valid email."
        return emailRegex
    }
}

// Activity Checkbox Validation
function isActivitiesValid () {
    let checked = document.querySelectorAll("[type='checkbox']:checked");
    let activities = document.getElementById("activities-box");
    if (checked.length > 0) {
        activities.parentNode.classList.add("valid");
        activities.parentNode.lastElementChild.style.display = "none";
        activities.parentNode.classList.remove("not-valid");
        return true
    } else {
        activities.parentNode.classList.add("not-valid");
        activities.parentNode.lastElementChild.style.display = "block";
        return false
    }
}

// Card Number Validation
function isCardNumValid () {
    let cardNumRegex = /^\b\d{13,16}\b$/i.test(cardNumber.value);
    if (cardNumRegex === true) {
        cardNumber.parentNode.className = "valid";
        cardNumber.parentNode.lastElementChild.style.display = "none";
        return cardNumRegex
    } else {
        cardNumber.parentNode.className = "not-valid";
        cardNumber.parentNode.lastElementChild.style.display = "block";
        cardNumber.parentNode.lastElementChild.textContent = "Please don't leave this field blank. Input a valid 13-16 digit card number."
        return cardNumRegex
    }
}

// Zip Code Validation
function isZipCodeValid () {
    let zipCodeRegex = /^[0-9]{5}$/i.test(zipCode.value);
    if (zipCodeRegex === true) {
        zipCode.parentNode.className = "valid";
        zipCode.parentNode.lastElementChild.style.display = "none";
        return zipCodeRegex
    } else {
        zipCode.parentNode.className = "not-valid";
        zipCode.parentNode.lastElementChild.style.display = "block";
        zipCode.parentNode.lastElementChild.textContent = "Please don't leave this field blank. Input a valid 5-digit zip code."
        return zipCodeRegex
    }
}

// CVV Number Validation
function isCvvValid () {
    let cvvRegex = /^[0-9]{3}$/i.test(cvv.value);
    if (cvvRegex === true) {
        cvv.parentNode.className = "valid";
        cvv.parentNode.lastElementChild.style.display = "none";
        return cvvRegex
    } else {
        cvv.parentNode.className = "not-valid";
        cvv.parentNode.lastElementChild.style.display = "block";
        cvv.parentNode.lastElementChild.textContent = "Please don't leave this field blank. Input a valid 3-digit cvv number."
        return cvvRegex
    }
}

// Accessibility - allows to tab through inputs and displays error messages in missing fields
let checkbox = document.querySelectorAll("#activities-box input");

for (let i=0; i < checkbox.length; i++) {
    checkbox[i].addEventListener("focus", (e) => {
        checkbox[i].parentElement.classList.add("focus");
    });
    checkbox[i].addEventListener("blur", (e) => {
        checkbox[i].parentElement.classList.add("blur");
    });
}

// Form can be submitted and page will refresh when all data is validated; othersie, errors will show in missing fields
form.addEventListener("submit", (e) => {
    if (isNameValid() && isEmailValid() && isActivitiesValid() &&  isCardNumValid() && isZipCodeValid() && isCvvValid()) {
        console.log("form submitted");
    } else {
        isNameValid();
        isEmailValid();
        isActivitiesValid();
        isCardNumValid();
        isZipCodeValid();
        isCvvValid();
        e.preventDefault();
    }
})