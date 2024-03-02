// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

//add variables to reference DOM
 let addTaskEl = document.querySelector("#add-task");
 let taskBtn = document.querySelector("#add-task");
 let taskTitleEl = document.querySelector("#task-title");
 let taskDescriptionEl = document.querySelector("#description");
 let dueDateEl = document.querySelector("#due-date");
 let toDoEl = document.querySelector("#todo-cards");
 let deleteButton = document.getElementsByClassName("btn btn-primary");
 


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
 cardTitle.setAttribute("class", "card-title");
 cardTitle.innerText = task.title;

 let taskDescription = document.createElement("p");
 taskDescription.setAttribute("class", "card-text");
 taskDescription.innerHTML = task.description;

 let taskDue = document.createElement("p");
 taskDue.setAttribute("class", "card-text");
 taskDue.innerHTML = task.dueDate;

 let submitButton = document.createElement("button");
 submitButton.setAttribute("class", "btn btn-primary");
 submitButton.setAttribute("id", task.id);
 submitButton.innerHTML = "Delete Task";

 cardBody.appendChild(cardTitle);
 cardBody.appendChild(taskDue);
 cardBody.appendChild(taskDescription);
 cardBody.appendChild(submitButton);

 newDiv.appendChild(cardBody);
 toDoEl.appendChild(newDiv);

 console.log(newDiv);



};

//Done: create a function to render the task list and make cards draggable
function renderTaskList() {

 taskList.forEach(element => {
  
  createTaskCard(element);
  
 });

 $(".draggables").draggable(
  {revert: true}
 );


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


renderTaskList();
taskTitleEl.value = "";
taskDescriptionEl.value = "";
dueDateEl.value = "";


 

};

// Todo: create a function to handle deleting a task
//Button event listener not working
function handleDeleteTask(event){

  console.log("Clicked");
 /*let deleteID = event.target.id;
 

 //remove object from local storage
 let filteredList = taskList.filter (function (item){
  return item.id != deleteID;

  

 });


 //Add new array to storage
 localStorage.setItem('tasks',JSON.stringify(filteredList));



 //render task list 
 renderTaskList();*/


};

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop (event, ui){
  //make card body droppable
  // change get card id and change status to match droppable class

};



// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

 renderTaskList();
 addTaskEl.onclick = handleAddTask;
 deleteButton.onclick = handleDeleteTask;


 $( function() {
    $( "#due-date" ).datepicker();
  } );


});







