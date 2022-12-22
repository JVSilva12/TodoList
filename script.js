const inputTask = document.querySelector('.inputTask');
const btnAddTask = document.querySelector('.btnAddTask');
const tasks = document.querySelector('.tasks');

function criateLi() {
    const li = document.createElement('li');
    return li;
}

inputTask.addEventListener('keypress', function(e) {
    if (e.keyCode === 13){
        if (!inputTask.value) return;
        criateTask(inputTask.value);
    }
});

function clearInput() {
    inputTask.value = '';
    inputTask.focus();
};

//                           (li)undefined
// function criateButtonClear(li) {
//     console.log(li)
//     li.innerText += ' ';
//     const buttonClear = document.createElement('button');
//     buttonClear.innerText = 'Apagar';
//     buttonClear.setAttribute('class', 'Apagar');
//     li.appendChild(buttonClear);
// }


function criateTask(textInput) {
    const li = criateLi();
    const buttonClear = document.createElement('button');

    buttonClear.innerText = 'Delete';
    buttonClear.classList.add('apagar');
    buttonClear.classList.add('btnAddTask');
    buttonClear.setAttribute('title', 'Apagar tarefa');

    li.innerText = textInput;
    li.innerText += ' ';
    tasks.appendChild(li);
    li.appendChild(buttonClear);
    clearInput();
    saveTasks();
    // criateButtonClear();
};

btnAddTask.addEventListener('click', function() {
    if (!inputTask.value) return;
    criateTask(inputTask.value);
});

document.addEventListener('click', function(e) {
    const element = e.target;

    if (element.classList.contains('apagar')) {
        element.parentElement.remove();
        saveTasks();
    }
})

function saveTasks() {
    const liTasks = tasks.querySelectorAll('li');
    const listTask = [];

    for (let task of liTasks) {
        let taskText = task.innerText;
        taskText = taskText.replace('Apagar', '').trim();
        listTask.push(taskText);
    }

    const tasksJSON = JSON.stringify(listTask);
    localStorage.setItem('tasks', tasksJSON);
    
}

function addTasksSave() {
    const tasks = localStorage.getItem('tasks');
    const listTask = JSON.parse(tasks);

    for(let task of listTask){
        criateTask(task);
    }
    console.log(listTask);
}

addTasksSave();
