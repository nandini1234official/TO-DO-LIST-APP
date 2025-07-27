const express = require('express');
const bodyParser =require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extented:true}));

let tasks =[];

//Server static files(HTML,CSS,JS)
app.use(express.static('public'));

app.get('/tasks', (req, res) => {
  res.json(tasks);
});
app.post('/tasks', (req, res) => {
  const newTask ={
    id:Date.now(),
    text:req.body.text
  };
  tasks.push(newTask);
  res.json(newTask);
});

app.delete('/tasks/:id', (req, res) => {
  const taskId =parseInt(req.params.id);
  tasks =tasks.filter(task =>task.id !== taskId);
  res.json({message:'Task delete successfully'});
});




// Start Server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});