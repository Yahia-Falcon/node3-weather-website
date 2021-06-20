const path = require("path");
const express = require("express");
const hbs = require("hbs");
const {forecast, geocode} = require("./utils");

const getDirPath = directory => path.join(__dirname, "..", directory);

const app = express();

app.set("view engine", "hbs");
app.set("views", getDirPath("templates/views"));
hbs.registerPartials(getDirPath("templates/partials"));

app.use(express.static(getDirPath("public")));

app.get("", (req, res) => {
 res.render("index", {
  title: "Weather", 
  header: "Weather", 
  name: "Yahya Hamed"
 });
});

app.get("/about", (req, res) => {
 res.render("about", {
  title: "Weather | About Us", 
  header: "About Us", 
  name: "Yahya Hamed", 
  imagePath: "/img/me.png"
 });
});

app.get("/help", (req, res) => {
 res.render("help", {
  title: "Weather | Help", 
  header: "Weather Help", 
  name: "Yahya Hamed", 
  helpMessage: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus quasi vitae nostrum eveniet quia animi."
 });
});

app.get("/weather", (req, res) => {
 if (!req.query.address) {
  res.send({error: "You must provide an address!"});
 } else {
  geocode(req.query.address, (error, data)  => {
   if (error) {
    res.send({error});
   } else {
    const location = data.location;
    forecast(data.latitude, data.longitude, (error, data) => res.send(error ? {error} : {forecast: data, location, address: req.query.address}));
   }
  });
 }
});

app.get("*", (req, res) => res.render("404"))

app.listen(3000, () => {});