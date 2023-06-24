// Retrieve transactions from local storage or initialize an empty array
let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

// Display transactions on page load
displayTransactions();

// Calculate and display the current balance
calculateBalance();

// Add transaction event listener
document.getElementById('transactionForm').addEventListener('submit', addTransaction);

// Add transaction
function addTransaction(e) {
  e.preventDefault();

  // Get user inputs
  const description = document.getElementById('description').value;
  const amount = parseFloat(document.getElementById('amount').value);
  const type = document.getElementById('type').value;

  // Create a new transaction object
  const transaction = {
    id: Date.now(),
    description,
    amount,
    type
  };

  // Add the transaction to the array
  transactions.push(transaction);

  // Update local storage
  updateLocalStorage();

  // Clear form inputs
  document.getElementById('description').value = '';
  document.getElementById('amount').value = '';

  // Display the updated transactions
  displayTransactions();

  // Recalculate and display the current balance
  calculateBalance();
}

// Display transactions
function displayTransactions() {
  const transactionList = document.getElementById('transactionList');

  // Clear the transaction list
  transactionList.innerHTML = '';

  // Iterate through transactions and create list items
  transactions.forEach(transaction => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <span>${transaction.description}</span>
      <span class="${transaction.type}">${transaction.amount.toFixed(2)}</span>
      <button onclick="deleteTransaction(${transaction.id})">Delete</button>
    `;
    transactionList.appendChild(listItem);
  });
}

// Delete transaction
function deleteTransaction(id) {
  // Remove the transaction from the array
  transactions = transactions.filter(transaction => transaction.id !== id);

  // Update local storage
  updateLocalStorage();

  // Display the updated transactions
  displayTransactions();

  // Recalculate and display the current balance
  calculateBalance();
}

// Calculate and display the current balance
function calculateBalance() {
  const balance = document.getElementById('balance');
  const income = transactions
    .filter(transaction => transaction.type === 'income')
    .reduce((total, transaction) => total + transaction.amount, 0);
  const expense = transactions
    .filter(transaction => transaction.type === 'expense')
    .reduce((total, transaction) => total + transaction.amount, 0);
  const currentBalance = income - expense;
  balance.textContent = `Current Balance: $${currentBalance.toFixed(2)}`;
}

// Update local storage
function updateLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}
