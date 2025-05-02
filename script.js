// Corrected Initial Values
let remainingMonthly = 1268.00;
let firstHalf = 173.00;
let secondHalf = 1095.00;
let displayValue = "0";

// Update the calculator display
function updateDisplay() {
    document.getElementById("display").innerText = displayValue;
}

// Add a digit to the calculator display
function addToDisplay(num) {
    if (displayValue === "0") {
        displayValue = num.toString();
    } else {
        displayValue += num.toString();
    }
    updateDisplay();
}

// Play audio by element ID
function playSound(id) {
    const sound = document.getElementById(id);
    if (sound) {
        sound.currentTime = 0;
        sound.play();
    }
}

// Adjust budget for monthly, first half, or second half
function adjustBudget(action, target) {
    const amount = parseFloat(displayValue);
    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid positive amount.");
        return;
    }

    let updatedValue;

    // Play "yeah boii" on all additions
    if (action === "add") {
        playSound("sound-add");
    }

    switch (target) {
        case "monthly":
            updatedValue = action === "add" ? remainingMonthly + amount : remainingMonthly - amount;
            remainingMonthly = updatedValue;
            document.getElementById("total-remaining").innerText = `$${remainingMonthly.toFixed(2)}`;
            if (action === "subtract") playSound("sound-monthly-subtract");
            break;

        case "first":
            updatedValue = action === "add" ? firstHalf + amount : firstHalf - amount;
            firstHalf = updatedValue;
            document.getElementById("first-half").innerText = `$${firstHalf.toFixed(2)}`;
            if (action === "subtract") playSound("sound-first");
            break;

        case "second":
            updatedValue = action === "add" ? secondHalf + amount : secondHalf - amount;
            secondHalf = updatedValue;
            document.getElementById("second-half").innerText = `$${secondHalf.toFixed(2)}`;
            if (action === "subtract") playSound("sound-second");
            break;
    }

    // Show updated amount
    document.getElementById("updated-amount").innerText = `$${updatedValue.toFixed(2)}`;

    // Reset display
    displayValue = "0";
    updateDisplay();
}
