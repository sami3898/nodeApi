const Todo = require("../model/Todo")
const jwt = require("jsonwebtoken")

// Route to create Todos
const createTodo = async (req, res) => {
    try {
        
        const token = await req.headers.authorization.split(" ")[1];

        const decodeToken = jwt.decode(token, "RANDOM-TOKEN");

        const user = await decodeToken;

        const todo = new Todo({
            title: req.body.title,
            details: req.body.details,
            userId: user.userId,
        })

        const result = await todo.save()

        if (result) {
            res.status(200).json({
                message: "Todo saved successfully",
                todo
            })
        } else {
            res.status(400).json({
                message: "Something went wrong while saving todo",
            })
        }

    } catch (error) {
        res.send(error)
    }
}

// Router to get todo
const getTodo = async (req, res) => {
    try {
        const token = await req.headers.authorization.split(" ")[1];

        const decodeToken = jwt.decode(token, "RANDOM-TOKEN");

        const user = await decodeToken;

        Todo.find({ userId: { $eq: user.userId } })
        .then(todo => {
            res.status(200).json({
                todos: todo,
                count: todo.length
            })
        })
        .catch(error => {
            res.status(400).json({
                message: "User invalid"
            })
        })
    } catch (error) {
        res.send(error)
    }
}

// Route to update todo
const updateTodo = async (req, res) => {
    try {
        const { todoId } = req.params;

        const updateQuery = {
            $set: {
                title: req.body.title,
                details: req.body.details,
                createdAt: Date.now()
            }
            
        }

        const todo = await Todo.findOneAndUpdate({_id: todoId},updateQuery, { new: true })
        
        if (!todo) {
            res.status(400).json({
                message: "Todo not found"
            })
        } else {
            res.status(200).json({
                message: "Todo updated successfully",
                todo
            })
        }

    } catch (error) {
        res.send(error)
    }
}

// Route to delete todo
const deleteTodo = async (req, res) => {
    try {
        const { todoId } = req.params;

        const todo = await Todo.findByIdAndDelete(todoId)

        if (!todo) {
            res.status(404).json({
                message: "Todo not found"
            })
        }

        res.status(200).json({
            message: "Todo deleted successfully"
        })

    } catch (error) {
        res.send(error)
    }
}

module.exports = { createTodo, getTodo, deleteTodo, updateTodo }