// backend.js
import express from "express";
import cors from "cors";
import userServices from "./user-services.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// get all users
app.get("/users", (req, res) => {
  const { name, job } = req.query;

  userServices
	.getUsers(name, job)
	.then((users) => res.send({ users_list: users }))
	.catch(res.status(404).send("Resource not found"));
});

// get user by id
app.get("/users/:id", (req, res) => {
  const { id } = req.params;

  userServices
	.findUserById(id)
	.then((user) => { if (user) res.send(user); 
		else res.status(404).send("Resource not found"); })
	.catch(res.status(404).send("Resource not found"));
});

// insert a new user
app.post("/users", (req, res) => {
  const { userToAdd } = req.body;

  userServices
	.addUser(userToAdd)
	.then((newUser) => res.status(201).send(newUser))
	.catch(res.status(404).send("Resource not found"));
});

// delete user by id
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;

  userServices
	.deleteUser(id)
	.then((userToDelete) => { if (userToDelete) res.status(200).send();
		else res.status(404).send("Resource not found"); })
	.catch(res.status(404).send("Resource not found"));
});


app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});
