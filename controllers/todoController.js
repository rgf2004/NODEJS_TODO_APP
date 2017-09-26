module.exports = function (app){

var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Connect to DB
mongoose.connect('mongodb://test:test@ds151554.mlab.com:51554/todo');

// create a schema - like a blueprint
var todoSchema = mongoose.Schema({
    item : String
});

// Model
var Todo = mongoose.model('Todo', todoSchema);

var urlencodedParser = bodyParser.urlencoded({extended : false});

app.get('/todo', function (req, res) {

    // get data from Mongodb and pass it to view
    Todo.find({}, function(err, data){
        if (err) throw err;
        res.render('todo', {todos : data});
    });
});


app.post('/todo', urlencodedParser, function (req, res) {
    // get data from view and add it to mongodb
    var newTodo = Todo(req.body).save(function(err, data){
        if (err) throw err;
        res.json(data);
    });    
});

app.delete('/todo/:item', function (req, res) {
    // remove data from mongodb
    Todo.find({item: req.params.item.replace(/\-/g," ")}).remove(function(err, data){
        if (err) throw err;
        res.json(data);
    });    
});

};