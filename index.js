const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3010;

let cors = require('cors');

app.use(cors());

// Sample Data
let tasks = [
  { taskId: 1, text: 'Fix bug #101', priority: 2 },
  { taskId: 2, text: 'Implement feature #202', priority: 1 },
  { taskId: 3, text: 'Write documentation', priority: 3 }
];
function addTask(tasks,taskId, text, priority){
   let item = { taskId, text, priority };
  tasks.push(item);
  return tasks;
  
}
app.get("/tasks/add", (req, res) =>{
  let taskId = parseInt(req.query.taskId);
  let text = req.query.text;
  let priority = parseInt(req.query.priority);
  let result = addTask(tasks,taskId, text, priority)
  res.json({tasks: result})
  
})
app.get("/tasks", (req, res) => {
  res.json({tasks: tasks });
})
function sortTasksByPriority(tasksCopy){
  return tasksCopy.sort((a,b) => a.priority - b.priority);
}
app.get("/tasks/sort-by-priority", (req, res) =>{
  let tasksCopy = tasks.slice();
  let result = sortTasksByPriority(tasksCopy);
  res.json({tasks: result})
  
})
function editTaskPriority(tasks, taskId, priority){
  for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].taskId === taskId) {
        tasks[i].priority = priority;
      }
    }
    return tasks; 
}

app.get("/tasks/edit-priority", (req, res) =>{
  let  taskId = parseInt(req.query.taskId);
  priority = parseInt(req.query.priority);
  let result = editTaskPriority(tasks, taskId, priority);
    res.json({ tasks: result });
})

function  updateTaskText(tasks, taskId, text){
  for (let i = 0; i < tasks.length; i++)
    if (tasks[i].taskId === taskId) {
      tasks[i].text = text;
    }
    
    return tasks;
}
app.get("/tasks/edit-text", (req, res) =>{
  let  taskId = parseInt(req.query.taskId);
  let text = req.query.text;
  let result = updateTaskText(tasks, taskId, text);
    res.json({ tasks: result });
})

function deleteTask(item, taskId) {
  return item.taskId !== taskId;
}

app.get("/tasks/delete", (req, res) =>{
  let  taskId = parseInt(req.query.taskId);
  let result = tasks.filter((item) => deleteTask(item, taskId));
  res.json({ tasks: result });
})

function filterTasksByPriority(item, priority) {
  return item.priority === priority;
}
app.get("/tasks/filter-by-priority", (req, res) =>{
  priority = parseInt(req.query.priority);
  let result = tasks.filter((item) => filterTasksByPriority(item, priority));
  res.json({ tasks: result });
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
