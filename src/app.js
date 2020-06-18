const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

// const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { id, title, url, techs } = request.body;

  console.log("title, url, techs")
  console.log(title, url, techs)
  
  const repository = { 
    id: id || uuid(),
    title,
    url,
    techs,
    likes: 0
  };

  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { title, url, techs } = request.body;
  const { id } = request.params;

  let repository = null;
  
  repositories.map((repo, index) => {
    if (repo.id === id) {
      repository = {
        ...repo,
        title,
        url,
        techs,
      }
      
      return repositories[index] = repository;
    }
    return false;
  });

  if (repository) return response.json(repository);
  
  return response.status(400).json({ error: 'Not Found' });
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  let deleted = false;
  
  repositories.map((repo, i) => {
    if (repo.id === id) {
      repositories.splice(i, 1);
      deleted = true;
    }
  });

  if (deleted) return response.status(204).json(repositories);
  
  return response.status(400).json({ error: 'Not Found' });
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  let repository = null;
  
  repositories.map((repo, index) => {
    if (repo.id === id) {
      repository = {
        ...repo,
        likes: repo.likes+1
      }
      
      return repositories[index] = repository;
    }
    return false;
  });
  if (repository) return response.json(repository);
  
  return response.status(400).json({ error: 'Not Found' });
});

module.exports = app;
