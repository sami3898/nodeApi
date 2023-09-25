const { createUser, loginUser } = require("./controller/UserController")
const auth = require("./auth");
const { createTodo, getTodo, deleteTodo, updateTodo } = require("./controller/TodoController");

const router = require("express").Router();

router.post("/createUser", createUser)
router.post("/loginUser", loginUser)
router.post("/createTodo", auth, createTodo)
router.get("/getTodo", auth, getTodo)
router.delete("/deleteTodo/:todoId", auth, deleteTodo)
router.put("/updateTodo/:todoId", auth, updateTodo)

module.exports = router;