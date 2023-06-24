// Transaction data
let transactions = [];

// Function to add a new transaction
function addTransaction(description, amount, type) {
  const transaction = {
    description,
    amount: parseFloat(amount),
    type
  };

  transactions.push(transaction);
}

// Function to delete a transaction
function deleteTransaction(index) {
  transactions.splice(index, 1);
}

// Function to update the balance
function updateBalance() {
  let balance = 0;

  transactions.forEach(transaction => {
    if (transaction.type === "income") {
      balance += transaction.amount;
    } else if (transaction.type === "expense") {
      balance -= transaction.amount;
    }
  });

  document.getElementById("balance-amount").textContent = balance.toFixed(2);
}

// Function to display transactions
function displayTransactions() {
  const list = document.getElementById("list");
  list.innerHTML = "";

  transactions.forEach((transaction, index) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
      <span class="${transaction.type}">${transaction.description}</span>
      <span>${transaction.amount.toFixed(2)}</span>
      <button onclick="deleteTransaction(${index})">Delete</button>
    `;

    list.appendChild(listItem);
  });
}

// Event listener for transaction form submission
document.getElementById("transaction-form").addEventListener("submit", function(event) {
  event.preventDefault();

  const description = document.getElementById("description").value;
  const amount = document.getElementById("amount").value;
  const type = document.getElementById("type").value;

  addTransaction(description, amount, type);
  updateBalance();
  displayTransactions();

  this.reset();
});
