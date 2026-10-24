
const taskInput = document.querySelector("#taskInput");
const addTaskBtn = document.querySelector("#addTaskBtn");
const taskWarning = document.querySelector("#taskWarning");
const taskBadge = document.querySelector("#taskBadge");
const taskContainer = document.querySelector("#taskContainer");
const filterButtons = document.querySelectorAll(".filter-btn");

const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
const arrayOfTasks = [...savedTasks];

let currentFilter = "all";

function clearInputs() {
    taskInput.value = "";
}

function clearwarning() {
    taskWarning.textContent = "";
}

function updateTaskBadge() {
    taskBadge.textContent = arrayOfTasks.length;
}

function   renderTasks(filterValue = currentFilter) {
    currentFilter = filterValue;
    taskContainer.innerHTML = "";
    updateTaskBadge();

    const filteredTasks = arrayOfTasks.filter(function(task) {
        return filterValue === "all" || task.status === filterValue;
    });

    if (filteredTasks.length === 0) {
        taskContainer.innerHTML = `
            <div class="empty-state">
                <p>No tasks found.</p>
            </div>
        `;
        return;
    }

    filteredTasks.forEach(function(objectTasks) {
        const taskResultContainer = document.createElement("div");
        taskResultContainer.classList.add("taskResultContainer");

        const taskResultParagraph = document.createElement("p");
        taskResultParagraph.classList.add("taskResultParagraph");

        taskResultParagraph.textContent =
            `Task: ${objectTasks.taskName}\n` +
            `Date: ${objectTasks.date}\n` +
            `Time: ${objectTasks.time}\n` +
            `Status: ${objectTasks.status}`;

        const taskCheckbox = document.createElement("input");
        taskCheckbox.type = "checkbox";
        taskCheckbox.classList.add("task-checkbox");
        taskCheckbox.checked = objectTasks.status === "completed";

        if (objectTasks.status === "completed") {
            taskResultParagraph.classList.add("task-completed");
        }

        taskCheckbox.addEventListener("change", function() {
            objectTasks.status = taskCheckbox.checked
                ? "completed"
                : "pending";

            localStorage.setItem(
                "tasks",
                JSON.stringify(arrayOfTasks)
            );

            renderTasks();
        });

        const deleteTaskButton = document.createElement("button");
        deleteTaskButton.classList.add("deleteTaskButton");
        deleteTaskButton.textContent = "🗑️";

        deleteTaskButton.addEventListener("click", function() {
            const index_taskID = arrayOfTasks.findIndex(function(task) {
                return task.taskId === objectTasks.taskId;
            });

            if (index_taskID !== -1) {
                arrayOfTasks.splice(index_taskID, 1);

                localStorage.setItem(
                    "tasks",
                    JSON.stringify(arrayOfTasks)
                );

                renderTasks();
            }
        });

        taskResultContainer.append(
            taskCheckbox,
            taskResultParagraph,
            deleteTaskButton
        );

        taskContainer.append(taskResultContainer);
    });
}

addTaskBtn.addEventListener("click", function(e) {
    e.preventDefault();

    const entered_Task = String(taskInput.value.trim());

    clearwarning();

    if (entered_Task === "") {
        taskWarning.textContent = "Input a task";
        return;
    }

    const objectTasks = {
        taskId: Date.now(),
        taskName: entered_Task,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        status: "pending"
    };

    arrayOfTasks.push(objectTasks);

    localStorage.setItem(
        "tasks",
        JSON.stringify(arrayOfTasks)
    );

    clearInputs();
    renderTasks();
});

filterButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        const filterValue = button.dataset.filter;

        renderTasks(filterValue);

        filterButtons.forEach(function(filterButton) {
            filterButton.classList.remove("active");
        });

        button.classList.add("active");
    });
});

renderTasks();
