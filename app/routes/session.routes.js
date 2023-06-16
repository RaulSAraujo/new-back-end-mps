module.exports = app => {
    const session = require("../controllers/session.controller.js");

    var router = require("express").Router();

    // Create a new session
    router.post("/", session.create);

    app.use('/session', router);
}