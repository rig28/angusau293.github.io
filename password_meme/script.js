var stage = 1;

var entry_label = document.getElementById("entry_label");
entry_label.textContent = "Enter password";

function takeInput() {
    var entry = document.getElementById("entry").value;
    if (stage == 1) {
        if (entry == "password") {
            entry_label.textContent = "Try again";

            stage = 2;
        } else {
            alert("Hint: Enter password.");
        }
    } else if (stage == 2) {
        if (entry == "again") {
            entry_label.textContent = "Try again later";

            stage = 3;
        } else {
            alert("Hint: Try again.");
        }
    } else if (stage == 3) {
        if (entry == "again later") {
            window.location = "bruh.html";
        } else {
            alert("Hint: Try again later.");
        }
    }
}
