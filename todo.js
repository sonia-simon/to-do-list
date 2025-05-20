const form = document.getElementById('form');
const input = document.getElementById('todo');
const ul = document.querySelector("ul");

let todos = JSON.parse(localStorage.getItem("todos")) || [];


todos.forEach(task => {
    createTaskElement(task);
});

function addTask() {
    const task = input.value.trim();
    if (task !== "") {
        todos.push(task);
        saveTodos();
        createTaskElement(task);
        input.value = "";
    }
}

function createTaskElement(task) {
    const li = document.createElement("li");
    li.textContent = task;

    const deleteBtn = document.createElement("span");
    deleteBtn.textContent = " ❌";
    deleteBtn.style.cursor = "pointer";
    deleteBtn.style.marginLeft = "10px";
    deleteBtn.style.color = "red";
    
    deleteBtn.addEventListener("click", (event) => {
        event.stopPropagation();
        li.remove();
        todos = todos.filter(t => t !== task);
        saveTodos();
    });

    li.appendChild(deleteBtn);
    ul.appendChild(li);
}

function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        addTask();
    }
});
