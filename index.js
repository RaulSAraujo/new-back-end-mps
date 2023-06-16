const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const db = require('./app/models')
db.sequelize.sync()

app.get("/", (req, res) => {
  res.json({ message: "Welcome to application." });
});

require("./app/routes/user.routes")(app);
require("./app/routes/session.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
