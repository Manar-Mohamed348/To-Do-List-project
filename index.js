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
let darkMode = false;

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

// (Currently disabled) Check for saved dark mode preference
if (false) { 
    document.body.classList.add('dark-mode');
    darkMode = true;
    darkModeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
}
////////////end dark mode///////////////

////////////start task input///////////////
// Get DOM elements
const taskInput = document.querySelector("#taskInput");
const taskList = document.querySelector("#taskList");
const clearAll = document.querySelector("#clearAll");
const addBtn = document.querySelector("#addTaskButton");

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
    });
    li.appendChild(delBtn);
}

// Event listeners
addBtn.addEventListener("click", addTask); // Add task on button click
clearAll.addEventListener("click", () => { // Clear all tasks
    taskList.innerHTML = "";
});
////////////end task input///////////////