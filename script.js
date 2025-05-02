// Corrected Initial Values
let remainingMonthly = 1268.00;
let firstHalf = 173.00;
let secondHalf = 1095.00;
let displayValue = "0";

// Update display
function updateDisplay() {
    document.getElementById("display").innerText = displayValue;
}

// Add number to display
function addToDisplay(num) {
    if (displayValue === "0") {
        displayValue = num.toString();
    } else {
        displayValue += num.toString();
    }
    updateDisplay();
}

// Adjust budget
function adjustBudget(action, target) {
    const amount = parseFloat(displayValue);
    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid positive amount.");
        return;
    }

    let updatedValue;
    switch (target) {
        case "monthly":
            updatedValue = action === "add" ? remainingMonthly + amount : remainingMonthly - amount;
            remainingMonthly = updatedValue;
            document.getElementById("remaining-monthly").innerText = `$${remainingMonthly.toFixed(2)}`;
            break;
        case "first":
            updatedValue = action === "add" ? firstHalf + amount : firstHalf - amount;
            firstHalf = updatedValue;
            document.getElementById("first-half").innerText = `$${firstHalf.toFixed(2)}`;
            break;
        case "second":
            updatedValue = action === "add" ? secondHalf + amount : secondHalf - amount;
            secondHalf = updatedValue;
            document.getElementById("second-half").innerText = `$${secondHalf.toFixed(2)}`;
            break;
    }

    document.getElementById("updated-amount").innerText = `$${updatedValue.toFixed(2)}`;
    displayValue = "0";
    updateDisplay();
}
