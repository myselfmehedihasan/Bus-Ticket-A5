console.log("connected");

const allBtnContainer = document.getElementById("seat-id");
const allBtns = allBtnContainer.querySelectorAll("button"); // Select all buttons inside the container

let count = 0; // Initialize a counter to track the number of selected buttons
let seatPrice = 500; // Price per seat
const seatClass = "Economy"; // Class of the seat

for (const btn of allBtns) {
  btn.addEventListener("click", function (e) {
    const seatId = e.target.innerText; // Get the seat number

    
    handleSeatSelection(e.target, seatId, seatClass, seatPrice);

    
    setInnerText("seat-count", count);
  });
}

// Function to create and append a new row
function addRow(seatNumber, seatClass, seatPrice) {
  const tbody = document.querySelector("tbody");

  // Check if the row already exists
  if (tbody.querySelector(`tr[data-seat-id="${seatNumber}"]`)) {
    return; // Prevent duplicate rows
  }

  // Create a new <tr> element
  const tr = document.createElement("tr");
  tr.setAttribute("data-seat-id", seatNumber); // Add a custom attribute for easy identification

  // Create the <td> elements
  const tdSeatNumber = document.createElement("td");
  tdSeatNumber.textContent = seatNumber;

  const tdSeatClass = document.createElement("td");
  tdSeatClass.textContent = seatClass;

  const tdSeatPrice = document.createElement("td");
  tdSeatPrice.textContent = seatPrice;

  // Append the <td> elements to the <tr>
  tr.appendChild(tdSeatNumber);
  tr.appendChild(tdSeatClass);
  tr.appendChild(tdSeatPrice);

  // Append the <tr> to the <tbody>
  tbody.appendChild(tr);

  // Update the total price
  updateTotalPrice(seatPrice);
}

// Function to remove a row 
function removeRow(seatNumber, seatPrice) {
  const tbody = document.querySelector("tbody");
  const row = tbody.querySelector(`tr[data-seat-id="${seatNumber}"]`); // Find the row with the matching seat number
  if (row) {
    tbody.removeChild(row); // Remove the row from the table

    // Update the total price
    updateTotalPrice(-seatPrice);
  }
}

// Function to handle seat 
function handleSeatSelection(button, seatId, seatClass, seatPrice) {
  // Check if the button is already selected
  if (button.classList.contains("selected")) {
    count--; // Decrement the count
    button.classList.remove("selected");
    button.style.backgroundColor = ""; // Reset the background color
    button.style.color = ""; // Reset the text color

    // Remove the corresponding row from the table
    removeRow(seatId, seatPrice);
  } else {
    count++; // Increment the count
    button.classList.add("selected");
    button.style.backgroundColor = "#1DD100"; // Set the background color to green
    button.style.color = "white"; // Set the text color to white

    // Add a new row to the table
    addRow(seatId, seatClass, seatPrice);
  }
}

// Function to update the total price & grand total price
function updateTotalPrice(amount) {
  const totalPriceElement = document.getElementById("totalPrice");
  const currentTotal = parseInt(totalPriceElement.innerText) || 0;
  totalPriceElement.innerText = currentTotal + amount;

  const grandTotalPriceElement = document.getElementById("grandTotalPrice");
  const grandTotal = parseInt(grandTotalPriceElement.innerText) || 0;
  grandTotalPriceElement.innerText = grandTotal + amount;

}

// Function to set the inner text of an element by its ID
function setInnerText(id, value) {
  document.getElementById(id).innerText = value;
}

// Function to handle the coupon code application
const applyBtn = document.getElementById("apply-btn");

applyBtn.addEventListener("click", function () {
  // Get the coupon code from the input field
  const couponInput = document.getElementById("coupon-input");
  const couponCode = couponInput.value;

  // Get the total price from the DOM
  const totalPriceElement = document.getElementById("totalPrice");
  const grandTotalElement = document.getElementById("grandTotalPrice");

  
 

  const totalPrice = parseInt(totalPriceElement.innerText) || 0;



  // Check if the total price is at least 500
  if (totalPrice >= 500) {
    let discountedPrice = totalPrice; // Default to totalPrice if no valid coupon is applied

    // Check for valid coupon codes
    if (couponCode === "NEW15") {
      const discount = (totalPrice * 15) / 100; // Calculate the discount
      discountedPrice = totalPrice - discount; // Calculate the discounted price
      alert(`Coupon applied! You saved ${discount} BDT.`);
    } else if (couponCode === "Couple 20") {
      const discount = (totalPrice * 20) / 100; // Calculate the discount
      discountedPrice = totalPrice - discount; // Calculate the discounted price
      alert(`Coupon applied! You saved ${discount} BDT.`);
    } else {
      alert("Invalid coupon code");
    }

    // Update the grand total price in the DOM
    grandTotalElement.innerText = discountedPrice;

    // Clear the coupon input field
    couponInput.value = "";
  } else {
    alert("Please select a seat first");

    // Clear the coupon input field
    couponInput.value = "";
  }
});  

// Function to clear all input fields
function clearInputFields() {
  const inputFields = document.querySelectorAll("input");
  inputFields.forEach((input) => {
    input.value = ""; // Clear the value of each input field
  });
}

function validatePassengerForm() {
  const passengerName = document.getElementById("passenger-name").value.trim();
  const passengerPhone = document.getElementById("passenger-phone").value.trim();

  // Validate passenger name
  if (!passengerName) {
    alert("Passenger name is required.");
    return false;
  }

  // Validate passenger phone
  if (!passengerPhone || !/^\d{10}$/.test(passengerPhone)) {
    alert("Please enter a valid 10-digit phone number.");
    return false;
  }

  // Hide all sections in <main>
  const mainSections = document.querySelectorAll("main > section");
  mainSections.forEach((section) => {
    section.classList.add("hidden"); // Hide all sections in <main>
  });

  // Hide the banner section in <header>
  const bannerSection = document.getElementById("banner");
  if (bannerSection) {
    bannerSection.classList.add("hidden"); // Hide the banner section
  }

  // Show the "Success" section
  document.getElementById("success").classList.remove("hidden");

  // Clear all input fields
  clearInputFields();

  // Reset seat selection
  resetSeatSelection();

  return true;
}

// Function to go back to the previous view
function goBackToPreviousView() {
  // Show all sections in <main>
  const mainSections = document.querySelectorAll("main > section");
  mainSections.forEach((section) => {
    section.classList.remove("hidden"); // Show all sections in <main>
  });

  // Show the banner section in <header>
  const bannerSection = document.getElementById("banner");
  if (bannerSection) {
    bannerSection.classList.remove("hidden"); // Show the banner section
  }

  // Hide the "Success" section
  document.getElementById("success").classList.add("hidden");
}

// Function to reset seat selection and related data
function resetSeatSelection() {
  // Deselect all selected seats
  const selectedSeats = document.querySelectorAll(".selected"); // Select all selected seats
  selectedSeats.forEach((seat) => {
    seat.classList.remove("selected"); // Remove the "selected" class
    seat.style.backgroundColor = ""; // Reset the background color
    seat.style.color = ""; // Reset the text color
  });

  // Reset the seat count
  count = 0; // Reset the seat count
  setInnerText("seat-count", count); // Update the seat count display

  // Reset the total price and grand total
  setInnerText("totalPrice", 0); // Reset total price to 0
  setInnerText("grandTotalPrice", 0); // Reset grand total price to 0

  // Remove all selected rows from the table
  const tbody = document.querySelector("tbody");
  tbody.innerHTML = ""; // Clear all rows in the table
}