
// Inicializa um array vazio para armazenar as transações
let transactions = [];

const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const expenseTotal = document.getElementById('expense-total');
const incomeTotal = document.getElementById('income-total');
const budgetTotal = document.getElementById('budget-total');
const transactionList = document.getElementById('transactions');

// Adiciona os eventos de clique aos botões
document.getElementById('add-expense').addEventListener('click', function () {
    addTransaction('despesa');
});

document.getElementById('add-income').addEventListener('click', function () {
    addTransaction('receita');
});

// Função para adicionar uma transação
function addTransaction(tipo) {
    const description = descriptionInput.value.trim();
    const amount = parseFloat(amountInput.value);

    if (description === '' || isNaN(amount) || amount <= 0) {
        alert('Por favor, insira uma descrição e valor válidos.');
        return;
    }

    const transaction = {
        description: description,
        amount: amount,
        type: tipo
    };

    transactions.push(transaction);

    descriptionInput.value = '';
    amountInput.value = '';

    updateTransactionList();
    updateBudgetSummary();
}

// Função para atualizar a lista de transações
function updateTransactionList() {
    transactionList.innerHTML = '';

    transactions.forEach((transaction, index) => {
        const row = document.createElement('tr');

        const descriptionCell = document.createElement('td');
        descriptionCell.textContent = transaction.description;
        row.appendChild(descriptionCell);

        const amountCell = document.createElement('td');
        amountCell.textContent = transaction.amount;
        row.appendChild(amountCell);

        const typeCell = document.createElement('td');
        typeCell.textContent = transaction.type;
        row.appendChild(typeCell);

        const actionCell = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Excluir';
        deleteButton.addEventListener('click', function () {
            deleteTransaction(index);
        });
        actionCell.appendChild(deleteButton);

        row.appendChild(actionCell);
        transactionList.appendChild(row);
    });
}

// Função para excluir uma transação
function deleteTransaction(index) {
    transactions.splice(index, 1);
    updateTransactionList();
    updateBudgetSummary();
}

// Função para atualizar o resumo do orçamento
function updateBudgetSummary() {
    const expenses = transactions
        .filter(transaction => transaction.type === 'despesa')
        .reduce((total, transaction) => total + transaction.amount, 0);

    const incomes = transactions
        .filter(transaction => transaction.type === 'receita')
        .reduce((total, transaction) => total + transaction.amount, 0);

    const budget = incomes - expenses;

    expenseTotal.textContent = expenses.toFixed(2);
    incomeTotal.textContent = incomes.toFixed(2);
    budgetTotal.textContent = budget.toFixed(2);
}