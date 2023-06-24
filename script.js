let transactions = [];
let balance = 0;

// Load transactions from localStorage on page load
document.addEventListener('DOMContentLoaded', function() {
  if (localStorage.getItem('transactions')) {
    transactions = JSON.parse(localStorage.getItem('transactions'));
    updateBalance();
    updateTransactionsList();
  }
});

function addTransaction() {
  const description = document.getElementById('description').value;
  const amount = parseFloat(document.getElementById('amount').value);
  const type = document.getElementById('type').value;
  
  if (description.trim() === '' || isNaN(amount)) {
    alert('Please enter valid values for description and amount.');
    return;
  }
  
  const transaction = {
    description: description,
    amount: amount,
    type: type
  };
  
  transactions.push(transaction);
  updateBalance();
  updateTransactionsList();
  saveTransactionsToLocalStorage();
  
  document.getElementById('description').value = '';
  document.getElementById('amount').value = '';
}

function updateBalance() {
  balance = 0;
  
  transactions.forEach(transaction => {
    if (transaction.type === 'income') {
      balance += transaction.amount;
    } else if (transaction.type === 'expense') {
      balance -= transaction.amount;
    }
  });
  
  const balanceElement = document.getElementById('balance');
  balanceElement.textContent = 'Balance: $' + balance.toFixed(2);
  
  if (balance >= 0) {
    balanceElement.style.color = 'green';
  } else {
    balanceElement.style.color = 'red';
  }
}

function updateTransactionsList() {
  const transactionsList = document.getElementById('transactions');
  transactionsList.innerHTML = '';
  
  transactions.forEach((transaction, index) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <span class="${transaction.type}">${transaction.description}</span>
      <span>${transaction.type === 'income' ? '+' : '-'}$${transaction.amount.toFixed(2)}</span>
      <button onclick="deleteTransaction(${index})">Delete</button>
    `;
    transactionsList.appendChild(listItem);
  });
}

function deleteTransaction(index) {
  transactions.splice(index, 1);
  updateBalance();
  updateTransactionsList();
  saveTransactionsToLocalStorage();
}

// Save transactions to localStorage
function saveTransactionsToLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}
