let transactions = [];
let currentBalance = 0;


function addTransaction(description, amount, type) {
  const transaction = {
    description,
    amount: parseFloat(amount),
    type
  };

  if (description !== '' && !isNaN(amount)) {
    const transaction = new Transaction(type, description, amount);
    transactions.push(transaction);
    updateTransactionsList();
    updateBalance();
    clearForm();
  }
}


function deleteTransaction(index) {
  transactions.splice(index, 1);
}


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
