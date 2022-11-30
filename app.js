const express = require("express");
const app = express();
const Router = require("express").Router();
const cors = require("cors");
const axios = require("axios");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", Router);

const getLocation = (req, res) => {
    //get online ip address
    axios.get("https://api.ipify.org?format=json")
    .then((response) => {
        //get location from ip address
        axios.get(`http://ip-api.com/json/${response.data.ip}`)
        .then((response) => {
            console.log(response.data);
            res.send(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
    })
    .catch((error) => {
        console.log(error);
    })
}

Router.get("/", function (req, res) {
  getLocation(req, res);
});

app.listen(3000, () => {
  console.log(`listening on 3000`);
});
