const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

const users = require("./routes/users");
const tasks = require("./routes/tasks");

/*app.get("/message", (req, res) => {
  res.json({ message: "Hello from backend" });
});*/
mongoose
  .connect("mongodb+srv://admin123:admin123@cluster0.ktfbnow.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.log(err));

app.use("/api/users", users);
app.use("/api/tasks", tasks);

app.listen(5050, () => {
  console.log(`Backend is running on port 5050`);
});
