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

// Adjust budget for preview only (no actual value change)
function adjustBudget(action, target) {
    const amount = parseFloat(displayValue);
    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid positive amount.");
        return;
    }

    let updatedValue;

    // Play sounds
    if (action === "add") {
        playSound("sound-add");
    }

    switch (target) {
        case "monthly":
            updatedValue = action === "add"
                ? remainingMonthly + amount
                : remainingMonthly - amount;
            if (action === "subtract") playSound("sound-monthly-subtract");
            break;

        case "first":
            updatedValue = action === "add"
                ? firstHalf + amount
                : firstHalf - amount;
            if (action === "subtract") playSound("sound-first");
            break;

        case "second":
            updatedValue = action === "add"
                ? secondHalf + amount
                : secondHalf - amount;
            if (action === "subtract") playSound("sound-second");
            break;
    }

    // Update "Updated Amount" text
    const updatedDisplay = document.getElementById("updated-amount");
    updatedDisplay.innerText = `$${updatedValue.toFixed(2)}`;

    // Remove any existing animation classes
    updatedDisplay.classList.remove("pop", "wiggle");

    if (action === "add") {
        // Delay wiggle: wait 1.37s, then wiggle for 7s
        setTimeout(() => {
            updatedDisplay.classList.add("wiggle");
            setTimeout(() => {
                updatedDisplay.classList.remove("wiggle");
            }, 7000); // wiggle for 7 seconds
        }, 1370); // wait 1.37 seconds
    } else {
        // Pop instantly if subtracting
        updatedDisplay.classList.add("pop");
        setTimeout(() => updatedDisplay.classList.remove("pop"), 200);
    }

    // Reset display
    displayValue = "0";
    updateDisplay();
}
