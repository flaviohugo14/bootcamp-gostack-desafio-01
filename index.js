const express = require('express');

const server = express();

server.use(express.json());

const projects = [];
let cont = 1;

server.use((req, res, next) => {
  console.count('Número de requisições');

  return next();
})

function checkIdExists(req, res, next){
  if(!projects.find(p => p.id == req.params.id)){
    return res.status(400).json({error: 'Projeto não encontrado!'})
  }

  return next();
}

server.get('/projects', (req, res) => {
  return res.json(projects);
})

server.get('/projects/:id', checkIdExists, (req, res) => {
  const { id } = req.params;

  const project = projects.find(p => p.id == id);

  return res.json(project)
})

server.post('/projects', (req, res) => {
  const { id, title } = req.body;

  projects.push({id,title, tasks: []});

  return res.json(projects);
})

server.put('/projects/:id', checkIdExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id)

  project.title = title;

  return res.json(project);
})

server.delete('/projects/:id', checkIdExists, (req, res) => {
  const { id } = req.params;

  const index = projects.findIndex(p => p.id == id);

  projects.splice(index, 1);

  return res.send();
})

server.post('/projects/:id/tasks', checkIdExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);

  project.tasks.push(title);

  return res.json(project);
})

server.listen(3000);