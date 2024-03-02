// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

//add variables to reference DOM
 let addTaskEl = document.querySelector("#add-task");
 let taskTitleEl = document.querySelector("#task-title");
 let taskDescriptionEl = document.querySelector("#description");
 let dueDateEl = document.querySelector("#due-date");
 let toDoEl = document.querySelector("#todo-cards");
 

 
// Done: create a function to generate a unique task id
function generateTaskId() {
 return Math.floor(Math.random()* 100);

};

// Done: create a function to create a task card
function createTaskCard(task) {

 let newDiv = document.createElement("div");
 newDiv.setAttribute("class", "card text-bg-light mb-3 draggables");
 newDiv.setAttribute("id", task.id);

 let cardBody= document.createElement("div");
 cardBody.setAttribute("class","card-body");

 let cardTitle = document.createElement("h5");
 cardTitle.setAttribute("class", "card-header");
 cardTitle.innerText = task.title;

 let taskDescription = document.createElement("p");
 taskDescription.setAttribute("class", "card-text");
 taskDescription.innerHTML = task.description;

 let taskDue = document.createElement("p");
 taskDue.setAttribute("class", "card-text");
 taskDue.innerHTML = task.dueDate;

 let submitButton = document.createElement("button");
 submitButton.setAttribute("class", "btn btn-primary delete");
 submitButton.setAttribute("id", task.id);
 submitButton.innerHTML = "Delete Task";

 
 cardBody.appendChild(taskDue);
 cardBody.appendChild(taskDescription);
 cardBody.appendChild(submitButton);

 newDiv.appendChild(cardTitle);
 newDiv.appendChild(cardBody);

 return newDiv;

};

//Done: create a function to render the task list and make cards draggable
function renderTaskList() {

  const droppables = document.getElementsByClassName("card-body bg-light droppable");
   let array = [...droppables];
  
  array.forEach(droppable =>{
    while(droppable.firstChild){
      droppable.removeChild(droppable.firstChild);
    }
  });

  
    // Iterate over each task and render it in the appropriate lane
    taskList.forEach(function(task) {
        var taskCard = createTaskCard(task);
        $("#" + task.status).prepend(taskCard);
    });


 $(".draggables").draggable({
  revert: true,
  zIndex: 1000
});


};

//Done: create a function to handle adding a new task
function handleAddTask(event){

 // prevent the page from reloading when submitting the form
  event.preventDefault();

 //Get input values
let taskTitle = taskTitleEl.value;
let taskDescript = taskDescriptionEl.value;
let dueDate = dueDateEl.value;

// generate unique id
const id = generateTaskId();

//check if task exist in local storage

if(localStorage.getItem("tasks") == null){

 const taskList = [];
 
 const task = {
 id : id,
 title : taskTitle,
 description : taskDescript,
 dueDate : dueDate,
 status: "to-do"

}

taskList.push(task);

//store task to local storage
localStorage.setItem("tasks",JSON.stringify(taskList));

} else{

//add values to localStorage

const task = {
 id : id,
 title : taskTitle,
 description : taskDescript,
 dueDate : dueDate,
 status : "to-do"

}

taskList.push(task);
localStorage.setItem("tasks",JSON.stringify(taskList));

}


taskTitleEl.value = "";
taskDescriptionEl.value = "";
dueDateEl.value = "";

renderTaskList();


};

// Done: create a function to handle deleting a task
function handleDeleteTask(event){
  console.log("Clicked");
  let deleteID = event.target.id;
 
 //remove object from local storage
 taskList = taskList.filter (function (item){
  return item.id != deleteID;
 });


 //Add new array to storage
 localStorage.setItem('tasks',JSON.stringify(taskList));

 renderTaskList();


};

// Todo: create a function to handle dropping a task into a new status lane
$(function() {
    $(".droppable").droppable({
        drop: function(event, ui) {
            var droppedItem = ui.draggable;
            var taskId = droppedItem.attr("id");
            var newStatus = $ (this).attr("id");

            updateCardStatus(taskId,newStatus);

            $(this).append(droppedItem);
        }
    });

});

//Done: update Card status when dropped into new lane
function updateCardStatus(taskId,newStatus) {
  
    
    // Update the task status in the taskList array
    taskList.forEach(function(task) {
        if (task.id == taskId) {
            task.status = newStatus;
            
        }
    });

    // Update the taskList array in local storage
    localStorage.setItem("tasks", JSON.stringify(taskList));
}


// Done: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {


  renderTaskList();

    // Add event listener for adding tasks
    $('#add-task').on('click', handleAddTask);

    // Add event listener for deleting tasks
    $(document).on('click', '.btn.btn-primary.delete', handleDeleteTask);

    // Initialize datepicker
    $("#due-date").datepicker();


});





 









