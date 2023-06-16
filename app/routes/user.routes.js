const auth = require("../middleware/auth");

module.exports = app => {
  const user = require("../controllers/user.controller.js");

  var router = require("express").Router();

  // Create a new user
  router.post("/", user.create);

  // Retrieve all user
  router.get("/", user.findAll);

  // Retrieve a single user with id
  router.get("/:id", auth, user.findOne);

  // Update a user with id
  router.put("/:id", auth, user.update);

  // Delete a user with id
  router.delete("/:id", auth, user.delete);

  app.use('/users', router);
};