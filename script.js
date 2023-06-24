<<<<<<< Updated upstream

=======
// Transaction object constructor
function Transaction(type, description, amount) {
  this.type = type;
  this.description = description;
  this.amount = amount;
}

// Global variables
>>>>>>> Stashed changes
let transactions = [];
let currentBalance = 0;

<<<<<<< Updated upstream

function addTransaction(description, amount, type) {
  const transaction = {
    description,
    amount: parseFloat(amount),
    type
  };
=======
// Function to add a new transaction
function addTransaction() {
  const type = document.getElementById('type').value;
  const description = document.getElementById('description').value;
  const amount = parseFloat(document.getElementById('amount').value);
>>>>>>> Stashed changes

  if (description !== '' && !isNaN(amount)) {
    const transaction = new Transaction(type, description, amount);
    transactions.push(transaction);
    updateTransactionsList();
    updateBalance();
    clearForm();
  }
}

<<<<<<< Updated upstream

function deleteTransaction(index) {
  transactions.splice(index, 1);
}


=======
// Function to update the transactions list
function updateTransactionsList() {
  const transactionsList = document.getElementById('transactions-list');
  transactionsList.innerHTML = '';

  transactions.forEach((transaction) => {
    const li = document.createElement('li');
    li.textContent = `${transaction.description} (${transaction.type}): ${transaction.amount}`;
    transactionsList.appendChild(li);
  });
}

// Function to update the current balance
>>>>>>> Stashed changes
function updateBalance() {
  currentBalance = 0;

  transactions.forEach((transaction) => {
    if (transaction.type === 'income') {
      currentBalance += transaction.amount;
    } else if (transaction.type === 'expense') {
      currentBalance -= transaction.amount;
    }
  });

  const currentBalanceElement = document.getElementById('current-balance');
  currentBalanceElement.textContent = currentBalance.toFixed(2);
}

<<<<<<< Updated upstream

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
=======
// Function to clear the form inputs
function clearForm() {
  document.getElementById('type').value = 'income';
  document.getElementById('description').value = '';
  document.getElementById('amount').value = '';
}

>>>>>>> Stashed changes
