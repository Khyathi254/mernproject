const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());
const DB = 'mongodb+srv://khyathi:3V9OqOlhWd8k4SLF@cluster0.46t4hjb.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(
        DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then(() => console.log("Connected to MongoDB"))
    .catch(console.error);


//MODEL
const Todo = require('./models/Todo');


app.get('/todos', async(req, res) => {
    const todos = await Todo.find();
    res.json(todos);
})

app.post('/todo/new', (req, res) => {
    const todo = new Todo({
        text: req.body.text

    });
    todo.save();

    res.json(todo);
});

app.delete('/todos/delete/:id', async(req, res) => {
    const result = await Todo.findByIdAndDelete(req.params.id);
    res.json(result);
})

app.get('/todos/complete/:id', async(req, res) => {
    const todo = await Todo.findById(req.params.id);
    todo.complete = !todo.complete;

    todo.save();
    res.json(todo);

})

app.put('/todo/update/:id', async(req, res) => {
    const todo = await Todo.findById(req.params.id);

    todo.text = req.body.text;

    todo.save();

    res.json(todo);
});

app.listen(3001, () => console.log("Server started on port 3001"));