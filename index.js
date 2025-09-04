////////////start time///////////////
function clock() {
    var now = new Date();
    // Get full weekday name (e.g., "Monday")
    var dayName = now.toLocaleString('default', { weekday: 'long' });
    // Get day of month (1-31)
    var day = now.getDate();
    // Get month (0-11) and add 1 for correct display
    var month = now.getMonth() + 1;
    // Get full year (e.g., 2025)
    var year = now.getFullYear();
    
    // Update displayed day name in HTML
    const dayNameElement = document.querySelector("#dayName");
    dayNameElement.innerHTML = dayName;
    
    // Format date as DD/MM/YYYY with leading zeros if needed
    const date = `${day < 10 ? "0" + day : day}/${month < 10 ? "0" + month : month}/${year}`;
    // Update displayed date in HTML
    document.querySelector("#date").innerHTML = date;
}
// Initialize clock immediately and update every second
clock();
setInterval(clock, 1000);
////////////end time///////////////

////////////start dark mode///////////////
// Get dark mode toggle button
const darkModeToggle = document.getElementById('darkModeToggle');
// Track dark mode state
let darkMode = localStorage.getItem('darkMode') === 'true';

// Apply saved dark mode preference on page load
if (darkMode) {
    document.body.classList.add('dark-mode');
    darkModeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
} else {
    darkModeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
}

// Toggle dark mode when button is clicked
darkModeToggle.addEventListener('click', () => {
    // Flip dark mode state
    darkMode = !darkMode;
    // Toggle dark-mode class on body
    document.body.classList.toggle('dark-mode');
    
    // Update button icon based on mode
    if (darkMode) {
        darkModeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
    } else {
        darkModeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }
    
    // Save preference to localStorage
    localStorage.setItem('darkMode', darkMode);
});
////////////end dark mode///////////////

////////////start task input///////////////
// Get DOM elements
const taskInput = document.querySelector("#taskInput");
const taskList = document.querySelector("#taskList");
const clearAll = document.querySelector("#clearAll");
const addBtn = document.querySelector("#addTaskButton");

// Load tasks from localStorage on page load
function loadTasks() {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
        taskList.innerHTML = savedTasks;
        
        // Add event listeners to existing tasks
        document.querySelectorAll(".task-item").forEach(task => {
            task.addEventListener("click", () => {
                task.classList.toggle("completed");
                saveTasks();
            });
            
            const delBtn = task.querySelector(".delBtn");
            if (delBtn) {
                delBtn.addEventListener("click", (e) => {
                    e.stopPropagation();
                    taskList.removeChild(task);
                    saveTasks();
                });
            }
        });
    }
}

// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem("tasks", taskList.innerHTML);
}

// Function to add new task
function addTask() {
    // Prevent empty tasks
    if (taskInput.value.trim() === "") {
        alert("Please enter a task.");
        return;
    }
    
    // Create new list item for task
    const li = document.createElement("li");
    li.className = "task-item";
    li.textContent = taskInput.value;
    
    // Toggle completion when task is clicked
    li.addEventListener("click", () => {
        li.classList.toggle("completed");
        saveTasks();
    });
    
    // Add task to top of list and clear input
    taskList.prepend(li);
    taskInput.value = "";

    // Create and add delete button
    const delBtn = document.createElement("button");
    delBtn.className = "delBtn";
    delBtn.innerHTML = "<b>X</b>";
    // Remove task when delete button is clicked
    delBtn.addEventListener("click", (e) => {
        e.stopPropagation(); // Prevent triggering the li click event
        taskList.removeChild(li);
        saveTasks();
    });
    li.appendChild(delBtn);
    
    // Save tasks to localStorage
    saveTasks();
}

// Event listeners
addBtn.addEventListener("click", addTask); // Add task on button click
taskInput.addEventListener("keypress", (e) => { // Add task on Enter key press
    if (e.key === "Enter") {
        addTask();
    }
});
clearAll.addEventListener("click", () => { // Clear all tasks
    taskList.innerHTML = "";
    saveTasks();
});

// Load tasks when page loads
document.addEventListener("DOMContentLoaded", loadTasks);
////////////end task input///////////////