const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const bodyParser = require("body-parser");

const PORT = config.get("server").get("port") || 5000;
const app = express();

async function serverStart() {
  try {
    await mongoose
      .connect(config.get("db").get("path"), {
        useNewUrlParser: true,
      })
      .then(() => {
        console.log("Database is connected");
      })
      .catch((err) => {
        console.log("Can not connect to the database" + err);
      });

    app.listen(PORT, () => {
      console.log(`server started on port: ${PORT}`);
    });
  } catch (error) {
    console.error("Server error: ", error.message);
    process.exit(1);
  }
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
require("./routes/core.user")(app);
require("./routes/todo")(app);

const passport = require("passport");
require("./middleware/passport")(passport);
app.use(passport.initialize());
serverStart();
