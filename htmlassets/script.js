function changeButtonText(value) {
	var submit = document.getElementById('submitbutton');
    var registeraction = document.getElementById('register-action');
    var personalbutton = document.getElementById('personalbutton');
    var corporatebutton = document.getElementById('corporatebutton');
    if (value === "Next: Personal Details") {
        submit.value = value;
        registeraction.action = "personal.html";
        personalbutton.style.display = "block";
        corporatebutton.style.display = "none";
    } else if (value === "Next: Corporate Details") {
        submit.value = value;
        registeraction.action = "corporate.html";
        personalbutton.style.display = "none";
        corporatebutton.style.display = "block";
    };
}