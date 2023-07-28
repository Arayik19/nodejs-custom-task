const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const sequelize = require("./src/util/database");

dotenv.config({ path: "./.env" });

const app = express();
const port = process.env.PORT;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const catalogRoutes = require("./src/routes/catalog.routes");
const productRoutes = require("./src/routes/product.routes");

app.get("/", (req, res) => {
  res.send("Hello!");
});

app.use(catalogRoutes);
app.use(productRoutes);

sequelize
  .sync()
  .then((res) => {
    app.listen(port);
  })
  .catch((err) => console.log(err));
