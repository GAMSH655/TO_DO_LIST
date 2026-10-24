const taskInput = document.querySelector("#taskInput")
const addTaskBtn = document.querySelector("#addTaskBtn")
const taskWarning = document.querySelector("#taskWarning")
const taskBadge = document.querySelector("#taskBadge")
const emptyState = document.querySelector("#emptyState");
const taskContainer  = document.querySelector("#taskContainer");
const filterButtons = document.querySelectorAll(".filter-btn");

const arrayOfTasks = []
const completedTaskArray = []
const pendingTaskArray = []





function renderTasks(filterValue = "all") {
    taskContainer.innerHTML = "";

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

        taskCheckbox.addEventListener("change", function() {
            objectTasks.status = taskCheckbox.checked
                ? "completed"
                : "pending";

            renderTasks(filterValue);
            updateTaskBadge();
        });

        const deleteTaskButton = document.createElement("button");
        deleteTaskButton.classList.add("deleteTaskButton");
        deleteTaskButton.textContent = "Delete Task 🗑️";

        deleteTaskButton.addEventListener("click", function() {
            const index_taskID = arrayOfTasks.findIndex(function(task) {
                return task.taskId === objectTasks.taskId;
            });

            if (index_taskID !== -1) {
                arrayOfTasks.splice(index_taskID, 1);
                updateTaskBadge();
                renderTasks(filterValue);
            }
        });

        if (objectTasks.status === "completed") {
            taskResultParagraph.classList.add("task-completed");
        }

        taskResultContainer.append(
            taskCheckbox,
            taskResultParagraph,
            deleteTaskButton
        );

        taskContainer.append(taskResultContainer);
    });
}

function updateTaskBadge() {
    taskBadge.textContent = arrayOfTasks.length;
}


function clearInputs(){
    taskInput.value = ""
}
function clearwarning(){
   taskWarning.textContent = ""
}
addTaskBtn.addEventListener("click", function(e){
    e.preventDefault()
     const entered_Task =  String(taskInput.value.trim())
 
       clearwarning()
     
     let isEnteredTask = true
     if(entered_Task === ""){
      taskWarning.textContent = "input a task"
        isEnteredTask = false
     }
     
     if(!isEnteredTask) return

     const objectTasks = {
       taskId : Date.now(),
       taskName :entered_Task,
       date: new Date().toLocaleDateString(),
       time: new Date().toLocaleTimeString(),
       status: "pending"
     }
     arrayOfTasks.push(objectTasks)
     taskBadge.textContent = arrayOfTasks.length  
     console.log(arrayOfTasks)
      clearInputs()
    
     const taskResultContainer = document.createElement("div");
     taskResultContainer.classList.add("taskResultContainer");

     const taskResultParagraph = document.createElement("p");
     taskResultParagraph.classList.add("taskResultParagraph");

     const deleteTaskButton = document.createElement("button")
     deleteTaskButton.classList.add("deleteTaskButton")
      deleteTaskButton.textContent = " Delete Task 🚮"
 
     const taskCheckbox = document.createElement("input");
        taskCheckbox.type = "checkbox";
        taskCheckbox.classList.add("task-checkbox");

        function updateTaskDisplay() {
         taskResultParagraph.textContent =
        `Task: ${objectTasks.taskName}\n` +
        `Date: ${objectTasks.date}\n` +
        `Time: ${objectTasks.time}\n` +
        `Status: ${objectTasks.status}`;
}             

     taskCheckbox.addEventListener("change", function() {
       objectTasks.status = taskCheckbox.checked
        ? "completed"
        : "pending";
         updateTaskDisplay()
         taskResultParagraph.classList.toggle(
         "task-completed",
         taskCheckbox.checked
);
     })
    deleteTaskButton.addEventListener("click", function() {
    const index_taskID = arrayOfTasks.findIndex(function(task) {
        return task.taskId === objectTasks.taskId;
    });

     if (index_taskID !== -1) {
        arrayOfTasks.splice(index_taskID, 1);
        taskBadge.textContent = arrayOfTasks.length;
        taskResultContainer.remove();
      }
});

     taskResultContainer.append(taskResultParagraph,deleteTaskButton, taskCheckbox)
     taskContainer.append(taskResultContainer)


      taskResultParagraph.textContent =
      `Task: ${objectTasks.taskName}\n` +
      `Date: ${objectTasks.date}\n` +
      `Time: ${objectTasks.time}\n` +
      `Status: ${objectTasks.status}`

     if(emptyState){
        emptyState.remove()
     }
})



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
