let display = document.getElementById('display');
let currentInput = '';
let operator = '';
let previousInput = '';

function appendNumber(number) {
    currentInput += number;
    display.value = currentInput;
}

function performOperation(op) {
    if (currentInput === '') return;
    if (previousInput !== '') calculateResult();
    operator = op;
    previousInput = currentInput;
    currentInput = '';
}

function calculateResult() {
    let result;
    const prev = parseFloat(previousInput);
    const curr = parseFloat(currentInput);
    if (isNaN(prev) || isNaN(curr)) return;
    switch (operator) {
        case '+':
            result = prev + curr;
            break;
        case '-':
            result = prev - curr;
            break;
        case '*':
            result = prev * curr;
            break;
        case '/':
            result = prev / curr;
            break;
        default:
            return;
    }
    currentInput = result;
    operator = '';
    previousInput = '';
    display.value = result;
}

function clearDisplay() {
    currentInput = '';
    operator = '';
    previousInput = '';
    display.value = '';
}

function addTask() {
    const taskInput = document.getElementById('new-task');
    const taskText = taskInput.value;
    if (taskText === '') return;

    const taskItem = document.createElement('li');
    taskItem.textContent = taskText;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Supprimer';
    deleteButton.onclick = function() {
        taskItem.remove();
        saveTasks();
    };

    const completeButton = document.createElement('button');
    completeButton.textContent = 'Terminé';
    completeButton.onclick = function() {
        taskItem.classList.toggle('completed');
        saveTasks();
    };

    taskItem.appendChild(deleteButton);
    taskItem.appendChild(completeButton);
    document.getElementById('tasks').appendChild(taskItem);

    taskInput.value = '';
    saveTasks();
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#tasks li').forEach(taskItem => {
        tasks.push({
            text: taskItem.childNodes[0].nodeValue,
            completed: taskItem.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.textContent = task.text;
        if (task.completed) taskItem.classList.add('completed');

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Supprimer';
        deleteButton.onclick = function() {
            taskItem.remove();
            saveTasks();
        };

        const completeButton = document.createElement('button');
        completeButton.textContent = 'Terminé';
        completeButton.onclick = function() {
            taskItem.classList.toggle('completed');
            saveTasks();
        };

        taskItem.appendChild(deleteButton);
        taskItem.appendChild(completeButton);
        document.getElementById('tasks').appendChild(taskItem);
    });
}

window.onload = function() {
    loadTasks();
};

const quotes = [
    "La vie est belle.",
    "Carpe diem.",
    "À vaincre sans péril, on triomphe sans gloire.",
    "L'essentiel est invisible pour les yeux.",
    "Le savoir est une arme.",
    "Qui ne tente rien n'a rien.",
    "Il n'est jamais trop tard pour bien faire.",
    "La persévérance est la clé du succès.",
    "Le temps, c'est de l'argent.",
    "L'union fait la force."
];

function generateQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    document.getElementById('quote-display').textContent = quotes[randomIndex];
}

function copyQuote() {
    const quoteText = document.getElementById('quote-display').textContent;
    navigator.clipboard.writeText(quoteText).then(() => {
        alert('Citation copiée dans le presse-papiers');
    });
}
