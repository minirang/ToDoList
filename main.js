const addBtn = document.getElementById("addTaskButton");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        createTaskElement(task.text, task.completed);
    });
}
function saveTasks() {
    const tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        const checkbox = li.querySelector("input[type='checkbox']");
        const span = li.querySelector("span");
        tasks.push({
            text: span.textContent.trim(),
            completed: checkbox.checked
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
function createTaskElement(text, completed = false) {
    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = completed;
    const span = document.createElement("span");
    span.textContent = text;
    if (completed) {
        span.classList.add("done");
    }
    checkbox.addEventListener("change", () => {
        span.classList.toggle("done", checkbox.checked);
        saveTasks();
    });
    const editBtn = document.createElement("button");
    editBtn.textContent = "수정";
    editBtn.addEventListener("click", () => {
        const newText = prompt("수정할 내용을 입력하세요", span.textContent.trim());
        if (newText !== null && newText.trim() !== "") {
            span.textContent = newText.trim();
            span.classList.toggle("done", checkbox.checked);
            saveTasks();
        }
    });
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "삭제";
    deleteBtn.addEventListener("click", () => {
        li.remove();
        saveTasks();
    });
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}
addBtn.addEventListener("click", () => {
    const taskValue = taskInput.value;
    if (taskValue === "" || taskValue.trim() === "") {
        alert("할 일을 입력해주세요!");
        return;
    }
    createTaskElement(taskValue);
    saveTasks();
    taskInput.value = "";
    taskInput.focus();
});
loadTasks();
