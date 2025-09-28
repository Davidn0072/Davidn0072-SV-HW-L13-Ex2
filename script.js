const tasks = [
  { id: 1, text: "Buy groceries" },
  { id: 2, text: "Call the dentist" },
  { id: 3, text: "Finish the project report" },
  { id: 4, text: "Walk the dog" },
  { id: 5, text: "task flight tickets" },
  { id: 6, text: "Reply to emails" },
  { id: 7, text: "Clean the kitchen" },
  { id: 8, text: "Water the plants" },
  { id: 9, text: "Pay electricity bill" },
  { id: 10, text: "Read a chapter of a task" },
  { id: 11, text: "Prepare lunch" },
  { id: 12, text: "Schedule a meeting with team" },
  { id: 13, text: "Exercise for 30 minutes" },
  { id: 14, text: "Check the bank account" },
  { id: 15, text: "Take out the trash" },
  { id: 16, text: "Update resume" },
  { id: 17, text: "Organize desk" },
  { id: 18, text: "Wash the car" },
  { id: 19, text: "Backup laptop files" },
  { id: 20, text: "Plan weekend activities" }
];

function BldTask_Div()
{
  const genTaskDiv = document.createElement("div");
  document.body.appendChild(genTaskDiv);
  genTaskDiv.id = "genTaskDiv";
  return genTaskDiv;
}

function BldTasksDiv(arr, addTxt, inx)
{
  let genTaskDiv=document.getElementById("genTaskDiv");
  let genTaskUl = document.getElementById("genTaskUl");

  if ( genTaskUl == null)
  {
    genTaskDiv = BldTask_Div(); 
    genTaskUl = document.createElement("ul");
    genTaskDiv.appendChild(genTaskUl);
    genTaskUl.id = "genTaskUl";
  }

  
  // arr.forEach((item,i,arr)=>{
    const genTaskLi = document.createElement("li");
    genTaskLi.id = "taskId"+arr[inx].id;
    genTaskLi.textContent = arr[inx].text+" "+addTxt;
    genTaskUl.appendChild(genTaskLi);    
    const genTaskBtn = document.createElement("button");
    genTaskBtn.className = "DelBtn";
    genTaskBtn.innerHTML = "Del";
    genTaskBtn.id = "btnId"+arr[inx].id;
    genTaskBtn.style.margin = "5px";
    genTaskBtn.onclick = function () {  delTask(this.id); };
    genTaskLi.appendChild(genTaskBtn);    
  // })
  //alert(document.getElementById("genTaskDiv").outerHTML)
}

//BldTasksDiv(tasks);

function delTask(id)
{
  const prefix = 'btnId';
  const startIndex = id.indexOf(prefix) + prefix.length;
  const numberStr = id.slice(startIndex);
    
  document.getElementById ('taskId'+numberStr)?.remove();
  const index = tasks.findIndex(task => task.id == numberStr);
  if (index > -1 )
    tasks.splice(index,1);

  if (tasks.length == 0)
    alert("All tasks completed")
}

function getRandomIndex(arr) {
  return Math.floor(Math.random() * arr.length);
}

function AddTask()
{
  BldTasksDiv(tasks,document.getElementById ('genInput').value,getRandomIndex(tasks));
  localStorage.setItem("todo",document.getElementById("genTaskDiv").outerHTML);
  //alert(document.getElementById("genTaskDiv").outerHTML);
  //alert(localStorage.getItem('todo'));
  console.log(document.getElementById("genTaskDiv").outerHTML);
  console.log(localStorage.getItem('todo'));
}

let str = localStorage.getItem('todo');
if (str !== null) { 
   let genTaskDiv=document.getElementById("genTaskDiv");
   if (genTaskDiv == null)
     genTaskDiv = BldTask_Div(); 
  if (genTaskDiv != null)  
    genTaskDiv.outerHTML = str;

  const buttons = document.querySelectorAll('button.DelBtn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      delTask(btn.id);
    });
  });
} 
  
function ClearAll()
{
  const div = document.getElementById("genTaskDiv");
  if (div) div.outerHTML = '';
  localStorage.removeItem("todo")
}