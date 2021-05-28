const express = require("express");
const axios = require("axios");
const app = express();
let link = null;

app.use(express.static(__dirname + "/static"));
app.set('views', __dirname + '/views'); 
app.set('view engine', 'ejs');

app.get("/", function(request, response){
    response.render("index");
});

app.get('/people', function(request, response){
    link = "https://swapi.dev/api/people/";

    axios.get(link)
    .then(result => {
        link = result.data.next;
        response.json(result.data);
    })
    .catch(error => {
        console.log(error);
        response.json(error);
    });
});

app.get('/planets', function(request, response){
    link = "https://swapi.dev/api/planets/";

    axios.get(link)
    .then(result => {
        link = result.data.next;
        response.json(result.data);
    })
    .catch(error => {
        // log the error before moving on!x
        console.log(error);
        response.json(error);
    });
});

app.get('/more', function(request, response){
    if(link != null){
        axios.get(link)
        .then(result => {
            link = result.data.next;
            response.json(result.data);
        })
        .catch(error => {
            console.log(error);
            response.json(error);
        });
    }
});

app.listen(8080, function(){
    console.log("Listening on 8080");
});