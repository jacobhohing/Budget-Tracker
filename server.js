const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

if(process.env.MONGO_ATLAS.length > 0)
{
  mongoose.connect(process.env.MONGO_ATLAS, {
    useNewUrlParser: true,
    useFindAndModify: false
  });
}
else{
  mongoose.connect("mongodb://localhost/budget", {
    useNewUrlParser: true,
    useFindAndModify: false
  });
}

// mongoose.connect("mongodb://localhost/budget", {
//    useNewUrlParser: true,
//   useFindAndModify: false
// });

// routes
app.use(require("./routes/api.js"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});