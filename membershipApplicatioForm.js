// Caution! These regex examples are obtained from the internet.
var TELEPHONE_REGEX =
    /^\(?(?:(?:0(?:0|11)\)?[\s-]?\(?|\+)44\)?[\s-]?\(?(?:0\)?[\s-]?\(?)?|0)(?:\d{2}\)?[\s-]?\d{4}[\s-]?\d{4}|\d{3}\)?[\s-]?\d{3}[\s-]?\d{3,4}|\d{4}\)?[\s-]?(?:\d{5}|\d{3}[\s-]?\d{3})|\d{5}\)?[\s-]?\d{4,5}|8(?:00[\s-]?11[\s-]?11|45[\s-]?46[\s-]?4\d))(?:(?:[\s-]?(?:x|ext\.?\s?|\#)\d+)?)$/;
var POSTCODE_REGEX =
    /^(GIR ?0AA|[A-PR-UWYZ]([0-9]{1,2}|([A-HK-Y][0-9]([0-9ABEHMNPRV-Y])?)|[0-9][A-HJKPS-UW]) ?[0-9][ABD-HJLNP-UW-Z]{2})$/;


function validate(inputElement) {
    console.log("validate() called for inputElement:", inputElement);

    if (!inputElement) {
        // This error may be caused by calling document.getElementById()
        // but there is no HTML element with the id attribute value you provide
        alert("validate() called with no input element");
        return false;
    }

    var feedbackElement = document.getElementById("feedback_" + inputElement.id);
    if (!feedbackElement) {
        // this error may be caused by adding an input with e.g. id="name"
        // but no matching feedback element with e.g. id="feedback_name"
        alert(
            "validate() called but there is no element to provide feedback for this input (see console)"
        );
        return false;
    }

    var pattern; // regular expression to match input against
    var feedback; // feedback about input if it is invalid

    if (inputElement.id == "firstname") {
        // any character, 2 or more of these characters
        pattern = /^.{2,20}$/;
        feedback =
            "The first name is required. At least two characters and no more than 20 characters.";
    }

    if (inputElement.id == "lastname") {
        pattern = /^.{2,}$/;
        feedback = "The last name is required. At least two characters.";
    }

    if (inputElement.id == "house") {
        pattern = /^.{1,}$/;
        feedback = "A name or number of house is required.";
    }

    if (inputElement.id == "add2") {
        pattern = /^.{2,}$/;
        feedback = "An address is required.";
    }

    if (inputElement.id == "city") {
        pattern = /^.{5,}$/;
        feedback = "A name of city is required.";
    }

    if (inputElement.id == "postcode") {
        // regex sourced online
        pattern = POSTCODE_REGEX;
        feedback = "A valid postcode is required";
    }

    if (inputElement.id == "telmobile") {
        // regex sourced online
        pattern = TELEPHONE_REGEX;
        feedback = "Please enter as just the number without any spaces";
    }

    if (inputElement.id == "email") {
        //.+ = 1+ of any character, \@ = one @ symbol
        pattern = /^.+\@.+$/;
        feedback = "name@domain";
    }

    // check that this is an input element we know how to validate
    if (!pattern) {
        // this error may be caused by adding an input with e.g. id="name"
        // but no matching line above if (inputElement.id == "name")...
        alert("validate() called but input id is not recognised (see console)");
        return false;
    }

    // read the input value from the input element
    var value = inputElement.value;
    // assuming the input is valid
    var valid = true;

    // test the input value against the regular expression pattern
    if (pattern.test(value)) {
        feedback = "valid";
        // set the class attribute value of the feedback element to change its colour
        feedbackElement.className = "valid";
    } else {
        // set the class attribute value of the feedback element to change its colour
        feedbackElement.className = "invalid";
        // the value is invalid
        valid = false;
    }

    // show the feedback message on the page
    feedbackElement.innerText = "Input " + feedback;
    if (value != "") {
        // if there is a value, show this too
        feedbackElement.innerText += ": " + value;
    }

    return valid;
}

function validateForm() {
    // assuming the form is valid
    var valid = true;

    // validate each known input
    valid = valid && validate(document.getElementById("firstname"));
    valid = valid && validate(document.getElementById("lastname"));
    valid = valid && validate(document.getElementById("house"));
    valid = valid && validate(document.getElementById("add2"));
    valid = valid && validate(document.getElementById("city"));
    valid = valid && validate(document.getElementById("postcode"));
    valid = valid && validate(document.getElementById("telmobile"));
    valid = valid && validate(document.getElementById("email"));

    // feedback if form cannot be submitted
    if (!valid) {
        alert("Form data is invalid - please check and try again!");
    }

    return valid;
}
