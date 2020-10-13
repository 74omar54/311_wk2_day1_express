
const express = require('express');
const bodyParser = require('body-parser');
const app = express()
const port = process.env.PORT || 4000

app.use(bodyParser.json());

const { users } = require('./state')

/* BEGIN - create routes here */
//this is using get to return a list of all the users! 
app.get('/users', (req, res) => {
  res.send(users);
});
//here I am going to use get to return a single user! 
app.get('/users/:userId', (req, res) => {
  let userId = parseInt(req.params.userId);
  let user = users.find(user => user._id === userId);
  res.send(user);
});


//here I will add a path for a post request!
app.post('/users', (req, res) => {
  console.log(req.body);
  res.send(users[parseInt(req.params.userId) -1 ]);

  let user = req.body;
  user._id = user.length + 1;
  
  //add the user to the array
  users.push(user);

  //Return the newly created user
  res.send(users);
});

//Update a specific user
app.put('/users/:userId', (req, res) => {
  let userId = (parseInt(req.params.userId) -1);

  //Look up user
  let user = users.find(user => user._id === userId);

  //change values on the user
  user.name = "Jane";

  //Return the updated user
  res.send(users[0]);
});

//Delete a selected user 
app.delete('/users/:userId', (req, res)=> {
  res.send(users.splice(1,1));
});




/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))